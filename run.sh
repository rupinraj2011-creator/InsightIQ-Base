#!/bin/bash

echo "================================================"
echo "  InSightIQ - Strategic Intelligence Platform"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✓ Project structure verified"
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed"
    exit 1
fi

PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "✓ Python found: $PYTHON_CMD"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Start backend
echo "📡 Starting Backend Server..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON_CMD -m venv venv
fi

source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

echo "Installing dependencies..."
pip install -q -r requirements.txt

if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. API features will not work."
    echo "   Please create backend/.env with your API keys"
fi

echo "Starting Flask server on port 5000..."
$PYTHON_CMD app.py &
BACKEND_PID=$!
echo "✓ Backend PID: $BACKEND_PID"

cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo ""
echo "🌐 Starting Frontend Server..."
cd frontend

if check_port 8080; then
    echo "⚠️  Port 8080 is already in use"
    echo "   Frontend may be already running or choose a different port"
else
    echo "Starting HTTP server on port 8080..."
    $PYTHON_CMD -m http.server 8080 &
    FRONTEND_PID=$!
    echo "✓ Frontend PID: $FRONTEND_PID"
fi

cd ..

echo ""
echo "================================================"
echo "  🚀 InSightIQ is now running!"
echo "================================================"
echo ""
echo "📍 Access Points:"
echo "   • Frontend: http://localhost:8080/START_HERE.html"
echo "   • Dashboard: http://localhost:8080/index.html"
echo "   • Backend API: http://localhost:5000/api/insights"
echo ""
echo "🛠️  Diagnostics:"
echo "   • Test Page: http://localhost:8080/test.html"
echo "   • Diagnostic: http://localhost:8080/diagnostic.html"
echo ""
echo "⌨️  Commands:"
echo "   • View logs: Check terminal output"
echo "   • Stop servers: Press Ctrl+C"
echo ""
echo "Tip: Open http://localhost:8080/START_HERE.html in your browser"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Done!'; exit" INT

wait
