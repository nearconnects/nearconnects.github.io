/**
 * NEAR - Never Empty Again on Return
 * Insights Dashboard Main JavaScript
 * ----------------------------------
 * This file orchestrates the loading and initialization of all
 * dashboard components for the NEAR Insights platform.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing NEAR Insights Dashboard...');
    
    // Load survey data
    loadSurveyData().then(() => {
        console.log('Survey data loaded successfully');
        
        // Initialize UI components
        initTabs();
        
        // Initialize charts
        initializeCharts();
        
        // Set up animations
        setupAnimations();
        
        // Initialize customer preferences section
        initCustomerPreferences();
        
        // Set up scroll-based animations
        setupScrollAnimations();
        
        console.log('NEAR Insights Dashboard initialized');
    }).catch(error => {
        console.error('Error loading survey data:', error);
        document.getElementById('loading-indicator').innerHTML = 
            '<div class="error-message">Error loading data. Please refresh the page.</div>';
    });
});

/**
 * Initialize tab switching functionality
 */
function initTabs() {
    // Tab logic from tabs.js is now integrated here
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Check if charts need to be animated in the newly visible tab
            if (tabId === 'driver-insights') {
                checkDriverChartsInViewport();
            } else if (tabId === 'customer-preferences') {
                checkElementsInViewport();
            }
        });
    });
}