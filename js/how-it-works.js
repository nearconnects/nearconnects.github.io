
/**
 * NEAR - Never Empty Again on Return
 * How It Works Interactive Experience
 * Enhanced with GSAP animations, ScrollTrigger, parallax, and pinned sections
 */

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initParallaxBackground();
    initHeroAnimation();
    initOverviewAnimation();
    initProcessCardsAnimation();
    initFeaturesAnimation();
    initIntegrationAnimation();
    setupLazyLoadedVideos();
    initImpactMetricsAnimation();
});

/**
 * Parallax background animation
 */
function initParallaxBackground() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector(".how-it-works-hero:before");
    
    gsap.to(".how-it-works-hero", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".how-it-works-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });

    // Parallax for section backgrounds
    const sections = document.querySelectorAll(".overview-section, .features-section, .integration-section");
    sections.forEach(section => {
        const background = section.querySelector(":before") || section;
        
        gsap.to(section, {
            backgroundPositionY: "30%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
            }
        });
    });
}

/**
 * Hero section animation with dramatic text reveal
 */
function initHeroAnimation() {
    const heroTimeline = gsap.timeline();

    // Split text animation effect
    heroTimeline
        .from(".hero-content h1", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            scale: 0.8,
        })
        .from(
            ".hero-content p",
            {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.8",
        );
}

/**
 * Overview section with pinned animation
 */
function initOverviewAnimation() {
    const overviewSection = document.querySelector(".overview-section");
    
    if (!overviewSection) return;

    // Pin the overview section while animating
    ScrollTrigger.create({
        trigger: overviewSection,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
    });

    const overviewTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: overviewSection,
            start: "top 80%",
            end: "bottom 80%",
            toggleActions: "play none none none",
        },
    });

    overviewTimeline
        .from(".overview-text", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        .from(
            ".node",
            {
                scale: 0,
                opacity: 0,
                rotation: 180,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(2)",
            },
            "-=0.6",
        )
        .from(
            ".connection-line",
            {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                stagger: 0.2,
                ease: "power2.inOut",
            },
            "-=0.7",
        );
}

/**
 * Process section with enhanced stacking cards and parallax
 */
function initProcessCardsAnimation() {
    // Convert existing steps to stacking cards
    convertProcessToStackingCards();

    const cards = gsap.utils.toArray(".process-card");

    if (!cards.length) return;

    const featuresSection = document.querySelector(".features-section");

    cards.forEach((card, index) => {
        // Parallax scaling effect as cards scroll
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: () => "top bottom-=100",
                end: () => "top top+=40",
                scrub: 1.5,
                invalidateOnRefresh: true,
            },
            ease: "power2.out",
            scale: () => 1 - (cards.length - index - 1) * 0.03,
            opacity: 1,
        });

        // Pin each card with smooth transition
        ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            id: `pin-${index}`,
            end: () => `+=${window.innerHeight * 0.25}`,
            endTrigger: featuresSection,
            invalidateOnRefresh: true,
        });

        // Add parallax movement to card content
        const stepIcon = card.querySelector('.step-icon');
        if (stepIcon) {
            gsap.to(stepIcon, {
                y: -20,
                scrollTrigger: {
                    trigger: card,
                    start: "top center",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }

        // Enhanced hover effects
        card.addEventListener("mouseenter", () => {
            if (!ScrollTrigger.isInViewport(card)) return;

            gsap.to(card, {
                y: -8,
                boxShadow: "0 20px 40px rgba(10, 132, 255, 0.3)",
                duration: 0.4,
                ease: "power2.out",
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                duration: 0.4,
                ease: "power2.out",
            });
        });
    });
}

/**
 * Convert existing process steps to stacking cards
 */
function convertProcessToStackingCards() {
    const processSection = document.querySelector(
        ".process-section .container",
    );
    if (!processSection) return;

    const steps = document.querySelectorAll(".step");
    if (!steps.length) return;

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-container";

    const cardsStack = document.createElement("div");
    cardsStack.className = "cards-stack";
    cardsContainer.appendChild(cardsStack);

    steps.forEach((step, index) => {
        const card = document.createElement("div");
        card.className = "process-card";
        card.setAttribute("data-step", index + 1);

        if (index === 0) {
            card.classList.add("active");
        }

        card.style.top = `${index * 5}px`;
        card.innerHTML = step.innerHTML;

        const stepIndicator = document.createElement("div");
        stepIndicator.className = "step-indicator";
        stepIndicator.textContent = `Step ${index + 1}`;
        card.prepend(stepIndicator);

        cardsStack.appendChild(card);
    });

    const spacer = document.createElement("div");
    spacer.className = "cards-spacer";
    spacer.style.height = `${steps.length * 10}vh`;
    cardsContainer.appendChild(spacer);

    const processStepsElement = processSection.querySelector(".process-steps");
    if (processStepsElement) {
        processStepsElement.replaceWith(cardsContainer);
    }
}

/**
 * Feature cards with staggered parallax reveal
 */
function initFeaturesAnimation() {
    const featureCards = document.querySelectorAll(".feature-card");

    gsap.set(featureCards, { opacity: 0, y: 80, rotationX: -15 });

    featureCards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
            },
        });

        // Parallax icon movement
        const icon = card.querySelector('i');
        if (icon) {
            gsap.to(icon, {
                y: -15,
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }

        // Enhanced hover with 3D tilt
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                backgroundColor: "rgba(10, 132, 255, 0.25)",
                y: -15,
                rotationY: 5,
                duration: 0.4,
                ease: "power2.out",
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                backgroundColor: "rgba(10, 132, 255, 0.1)",
                y: 0,
                rotationY: 0,
                duration: 0.4,
                ease: "power2.out",
            });
        });
    });
}

/**
 * Enhanced lazy-loaded video setup with smooth reveals
 */
function setupLazyLoadedVideos() {
    const lazyVideos = document.querySelectorAll("video.lazy");
    const playButtons = document.querySelectorAll(".play-button");

    lazyVideos.forEach((video) => {
        video.src = video.dataset.src;
        video.setAttribute("muted", true);
        video.load();

        video.addEventListener(
            "loadeddata",
            () => {
                video.classList.remove("lazy");
                
                // Animate video reveal
                gsap.from(video, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
            { once: true },
        );
    });

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const videoContainer = this.closest(".video-container");
            const video = videoContainer.querySelector("video");
            const icon = this.querySelector("i");

            if (!video.src && video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
            }

            if (video.paused) {
                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            icon.classList.remove("fa-play");
                            icon.classList.add("fa-pause");
                            videoContainer.classList.add("playing");
                        })
                        .catch((error) => {
                            console.error("Play was prevented:", error);
                            video.muted = true;
                            video.play().then(() => {
                                icon.classList.remove("fa-play");
                                icon.classList.add("fa-pause");
                                videoContainer.classList.add("playing");
                            });
                        });
                }

                gsap.to(this, {
                    scale: 0.85,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
            } else {
                video.pause();
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
                videoContainer.classList.remove("playing");

                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
            }
        });
    });

    document.querySelectorAll(".video-container").forEach((container) => {
        container.addEventListener("mouseenter", function () {
            const button = this.querySelector(".play-button");
            gsap.to(button, {
                scale: 1.15,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out",
            });
        });

        container.addEventListener("mouseleave", function () {
            const button = this.querySelector(".play-button");
            const video = this.querySelector("video");

            if (video.paused) {
                gsap.to(button, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        });
    });
}

/**
 * Integration section with horizontal scroll effect
 */
function initIntegrationAnimation() {
    const cases = document.querySelectorAll(".integration-case");

    gsap.set(cases, { opacity: 0, x: 100, rotationY: -20 });

    cases.forEach((caseItem, index) => {
        gsap.to(caseItem, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: caseItem,
                start: "top 85%",
                end: "bottom 70%",
                toggleActions: "play none none reverse",
            },
        });

        // Parallax effect for case content
        const caseContent = caseItem.querySelector('.case-content');
        if (caseContent) {
            gsap.to(caseContent, {
                y: -30,
                scrollTrigger: {
                    trigger: caseItem,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }
    });
}

/**
 * Impact metrics with enhanced counter animation
 */
function initImpactMetricsAnimation() {
    const metricCards = document.querySelectorAll(".metric-card");
    const metricValues = document.querySelectorAll(".metric-value");

    metricCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotation: -5,
            duration: 1,
            delay: index * 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
                trigger: ".metrics-container",
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });

    metricValues.forEach((valueElement) => {
        const targetValue = parseInt(valueElement.getAttribute("data-value"));

        gsap.to(valueElement, {
            innerText: targetValue,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: valueElement,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            onUpdate: function () {
                valueElement.textContent = Math.floor(
                    this.targets()[0].innerText,
                ).toLocaleString();
            },
        });
    });
}
