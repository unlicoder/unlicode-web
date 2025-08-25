// Safe DOM Query Function with Error Handling
function safeQuerySelector(selector) {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return null;
    }
    return element;
  } catch (error) {
    console.error(`Error querying selector ${selector}:`, error);
    return null;
  }
}

function safeGetElementById(id) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID not found: ${id}`);
      return null;
    }
    return element;
  } catch (error) {
    console.error(`Error getting element by ID ${id}:`, error);
    return null;
  }
}

// Safe Event Listener Function
function safeAddEventListener(element, event, handler) {
  if (element && typeof element.addEventListener === 'function') {
    try {
      element.addEventListener(event, handler);
    } catch (error) {
      console.error(`Error adding ${event} listener:`, error);
    }
  } else {
    console.warn(`Cannot add ${event} listener to element:`, element);
  }
}

// Theme Switching System
const themeToggle = safeGetElementById('theme-toggle');
const themeIcon = safeGetElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
if (themeIcon) {
  updateThemeIcon(currentTheme);
}

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeIcon) {
      updateThemeIcon(newTheme);
    }
    
    // Add click effect
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);
  });
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  
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
  const navbar = safeQuerySelector('.navbar');
  if (!navbar) return;
  
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
const burgerMenu = safeQuerySelector('.burger-menu');
const navLinks = safeQuerySelector('.nav-links');

if (burgerMenu && navLinks) {
  burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
}

// Sticky navigation
const navbar = safeQuerySelector('.navbar');
let lastScrollTop = 0;

if (navbar) {
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
    } else {
      console.log(`Target element ${this.getAttribute('href')} not found`);
    }
  });
});



// Download button interaction
const downloadButton = safeQuerySelector('.download-button');

if (downloadButton) {
  downloadButton.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = downloadButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    downloadButton.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Add loading state
    downloadButton.classList.add('loading');
    downloadButton.innerHTML = '<i class="ph-spinner-gap"></i> Processing...';
    
    // Add click effect
    downloadButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      downloadButton.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate download process (replace with actual download logic)
    setTimeout(() => {
      // Remove loading state
      downloadButton.classList.remove('loading');
      downloadButton.innerHTML = '<i class="ph-check-circle"></i> Download Complete!';
      downloadButton.style.background = '#10b981';
      downloadButton.style.borderColor = '#10b981';
      
      // Reset button after a delay
      setTimeout(() => {
        downloadButton.innerHTML = '<i class="ph-rocket"></i> Unlock Early Access';
        downloadButton.style.background = '';
        downloadButton.style.borderColor = '';
      }, 2000);
    }, 2000);
    
    console.log('Download initiated...');
  });
}



// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Safety check: if no FAQ items exist, exit early
    if (faqItems.length === 0) {
        console.log('FAQ section not found, skipping initialization');
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
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
        }
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
    if (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQ
    initFAQ();
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
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
    

});




