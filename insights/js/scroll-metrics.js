/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation with GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const swipeSection = document.querySelector('.swipe-section');
  const panels = gsap.utils.toArray('.swipe-section .panel');
  const panelCount = panels.length;

  // Prepare panels 
  panels.forEach(p => gsap.set(p, { opacity: 1 }));

  // Create a tween that moves the entire container vertically
  gsap.to(swipeSection, {
    yPercent: -100 * (panelCount - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: swipeSection,
      start: 'top top',
      end: () => '+=' + (panelCount * window.innerHeight),
      pin: true,
      scrub: 1,
      // snap: 1 / (panelCount - 1), // Optional: uncomment for snap between panels
    }
  });
});