# InSightIQ - Strategic Intelligence Platform

> Real-time AI-powered competitor monitoring and market intelligence across 10 technology domains

![Dashboard](https://img.shields.io/badge/Status-Ready-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Linux/Mac:**
```bash
chmod +x run.sh
./run.sh
```

**Windows:**
```bash
run.bat
```

Then open: **http://localhost:8080/START_HERE.html**

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
python -m http.server 8080
```

**Open Browser:** http://localhost:8080/index.html

---

## 📋 Table of Contents

1. [Features](#features)
2. [Technology Domains](#technology-domains)
3. [Architecture](#architecture)
4. [Setup Guide](#setup-guide)
5. [API Configuration](#api-configuration)
6. [Usage](#usage)
7. [Troubleshooting](#troubleshooting)
8. [Project Structure](#project-structure)

---

## ✨ Features

### Core Capabilities
- ✅ **Domain Selection**: Choose from 10 technology sectors
- ✅ **Competitor Monitoring**: Track 5 key players per domain
- ✅ **AI Insights**: GPT-powered strategic analysis
- ✅ **Market Forecasting**: 30-day predictions using Prophet
- ✅ **News Aggregation**: Real-time updates from multiple sources
- ✅ **Social Sentiment**: Twitter and Reddit monitoring
- ✅ **Dark Theme UI**: Professional, responsive dashboard
- ✅ **Real-time Alerts**: Webhook integration for notifications

### Technical Features
- Real-time data collection from multiple APIs
- Prophet-based time series forecasting
- Sentiment analysis on social media
- Automated alert system
- Interactive data visualizations
- RESTful API architecture
- CORS-enabled for local development

---

## 🎯 Technology Domains

The platform monitors competitors across 10 key technology sectors:

### 1. Artificial Intelligence & Machine Learning
- OpenAI
- Anthropic
- DeepMind
- Hugging Face
- Stability AI

### 2. Cloud Computing & SaaS
- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud
- Salesforce
- Oracle

### 3. Cybersecurity & Data Privacy
- Palo Alto Networks
- CrowdStrike
- Fortinet
- Cloudflare
- Check Point

### 4. Web3, Blockchain & Crypto
- Coinbase
- Binance
- ConsenSys
- Chainalysis
- Polygon Labs

### 5. Augmented & Virtual Reality
- Meta (Reality Labs)
- HTC Vive
- Niantic
- Magic Leap
- Varjo

### 6. Robotics & Automation
- Boston Dynamics
- ABB Robotics
- iRobot
- Fanuc
- UiPath

### 7. Semiconductors & Hardware
- Intel
- AMD
- NVIDIA
- TSMC
- Qualcomm

### 8. Quantum Computing
- IBM Quantum
- Rigetti
- IonQ
- D-Wave Systems
- Xanadu

### 9. Consumer Electronics
- Apple
- Samsung Electronics
- Sony
- LG Electronics
- Xiaomi

### 10. Green Tech & Energy Innovation
- Tesla Energy
- Enphase Energy
- Siemens Energy
- Ørsted
- First Solar

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              Frontend (HTML/JS)             │
│  ┌─────────────────────────────────────┐   │
│  │  Topic Selection Modal              │   │
│  │  ├─ 10 Domain Cards                 │   │
│  │  └─ Dynamic Competitor Loading      │   │
│  ├─────────────────────────────────────┤   │
│  │  Dashboard                          │   │
│  │  ├─ Competitor Grid (5 per domain)  │   │
│  │  ├─ Market Forecast Charts          │   │
│  │  ├─ News Feed                        │   │
│  │  └─ Social Media Feed                │   │
│  ├─────────────────────────────────────┤   │
│  │  Insights Modal                     │   │
│  │  ├─ AI Strategic Analysis           │   │
│  │  ├─ 30-Day Prophet Forecast         │   │
│  │  ├─ Latest News                      │   │
│  │  └─ Social Sentiment                 │   │
│  └─────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────────┐
│         Backend Flask API (Python)          │
│  ┌─────────────────────────────────────┐   │
│  │  /api/insights Endpoint             │   │
│  │  ├─ fetch_news()                     │   │
│  │  │  ├─ GNews API                     │   │
│  │  │  └─ SerpAPI                       │   │
│  │  ├─ fetch_market()                   │   │
│  │  │  ├─ Alpha Vantage API             │   │
│  │  │  └─ Prophet Forecasting           │   │
│  │  ├─ fetch_social()                   │   │
│  │  │  ├─ Twitter API                   │   │
│  │  │  └─ Reddit API                    │   │
│  │  └─ OpenAI GPT Analysis              │   │
│  └─────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │ Webhook Push
                  ▼
┌─────────────────────────────────────────────┐
│         Alert System (Optional)             │
│         Slack / Custom Webhooks             │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Setup Guide

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Edge)
- Internet connection (for API calls and CDN resources)

### Step 1: Clone/Download Project
```bash
cd /path/to/project
```

### Step 2: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 3: Configure API Keys
Create `backend/.env` file:
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

# Optional: Webhook
WEBHOOK_URL=your_webhook_url
```

### Step 4: Get API Keys (Free Tiers Available)

| Service | Free Tier | Link |
|---------|-----------|------|
| GNews | 100 requests/day | https://gnews.io/ |
| SerpAPI | 100 searches/month | https://serpapi.com/ |
| Alpha Vantage | 25 requests/day | https://www.alphavantage.co/ |
| OpenAI | Pay as you go | https://platform.openai.com/ |
| Twitter | Essential (Free) | https://developer.twitter.com/ |
| Reddit | Unlimited | https://www.reddit.com/prefs/apps |

### Step 5: Start Servers

**Option A: Automated (Recommended)**
```bash
./run.sh        # Linux/Mac
run.bat         # Windows
```

**Option B: Manual**
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
python -m http.server 8080
```

### Step 6: Access Dashboard
Open browser: **http://localhost:8080/START_HERE.html**

---

## 🔑 API Configuration

### Required APIs (for full functionality)
1. **GNews** - News articles
2. **SerpAPI** - Google News results
3. **Alpha Vantage** - Stock market data
4. **OpenAI** - AI insights generation
5. **Twitter** - Tweet monitoring
6. **Reddit** - Reddit post tracking

### Optional APIs
- **Webhook URL** - For real-time alerts (Slack, Discord, etc.)

### API Rate Limits

| API | Free Tier Limit | Cost per Extra Request |
|-----|----------------|----------------------|
| GNews | 100/day | $9/mo for 10k |
| SerpAPI | 100/month | $50/mo for 5k |
| Alpha Vantage | 25/day | $50/mo for 1200/day |
| OpenAI | Pay as you go | ~$0.002 per request |
| Twitter | 500k tweets/month | Free tier sufficient |
| Reddit | Unlimited | Free |

---

## 📖 Usage

### 1. Select a Domain
- Open the dashboard
- A popup will appear with 10 technology domains
- Click on your domain of interest

### 2. View Competitors
- Dashboard displays 5 key competitors
- Each card shows company logo and name
- Click "View Insights" for detailed analysis

### 3. Explore Insights
The insights modal provides:
- **AI Strategic Analysis**: GPT-generated summary of opportunities, risks, and trends
- **Market Forecast**: 30-day stock price predictions with confidence intervals
- **News Feed**: Latest 5 news articles from multiple sources
- **Social Sentiment**: Recent tweets and Reddit posts

### 4. Change Domain
- Click "Change Topic" in navigation
- Select a different domain
- Dashboard updates automatically

---

## 🐛 Troubleshooting

### UI Not Showing?

1. **Start with diagnostics:**
   - Open: `frontend/START_HERE.html`
   - This verifies all files are accessible

2. **Check console:**
   - Press F12 to open DevTools
   - Look for red errors in Console tab

3. **Common fixes:**
   - Use `http://localhost:8080` (not `file:///`)
   - Ensure backend is running on port 5000
   - Clear browser cache (Ctrl+Shift+R)

### Backend Connection Failed?

1. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/api/insights?company=Test&symbol=TEST
   ```

2. **Check CORS:**
   - Ensure Flask-CORS is installed
   - Verify `CORS(app)` in app.py

3. **API Keys:**
   - Verify .env file exists in backend folder
   - Check all keys are valid

### Charts Not Rendering?

- Check internet connection (Chart.js loads from CDN)
- Verify market data is returned from API
- Ensure Alpha Vantage API key is valid

**See TROUBLESHOOTING.md for complete guide**

---

## 📁 Project Structure

```
insightiq/
├── README.md                    # This file
├── SETUP_GUIDE.md              # Detailed setup instructions
├── TROUBLESHOOTING.md          # Common issues and fixes
├── QUICKSTART.md               # Quick start guide
├── run.sh                      # Linux/Mac launch script
├── run.bat                     # Windows launch script
│
├── backend/
│   ├── app.py                  # Flask API server
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # API keys (create this)
│   ├── README.md               # Backend documentation
│   ├── setup.sh                # Backend setup script
│   └── logos/                  # Competitor logos by domain
│       ├── AI & ML/
│       │   ├── openai.png
│       │   ├── anthropic.webp
│       │   └── ...
│       ├── Cloud Computing & SaaS/
│       └── ... (10 domains total)
│
└── frontend/
    ├── index.html              # Main dashboard
    ├── START_HERE.html         # Setup verification page
    ├── diagnostic.html         # Diagnostic tool
    ├── test.html               # Simple test page
    ├── css/
    │   └── styles.css          # Dark theme styling
    └── js/
        └── main.js             # Dashboard logic & API calls
```

---

## 🔌 API Endpoints

### GET /api/insights

Fetch comprehensive insights for a company.

**Parameters:**
- `company` (string, required): Company name
- `symbol` (string, required): Stock ticker symbol

**Example:**
```bash
curl "http://localhost:5000/api/insights?company=OpenAI&symbol=MSFT"
```

**Response:**
```json
{
  "company": "OpenAI",
  "symbol": "MSFT",
  "insights": "Strategic analysis text...",
  "news": [
    {
      "title": "News headline",
      "url": "https://...",
      "source": "TechCrunch"
    }
  ],
  "social": {
    "twitter": [
      {
        "id": "123",
        "text": "Tweet content",
        "created_at": "2025-10-03T12:00:00"
      }
    ],
    "reddit": [
      {
        "title": "Post title",
        "url": "https://reddit.com/...",
        "score": 142
      }
    ]
  },
  "market_forecast": [
    {
      "ds": "2025-10-03",
      "yhat": 425.32,
      "yhat_lower": 420.15,
      "yhat_upper": 430.48
    }
  ]
}
```

---

## 🎨 Design System

### Color Palette
- **Primary Background**: `#0a0e27` (Dark blue)
- **Secondary Background**: `#151932`
- **Card Background**: `#1e2139`
- **Accent Primary**: `#00d4ff` (Cyan)
- **Accent Secondary**: `#7c3aed` (Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Error**: `#ef4444` (Red)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Heading**: 2.5rem, gradient cyan to purple
- **Body**: 1rem, #ffffff (white)
- **Secondary**: 0.9rem, #a0aec0 (gray)

---

## 🚧 Future Enhancements

- [ ] Historical trend analysis and comparison
- [ ] Sentiment scoring dashboard
- [ ] Multi-competitor side-by-side comparison
- [ ] PDF report export
- [ ] Custom watchlists
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Data caching for faster loads
- [ ] User authentication
- [ ] Customizable alerts

---

## 📊 Performance

### Expected Load Times
- **Topic Selection**: Instant
- **Competitor Grid**: < 1 second
- **First Insights Load**: 5-10 seconds
- **Subsequent Loads**: 3-5 seconds

### API Call Breakdown (per insight request)
- News: ~2 seconds
- Market + Prophet: ~3-5 seconds
- Social: ~2 seconds
- OpenAI: ~1-2 seconds
- **Total**: 8-12 seconds

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 💬 Support

- **Documentation**: See SETUP_GUIDE.md and TROUBLESHOOTING.md
- **Issues**: Check TROUBLESHOOTING.md first
- **Questions**: Review the FAQ below

---

## ❓ FAQ

**Q: Can I use this without API keys?**
A: The UI will work, but you won't get real data. At minimum, you need OpenAI and Alpha Vantage keys.

**Q: Why is it slow?**
A: Prophet model training takes 3-5 seconds. This is normal. Future versions will implement caching.

**Q: Can I add my own competitors?**
A: Yes! Edit the `TOPICS` object in `frontend/js/main.js`.

**Q: Does it work offline?**
A: No, it requires internet for API calls and Chart.js CDN.

**Q: Can I deploy this to production?**
A: Yes, but you'll need to:
  - Use a production WSGI server (Gunicorn)
  - Add authentication
  - Implement rate limiting
  - Use environment variables for secrets

**Q: How much does it cost to run?**
A: Free tier APIs are sufficient for personal use. Expect ~$10-20/month for moderate production use.

---

## 🎉 Credits

Built with:
- Flask (Python web framework)
- Chart.js (Data visualization)
- Prophet (Forecasting)
- OpenAI GPT (AI insights)
- Alpha Vantage (Market data)
- GNews & SerpAPI (News)
- Twitter & Reddit APIs (Social)

---

**Ready to get started? Open `START_HERE.html` and begin monitoring your competitors!** 🚀
