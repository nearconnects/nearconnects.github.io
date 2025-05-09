/**
 * NEAR - Never Empty Again on Return
 * Advanced Animation System for Insights Dashboard
 */

// Initialize the animation system
document.addEventListener('DOMContentLoaded', function() {
    // Setup Intersection Observer for scroll animations
    setupScrollAnimations();
    
    // Setup key metrics animations
    setupKeyMetricsAnimations();
    
    // Setup particle effects for visual impact
    setupParticleEffects();
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

// Special animation for metrics with a dramatic reveal
function setupDramaticMetricReveals() {
    console.log("Setting up dramatic metric reveals");
    const metrics = document.querySelectorAll('.metric-value, .metric-percentage');
    
    // We'll keep track of which metrics we're animating
    const animationsToRun = [];
    
    metrics.forEach(metric => {
        // Skip if showing Loading... message
        if (metric.textContent.includes('Loading')) return;
        
        // Get current text content for the final value
        const currentText = metric.textContent;
        const isPercentage = currentText.includes('%');
        
        // Extract number from current text
        let finalValueStr = currentText.replace(/[^0-9]/g, '');
        
        // Parse to number
        const finalValue = parseInt(finalValueStr || "0");
        if (isNaN(finalValue)) {
            console.error('Invalid number value:', finalValueStr, 'from text', currentText);
            return; // Skip if can't parse
        }
        
        console.log(`Setting up animation for ${metric.id}: final value = ${finalValue}`);
        
        // Reset to 0 to prepare for animation
        metric.textContent = isPercentage ? '0%' : '0';
        
        // Create dramatic number sequence
        let values = [];
        
        // Generate a sequence of random numbers that converge to final value
        for (let i = 0; i < 20; i++) {
            const randomFactor = Math.random() * 2 - 1; // Random between -1 and 1
            const distance = 1 - (i / 20); // Gets closer to 0 as i increases
            const variation = finalValue * distance * randomFactor;
            
            values.push(Math.max(0, Math.round(finalValue + variation)));
        }
        
        // Add the final value at the end
        values.push(finalValue);
        
        // Save the animation data for this metric
        animationsToRun.push({
            element: metric,
            sequence: values,
            isPercentage: isPercentage,
            finalValue: finalValue
        });
    });
    
    // Set up intersection observer to trigger the animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = entry.target;
                
                // Find this metric in our animations list
                const animation = animationsToRun.find(anim => anim.element === metric);
                if (!animation) return;
                
                console.log(`Starting animation for ${metric.id}`);
                
                // Start the animation
                let i = 0;
                const interval = setInterval(() => {
                    const value = animation.sequence[i];
                    metric.textContent = animation.isPercentage ? `${value}%` : value;
                    
                    i++;
                    if (i >= animation.sequence.length) {
                        clearInterval(interval);
                        
                        // Make sure the final value is set correctly
                        metric.textContent = animation.isPercentage ? `${animation.finalValue}%` : animation.finalValue;
                    }
                }, 50); // Show a new number every 50ms
                
                observer.unobserve(metric);
            }
        });
    }, {
        threshold: 0.1,  // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'  // Trigger before it's fully in view
    });
    
    metrics.forEach(metric => {
        observer.observe(metric);
    });
}