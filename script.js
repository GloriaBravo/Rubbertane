// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initProductCarousel();
    initMobileMenu();
    initFormValidation();
    initScrollAnimations();
});

// Carousel Functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Start autoplay
    startAutoPlay();
}

// Product Carousel Functionality
function initProductCarousel() {
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.product-prev');
    const nextBtn = document.querySelector('.product-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && document.activeElement !== document.querySelector('input, textarea')) {
            prevSlide();
        } else if (e.key === 'ArrowRight' && document.activeElement !== document.querySelector('input, textarea')) {
            nextSlide();
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');

            // Animate hamburger
            const hamburger = toggleBtn.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('open');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
                toggleBtn.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
                const hamburger = toggleBtn.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('open');
                }
            }
        });
    }
}

// Form Validation and Submission
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const feedback = document.getElementById('form-feedback');

    if (form && feedback) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear previous feedback
            feedback.textContent = '';
            feedback.className = '';

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual endpoint)
                await submitForm(data);
                showFeedback('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showFeedback('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function validateForm(data) {
    const feedback = document.getElementById('form-feedback');

    if (!data.name.trim()) {
        showFeedback('Please enter your name.', 'error');
        return false;
    }

    if (!data.email.trim() || !isValidEmail(data.email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function submitForm(data) {
    // Simulate API call - replace with actual form submission
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 1000);
    });
}

function showFeedback(message, type) {
    const feedback = document.getElementById('form-feedback');
    feedback.textContent = message;
    feedback.className = type;
}

// Scroll Animations
function initScrollAnimations() {
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-gallery, .contact-section');
    animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
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

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .hamburger.open {
        background: transparent;
    }

    .hamburger.open::before {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.open::after {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    #form-feedback.success {
        color: #28a745;
    }

    #form-feedback.error {
        color: #dc3545;
    }

    img.loaded {
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}