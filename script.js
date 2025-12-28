// Sale Popup Functionality
document.addEventListener('DOMContentLoaded', () => {
    const salePopup = document.getElementById('sale-popup');
    const closeButton = document.querySelector('.sale-popup-close');
    const saleBtn = document.querySelector('.sale-btn');
    
    // Check if popup has been shown recently (within 24 hours)
    const lastShown = localStorage.getItem('salePopupLastShown');
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Show popup if it hasn't been shown in the last 24 hours
    if (!lastShown || (now - parseInt(lastShown)) > oneDay) {
        // Show popup after a short delay (2 seconds after page load)
        setTimeout(() => {
            salePopup.setAttribute('aria-hidden', 'false');
            salePopup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 2000);
        
        // Store the current time
        localStorage.setItem('salePopupLastShown', now.toString());
    }
    
    // Close popup functionality
    function closeSalePopup() {
        salePopup.classList.remove('show');
        salePopup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close button click
    closeButton.addEventListener('click', closeSalePopup);
    
    // Close on background click
    salePopup.addEventListener('click', (e) => {
        if (e.target === salePopup) {
            closeSalePopup();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && salePopup.classList.contains('show')) {
            closeSalePopup();
        }
    });
    
    // Smooth scroll to services section when clicking the sale button
    saleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSalePopup();
        
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Add entrance animation for popup content
    const popupContent = document.querySelector('.sale-popup-content');
    popupContent.style.opacity = '0';
    popupContent.style.transform = 'scale(0.8) translateY(30px)';
    
    // Animate content when popup shows
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (salePopup.classList.contains('show')) {
                    setTimeout(() => {
                        popupContent.style.transition = 'all 0.5s ease';
                        popupContent.style.opacity = '1';
                        popupContent.style.transform = 'scale(1) translateY(0)';
                    }, 100);
                }
            }
        });
    });
    
    observer.observe(salePopup, { attributes: true });
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollProgressContainer = document.querySelector('.scroll-progress');
    
    if (scrollProgress && scrollProgressContainer) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
        scrollProgressContainer.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Update aria-pressed attribute
    themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(243, 244, 246, 0.98)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(243, 244, 246, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Update Experience Time Function
function updateExperienceTime() {
    const startDate = new Date('2025-02-01'); // February 1, 2025
    const currentDate = new Date();
    
    // Since we're in 2025, calculate from February
    const yearDiff = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();
    
    let months = yearDiff * 12 + monthDiff;
    
    // Adjust for the current date
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    
    const years = Math.floor(months / 12);
    
    const experienceCounter = document.getElementById('experience-counter');
    const experienceText = document.getElementById('experience-text');
    
    if (years > 0) {
        experienceCounter.textContent = `${years}+`;
        experienceText.textContent = 'Years Experience';
    } else {
        experienceCounter.textContent = `${months}+`;
        experienceText.textContent = 'Months Experience';
    }
}

// Enhanced Form Validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        // Remove previous error states
        formGroup.classList.remove('error');
        errorElement.textContent = '';
        
        // Validate required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            formGroup.classList.add('error');
            errorElement.textContent = 'This field is required';
            isValid = false;
        }
        
        // Validate email format
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Validate message length
        if (input.name === 'message' && input.value.trim().length < 10) {
            formGroup.classList.add('error');
            errorElement.textContent = 'Message must be at least 10 characters long';
            isValid = false;
        }
    });
    
    return isValid;
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Update experience time immediately
    updateExperienceTime();
    
    // Observe counter elements
    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    // Validate form first
    if (!validateForm()) {
        e.preventDefault();
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    
    // Let the form submit to Netlify, but show our custom success message
    // Netlify will handle the actual submission
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset labels
        this.querySelectorAll('label').forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--gray-600)';
        });
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 1500);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

// Form field animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        label.style.top = '-0.5rem';
        label.style.fontSize = '0.8rem';
        label.style.color = 'var(--secondary)';
        label.style.background = 'var(--background)';
        label.style.padding = '0 0.5rem';
    });
    
    field.addEventListener('blur', function() {
        const label = this.nextElementSibling;
        if (!this.value) {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--gray-600)';
            label.style.background = 'transparent';
            label.style.padding = '0';
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Services Section Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (e.target.closest('.service-btn')) {
                return;
            }
            
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observe service cards for animation
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Stagger the animations
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Add smooth scroll to contact section when clicking service buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            this.disabled = true;
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Reset button after scroll
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
    
    // Add price hover effects
    const priceElements = document.querySelectorAll('.price-amount');
    priceElements.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--accent)';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--secondary)';
        });
    });
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
    
    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.click();
            }
        }
    });
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isExpanded = faqItem.getAttribute('aria-expanded') === 'true';
            const answer = faqItem.querySelector('.faq-answer');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                faqItem.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                faqItem.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
        
        // Keyboard navigation for FAQ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
