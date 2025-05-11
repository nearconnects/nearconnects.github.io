/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation
 * 
 * This script handles the scroll-based animation of metrics cards,
 * animating each card as it enters the viewport and creating a
 * horizontal summary of all cards once they've all been viewed.
 */

// Constants for metrics data
const METRICS_DATA = {
    'total-respondents': {
        icon: 'fas fa-users',
        title: 'Total Respondents',
        value: 73,
        description: 'Survey participants'
    },
    'empty-cargo': {
        icon: 'fas fa-truck',
        title: 'Drivers with Empty Cargo',
        value: 34,
        percentage: 72,
        description: 'Empty cargo space'
    },
    'willing-drivers': {
        icon: 'fas fa-check-circle',
        title: 'Drivers Willing to Deliver',
        value: 30,
        percentage: 65,
        description: 'Willing to participate'
    },
    'willing-customers': {
        icon: 'fas fa-thumbs-up',
        title: 'Very Willing Customers',
        value: 26,
        percentage: 60,
        description: 'Ready to use service'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const scrollInsights = document.getElementById('scroll-insights');
    const summaryHorizontal = document.getElementById('summary-horizontal');
    const slides = document.querySelectorAll('.slide');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const insightsSummary = document.querySelector('.insights-summary');
    
    // Initialize state
    let visibleSlides = new Set();
    let allSlidesVisible = false;
    let horizontalCardsCreated = false;
    
    // Create observer for slides
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slide = entry.target;
                const metricKey = slide.dataset.metric;
                
                // Mark as visible
                visibleSlides.add(metricKey);
                
                // Add visible class for animation
                slide.classList.add('visible');
                
                // Animate the number
                const valueElement = slide.querySelector('.metric-value');
                if (valueElement && !valueElement.classList.contains('animate-number')) {
                    animateCounter(valueElement, METRICS_DATA[metricKey].value);
                }
                
                // Animate percentage if exists
                const percentageElement = slide.querySelector('.metric-percentage');
                if (percentageElement && METRICS_DATA[metricKey].percentage) {
                    animateCounter(percentageElement, METRICS_DATA[metricKey].percentage, '%');
                }
                
                // Check if all slides are visible now
                if (visibleSlides.size === slides.length && !allSlidesVisible) {
                    allSlidesVisible = true;
                    createHorizontalSummary();
                }
            }
        });
    }, {
        threshold: 0.6, // Element must be 60% visible
        rootMargin: '-50px 0px'
    });
    
    // Observe each slide
    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Create horizontal summary cards
    function createHorizontalSummary() {
        // Avoid creating twice
        if (horizontalCardsCreated) return;
        horizontalCardsCreated = true;
        
        // Hide scroll indicator
        if (scrollIndicator) {
            scrollIndicator.classList.add('hidden');
        }
        
        // Create container for horizontal cards
        const cardsWrapper = document.createElement('div');
        cardsWrapper.className = 'horizontal-cards';
        
        // Create a card for each metric
        Object.entries(METRICS_DATA).forEach(([key, data]) => {
            const card = document.createElement('div');
            card.className = 'horizontal-card';
            card.dataset.metric = key;
            
            // Add icon
            const iconDiv = document.createElement('div');
            iconDiv.className = 'metric-icon';
            const icon = document.createElement('i');
            icon.className = data.icon;
            iconDiv.appendChild(icon);
            
            // Add value
            const valueDiv = document.createElement('div');
            valueDiv.className = 'metric-value';
            valueDiv.textContent = data.value;
            
            // Add percentage if exists
            let percentageDiv;
            if (data.percentage) {
                percentageDiv = document.createElement('div');
                percentageDiv.className = 'metric-percentage';
                percentageDiv.textContent = data.percentage + '%';
            }
            
            // Add title
            const titleEl = document.createElement('h4');
            titleEl.textContent = data.description || data.title;
            
            // Assemble card
            card.appendChild(iconDiv);
            card.appendChild(valueDiv);
            if (percentageDiv) card.appendChild(percentageDiv);
            card.appendChild(titleEl);
            
            // Add click event for navigation
            card.addEventListener('click', () => {
                // Find corresponding slide
                const targetSlide = document.querySelector(`.slide[data-metric="${key}"]`);
                if (targetSlide) {
                    // Add active class to card
                    document.querySelectorAll('.horizontal-card').forEach(c => {
                        c.classList.remove('active');
                    });
                    card.classList.add('active');
                    
                    // Scroll to slide
                    targetSlide.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            cardsWrapper.appendChild(card);
        });
        
        // Add to DOM
        summaryHorizontal.innerHTML = '';
        summaryHorizontal.appendChild(cardsWrapper);
        
        // Show the summary section
        setTimeout(() => {
            summaryHorizontal.classList.add('visible');
            
            // Show insight summary
            if (insightsSummary) {
                insightsSummary.classList.add('visible');
            }
        }, 300);
    }
    
    // Function to animate counter
    function animateCounter(element, targetValue, suffix = '') {
        if (!element || element.classList.contains('animate-number')) return;
        
        element.classList.add('animate-number');
        
        // Save start time
        const startTime = performance.now();
        const duration = 1500; // ms
        const startValue = 0;
        
        // Animation function
        function updateCounter(currentTime) {
            // Calculate elapsed time
            const elapsedTime = currentTime - startTime;
            
            // If animation is complete
            if (elapsedTime >= duration) {
                element.textContent = targetValue + suffix;
                return;
            }
            
            // Calculate progress (0 to 1)
            const progress = elapsedTime / duration;
            
            // Use easing function for smoother animation
            // Here using ease-out cubic: 1 - (1 - x)^3
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            // Calculate current value
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
            
            // Update element
            element.textContent = currentValue + suffix;
            
            // Request next frame
            requestAnimationFrame(updateCounter);
        }
        
        // Start animation
        requestAnimationFrame(updateCounter);
    }
    
    // Handle scroll indicator visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200 && scrollIndicator && !scrollIndicator.classList.contains('hidden')) {
            scrollIndicator.classList.add('hidden');
        } else if (window.scrollY <= 200 && scrollIndicator && scrollIndicator.classList.contains('hidden')) {
            scrollIndicator.classList.remove('hidden');
        }
    });
    
    // Show the first slide by default
    setTimeout(() => {
        if (slides.length > 0) {
            const firstSlide = slides[0];
            firstSlide.classList.add('visible');
            
            // Animate counter
            const metricKey = firstSlide.dataset.metric;
            const valueElement = firstSlide.querySelector('.metric-value');
            if (valueElement) {
                animateCounter(valueElement, METRICS_DATA[metricKey].value);
            }
            
            // Animate percentage if exists
            const percentageElement = firstSlide.querySelector('.metric-percentage');
            if (percentageElement && METRICS_DATA[metricKey].percentage) {
                animateCounter(percentageElement, METRICS_DATA[metricKey].percentage, '%');
            }
            
            // Mark as visible
            visibleSlides.add(metricKey);
        }
    }, 500);
});