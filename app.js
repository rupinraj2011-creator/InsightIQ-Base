const API_BASE_URL = 'http://127.0.0.1:5000';

const TOPICS_CONFIG = {
    'ai-ml': {
        name: 'AI & Machine Learning',
        folder: 'AI & ML',
        competitors: [
            { name: 'OpenAI', symbol: 'MSFT', logo: 'openai.png' },
            { name: 'Anthropic', symbol: 'GOOGL', logo: 'anthropic.webp' },
            { name: 'DeepMind', symbol: 'GOOGL', logo: 'deepmind.jpg' },
            { name: 'Hugging Face', symbol: 'MSFT', logo: 'huggingface.png' },
            { name: 'Stability AI', symbol: 'NVDA', logo: 'stability ai.jpg' }
        ]
    },
    'cloud-saas': {
        name: 'Cloud Computing & SaaS',
        folder: 'Cloud computing & Saas',
        competitors: [
            { name: 'AWS', symbol: 'AMZN', logo: 'AWS.png' },
            { name: 'Microsoft Azure', symbol: 'MSFT', logo: 'azure.png' },
            { name: 'Google Cloud', symbol: 'GOOGL', logo: 'google cloud.webp' },
            { name: 'Salesforce', symbol: 'CRM', logo: 'salesforce.png' },
            { name: 'Oracle', symbol: 'ORCL', logo: 'oracle.png' }
        ]
    },
    'cybersecurity': {
        name: 'Cybersecurity & Data Privacy',
        folder: 'cybersecurity & data privacy',
        competitors: [
            { name: 'Palo Alto Networks', symbol: 'PANW', logo: 'palo alto.png' },
            { name: 'CrowdStrike', symbol: 'CRWD', logo: 'crowdstrike.jpg' },
            { name: 'Fortinet', symbol: 'FTNT', logo: 'fortinet.webp' },
            { name: 'Cloudflare', symbol: 'NET', logo: 'cloudflare.png' },
            { name: 'Check Point', symbol: 'CHKP', logo: 'check point.jpg' }
        ]
    },
    'web3': {
        name: 'Web3, Blockchain & Crypto',
        folder: 'web3, blockchain & crypto',
        competitors: [
            { name: 'Coinbase', symbol: 'COIN', logo: 'coinbase.jpg' },
            { name: 'Binance', symbol: 'BNB', logo: 'binance.png' },
            { name: 'ConsenSys', symbol: 'ETH', logo: 'consensys.png' },
            { name: 'Chainalysis', symbol: 'BTC', logo: 'chainalysis.webp' },
            { name: 'Polygon Labs', symbol: 'MATIC', logo: 'polygon labs.jpg' }
        ]
    },
    'ar-vr': {
        name: 'Augmented & Virtual Reality',
        folder: 'Augmented & Virtual Reality',
        competitors: [
            { name: 'Meta Reality Labs', symbol: 'META', logo: 'meta.png' },
            { name: 'HTC Vive', symbol: 'HTCKF', logo: 'htc vive.png' },
            { name: 'Niantic', symbol: 'GOOGL', logo: 'niantic.jpg' },
            { name: 'Magic Leap', symbol: 'GOOGL', logo: 'magic leap.png' },
            { name: 'Varjo', symbol: 'AAPL', logo: 'varjo.png' }
        ]
    },
    'robotics': {
        name: 'Robotics & Automation',
        folder: 'Robotics & Automation',
        competitors: [
            { name: 'Boston Dynamics', symbol: 'HYUD', logo: 'Boston Dynamics.png' },
            { name: 'ABB Robotics', symbol: 'ABB', logo: 'abb robotics.png' },
            { name: 'iRobot', symbol: 'IRBT', logo: 'irobot.jpg' },
            { name: 'Fanuc', symbol: 'FANUY', logo: 'fanuc.png' },
            { name: 'UiPath', symbol: 'PATH', logo: 'ui path.png' }
        ]
    },
    'semiconductors': {
        name: 'Semiconductors & Hardware',
        folder: 'Semiconductors & Hardware',
        competitors: [
            { name: 'Intel', symbol: 'INTC', logo: 'Intel.png' },
            { name: 'AMD', symbol: 'AMD', logo: 'AMD.webp' },
            { name: 'NVIDIA', symbol: 'NVDA', logo: 'nvidia.png' },
            { name: 'TSMC', symbol: 'TSM', logo: 'tsmc.jpg' },
            { name: 'Qualcomm', symbol: 'QCOM', logo: 'qualcomm.png' }
        ]
    },
    'quantum': {
        name: 'Quantum Computing',
        folder: 'Quantum Computing',
        competitors: [
            { name: 'IBM Quantum', symbol: 'IBM', logo: 'IBM Quantum.jpg' },
            { name: 'Rigetti', symbol: 'RGTI', logo: 'rigetti.webp' },
            { name: 'IonQ', symbol: 'IONQ', logo: 'ionq.png' },
            { name: 'D-Wave Systems', symbol: 'QBTS', logo: 'd-wave systems.jpg' },
            { name: 'Xanadu', symbol: 'GOOGL', logo: 'xanadu.jpg' }
        ]
    },
    'consumer-electronics': {
        name: 'Consumer Electronics',
        folder: 'Consumer Electronics',
        competitors: [
            { name: 'Apple', symbol: 'AAPL', logo: 'Apple.jpg' },
            { name: 'Samsung Electronics', symbol: 'SSNLF', logo: 'samsung electronics.webp' },
            { name: 'Sony', symbol: 'SONY', logo: 'sony.jpg' },
            { name: 'LG Electronics', symbol: 'LGEAF', logo: 'LG electronics.png' },
            { name: 'Xiaomi', symbol: 'XIACY', logo: 'xiaomi.png' }
        ]
    },
    'green-tech': {
        name: 'Green Tech & Energy Innovation',
        folder: 'Green tech & Energy innovations',
        competitors: [
            { name: 'Tesla Energy', symbol: 'TSLA', logo: 'Tesla.webp' },
            { name: 'Enphase Energy', symbol: 'ENPH', logo: 'enphase energy.webp' },
            { name: 'Siemens Energy', symbol: 'SMNEY', logo: 'siemens energy.png' },
            { name: 'Ørsted', symbol: 'DNNGY', logo: 'orsted.jpg' },
            { name: 'First Solar', symbol: 'FSLR', logo: 'first solar.png' }
        ]
    }
};

let currentTopic = null;
let currentChartInstance = null;
let modalChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkForSavedTopic();
});

function initializeEventListeners() {
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.dataset.topic;
            selectTopic(topic);
        });
    });

    document.getElementById('refreshBtn').addEventListener('click', () => {
        if (currentTopic) {
            loadDashboardData(currentTopic);
        }
    });

    document.getElementById('closeInsightsModal').addEventListener('click', () => {
        closeInsightsModal();
    });

    const socialTabs = document.querySelectorAll('.social-tab');
    socialTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchSocialTab(tab.dataset.tab);
        });
    });

    document.getElementById('insightsModal').addEventListener('click', (e) => {
        if (e.target.id === 'insightsModal') {
            closeInsightsModal();
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function checkForSavedTopic() {
    const savedTopic = localStorage.getItem('selectedTopic');
    if (savedTopic && TOPICS_CONFIG[savedTopic]) {
        selectTopic(savedTopic);
    }
}

function selectTopic(topicId) {
    currentTopic = topicId;
    localStorage.setItem('selectedTopic', topicId);

    const topicConfig = TOPICS_CONFIG[topicId];
    document.getElementById('dashboardTitle').textContent = topicConfig.name;
    document.getElementById('dashboardSubtitle').textContent = 'Analyzing competitive landscape and market intelligence';

    document.getElementById('topicModal').classList.remove('show');

    loadDashboardData(topicId);
}

function loadDashboardData(topicId) {
    const topicConfig = TOPICS_CONFIG[topicId];
    renderCompetitorCards(topicConfig);
    loadAggregatedData(topicConfig);
}

function renderCompetitorCards(topicConfig) {
    const grid = document.getElementById('competitorsGrid');
    grid.innerHTML = '';

    topicConfig.competitors.forEach(competitor => {
        const card = createCompetitorCard(competitor, topicConfig.folder);
        grid.appendChild(card);
    });
}

function createCompetitorCard(competitor, folder) {
    const card = document.createElement('div');
    card.className = 'competitor-card';

    const logoPath = `${API_BASE_URL}/logos/${encodeURIComponent(folder)}/${encodeURIComponent(competitor.logo)}`;

    card.innerHTML = `
        <div class="competitor-logo-container">
            <img src="${logoPath}"
                 alt="${competitor.name}"
                 class="competitor-logo"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%231a2238%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%239ca3af%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${competitor.name.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E'">
        </div>
        <h3 class="competitor-name">${competitor.name}</h3>
        <p class="competitor-symbol">${competitor.symbol}</p>
        <button class="view-insights-btn">View Insights</button>
    `;

    card.querySelector('.view-insights-btn').addEventListener('click', () => {
        openInsightsModal(competitor, logoPath);
    });

    return card;
}

async function openInsightsModal(competitor, logoPath) {
    const modal = document.getElementById('insightsModal');
    modal.classList.add('show');

    document.getElementById('modalCompanyName').textContent = competitor.name;
    document.getElementById('modalCompanySymbol').textContent = `Symbol: ${competitor.symbol}`;
    document.getElementById('modalCompanyLogo').src = logoPath;

    document.getElementById('modalLoading').style.display = 'block';
    document.getElementById('modalContent').style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/api/insights?company=${encodeURIComponent(competitor.name)}&symbol=${competitor.symbol}`);
        const data = await response.json();

        renderModalContent(data);

        document.getElementById('modalLoading').style.display = 'none';
        document.getElementById('modalContent').style.display = 'block';
    } catch (error) {
        console.error('Error fetching insights:', error);
        document.getElementById('modalLoading').innerHTML = `
            <div style="color: var(--accent-danger); padding: 2rem;">
                <p>Error loading insights. Please ensure the backend server is running.</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Backend should be accessible at: ${API_BASE_URL}</p>
            </div>
        `;
    }
}

function renderModalContent(data) {
    document.getElementById('aiInsights').textContent = data.insights || 'No insights available';

    renderModalNews(data.news || []);

    renderModalSocial(data.social || { twitter: [], reddit: [] });

    renderModalForecast(data.market_forecast || []);
}

function renderModalNews(news) {
    const newsContainer = document.getElementById('modalNews');

    if (!news || news.length === 0) {
        newsContainer.innerHTML = '<p style="color: var(--text-secondary);">No recent news available</p>';
        return;
    }

    newsContainer.innerHTML = news.slice(0, 10).map(article => `
        <div class="news-item">
            <h4>${article.title || 'Untitled'}</h4>
            <p>${article.description || article.snippet || ''}</p>
            <a href="${article.url || article.link || '#'}" target="_blank">Read more →</a>
        </div>
    `).join('');
}

function renderModalSocial(social) {
    window.currentModalSocial = social;
    switchSocialTab('twitter');
}

function switchSocialTab(platform) {
    document.querySelectorAll('.social-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === platform);
    });

    const socialContainer = document.getElementById('modalSocial');
    const social = window.currentModalSocial || { twitter: [], reddit: [] };
    const data = social[platform] || [];

    if (data.length === 0) {
        socialContainer.innerHTML = `<p style="color: var(--text-secondary);">No ${platform} data available</p>`;
        return;
    }

    if (platform === 'twitter') {
        socialContainer.innerHTML = data.map(tweet => `
            <div class="social-item">
                <div class="social-item-header">
                    <span class="social-platform">Twitter</span>
                    <span class="social-score">${tweet.created_at || ''}</span>
                </div>
                <p>${tweet.text || ''}</p>
            </div>
        `).join('');
    } else if (platform === 'reddit') {
        socialContainer.innerHTML = data.map(post => `
            <div class="social-item">
                <div class="social-item-header">
                    <span class="social-platform">Reddit</span>
                    <span class="social-score">↑ ${post.score || 0}</span>
                </div>
                <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-primary);">${post.title || ''}</h4>
                <a href="${post.url || '#'}" target="_blank" style="font-size: 0.8rem; color: var(--accent-primary);">View post →</a>
            </div>
        `).join('');
    }
}

function renderModalForecast(forecastData) {
    if (modalChartInstance) {
        modalChartInstance.destroy();
    }

    const ctx = document.getElementById('modalForecastChart').getContext('2d');

    if (!forecastData || forecastData.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No forecast data available', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    const labels = forecastData.map(d => {
        const date = new Date(d.ds);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const yhatData = forecastData.map(d => d.yhat);
    const yhatLower = forecastData.map(d => d.yhat_lower);
    const yhatUpper = forecastData.map(d => d.yhat_upper);

    modalChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Forecast',
                    data: yhatData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Upper Bound',
                    data: yhatUpper,
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Lower Bound',
                    data: yhatLower,
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#9ca3af'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 34, 56, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#9ca3af',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

function closeInsightsModal() {
    document.getElementById('insightsModal').classList.remove('show');
    if (modalChartInstance) {
        modalChartInstance.destroy();
        modalChartInstance = null;
    }
}

async function loadAggregatedData(topicConfig) {
    const firstCompetitor = topicConfig.competitors[0];

    try {
        const response = await fetch(`${API_BASE_URL}/api/insights?company=${encodeURIComponent(firstCompetitor.name)}&symbol=${firstCompetitor.symbol}`);
        const data = await response.json();

        renderDashboardNews(data.news || []);
        renderDashboardSocial(data.social || { twitter: [], reddit: [] });
        renderDashboardForecast(data.market_forecast || []);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        renderEmptyStates();
    }
}

function renderDashboardNews(news) {
    const newsContainer = document.getElementById('newsFeed');

    if (!news || news.length === 0) {
        newsContainer.innerHTML = '<div class="feed-placeholder">No news data available</div>';
        return;
    }

    newsContainer.innerHTML = news.slice(0, 8).map(article => `
        <div class="news-item">
            <h4>${article.title || 'Untitled'}</h4>
            <p>${article.description || article.snippet || ''}</p>
            <a href="${article.url || article.link || '#'}" target="_blank">Read more →</a>
        </div>
    `).join('');
}

function renderDashboardSocial(social) {
    const socialContainer = document.getElementById('socialFeed');

    const allPosts = [
        ...(social.twitter || []).map(t => ({ ...t, platform: 'Twitter' })),
        ...(social.reddit || []).map(r => ({ ...r, platform: 'Reddit' }))
    ];

    if (allPosts.length === 0) {
        socialContainer.innerHTML = '<div class="feed-placeholder">No social data available</div>';
        return;
    }

    socialContainer.innerHTML = allPosts.slice(0, 8).map(post => {
        if (post.platform === 'Twitter') {
            return `
                <div class="social-item">
                    <div class="social-item-header">
                        <span class="social-platform">Twitter</span>
                    </div>
                    <p>${post.text || ''}</p>
                </div>
            `;
        } else {
            return `
                <div class="social-item">
                    <div class="social-item-header">
                        <span class="social-platform">Reddit</span>
                        <span class="social-score">↑ ${post.score || 0}</span>
                    </div>
                    <p>${post.title || ''}</p>
                </div>
            `;
        }
    }).join('');
}

function renderDashboardForecast(forecastData) {
    if (currentChartInstance) {
        currentChartInstance.destroy();
    }

    const ctx = document.getElementById('forecastChart').getContext('2d');

    if (!forecastData || forecastData.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Select a topic to view market forecast', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    const labels = forecastData.map(d => {
        const date = new Date(d.ds);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const yhatData = forecastData.map(d => d.yhat);

    currentChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Market Forecast',
                    data: yhatData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#9ca3af'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 34, 56, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#9ca3af',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        maxTicksLimit: 10
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

function renderEmptyStates() {
    document.getElementById('newsFeed').innerHTML = '<div class="feed-placeholder">Unable to load news data</div>';
    document.getElementById('socialFeed').innerHTML = '<div class="feed-placeholder">Unable to load social data</div>';
}
