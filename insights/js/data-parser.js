/**
 * NEAR - Never Empty Again on Return
 * Data Parser for Survey Data
 */

// Global data object
const nearData = {
    raw: null,
    drivers: null,
    customers: null,
    stats: null
};

// Column names mapping
const columnMap = {
    'Marca temporal': 'timestamp',
    'Genero ': 'gender',
    '¿Qué edad tienes?': 'age',
    '¿Trabajas en la carretera? 🚚 ': 'is_driver',
    '¿Eres autónomo o asalariado?': 'employment_type',
    '¿Tienes momentos en los que la carga esta vacía?': 'empty_cargo',
    '¿Estarías dispuesto a recoger un envío adicional si este se ajusta a tu ruta actual y está disponible inmediatamente? 📍': 'willing_to_deliver',
    '¿Con qué frecuencia tienes viajes de retorno vacíos a la semana? ⌛': 'empty_trips_frequency',
    '¿Qué tipo de vehículo usas?': 'vehicle_type',
    '¿Qué tipo de carga aceptas?': 'cargo_type',
    ' ¿Estarías dispuesto a compartir información sobre tus rutas y disponibilidad de espacio para mejorar la eficiencia?': 'share_route_info',
    '¿Aceptarías un envío a cambio de un ingreso extra? ✔️💶': 'accept_for_extra_income',
    '💡¿Tienes alguna sugerencia o característica específica que te gustaría que NEAR incluyera?': 'driver_suggestions',
    '¿Utilizas servicios de paquetería habitualmente?': 'uses_delivery_services',
    '¿Con que frecuencia aproximadamente envías paquetes al mes? ⌛ ': 'package_frequency',
    '¿Cambiarías el método de envió por uno más económico y sostenible?': 'use_service',
    '¿Prefieres la recogida a domicilio, puntos de entrega locales, o ambas opciones? ': 'delivery_preference',
    '¿Qué tan dispuesto estarías a probar un nuevo servicio de envío como NEAR?': 'willingness_level',
    '💡¿Tienes alguna sugerencia o característica específica que te gustaría que NEAR incluyera?.1': 'comments'
};

// Load and process data
async function loadSurveyData() {
    try {
        const response = await fetch('../insights/data/NearEncuesta_actualizado_utf8.csv');
        const csvText = await response.text();
        
        // Parse CSV data with semicolon delimiter
        Papa.parse(csvText, {
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            complete: function(results) {
                if (results.data && results.data.length > 0) {
                    processData(results.data);
                    updateUI();
                } else {
                    console.error('No data found in CSV');
                }
            },
            error: function(error) {
                console.error('Error parsing CSV:', error);
            }
        });
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

// Process the parsed data
function processData(data) {
    // Store raw data
    nearData.raw = data;
    
    // Clean and transform data
    const cleanedData = data.map(row => {
        const cleanedRow = {};
        
        // Map original column names to more friendly ones
        Object.keys(row).forEach(key => {
            const newKey = columnMap[key] || key;
            cleanedRow[newKey] = row[key];
        });
        
        // Convert is_driver to boolean
        if (cleanedRow.is_driver) {
            cleanedRow.is_driver = ['si', 'sí', 'yes', 'true', 'sí'].includes(
                cleanedRow.is_driver.toLowerCase().trim()
            );
        } else {
            cleanedRow.is_driver = false;
        }
        
        return cleanedRow;
    });
    
    // Extract driver and customer data
    nearData.drivers = cleanedData.filter(row => row.is_driver === true);
    nearData.customers = cleanedData.filter(row => row.is_driver === false);
    
    // Calculate statistics
    calculateStats();
}

// Calculate key statistics
function calculateStats() {
    if (!nearData.raw || !nearData.drivers || !nearData.customers) {
        console.error('Data not loaded properly');
        return;
    }
    
    const totalResponses = nearData.raw.length;
    const driverCount = nearData.drivers.length;
    const customerCount = nearData.customers.length;
    
    const driversWithEmptyCargo = nearData.drivers.filter(
        d => d.empty_cargo === 'Sí' || d.empty_cargo === 'Si' || d.empty_cargo === 'A veces'
    ).length;
    
    const willingDrivers = nearData.drivers.filter(
        d => d.willing_to_deliver === 'Sí' || d.willing_to_deliver === 'Si' || d.willing_to_deliver === 'Tal vez'
    ).length;
    
    const veryWillingCustomers = nearData.customers.filter(
        c => c.willingness_level === 'Muy dispuesto'
    ).length;
    
    nearData.stats = {
        totalResponses,
        driverCount,
        customerCount,
        driversWithEmptyCargo,
        driversWithEmptyCargoPercentage: driverCount > 0 ? 
            Math.round((driversWithEmptyCargo / driverCount) * 100) : 0,
        willingDrivers,
        willingDriversPercentage: driverCount > 0 ? 
            Math.round((willingDrivers / driverCount) * 100) : 0,
        veryWillingCustomers,
        veryWillingCustomersPercentage: customerCount > 0 ? 
            Math.round((veryWillingCustomers / customerCount) * 100) : 0
    };
}

// Update UI with calculated statistics
function updateUI() {
    if (!nearData.stats) return;
    
    // Update key metrics
    document.getElementById('total-respondents').textContent = nearData.stats.totalResponses;
    document.getElementById('empty-cargo-drivers').textContent = nearData.stats.driversWithEmptyCargo;
    document.getElementById('empty-cargo-percentage').textContent = 
        `${nearData.stats.driversWithEmptyCargoPercentage}%`;
    
    document.getElementById('willing-drivers').textContent = nearData.stats.willingDrivers;
    document.getElementById('willing-drivers-percentage').textContent = 
        `${nearData.stats.willingDriversPercentage}%`;
    
    document.getElementById('willing-customers').textContent = nearData.stats.veryWillingCustomers;
    document.getElementById('willing-customers-percentage').textContent = 
        `${nearData.stats.veryWillingCustomersPercentage}%`;
    
    // Update key insight
    document.getElementById('key-insight').textContent = 
        `${nearData.stats.willingDriversPercentage}% of drivers are willing to deliver packages during empty trips, 
        representing a significant untapped opportunity for logistics optimization.`;
}

// Data helper functions for charts
function getEmploymentTypeData() {
    if (!nearData.drivers) return null;
    
    const employmentCounts = {};
    nearData.drivers.forEach(driver => {
        if (driver.employment_type) {
            employmentCounts[driver.employment_type] = 
                (employmentCounts[driver.employment_type] || 0) + 1;
        }
    });
    
    return {
        labels: Object.keys(employmentCounts),
        counts: Object.values(employmentCounts)
    };
}

function getEmptyTripsData() {
    if (!nearData.drivers) return null;
    
    const emptyCounts = {};
    nearData.drivers.forEach(driver => {
        if (driver.empty_trips_frequency) {
            emptyCounts[driver.empty_trips_frequency] = 
                (emptyCounts[driver.empty_trips_frequency] || 0) + 1;
        }
    });
    
    // Sort by frequency
    const order = ['1-3', '3-5', '5-7', '7-10', '10+', 'Más de 6', '4-6'];
    
    // Create sorted arrays
    const sortedLabels = [];
    const sortedCounts = [];
    
    order.forEach(freq => {
        if (emptyCounts[freq]) {
            sortedLabels.push(freq);
            sortedCounts.push(emptyCounts[freq]);
        }
    });
    
    return {
        labels: sortedLabels,
        counts: sortedCounts
    };
}

function getVehicleTypeData() {
    if (!nearData.drivers) return null;
    
    const vehicleCounts = {};
    nearData.drivers.forEach(driver => {
        if (driver.vehicle_type) {
            vehicleCounts[driver.vehicle_type] = 
                (vehicleCounts[driver.vehicle_type] || 0) + 1;
        }
    });
    
    return {
        labels: Object.keys(vehicleCounts),
        counts: Object.values(vehicleCounts)
    };
}

function getDeliveryPreferenceData() {
    if (!nearData.customers) return null;
    
    const preferenceCounts = {};
    nearData.customers.forEach(customer => {
        if (customer.delivery_preference) {
            preferenceCounts[customer.delivery_preference] = 
                (preferenceCounts[customer.delivery_preference] || 0) + 1;
        }
    });
    
    return {
        labels: Object.keys(preferenceCounts),
        counts: Object.values(preferenceCounts)
    };
}

function getWillingnessLevelData() {
    if (!nearData.customers) return null;
    
    const willCounts = {};
    nearData.customers.forEach(customer => {
        if (customer.willingness_level) {
            willCounts[customer.willingness_level] = 
                (willCounts[customer.willingness_level] || 0) + 1;
        }
    });
    
    // Define order for willingness levels
    const order = ['Muy dispuesto', 'Dispuesto', 'Indiferente', 'Poco dispuesto', 'Nada dispuesto'];
    
    // Create sorted arrays
    const sortedLabels = [];
    const sortedCounts = [];
    
    order.forEach(level => {
        if (willCounts[level]) {
            sortedLabels.push(level);
            sortedCounts.push(willCounts[level]);
        }
    });
    
    return {
        labels: sortedLabels,
        counts: sortedCounts
    };
}

function getPackageFrequencyData() {
    if (!nearData.customers) return null;
    
    const freqCounts = {};
    nearData.customers.forEach(customer => {
        if (customer.package_frequency) {
            freqCounts[customer.package_frequency] = 
                (freqCounts[customer.package_frequency] || 0) + 1;
        }
    });
    
    // Define order for package frequency
    const order = ['1-5', '5-10', '6-10', '10 o más', 'Más de 10', '10 o más'];
    
    // Create sorted arrays
    const sortedLabels = [];
    const sortedCounts = [];
    
    order.forEach(freq => {
        if (freqCounts[freq]) {
            sortedLabels.push(freq);
            sortedCounts.push(freqCounts[freq]);
        }
    });
    
    return {
        labels: sortedLabels,
        counts: sortedCounts
    };
}

// Load data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadSurveyData);