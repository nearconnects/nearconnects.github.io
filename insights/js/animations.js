/**
 * NEAR - Never Empty Again on Return
 * Number and Gauge Animations
 */

// Track if driver charts have been animated yet
const animatedDriverCharts = {
    'employment-type-chart': false,
    'empty-trips-chart': false,
    'vehicle-types-chart': false,
    // Ensure all possible chart IDs are covered
    'vehicle-type-chart': false   // Some places might use this ID instead
};

// Execute animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be loaded
    const checkData = setInterval(() => {
        if (nearData && nearData.stats) {
            clearInterval(checkData);
            setupAnimations();
            setupDriverScrollAnimations();
        }
    }, 100);
});

// Setup initial animations for key metrics
function setupAnimations() {
    console.log("Setting up simple counter animations");
    
    // Key metrics section animations
    animateNumberWithCommas('total-respondents', nearData.stats.totalResponses, 1500);
    animateNumberWithCommas('empty-cargo-drivers', nearData.stats.driversWithEmptyCargo, 1500);
    animateNumberWithCommas('willing-drivers', nearData.stats.willingDrivers, 1500);
    animateNumberWithCommas('willing-customers', nearData.stats.veryWillingCustomers, 1500);
    
    // Percentages animations with % symbol
    animateNumber('empty-cargo-percentage', nearData.stats.driversWithEmptyCargoPercentage, 1500, '%');
    animateNumber('willing-drivers-percentage', nearData.stats.willingDriversPercentage, 1500, '%');
    animateNumber('willing-customers-percentage', nearData.stats.veryWillingCustomersPercentage, 1500, '%');
}

// Setup scroll-based animations for driver insights
function setupDriverScrollAnimations() {
    // Add class to driver charts for animations
    const driverChartContainers = document.querySelectorAll('#driver-insights .chart-container');
    driverChartContainers.forEach(container => {
        container.classList.add('animated');
        // Force hide initially (even if in viewport)
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        // Remove any animation that might be applied
        container.style.animation = 'none';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        checkDriverChartsInViewport();
    });
    
    // Add event listener for tab change to check visibility
    const driverTab = document.querySelector('.tab-button[data-tab="driver-insights"]');
    if (driverTab) {
        driverTab.addEventListener('click', function() {
            // Reset animations when tab is clicked
            driverChartContainers.forEach(container => {
                // Only reset if not already animated
                if (container.style.opacity !== '1') {
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(20px)';
                    container.style.animation = 'none';
                }
            });
            
            // Reset animation tracking
            for (let chartId in animatedDriverCharts) {
                animatedDriverCharts[chartId] = false;
            }
            
            // Check after a short delay
            setTimeout(() => {
                checkDriverChartsInViewport();
            }, 200);
        });
    }
    
    // Delay initial check to ensure page is fully loaded and scroll position is stable
    // Do NOT check immediately on load - wait for user to scroll
}

/**
 * Animate a number from 0 to target value
 * @param {string} elementId - The ID of the element to animate
 * @param {number} targetValue - The final value
 * @param {number} duration - Duration of animation in ms
 * @param {string} suffix - Optional suffix like '%' or '$'
 * @param {function} formatter - Optional formatter function
 */
function animateNumber(elementId, targetValue, duration = 1000, suffix = '', formatter = null) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found`);
        return;
    }
    
    console.log(`Setting up animation for ${elementId}: final value = ${targetValue}`);
    
    let startTime;
    let currentValue = 0;
    
    // Store original text if it contains non-numeric parts
    const originalText = element.textContent;
    const hasNonNumeric = isNaN(parseFloat(originalText));
    
    // Check if target value is valid
    if (isNaN(targetValue)) {
        console.warn(`Invalid target value for ${elementId}: ${targetValue}`);
        return;
    }
    
    // Use default value if target value is undefined or null
    if (targetValue === undefined || targetValue === null) {
        if (hasNonNumeric) {
            return; // Keep original text if it's not numeric
        }
        targetValue = 0;
    }
    
    // Start the animation
    console.log(`Starting animation for ${elementId}`);
    
    function animateFrame(timestamp) {
        if (!startTime) startTime = timestamp;
        
        // Calculate progress
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Use easeOutQuart for smooth animation that slows down at the end
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        // Calculate current value based on easing
        currentValue = Math.min(targetValue * easeOutQuart, targetValue);
        
        // Round appropriately based on target value
        const displayValue = targetValue >= 100 ? 
                             Math.round(currentValue) : 
                             (targetValue >= 10 ? 
                                Math.round(currentValue * 10) / 10 : 
                                Math.round(currentValue * 100) / 100);
        
        // Format the value
        let formattedValue;
        if (formatter) {
            formattedValue = formatter(displayValue);
        } else {
            formattedValue = displayValue.toString();
        }
        
        // Update element text with suffix
        element.textContent = formattedValue + suffix;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animateFrame);
        }
    }
    
    requestAnimationFrame(animateFrame);
}

/**
 * Animate a number with commas for thousands
 * @param {string} elementId - The ID of the element to animate
 * @param {number} targetValue - The final value
 * @param {number} duration - Duration of animation in ms
 * @param {string} suffix - Optional suffix
 */
function animateNumberWithCommas(elementId, targetValue, duration = 1000, suffix = '') {
    const formatter = (value) => {
        return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    animateNumber(elementId, targetValue, duration, suffix, formatter);
}

/**
 * Enhanced gauge animation for circular gauges
 * This function enhances existing Chart.js doughnut charts with smoother animation
 * and gradient fill effects
 * @param {string} canvasId - The ID of the canvas element
 * @param {number} targetValue - The final value (0-100)
 * @param {number} duration - Duration of animation in ms
 * @param {object} options - Additional options like colors, display element ID
 */
function enhanceGaugeAnimation(canvasId, targetValue, duration = 1500, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas with ID '${canvasId}' not found`);
        return;
    }
    
    // Default options
    const config = {
        displayElementId: null,
        valueSuffix: '%',
        colors: {
            primary: '#3B82F6',
            background: '#E5E7EB',
            gradient: true
        },
        easing: 'easeOutCubic',
        ...options
    };
    
    // Get the Chart.js instance
    const chartInstance = Chart.getChart(canvas);
    if (!chartInstance) {
        console.warn(`No Chart.js instance found for canvas '${canvasId}'`);
        return;
    }
    
    // Check if we need to create a gradient
    if (config.colors.gradient) {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        // Parse the primary color to create a gradient
        let baseColor = config.colors.primary;
        
        // Add gradient stops
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, adjustColor(baseColor, 20)); // Lighter version
        
        // Update chart color
        chartInstance.data.datasets[0].backgroundColor[0] = gradient;
    } else {
        // Use solid color
        chartInstance.data.datasets[0].backgroundColor[0] = config.colors.primary;
    }
    
    // Update background color
    chartInstance.data.datasets[0].backgroundColor[1] = config.colors.background;
    
    // Add shadow effect
    chartInstance.options.elements = {
        arc: {
            borderWidth: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
    };
    
    // Force update
    chartInstance.update('none');
    
    // Animate the gauge value
    let startTime;
    let currentValue = 0;
    const displayElement = config.displayElementId ? 
                           document.getElementById(config.displayElementId) : null;
    
    function animateFrame(timestamp) {
        if (!startTime) startTime = timestamp;
        
        // Calculate progress
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Apply easing based on config
        let easedProgress;
        switch (config.easing) {
            case 'easeOutQuart':
                easedProgress = 1 - Math.pow(1 - progress, 4);
                break;
            case 'easeOutCubic':
                easedProgress = 1 - Math.pow(1 - progress, 3);
                break;
            case 'easeOutElastic':
                const c4 = (2 * Math.PI) / 3;
                easedProgress = progress === 0 ? 0 : progress === 1 ? 1 :
                    Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1;
                break;
            default: // linear
                easedProgress = progress;
        }
        
        // Calculate current value
        currentValue = targetValue * easedProgress;
        
        // Update chart data
        chartInstance.data.datasets[0].data = [
            Math.round(currentValue), 
            100 - Math.round(currentValue)
        ];
        
        // Apply update without animation
        chartInstance.update('none');
        
        // Update display element if provided
        if (displayElement) {
            displayElement.textContent = Math.round(currentValue) + config.valueSuffix;
        }
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animateFrame);
        }
    }
    
    // Start animation
    requestAnimationFrame(animateFrame);
}

/**
 * Adjust color brightness
 * @param {string} color - Hex color code
 * @param {number} percent - Percent to lighten (positive) or darken (negative)
 * @returns {string} - New hex color
 */
function adjustColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

// Check if driver charts are in viewport to trigger animations
function checkDriverChartsInViewport() {
    // Log the available charts for debugging
    const allCharts = document.querySelectorAll('#driver-insights canvas');
    console.log('Available charts in Driver Insights:', Array.from(allCharts).map(c => c.id));
    
    // All chart containers to check
    const chartContainers = [
        document.getElementById('employment-type-chart'),
        document.getElementById('empty-trips-chart'),
        document.getElementById('vehicle-type-chart')  // Ensure this matches the actual ID
    ];
    
    // Get all chart containers in driver insights
    const driverChartContainers = document.querySelectorAll('#driver-insights .chart-container');
    
    // Animate each chart container when in viewport
    driverChartContainers.forEach((container, index) => {
        if (container && isElementInViewport(container)) {
            // Add animation class if not already animated
            if (container.style.opacity === '0') {
                // Add fade-in class for proper animation with delays
                container.classList.add('fade-in');
                container.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
                container.style.opacity = '1'; // Mark as animated
                
                // Log that we're animating this container
                console.log('Animating driver chart container:', container);
                
                // Find the canvas inside this container
                const canvas = container.querySelector('canvas');
                if (canvas && canvas.id) {
                    console.log(`Found canvas with ID: ${canvas.id}`);
                    
                    // Check if already animated
                    if (!animatedDriverCharts[canvas.id]) {
                        // Mark as animated
                        animatedDriverCharts[canvas.id] = true;
                        
                        // Trigger chart-specific animation with delay
                        setTimeout(() => {
                            animateDriverChartById(canvas.id);
                        }, 300 + (index * 200)); // Stagger the chart animations
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

// Animate specific driver chart by ID
function animateDriverChartById(chartId) {
    // Get the Chart.js instance for this canvas
    const chartInstance = Chart.getChart(chartId);
    
    if (!chartInstance) {
        console.warn(`No Chart.js instance found for ${chartId}`);
        return;
    }
    
    console.log(`Animating chart: ${chartId}`);
    
    // Store the original data and animation state
    const originalData = [...chartInstance.data.datasets[0].data];
    const originalAnimation = {...chartInstance.options.animation};
    
    // First set data to zero
    chartInstance.data.datasets[0].data = originalData.map(() => 0);
    
    // Disable animation for the reset
    chartInstance.options.animation = false;
    chartInstance.update();
    
    // Then restore animation and animate to the actual values
    setTimeout(() => {
        // Restore and enhance animation
        chartInstance.options.animation = {
            duration: 1500,
            easing: 'easeOutQuart'
        };
        
        // Apply the actual data to trigger animation
        chartInstance.data.datasets[0].data = originalData;
        
        // Force chart update with animation
        chartInstance.update();
        console.log(`Chart animation started for ${chartId}`);
    }, 200);
}

// Export functions for use in other modules
window.animateNumber = animateNumber;
window.animateNumberWithCommas = animateNumberWithCommas;
window.enhanceGaugeAnimation = enhanceGaugeAnimation;