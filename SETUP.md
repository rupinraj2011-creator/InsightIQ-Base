# InSightIQ Setup Guide

## Prerequisites

- Python 3.8 or higher
- Web browser (Chrome, Firefox, Safari, or Edge)
- API keys for external services (see API Configuration below)

## Installation Steps

### Option 1: Using Start Scripts (Recommended)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

### Option 2: Manual Setup

#### 1. Set up Python Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors requests pandas prophet praw tweepy openai python-dotenv

# Start backend server
python app.py
```

Backend will be available at: `http://127.0.0.1:5000`

#### 2. Set up Frontend

Open `index.html` directly in your browser, or use a local server:

**Python HTTP Server:**
```bash
# From project root directory
python -m http.server 8000
```

Then visit: `http://localhost:8000`

**Node.js HTTP Server (if you have Node.js):**
```bash
npx http-server -p 8000
```

## API Configuration

Create a `.env` file in the `backend/` directory with your API keys:

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

# Webhook (Optional)
WEBHOOK_URL=your_webhook_url
```

### Where to Get API Keys

- **GNews**: https://gnews.io/
- **SerpAPI**: https://serpapi.com/
- **Alpha Vantage**: https://www.alphavantage.co/
- **OpenAI**: https://platform.openai.com/
- **Twitter**: https://developer.twitter.com/
- **Reddit**: https://www.reddit.com/prefs/apps

## Usage

1. **Start the backend server** (it must be running for the dashboard to work)
2. **Open the frontend** in your browser
3. **Select a domain** from the popup modal
4. **Explore competitor insights** by clicking on competitor cards
5. **View market forecasts, news, and social media intelligence**

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```python
# Edit backend/app.py, line 206:
app.run(debug=True, port=5001)

# Then update app.js, line 1:
const API_BASE_URL = 'http://127.0.0.1:5001';
```

**Missing dependencies:**
```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

### Frontend Issues

**CORS Errors:**
- Ensure Flask-CORS is installed in the backend
- The backend must be running before opening the frontend
- Check browser console for specific error messages

**Logos not loading:**
- Verify logos exist in `backend/logos/<domain>/` directories
- Check that backend `/logos/<path>` endpoint is working
- Try accessing directly: `http://127.0.0.1:5000/logos/AI%20%26%20ML/openai.png`

**API rate limits:**
- Some APIs have rate limits on free tiers
- Add delays between requests if needed
- Consider caching responses for development

## Project Structure

```
InSightIQ/
├── index.html              # Main dashboard page
├── styles.css              # Dark theme styling
├── app.js                  # Frontend JavaScript
├── package.json            # NPM configuration (optional)
├── start.sh                # Linux/Mac startup script
├── start.bat               # Windows startup script
├── README.md               # Project overview
├── SETUP.md                # This setup guide
└── backend/
    ├── app.py              # Flask API server
    ├── requirements.txt    # Python dependencies
    ├── .env                # API keys (create this)
    └── logos/              # Competitor logos
        ├── AI & ML/
        ├── Cloud computing & Saas/
        ├── Cybersecurity & data privacy/
        ├── Web3, blockchain & crypto/
        ├── Augmented & Virtual Reality/
        ├── Robotics & Automation/
        ├── Semiconductors & Hardware/
        ├── Quantum Computing/
        ├── Consumer Electronics/
        └── Green tech & Energy innovations/
```

## Features

- **10 Strategic Domains**: AI/ML, Cloud, Cybersecurity, Web3, AR/VR, Robotics, Semiconductors, Quantum, Consumer Electronics, Green Tech
- **50 Competitors**: 5 per domain with logos and stock symbols
- **AI Insights**: OpenAI-powered strategic analysis
- **Market Forecasting**: 30-day Prophet ML forecasts
- **News Integration**: Real-time headlines from multiple sources
- **Social Intelligence**: Twitter and Reddit monitoring
- **Dark Theme**: Professional UI optimized for extended use
- **Responsive Design**: Works on desktop, tablet, and mobile

## Development

### Adding New Domains

1. Add domain configuration to `app.js` in `TOPICS_CONFIG`
2. Create logo directory in `backend/logos/`
3. Add competitor logos to the directory
4. Update modal in `index.html` (if needed)

### Customizing Styling

- Edit `styles.css` for colors, fonts, and layout
- CSS variables are defined in `:root` for easy theming
- All colors use the dark theme palette

### Extending API

- Add new endpoints to `backend/app.py`
- Update `app.js` to call new endpoints
- Follow existing patterns for consistency

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check backend logs for API issues
4. Verify all API keys are correctly configured

## License

MIT License - Feel free to modify and distribute
