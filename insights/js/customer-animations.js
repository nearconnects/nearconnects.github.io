/**
 * NEAR - Never Empty Again on Return
 * Customer Preferences Animations and Statistics
 */

// Update Customer Stats when tab is active
document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be loaded
    const checkData = setInterval(() => {
        if (nearData && nearData.stats) {
            clearInterval(checkData);
            initCustomerPreferences();
        }
    }, 100);
    
    // Add event listener for tab change
    const customerTab = document.querySelector('.tab-button[data-tab="customer-preferences"]');
    if (customerTab) {
        customerTab.addEventListener('click', function() {
            setTimeout(updateCustomerStats, 200);
        });
    }
});

// Initialize Customer Preferences Tab
function initCustomerPreferences() {
    // Add one-time initialization if needed
    const customerTab = document.querySelector('.tab-button[data-tab="customer-preferences"]');
    if (customerTab && customerTab.classList.contains('active')) {
        updateCustomerStats();
    }
}

// Update Customer Stats with real data
function updateCustomerStats() {
    if (!nearData || !nearData.stats) return;
    
    // Calculate real values based on the survey data
    const avgPackages = calculateAveragePackages();
    const homeDeliveryPct = calculateHomeDeliveryPercentage();
    const ecoFriendlyPct = calculateEcoFriendlyPercentage();
    
    // Animate the values
    animateCounter('avg-packages-monthly', avgPackages);
    animateCounter('home-delivery-pct', homeDeliveryPct, '%');
    animateCounter('eco-friendly-pct', ecoFriendlyPct, '%');
    
    // Reset animations for containers
    resetAndAnimateElements('.stat-container', 0.2);
    resetAndAnimateElements('.chart-container.animated', 0.4);
    resetAndAnimateElements('.feedback-item', 0.6);
}

// Calculate average packages sent monthly per customer
function calculateAveragePackages() {
    if (!nearData.customers || nearData.customers.length === 0) return 7.5;
    
    // Map frequency range to average value
    const frequencyMap = {
        '1-5': 3,
        '5-10': 7.5,
        '6-10': 8,
        '10 o más': 12,
        'Más de 10': 12
    };
    
    let total = 0;
    let count = 0;
    
    nearData.customers.forEach(customer => {
        if (customer.package_frequency && frequencyMap[customer.package_frequency]) {
            total += frequencyMap[customer.package_frequency];
            count++;
        }
    });
    
    return count > 0 ? Number((total / count).toFixed(1)) : 7.5;
}

// Calculate percentage of customers who prefer home delivery
function calculateHomeDeliveryPercentage() {
    if (!nearData.customers || nearData.customers.length === 0) return 68;
    
    let homeDeliveryCount = 0;
    
    nearData.customers.forEach(customer => {
        if (customer.delivery_preference && 
            (customer.delivery_preference.toLowerCase().includes('domicilio') || 
             customer.delivery_preference.toLowerCase().includes('ambas'))) {
            homeDeliveryCount++;
        }
    });
    
    return Math.round((homeDeliveryCount / nearData.customers.length) * 100);
}

// Calculate percentage of eco-friendly interested customers
function calculateEcoFriendlyPercentage() {
    if (!nearData.customers || nearData.customers.length === 0) return 72;
    
    let ecoFriendlyCount = 0;
    
    nearData.customers.forEach(customer => {
        if (customer.use_service && 
            (customer.use_service.toLowerCase().includes('sí') || 
             customer.use_service.toLowerCase().includes('si') ||
             customer.use_service.toLowerCase().includes('tal vez'))) {
            ecoFriendlyCount++;
        }
    });
    
    return Math.round((ecoFriendlyCount / nearData.customers.length) * 100);
}

// Animate counter with number format
function animateCounter(elementId, target, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = target / 30; // Animate in 30 steps
    const duration = 1500; // 1.5 seconds
    const interval = duration / 30;
    
    const animation = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(animation);
        }
        
        // Format the display value
        if (Number.isInteger(target)) {
            element.textContent = Math.round(current) + suffix;
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }
    }, interval);
}

// Reset and animate elements with staggered delay
function resetAndAnimateElements(selector, baseDelay) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        // Remove animation classes
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        // Force reflow
        void element.offsetWidth;
        
        // Add animation
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = `fadeInUp 0.6s ease forwards ${baseDelay + (index * 0.2)}s`;
        }, 50);
    });
}