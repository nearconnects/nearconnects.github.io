/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation with GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP Carousel (scripts are already loaded in the HTML)
  initGSAPCarousel();
  
  function initGSAPCarousel() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, Observer);

    console.log("Initializing GSAP Carousel with ScrollTrigger and Observer");
    
    const swipeSection = document.querySelector('.swipe-section');
    const panels = document.querySelectorAll('.panel');
    const totalPanels = panels.length;
    
    console.log(`Found ${totalPanels} panels in the swipe section`);
    
    // Set initial state
    let currentIndex = 0;
    let isAnimating = false;
    
    // Setup initial panel states
    panels.forEach((panel, i) => {
      // All panels visible but with specific styles
      panel.style.visibility = 'visible';
      
      if (i === 0) {
        // First panel is visible
        gsap.set(panel, { 
          zIndex: 10, 
          opacity: 0,
          y: 0,
          yPercent: 0 
        });
      } else {
        // Other panels are below and hidden
        gsap.set(panel, { 
          zIndex: 1, 
          opacity: 0,
          yPercent: 100 
        });
      }
    });
    
    // Animate first panel in with a nice entrance
    gsap.to(panels[0], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.5,
      ease: "power2.out"
    });
    
    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: swipeSection,
      pin: true,
      start: "top top",
      end: "+=300%",
      pinSpacing: true,
      scrub: false,
      snap: false,
      anticipatePin: 1
    });
    
    // Observer for scroll direction
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,scroll",
      onChange: (self) => {
        // Only respond if not currently animating
        if (!isAnimating) {
          // Get scroll direction from deltaY
          const direction = self.deltaY > 0 ? 1 : -1;
          
          // Debug the scroll event
          console.log("Scroll detected, direction:", direction > 0 ? "down" : "up", "deltaY:", self.deltaY);
          
          // If scrolling down and not at the last panel
          if (direction > 0 && currentIndex < totalPanels - 1) {
            isAnimating = true;
            console.log("Moving to next panel:", currentIndex + 1);
            gotoPanel(currentIndex + 1);
          } 
          // If scrolling up and not at the first panel
          else if (direction < 0 && currentIndex > 0) {
            isAnimating = true;
            console.log("Moving to previous panel:", currentIndex - 1);
            gotoPanel(currentIndex - 1);
          } 
          // If at the last panel and scrolling down, disable observer to resume normal scroll
          else if (direction > 0 && currentIndex === totalPanels - 1) {
            console.log("Completing carousel, last panel reached");
            completeCarousel();
          }
        }
      },
      wheelSpeed: -1,
      dragMinimum: 5,
      lockAxis: true
    });
    
    // Function to navigate to a specific panel
    function gotoPanel(index) {
      // Validate index
      if (index < 0 || index >= totalPanels || index === currentIndex) {
        isAnimating = false;
        return;
      }
      
      console.log(`gotoPanel: from ${currentIndex} to ${index}`);
      
      const currentPanel = panels[currentIndex];
      const nextPanel = panels[index];
      
      // Direction of movement
      const movingDown = index > currentIndex;
      
      // Hide scroll indicator once user has started scrolling
      if (currentIndex === 0 && movingDown) {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              scrollIndicator.classList.add('hidden');
            }
          });
        }
      }
      
      // Ensure both panels are visible before animation
      currentPanel.style.visibility = 'visible';
      nextPanel.style.visibility = 'visible';
      
      // Make sure the new panel is ready to be shown (reset any ongoing animations)
      gsap.killTweensOf(currentPanel);
      gsap.killTweensOf(nextPanel);
      
      // Set initial positions
      gsap.set(currentPanel, { 
        zIndex: 5,
        autoAlpha: 1,
        y: 0,
        yPercent: 0
      });
      
      gsap.set(nextPanel, { 
        zIndex: 10,
        autoAlpha: 0,
        yPercent: movingDown ? 100 : -100 
      });
      
      // Create main animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          currentIndex = index;
          isAnimating = false;
          
          // Ensure proper z-index after animation
          panels.forEach((panel, i) => {
            panel.style.zIndex = i === index ? 10 : 1;
          });
          
          console.log("Animation complete, new currentIndex:", currentIndex);
        }
      });
      
      // Add animations to timeline
      tl.to(currentPanel, {
        yPercent: movingDown ? -100 : 100,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.inOut"
      })
      .to(nextPanel, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power2.inOut"
      }, "<"); // Start at the same time as previous animation
    }
    
    // Function to complete carousel and return to normal scrolling
    function completeCarousel() {
      // Unpin the section
      scrollTrigger.kill();
      
      // Disable observer
      observer.disable();
      
      // Make insights summary visible
      const insightsSummary = document.querySelector('.insights-summary');
      if (insightsSummary) {
        gsap.to(insightsSummary, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3
        });
      }
      
      // Add a class to the swipe section to handle clean-up
      swipeSection.classList.add('carousel-completed');
    }
  }
});