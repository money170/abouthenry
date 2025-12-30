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
    
    // Language Switcher Functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageMenu = document.getElementById('language-menu');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Translation data
    const translations = {
        en: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            services: 'Services',
            projects: 'Projects',
            caseStudies: 'Case Studies',
            faq: 'FAQ',
            contact: 'Contact',
            heroTitle: 'Henry Meves',
            heroSubtitle: 'Young Website Developer',
            heroDescription: "I'm a passionate young developer who loves creating beautiful, functional websites. I enjoy coding, learning new technologies, and bringing creative ideas to life through web development.",
            getInTouch: 'Get In Touch',
            viewMyWork: 'View My Work',
            aboutMe: 'About Me',
            skillsTechnologies: 'Skills & Technologies',
            servicesOffered: 'Services Offered',
            servicesSubtitle: 'Professional website solutions for your business needs',
            usefulProjects: 'Useful Projects You Can Use',
            usefulProjectsSubtitle: 'Check out these free web applications I\'ve built that you can use right now',
            performanceOptimization: 'Performance & Optimization',
            performanceSubtitle: 'This website is built with performance and user experience in mind',
            contactSubtitle: 'Have a project in mind? Let\'s build your website together.',
            caseStudies: 'Case Studies',
            caseStudiesSubtitle: 'Detailed breakdowns of successful projects and solutions',
            faqTitle: 'Frequently Asked Questions',
            faqSubtitle: 'Common questions about my services and process',
            projects: 'Projects',
            hoursResponse: 'Hours Response',
            satisfaction: '% Satisfaction',
            monthsExperience: 'Months Experience',
            yearsExperience: 'Years Experience',
            projectsCompleted: 'Projects Completed',
            clientSatisfaction: 'Client Satisfaction',
            scrollToExplore: 'Scroll to explore',
            tryTheseProjects: 'Try These Projects',
            requestQuote: 'Request a Quote',
            emailMe: 'Email Me',
            connectWithMe: 'Connect With Me',
            sendMessage: 'Send Message',
            quickContact: 'Quick Contact',
            msLoadTime: 'ms Load Time',
            kbPageSize: 'KB Page Size',
            mobileScore: 'Mobile Score',
            seoScore: 'SEO Score',
            fastPageLoad: 'Fast page load for better user experience',
            optimizedAssets: 'Optimized assets for quick loading',
            fullyResponsive: 'Fully responsive and mobile-optimized',
            optimizedForSEO: 'Optimized for search engines',
            performanceNote: 'These metrics are calculated based on current page performance. Actual values may vary based on network conditions and device capabilities.',
            aboutText1: 'Hello! I\'m Henry, a young website developer with a passion for creating digital experiences that are both beautiful and functional. I started my coding journey at a young age and have been fascinated by the endless possibilities of web development ever since.',
            aboutText2: 'I believe in writing clean, efficient code and creating user-friendly websites that solve real problems. My approach combines technical skills with creative thinking to deliver solutions that exceed expectations.',
            starterPackage: 'Starter Package',
            standardPackage: 'Standard Package',
            premiumPackage: 'Premium Package',
            oneTime: 'one-time',
            mostPopular: 'Most Popular',
            starterDescription: 'Perfect for small businesses getting started online',
            standardDescription: 'Complete website solution with modern design and functionality',
            premiumDescription: 'Advanced website with premium features and priority support',
            whatsIncluded: 'What\'s Included:',
            everythingInStarterPlus: 'Everything in Starter, Plus:',
            everythingInStandardPlus: 'Everything in Standard, Plus:',
            starterFeature1: '3-5 page mobile-friendly website',
            starterFeature2: 'Custom colors + simple layout',
            starterFeature3: 'Footer with business info + NextGen Sites signature',
            starterFeature4: 'Setup with Google Business Profile',
            starterFeature5: 'Free custom business email setup',
            starterFeature6: 'Social media links integration',
            standardFeature1: '5-8 page website',
            standardFeature2: 'Modern design with icons/images',
            standardFeature3: 'Contact form',
            standardFeature4: 'Free custom business email setup',
            standardFeature5: 'Enhanced mobile optimization',
            standardFeature6: 'Basic analytics setup',
            premiumFeature1: '8+ pages with advanced features',
            premiumFeature2: 'Blog or booking integration',
            premiumFeature3: 'SEO basics (title tags, descriptions)',
            premiumFeature4: 'Light branding (logo, banner, favicon)',
            premiumFeature5: 'Priority support + training',
            premiumFeature6: 'How to edit your own site',
            faqQ1: 'How long does it take to build a website?',
            faqA1: 'The timeline depends on the package you choose. A Starter Package typically takes 3-5 business days, Standard Package takes 5-7 business days, and Premium Package takes 7-10 business days. These timelines include revisions and feedback rounds.',
            faqQ2: 'Do I need to provide content for my website?',
            faqA2: 'Yes, providing your content helps create a more personalized website. However, I can help with content suggestions and basic copywriting. For images, you can provide your own photos, or I can help you find appropriate stock images.',
            faqQ3: 'Will my website be mobile-friendly?',
            faqA3: 'Absolutely! All websites I create are fully responsive and mobile-friendly. They will look great and function perfectly on smartphones, tablets, and desktop computers.',
            faqQ4: 'Can I update my website myself after it\'s built?',
            faqA4: 'Yes! With the Premium Package, I provide training on how to edit your own site. For all packages, I can make updates for you, or you can learn to do it yourself. The code is clean and well-documented to make future edits easier.',
            faqQ5: 'What\'s included in the custom business email setup?',
            faqA5: 'I\'ll help you set up a professional email address using your domain (e.g., contact@yourbusiness.com). This includes email account creation and basic configuration. You\'ll need to choose an email hosting provider (many offer free or low-cost options).',
            faqQ6: 'Do you provide hosting for the website?',
            faqA6: 'I can help you choose a hosting provider and guide you through the setup process. Hosting is typically a separate monthly or annual cost (usually $3-10/month for basic hosting). I can recommend reliable and affordable hosting options.',
            faqQ7: 'What if I need changes after the website is complete?',
            faqA7: 'I offer ongoing support and updates. Small changes can often be done quickly, while larger updates may require additional time and cost. I\'m always happy to help maintain and improve your website as your business grows.',
            faqQ8: 'How do I get started?',
            faqA8: 'Simply fill out the contact form below or email me directly at henry.s.meves@gmail.com. Let me know which package interests you and a bit about your project. I\'ll respond as soon as I can to discuss your needs and answer any questions.'
        },
        es: {
            home: 'Inicio',
            about: 'Acerca de',
            skills: 'Habilidades',
            services: 'Servicios',
            projects: 'Proyectos',
            caseStudies: 'Casos de Estudio',
            faq: 'Preguntas',
            contact: 'Contacto',
            heroTitle: 'Henry Meves',
            heroSubtitle: 'Desarrollador Web Joven',
            heroDescription: 'Soy un joven desarrollador apasionado que ama crear sitios web hermosos y funcionales. Disfruto programando, aprendiendo nuevas tecnologías y dando vida a ideas creativas a través del desarrollo web.',
            getInTouch: 'Contáctame',
            viewMyWork: 'Ver Mi Trabajo',
            aboutMe: 'Acerca de Mí',
            skillsTechnologies: 'Habilidades y Tecnologías',
            servicesOffered: 'Servicios Ofrecidos',
            servicesSubtitle: 'Soluciones profesionales de sitios web para las necesidades de su negocio',
            usefulProjects: 'Proyectos Útiles Que Puedes Usar',
            usefulProjectsSubtitle: 'Echa un vistazo a estas aplicaciones web gratuitas que he construido y que puedes usar ahora mismo',
            performanceOptimization: 'Rendimiento y Optimización',
            performanceSubtitle: 'Este sitio web está construido pensando en el rendimiento y la experiencia del usuario',
            contactSubtitle: '¿Tienes un proyecto en mente? Construyamos tu sitio web juntos.',
            caseStudiesSubtitle: 'Desgloses detallados de proyectos y soluciones exitosas',
            faqTitle: 'Preguntas Frecuentes',
            faqSubtitle: 'Preguntas comunes sobre mis servicios y proceso',
            hoursResponse: 'Horas de Respuesta',
            satisfaction: '% Satisfacción',
            monthsExperience: 'Meses de Experiencia',
            yearsExperience: 'Años de Experiencia',
            projectsCompleted: 'Proyectos Completados',
            clientSatisfaction: 'Satisfacción del Cliente',
            scrollToExplore: 'Desplázate para explorar',
            tryTheseProjects: 'Prueba Estos Proyectos',
            requestQuote: 'Solicitar Cotización',
            emailMe: 'Envíame un Correo',
            connectWithMe: 'Conéctate Conmigo',
            sendMessage: 'Enviar Mensaje',
            quickContact: 'Contacto Rápido',
            msLoadTime: 'ms Tiempo de Carga',
            kbPageSize: 'KB Tamaño de Página',
            mobileScore: 'Puntuación Móvil',
            seoScore: 'Puntuación SEO',
            fastPageLoad: 'Carga rápida de página para una mejor experiencia de usuario',
            optimizedAssets: 'Recursos optimizados para carga rápida',
            fullyResponsive: 'Totalmente responsivo y optimizado para móviles',
            optimizedForSEO: 'Optimizado para motores de búsqueda',
            performanceNote: 'Estas métricas se calculan en función del rendimiento actual de la página. Los valores reales pueden variar según las condiciones de la red y las capacidades del dispositivo.',
            aboutText1: '¡Hola! Soy Henry, un joven desarrollador web con pasión por crear experiencias digitales que sean hermosas y funcionales. Comencé mi viaje de programación a una edad temprana y desde entonces he estado fascinado por las infinitas posibilidades del desarrollo web.',
            aboutText2: 'Creo en escribir código limpio y eficiente y crear sitios web fáciles de usar que resuelvan problemas reales. Mi enfoque combina habilidades técnicas con pensamiento creativo para entregar soluciones que superen las expectativas.',
            starterPackage: 'Paquete Inicial',
            standardPackage: 'Paquete Estándar',
            premiumPackage: 'Paquete Premium',
            oneTime: 'pago único',
            mostPopular: 'Más Popular',
            starterDescription: 'Perfecto para pequeñas empresas que comienzan en línea',
            standardDescription: 'Solución completa de sitio web con diseño moderno y funcionalidad',
            premiumDescription: 'Sitio web avanzado con funciones premium y soporte prioritario',
            whatsIncluded: 'Qué está incluido:',
            everythingInStarterPlus: 'Todo en Inicial, más:',
            everythingInStandardPlus: 'Todo en Estándar, más:',
            starterFeature1: 'Sitio web móvil de 3-5 páginas',
            starterFeature2: 'Colores personalizados + diseño simple',
            starterFeature3: 'Pie de página con información comercial + firma NextGen Sites',
            starterFeature4: 'Configuración con Google Business Profile',
            starterFeature5: 'Configuración gratuita de correo comercial personalizado',
            starterFeature6: 'Integración de enlaces de redes sociales',
            standardFeature1: 'Sitio web de 5-8 páginas',
            standardFeature2: 'Diseño moderno con iconos/imágenes',
            standardFeature3: 'Formulario de contacto',
            standardFeature4: 'Configuración gratuita de correo comercial personalizado',
            standardFeature5: 'Optimización móvil mejorada',
            standardFeature6: 'Configuración básica de análisis',
            premiumFeature1: '8+ páginas con funciones avanzadas',
            premiumFeature2: 'Integración de blog o reservas',
            premiumFeature3: 'Conceptos básicos de SEO (etiquetas de título, descripciones)',
            premiumFeature4: 'Branding ligero (logo, banner, favicon)',
            premiumFeature5: 'Soporte prioritario + capacitación',
            premiumFeature6: 'Cómo editar tu propio sitio',
            faqQ1: '¿Cuánto tiempo se tarda en construir un sitio web?',
            faqA1: 'El tiempo depende del paquete que elijas. Un Paquete Inicial generalmente toma 3-5 días hábiles, el Paquete Estándar toma 5-7 días hábiles y el Paquete Premium toma 7-10 días hábiles. Estos plazos incluyen revisiones y rondas de comentarios.',
            faqQ2: '¿Necesito proporcionar contenido para mi sitio web?',
            faqA2: 'Sí, proporcionar tu contenido ayuda a crear un sitio web más personalizado. Sin embargo, puedo ayudar con sugerencias de contenido y redacción básica. Para las imágenes, puedes proporcionar tus propias fotos o puedo ayudarte a encontrar imágenes de stock apropiadas.',
            faqQ3: '¿Será mi sitio web compatible con dispositivos móviles?',
            faqA3: '¡Absolutamente! Todos los sitios web que creo son completamente responsivos y compatibles con dispositivos móviles. Se verán geniales y funcionarán perfectamente en smartphones, tablets y computadoras de escritorio.',
            faqQ4: '¿Puedo actualizar mi sitio web yo mismo después de que esté construido?',
            faqA4: '¡Sí! Con el Paquete Premium, proporciono capacitación sobre cómo editar tu propio sitio. Para todos los paquetes, puedo hacer actualizaciones por ti, o puedes aprender a hacerlo tú mismo. El código está limpio y bien documentado para facilitar futuras ediciones.',
            faqQ5: '¿Qué está incluido en la configuración de correo comercial personalizado?',
            faqA5: 'Te ayudaré a configurar una dirección de correo profesional usando tu dominio (por ejemplo, contacto@tunegocio.com). Esto incluye la creación de cuenta de correo y configuración básica. Necesitarás elegir un proveedor de alojamiento de correo (muchos ofrecen opciones gratuitas o de bajo costo).',
            faqQ6: '¿Proporcionas alojamiento para el sitio web?',
            faqA6: 'Puedo ayudarte a elegir un proveedor de alojamiento y guiarte a través del proceso de configuración. El alojamiento es típicamente un costo mensual o anual separado (generalmente $3-10/mes para alojamiento básico). Puedo recomendar opciones de alojamiento confiables y asequibles.',
            faqQ7: '¿Qué pasa si necesito cambios después de que el sitio web esté completo?',
            faqA7: 'Ofrezco soporte continuo y actualizaciones. Los cambios pequeños a menudo se pueden hacer rápidamente, mientras que las actualizaciones más grandes pueden requerir tiempo y costo adicionales. Siempre estoy feliz de ayudar a mantener y mejorar tu sitio web a medida que tu negocio crece.',
            faqQ8: '¿Cómo empiezo?',
            faqA8: 'Simplemente completa el formulario de contacto a continuación o envíame un correo directamente a henry.s.meves@gmail.com. Déjame saber qué paquete te interesa y un poco sobre tu proyecto. Responderé lo antes posible para discutir tus necesidades y responder cualquier pregunta.'
        }
    };
    
    // Get current language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Update language display
    function updateLanguageDisplay() {
        const currentLangSpan = document.querySelector('.current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = currentLang.toUpperCase();
        }
        
        // Update active language option
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Translate page content
    function translatePage(lang) {
        const t = translations[lang];
        if (!t) return;
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            const keys = ['home', 'about', 'skills', 'services', 'projects', 'caseStudies', 'faq', 'contact'];
            if (keys[index]) {
                link.textContent = t[keys[index]];
            }
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const getInTouchBtn = document.querySelector('.hero-buttons .btn');
        const scrollText = document.querySelector('.scroll-text');
        
        if (heroTitle) heroTitle.textContent = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        if (heroDescription) heroDescription.textContent = t.heroDescription;
        if (getInTouchBtn) {
            const span = getInTouchBtn.querySelector('span');
            if (span) span.textContent = t.getInTouch;
        }
        if (scrollText) scrollText.textContent = t.scrollToExplore;
        
        // Update stat labels
        const statLabels = document.querySelectorAll('.stat-label');
        statLabels.forEach((label, index) => {
            if (index === 0 && label.textContent.includes('Projects')) {
                label.textContent = t.projects;
            } else if (index === 1 && label.textContent.includes('% Satisfaction')) {
                label.textContent = t.satisfaction;
            } else if (index === 2 && label.textContent.includes('Hours Response')) {
                label.textContent = t.hoursResponse;
            }
        });
        
        // Update experience text
        const experienceText = document.getElementById('experience-text');
        if (experienceText) {
            if (experienceText.textContent.includes('Months')) {
                experienceText.textContent = t.monthsExperience;
            } else if (experienceText.textContent.includes('Years')) {
                experienceText.textContent = t.yearsExperience;
            }
        }
        
        // Update about stats
        const aboutStats = document.querySelectorAll('.stat p');
        aboutStats.forEach(stat => {
            if (stat.textContent.includes('Projects Completed')) {
                stat.textContent = t.projectsCompleted;
            } else if (stat.textContent.includes('Client Satisfaction')) {
                stat.textContent = t.clientSatisfaction;
            }
        });
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
        
        // Update buttons and links
        const tryProjectsBtn = document.querySelector('.useful-projects-cta .btn span');
        if (tryProjectsBtn) tryProjectsBtn.textContent = t.tryTheseProjects;
        
        const requestQuoteBtns = document.querySelectorAll('.service-btn');
        requestQuoteBtns.forEach(btn => {
            if (btn.textContent.includes('Request a Quote')) {
                btn.textContent = t.requestQuote;
            }
        });
        
        // Update contact section
        const emailMe = document.querySelector('.contact-email h3');
        if (emailMe && emailMe.textContent.includes('Email Me')) {
            emailMe.textContent = t.emailMe;
        }
        
        const connectWithMe = document.querySelector('.social-links h3');
        if (connectWithMe && connectWithMe.textContent.includes('Connect With Me')) {
            connectWithMe.textContent = t.connectWithMe;
        }
        
        const sendMessageBtn = document.querySelector('#contactForm button[type="submit"] span');
        if (sendMessageBtn) sendMessageBtn.textContent = t.sendMessage;
        
        // Update quick contact
        const quickContactTitle = document.querySelector('.quick-contact-header h3');
        if (quickContactTitle) quickContactTitle.textContent = t.quickContact;
        
        const quickContactOptions = document.querySelectorAll('.quick-contact-option span');
        quickContactOptions.forEach((option, index) => {
            if (index === 0 && option.textContent.includes('Email')) {
                option.textContent = t.emailMe;
            } else if (index === 1 && option.textContent.includes('Send Message')) {
                option.textContent = t.sendMessage;
            }
        });
        
        // Performance metrics are now handled by data-translate attributes
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);
    }
    
    // Language toggle click handler
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            languageMenu.classList.toggle('show');
        });
        
        // Close language menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
                languageToggle.setAttribute('aria-expanded', 'false');
                languageMenu.classList.remove('show');
            }
        });
    }
    
    // Language option click handlers
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            currentLang = selectedLang;
            localStorage.setItem('language', selectedLang);
            updateLanguageDisplay();
            translatePage(selectedLang);
            
            // Close menu
            languageToggle.setAttribute('aria-expanded', 'false');
            languageMenu.classList.remove('show');
        });
    });
    
    // Initialize language on page load
    updateLanguageDisplay();
    translatePage(currentLang);
    
    // Performance Metrics Calculation
    function calculatePerformanceMetrics() {
        // Calculate load time
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            const loadTimeElement = document.getElementById('load-time');
            if (loadTimeElement) {
                let current = 0;
                const target = Math.round(loadTime);
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    loadTimeElement.textContent = Math.round(current);
                }, 20);
            }
        }
        
        // Calculate page size (approximate)
        const pageSizeElement = document.getElementById('page-size');
        if (pageSizeElement) {
            const scripts = Array.from(document.scripts).reduce((size, script) => {
                return size + (script.src ? 0 : script.textContent.length);
            }, 0);
            const styles = Array.from(document.styleSheets).reduce((size, sheet) => {
                try {
                    return size + (sheet.cssRules ? Array.from(sheet.cssRules).reduce((s, rule) => s + rule.cssText.length, 0) : 0);
                } catch (e) {
                    return size;
                }
            }, 0);
            const htmlSize = document.documentElement.outerHTML.length;
            const totalSize = Math.round((scripts + styles + htmlSize) / 1024);
            
            let current = 0;
            const target = totalSize;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                pageSizeElement.textContent = Math.round(current);
            }, 30);
        }
        
        // Mobile score (simulated - in real scenario, use Lighthouse API)
        const mobileScoreElement = document.getElementById('mobile-score');
        if (mobileScoreElement) {
            const isMobile = window.innerWidth <= 768;
            const score = isMobile ? 95 : 98;
            let current = 0;
            const timer = setInterval(() => {
                current += 2;
                if (current >= score) {
                    current = score;
                    clearInterval(timer);
                }
                mobileScoreElement.textContent = current;
            }, 30);
        }
        
        // SEO score (simulated)
        const seoScoreElement = document.getElementById('seo-score');
        if (seoScoreElement) {
            const score = 92;
            let current = 0;
            const timer = setInterval(() => {
                current += 2;
                if (current >= score) {
                    current = score;
                    clearInterval(timer);
                }
                seoScoreElement.textContent = current;
            }, 30);
        }
    }
    
    // Calculate metrics when section is visible
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                calculatePerformanceMetrics();
                performanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const performanceSection = document.getElementById('performance');
    if (performanceSection) {
        performanceObserver.observe(performanceSection);
    }
    
    // Quick Contact Button Functionality
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
        
        // Close panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!quickContactBtn.contains(e.target) && !quickContactPanel.contains(e.target)) {
                quickContactPanel.setAttribute('aria-hidden', 'true');
                quickContactBtn.classList.remove('expanded');
            }
        });
        
        // Close panel on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quickContactPanel.getAttribute('aria-hidden') === 'false') {
                quickContactPanel.setAttribute('aria-hidden', 'true');
                quickContactBtn.classList.remove('expanded');
            }
        });
    }
    
    // Cookie Consent Banner Functionality
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (cookieConsent && !cookieChoice) {
        // Show cookie consent after a short delay
        setTimeout(() => {
            cookieConsent.setAttribute('aria-hidden', 'false');
        }, 2000);
    }
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.setAttribute('aria-hidden', 'true');
            // Here you would initialize analytics or other tracking
            console.log('Cookies accepted');
        });
    }
    
    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.setAttribute('aria-hidden', 'true');
            console.log('Cookies declined');
        });
    }
});
