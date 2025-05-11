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

    const swipeSection = document.querySelector('.swipe-section');
    const panels = document.querySelectorAll('.panel');
    const totalPanels = panels.length;
    
    // Set initial state
    let currentIndex = 0;
    let isAnimating = false;
    
    // Make panels visible (they start with visibility:hidden in CSS)
    panels.forEach(panel => {
      panel.style.visibility = 'visible';
      panel.style.opacity = '0';
    });
    
    // Show first panel initially
    gsap.to(panels[0], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.3
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
      type: "wheel,touch",
      onChange: (self) => {
        // Only respond if not currently animating
        if (!isAnimating) {
          const direction = self.deltaY > 0 ? 1 : -1;
          
          // If scrolling down and not at the last panel
          if (direction > 0 && currentIndex < totalPanels - 1) {
            isAnimating = true;
            gotoPanel(currentIndex + 1);
          } 
          // If scrolling up and not at the first panel
          else if (direction < 0 && currentIndex > 0) {
            isAnimating = true;
            gotoPanel(currentIndex - 1);
          } 
          // If at the last panel and scrolling down, disable observer to resume normal scroll
          else if (direction > 0 && currentIndex === totalPanels - 1) {
            completeCarousel();
          }
        }
      },
      wheelSpeed: -1,
      dragMinimum: 10
    });
    
    // Function to navigate to a specific panel
    function gotoPanel(index) {
      if (index < 0 || index >= totalPanels || index === currentIndex) {
        isAnimating = false;
        return;
      }
      
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
      
      // Animate current panel out
      gsap.to(currentPanel, {
        yPercent: movingDown ? -100 : 100,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut"
      });
      
      // Position and animate next panel in
      gsap.fromTo(nextPanel, 
        { 
          yPercent: movingDown ? 100 : -100,
          opacity: 0 
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            currentIndex = index;
            isAnimating = false;
          }
        }
      );
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