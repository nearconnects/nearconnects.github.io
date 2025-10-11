
/**
 * NEAR - Team Page Animations
 * Modern scroll-based animations with GSAP
 */

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initHeroAnimations();
    initParallaxBackground();
    initTeamIntroAnimations();
    initTeamMemberAnimations();
    initJoinSectionAnimations();
});

/**
 * Hero section animations
 */
function initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
        .to(".hero-content h1", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3
        })
        .to(".hero-content p", {
            opacity: 1,
            y: 0,
            duration: 1,
        }, "-=0.6");
}

/**
 * Parallax background effect
 */
function initParallaxBackground() {
    gsap.to(".team-hero .hero-background", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
            trigger: ".team-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });
}

/**
 * Team intro section animations
 */
function initTeamIntroAnimations() {
    gsap.to(".team-intro h2", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".team-intro",
            start: "top 80%",
        }
    });

    gsap.to(".team-intro p", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: ".team-intro",
            start: "top 80%",
        }
    });
}

/**
 * Team member cards animations
 */
function initTeamMemberAnimations() {
    const teamMembers = document.querySelectorAll(".team-member");

    teamMembers.forEach((member, index) => {
        // Card entrance with stagger
        gsap.to(member, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: member,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            delay: index * 0.15
        });

        // Parallax effect for member image
        gsap.to(member.querySelector(".member-image"), {
            y: -30,
            scrollTrigger: {
                trigger: member,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
            }
        });

        // Icon scale animation on scroll
        gsap.to(member.querySelector(".image-placeholder i"), {
            scale: 1.2,
            rotation: 15,
            scrollTrigger: {
                trigger: member,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
            }
        });

        // Member info slide up
        gsap.to(member.querySelector(".member-info"), {
            y: -10,
            scrollTrigger: {
                trigger: member,
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1,
            }
        });

        // Enhanced hover animations
        member.addEventListener("mouseenter", () => {
            gsap.to(member.querySelector(".image-placeholder i"), {
                scale: 1.3,
                rotation: 20,
                color: "rgba(10, 132, 255, 0.6)",
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(member.querySelector(".member-overlay"), {
                opacity: 1,
                duration: 0.3
            });
        });

        member.addEventListener("mouseleave", () => {
            gsap.to(member.querySelector(".image-placeholder i"), {
                scale: 1,
                rotation: 0,
                color: "rgba(10, 132, 255, 0.3)",
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(member.querySelector(".member-overlay"), {
                opacity: 0,
                duration: 0.3
            });
        });
    });

    // Social links stagger animation
    document.querySelectorAll(".social-links").forEach(socialLinks => {
        const links = socialLinks.querySelectorAll("a");
        
        socialLinks.parentElement.parentElement.addEventListener("mouseenter", () => {
            gsap.to(links, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
                ease: "back.out(1.4)"
            });
        });
    });
}

/**
 * Join section animations
 */
function initJoinSectionAnimations() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".join-section",
            start: "top 75%",
        }
    });

    timeline
        .to(".join-content h2", {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
        .to(".join-content p", {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, "-=0.4")
        .to(".join-content .btn", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)"
        }, "-=0.4");
}
