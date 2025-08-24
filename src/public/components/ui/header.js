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
    this.initializeTheme();
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
              <a href="#home" class="nav-link">Home</a>
              <a href="ide.html" class="nav-link">IDE</a>
              <a href="#features" class="nav-link">Features</a>
              <a href="/documentation" class="nav-link">Documentation</a>
              <a href="/blog" class="nav-link">Blog</a>
              <a href="/contact" class="nav-link">Contact</a>
            </div>

            <!-- Action Buttons -->
            <div class="nav-actions">
              <!-- Search -->
              <div class="search-container">
                <button class="search-trigger" aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>

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
              <button class="download-btn primary-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>

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
            <a href="#home" class="mobile-nav-link">Home</a>
            <a href="ide.html" class="mobile-nav-link">IDE</a>
            <a href="#features" class="mobile-nav-link">Features</a>
            <a href="/documentation" class="mobile-nav-link">Documentation</a>
            <a href="/blog" class="mobile-nav-link">Blog</a>
            <a href="/contact" class="mobile-nav-link">Contact</a>
            <div class="mobile-nav-actions">
              <button class="mobile-download-btn primary-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Now
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    // Insert header at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  bindEvents() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.toggleTheme.bind(this));
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

  toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme icon
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
      if (newTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
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
      mobileMenuToggle.classList.remove('active');
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }



  initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    body.setAttribute('data-theme', savedTheme);
    
    // Update theme icon
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
      if (savedTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
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
