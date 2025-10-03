# InSightIQ Quick Start

Get up and running in 3 minutes!

## Prerequisites Check
- [ ] Python 3.8+ installed: `python --version`
- [ ] Web browser available
- [ ] API keys ready (optional for demo)

## 30-Second Demo

Want to see the UI first? Just open `demo.html` in your browser!

## 3-Minute Full Setup

### Step 1: Start Backend (1 min)
```bash
cd backend
python app.py
```

Leave this terminal running. You should see:
```
* Running on http://127.0.0.1:5000
```

### Step 2: Open Frontend (30 sec)
Open `index.html` in your browser or:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

### Step 3: Select Domain (30 sec)
1. Choose a strategic domain from the popup
2. Click "View Insights" on any competitor
3. Explore charts, news, and social feeds

### Step 4: Add API Keys (1 min)
Create `backend/.env` with your keys:
```env
OPENAI_API_KEY=sk-...
ALPHAVANTAGE_KEY=...
GNEWS_API_KEY=...
```

## One-Command Start

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

## Troubleshooting

### Backend won't start?
```bash
cd backend
pip install flask flask-cors
python app.py
```

### Frontend shows errors?
- Make sure backend is running first
- Check browser console (F12)
- Try demo.html for static preview

### Logos not showing?
- Verify backend is running on port 5000
- Check browser network tab
- Logos are in backend/logos/ folders

## What's Next?

1. **Explore**: Try all 10 domains
2. **Customize**: Edit TOPICS_CONFIG in app.js
3. **Learn**: Read FEATURES.md for full capabilities
4. **Share**: Show your team the strategic intelligence

## Support

- Full setup: See `SETUP.md`
- Features: See `FEATURES.md`
- Issues: Check browser console + backend logs

---

**Ready to dive deeper?** Open `FEATURES.md` for the complete feature list!
