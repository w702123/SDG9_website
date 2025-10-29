// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate elements when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special handling for bar chart
            if (entry.target.classList.contains('bar-chart')) {
                animateBarChart();
            }
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const charts = document.querySelectorAll('.bar-chart');
    
    sections.forEach(section => {
        animateOnScroll.observe(section);
    });
    
    charts.forEach(chart => {
        animateOnScroll.observe(chart);
    });
    
    // Add fade-in animation styles
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-section {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);
});

// Animate bar chart
function animateBarChart() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const value = parseInt(bar.dataset.value);
            const maxHeight = 200; // Maximum height in pixels
            const height = (value / 100) * maxHeight;
            bar.style.height = `${height}px`;
        }, index * 200);
    });
}

// Smooth scrolling for any anchor links (if added later)
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

// Button click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Watch Video button
    const watchVideoBtn = document.querySelector('.hero-section .cta-button');
    if (watchVideoBtn) {
        watchVideoBtn.addEventListener('click', () => {
            // Placeholder for video functionality
            alert('Video functionality would be implemented here. This could open a modal, redirect to YouTube, or embed a video player.');
        });
    }
    
    // Share Message button
    const shareBtn = document.querySelector('.cta-section .cta-button');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Web Share API if available, otherwise fallback
            if (navigator.share) {
                navigator.share({
                    title: 'Move Toronto Public Transit Forward',
                    text: 'Toronto\'s transit system needs improvement. Learn how better transit can help our city grow.',
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                // Fallback: copy URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Show temporary feedback
                    const originalText = shareBtn.textContent;
                    shareBtn.textContent = 'Link Copied!';
                    setTimeout(() => {
                        shareBtn.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    // Ultimate fallback
                    alert('Share this page: ' + window.location.href);
                });
            }
        });
    }
});

// Parallax effect for hero background (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background-animation');
    
    if (heroBackground && scrolled < window.innerHeight) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translate(${speed * 0.1}px, ${speed * 0.1}px)`;
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background-animation');
    
    if (heroBackground && scrolled < window.innerHeight) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translate(${speed * 0.1}px, ${speed * 0.1}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('animate-in');
    }
});

// Accessibility: Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Error handling for any failed operations
window.addEventListener('error', (e) => {
    console.log('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Console message for developers
console.log('%cMove Toronto Forward 🚇', 'color: #BC5135; font-size: 20px; font-weight: bold;');
console.log('%cThis website supports UN SDG 9: Industry, Innovation & Infrastructure', 'color: #84BCB6; font-size: 14px;');
console.log('%cDesigned by Hui Ke, OCAD University', 'color: #666; font-size: 12px;');
