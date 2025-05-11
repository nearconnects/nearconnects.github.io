/**
 * NEAR - Never Empty Again on Return
 * Metric Cards Scroll Animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get necessary elements
    const keyMetricsSection = document.getElementById('key-metrics');
    const fullscreenCards = document.querySelectorAll('.fullscreen-card');
    const horizontalCardsContainer = document.querySelector('.horizontal-cards-container');
    const horizontalCards = document.querySelectorAll('.horizontal-card');
    const insightsSummary = document.querySelector('.insights-summary');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Initialize variables
    let cardsVisible = [false, false, false, false]; // Track which cards have been shown
    let allCardsShown = false; // Track if all cards have been displayed
    let lastScrollTop = 0; // Track last scroll position
    
    // Mirror values to horizontal cards for consistency
    function syncHorizontalCards() {
        // Get values from main metrics
        const totalRespondents = document.getElementById('total-respondents').textContent;
        const emptyCargoDrivers = document.getElementById('empty-cargo-drivers').textContent;
        const willingDrivers = document.getElementById('willing-drivers').textContent;
        const willingCustomers = document.getElementById('willing-customers').textContent;
        
        // Update horizontal card values if they exist and aren't already set
        document.getElementById('summary-total-respondents').textContent = totalRespondents;
        document.getElementById('summary-empty-cargo-drivers').textContent = emptyCargoDrivers;
        document.getElementById('summary-willing-drivers').textContent = willingDrivers;
        document.getElementById('summary-willing-customers').textContent = willingCustomers;
    }
    
    // Check if element is in viewport
    function isElementInViewport(el, threshold = 0.5) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is considered in viewport if it's x% visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.bottom - rect.top;
        
        return visibleHeight >= elementHeight * threshold;
    }
    
    // Show card with animation
    function showCard(card, index) {
        if (!cardsVisible[index]) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            cardsVisible[index] = true;
            
            // Check if this was the last card
            if (index === fullscreenCards.length - 1 && !allCardsShown) {
                setTimeout(() => {
                    showHorizontalCards();
                }, 1000);
            }
        }
    }
    
    // Show horizontal cards summary
    function showHorizontalCards() {
        // First sync the values
        syncHorizontalCards();
        
        // Then show the container
        horizontalCardsContainer.style.opacity = '1';
        horizontalCardsContainer.style.transform = 'translateY(0)';
        allCardsShown = true;
        
        // Hide scroll indicator
        scrollIndicator.classList.add('hidden');
        
        // Show insights summary with animation
        insightsSummary.classList.add('visible');
    }
    
    // Handle scroll event
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if all cards are visible - if so, we may need to show summary
        let visibleCount = 0;
        
        fullscreenCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                showCard(card, index);
                visibleCount++;
            }
        });
        
        // If user has scrolled to the end of all cards, show horizontal summary
        if (visibleCount === fullscreenCards.length && !allCardsShown) {
            showHorizontalCards();
        }
        
        // Update last scroll position
        lastScrollTop = scrollTop;
    }
    
    // Initial check when page loads
    setTimeout(() => {
        // Show the first card by default
        if (fullscreenCards.length > 0) {
            showCard(fullscreenCards[0], 0);
        }
        
        // Check other cards in viewport
        handleScroll();
    }, 500);
    
    // Add click event to horizontal cards for navigation
    horizontalCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardIndex = parseInt(this.dataset.card) - 1;
            
            // Remove active class from all cards
            horizontalCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            if (fullscreenCards[cardIndex]) {
                fullscreenCards[cardIndex].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Show first card initially
    if (fullscreenCards.length > 0) {
        setTimeout(() => {
            showCard(fullscreenCards[0], 0);
        }, 300);
    }
});