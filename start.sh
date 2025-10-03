#!/bin/bash

echo "================================================"
echo "   InSightIQ - Strategic Intelligence Platform"
echo "================================================"
echo ""

echo "Starting backend server..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/Scripts/activate || source venv/bin/activate

if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Please create one with your API keys."
fi

echo "Installing dependencies..."
pip install -q flask flask-cors requests pandas prophet praw tweepy openai python-dotenv

echo ""
echo "Backend starting on http://127.0.0.1:5000"
echo "Open index.html in your browser or run: python -m http.server 8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app.py
