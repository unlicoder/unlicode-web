// Theme Switching System
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add click effect
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'ph-moon';
        themeIcon.style.color = '#f59e0b'; // Yellow for sun
    } else {
        themeIcon.className = 'ph-sun';
        themeIcon.style.color = '#fbbf24'; // Light yellow for moon
    }
    
    // Update navbar background based on new theme
    updateNavbarBackground(theme);
}

function updateNavbarBackground(theme) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (theme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Mobile Navigation
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Sticky navigation
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const currentTheme = html.getAttribute('data-theme');
    
    if (scrollTop > 100) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    lastScrollTop = scrollTop;
});

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

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

searchInput.addEventListener('focus', () => {
    searchIcon.style.color = 'var(--accent-blue)';
});

searchInput.addEventListener('blur', () => {
    const currentTheme = html.getAttribute('data-theme');
    searchIcon.style.color = currentTheme === 'light' ? '#999999' : '#737373';
});

// Download button interaction
const downloadButton = document.querySelector('.download-button');

downloadButton.addEventListener('click', () => {
    // Add click effect
    downloadButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        downloadButton.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate download (replace with actual download logic)
    console.log('Download initiated...');
});

// Testimonials carousel
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % testimonials.length;
        showSlide(next);
    }

    // Auto-advance slides
    function startAutoAdvance() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoAdvance() {
        clearInterval(interval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoAdvance();
            startAutoAdvance(); // Restart auto-advance
        });
    });

    // Pause auto-advance on hover
    const carousel = document.getElementById('testimonials-carousel');
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Start auto-advance
    startAutoAdvance();
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Intersection Observer for animations
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonials
    initTestimonials();
    
    // Initialize FAQ
    initFAQ();
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
});

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
    }
    
    // Arrow keys for testimonials
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // Find current active slide
        testimonials.forEach((testimonial, index) => {
            if (testimonial.classList.contains('active')) {
                currentSlide = index;
            }
        });
        
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % testimonials.length;
        }
        
        // Show the new slide
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // Find current active slide
        testimonials.forEach((testimonial, index) => {
            if (testimonial.classList.contains('active')) {
                currentSlide = index;
            }
        });
        
        if (diff > 0) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % testimonials.length;
        } else {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        }
        
        // Show the new slide
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
}

// Interactive IDE Interface Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('ide-tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipDescription = document.getElementById('tooltip-description');
    
    // Interactive sidebar items with tooltips
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const [title, description] = tooltipText.split(' - ');
            
            tooltipTitle.textContent = title;
            tooltipDescription.textContent = description;
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.right + 10 + 'px';
            tooltip.style.top = rect.top + 'px';
            
            tooltip.classList.add('show');
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
    
    // Interactive control dots
    const controlDots = document.querySelectorAll('.control-dot');
    
    controlDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Add specific functionality for each control
            if (this.classList.contains('red')) {
                showNotification('Close window functionality');
            } else if (this.classList.contains('yellow')) {
                showNotification('Minimize window functionality');
            } else if (this.classList.contains('green')) {
                showNotification('Maximize window functionality');
            }
        });
    });
    
    // Interactive search bar
    const searchBar = document.querySelector('.ide-search');
    searchBar.addEventListener('click', function() {
        this.style.background = '#555';
        setTimeout(() => {
            this.style.background = '#404040';
        }, 200);
        showNotification('Search functionality activated');
    });
    
    // Interactive action buttons
    const actionButtons = document.querySelectorAll('.ide-actions i');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.color = '#00d4ff';
            setTimeout(() => {
                this.style.color = '#888';
            }, 300);
            showNotification('Action button clicked');
        });
    });
    
    // Interactive panel actions
    const panelActions = document.querySelectorAll('.panel-actions i');
    panelActions.forEach(action => {
        action.addEventListener('click', function() {
            this.style.color = '#00d4ff';
            setTimeout(() => {
                this.style.color = '#888';
            }, 300);
            
            const actionType = this.className.includes('plus') ? 'New chat' :
                             this.className.includes('arrow-clockwise') ? 'Refresh' :
                             this.className.includes('gear') ? 'Settings' : 'Close';
            showNotification(`${actionType} functionality activated`);
        });
    });
    
    // Interactive waitlist button
    const waitlistBtn = document.querySelector('.waitlist-btn');
    if (waitlistBtn) {
        waitlistBtn.addEventListener('click', function() {
            this.textContent = 'Added to Waitlist!';
            this.style.background = '#27ca3f';
            showNotification('Successfully added to waitlist!');
            
            setTimeout(() => {
                this.textContent = 'Join Waitlist';
                this.style.background = '#00d4ff';
            }, 2000);
        });
    }
    
    // Interactive cube
    const ideCube = document.querySelector('.ide-cube');
    if (ideCube) {
        ideCube.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
            showNotification('Infinity symbol represents unlimited possibilities');
        });
    }
    
    // Interactive shortcuts
    const shortcuts = document.querySelectorAll('.shortcut');
    shortcuts.forEach(shortcut => {
        shortcut.addEventListener('click', function() {
            this.style.background = '#00d4ff';
            this.style.color = '#000';
            setTimeout(() => {
                this.style.background = '#333';
                this.style.color = '#888';
            }, 300);
            
            const shortcutText = this.textContent;
            showNotification(`${shortcutText} shortcut activated`);
        });
    });
    
    // Interactive status items
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.color = '#00d4ff';
            setTimeout(() => {
                this.style.color = '#888';
            }, 300);
            
            const statusType = this.querySelector('i')?.className.includes('x-circle') ? 'Errors' :
                             this.querySelector('i')?.className.includes('warning') ? 'Warnings' : 'Info';
            showNotification(`${statusType} panel opened`);
        });
    });
    
    // Notification system
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'ide-notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00d4ff;
            color: #000;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add hover effects to IDE elements
    const ideElements = document.querySelectorAll('.ide-background > *');
    ideElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('ide-top-bar') && 
                !this.classList.contains('ide-status-bar')) {
                this.style.filter = 'brightness(1.1)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Keyboard shortcuts simulation
    document.addEventListener('keydown', function(e) {
        if (e.metaKey || e.ctrlKey) {
            if (e.key === 'l') {
                e.preventDefault();
                showNotification('Chat shortcut (⌘L) activated!');
                // Highlight the chat panel
                const chatPanel = document.querySelector('.ide-right-panel');
                chatPanel.style.border = '2px solid #00d4ff';
                setTimeout(() => {
                    chatPanel.style.border = '1px solid #404040';
                }, 1000);
            } else if (e.key === 'k') {
                e.preventDefault();
                showNotification('Quick Edit shortcut (⌘K) activated!');
                // Highlight the main content area
                const mainArea = document.querySelector('.ide-main');
                mainArea.style.border = '2px solid #00d4ff';
                setTimeout(() => {
                    mainArea.style.border = 'none';
                }, 1000);
            }
        }
    });
    
    // Add some ambient animations
    function addAmbientAnimations() {
        // Subtle floating animation for the cube
        const cube = document.querySelector('.ide-cube');
        if (cube) {
            cube.style.animation = 'float 6s ease-in-out infinite';
        }
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    addAmbientAnimations();
});
