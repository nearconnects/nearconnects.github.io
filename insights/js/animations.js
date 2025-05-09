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
        
        // Ensure charts inside are also hidden initially
        const canvas = container.querySelector('canvas');
        if (canvas && canvas.id) {
            const chart = Chart.getChart(canvas.id);
            if (chart) {
                // Store original data for later animation
                chart._originalData = [...chart.data.datasets[0].data];
                
                // Reset to zero for animation
                chart.data.datasets[0].data = chart._originalData.map(() => 0);
                chart.update('none');
            }
        }
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
                    
                    // Reset chart data
                    const canvas = container.querySelector('canvas');
                    if (canvas && canvas.id) {
                        const chart = Chart.getChart(canvas.id);
                        if (chart && chart._originalData) {
                            chart.data.datasets[0].data = chart._originalData.map(() => 0);
                            chart.update('none');
                        }
                    }
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
    
    // Determine custom colors based on canvas ID
    let primaryColor = config.colors.primary;
    let gradientEndColor = adjustColor(primaryColor, 20); // default lighter version
    
    // Set colors based on gauge type
    if (canvasId === 'driver-readiness-chart') {
        primaryColor = '#2563EB'; // Strong blue
        gradientEndColor = '#60A5FA'; // Light blue
    } else if (canvasId === 'customer-readiness-chart') {
        primaryColor = '#059669'; // Strong green
        gradientEndColor = '#34D399'; // Light green
    } else if (canvasId === 'opportunity-score-chart') {
        primaryColor = '#0891B2'; // Cyan
        gradientEndColor = '#22D3EE'; // Light cyan
    }
    
    // Check if we need to create a gradient
    if (config.colors.gradient) {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        // Add gradient stops with enhanced colors
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, gradientEndColor);
        
        // Update chart color
        chartInstance.data.datasets[0].backgroundColor[0] = gradient;
    } else {
        // Use solid color
        chartInstance.data.datasets[0].backgroundColor[0] = primaryColor;
    }
    
    // Make the background color more transparent for better contrast
    chartInstance.data.datasets[0].backgroundColor[1] = 'rgba(229, 231, 235, 0.25)';
    
    // Add enhanced shadow effect for 3D look
    chartInstance.options.elements = {
        arc: {
            borderWidth: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 12,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
    };
    
    // Improve chart rendering with better responsive options
    chartInstance.options.responsive = true;
    chartInstance.options.maintainAspectRatio = false;
    
    // Force update
    chartInstance.update('none');
    
    // Animate the gauge value
    let startTime;
    let currentValue = 0;
    const displayElement = config.displayElementId ? 
                           document.getElementById(config.displayElementId) : null;
    
    // Add animation class to the display element
    if (displayElement) {
        displayElement.classList.add('animate-pulse');
    }
    
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
            
            // Add visual delta indicator
            if (progress >= 0.98 && targetValue > 50) {
                const deltaElement = document.createElement('span');
                deltaElement.className = 'delta positive';
                deltaElement.innerHTML = '▲ ' + (Math.round(targetValue * 0.3) / 10).toFixed(1);
                
                // Remove any existing deltas first
                const existingDeltas = displayElement.parentNode.querySelectorAll('.delta');
                existingDeltas.forEach(el => el.remove());
                
                // Add the new delta
                displayElement.parentNode.appendChild(deltaElement);
            }
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
            // Only proceed if this container hasn't been animated yet
            if (container.style.opacity === '0') {
                console.log(`Container ${index} is in viewport and ready to animate`);
                
                // Apply animation class immediately
                container.classList.add('animate-now');
                container.style.opacity = '1'; // Ensure visible
                
                // Find the canvas inside this container
                const canvas = container.querySelector('canvas');
                if (canvas && canvas.id) {
                    console.log(`Found canvas with ID: ${canvas.id}`);
                    
                    // Check if chart data already animated
                    if (!animatedDriverCharts[canvas.id]) {
                        // Mark as animated
                        animatedDriverCharts[canvas.id] = true;
                        
                        // Animate chart immediately with the container
                        animateDriverChartById(canvas.id);
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
    
    console.log(`Animating chart data for: ${chartId}`);
    
    try {
        // Store the original data
        const originalData = [...chartInstance.data.datasets[0].data];
        
        // Save original animation settings
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

// Export functions for use in other modules
window.animateNumber = animateNumber;
window.animateNumberWithCommas = animateNumberWithCommas;
window.enhanceGaugeAnimation = enhanceGaugeAnimation;