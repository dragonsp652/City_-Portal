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
        
        // Page elements
        const landingPage = document.getElementById('landing-page');
        const servicesDashboard = document.getElementById('services-dashboard');
        const currencyService = document.getElementById('currency-service');
        const passportService = document.getElementById('passport-service');
        const aadharService = document.getElementById('aadhar-service');
        const licenseService = document.getElementById('license-service');
        
        // Navigation elements
        const navHome = document.getElementById('nav-home');
        const navAbout = document.getElementById('nav-about');
        const navServices = document.getElementById('nav-services');
        const navContact = document.getElementById('nav-contact');
        
        // Footer elements
        const footerHome = document.getElementById('footer-home');
        const footerAbout = document.getElementById('footer-about');
        const footerServices = document.getElementById('footer-services');
        const footerContact = document.getElementById('footer-contact');
        
        // Service boxes
        const serviceBoxes = document.querySelectorAll('.service-box');
        
        // Service forms
        const currencyForm = document.querySelector('#currency-service .service-form');
        const passportForm = document.querySelector('#passport-service .service-form');
        const aadharForm = document.querySelector('#aadhar-service .service-form');
        const licenseForm = document.querySelector('#license-service .service-form');
        
        // Cancel buttons
        const cancelCurrency = document.getElementById('cancel-currency');
        const cancelPassport = document.getElementById('cancel-passport');
        const cancelAadhar = document.getElementById('cancel-aadhar');
        const cancelLicense = document.getElementById('cancel-license');
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        
        // Currency exchange calculator
        const exchangeAmount = document.getElementById('exchange-amount');
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');
        const exchangeResult = document.getElementById('exchange-result');
        
        // Exchange rates (for demo purposes)
        const exchangeRates = {
            'USD': { 'INR': 82.45, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.25 },
            'EUR': { 'INR': 89.75, 'USD': 1.09, 'GBP': 0.86, 'JPY': 162.50 },
            'GBP': { 'INR': 104.25, 'USD': 1.27, 'EUR': 1.16, 'JPY': 189.00 },
            'JPY': { 'INR': 0.55, 'USD': 0.0067, 'EUR': 0.0062, 'GBP': 0.0053 },
            'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0096, 'JPY': 1.81 }
        };
        
        // Initialize the application
        function init() {
            // Show landing page by default
            showLandingPage();
            
            // Set up event listeners
            setupEventListeners();
        }
        
        // Set up event listeners
        function setupEventListeners() {
            // Get Started button
            getStartedBtn.addEventListener('click', () => {
                if (!isLoggedIn) {
                    showSigninModal();
                } else {
                    showServicesDashboard();
                }
            });
            
            // Sign In/Out button
            signInOutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (isLoggedIn) {
                    signOut();
                } else {
                    showSigninModal();
                }
            });
            
            // Sign in form submission
            signinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                if (username && password) {
                    signIn(username);
                } else {
                    showNotification('Please enter both username and password', 'error');
                }
            });
            
            // Google sign in button
            googleSigninBtn.addEventListener('click', () => {
                // Simulate Google sign in
                signIn('Google User');
            });
            
            // Close modal
            closeModal.addEventListener('click', () => {
                signinModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === signinModal) {
                    signinModal.style.display = 'none';
                }
            });
            
            // Navigation links
            navHome.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
            });
            
            navAbout.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
                document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
            });
            
            navServices.addEventListener('click', (e) => {
                e.preventDefault();
                if (isLoggedIn) {
                    showServicesDashboard();
                } else {
                    showSigninModal();
                }
            });
            
            navContact.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
                document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
            });
            
            // Footer links
            footerHome.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
            });
            
            footerAbout.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
                document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
            });
            
            footerServices.addEventListener('click', (e) => {
                e.preventDefault();
                if (isLoggedIn) {
                    showServicesDashboard();
                } else {
                    showSigninModal();
                }
            });
            
            footerContact.addEventListener('click', (e) => {
                e.preventDefault();
                showLandingPage();
                document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
            });
            
            // Service boxes
            serviceBoxes.forEach(box => {
                box.addEventListener('click', () => {
                    const service = box.getAttribute('data-service');
                    showServicePage(service);
                });
            });
            
            // Service forms
            currencyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Currency exchange request submitted successfully!', 'success');
                setTimeout(() => {
                    showServicesDashboard();
                }, 2000);
            });
            
            passportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Passport renewal application submitted successfully!', 'success');
                setTimeout(() => {
                    showServicesDashboard();
                }, 2000);
            });
            
            aadharForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Aadhar card renewal application submitted successfully!', 'success');
                setTimeout(() => {
                    showServicesDashboard();
                }, 2000);
            });
            
            licenseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Driving license renewal application submitted successfully!', 'success');
                setTimeout(() => {
                    showServicesDashboard();
                }, 2000);
            });
            
            // Cancel buttons
            cancelCurrency.addEventListener('click', () => {
                showServicesDashboard();
            });
            
            cancelPassport.addEventListener('click', () => {
                showServicesDashboard();
            });
            
            cancelAadhar.addEventListener('click', () => {
                showServicesDashboard();
            });
            
            cancelLicense.addEventListener('click', () => {
                showServicesDashboard();
            });
            
            // Contact form
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Your message has been sent successfully!', 'success');
                contactForm.reset();
            });
            
            // Currency exchange calculator
            exchangeAmount.addEventListener('input', calculateExchange);
            fromCurrency.addEventListener('change', calculateExchange);
            toCurrency.addEventListener('change', calculateExchange);
        }
        
        // Show landing page
        function showLandingPage() {
            hideAllPages();
            landingPage.style.display = 'block';
        }
        
        // Show services dashboard
        function showServicesDashboard() {
            hideAllPages();
            servicesDashboard.style.display = 'block';
        }
        
        // Show service page
        function showServicePage(service) {
            hideAllPages();
            
            switch(service) {
                case 'currency':
                    currencyService.style.display = 'block';
                    calculateExchange();
                    break;
                case 'passport':
                    passportService.style.display = 'block';
                    break;
                case 'aadhar':
                    aadharService.style.display = 'block';
                    break;
                case 'license':
                    licenseService.style.display = 'block';
                    break;
            }
        }
        
        // Hide all pages
        function hideAllPages() {
            landingPage.style.display = 'none';
            servicesDashboard.style.display = 'none';
            currencyService.style.display = 'none';
            passportService.style.display = 'none';
            aadharService.style.display = 'none';
            licenseService.style.display = 'none';
        }
        
        // Show sign in modal
        function showSigninModal() {
            signinModal.style.display = 'flex';
        }
        
        // Sign in
        function signIn(username) {
            isLoggedIn = true;
            currentUser = username;
            userName.textContent = username;
            signInOutBtn.textContent = 'Sign Out';
            userProfile.style.display = 'block';
            signinModal.style.display = 'none';
            showNotification(`Welcome back, ${username}!`, 'success');
            
            // Reset form
            signinForm.reset();
            
            // Show services dashboard
            showServicesDashboard();
        }
        
        // Sign out
        function signOut() {
            isLoggedIn = false;
            currentUser = null;
            signInOutBtn.textContent = 'Sign In';
            userProfile.style.display = 'none';
            showNotification('You have been signed out', 'info');
            showLandingPage();
        }
        
        // Show notification
        function showNotification(message, type) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
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
        
        // Initialize the application
        init();