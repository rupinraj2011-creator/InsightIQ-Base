@echo off
echo ================================================
echo   InSightIQ - Strategic Intelligence Platform
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo Error: frontend folder not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "backend" (
    echo Error: backend folder not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo [OK] Project structure verified
echo.

REM Check Python installation
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] Python found
echo.

REM Start backend
echo [*] Starting Backend Server...
cd backend

if not exist ".env" (
    echo [!] Warning: .env file not found
    echo     API features will not work without API keys
    echo     Please create backend\.env with your API keys
    echo.
)

echo [*] Installing dependencies...
pip install -q -r requirements.txt

echo [*] Starting Flask server on port 5000...
start "InSightIQ Backend" python app.py

cd ..

timeout /t 3 /nobreak >nul

REM Start frontend
echo.
echo [*] Starting Frontend Server...
cd frontend

echo [*] Starting HTTP server on port 8080...
start "InSightIQ Frontend" python -m http.server 8080

cd ..

echo.
echo ================================================
echo   InSightIQ is now running!
echo ================================================
echo.
echo Access Points:
echo   * Start Page:  http://localhost:8080/START_HERE.html
echo   * Dashboard:   http://localhost:8080/index.html
echo   * Backend API: http://localhost:5000/api/insights
echo.
echo Diagnostics:
echo   * Test Page:   http://localhost:8080/test.html
echo   * Diagnostic:  http://localhost:8080/diagnostic.html
echo.
echo Opening START_HERE.html in your browser...
timeout /t 2 /nobreak >nul
start http://localhost:8080/START_HERE.html

echo.
echo Press any key to stop all servers...
pause >nul

echo.
echo Stopping servers...
taskkill /FI "WINDOWTITLE eq InSightIQ Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq InSightIQ Frontend*" /F >nul 2>&1
echo Done!
