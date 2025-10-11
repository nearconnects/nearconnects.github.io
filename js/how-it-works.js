/**
 * NEAR - How It Works
 * Modern scroll-based animations with GSAP
 */

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initHeroAnimations();
    initParallaxBackground();
    initJourneyAnimations();
    initFeaturesAnimations();
    initStatsAnimations();
    initCTAAnimations();
});

/**
 * Hero section animations
 */
function initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
        .to(".hero-title", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3
        })
        .to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 1,
        }, "-=0.6")
        .to(".scroll-indicator", {
            opacity: 1,
            duration: 0.8,
        }, "-=0.4");
}

/**
 * Parallax background effect
 */
function initParallaxBackground() {
    gsap.to(".hero-parallax-bg", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
            trigger: ".hiw-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });
}

/**
 * Journey timeline animations
 */
function initJourneyAnimations() {
    // Animate section heading
    gsap.to(".journey-section .section-heading", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".journey-section",
            start: "top 80%",
        }
    });

    gsap.to(".journey-section .section-subheading", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: ".journey-section",
            start: "top 80%",
        }
    });

    // Animate each timeline step
    const steps = document.querySelectorAll(".timeline-step");

    steps.forEach((step, index) => {
        const isEven = index % 2 === 1;

        gsap.to(step, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
            }
        });

        // Icon rotation on scroll
        gsap.to(step.querySelector(".step-icon-wrapper"), {
            rotation: 360,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
            }
        });

        // Parallax effect for step content
        gsap.to(step.querySelector(".step-content"), {
            y: -30,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            }
        });

        // Hover effect
        step.addEventListener("mouseenter", () => {
            gsap.to(step.querySelector(".step-icon-wrapper"), {
                scale: 1.15,
                backgroundColor: "rgba(10, 132, 255, 0.2)",
                duration: 0.3,
            });
        });

        step.addEventListener("mouseleave", () => {
            gsap.to(step.querySelector(".step-icon-wrapper"), {
                scale: 1,
                backgroundColor: "rgba(10, 132, 255, 0.1)",
                duration: 0.3,
            });
        });
    });
}

/**
 * Features showcase animations
 */
function initFeaturesAnimations() {
    // Animate section heading
    gsap.to(".features-showcase .section-heading", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".features-showcase",
            start: "top 80%",
        }
    });

    gsap.to(".features-showcase .section-subheading", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: ".features-showcase",
            start: "top 80%",
        }
    });

    // Staggered animation for feature items
    const features = document.querySelectorAll(".feature-item");

    features.forEach((feature, index) => {
        gsap.to(feature, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: feature,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            delay: index * 0.1
        });

        // Parallax icon movement
        gsap.to(feature.querySelector(".feature-icon"), {
            y: -15,
            scrollTrigger: {
                trigger: feature,
                start: "top 90%",
                end: "bottom 30%",
                scrub: 1,
            }
        });
    });
}

/**
 * Stats counter animations
 */
function initStatsAnimations() {
    // Animate section heading
    gsap.to(".impact-stats .section-heading", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".impact-stats",
            start: "top 80%",
        }
    });

    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card, index) => {
        // Card entrance animation
        gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            delay: index * 0.15
        });

        // Counter animation
        const valueElement = card.querySelector(".stat-value");
        const targetValue = parseInt(valueElement.getAttribute("data-count"));

        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => animateCounter(valueElement, targetValue),
        });
    });
}

/**
 * Counter animation helper
 */
function animateCounter(element, target) {
    gsap.to(element, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function () {
            element.textContent = Math.floor(this.targets()[0].innerText).toLocaleString();
        }
    });
}

/**
 * CTA section animations
 */
function initCTAAnimations() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 75%",
        }
    });

    timeline
        .to(".cta-content h2", {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
        .to(".cta-content p", {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, "-=0.4")
        .to(".cta-buttons-wrapper", {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, "-=0.4");
}