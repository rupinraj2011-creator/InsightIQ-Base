# Quick Start Guide - InSightIQ

## Can't See the UI? Follow These Steps:

### Step 1: Open the Diagnostic Page
1. Navigate to the `frontend` folder
2. Open `diagnostic.html` in your browser
3. This will check if all files are loading correctly

### Step 2: Check File Access

**Option A: Using Python (Recommended)**
```bash
cd frontend
python -m http.server 8080
```
Then open: `http://localhost:8080/index.html`

**Option B: Using Live Server (VS Code)**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Option C: Direct File Access**
1. Navigate to `frontend` folder
2. Double-click `index.html`
3. It should open in your default browser

### Step 3: Common Issues & Fixes

#### Issue 1: Blank Page
**Symptoms:** Page loads but shows nothing
**Fix:**
- Open browser console (F12 → Console tab)
- Look for error messages
- Check if CSS/JS files are loading

#### Issue 2: CSS Not Loading
**Symptoms:** Page shows text but no styling
**Fixes:**
1. Check file paths are correct
2. Make sure you're in the `frontend` directory
3. Verify `css/styles.css` exists
4. Try clearing browser cache (Ctrl+Shift+R)

#### Issue 3: JavaScript Not Running
**Symptoms:** No popup appears, no interactivity
**Fixes:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify `js/main.js` exists
4. Make sure JavaScript is enabled in browser

#### Issue 4: Can't Connect to Backend
**Symptoms:** "Failed to fetch" errors in console
**Fixes:**
1. Make sure backend is running:
   ```bash
   cd backend
   python app.py
   ```
2. Backend should say "Running on http://127.0.0.1:5000"
3. Check CORS is enabled in backend

### Step 4: Manual File Check

Run this in terminal from the `frontend` folder:
```bash
ls -la
ls -la css/
ls -la js/
```

You should see:
- `index.html`
- `css/styles.css`
- `js/main.js`

### Step 5: Test Each Component

1. **Test HTML**: Open `test.html` - you should see a styled page
2. **Test Diagnostic**: Open `diagnostic.html` - it will check all files
3. **Test Main Page**: Open `index.html` - popup should appear

### Step 6: Browser Compatibility

Make sure you're using a modern browser:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

### Step 7: Check Console for Errors

1. Open index.html
2. Press F12 (or Cmd+Option+I on Mac)
3. Go to "Console" tab
4. Take a screenshot of any red errors
5. Common errors and fixes:

```
Error: "Failed to load resource: css/styles.css"
Fix: You're in the wrong directory. cd to frontend folder first.

Error: "Uncaught SyntaxError in main.js"
Fix: JavaScript file is corrupted. Re-download or check the file.

Error: "CORS policy blocked"
Fix: Start backend with Flask-CORS enabled, or use python http.server.

Error: "Chart is not defined"
Fix: Chart.js CDN is blocked. Check internet connection.
```

### Step 8: Backend Setup (Required for Full Functionality)

The UI will load without the backend, but you need it for data:

1. **Install Dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure .env file**:
```env
GNEWS_API_KEY=your_key
SERPAPI_KEY=your_key
ALPHAVANTAGE_KEY=your_key
OPENAI_API_KEY=your_key
TWITTER_BEARER_TOKEN=your_key
REDDIT_CLIENT_ID=your_key
REDDIT_CLIENT_SECRET=your_key
REDDIT_USER_AGENT=InSightIQ/1.0
```

3. **Start Backend**:
```bash
python app.py
```

You should see: `Running on http://127.0.0.1:5000`

### Step 9: Full System Test

With both frontend and backend running:

1. Open `http://localhost:8080/index.html`
2. You should see a popup with 10 topics
3. Click "AI & ML"
4. You should see 5 competitor cards
5. Click "View Insights" on OpenAI
6. Wait 5-10 seconds for data to load
7. You should see insights, charts, news, and social feeds

### Still Not Working?

Try this minimal HTML test:

Create `minimal-test.html` in frontend folder:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Minimal Test</title>
    <style>body { background: #0a0e27; color: white; font-size: 24px; padding: 50px; }</style>
</head>
<body>
    <h1>If you see this, HTML is working!</h1>
    <script>alert('JavaScript is working!');</script>
</body>
</html>
```

Open it in browser. If you see the message and alert, then the issue is with the main files.

### Need More Help?

1. Share the exact error message from browser console
2. Specify which browser and version you're using
3. Confirm which operating system (Windows/Mac/Linux)
4. Confirm Python version: `python --version`

## Expected Behavior (When Everything Works)

1. ✅ Browser opens index.html
2. ✅ Dark blue background appears
3. ✅ Popup modal shows with 10 topic cards
4. ✅ Clicking a topic loads 5 competitor cards
5. ✅ Clicking "View Insights" opens modal with data
6. ✅ Charts render with Prophet forecasts
7. ✅ News and social feeds populate

## File Checklist

```
frontend/
  ├── index.html          ✓ Main dashboard
  ├── test.html           ✓ Basic test page
  ├── diagnostic.html     ✓ Diagnostic tool
  ├── css/
  │   └── styles.css      ✓ Dark theme styles
  └── js/
      └── main.js         ✓ All JavaScript logic

backend/
  ├── app.py              ✓ Flask API server
  ├── requirements.txt    ✓ Python dependencies
  ├── .env                ✓ API keys (you create this)
  └── logos/              ✓ Competitor logos
```

Good luck! The UI should work now.
