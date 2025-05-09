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
function calculateBusinessOpportunityKPIs() {
    if (!nearData || !nearData.stats) return {
        driverReadiness: 65,
        customerReadiness: 60,
        opportunityScore: 75,
        marketPotential: 68,
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
        (driversWithEmptyCargoPercentage * 0.4) +  // Empty cargo availability
        (willingDriversPercentage * 0.6)           // Willingness to participate
    );
    
    // 2. Customer Market Readiness (weighted score based on willingness)
    const customerReadiness = Math.round(
        (veryWillingCustomersPercentage * 0.8) +    // Direct willingness
        ((customerCount / Math.max(1, totalResponses)) * 100 * 0.2)  // Market representation
    );
    
    // 3. Market Potential (based on matching possibilities)
    const marketSize = Math.min(100, ((driverCount + customerCount) / 50) * 30);
    const matchPotential = (driversWithEmptyCargoPercentage * willingDriversPercentage * 
                          veryWillingCustomersPercentage) / 100;
    const marketPotential = Math.round(Math.min(100, 
        (matchPotential * 0.6) + 
        (marketSize * 0.4)
    ));
    
    // 4. Network Effect Score (grows with participant numbers)
    const participantBalance = 1 - Math.abs((driverCount - customerCount) / 
                                          Math.max(1, driverCount + customerCount));
    const networkMultiplier = Math.min(1.5, 1 + ((driverCount + customerCount) / 150));
    const networkEffectScore = Math.round(Math.min(100,
        (networkMultiplier * 50) + 
        (participantBalance * 30) + 
        20 // Base score
    ));
    
    // 5. Sustainability Impact (environmental benefit potential)
    const emptyTripReduction = (driversWithEmptyCargoPercentage * willingDriversPercentage) / 100;
    const sustainabilityImpact = Math.round(Math.min(100, 
        (emptyTripReduction * 70) + 
        ((driverCount / Math.max(1, driverCount + customerCount)) * 100 * 0.3)
    ));
    
    // 6. TOTAL Opportunity Score (weighted combination of all KPIs)
    const opportunityScore = Math.round(
        (driverReadiness * 0.20) + 
        (customerReadiness * 0.20) + 
        (marketPotential * 0.25) + 
        (networkEffectScore * 0.15) + 
        (sustainabilityImpact * 0.20)
    );
    
    return {
        driverReadiness,
        customerReadiness,
        opportunityScore,
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

// Business opportunity charts
function createReadinessGaugeCharts() {
    // Get KPI values from our algorithm
    const kpis = calculateBusinessOpportunityKPIs();
    
    // Driver readiness gauge
    const driverCtx = document.getElementById('driver-readiness-chart').getContext('2d');
    const driverChart = new Chart(driverCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ready', 'Not Ready'],
            datasets: [{
                data: [0, 100], // Start at 0 for animation
                backgroundColor: [blueColors[1], '#E5E7EB'],
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
            maintainAspectRatio: true
        }
    });
    
    // Customer readiness gauge
    const customerCtx = document.getElementById('customer-readiness-chart').getContext('2d');
    const customerChart = new Chart(customerCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ready', 'Not Ready'],
            datasets: [{
                data: [0, 100], // Start at 0 for animation
                backgroundColor: [greenColors[1], '#E5E7EB'],
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
            maintainAspectRatio: true
        }
    });
    
    // Add initial text in center
    drawGaugeCenter(driverCtx, `0%`, 'Driver Readiness');
    drawGaugeCenter(customerCtx, `0%`, 'Customer Readiness');
    
    // Animate the gauges with smooth transitions
    animateChart(driverChart, driverCtx, kpis.driverReadiness, '%', 'Driver Readiness');
    animateChart(customerChart, customerCtx, kpis.customerReadiness, '%', 'Customer Readiness');
    
    // Update KPI metrics
    updateKPIMetrics(kpis);
}

function createOpportunityScoreChart() {
    // Get KPI values from our algorithm
    const kpis = calculateBusinessOpportunityKPIs();
    
    // Opportunity score gauge
    const ctx = document.getElementById('opportunity-score-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Opportunity', 'Remaining'],
            datasets: [{
                data: [0, 100], // Start at 0 for animation
                backgroundColor: [
                    getOpportunityColor(kpis.opportunityScore),
                    '#E5E7EB'
                ],
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
            maintainAspectRatio: true
        }
    });
    
    // Add initial empty text in center
    drawGaugeCenter(ctx, '0/100', 'Opportunity Score');
    
    // Animate opportunity score 
    animateChart(chart, ctx, kpis.opportunityScore, '/100', 'Opportunity Score');
}

// Helper function to animate a chart from 0 to target value
function animateChart(chart, ctx, targetValue, suffix = '%', label) {
    let currentValue = 0;
    const duration = 1500; // 1.5 seconds
    const interval = 16; // ~60fps
    const steps = Math.ceil(duration / interval);
    const increment = targetValue / steps;
    
    const animation = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animation);
        }
        
        // Update chart data
        chart.data.datasets[0].data = [
            Math.round(currentValue), 
            100 - Math.round(currentValue)
        ];
        chart.update('none'); // Update without animation
        
        // Update center text
        drawGaugeCenter(ctx, `${Math.round(currentValue)}${suffix}`, label);
    }, interval);
}

// Update KPI metrics in UI
function updateKPIMetrics(kpis) {
    // Start by updating the insight text
    updateBusinessInsight(kpis);
    
    // Animate the KPI progress bars
    setTimeout(() => {
        animateKPIBar('market-potential', kpis.marketPotential);
        animateKPIBar('network-effect', kpis.networkEffectScore);
        animateKPIBar('sustainability-impact', kpis.sustainabilityImpact);
    }, 800);
}

// Animate individual KPI bar
function animateKPIBar(id, value) {
    const bar = document.getElementById(`${id}-bar`);
    const valueDisplay = document.getElementById(`${id}-value`);
    
    if (!bar || !valueDisplay) return;
    
    // Set the color based on value
    bar.className = `shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getKPIColorClass(value)}`;
    
    // Animate width and counter
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
        }
    }, interval);
}

// Animate KPI bars with counting effect
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

// Helper function to draw text in the center of gauge charts
function drawGaugeCenter(ctx, text, label) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    // Need to wait for the chart to render
    setTimeout(() => {
        ctx.restore();
        ctx.font = "bold 24px 'Poppins', sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "#1E3A8A";
        ctx.fillText(text, width / 2, height * 0.7);
        
        ctx.font = "14px 'Poppins', sans-serif";
        ctx.fillStyle = "#6B7280";
        ctx.fillText(label, width / 2, height * 0.85);
        ctx.save();
    }, 100);
}

// Get color based on opportunity score
function getOpportunityColor(score) {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#3B82F6'; // Blue
    if (score >= 40) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
}