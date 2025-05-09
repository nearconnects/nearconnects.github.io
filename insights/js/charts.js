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

// Business opportunity charts
function createReadinessGaugeCharts() {
    if (!nearData.stats) return;
    
    // Driver readiness gauge
    const driverCtx = document.getElementById('driver-readiness-chart').getContext('2d');
    new Chart(driverCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ready', 'Not Ready'],
            datasets: [{
                data: [
                    nearData.stats.willingDriversPercentage, 
                    100 - nearData.stats.willingDriversPercentage
                ],
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
    
    // Add percentage text in center
    const driverPercentage = nearData.stats.willingDriversPercentage;
    drawGaugeCenter(driverCtx, `${driverPercentage}%`, 'Driver Readiness');
    
    // Customer readiness gauge
    const customerCtx = document.getElementById('customer-readiness-chart').getContext('2d');
    new Chart(customerCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ready', 'Not Ready'],
            datasets: [{
                data: [
                    nearData.stats.veryWillingCustomersPercentage, 
                    100 - nearData.stats.veryWillingCustomersPercentage
                ],
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
    
    // Add percentage text in center
    const customerPercentage = nearData.stats.veryWillingCustomersPercentage;
    drawGaugeCenter(customerCtx, `${customerPercentage}%`, 'Customer Readiness');
}

function createOpportunityScoreChart() {
    if (!nearData.stats) return;
    
    // Calculate opportunity score (0-100)
    const opportunityScore = Math.round(
        (nearData.stats.willingDriversPercentage + 
         nearData.stats.veryWillingCustomersPercentage + 
         nearData.stats.driversWithEmptyCargoPercentage) / 3
    );
    
    // Opportunity score gauge
    const ctx = document.getElementById('opportunity-score-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Opportunity', 'Remaining'],
            datasets: [{
                data: [opportunityScore, 100 - opportunityScore],
                backgroundColor: [
                    getOpportunityColor(opportunityScore),
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
    
    // Add score text in center
    drawGaugeCenter(ctx, `${opportunityScore}/100`, 'Opportunity Score');
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