// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollProgressContainer = document.querySelector('.scroll-progress');
    
    if (scrollProgress && scrollProgressContainer) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        scrollProgress.style.width = scrollPercent + '%';
        scrollProgressContainer.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = body.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    });
}

function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    const theme = body.getAttribute('data-theme');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 100) {
        navbar.style.background = body.getAttribute('data-theme') === 'dark'
            ? 'rgba(17, 24, 39, 0.98)'
            : 'rgba(243, 244, 246, 0.98)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'dark'
            ? 'rgba(17, 24, 39, 0.95)'
            : 'rgba(243, 244, 246, 0.95)';
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

function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return false;

    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.type === 'hidden') return;

        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) return;
        
        formGroup.classList.remove('error');
        errorElement.textContent = '';
        
        if (input.hasAttribute('required') && !input.value.trim()) {
            formGroup.classList.add('error');
            errorElement.textContent = 'This field is required';
            isValid = false;
        }
        
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        if (input.name === 'message' && input.value.trim().length < 10) {
            formGroup.classList.add('error');
            errorElement.textContent = 'Message must be at least 10 characters long';
            isValid = false;
        }
    });
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.template-card, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Template cards stagger animation
    const templateCards = document.querySelectorAll('.template-card');
    const templateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                templateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    templateCards.forEach(card => templateObserver.observe(card));

    // Typing effect on hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        setTimeout(typeWriter, 800);
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isExpanded = faqItem.getAttribute('aria-expanded') === 'true';
            const answer = faqItem.querySelector('.faq-answer');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            if (isExpanded) {
                faqItem.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                faqItem.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });

        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Quick Contact Panel
    const quickContactBtn = document.getElementById('quick-contact');
    const quickContactPanel = document.getElementById('quick-contact-panel');
    const quickContactClose = document.querySelector('.quick-contact-close');

    if (quickContactBtn && quickContactPanel) {
        quickContactBtn.addEventListener('click', function() {
            const isHidden = quickContactPanel.getAttribute('aria-hidden') === 'true';
            quickContactPanel.setAttribute('aria-hidden', !isHidden);
            this.classList.toggle('expanded');
        });

        if (quickContactClose) {
            quickContactClose.addEventListener('click', function() {
                quickContactPanel.setAttribute('aria-hidden', 'true');
                quickContactBtn.classList.remove('expanded');
            });
        }

        document.addEventListener('click', function(e) {
            if (!quickContactBtn.contains(e.target) && !quickContactPanel.contains(e.target)) {
                quickContactPanel.setAttribute('aria-hidden', 'true');
                quickContactBtn.classList.remove('expanded');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active') && hamburger) {
                hamburger.click();
            }
            if (quickContactPanel && quickContactPanel.getAttribute('aria-hidden') === 'false') {
                quickContactPanel.setAttribute('aria-hidden', 'true');
                quickContactBtn.classList.remove('expanded');
            }
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.floating-elements .element').forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            });
            const data = await response.json();

            if (data.success) {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                form.reset();

                form.querySelectorAll('.form-group:not(.form-group--select) label').forEach(label => {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--gray-600)';
                });
            } else {
                showNotification(data.message || 'Something went wrong. Please try again or email me directly.', 'error');
            }
        } catch {
            showNotification('Could not send your message. Please try again or email me directly.', 'error');
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    });
}

document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        if (this.closest('.form-group--select')) return;

        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--secondary)';
            label.style.background = 'var(--background)';
            label.style.padding = '0 0.5rem';
        }
    });
    
    field.addEventListener('blur', function() {
        if (this.closest('.form-group--select')) return;

        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL' && !this.value) {
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

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
