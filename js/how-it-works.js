
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
 * Process section with horizontal card slider instead of 3D stack 
 * (Simplified to fix layout issues)
 */
function initProcessCardsAnimation() {
    // Convert existing steps to horizontal card slider
    convertProcessToCardSlider();
    
    // Get our process cards
    const cards = document.querySelectorAll('.process-card');
    const cardContainer = document.querySelector('.process-cards-container');
    
    if (!cards.length || !cardContainer) return;
    
    // Create a horizontal scroll animation
    gsap.to(cardContainer, {
        scrollTrigger: {
            trigger: '.process-section',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        },
        x: () => -(cardContainer.scrollWidth - window.innerWidth + 40),
        ease: 'none'
    });
    
    // Animate cards entering the viewport
    cards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add hover effects to cards
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Convert existing process steps to a horizontal card slider
 * (Simplified to fix display issues)
 */
function convertProcessToCardSlider() {
    const processSection = document.querySelector('.process-section .container');
    if (!processSection) return;
    
    const steps = document.querySelectorAll('.step');
    if (!steps.length) return;
    
    // Create card container with horizontal scroll
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'process-cards-container';
    
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
        
        // Add the card to the container
        cardsContainer.appendChild(card);
    });
    
    // Replace the original steps container with our new slider
    const processStepsElement = processSection.querySelector('.process-steps');
    if (processStepsElement) {
        processStepsElement.replaceWith(cardsContainer);
    }
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
    
    // Simplified video loading without animations to ensure visibility
    lazyVideos.forEach(video => {
        // Immediately load the video
        video.src = video.dataset.src;
        video.setAttribute('muted', true);
        video.load();
        
        // When loaded, play it if autoplay is desired
        video.addEventListener('loadeddata', () => {
            // Only autoplay if we want this behavior
            // video.play();
            video.classList.remove('lazy');
        }, { once: true });
    });
    
    // Set up interactive controls for videos
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.video-container');
            const video = videoContainer.querySelector('video');
            const icon = this.querySelector('i');
            
            // Ensure video has loaded
            if (!video.src && video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
            }
            
            if (video.paused) {
                // Try to play and handle any autoplay restrictions
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Video playback started successfully
                        icon.classList.remove('fa-play');
                        icon.classList.add('fa-pause');
                        videoContainer.classList.add('playing');
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.error("Play was prevented:", error);
                        // Try to play with user gesture by triggering play again
                        video.muted = true; // Mute may help with autoplay restrictions
                        video.play().then(() => {
                            icon.classList.remove('fa-play');
                            icon.classList.add('fa-pause');
                            videoContainer.classList.add('playing');
                        });
                    });
                }
                
                // Animate button
                gsap.to(this, {
                    scale: 0.9,
                    duration: 0.2,
                    ease: 'back.out'
                });
            } else {
                // Pause the video
                video.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
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
    
    // Simple hover effects without animations for overlay
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('mouseenter', function() {
            const button = this.querySelector('.play-button');
            gsap.to(button, {
                scale: 1.1, 
                duration: 0.2,
                ease: 'power1.out'
            });
        });
        
        container.addEventListener('mouseleave', function() {
            const button = this.querySelector('.play-button');
            const video = this.querySelector('video');
            
            // Scale down button only if video isn't playing
            if (video.paused) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power1.out'
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
