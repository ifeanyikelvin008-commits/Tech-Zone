// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');
const menuIcon = menuToggle.querySelector('i');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        
        // Toggle icon
        if (navigation.classList.contains('active')) {
            menuIcon.className = 'fas fa-times';
            document.body.style.overflow = 'hidden';
        } else {
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navigation.contains(e.target) && !menuToggle.contains(e.target) && navigation.classList.contains('active')) {
            navigation.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
    });
}

// Category Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Wishlist Button Functionality
const wishlistButtons = document.querySelectorAll('.btn-wishlist');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ef4444';
            
            // Show notification (optional)
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            
            showNotification('Removed from wishlist!');
        }
    });
});

// Notification Function
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search Form Submission
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput.value.trim()) {
            e.preventDefault();
            alert('Please enter a search term');
        }
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Add loading animation for images
document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Add to cart functionality (optional)
const orderButtons = document.querySelectorAll('.btn-order');
orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.closest('.product-info').querySelector('.product-name').textContent;
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // You can add actual cart functionality here
        // updateCartCount();
    });
});
// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const loginBtn = document.querySelector('.login-btn');

    // Toggle Password Visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Real-time Email Validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const emailError = document.getElementById('emailError');
            
            if (email.length === 0) {
                this.classList.remove('valid', 'error');
                emailError.textContent = '';
            } else if (isValidEmail(email)) {
                this.classList.add('valid');
                this.classList.remove('error');
                emailError.textContent = '';
            } else {
                this.classList.add('error');
                this.classList.remove('valid');
                emailError.textContent = 'Please enter a valid email address';
            }
        });
    }

    // Password Strength Indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const passwordError = document.getElementById('passwordError');
            
            if (password.length === 0) {
                this.classList.remove('valid', 'error');
                passwordError.textContent = '';
            } else if (password.length >= 8) {
                this.classList.add('valid');
                this.classList.remove('error');
                passwordError.textContent = '';
            } else {
                this.classList.add('error');
                this.classList.remove('valid');
                passwordError.textContent = 'Password must be at least 8 characters';
            }
        });
    }

    // Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;

            // Get form data
            const formData = {
                email: emailInput.value,
                password: passwordInput.value,
                remember: document.querySelector('.checkbox').checked
            };

            try {
                // Simulate API call (replace with actual API endpoint)
                await simulateLogin(formData);
                
                // Show success animation
                document.querySelector('.login-card').classList.add('login-success');
                
                // Redirect to dashboard or home
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);

            } catch (error) {
                // Handle error
                showError(error.message);
                
                // Remove loading state
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
            }
        });
    }

    // Google Login Button
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Simulate Google login (replace with actual OAuth)
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Facebook Login Button
    const facebookBtn = document.querySelector('.facebook-btn');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            // Simulate Facebook login (replace with actual OAuth)
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm() {
        let isValid = true;
        
        // Validate email
        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate password
        if (!passwordInput.value || passwordInput.value.length < 8) {
            passwordInput.classList.add('error');
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
            isValid = false;
        }

        return isValid;
    }

    function simulateLogin(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful login (replace with actual API)
                if (data.email && data.password) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    }

    function showError(message) {
        // Create error toast if it doesn't exist
        let toast = document.querySelector('.error-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'error-toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Remember Me functionality
    const rememberCheckbox = document.querySelector('.checkbox');
    if (rememberCheckbox) {
        // Check if email was saved
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
        }

        rememberCheckbox.addEventListener('change', function() {
            if (this.checked && emailInput.value) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        });
    }
});

// Add error toast styles to CSS
const errorToastStyles = `
.error-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--accent-red);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: var(--font-size-sm);
    box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.error-toast.show {
    transform: translateX(-50%) translateY(0);
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = errorToastStyles;
document.head.appendChild(styleSheet);
// Signup Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const signupBtn = document.getElementById('signupBtn');

    // Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const type = targetInput.getAttribute('type') === 'password' ? 'text' : 'password';
            targetInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Username Validation
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const username = this.value;
            const usernameError = document.getElementById('usernameError');
            
            // Username requirements: 3-20 chars, alphanumeric and underscore only
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            
            if (username.length === 0) {
                this.classList.remove('valid', 'error');
                usernameError.textContent = '';
            } else if (usernameRegex.test(username)) {
                this.classList.add('valid');
                this.classList.remove('error');
                usernameError.textContent = '';
                
                // Check username availability (simulated)
                checkUsernameAvailability(username);
            } else {
                this.classList.add('error');
                this.classList.remove('valid');
                usernameError.textContent = 'Username must be 3-20 characters (letters, numbers, underscores only)';
            }
        });
    }

    // Email Validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const emailError = document.getElementById('emailError');
            
            if (email.length === 0) {
                this.classList.remove('valid', 'error');
                emailError.textContent = '';
            } else if (isValidEmail(email)) {
                this.classList.add('valid');
                this.classList.remove('error');
                emailError.textContent = '';
            } else {
                this.classList.add('error');
                this.classList.remove('valid');
                emailError.textContent = 'Please enter a valid email address';
            }
        });
    }

    // Password Validation with Strength Meter
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            
            // Check requirements
            const requirements = {
                length: password.length >= 8,
                upper: /[A-Z]/.test(password),
                lower: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };

            // Update requirement icons
            updateRequirement('reqLength', requirements.length);
            updateRequirement('reqUpper', requirements.upper);
            updateRequirement('reqLower', requirements.lower);
            updateRequirement('reqNumber', requirements.number);
            updateRequirement('reqSpecial', requirements.special);

            // Calculate strength
            const strength = calculatePasswordStrength(password, requirements);
            updatePasswordStrength(strength);

            // Validate password
            const passwordError = document.getElementById('passwordError');
            if (password.length === 0) {
                this.classList.remove('valid', 'error');
                passwordError.textContent = '';
            } else if (strength >= 3) {
                this.classList.add('valid');
                this.classList.remove('error');
                passwordError.textContent = '';
            } else {
                this.classList.add('error');
                this.classList.remove('valid');
                passwordError.textContent = 'Password is too weak';
            }

            // Check confirm password match
            if (confirmInput.value) {
                validatePasswordMatch();
            }
        });
    }

    // Confirm Password Validation
    if (confirmInput) {
        confirmInput.addEventListener('input', validatePasswordMatch);
    }

    // Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                showError('Please fix the errors before submitting');
                return;
            }

            // Show loading state
            signupBtn.classList.add('loading');
            signupBtn.disabled = true;

            // Get form data
            const formData = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                terms: termsCheckbox.checked
            };

            try {
                // Simulate API call
                await createAccount(formData);
                
                // Show success animation
                document.querySelector('.signup-card').classList.add('signup-success');
                
                // Show success message
                showSuccess('Account created successfully! Redirecting...');
                
                // Redirect to welcome page
                setTimeout(() => {
                    window.location.href = 'welcome-message.html';
                }, 2000);

            } catch (error) {
                // Handle error
                showError(error.message);
                
                // Remove loading state
                signupBtn.classList.remove('loading');
                signupBtn.disabled = false;
            }
        });
    }

    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function updateRequirement(elementId, isMet) {
        const element = document.getElementById(elementId);
        if (element) {
            if (isMet) {
                element.classList.add('met');
                element.querySelector('i').className = 'fas fa-check-circle';
            } else {
                element.classList.remove('met');
                element.querySelector('i').className = 'far fa-circle';
            }
        }
    }

    function calculatePasswordStrength(password, requirements) {
        let score = 0;
        
        // Count met requirements
        score += requirements.length ? 1 : 0;
        score += requirements.upper ? 1 : 0;
        score += requirements.lower ? 1 : 0;
        score += requirements.number ? 1 : 0;
        score += requirements.special ? 1 : 0;
        
        // Bonus for length
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        return score;
    }

    function updatePasswordStrength(score) {
        const bars = document.querySelectorAll('.strength-bar');
        const strengthText = document.getElementById('strengthText');
        
        // Reset bars
        bars.forEach(bar => {
            bar.className = 'strength-bar';
        });

        // Set strength level
        if (score <= 2) {
            bars.forEach((bar, index) => {
                if (index < 1) bar.classList.add('active', 'weak');
            });
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#ef4444';
        } else if (score <= 4) {
            bars.forEach((bar, index) => {
                if (index < 2) bar.classList.add('active', 'fair');
            });
            strengthText.textContent = 'Fair password';
            strengthText.style.color = '#f59e0b';
        } else if (score <= 6) {
            bars.forEach((bar, index) => {
                if (index < 3) bar.classList.add('active', 'good');
            });
            strengthText.textContent = 'Good password';
            strengthText.style.color = '#10b981';
        } else {
            bars.forEach(bar => {
                bar.classList.add('active', 'strong');
            });
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#22c55e';
        }
    }

    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        const confirmError = document.getElementById('confirmError');
        
        if (confirm.length === 0) {
            confirmInput.classList.remove('valid', 'error');
            confirmError.textContent = '';
        } else if (password === confirm) {
            confirmInput.classList.add('valid');
            confirmInput.classList.remove('error');
            confirmError.textContent = '';
        } else {
            confirmInput.classList.add('error');
            confirmInput.classList.remove('valid');
            confirmError.textContent = 'Passwords do not match';
        }
    }

    function validateForm() {
        let isValid = true;
        
        // Trigger validation on all fields
        usernameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        confirmInput.dispatchEvent(new Event('input'));

        // Check for errors
        if (document.querySelectorAll('.form-input.error').length > 0) {
            isValid = false;
        }

        // Check terms
        if (!termsCheckbox.checked) {
            termsCheckbox.classList.add('error');
            showError('You must agree to the Terms of Service');
            isValid = false;
        }

        return isValid;
    }

    async function checkUsernameAvailability(username) {
        // Simulate API call
        const takenUsernames = ['admin', 'user', 'test', 'john'];
        
        if (takenUsernames.includes(username.toLowerCase())) {
            usernameInput.classList.add('error');
            usernameInput.classList.remove('valid');
            document.getElementById('usernameError').textContent = 'Username is already taken';
        }
    }

    async function createAccount(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful account creation
                if (data.username && data.email && data.password && data.terms) {
                    // Store user data (in real app, this would be on server)
                    localStorage.setItem('userEmail', data.email);
                    localStorage.setItem('userName', data.username);
                    resolve({ success: true });
                } else {
                    reject(new Error('Registration failed. Please try again.'));
                }
            }, 2000);
        });
    }

    function showError(message) {
        let toast = document.querySelector('.error-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'error-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function showSuccess(message) {
        let toast = document.querySelector('.success-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'success-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
    }

    // Social Signup Handlers
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'welcome-message.html';
            }, 1500);
        });
    });
});

// Add toast styles
const toastStyles = `
.error-toast, .success-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: var(--font-size-sm);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.error-toast {
    background: var(--accent-red);
    color: white;
}

.success-toast {
    background: var(--accent-green);
    color: white;
}

.error-toast.show, .success-toast.show {
    transform: translateX(-50%) translateY(0);
}

.social-btn.loading {
    position: relative;
    color: transparent;
}

.social-btn.loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);
// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // User Dropdown Menu
    const userBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    // Filter Sections Toggle
    document.querySelectorAll('.filter-section-title').forEach(title => {
        title.addEventListener('click', () => {
            const section = title.closest('.filter-section');
            const options = section.querySelector('.filter-options');
            const icon = title.querySelector('i');
            
            options.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // View Toggle (Grid/List)
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });

    // Quick View
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = btn.closest('.product-card');
            const productTitle = product.querySelector('.product-title').textContent;
            
            // Show quick view modal (simplified for demo)
            alert(`Quick view: ${productTitle}\n(This would open a modal in production)`);
        });
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = btn.closest('.product-card');
            const productTitle = product.querySelector('.product-title').textContent;
            
            // Update cart badge
            updateCartCount(1);
            
            // Show notification
            showNotification(`${productTitle} added to cart!`);
            
            // Animate button
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.classList.add('added');
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                btn.classList.remove('added');
            }, 2000);
        });
    });

    // Wishlist
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.classList.add('active');
                showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.classList.remove('active');
                showNotification('Removed from wishlist!');
            }
        });
    });

    // Price Range Presets
    document.querySelectorAll('.price-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const minInput = document.querySelector('.price-field:first-child input');
            const maxInput = document.querySelector('.price-field:last-child input');
            
            const text = preset.textContent;
            if (text.includes('Under $100')) {
                minInput.value = 0;
                maxInput.value = 100;
            } else if (text.includes('$100 - $500')) {
                minInput.value = 100;
                maxInput.value = 500;
            } else if (text.includes('$500 - $1000')) {
                minInput.value = 500;
                maxInput.value = 1000;
            } else if (text.includes('Over $1000')) {
                minInput.value = 1000;
                maxInput.value = 5000;
            }
            
            preset.classList.add('active');
        });
    });

    // Apply Price Filter
    document.querySelector('.apply-price')?.addEventListener('click', () => {
        const min = document.querySelector('.price-field:first-child input').value || 0;
        const max = document.querySelector('.price-field:last-child input').value || 5000;
        
        showNotification(`Filtering products from $${min} to $${max}`);
    });

    // Clear Filters
    document.querySelector('.clear-filters')?.addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox input').forEach(cb => {
            cb.checked = false;
        });
        
        document.querySelectorAll('.price-input').forEach(input => {
            input.value = '';
        });
        
        showNotification('All filters cleared');
    });

    // Sort Products
    document.getElementById('sort')?.addEventListener('change', (e) => {
        const sortValue = e.target.value;
        showNotification(`Sorting by: ${sortValue.replace('-', ' ')}`);
        // In production, this would reorder the products
    });

    // Search Form
    document.getElementById('productSearch')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = e.target.querySelector('input').value;
        if (searchTerm.trim()) {
            showNotification(`Searching for: ${searchTerm}`);
        }
    });

    // Pagination
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Scroll to top of products
                productsGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Helper Functions
    function updateCartCount(increment = 1) {
        const badge = document.querySelector('.cart-badge');
        let count = parseInt(badge.textContent) || 0;
        count += increment;
        badge.textContent = count;
        
        // Animate badge
        badge.classList.add('pulse');
        setTimeout(() => badge.classList.remove('pulse'), 300);
    }

    function showNotification(message) {
        let toast = document.querySelector('.product-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'product-toast';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Filter Checkbox Interactions
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const count = document.querySelector('.results-count');
            // In production, this would update the product count
            if (count) {
                count.textContent = 'Showing filtered results';
            }
        });
    });

    // Product Hover Effects for Quick View
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const quickView = card.querySelector('.quick-view');
            if (quickView) {
                quickView.style.opacity = '1';
                quickView.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const quickView = card.querySelector('.quick-view');
            if (quickView) {
                quickView.style.opacity = '0';
                quickView.style.transform = 'translateY(10px)';
            }
        });
    });

    // Load More Products (infinite scroll simulation)
    let loading = false;
    window.addEventListener('scroll', () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
        
        if (nearBottom && !loading) {
            loading = true;
            // In production, this would load more products via AJAX
            console.log('Load more products...');
            
            setTimeout(() => {
                loading = false;
            }, 1000);
        }
    });
});

// Add CSS animations for cart badge
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .cart-badge.pulse {
        animation: pulse 0.3s ease;
    }
    
    .product-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-blue);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .product-toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .filter-options.hidden {
        display: none;
    }
    
    .products-grid.list-view {
        grid-template-columns: 1fr;
    }
    
    .products-grid.list-view .product-card {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 20px;
    }
    
    .products-grid.list-view .product-image {
        height: 200px;
    }
    
    .wishlist-btn.active {
        color: #ef4444;
    }
    
    .price-preset.active {
        background: var(--primary-blue);
        color: white;
        border-color: var(--primary-blue);
    }
    
    .add-to-cart.added {
        background: #10b981;
    }
`;

document.head.appendChild(style);