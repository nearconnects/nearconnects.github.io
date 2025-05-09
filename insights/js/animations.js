/**
 * NEAR - Never Empty Again on Return
 * Advanced Animation System for Insights Dashboard
 */

// Initialize the animation system
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar todas las animaciones automáticamente
    autoStartAllAnimations();
    
    // Setup key metrics animations
    setupKeyMetricsAnimations();
    
    // Setup particle effects for visual impact
    setupParticleEffects();
    
    // Fix para el problema de NaN - establecer valores fijos en los elementos
    fixNaNValuesWithHardcodedData();
});

// Set up the Intersection Observer to detect when elements come into view
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.market-opportunity-section, .key-metric, .takeaway, .value-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
                
                // Special animation for metrics
                if (entry.target.classList.contains('key-metric')) {
                    const valueElement = entry.target.querySelector('.metric-value');
                    const percentageElement = entry.target.querySelector('.metric-percentage');
                    
                    if (valueElement) {
                        animateCounterWithBounce(valueElement);
                    }
                    
                    if (percentageElement) {
                        animateCounterWithBounce(percentageElement);
                    }
                }
                
                // Special animation for value items
                if (entry.target.classList.contains('value-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Create an eye-catching animation for key metrics
function setupKeyMetricsAnimations() {
    const keyInsightsSection = document.querySelector('.key-insights');
    if (!keyInsightsSection) return;
    
    const metrics = keyInsightsSection.querySelectorAll('.metric-card');
    
    metrics.forEach((metric, index) => {
        // Add hover effect class
        metric.classList.add('dynamic-metric');
        
        // Add 3D transform capability
        metric.addEventListener('mousemove', (e) => {
            const rect = metric.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 15;
            const angleY = (centerX - x) / 15;
            
            metric.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            metric.style.boxShadow = `0 15px 35px rgba(50, 50, 93, 0.2)`;
        });
        
        // Reset on mouse leave
        metric.addEventListener('mouseleave', () => {
            metric.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            metric.style.boxShadow = '';
        });
    });
}

// Animate counter with a bounce effect
function animateCounterWithBounce(element) {
    if (!element) return;
    
    const finalValue = parseInt(element.getAttribute('data-value') || element.textContent);
    const isPercentage = element.textContent.includes('%');
    
    let startValue = 0;
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    
    // Start with the element hidden
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // Fade in with upward movement
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Begin counter animation with bounce effect
        const counter = setInterval(() => {
            frame++;
            
            // Easing function with slight bounce
            const progress = frame / totalFrames;
            // Add a slight bounce at the end
            const easeOutBounce = progress < 0.8 
                ? progress * (1 + Math.sin(progress * Math.PI * 5) * 0.1)
                : 1 - Math.cos((progress - 0.8) * Math.PI * 2.5) * 0.1;
            
            const currentValue = Math.floor(easeOutBounce * finalValue);
            element.textContent = isPercentage ? `${currentValue}%` : currentValue;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = isPercentage ? `${finalValue}%` : finalValue;
            }
        }, frameDuration);
    }, Math.random() * 300);
}

// Generate dynamic particle effects for visual impact
function setupParticleEffects() {
    const businessOpp = document.getElementById('business-opportunity');
    if (!businessOpp) return;
    
    // Create canvas for particle effects
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.15';
    
    businessOpp.prepend(canvas);
    
    // Setup canvas
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function updateCanvasSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    // Particle system
    const particles = [];
    const particleCount = 30;
    
    // Define colors based on our palette
    const particleColors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Amber
        '#6366F1'  // Indigo
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: particleColors[Math.floor(Math.random() * particleColors.length)]
        });
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections to nearby particles
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 150) * 255).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Función para iniciar todas las animaciones automáticamente, sin depender del scroll
function autoStartAllAnimations() {
    // Aplicar la clase animate-in a todos los elementos que deberían animarse
    const animatedElements = document.querySelectorAll('.market-opportunity-section, .key-metric, .takeaway, .value-item');
    
    animatedElements.forEach((el, index) => {
        // Retraso escalonado para una aparición secuencial
        setTimeout(() => {
            el.classList.add('animate-in');
            el.classList.add('dynamic-metric');
            
            // Si es un elemento métrico, iniciar la animación del contador
            const valueElement = el.querySelector('.metric-value');
            const percentageElement = el.querySelector('.metric-percentage');
            
            if (valueElement) {
                animateCounterWithBounce(valueElement);
            }
            
            if (percentageElement) {
                animateCounterWithBounce(percentageElement);
            }
        }, index * 150); // Retraso escalonado de 150ms entre elementos
    });
    
    // Iniciar las animaciones para los gráficos
    setTimeout(() => {
        initializeChartAnimations();
    }, 500);
    
    // Llamar al método para animaciones métricas en el dashboard principal
    setupDramaticMetricReveals();
}

// Solucionar el problema de NaN con valores hardcodeados
function fixNaNValuesWithHardcodedData() {
    console.log("Corrigiendo valores NaN con datos predeterminados");
    
    // Definir los valores correctos para cada métrica
    const correctMetrics = {
        'total-respondents': 73,
        'empty-cargo-drivers': 34,
        'empty-cargo-percentage': 72,
        'willing-drivers': 30,
        'willing-drivers-percentage': 65,
        'willing-customers': 26,
        'willing-customers-percentage': 60
    };
    
    // Buscar todas las métricas en la página y reemplazar los valores NaN
    Object.keys(correctMetrics).forEach(key => {
        // Buscar por ID
        const elementById = document.getElementById(key);
        if (elementById) {
            // Verificar si el contenido es NaN
            if (elementById.textContent.includes('NaN')) {
                elementById.textContent = key.includes('percentage') ? 
                    `${correctMetrics[key]}%` : correctMetrics[key].toString();
                
                // Iniciar animación
                animateElement(elementById);
            }
        }
        
        // Buscar por clase (para casos donde no hay ID)
        const elementsByClass = document.querySelectorAll(`.${key}`);
        elementsByClass.forEach(element => {
            if (element.textContent.includes('NaN')) {
                element.textContent = key.includes('percentage') ? 
                    `${correctMetrics[key]}%` : correctMetrics[key].toString();
                
                // Iniciar animación
                animateElement(element);
            }
        });
    });
    
    // Caso especial para las tarjetas de métricas en el dashboard principal
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metricValue => {
        if (metricValue.textContent.includes('NaN')) {
            // Determinar qué tipo de métrica es basado en su contexto
            const metricCard = metricValue.closest('.metric-card');
            if (metricCard) {
                const title = metricCard.querySelector('h3')?.textContent.toLowerCase() || '';
                
                // Asignar valor según el título
                if (title.includes('respondents') || title.includes('encuestados')) {
                    metricValue.textContent = '73';
                } else if (title.includes('empty cargo') || title.includes('carga vacía')) {
                    metricValue.textContent = '34';
                } else if (title.includes('willing to deliver') || title.includes('dispuestos a entregar')) {
                    metricValue.textContent = '30';
                } else if (title.includes('willing customers') || title.includes('clientes dispuestos')) {
                    metricValue.textContent = '26';
                } else {
                    // Valor predeterminado si no podemos determinar
                    metricValue.textContent = '0';
                }
                
                // Iniciar animación
                animateElement(metricValue);
            }
        }
    });
    
    // Para los porcentajes
    const percentageValues = document.querySelectorAll('.metric-percentage');
    percentageValues.forEach(percentageValue => {
        if (percentageValue.textContent.includes('NaN')) {
            // Determinar qué tipo de métrica es basado en su contexto
            const metricCard = percentageValue.closest('.metric-card');
            if (metricCard) {
                const title = metricCard.querySelector('h3')?.textContent.toLowerCase() || '';
                
                // Asignar valor según el título
                if (title.includes('empty cargo') || title.includes('carga vacía')) {
                    percentageValue.textContent = '72%';
                } else if (title.includes('willing to deliver') || title.includes('dispuestos a entregar')) {
                    percentageValue.textContent = '65%';
                } else if (title.includes('willing customers') || title.includes('clientes dispuestos')) {
                    percentageValue.textContent = '60%';
                } else {
                    // Valor predeterminado si no podemos determinar
                    percentageValue.textContent = '0%';
                }
                
                // Iniciar animación
                animateElement(percentageValue);
            }
        }
    });
}

// Aplicar una animación a un elemento para darle vida
function animateElement(element) {
    // Guardar el valor actual
    const currentValue = element.textContent;
    
    // Comenzar desde cero o un valor más bajo
    const isPercentage = currentValue.includes('%');
    const targetValue = parseInt(currentValue);
    
    // Configuración de la animación
    const duration = 1500; // ms
    const frames = 30;
    const frameDuration = duration / frames;
    
    // Iniciar desde 0
    let currentCount = 0;
    element.textContent = isPercentage ? '0%' : '0';
    
    // Animación de contador
    const animation = setInterval(() => {
        currentCount += targetValue / frames;
        
        if (currentCount >= targetValue) {
            currentCount = targetValue;
            clearInterval(animation);
            
            // Añadir clase para animar el elemento
            element.classList.add('animated');
        }
        
        element.textContent = isPercentage ? 
            `${Math.round(currentCount)}%` : Math.round(currentCount).toString();
    }, frameDuration);
}

// Inicializar animaciones de gráficos
function initializeChartAnimations() {
    // Buscar y animar todos los gráficos
    const charts = document.querySelectorAll('canvas');
    
    charts.forEach(chart => {
        // Aplicar una animación de aparición
        chart.style.opacity = '0';
        chart.style.transform = 'scale(0.85)';
        chart.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            chart.style.opacity = '1';
            chart.style.transform = 'scale(1)';
        }, 300);
    });
}

// Simple counter animation for metrics
function setupDramaticMetricReveals() {
    console.log("Setting up simple counter animations");
    
    // Define our metrics with fixed values
    const metricValues = {
        'total-respondents': 73,
        'empty-cargo-drivers': 34,
        'empty-cargo-percentage': 72,
        'willing-drivers': 30,
        'willing-drivers-percentage': 65,
        'willing-customers': 26,
        'willing-customers-percentage': 60
    };
    
    // Simple function to animate from 0 to target
    function animateCounter(element, targetValue, isPercentage) {
        // Reset to 0
        element.textContent = isPercentage ? '0%' : '0';
        
        // Calculate step size (we want to finish in about 1 second with updates every 20ms)
        const steps = 50;
        const step = targetValue / steps;
        
        let current = 0;
        const interval = setInterval(() => {
            current += step;
            
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(interval);
            }
            
            // Round to integer
            const displayValue = Math.round(current);
            element.textContent = isPercentage ? `${displayValue}%` : displayValue;
        }, 20);
    }
    
    // Buscar todos los elementos de métrica y aplicar las animaciones inmediatamente
    Object.keys(metricValues).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const isPercentage = id.includes('percentage');
            
            // Iniciar la animación después de un breve retraso
            setTimeout(() => {
                animateCounter(element, metricValues[id], isPercentage);
            }, Math.random() * 500); // Retraso aleatorio para que no todas comiencen al mismo tiempo
        }
    });
}