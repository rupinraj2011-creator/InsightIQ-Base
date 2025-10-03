const TOPICS = {
    "AI & ML": {
        fullName: "Artificial Intelligence & Machine Learning",
        competitors: [
            { name: "OpenAI", symbol: "MSFT", logo: "openai.png" },
            { name: "Anthropic", symbol: "GOOGL", logo: "anthropic.webp" },
            { name: "DeepMind", symbol: "GOOGL", logo: "deepmind.jpg" },
            { name: "Hugging Face", symbol: "MSFT", logo: "huggingface.png" },
            { name: "Stability AI", symbol: "NVDA", logo: "stability ai.jpg" }
        ]
    },
    "Cloud & SaaS": {
        fullName: "Cloud Computing & SaaS",
        competitors: [
            { name: "AWS", symbol: "AMZN", logo: "AWS.png" },
            { name: "Azure", symbol: "MSFT", logo: "azure.png" },
            { name: "Google Cloud", symbol: "GOOGL", logo: "google cloud.webp" },
            { name: "Salesforce", symbol: "CRM", logo: "salesforce.png" },
            { name: "Oracle", symbol: "ORCL", logo: "oracle.png" }
        ]
    },
    "Cybersecurity": {
        fullName: "Cybersecurity & Data Privacy",
        competitors: [
            { name: "Palo Alto Networks", symbol: "PANW", logo: "palo alto.png" },
            { name: "CrowdStrike", symbol: "CRWD", logo: "crowdstrike.jpg" },
            { name: "Fortinet", symbol: "FTNT", logo: "fortinet.webp" },
            { name: "Cloudflare", symbol: "NET", logo: "cloudflare.png" },
            { name: "Check Point", symbol: "CHKP", logo: "check point.jpg" }
        ]
    },
    "Web3 & Blockchain": {
        fullName: "Web3, Blockchain & Crypto",
        competitors: [
            { name: "Coinbase", symbol: "COIN", logo: "coinbase.jpg" },
            { name: "Binance", symbol: "BTC-USD", logo: "binance.png" },
            { name: "ConsenSys", symbol: "ETH-USD", logo: "consensys.png" },
            { name: "Chainalysis", symbol: "BTC-USD", logo: "chainalysis.webp" },
            { name: "Polygon Labs", symbol: "MATIC-USD", logo: "polygon labs.jpg" }
        ]
    },
    "AR & VR": {
        fullName: "Augmented & Virtual Reality",
        competitors: [
            { name: "Meta", symbol: "META", logo: "meta.png" },
            { name: "HTC Vive", symbol: "2498.TW", logo: "htc vive.png" },
            { name: "Niantic", symbol: "GOOGL", logo: "niantic.jpg" },
            { name: "Magic Leap", symbol: "GOOGL", logo: "magic leap.png" },
            { name: "Varjo", symbol: "NVDA", logo: "varjo.png" }
        ]
    },
    "Robotics": {
        fullName: "Robotics & Automation",
        competitors: [
            { name: "Boston Dynamics", symbol: "GOOGL", logo: "Boston Dynamics.png" },
            { name: "ABB Robotics", symbol: "ABB", logo: "abb robotics.png" },
            { name: "iRobot", symbol: "IRBT", logo: "irobot.jpg" },
            { name: "Fanuc", symbol: "6954.T", logo: "fanuc.png" },
            { name: "UiPath", symbol: "PATH", logo: "ui path.png" }
        ]
    },
    "Semiconductors": {
        fullName: "Semiconductors & Hardware",
        competitors: [
            { name: "Intel", symbol: "INTC", logo: "Intel.png" },
            { name: "AMD", symbol: "AMD", logo: "AMD.webp" },
            { name: "NVIDIA", symbol: "NVDA", logo: "nvidia.png" },
            { name: "TSMC", symbol: "TSM", logo: "tsmc.jpg" },
            { name: "Qualcomm", symbol: "QCOM", logo: "qualcomm.png" }
        ]
    },
    "Quantum Computing": {
        fullName: "Quantum Computing",
        competitors: [
            { name: "IBM Quantum", symbol: "IBM", logo: "IBM Quantum.jpg" },
            { name: "Rigetti", symbol: "RGTI", logo: "rigetti.webp" },
            { name: "IonQ", symbol: "IONQ", logo: "ionq.png" },
            { name: "D-Wave Systems", symbol: "QBTS", logo: "d-wave systems.jpg" },
            { name: "Xanadu", symbol: "IBM", logo: "xanadu.jpg" }
        ]
    },
    "Consumer Electronics": {
        fullName: "Consumer Electronics",
        competitors: [
            { name: "Apple", symbol: "AAPL", logo: "Apple.jpg" },
            { name: "Samsung Electronics", symbol: "005930.KS", logo: "samsung electronics.webp" },
            { name: "Sony", symbol: "SONY", logo: "sony.jpg" },
            { name: "LG Electronics", symbol: "066570.KS", logo: "LG electronics.png" },
            { name: "Xiaomi", symbol: "1810.HK", logo: "xiaomi.png" }
        ]
    },
    "Green Tech": {
        fullName: "Green Tech & Energy Innovation",
        competitors: [
            { name: "Tesla", symbol: "TSLA", logo: "Tesla.webp" },
            { name: "Enphase Energy", symbol: "ENPH", logo: "enphase energy.webp" },
            { name: "Siemens Energy", symbol: "ENR.DE", logo: "siemens energy.png" },
            { name: "Ørsted", symbol: "ORSTED.CO", logo: "orsted.jpg" },
            { name: "First Solar", symbol: "FSLR", logo: "first solar.png" }
        ]
    }
};

let selectedTopic = null;
let forecastChart = null;
let insightsForecastChart = null;

function initTopicModal() {
    const topicGrid = document.getElementById('topicGrid');
    topicGrid.innerHTML = '';

    Object.keys(TOPICS).forEach(key => {
        const topic = TOPICS[key];
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `
            <h3>${topic.fullName}</h3>
            <p>${topic.competitors.length} Competitors</p>
        `;
        card.onclick = () => selectTopic(key);
        topicGrid.appendChild(card);
    });
}

function selectTopic(topicKey) {
    selectedTopic = topicKey;
    const topic = TOPICS[topicKey];

    document.getElementById('topicModal').style.display = 'none';

    document.getElementById('domainTitle').textContent = topic.fullName;
    document.getElementById('domainSubtitle').textContent = `Monitoring ${topic.competitors.length} key competitors in this domain`;

    loadCompetitors(topic);
    clearFeeds();
}

function loadCompetitors(topic) {
    const grid = document.getElementById('competitorGrid');
    grid.innerHTML = '';

    topic.competitors.forEach(competitor => {
        const card = document.createElement('div');
        card.className = 'competitor-card';

        const logoPath = `../backend/logos/${topic.fullName}/${competitor.logo}`;

        card.innerHTML = `
            <img src="${logoPath}" alt="${competitor.name}" class="competitor-logo" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%231e2139%22/><text x=%2250%%22 y=%2250%%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2300d4ff%22>${competitor.name[0]}</text></svg>'">
            <h3>${competitor.name}</h3>
            <button class="view-insights-btn" onclick="loadInsights('${competitor.name}', '${competitor.symbol}')">View Insights</button>
        `;
        grid.appendChild(card);
    });
}

function clearFeeds() {
    document.getElementById('newsFeed').innerHTML = '<div class="loading">Select a competitor to view news...</div>';
    document.getElementById('socialFeed').innerHTML = '<div class="loading">Select a competitor to view social media...</div>';
}

async function loadInsights(company, symbol) {
    document.getElementById('insightsModal').style.display = 'flex';
    document.getElementById('insightsCompanyName').textContent = company;
    document.getElementById('aiInsights').textContent = 'Loading insights...';
    document.getElementById('insightsNews').innerHTML = '<div class="loading">Loading news...</div>';
    document.getElementById('insightsSocial').innerHTML = '<div class="loading">Loading social data...</div>';

    try {
        const response = await fetch(`http://localhost:5000/api/insights?company=${encodeURIComponent(company)}&symbol=${encodeURIComponent(symbol)}`);
        const data = await response.json();

        document.getElementById('aiInsights').textContent = data.insights || 'No insights available';

        renderNews(data.news, 'insightsNews');
        renderSocial(data.social, 'insightsSocial');
        renderForecast(data.market_forecast, 'insightsForecastChart', true);

        updateMainFeeds(data.news, data.social);
    } catch (error) {
        console.error('Error loading insights:', error);
        document.getElementById('aiInsights').textContent = `Error: ${error.message}. Make sure the backend server is running on http://localhost:5000`;
    }
}

function renderNews(newsData, containerId) {
    const container = document.getElementById(containerId);
    if (!newsData || newsData.length === 0) {
        container.innerHTML = '<p class="loading">No news available</p>';
        return;
    }

    container.innerHTML = newsData.slice(0, 5).map(article => `
        <div class="news-item">
            <h4>${article.title || 'Untitled'}</h4>
            <a href="${article.url || article.link || '#'}" target="_blank">Read More</a>
        </div>
    `).join('');
}

function renderSocial(socialData, containerId) {
    const container = document.getElementById(containerId);
    if (!socialData || (!socialData.twitter?.length && !socialData.reddit?.length)) {
        container.innerHTML = '<p class="loading">No social media data available</p>';
        return;
    }

    let html = '';

    if (socialData.twitter && socialData.twitter.length > 0) {
        html += '<h4 style="color: var(--accent-primary); margin-bottom: 0.5rem;">Twitter</h4>';
        html += socialData.twitter.map(tweet => `
            <div class="social-item">
                <p>${tweet.text}</p>
                <span class="timestamp">${new Date(tweet.created_at).toLocaleString()}</span>
            </div>
        `).join('');
    }

    if (socialData.reddit && socialData.reddit.length > 0) {
        html += '<h4 style="color: var(--accent-primary); margin: 1rem 0 0.5rem;">Reddit</h4>';
        html += socialData.reddit.map(post => `
            <div class="social-item">
                <p><strong>${post.title}</strong></p>
                <p>Score: ${post.score}</p>
                <a href="${post.url}" target="_blank">View Post</a>
            </div>
        `).join('');
    }

    container.innerHTML = html || '<p class="loading">No social media data available</p>';
}

function renderForecast(forecastData, chartId, isModal = false) {
    if (!forecastData || forecastData.length === 0) {
        return;
    }

    const ctx = document.getElementById(chartId).getContext('2d');

    if (isModal && insightsForecastChart) {
        insightsForecastChart.destroy();
    } else if (!isModal && forecastChart) {
        forecastChart.destroy();
    }

    const labels = forecastData.map(d => new Date(d.ds).toLocaleDateString());
    const predictions = forecastData.map(d => d.yhat);
    const upper = forecastData.map(d => d.yhat_upper);
    const lower = forecastData.map(d => d.yhat_lower);

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Predicted Price',
                    data: predictions,
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Upper Bound',
                    data: upper,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    fill: '+1',
                    tension: 0.4,
                    borderDash: [5, 5]
                },
                {
                    label: 'Lower Bound',
                    data: lower,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    fill: false,
                    tension: 0.4,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#ffffff' }
                },
                title: {
                    display: true,
                    text: '30-Day Market Forecast (Prophet)',
                    color: '#00d4ff'
                }
            },
            scales: {
                x: {
                    ticks: { color: '#a0aec0' },
                    grid: { color: '#2d3748' }
                },
                y: {
                    ticks: { color: '#a0aec0' },
                    grid: { color: '#2d3748' }
                }
            }
        }
    };

    if (isModal) {
        insightsForecastChart = new Chart(ctx, config);
    } else {
        forecastChart = new Chart(ctx, config);
    }
}

function updateMainFeeds(news, social) {
    renderNews(news, 'newsFeed');
    renderSocial(social, 'socialFeed');
}

function closeInsightsModal() {
    document.getElementById('insightsModal').style.display = 'none';
}

document.getElementById('changeTopic').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('topicModal').style.display = 'flex';
});

window.onclick = function(event) {
    const insightsModal = document.getElementById('insightsModal');
    if (event.target === insightsModal) {
        closeInsightsModal();
    }
};

window.onload = initTopicModal;
