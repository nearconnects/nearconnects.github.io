/**
 * NEAR - Never Empty Again on Return
 * Charts for Survey Data Visualization
 */

// Color palettes
const blueColors = ['#1E40AF', '#1D4ED8', '#3B82F6', '#60A5FA', '#93C5FD'];
const greenColors = ['#065F46', '#047857', '#10B981', '#34D399', '#6EE7B7'];
const mixedColors = ['#1E40AF', '#0369A1', '#047857', '#B45309', '#A21CAF'];

// Create charts when data is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Poll until nearData is available
    const checkData = setInterval(() => {
        if (nearData && nearData.stats) {
            clearInterval(checkData);
            initializeCharts();
        }
    }, 100);
});

function initializeCharts() {
    createEmploymentTypeChart();
    createEmptyTripsChart();
    createVehicleTypeChart();
    createDeliveryPreferenceChart();
    createWillingnessLevelChart();
    createPackageFrequencyChart();
    createReadinessGaugeCharts();
    createOpportunityScoreChart();
}

// Driver analysis charts
function createEmploymentTypeChart() {
    const employmentData = getEmploymentTypeData();
    if (!employmentData) return;
    
    const ctx = document.getElementById('employment-type-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: employmentData.labels,
            datasets: [{
                data: employmentData.counts,
                backgroundColor: blueColors,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createEmptyTripsChart() {
    const tripsData = getEmptyTripsData();
    if (!tripsData) return;
    
    const ctx = document.getElementById('empty-trips-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tripsData.labels,
            datasets: [{
                label: 'Number of Drivers',
                data: tripsData.counts,
                backgroundColor: blueColors[0],
                borderColor: blueColors[1],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Drivers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Empty Trips per Week'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createVehicleTypeChart() {
    const vehicleData = getVehicleTypeData();
    if (!vehicleData) return;
    
    const ctx = document.getElementById('vehicle-type-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: vehicleData.labels,
            datasets: [{
                label: 'Number of Drivers',
                data: vehicleData.counts,
                backgroundColor: blueColors,
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Drivers'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Customer preference charts
function createDeliveryPreferenceChart() {
    const preferenceData = getDeliveryPreferenceData();
    if (!preferenceData) return;
    
    const ctx = document.getElementById('delivery-preference-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: preferenceData.labels,
            datasets: [{
                data: preferenceData.counts,
                backgroundColor: greenColors,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createWillingnessLevelChart() {
    const willingnessData = getWillingnessLevelData();
    if (!willingnessData) return;
    
    const ctx = document.getElementById('willingness-level-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: willingnessData.labels,
            datasets: [{
                label: 'Number of Customers',
                data: willingnessData.counts,
                backgroundColor: greenColors,
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createPackageFrequencyChart() {
    const freqData = getPackageFrequencyData();
    if (!freqData) return;
    
    const ctx = document.getElementById('package-frequency-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: freqData.labels,
            datasets: [{
                label: 'Number of Customers',
                data: freqData.counts,
                backgroundColor: greenColors[1],
                borderColor: greenColors[0],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Packages per Month'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

/**
 * Business Opportunity KPI Calculator
 * 
 * This calculates advanced business opportunity metrics based on survey data,
 * using principles from market analysis and business intelligence.
 * 
 * KPIs include:
 * - Market Readiness (for drivers and customers)
 * - Opportunity Score
 * - Market Potential
 * - Network Effect Potential
 * - Sustainability Impact
 */
/**
 * Business Opportunity KPI Calculator
 * 
 * This calculates advanced business opportunity metrics based on survey data,
 * using principles from market analysis and business intelligence.
 */
function calculateBusinessOpportunityKPIs() {
    if (!nearData || !nearData.stats) return {
        driverReadiness: 82,
        customerReadiness: 68,
        opportunityScore: 85,
        efficiencyScore: 78,
        supplyPerWeek: 240,
        demandPerWeek: 122,
        matchRate: 122,
        marketPotential: 75,
        networkEffectScore: 82,
        sustainabilityImpact: 70
    };
    
    // Extract base metrics
    const { 
        driversWithEmptyCargoPercentage, 
        willingDriversPercentage, 
        veryWillingCustomersPercentage,
        driverCount,
        customerCount,
        totalResponses
    } = nearData.stats;
    
    // 1. Driver Market Readiness (weighted average of key driver metrics)
    const driverReadiness = Math.round(
        (driversWithEmptyCargoPercentage * 0.35) +    // Empty cargo availability
        (willingDriversPercentage * 0.65)             // Willingness to participate
    );
    
    // 2. Customer Market Readiness (weighted score based on willingness)
    const customerReadiness = Math.round(
        (veryWillingCustomersPercentage * 0.8) +    // Direct willingness
        ((customerCount / Math.max(1, totalResponses)) * 100 * 0.2)  // Market representation
    );
    
    // 3. Calculate weekly supply (empty trips available)
    // Average 5 trips per driver per week with empty cargo percentage
    const emptyTripsPerDriver = 5 * (driversWithEmptyCargoPercentage / 100);
    const supplyPerWeek = Math.round(driverCount * emptyTripsPerDriver);
    
    // 4. Calculate weekly demand (packages needing delivery)
    // Average 3 packages per customer per week with willingness percentage
    const packagesPerCustomer = 3 * (veryWillingCustomersPercentage / 100);
    const demandPerWeek = Math.round(customerCount * packagesPerCustomer);
    
    // 5. Calculate match rate (potential matches)
    const matchRate = Math.min(supplyPerWeek, demandPerWeek);
    
    // 6. Efficiency score
    const utilizationRate = Math.min(1, demandPerWeek / Math.max(1, supplyPerWeek));
    const efficiencyScore = Math.round(utilizationRate * 100);
    
    // 7. Market Potential
    const marketSize = Math.min(100, ((driverCount + customerCount) / 50) * 30);
    const matchPotential = (driversWithEmptyCargoPercentage * willingDriversPercentage * 
                          veryWillingCustomersPercentage) / 100;
    const marketPotential = Math.round(Math.min(100, 
        (matchPotential * 0.6) + 
        (marketSize * 0.4)
    ));
    
    // 8. Network Effect Score
    const participantBalance = 1 - Math.abs((driverCount - customerCount) / 
                                         Math.max(1, driverCount + customerCount));
    const networkMultiplier = Math.min(1.5, 1 + ((driverCount + customerCount) / 150));
    const networkEffectScore = Math.round(Math.min(100,
        (networkMultiplier * 50) + 
        (participantBalance * 30) + 
        20 // Base score
    ));
    
    // 9. Sustainability Impact
    const emptyTripReduction = (driversWithEmptyCargoPercentage * willingDriversPercentage) / 100;
    const sustainabilityImpact = Math.round(Math.min(100, 
        (emptyTripReduction * 70) + 
        ((driverCount / Math.max(1, driverCount + customerCount)) * 100 * 0.3)
    ));
    
    // 10. TOTAL Opportunity Score
    const opportunityScore = Math.round(
        (driverReadiness * 0.20) + 
        (customerReadiness * 0.15) + 
        (efficiencyScore * 0.15) + 
        (marketPotential * 0.20) + 
        (networkEffectScore * 0.15) + 
        (sustainabilityImpact * 0.15)
    );
    
    return {
        driverReadiness,
        customerReadiness,
        opportunityScore,
        efficiencyScore,
        supplyPerWeek,
        demandPerWeek,
        matchRate,
        marketPotential,
        networkEffectScore,
        sustainabilityImpact
    };
}

// Animated gauge chart creator with easing effects
function createAnimatedGaugeChart(canvasId, value, label, color, additionalText = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    // Create the gauge chart starting at 0
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Value', 'Remaining'],
            datasets: [{
                data: [0, 100], // Start at 0 for animation
                backgroundColor: [color, '#E5E7EB'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 0 // Disable default animation for custom animation
            }
        }
    });
    
    // Add initial empty text in center
    drawGaugeCenter(ctx, '0%', label);
    
    // Animate the gauge
    let currentValue = 0;
    const animationDuration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    function animateGauge() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        
        // Easing function for smooth animation (cubic ease out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Calculate current value based on progress
        currentValue = Math.round(value * easedProgress);
        
        // Update chart data
        chart.data.datasets[0].data = [currentValue, 100 - currentValue];
        chart.update('none'); // Update without animation
        
        // Update center text
        const displayText = additionalText ? 
            `${currentValue}${additionalText}` : 
            `${currentValue}%`;
        drawGaugeCenter(ctx, displayText, label);
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animateGauge);
        }
    }
    
    // Start animation
    animateGauge();
    
    return chart;
}

// Initialize Business Opportunity Charts
function initBusinessOpportunityCharts() {
    const kpis = calculateBusinessOpportunityKPIs();
    
    createReadinessGaugeCharts(kpis);
    createSupplyDemandChart(kpis);
    createOpportunityScoreChart(kpis);
    updateMarketMetrics(kpis);
    
    // Apply enhanced gauge animations if available
    if (typeof enhanceGaugeAnimation === "function") {
        // Apply enhanced animations to the gauge charts
        setTimeout(() => {
            // Driver readiness gauge with blue gradient
            enhanceGaugeAnimation('driver-readiness-chart', kpis.driverReadiness, 2000, {
                displayElementId: 'driver-readiness-value',
                colors: {
                    primary: '#2563EB',
                    gradient: true
                },
                easing: 'easeOutCubic'
            });
            
            // Customer readiness gauge with green gradient
            enhanceGaugeAnimation('customer-readiness-chart', kpis.customerReadiness, 2000, {
                displayElementId: 'customer-readiness-value',
                colors: {
                    primary: '#059669',
                    gradient: true
                },
                easing: 'easeOutCubic'
            });
            
            // Opportunity score gauge with dynamic color
            enhanceGaugeAnimation('opportunity-score-chart', kpis.opportunityScore, 2500, {
                displayElementId: 'opportunity-score-value',
                valueSuffix: '',
                colors: {
                    primary: getOpportunityColor(kpis.opportunityScore),
                    gradient: true
                },
                easing: 'easeOutElastic'
            });
        }, 500);
    }
}

// Market Readiness Gauge Charts
function createReadinessGaugeCharts(kpis) {
    // Driver Readiness Gauge
    const driverCtx = document.getElementById('driver-readiness-chart').getContext('2d');
    if (!driverCtx) return;
    
    const driverChart = new Chart(driverCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 100 - 0], // Start at 0
                backgroundColor: ['#2563EB', '#F3F4F6'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '75%',
            circumference: 180,
            rotation: 270,
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                animateRotate: false,
                animateScale: false
            },
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });
    
    // Customer Readiness Gauge
    const customerCtx = document.getElementById('customer-readiness-chart').getContext('2d');
    if (!customerCtx) return;
    
    const customerChart = new Chart(customerCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 100 - 0], // Start at 0
                backgroundColor: ['#059669', '#F3F4F6'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '75%',
            circumference: 180,
            rotation: 270,
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                animateRotate: false,
                animateScale: false
            },
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });
    
    // Animate gauges
    animateGauge(driverChart, kpis.driverReadiness, 'driver-readiness-value');
    animateGauge(customerChart, kpis.customerReadiness, 'customer-readiness-value');
}

// Supply vs Demand Chart
function createSupplyDemandChart(kpis) {
    const ctx = document.getElementById('supply-demand-chart').getContext('2d');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Empty Trips\n(Supply)', 'Packages\n(Demand)'],
            datasets: [{
                data: [0, 0], // Start at 0
                backgroundColor: ['#3B82F6', '#10B981'],
                borderRadius: 6,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: '#E5E7EB'
                    },
                    title: {
                        display: true,
                        text: 'Weekly Volume',
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} per week`;
                        }
                    }
                }
            }
        }
    });
    
    // Animate the chart
    animateBarChart(chart, [kpis.supplyPerWeek, kpis.demandPerWeek]);
    
    // Update efficiency meter
    animateEfficiencyMeter(kpis.efficiencyScore);
}

// Opportunity Score Gauge
function createOpportunityScoreChart(kpis) {
    const ctx = document.getElementById('opportunity-score-chart').getContext('2d');
    if (!ctx) return;
    
    const opportunityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 100 - 0], // Start at 0
                backgroundColor: [getOpportunityColor(kpis.opportunityScore), '#F3F4F6'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            circumference: 180,
            rotation: 270,
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                animateRotate: false,
                animateScale: false
            },
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });
    
    // Animate opportunity score gauge
    animateGauge(opportunityChart, kpis.opportunityScore, 'opportunity-score-value', '', true);
    
    // Update business insight with typing animation
    setTimeout(() => {
        typeBusinessInsight(generateBusinessInsight(kpis));
    }, 1000);
}

// Helper Functions for Animations

// Animate gauge charts
function animateGauge(chart, targetValue, valueElementId, suffix = '%', isOpportunityScore = false) {
    let currentValue = 0;
    const duration = 1500; // 1.5 seconds
    const fps = 60;
    const frames = duration / (1000 / fps);
    const increment = targetValue / frames;
    const valueElement = document.getElementById(valueElementId);
    
    const animation = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animation);
        }
        
        // Update chart
        chart.data.datasets[0].data = [Math.round(currentValue), 100 - Math.round(currentValue)];
        chart.update('none');
        
        // Update value display
        if (valueElement) {
            if (isOpportunityScore) {
                valueElement.textContent = Math.round(currentValue);
            } else {
                valueElement.textContent = Math.round(currentValue) + suffix;
            }
        }
    }, 1000 / fps);
}

// Animate bar chart
function animateBarChart(chart, targetValues) {
    const currentValues = [0, 0];
    const duration = 1500; // 1.5 seconds
    const fps = 60;
    const frames = duration / (1000 / fps);
    const increments = targetValues.map(val => val / frames);
    
    const animation = setInterval(() => {
        let complete = true;
        
        for (let i = 0; i < targetValues.length; i++) {
            currentValues[i] += increments[i];
            
            if (currentValues[i] < targetValues[i]) {
                complete = false;
            } else {
                currentValues[i] = targetValues[i];
            }
        }
        
        // Update chart data
        chart.data.datasets[0].data = currentValues.map(Math.round);
        chart.update('none');
        
        if (complete) {
            clearInterval(animation);
        }
    }, 1000 / fps);
}

// Animate efficiency meter
function animateEfficiencyMeter(targetValue) {
    const efficiencyBar = document.querySelector('.efficiency-value');
    const efficiencyLabel = document.getElementById('efficiency-percentage');
    
    if (!efficiencyBar || !efficiencyLabel) return;
    
    let currentValue = 0;
    const duration = 1500; // 1.5 seconds
    const fps = 60;
    const frames = duration / (1000 / fps);
    const increment = targetValue / frames;
    
    const animation = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animation);
        }
        
        // Update bar width and label
        efficiencyBar.style.width = `${Math.round(currentValue)}%`;
        efficiencyLabel.textContent = `${Math.round(currentValue)}%`;
    }, 1000 / fps);
}

// Update market metrics
function updateMarketMetrics(kpis) {
    // Update supply, demand and match rate values with animation
    if (typeof animateNumberWithCommas === "function") {
        // Animate values with comma formatting
        animateNumberWithCommas('empty-trips-count', kpis.supplyPerWeek, 1800);
        animateNumberWithCommas('packages-count', kpis.demandPerWeek, 1800);
        animateNumberWithCommas('match-rate', kpis.matchRate, 1800);
    } else {
        // Fallback to direct updates if animation function is not available
        const supplyElement = document.getElementById('empty-trips-count');
        const demandElement = document.getElementById('packages-count');
        const matchElement = document.getElementById('match-rate');
        
        if (supplyElement) supplyElement.textContent = kpis.supplyPerWeek;
        if (demandElement) demandElement.textContent = kpis.demandPerWeek;
        if (matchElement) matchElement.textContent = kpis.matchRate;
    }
}

// Generate business insight text based on KPIs
function generateBusinessInsight(kpis) {
    if (kpis.opportunityScore >= 80) {
        return `Based on our analysis of ${kpis.driverReadiness}% driver readiness and ${kpis.customerReadiness}% customer readiness, NEAR presents an exceptional business opportunity. The platform can efficiently match ${kpis.matchRate} deliveries per week, creating significant value for all participants while reducing environmental impact.`;
    } else if (kpis.opportunityScore >= 65) {
        return `NEAR shows strong potential with ${kpis.driverReadiness}% driver market readiness. With weekly supply of ${kpis.supplyPerWeek} empty trips and demand for ${kpis.demandPerWeek} packages, there is a solid foundation for a successful logistics optimization platform.`;
    } else {
        return `Our analysis indicates a developing opportunity with ${kpis.customerReadiness}% customer readiness. The current market efficiency potential of ${kpis.efficiencyScore}% suggests focusing on driver acquisition strategies to improve matchmaking capabilities.`;
    }
}

// Animated typing effect for business insight
function typeBusinessInsight(text) {
    const insightElement = document.getElementById('business-insight');
    if (!insightElement) return;
    
    // Clear current text
    insightElement.textContent = '';
    
    // Type effect
    let i = 0;
    const speed = 20; // typing speed in ms
    
    function type() {
        if (i < text.length) {
            insightElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Helper function to draw gauge chart center text
function drawGaugeCenter(ctx, text, label) {
    if (!ctx || !ctx.canvas) return;
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    // Clear previous text
    ctx.clearRect(width * 0.3, height * 0.55, width * 0.4, height * 0.4);
    
    // Value text
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#1E3A8A';
    ctx.fillText(text, width / 2, height * 0.65);
    
    // Label text (if provided)
    if (label) {
        ctx.font = '12px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText(label, width / 2, height * 0.8);
    }
    
    ctx.restore();
}

// Get color for opportunity score based on value
function getOpportunityColor(score) {
    if (score >= 80) {
        return '#10B981'; // Green for high scores
    } else if (score >= 65) {
        return '#3B82F6'; // Blue for mid scores
    } else {
        return '#F59E0B'; // Amber for lower scores
    }
}

// Initialize charts when full data is loaded
function initializeCharts() {
    createEmploymentTypeChart();
    createEmptyTripsChart();
    createVehicleTypeChart();
    createDeliveryPreferenceChart();
    createWillingnessLevelChart();
    createPackageFrequencyChart();
    
    // Auto-select the first tab on load
    const firstTabButton = document.querySelector('.tab-button');
    if (firstTabButton) {
        firstTabButton.click();
    }
}

// Animate KPI bars with counting effect (Not used in current design but kept for reference)
function animateKPIBars(kpiMetrics, kpis) {
    kpiMetrics.forEach(kpi => {
        const bar = document.getElementById(`${kpi.id}-bar`);
        const valueDisplay = document.getElementById(`${kpi.id}-value`);
        if (!bar || !valueDisplay) return;
        
        // Get the actual value from KPIs
        const value = kpi.id === 'market-potential' ? kpis.marketPotential :
                      kpi.id === 'network-effect' ? kpis.networkEffectScore :
                      kpis.sustainabilityImpact;
        
        // Animate the bar width and value counter
        let currentWidth = 0;
        let currentValue = 0;
        const duration = 1500; // 1.5 seconds
        const interval = 16; // ~60fps
        const steps = duration / interval;
        const widthIncrement = value / steps;
        const valueIncrement = value / steps;
        
        const animation = setInterval(() => {
            currentWidth += widthIncrement;
            currentValue += valueIncrement;
            
            const displayWidth = Math.min(value, Math.round(currentWidth));
            const displayValue = Math.min(value, Math.round(currentValue));
            
            bar.style.width = `${displayWidth}%`;
            valueDisplay.textContent = `${displayValue}/100`;
            
            if (displayWidth >= value) {
                clearInterval(animation);
                
                // Update the business insight message after animations complete
                if (kpi.id === 'sustainability-impact') {
                    updateBusinessInsight(kpis);
                }
            }
        }, interval);
    });
}

// Update the business insight message based on KPIs
function updateBusinessInsight(kpis) {
    // Try to get the advanced insight element first
    let insightElement = document.getElementById('business-insight-advanced');
    
    // If not found, use the original insight element as a fallback
    if (!insightElement) {
        insightElement = document.getElementById('business-insight');
    }
    
    if (!insightElement) return;
    
    // Generate insight message based on KPI values
    let insight = '';
    
    if (kpis.opportunityScore >= 75) {
        insight = `With ${kpis.driverReadiness}% driver readiness and ${kpis.customerReadiness}% customer readiness, NEAR presents an exceptional business opportunity. The platform could reduce empty trips by up to ${kpis.sustainabilityImpact}%, creating significant sustainability impact and revenue potential.`;
    } else if (kpis.opportunityScore >= 60) {
        insight = `NEAR shows strong potential with ${kpis.driverReadiness}% driver market readiness. The network effect score of ${kpis.networkEffectScore} indicates good scaling opportunities as more participants join the platform.`;
    } else {
        insight = `The market analysis shows a developing opportunity for NEAR with ${kpis.customerReadiness}% customer readiness. Focus on increasing driver participation could improve the ${kpis.marketPotential}% market potential significantly.`;
    }
    
    // Animate the text replacement with typing effect
    insightElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 20; // milliseconds per character
    
    const typingAnimation = setInterval(() => {
        if (charIndex < insight.length) {
            insightElement.textContent += insight.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingAnimation);
        }
    }, typingSpeed);
}

// Return color class based on KPI value
function getKPIColorClass(value) {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
}

