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

// Simple Theme System - Single source of truth (Global functions)
window.initTheme = function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log('Initializing theme:', savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
};

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  console.log('Toggling theme from', currentTheme, 'to', newTheme);
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
};

function updateThemeIcon(theme) {
  // Use a more robust selector to find the icons
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  console.log('Updating theme icons for theme:', theme);
  console.log('Sun icon found:', !!sunIcon);
  console.log('Moon icon found:', !!moonIcon);
  
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      console.log('Set dark theme icons');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      console.log('Set light theme icons');
    }
  } else {
    // If icons aren't found, try again after a short delay
    // This handles the case where the header hasn't been created yet
    console.log('Icons not found, retrying in 100ms...');
    setTimeout(() => updateThemeIcon(theme), 100);
  }
}

// Mobile Navigation - Updated to use correct selectors
function initMobileNavigation() {
  const mobileMenuToggle = safeQuerySelector('.mobile-menu-toggle');
  const mobileNav = safeQuerySelector('.mobile-nav');

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
}

// Sticky navigation - Updated to work with CSS custom properties
function initStickyNavigation() {
  const navbar = safeQuerySelector('.modern-header');
  let lastScrollTop = 0;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }
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
    // Open Unlicode GitHub repository in new tab immediately (while user interaction is active)
    const link = document.createElement('a');
    link.href = 'https://github.com/unlicoder/unlicode';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
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
    
    // Initialize mobile navigation and sticky navigation
    initMobileNavigation();
    initStickyNavigation();
    
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
    
    // Initialize theme system after a short delay to ensure header is created
    setTimeout(() => {
        if (typeof window.initTheme === 'function') {
            window.initTheme();
        }
    }, 200);
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
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileNav) {
            mobileNav.classList.remove('open');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});




