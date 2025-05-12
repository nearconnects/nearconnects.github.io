
/**
 * NEAR - Never Empty Again on Return
 * How It Works Interactive Experience
 * Enhanced with GSAP animations, ScrollTrigger, and 3D card stacks
 */

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all animations
    initHeroAnimation();
    initOverviewAnimation();
    initProcessCardsAnimation();
    initFeaturesAnimation();
    initIntegrationAnimation();
    setupLazyLoadedVideos();
    
    // Add scroll-based animations for metric counters
    initImpactMetricsAnimation();
});

/**
 * Hero section animation with particles and text reveal
 */
function initHeroAnimation() {
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
}

/**
 * Overview section animation with connected nodes
 */
function initOverviewAnimation() {
    const overviewTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.overview-section',
            start: 'top 80%',
            end: 'bottom 80%',
            toggleActions: 'play none none none'
        }
    });
    
    overviewTimeline
        .from('.overview-text', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.node', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.connection-line', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.inOut'
        }, '-=0.5');
}

/**
 * Process section with 3D card stack animations
 */
function initProcessCardsAnimation() {
    // Convert existing steps to 3D card stack
    convertProcessToCardStack();
    
    // Animate the 3D card stack
    const cards = document.querySelectorAll('.process-card');
    
    // Initial card positioning
    gsap.set(cards, {
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
    });
    
    // Set initial positions for stacked cards
    cards.forEach((card, index) => {
        const z = -index * 20;
        const y = index * 5;
        const rotation = index * -1;
        
        gsap.set(card, {
            zIndex: cards.length - index,
            z: z,
            y: y,
            rotationX: rotation,
            opacity: index === 0 ? 1 : 0.9 - (index * 0.15)
        });
    });
    
    // Create animation on scroll
    const processTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.process-stack',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
            pin: true,
            pinSpacing: true
        }
    });
    
    // Fan out cards when scrolling
    cards.forEach((card, index) => {
        processTimeline.to(card, {
            z: 0,
            y: index * 30, // Spread cards apart vertically
            rotationX: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, index * 0.1);
    });
    
    // Add hover effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Convert existing process steps to a 3D card stack
 */
function convertProcessToCardStack() {
    const processSection = document.querySelector('.process-section .container');
    const steps = document.querySelectorAll('.step');
    
    // Create the card stack container
    const cardStackContainer = document.createElement('div');
    cardStackContainer.className = 'process-stack-container';
    
    // Create the actual stack
    const cardStack = document.createElement('div');
    cardStack.className = 'process-stack';
    
    // Move each step into a card
    steps.forEach((step, index) => {
        // Create a new card element
        const card = document.createElement('div');
        card.className = 'process-card';
        card.setAttribute('data-step', index + 1);
        
        // Copy content from step into card
        card.innerHTML = step.innerHTML;
        
        // Add number indicator
        const stepIndicator = document.createElement('div');
        stepIndicator.className = 'step-indicator';
        stepIndicator.textContent = `Step ${index + 1}`;
        card.prepend(stepIndicator);
        
        // Add the card to the stack
        cardStack.appendChild(card);
    });
    
    // Replace the original steps container with our new stack
    cardStackContainer.appendChild(cardStack);
    processSection.querySelector('.process-steps').replaceWith(cardStackContainer);
}

/**
 * Feature cards animation using ScrollTrigger
 */
function initFeaturesAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    gsap.set(featureCards, { opacity: 0, y: 50 });
    
    featureCards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Add hover animation for feature cards
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                backgroundColor: 'rgba(10, 132, 255, 0.2)',
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                backgroundColor: 'rgba(10, 132, 255, 0.1)',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Enhanced lazy-loaded video setup with custom controls
 * Combines IntersectionObserver with GSAP for smoother transitions
 * and adds interactive play/pause controls
 */
function setupLazyLoadedVideos() {
    const lazyVideos = document.querySelectorAll('video.lazy');
    const playButtons = document.querySelectorAll('.play-button');
    
    // Video lazy loading with IntersectionObserver
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const caseContent = video.closest('.case-content');
                
                // First fade in the container
                gsap.to(caseContent, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // Then start loading the video
                        video.src = video.dataset.src;
                        video.load();
                        video.muted = true; // Ensure muted for autoplay
                        
                        // When video is loaded, animate it in
                        video.addEventListener('loadeddata', () => {
                            gsap.fromTo(video, 
                                { opacity: 0 },
                                { 
                                    opacity: 1, 
                                    duration: 0.8,
                                    ease: 'power2.inOut',
                                    onComplete: () => {
                                        video.play();
                                        
                                        // Animate the video overlay
                                        const overlay = video.closest('.video-container').querySelector('.video-overlay');
                                        gsap.to(overlay, {
                                            opacity: 1,
                                            duration: 0.3,
                                            delay: 0.5,
                                            ease: 'power1.out'
                                        });
                                        
                                        // Then fade it out after a brief delay
                                        gsap.to(overlay, {
                                            opacity: 0,
                                            duration: 0.8,
                                            delay: 2,
                                            ease: 'power1.inOut'
                                        });
                                    }
                                }
                            );
                        }, { once: true });
                        
                        video.classList.remove('lazy');
                        observer.unobserve(video);
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    
    // Initialize observer on all lazy videos
    lazyVideos.forEach(video => videoObserver.observe(video));
    
    // Set up interactive controls for videos
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.video-container');
            const video = videoContainer.querySelector('video');
            const icon = this.querySelector('i');
            
            if (video.paused) {
                // Play the video
                video.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Add a "playing" class to the container for additional styling
                videoContainer.classList.add('playing');
                
                // Animate button scale
                gsap.to(this, {
                    scale: 0.8,
                    duration: 0.2,
                    ease: 'back.out'
                });
            } else {
                // Pause the video
                video.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                
                // Remove the "playing" class
                videoContainer.classList.remove('playing');
                
                // Animate button scale
                gsap.to(this, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'back.out'
                });
            }
        });
    });
    
    // Add hover effect for video containers
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.video-overlay');
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        container.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.video-overlay');
            const video = this.querySelector('video');
            
            // Only fade out overlay if video is playing
            if (!video.paused) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.inOut'
                });
            }
        });
    });
}

/**
 * Integration section animation with case studies
 */
function initIntegrationAnimation() {
    const cases = document.querySelectorAll('.integration-case');
    
    gsap.set(cases, { opacity: 0, y: 50 });
    
    cases.forEach(caseItem => {
        gsap.to(caseItem, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: caseItem,
                start: 'top 80%',
                end: 'bottom 70%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

/**
 * Impact metrics animation with counters
 */
function initImpactMetricsAnimation() {
    const metricCards = document.querySelectorAll('.metric-card');
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.metrics-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    metricValues.forEach(valueElement => {
        const targetValue = parseInt(valueElement.getAttribute('data-value'));
        
        gsap.to(valueElement, {
            innerText: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: valueElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                valueElement.textContent = Math.floor(this.targets()[0].innerText).toLocaleString();
            }
        });
    });
}
