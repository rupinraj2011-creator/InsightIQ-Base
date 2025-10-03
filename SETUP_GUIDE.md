# InSightIQ - Strategic Intelligence Platform Setup Guide

## Overview
InSightIQ is a real-time, AI-powered strategic intelligence platform that monitors competitors, detects market trends, and delivers actionable insights across 10 technology domains.

## Features
- **Topic Selection**: Choose from 10 technology domains (AI/ML, Cloud, Cybersecurity, Web3, AR/VR, Robotics, Semiconductors, Quantum Computing, Consumer Electronics, Green Tech)
- **Competitor Monitoring**: Track 5 key competitors per domain
- **AI Insights**: GPT-powered strategic analysis
- **Market Forecasting**: 30-day predictions using Prophet
- **News Aggregation**: Real-time news from multiple sources
- **Social Sentiment**: Twitter and Reddit monitoring
- **Dark Theme Dashboard**: Professional, responsive UI

## Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Edge)
- API Keys (see configuration below)

## Backend Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` folder with your API keys:

```env
# News APIs
GNEWS_API_KEY=your_gnews_api_key
SERPAPI_KEY=your_serpapi_key

# Market Data
ALPHAVANTAGE_KEY=your_alphavantage_key

# AI
OPENAI_API_KEY=your_openai_api_key

# Social Media
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=InSightIQ/1.0

# Optional: Webhook for alerts
WEBHOOK_URL=your_webhook_url
```

### 3. Get API Keys

#### GNews API (Free tier available)
- Visit: https://gnews.io/
- Sign up and get your API key

#### SerpAPI (Free tier: 100 searches/month)
- Visit: https://serpapi.com/
- Sign up and get your API key

#### Alpha Vantage (Free tier: 25 requests/day)
- Visit: https://www.alphavantage.co/
- Get a free API key

#### OpenAI (Paid)
- Visit: https://platform.openai.com/
- Create an account and get API key
- Note: Requires credits/payment

#### Twitter API (Free tier available)
- Visit: https://developer.twitter.com/
- Create a project and get bearer token

#### Reddit API (Free)
- Visit: https://www.reddit.com/prefs/apps
- Create an app and get client ID and secret

### 4. Start Backend Server
```bash
cd backend
python app.py
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Open the Dashboard
Simply open `frontend/index.html` in your web browser, or use a local server:

```bash
cd frontend
python -m http.server 8080
```

Then visit: `http://localhost:8080`

### 2. Using the Dashboard

1. **Select a Domain**: A popup will appear with 10 technology domains. Click on one to start.

2. **View Competitors**: The dashboard will display 5 competitors for your chosen domain with their logos.

3. **Get Insights**: Click "View Insights" on any competitor to see:
   - AI-generated strategic analysis
   - 30-day market forecast chart
   - Latest news articles
   - Social media sentiment (Twitter & Reddit)

4. **Change Domain**: Click "Change Topic" in the navigation to switch domains.

## Project Structure
```
project/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # API keys (create this)
│   └── logos/             # Competitor logos by domain
│       ├── AI & ML/
│       ├── Cloud Computing & SaaS/
│       └── ... (10 domains total)
│
└── frontend/
    ├── index.html         # Main dashboard page
    ├── css/
    │   └── styles.css     # Dark theme styling
    └── js/
        └── main.js        # Topic selection & API integration
```

## 10 Technology Domains

1. **Artificial Intelligence & Machine Learning**
   - OpenAI, Anthropic, DeepMind, Hugging Face, Stability AI

2. **Cloud Computing & SaaS**
   - AWS, Azure, Google Cloud, Salesforce, Oracle

3. **Cybersecurity & Data Privacy**
   - Palo Alto Networks, CrowdStrike, Fortinet, Cloudflare, Check Point

4. **Web3, Blockchain & Crypto**
   - Coinbase, Binance, ConsenSys, Chainalysis, Polygon Labs

5. **Augmented & Virtual Reality**
   - Meta, HTC Vive, Niantic, Magic Leap, Varjo

6. **Robotics & Automation**
   - Boston Dynamics, ABB Robotics, iRobot, Fanuc, UiPath

7. **Semiconductors & Hardware**
   - Intel, AMD, NVIDIA, TSMC, Qualcomm

8. **Quantum Computing**
   - IBM Quantum, Rigetti, IonQ, D-Wave Systems, Xanadu

9. **Consumer Electronics**
   - Apple, Samsung Electronics, Sony, LG Electronics, Xiaomi

10. **Green Tech & Energy Innovation**
    - Tesla, Enphase Energy, Siemens Energy, Ørsted, First Solar

## API Endpoints

### GET /api/insights
Fetch comprehensive insights for a company

**Parameters:**
- `company` (required): Company name
- `symbol` (required): Stock ticker symbol

**Response:**
```json
{
  "company": "OpenAI",
  "symbol": "MSFT",
  "insights": "AI-generated strategic analysis...",
  "news": [...],
  "social": {
    "twitter": [...],
    "reddit": [...]
  },
  "market_forecast": [...]
}
```

## Troubleshooting

### Backend Issues

**Error: Module not found**
```bash
pip install -r requirements.txt
```

**Error: API key invalid**
- Check your `.env` file
- Verify API keys are correct
- Ensure no extra spaces

**Error: Prophet installation fails**
```bash
pip install pystan==2.19.1.1
pip install prophet
```

### Frontend Issues

**CORS Error**
- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Backend must be running on `http://localhost:5000`

**Images not loading**
- Logos are loaded from `../backend/logos/` relative path
- Fallback SVG placeholders will appear if images are missing

**Charts not displaying**
- Chart.js is loaded from CDN
- Check internet connection
- Verify market_forecast data is returned from API

## Performance Notes

- **API Rate Limits**: Free tiers have daily/monthly limits
- **Alpha Vantage**: 25 requests/day (free tier)
- **Prophet Forecasting**: Takes 2-5 seconds per request
- **News/Social**: Fetches top 5 results per source

## Future Enhancements

- Real-time alerts via Slack/webhook
- Historical trend analysis
- Sentiment scoring dashboard
- Multi-competitor comparison view
- Export reports to PDF
- Custom watchlists
- Email notifications

## License
MIT License

## Support
For issues or questions, please refer to the project documentation or create an issue in the repository.
