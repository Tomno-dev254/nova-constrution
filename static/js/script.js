// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFlashMessages();
    initializeProjectFilters();
    initializeSmoothScrolling();
    initializeFormValidation();

    console.log('Novastruct website initialized successfully');
});

// Navigation Menu Toggle
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Active navigation highlighting
    highlightActiveNavigation();
}

// Highlight active navigation based on current page
function highlightActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.classList.add('active');
        }
    });
}

// Flash Messages Functionality
function initializeFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');

    flashMessages.forEach(message => {
        const closeButton = message.querySelector('.flash-close');

        // Auto-hide flash messages after 5 seconds
        setTimeout(() => {
            hideFlashMessage(message);
        }, 5000);

        // Close button functionality
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                hideFlashMessage(message);
            });
        }
    });
}

function hideFlashMessage(message) {
    message.style.opacity = '0';
    message.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 300);
}

// Project Filters Functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                filterProjects(filter, projectCards);
            });
        });
    }
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation and Enhancement
function initializeFormValidation() {
    const contactForm = document.querySelector('.form');

    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');

        // Add real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;

            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showFormError('Please correct the errors below before submitting.');
            } else {
                showFormLoading(true);
            }
        });
    }
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const fieldType = field.type || field.tagName.toLowerCase();

    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    else if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = 'var(--error-red)';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = 'var(--error-red)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';

    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show form-level error
function showFormError(message) {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.style.cssText = `
        background-color: var(--error-red);
        color: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        text-align: center;
    `;
    errorElement.textContent = message;

    const form = document.querySelector('.form');
    form.insertBefore(errorElement, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

// Show form loading state
function showFormLoading(loading) {
    const submitButton = document.querySelector('.form .btn-primary');

    if (submitButton) {
        if (loading) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    }
}

// Scroll animations for elements coming into view
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .stat-item, .testimonial, .team-member');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const animationStyles = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

// Add animation styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize scroll animations after a brief delay
setTimeout(() => {
    initializeScrollAnimations();
}, 1000);

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add navbar scroll effect
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--accent-white)';
        navbar.style.backdropFilter = 'none';
    }
}, 16));

// Console welcome message
console.log(`
╔═══════════════════════════════════════╗
║         🏗️  NOVASTRUCT CONSTRUCTION    ║
║                                       ║
║  Professional Building Services       ║
║  Since 2020                         ║
║                                       ║
║  📞 (254) 710327993                   ║
║  ✉️  info@novastruct.com             ║
╚═══════════════════════════════════════╝
`);

// Error handling for development
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}