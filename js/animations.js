/**
 * NEAR - Never Empty Again on Return
 * Enhanced Animations JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    initParallaxEffects();
    initEnhancedScrollAnimations();
    initIconAnimations();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Add observers for new sections
    document.querySelectorAll('.fields-content, .technology-content').forEach(element => {
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
    
    // Counter animation function with GSAP
    function startCounters(counters) {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimalPlaces = target.toString().includes('.') ? target.toString().split('.')[1].length : 0;
            
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: decimalPlaces === 0 ? 1 : 0.1 },
                onUpdate: function() {
                    counter.textContent = parseFloat(this.targets()[0].innerText).toFixed(decimalPlaces);
                }
            });
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

/**
 * Parallax effects for hero and sections
 */
function initParallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-background', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Stats cards parallax
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        gsap.to(card, {
            y: -20,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 20%',
                scrub: 1
            }
        });
    });

    // Benefit cards parallax
    document.querySelectorAll('.benefit-card').forEach((card, index) => {
        gsap.to(card, {
            y: -30,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 30%',
                scrub: 1
            }
        });
    });
}

/**
 * Enhanced scroll animations with stagger
 */
function initEnhancedScrollAnimations() {
    // Staggered stats cards animation
    gsap.to('.stat-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Solution cards with scale effect
    gsap.to('.solution-cards .card', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.4)',
        scrollTrigger: {
            trigger: '.solution-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Benefit cards staggered entrance
    gsap.to('.benefit-card', {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.benefits-container',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Metric cards with bounce
    gsap.to('.metric-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.metrics-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Icon animations
 */
function initIconAnimations() {
    // Floating animation for stat icons
    document.querySelectorAll('.stat-icon').forEach(icon => {
        gsap.to(icon, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: icon,
                start: 'top 85%',
                toggleActions: 'play pause resume pause'
            }
        });
    });

    // Rotation on scroll for card icons
    document.querySelectorAll('.card-icon').forEach(icon => {
        gsap.to(icon, {
            rotation: 360,
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                end: 'bottom 40%',
                scrub: 2
            }
        });
    });

    // Scale pulse for benefit numbers
    document.querySelectorAll('.benefit-number').forEach(number => {
        gsap.to(number, {
            scale: 1.1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: number,
                start: 'top 85%',
                toggleActions: 'play pause resume pause'
            }
        });
    });
}
