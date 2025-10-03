from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import pandas as pd
from prophet import Prophet
from dotenv import load_dotenv
import praw
import tweepy
import openai

# --------------------- Load environment ---------------------
load_dotenv()

# News APIs
GNEWS_KEY = os.getenv("GNEWS_API_KEY")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")

# Market APIs
ALPHAVANTAGE_KEY = os.getenv("ALPHAVANTAGE_KEY")

# OpenAI
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_KEY

# Social APIs
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT")

# Webhook
WEBHOOK_URL = os.getenv("WEBHOOK_URL")  # Add your webhook URL in .env

# --------------------- Initialize clients ---------------------
app = Flask(__name__)
CORS(app)

reddit = praw.Reddit(
    client_id=REDDIT_CLIENT_ID,
    client_secret=REDDIT_CLIENT_SECRET,
    user_agent=REDDIT_USER_AGENT
)

twitter_client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN)

# --------------------- NEWS API ---------------------
def fetch_news(company):
    gnews_data, serp_data = [], []
    try:
        gnews_url = "https://gnews.io/api/v4/search"
        gnews_params = {"q": company, "token": GNEWS_KEY, "lang": "en", "max": 5}
        gnews_resp = requests.get(gnews_url, params=gnews_params, timeout=10)
        gnews_data = gnews_resp.json().get("articles", [])
    except:
        pass

    try:
        serp_url = "https://serpapi.com/search.json"
        serp_params = {"q": company, "engine": "google_news", "api_key": SERPAPI_KEY}
        serp_resp = requests.get(serp_url, params=serp_params, timeout=10)
        serp_data = serp_resp.json().get("news_results", [])
    except:
        pass

    return gnews_data + serp_data

# --------------------- MARKET API ---------------------
def fetch_market(symbol):
    try:
        alpha_url = "https://www.alphavantage.co/query"
        alpha_params = {"function": "TIME_SERIES_DAILY_ADJUSTED", "symbol": symbol, "apikey": ALPHAVANTAGE_KEY}
        alpha_resp = requests.get(alpha_url, params=alpha_params, timeout=10).json()
        ts_data = alpha_resp["Time Series (Daily)"]
        df = pd.DataFrame([{"ds": date, "y": float(data["4. close"])} for date, data in ts_data.items()])
        df = df.sort_values("ds")
        model = Prophet(daily_seasonality=True)
        model.fit(df)
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)
        return df, forecast[['ds','yhat','yhat_lower','yhat_upper']]
    except:
        return None, None

# --------------------- SOCIAL API ---------------------
def fetch_social(company):
    results = {"reddit": [], "twitter": []}

    # Reddit
    try:
        for submission in reddit.subreddit("all").search(company, limit=5):
            results["reddit"].append({
                "title": submission.title,
                "url": submission.url,
                "score": submission.score,
                "created": submission.created_utc
            })
    except:
        pass

    # Twitter
    try:
        tweets = twitter_client.search_recent_tweets(query=company, max_results=5)
        if tweets.data:
            for tweet in tweets.data:
                results["twitter"].append({
                    "id": tweet.id,
                    "text": tweet.text,
                    "created_at": str(tweet.created_at)
                })
    except:
        pass

    return results

# --------------------- WEBHOOK PUSH ---------------------
import time

def push_webhook(data, retries=3, delay=2):
    if not WEBHOOK_URL:
        print("No webhook URL configured.")
        return

    for attempt in range(1, retries+1):
        try:
            resp = requests.post(WEBHOOK_URL, json=data, timeout=10)
            if resp.status_code == 200 or resp.status_code == 201:
                print(f"Webhook push successful on attempt {attempt}")
                return
            else:
                print(f"Webhook returned status {resp.status_code} on attempt {attempt}")
        except Exception as e:
            print(f"Webhook push failed on attempt {attempt}: {e}")
        time.sleep(delay)
    print("Webhook push failed after all retries.")


# --------------------- LOGO API ---------------------
from flask import send_file

@app.route("/logos/<path:filepath>")
def serve_logo(filepath):
    try:
        logo_path = os.path.join(os.path.dirname(__file__), "logos", filepath)
        return send_file(logo_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 404

# --------------------- INSIGHTS API ---------------------
@app.route("/api/insights")
def get_insights():
    company = request.args.get("company", "OpenAI")
    symbol = request.args.get("symbol", "AAPL")

    # Fetch data
    news = fetch_news(company)
    market_hist, market_forecast = fetch_market(symbol)
    social = fetch_social(company)

    # Prepare prompt for OpenAI
    news_text = "\n".join([article.get("title","") for article in news[:5]])
    social_text = "\n".join([t.get("text","") for t in social.get("twitter", [])])
    reddit_text = "\n".join([r.get("title","") for r in social.get("reddit", [])])

    market_summary = ""
    if market_hist is not None:
        market_summary = f"Latest close: {market_hist['y'].iloc[-1]}, Forecast next 30 days: {[round(v,2) for v in market_forecast['yhat'].tolist()[:5]]}..."

    prompt = f"""
You are a strategic intelligence analyst. 
Company: {company}
Market symbol: {symbol}

News Headlines:
{news_text}

Social Media (Twitter):
{social_text}

Reddit posts:
{reddit_text}

Market Summary:
{market_summary}

Provide a concise, actionable insight report for this company, highlighting opportunities, risks, and trends. Keep it under 200 words.
"""

    # Call OpenAI
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=300,
            temperature=0.7
        )
        insights = response.choices[0].text.strip()
    except Exception as e:
        insights = f"Error generating insights: {str(e)}"

    result = {
        "company": company,
        "symbol": symbol,
        "insights": insights,
        "news": news,
        "social": social,
        "market_forecast": market_forecast.to_dict(orient='records') if market_forecast is not None else []
    }

    # Push to webhook automatically
    push_webhook(result)

    return jsonify(result)

# --------------------- RUN SERVER ---------------------
if __name__ == "__main__":
    app.run(debug=True)
