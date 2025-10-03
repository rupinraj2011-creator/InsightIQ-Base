# InSightIQ - Troubleshooting Guide

## Can't See the UI? Start Here

### Quick Fix Steps

1. **Open START_HERE.html first**
   ```
   Open: frontend/START_HERE.html in your browser
   ```
   This will verify all files are accessible.

2. **Use the run scripts**

   **Linux/Mac:**
   ```bash
   ./run.sh
   ```

   **Windows:**
   ```bash
   run.bat
   ```

3. **Manual start**

   Terminal 1 (Backend):
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   python -m http.server 8080
   ```

   Then open: `http://localhost:8080/START_HERE.html`

---

## Common Issues

### 1. Blank/White Page

**Symptoms:** Browser shows blank page or white screen

**Causes & Fixes:**

#### A) Opened as file:/// instead of http://
- ❌ Wrong: `file:///C:/Users/project/frontend/index.html`
- ✅ Correct: `http://localhost:8080/index.html`

**Fix:** Start a local server:
```bash
cd frontend
python -m http.server 8080
```

#### B) CSS not loading
**Check:** Open browser DevTools (F12) → Network tab → Look for 404 errors

**Fix:** Make sure you're in the frontend directory:
```bash
cd frontend
ls -la  # Should show css/ and js/ folders
```

#### C) JavaScript disabled
**Check:** Browser console (F12) should show logs

**Fix:** Enable JavaScript in browser settings

---

### 2. Modal/Popup Not Appearing

**Symptoms:** Page loads but no topic selection popup appears

**Fixes:**

#### A) JavaScript error
1. Open browser console (F12)
2. Look for red error messages
3. Common errors:

```
Uncaught ReferenceError: Chart is not defined
Fix: Check internet connection (Chart.js loads from CDN)

Uncaught SyntaxError in main.js
Fix: Re-download main.js or check file integrity
```

#### B) Modal CSS not working
**Check:** In console, type:
```javascript
document.getElementById('topicModal').style.display = 'flex'
```

If modal appears, CSS is fine but JavaScript isn't running.

---

### 3. Backend Connection Failed

**Symptoms:** "Failed to fetch" or CORS errors in console

**Fixes:**

#### A) Backend not running
**Check:** Visit `http://localhost:5000/api/insights?company=Test&symbol=TEST`

Should see JSON response (even if it's an error).

**Fix:** Start backend:
```bash
cd backend
python app.py
```

#### B) CORS error
**Check:** Console shows: "CORS policy blocked"

**Fix:** Make sure Flask-CORS is installed:
```bash
pip install Flask-CORS
```

And backend has:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

#### C) Wrong port
**Check:** Backend should run on port 5000, frontend on 8080

**Fix:** Update ports in `main.js` if different:
```javascript
fetch(`http://localhost:5000/api/insights?...`)
```

---

### 4. Images/Logos Not Loading

**Symptoms:** Competitor cards show placeholder text instead of logos

**Causes:**

This is **expected behavior** if logo files are missing. The frontend has fallback SVG placeholders.

**To add logos:**
1. Place logo images in: `backend/logos/<Domain Name>/<competitor>.png`
2. Example: `backend/logos/AI & ML/openai.png`

---

### 5. Charts Not Rendering

**Symptoms:** Chart areas are empty or show no data

**Fixes:**

#### A) Chart.js not loaded
**Check:** Console shows: "Chart is not defined"

**Fix:** Check internet connection (Chart.js loads from CDN)

Or add local Chart.js:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

#### B) No market data
**Check:** API returns empty `market_forecast` array

**Causes:**
- Alpha Vantage API key missing
- API rate limit exceeded (25 requests/day on free tier)
- Invalid stock symbol

**Fix:** Add valid ALPHAVANTAGE_KEY in backend/.env

---

### 6. API Key Errors

**Symptoms:** Backend returns errors like "Invalid API key"

**Fix:** Create `backend/.env` file:

```env
GNEWS_API_KEY=your_actual_key_here
SERPAPI_KEY=your_actual_key_here
ALPHAVANTAGE_KEY=your_actual_key_here
OPENAI_API_KEY=your_actual_key_here
TWITTER_BEARER_TOKEN=your_actual_key_here
REDDIT_CLIENT_ID=your_actual_key_here
REDDIT_CLIENT_SECRET=your_actual_key_here
REDDIT_USER_AGENT=InSightIQ/1.0
```

**Get free API keys:**
- GNews: https://gnews.io/
- SerpAPI: https://serpapi.com/
- Alpha Vantage: https://www.alphavantage.co/
- Reddit: https://www.reddit.com/prefs/apps

---

### 7. Slow Performance

**Symptoms:** Takes 10+ seconds to load insights

**Causes:**
- Multiple API calls per request
- Prophet model training takes time
- Network latency

**Normal behavior:**
- First insight load: 5-10 seconds
- Subsequent loads: 3-5 seconds

**Optimization tips:**
- Implement caching (future enhancement)
- Reduce Prophet forecast period
- Use faster APIs

---

### 8. Python/Dependencies Issues

#### A) Prophet installation fails

**Error:** `Failed building wheel for prophet`

**Fix:**
```bash
# Install pystan first
pip install pystan==2.19.1.1

# Then install prophet
pip install prophet
```

#### B) ModuleNotFoundError

**Error:** `No module named 'flask'`

**Fix:**
```bash
pip install -r requirements.txt
```

Or create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

---

## Diagnostic Tools

### Tool 1: START_HERE.html
- Verifies all files are accessible
- Checks backend connectivity
- Provides direct links to test pages

### Tool 2: diagnostic.html
- Runs automated checks
- Tests CSS, JS, and backend
- Shows detailed status for each component

### Tool 3: test.html
- Simple HTML/CSS/JS test
- Confirms browser can render basic page
- Tests JavaScript execution

### Tool 4: Browser DevTools
```
Windows/Linux: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

**What to check:**
- **Console tab:** JavaScript errors
- **Network tab:** Failed requests (404, CORS, etc.)
- **Elements tab:** Verify CSS is applied

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Not Supported
- ❌ Internet Explorer (any version)
- ❌ Old browsers without ES6 support

---

## System Requirements

### Minimum
- Python 3.8+
- 2GB RAM
- 500MB free disk space
- Internet connection (for CDN resources)

### Recommended
- Python 3.10+
- 4GB RAM
- 1GB free disk space
- Stable internet connection

---

## Testing Checklist

Run through this checklist to verify everything works:

```
[ ] Backend starts without errors
[ ] Frontend server starts on port 8080
[ ] START_HERE.html loads and shows all green checks
[ ] index.html shows dark blue background
[ ] Topic selection popup appears automatically
[ ] Clicking a topic loads 5 competitor cards
[ ] Competitor logos display (or placeholders)
[ ] Clicking "View Insights" opens modal
[ ] Modal shows loading states initially
[ ] AI insights populate after 5-10 seconds
[ ] Market forecast chart renders
[ ] News feed shows articles
[ ] Social feed shows tweets/reddit posts
[ ] "Change Topic" link works
[ ] All 10 topics load successfully
```

---

## Advanced Debugging

### Enable Debug Mode

**Backend:**
```python
# In app.py
app.run(debug=True, host='0.0.0.0', port=5000)
```

**Frontend:**
Add to main.js:
```javascript
const DEBUG = true;
if (DEBUG) console.log('Debug info:', data);
```

### Check API Responses

Test backend manually:
```bash
curl "http://localhost:5000/api/insights?company=OpenAI&symbol=MSFT"
```

Should return JSON with insights, news, social, and market_forecast.

### Validate JSON

If backend returns data but frontend doesn't show it:
```javascript
// In browser console
fetch('http://localhost:5000/api/insights?company=OpenAI&symbol=MSFT')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## Still Not Working?

1. **Restart everything:**
   - Stop all servers (Ctrl+C)
   - Close all browser tabs
   - Clear browser cache (Ctrl+Shift+Delete)
   - Restart servers
   - Open in incognito/private window

2. **Try different browser:**
   - Download Chrome or Firefox
   - Test in incognito mode

3. **Check file permissions:**
   ```bash
   ls -la frontend/
   # All files should be readable (r--)
   ```

4. **Reinstall dependencies:**
   ```bash
   cd backend
   rm -rf venv
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

5. **Use minimal test:**
   Create `test-minimal.html`:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <style>body{background:#0a0e27;color:white;padding:50px;}</style>
   </head>
   <body>
       <h1>Test Page</h1>
       <script>alert('JS Works!');</script>
   </body>
   </html>
   ```

   If this doesn't work, the problem is with your browser or file access.

---

## Getting Help

When reporting issues, please provide:

1. Operating system and version
2. Python version (`python --version`)
3. Browser and version
4. Exact error message from console
5. Screenshot of the issue
6. Which diagnostic tests passed/failed

---

## Quick Command Reference

```bash
# Start everything (Linux/Mac)
./run.sh

# Start everything (Windows)
run.bat

# Backend only
cd backend && python app.py

# Frontend only
cd frontend && python -m http.server 8080

# Install dependencies
pip install -r requirements.txt

# Check Python version
python --version

# Kill process on port (if stuck)
# Linux/Mac
lsof -ti:5000 | xargs kill
lsof -ti:8080 | xargs kill

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

Good luck! If you follow this guide, your UI should be working.
