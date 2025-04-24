/**
 * NEAR - Never Empty Again on Return
 * Animations JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Add observers for new sections
    document.querySelectorAll('.fields-content, .technology-content, .metric-card').forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(element);
    });
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // For counter elements, start the counter animation
                if (entry.target.querySelector('.counter')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    startCounters(counters);
                }
                
                // For progress bars, animate them
                if (entry.target.querySelector('.progress-bar')) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    animateProgressBars(progressBars);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Counter animation function
    function startCounters(counters) {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            const step = target / (duration / 16); // 60fps -> 16ms per frame
            const decimalPlaces = target.toString().includes('.') ? target.toString().split('.')[1].length : 0;
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = current.toFixed(decimalPlaces);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Progress bar animation function
    function animateProgressBars(progressBars) {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, 200);
        });
    }
});
