// User state management
let isLoggedIn = false;
let currentUser = null;

// DOM elements
const getStartedBtn = document.getElementById('get-started-btn');
const signInOutBtn = document.getElementById('sign-in-out');
const userProfile = document.getElementById('user-profile');
const userName = document.getElementById('user-name');
const signinModal = document.getElementById('signin-modal');
const signinForm = document.getElementById('signin-form');
const closeModal = document.querySelector('.close');
const googleSigninBtn = document.getElementById('google-signin');
const notification = document.getElementById('notification');
const navHome = document.getElementById('nav-home');
const navAbout = document.getElementById('nav-about');
const navServices = document.getElementById('nav-services');
const navContact = document.getElementById('nav-contact');

// Page elements
const landingPage = document.getElementById('landing-page');
const servicesDashboard = document.getElementById('services-dashboard');
const currencyService = document.getElementById('currency-service');
const passportService = document.getElementById('passport-service');
const aadharService = document.getElementById('aadhar-service');
const licenseService = document.getElementById('license-service');
const servicePages = {
    'currency': currencyService,
    'passport': passportService,
    'aadhar': aadharService,
    'license': licenseService
};

// Service button elements
const serviceBtns = document.querySelectorAll('.service-btn');
const cancelBtns = document.querySelectorAll('.btn-cancel');

// Currency exchange elements
const exchangeAmount = document.getElementById('exchange-amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const exchangeResult = document.getElementById('exchange-result');
const exchangeRates = {
    USD: {
        INR: 82.45,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 147.23
    },
    EUR: {
        INR: 89.62,
        USD: 1.08,
        GBP: 0.86,
        JPY: 160.05
    },
    GBP: {
        INR: 104.14,
        USD: 1.27,
        EUR: 1.16,
        JPY: 185.80
    },
    JPY: {
        INR: 0.56,
        USD: 0.0068,
        EUR: 0.0062,
        GBP: 0.0054
    }
};

// ---
// Event Listeners
// ---

document.addEventListener('DOMContentLoaded', () => {
    handleUrlChange();
});

window.addEventListener('popstate', handleUrlChange);

getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn) {
        showPage('dashboard');
    } else {
        showNotification('Please sign in to access the dashboard.', 'info');
        signinModal.style.display = 'block';
    }
});

signInOutBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        signOut();
    } else {
        signinModal.style.display = 'block';
    }
});

closeModal.addEventListener('click', () => {
    signinModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == signinModal) {
        signinModal.style.display = 'none';
    }
});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    signIn(username);
    signinModal.style.display = 'none';
});

serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const service = btn.parentElement.parentElement.dataset.service;
        showServicePage(service);
    });
});

cancelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('dashboard');
    });
});

// Navigation handlers
navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
});
navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('about');
});
navServices.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn) {
        showPage('dashboard');
    } else {
        showPage('home');
        document.getElementById('services-overview').scrollIntoView({
            behavior: 'smooth'
        });
    }
});
navContact.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('contact');
});

// Currency exchange
if (exchangeAmount) {
    exchangeAmount.addEventListener('input', calculateExchange);
    fromCurrency.addEventListener('change', calculateExchange);
    toCurrency.addEventListener('change', calculateExchange);
}

// ---
// Functions
// ---

// Handles routing based on URL
function handleUrlChange() {
    const path = window.location.pathname.replace('/', '');
    const service = window.location.hash.replace('#', '');
    
    // Check for specific pages
    if (path === 'dashboard') {
        showPage('dashboard', false);
    } else if (path === 'service' && service in servicePages) {
        showServicePage(service, false);
    } else {
        // Fallback for any other path, including '/'
        showPage('home', false);
    }
}

// Shows specific page sections and updates history
function showPage(pageId, pushState = true) {
    hideAllPages();
    
    switch (pageId) {
        case 'home':
            landingPage.style.display = 'block';
            if (pushState) history.pushState({ page: 'home' }, 'Home', '/');
            break;
        case 'about':
            document.querySelector('.about').style.display = 'block';
            if (pushState) history.pushState({ page: 'about' }, 'About Us', '/about');
            break;
        case 'contact':
            document.querySelector('.contact').style.display = 'block';
            if (pushState) history.pushState({ page: 'contact' }, 'Contact Us', '/contact');
            break;
        case 'dashboard':
            if (isLoggedIn) {
                servicesDashboard.style.display = 'block';
                if (pushState) history.pushState({ page: 'dashboard' }, 'Dashboard', '/dashboard');
            } else {
                showNotification('Please sign in to access the dashboard.', 'danger');
                showPage('home');
            }
            break;
        default:
            showPage('home');
            break;
    }
}

function showServicePage(serviceId, pushState = true) {
    if (isLoggedIn) {
        hideAllPages();
        const page = servicePages[serviceId];
        if (page) {
            page.style.display = 'block';
            if (pushState) history.pushState({ page: 'service', id: serviceId }, `${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} Service`, `/service#${serviceId}`);
        }
    } else {
        showNotification('Please sign in to access services.', 'danger');
        showPage('home');
    }
}

function hideAllPages() {
    landingPage.style.display = 'none';
    servicesDashboard.style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.contact').style.display = 'none';
    Object.values(servicePages).forEach(page => {
        if (page) {
            page.style.display = 'none';
        }
    });
}

// User authentication
function signIn(username) {
    isLoggedIn = true;
    currentUser = username;
    signInOutBtn.textContent = 'Sign Out';
    userProfile.style.display = 'inline-block';
    userName.textContent = currentUser;
    showNotification(`Welcome, ${currentUser}! You are now signed in.`, 'success');
    showPage('dashboard');
}

function signOut() {
    isLoggedIn = false;
    currentUser = null;
    signInOutBtn.textContent = 'Sign In';
    userProfile.style.display = 'none';
    showNotification('You have been signed out.', 'info');
    showPage('home');
}

// Show notification
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Calculate currency exchange
function calculateExchange() {
    const amount = parseFloat(exchangeAmount.value) || 0;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (from === to) {
        exchangeResult.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    const rate = exchangeRates[from][to];
    const result = (amount * rate).toFixed(2);

    exchangeResult.textContent = `${amount} ${from} = ${result} ${to}`;
}
