// Modern Header Component with shadcn-ui design principles
class ModernHeader {
  constructor() {
    this.isScrolled = false;
    this.isMobileMenuOpen = false;
    this.init();
  }

  init() {
    this.createHeader();
    this.bindEvents();
    this.handleScroll();
    this.adjustBodyPadding();
  }

  createHeader() {
    const headerHTML = `
      <header class="modern-header" id="modern-header">


        <!-- Main Navigation -->
        <nav class="nav-container">
          <div class="nav-content">
            <!-- Logo Section -->
            <div class="nav-logo">
              <a href="/" class="logo-link">
                <div class="logo-icon">
                  <img src="images/unlicode-logo.png" alt="Unlicode Logo" width="44" height="44">
                </div>
                <span class="logo-text">Unlicode</span>
              </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="nav-menu desktop-nav">
            </div>

            <!-- Action Buttons -->
            <div class="nav-actions">
              <!-- Theme Toggle -->
              <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
                <svg class="theme-icon sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <svg class="theme-icon moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              </button>

              <!-- Download Button -->
              <a href="https://github.com/unlicoder/unlicode" target="_blank" rel="noopener noreferrer" class="download-btn primary-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                Github
              </a>

              <!-- Mobile Menu Toggle -->
              <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
              </button>
            </div>
          </div>
        </nav>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" id="mobile-nav">
          <div class="mobile-nav-content">
            <div class="mobile-nav-actions">
              <a href="https://github.com/unlicoder/unlicode" target="_blank" rel="noopener noreferrer" class="mobile-download-btn primary-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                Download Now
              </a>
            </div>
          </div>
        </div>
      </header>
    `;

    // Insert header at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  bindEvents() {
    // Theme toggle - use centralized theme system
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        // Call the centralized theme toggle function
        if (typeof window.toggleTheme === 'function') {
          window.toggleTheme();
        } else {
          console.warn('toggleTheme function not found');
        }
      });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.mobile-menu-toggle') && !e.target.closest('.mobile-nav')) {
        this.closeMobileMenu();
      }
    });

    // Handle scroll events
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Handle window resize
    window.addEventListener('resize', this.adjustBodyPadding.bind(this));
  }

  handleScroll() {
    const header = document.getElementById('modern-header');
    if (!header) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 10 && !this.isScrolled) {
      header.classList.add('scrolled');
      this.isScrolled = true;
    } else if (scrollTop <= 10 && this.isScrolled) {
      header.classList.remove('scrolled');
      this.isScrolled = false;
    }
  }

  toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNav && mobileMenuToggle) {
      mobileNav.classList.add('open');
      mobileMenuToggle.classList.add('active');
      this.isMobileMenuOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNav && mobileMenuToggle) {
      mobileNav.classList.remove('open');
      mobileMenuToggle.classList.remove('open');
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  adjustBodyPadding() {
    const header = document.getElementById('modern-header');
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
  }
}

// Initialize the header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ModernHeader();
});
