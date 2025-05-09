/**
 * NEAR - Never Empty Again on Return
 * Customer Preferences Animations and Statistics
 */

// Track if charts have been animated yet
const animatedCharts = {
    'delivery-preference-chart': false,
    'willingness-level-chart': false,
    'package-frequency-chart': false
};

// Update Customer Stats when tab is active
document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be loaded
    const checkData = setInterval(() => {
        if (nearData && nearData.stats) {
            clearInterval(checkData);
            initCustomerPreferences();
            setupScrollAnimations();
        }
    }, 100);
    
    // Add event listener for tab change
    const customerTab = document.querySelector('.tab-button[data-tab="customer-preferences"]');
    if (customerTab) {
        customerTab.addEventListener('click', function() {
            setTimeout(() => {
                updateCustomerStats();
                checkElementsInViewport(); // Check for visible charts when tab is clicked
            }, 200);
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
        // Add animated class for initial state
        element.classList.add('animated');
        // Reset state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.classList.remove('animate-now');
        
        // Force reflow
        void element.offsetWidth;
        
        // Add animation immediately
        setTimeout(() => {
            // Apply animation
            element.classList.add('animate-now');
            element.style.opacity = '1';
            
            // If this is a chart container, also animate the chart
            const canvas = element.querySelector('canvas');
            if (canvas && canvas.id) {
                // Immediately animate the chart data
                if (!animatedCharts[canvas.id]) {
                    animatedCharts[canvas.id] = true;
                    animateChartById(canvas.id);
                }
            }
        }, index * 150); // Smaller staggered delay for smoother sequence
    });
}

// Setup scroll-based animations
function setupScrollAnimations() {
    // Initialize chart containers
    const chartContainers = document.querySelectorAll('#customer-preferences .chart-container');
    chartContainers.forEach(container => {
        container.classList.add('animated');
        // Force hide initially (even if in viewport)
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        // Remove any animation that might be applied
        container.style.animation = 'none';
        
        // Ensure charts inside are also prepared for animation
        const canvas = container.querySelector('canvas');
        if (canvas && canvas.id) {
            const chart = Chart.getChart(canvas.id);
            if (chart && chart.data && chart.data.datasets && chart.data.datasets[0]) {
                // Get original data based on chart ID
                let originalData;
                switch(canvas.id) {
                    case 'delivery-preference-chart':
                        originalData = getDeliveryPreferenceData().counts;
                        break;
                    case 'willingness-level-chart':
                        originalData = getWillingnessLevelData().counts;
                        break;
                    case 'package-frequency-chart':
                        originalData = getPackageFrequencyData().counts;
                        break;
                }
                
                if (originalData) {
                    // Store original data for later animation
                    chart._originalData = [...originalData];
                }
            }
        }
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        checkElementsInViewport();
    });
    
    // Check on initial load after a brief delay (to allow for data loading)
    setTimeout(checkElementsInViewport, 800);
}

// Check if chart elements are in viewport to trigger animations
function checkElementsInViewport() {
    // Get all chart containers in customer section
    const chartContainerElements = document.querySelectorAll('#customer-preferences .chart-container');
    
    // Animate each container when in viewport
    chartContainerElements.forEach((container, index) => {
        if (container && isElementInViewport(container)) {
            // Only proceed if this container hasn't been animated yet
            if (container.style.opacity === '0' || !container.classList.contains('animate-now')) {
                console.log(`Customer chart container ${index} is in viewport and ready to animate`);
                
                // Apply animation class immediately
                container.classList.add('animate-now');
                container.style.opacity = '1'; // Ensure visible
                
                // Find the canvas inside this container
                const canvas = container.querySelector('canvas');
                if (canvas && canvas.id) {
                    console.log(`Found customer canvas with ID: ${canvas.id}`);
                    
                    // Check if chart data already animated
                    if (!animatedCharts[canvas.id]) {
                        // Mark as animated
                        animatedCharts[canvas.id] = true;
                        
                        // Animate chart immediately with the container
                        animateChartById(canvas.id);
                    }
                } else {
                    console.warn('Canvas element not found or missing ID in container:', container);
                }
            }
        }
    });
}

// Check if an element is visible in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// Animate specific chart by ID
function animateChartById(chartId) {
    // Get the Chart.js instance for this canvas
    const chartInstance = Chart.getChart(chartId);
    
    if (!chartInstance) {
        console.warn(`No Chart.js instance found for ${chartId}`);
        return;
    }
    
    console.log(`Animating customer chart data for: ${chartId}`);
    
    try {
        // Get original data from nearData
        let originalData;
        
        switch(chartId) {
            case 'delivery-preference-chart':
                originalData = getDeliveryPreferenceData().counts;
                break;
            case 'willingness-level-chart':
                originalData = getWillingnessLevelData().counts;
                break;
            case 'package-frequency-chart':
                originalData = getPackageFrequencyData().counts;
                break;
            default:
                console.warn(`Unknown chart ID: ${chartId}`);
                return;
        }
        
        // Store original animation settings
        let originalAnimation = false;
        if (chartInstance.options && chartInstance.options.animation) {
            originalAnimation = {...chartInstance.options.animation};
        }
        
        // Reset data to zero first
        chartInstance.data.datasets[0].data = originalData.map(() => 0);
        
        // Turn off animation for the reset
        if (!chartInstance.options) chartInstance.options = {};
        chartInstance.options.animation = false;
        chartInstance.update('none'); // Use 'none' mode to prevent any animation
        
        // Then animate to the real values immediately
        // Enhanced animation settings
        chartInstance.options.animation = {
            duration: 1200,
            easing: 'easeOutQuart',
            delay: 0
        };
        
        // Set the real data back
        chartInstance.data.datasets[0].data = originalData;
        
        // Force update with animation
        chartInstance.update();
        console.log(`Chart data animation started for ${chartId}`);
    } catch (error) {
        console.error(`Error animating chart ${chartId}:`, error);
        
        // Fallback - just show the data without animation
        try {
            chartInstance.update();
        } catch (e) {
            console.error("Fallback update also failed:", e);
        }
    }
}