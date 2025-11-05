// Setup for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Watch sections and trigger animations when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate bar chart when it appears
            if (entry.target.classList.contains('bar-chart')) {
                animateBarChart();
            }
        }
    });
}, observerOptions);

// Start observing sections when page loads
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const charts = document.querySelectorAll('.bar-chart');
    
    sections.forEach(section => {
        animateOnScroll.observe(section);
    });
    
    charts.forEach(chart => {
        animateOnScroll.observe(chart);
    });
    
    // Add fade-in effect for sections
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

// Animate bars growing to their heights
function animateBarChart() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const value = parseFloat(bar.dataset.value);
            const maxHeight = 250;
            const maxValue = 50;
            const height = (value / maxValue) * maxHeight;
            bar.style.height = `${height}px`;
        }, index * 250);
    });
}

// Smooth scrolling for anchor links
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

// Share button functionality
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.querySelector('.cta-section .cta-button');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Try native share API first
            if (navigator.share) {
                navigator.share({
                    title: 'Move Toronto Public Transit Forward',
                    text: 'Toronto\'s transit system needs improvement. Learn how better transit can help our city grow.',
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                // Fallback to copying URL
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = shareBtn.textContent;
                    shareBtn.textContent = 'Link Copied!';
                    setTimeout(() => {
                        shareBtn.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    alert('Share this page: ' + window.location.href);
                });
            }
        });
    }
});

// Subtle parallax effect for hero background
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

const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background-animation');
    
    if (heroBackground && scrolled < window.innerHeight) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translate(${speed * 0.1}px, ${speed * 0.1}px)`;
    }
}, 16);

window.addEventListener('scroll', throttledScroll);

// Trigger initial animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('animate-in');
    }
});

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
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

// Log errors for debugging
window.addEventListener('error', (e) => {
    console.log('An error occurred:', e.error);
});

// Fun console messages
console.log('%cMove Toronto Forward 🚇', 'color: #BC5135; font-size: 20px; font-weight: bold;');
console.log('%cThis website supports UN SDG 9: Industry, Innovation & Infrastructure', 'color: #84BCB6; font-size: 14px;');
console.log('%cDesigned by Hui Ke, OCAD University', 'color: #666; font-size: 12px;');
