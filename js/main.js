/**
 * NEAR - Never Empty Again on Return
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Overlay
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    
    function openMobileMenu() {
        document.documentElement.classList.add('menu-open');
        mobileNav.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        
        // Animate hamburger to X
        hamburger.classList.add('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        
        // Focus management
        mobileClose.focus();
    }
    
    function closeMobileMenu() {
        document.documentElement.classList.remove('menu-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger animation
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Return focus to hamburger
        hamburger.focus();
    }

    // Event listeners
    if (hamburger && mobileNav) {
        // Hamburger click to open menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });

        // Close button click
        if (mobileClose) {
            mobileClose.addEventListener('click', function(e) {
                e.preventDefault();
                closeMobileMenu();
            });
        }

        // Close menu when clicking backdrop
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // ESC key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });

        // Initialize accessibility attributes
        hamburger.setAttribute('aria-controls', 'mobile-nav');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (document.documentElement.classList.contains('menu-open')) {
                closeMobileMenu();
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.style.backgroundColor = 'rgba(18, 24, 38, 0.98)'; // Dark background
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(18, 24, 38, 0.95)'; // Dark background
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // Load hero animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('active');
        }, 300);
    }
});
