# InSightIQ - Strategic Intelligence Platform

A professional, dark-themed web dashboard for strategic intelligence analysis across 10 technology domains.

## Features

- **Topic Selection**: Choose from 10 strategic domains including AI/ML, Cloud Computing, Cybersecurity, Web3, AR/VR, Robotics, Semiconductors, Quantum Computing, Consumer Electronics, and Green Tech
- **Competitor Analysis**: View detailed insights for 5 competitors in each domain
- **AI-Generated Insights**: Powered by OpenAI for strategic analysis
- **Market Forecasting**: 30-day Prophet forecasts with visualization
- **News & Social Intelligence**: Real-time news headlines and social media tracking
- **Responsive Design**: Professional dark theme optimized for all devices

## Quick Start

### 1. Start the Backend

```bash
cd backend
python app.py
```

The backend will run on `http://127.0.0.1:5000`

### 2. Open the Frontend

Simply open `index.html` in your web browser, or use a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`

### 3. Configure API Keys

Add your API keys to `backend/.env`:

```
GNEWS_API_KEY=your_key
SERPAPI_KEY=your_key
ALPHAVANTAGE_KEY=your_key
OPENAI_API_KEY=your_key
TWITTER_BEARER_TOKEN=your_token
REDDIT_CLIENT_ID=your_id
REDDIT_CLIENT_SECRET=your_secret
REDDIT_USER_AGENT=your_agent
WEBHOOK_URL=your_webhook_url
```

## Project Structure

```
project/
├── index.html          # Main dashboard HTML
├── styles.css          # Dark theme styling
├── app.js             # Frontend logic and API integration
└── backend/
    ├── app.py         # Flask backend API
    ├── logos/         # Competitor logos by domain
    └── .env           # API configuration
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, Chart.js
- **Backend**: Flask, Python 3.x
- **APIs**: OpenAI, Alpha Vantage, GNews, SerpAPI, Twitter, Reddit
- **Forecasting**: Prophet ML library

## Usage

1. Select a strategic domain from the popup modal
2. View competitor cards with logos and basic info
3. Click "View Insights" to see detailed analysis including:
   - AI-generated strategic insights
   - 30-day market forecast
   - Recent news headlines
   - Social media activity (Twitter & Reddit)
4. Use filters to adjust time ranges and refresh data

## Notes

- Ensure backend server is running before opening frontend
- API keys are required for full functionality
- Logos are served from `backend/logos/` directory
- All data is fetched in real-time from configured APIs
