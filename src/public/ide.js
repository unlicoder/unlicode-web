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
    
    // Try IDE button interaction
    const tryIdeButton = document.querySelector('.try-ide-button');
    if (tryIdeButton) {
        tryIdeButton.addEventListener('click', function() {
            // Scroll to IDE section
            const ideSection = document.querySelector('.ide-section');
            if (ideSection) {
                ideSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification('Interactive IDE demo activated!');
        });
    }
    
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
    
    // Add fade-in animations for sections
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
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.ide-hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add click effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px)';
            }, 150);
        });
    });
    
    // Add hover effects to back home button
    const backHomeBtn = document.querySelector('.back-home-btn');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        backHomeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});
