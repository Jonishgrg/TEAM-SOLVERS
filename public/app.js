// ========== CONFIG ==========
const API_BASE = '/api';
let isLoggedIn = false;
let currentUser = null;
let allMarketPrices = [];

// ========== DOM ELEMENTS ==========
const loadingScreen = document.getElementById('loadingScreen');
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profileBtn = document.getElementById('profileBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const closeBtn = document.querySelector('.close');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  hideLoadingScreen();
});

function setupEventListeners() {
  // Navigation
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => switchPage(e.target.dataset.page));
  });

  // Auth
  if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  if (closeBtn) closeBtn.addEventListener('click', closeLoginModal);
  if (loginForm) loginForm.addEventListener('submit', login);

  // Market Prices
  const searchInput = document.getElementById('searchPrices');
  if (searchInput) searchInput.addEventListener('input', searchPrices);
  
  const refreshBtn = document.getElementById('refreshPrices');
  if (refreshBtn) refreshBtn.addEventListener('click', refreshPrices);

  // Weather
  const weatherBtn = document.getElementById('getWeatherBtn');
  if (weatherBtn) weatherBtn.addEventListener('click', getWeather);
  
  const weatherLoc = document.getElementById('weatherLocation');
  if (weatherLoc) weatherLoc.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
  });

  // Chat
  const chatToggle = document.getElementById('chatToggle');
  if (chatToggle) chatToggle.addEventListener('click', toggleChat);
  
  const chatClose = document.getElementById('chatClose');
  if (chatClose) chatClose.addEventListener('click', toggleChat);
  
  const chatSend = document.getElementById('chatSend');
  if (chatSend) chatSend.addEventListener('click', sendMessage);
  
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Expert Form
  const expertForm = document.getElementById('expertForm');
  if (expertForm) expertForm.addEventListener('submit', submitQuestion);

  // Loading initial prices (non-blocking)
  try {
    loadMarketPrices().catch(() => {});
  } catch (e) {}
  
  try {
    updateClocks();
    setInterval(updateClocks, 1000);
  } catch (e) {}
}

// ========== PAGE NAVIGATION ==========
function switchPage(pageName) {
  // Hide all pages
  pages.forEach(page => page.classList.remove('active'));

  // Show requested page
  const page = document.getElementById(pageName);
  if (page) {
    page.classList.add('active');
  }

  // Update nav buttons
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageName);
  });

  // Scroll to top
  window.scrollTo(0, 0);
}

// ========== LOADING SCREEN ==========
function hideLoadingScreen() {
  // Hide immediately instead of waiting
  if (loadingScreen) {
    loadingScreen.classList.add('hide');
  }
}

// ========== AUTHENTICATION ==========
function openLoginModal() {
  loginModal.style.display = 'flex';
}

function closeLoginModal() {
  loginModal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    closeLoginModal();
  }
});

function login(e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Simulate login (in real app, send to backend)
  if (email && password) {
    isLoggedIn = true;
    currentUser = { email, name: email.split('@')[0] };

    // Update UI
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    profileBtn.style.display = 'inline-block';

    closeLoginModal();
    loginForm.reset();
    alert(`Welcome, ${currentUser.name}!`);
  }
}

function logout() {
  isLoggedIn = false;
  currentUser = null;
  loginBtn.style.display = 'inline-block';
  logoutBtn.style.display = 'none';
  profileBtn.style.display = 'none';
  switchPage('home');
  alert('Logged out successfully');
}

// ========== MARKET PRICES ==========
async function loadMarketPrices() {
  try {
    const pricesLoading = document.getElementById('pricesLoading');
    if (pricesLoading) pricesLoading.style.display = 'block';

    const response = await fetch(`${API_BASE}/market-prices`);
    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      allMarketPrices = data.data;
      displayPrices(allMarketPrices.slice(0, 8));

      // Update info
      const sourceEl = document.getElementById('pricesSource');
      const timeEl = document.getElementById('pricesTime');
      if (sourceEl) sourceEl.textContent = data.source || 'static';
      if (timeEl) {
        const time = new Date(data.fetchedAt).toLocaleTimeString();
        timeEl.textContent = time;
      }
    }

    if (pricesLoading) pricesLoading.style.display = 'none';
  } catch (error) {
    console.error('Error loading prices:', error);
    const errorEl = document.getElementById('pricesError');
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = 'Error loading prices. Please try again.';
    }
  }
}

function displayPrices(prices) {
  const pricesList = document.getElementById('pricesList');
  if (!pricesList) return;

  pricesList.innerHTML = prices.map(price => `
    <div class="price-card">
      <h4>${price.commodity}</h4>
      <div class="price-info">
        <div>
          <strong>Min:</strong> Rs ${price.minPrice}
        </div>
        <div>
          <strong>Max:</strong> Rs ${price.maxPrice}
        </div>
      </div>
      <div class="price-value">
        Avg: Rs ${price.average}
      </div>
      <p style="font-size: 12px; color: #999; margin-top: 10px;">${price.location}</p>
    </div>
  `).join('');

  // Show/hide show more button
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    if (allMarketPrices.length > 8) {
      showMoreBtn.style.display = 'block';
      showMoreBtn.textContent = showMoreBtn.textContent.includes('Show Less') ? 'Show Less' : 'Show More';
      showMoreBtn.onclick = toggleShowMore;
    }
  }
}

function toggleShowMore() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const isShowingMore = showMoreBtn.textContent.includes('Show Less');
  displayPrices(isShowingMore ? allMarketPrices.slice(0, 8) : allMarketPrices);
  showMoreBtn.textContent = isShowingMore ? 'Show More' : 'Show Less';
}

function searchPrices(e) {
  const query = e.target.value.toLowerCase();
  const filtered = allMarketPrices.filter(price =>
    price.commodity.toLowerCase().includes(query)
  );
  displayPrices(filtered.slice(0, 8));
}

async function refreshPrices() {
  const refreshBtn = document.getElementById('refreshPrices');
  if (refreshBtn) {
    refreshBtn.textContent = 'Refreshing...';
    refreshBtn.disabled = true;
  }

  try {
    const response = await fetch(`${API_BASE}/market-prices/refresh`, { method: 'POST' });
    await response.json();
    await loadMarketPrices();
    if (refreshBtn) {
      refreshBtn.textContent = 'Refresh Prices';
      refreshBtn.disabled = false;
    }
  } catch (error) {
    console.error('Error refreshing prices:', error);
    if (refreshBtn) {
      refreshBtn.textContent = 'Refresh Prices';
      refreshBtn.disabled = false;
    }
  }
}

// ========== WEATHER ==========
async function getWeather() {
  const location = document.getElementById('weatherLocation')?.value || 'Kathmandu';
  if (!location) return;

  const weatherLoading = document.getElementById('weatherLoading');
  const weatherError = document.getElementById('weatherError');
  const weatherCurrent = document.getElementById('weatherCurrent');
  const weatherForecast = document.getElementById('weatherForecast');

  if (weatherLoading) weatherLoading.style.display = 'block';
  if (weatherError) weatherError.style.display = 'none';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=afb2cd5354add6d56b08a10adf61cffa`
    );

    if (!response.ok) throw new Error('Location not found');

    const data = await response.json();

    // Current weather
    if (weatherCurrent) {
      weatherCurrent.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <div class="temp-display">${Math.round(data.main.temp)}°C</div>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      `;
    }

    // Get forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=afb2cd5354add6d56b08a10adf61cffa`
    );
    const forecastData = await forecastResponse.json();

    // Process forecast (daily)
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = item;
      }
    });

    if (weatherForecast) {
      weatherForecast.innerHTML = Object.values(dailyForecasts)
        .slice(0, 5)
        .map(day => `
          <div class="forecast-day">
            <div class="day-name">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div class="temp">${Math.round(day.main.temp)}°C</div>
            <p>${day.weather[0].main}</p>
          </div>
        `).join('');
    }

    if (weatherLoading) weatherLoading.style.display = 'none';
  } catch (error) {
    console.error('Error fetching weather:', error);
    if (weatherError) {
      weatherError.style.display = 'block';
      weatherError.textContent = error.message || 'Error loading weather data';
    }
    if (weatherLoading) weatherLoading.style.display = 'none';
  }
}

// ========== WORLD CLOCK ==========
function updateClocks() {
  const clockContainer = document.getElementById('clockContainer');
  if (!clockContainer) return;

  const timezones = [
    { name: 'Nepal (NPT)', offset: 5.75 },
    { name: 'UTC', offset: 0 },
    { name: 'London (GMT)', offset: 0 },
    { name: 'New York (EST)', offset: -5 },
    { name: 'Tokyo (JST)', offset: 9 },
    { name: 'Sydney (AEST)', offset: 10 },
    { name: 'Dubai (GST)', offset: 4 },
    { name: 'Delhi (IST)', offset: 5.5 }
  ];

  clockContainer.innerHTML = timezones.map(tz => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const offsetMs = tz.offset * 60 * 60000;
    const localDate = new Date(utc + offsetMs);
    const time = localDate.toLocaleTimeString();

    return `
      <div class="clock-item">
        <div class="clock-location">${tz.name}</div>
        <div class="clock-time">${time}</div>
      </div>
    `;
  }).join('');
}

// ========== CHAT ==========
function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  if (chatWindow) {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const message = chatInput?.value.trim();

  if (!message) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user-message';
  userMsg.textContent = message;
  chatMessages?.appendChild(userMsg);

  // Simulate bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot-message';
    botMsg.textContent = 'Thanks for your message! This is a beta feature. Our team will get back to you soon.';
    chatMessages?.appendChild(botMsg);
    chatMessages?.scrollTop = chatMessages?.scrollHeight || 0;
  }, 500);

  chatInput.value = '';
  chatMessages?.scrollTop = chatMessages?.scrollHeight || 0;
}

// ========== EXPERT QUESTION ==========
function submitQuestion(e) {
  e.preventDefault();
  const form = document.getElementById('expertForm');
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const topic = form.querySelectorAll('input[type="text"]')[1].value;
  const question = form.querySelector('textarea').value;

  // Simulate submission
  alert(`Thank you, ${name}! Your question about "${topic}" has been submitted. Our experts will respond soon.`);
  form.reset();
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}
