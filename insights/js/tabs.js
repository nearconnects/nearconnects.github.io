/**
 * NEAR - Never Empty Again on Return
 * Tabs Functionality for Insights Dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content containers
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listener to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab name from data attribute
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Mobile menu handling
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (ctaButtons) {
                ctaButtons.classList.toggle('active');
            }
        });
    }
});