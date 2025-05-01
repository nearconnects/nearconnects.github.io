/**
 * NEAR - Never Empty Again on Return
 * Testimonial Slider JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = testimonialSlider.querySelectorAll('.dot');
        const prevBtn = testimonialSlider.querySelector('.prev-btn');
        const nextBtn = testimonialSlider.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Initialize slider
        function initSlider() {
            if (slides.length === 0) return;
            
            // Show first slide
            showSlide(currentSlide);
            
            // Set up event listeners
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                });
            }
            
            // Add click events to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Set up keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });
            
            // Set up swipe gestures
            let touchStartX = 0;
            let touchEndX = 0;
            
            testimonialSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, false);
            
            testimonialSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swiped left
                    nextSlide();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swiped right
                    prevSlide();
                }
            }
            
            // Auto-advance slides every 8 seconds
            let slideInterval = setInterval(() => {
                nextSlide();
            }, 8000);
            
            // Pause auto-advance on hover or touch
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 8000);
            });
            
            testimonialSlider.addEventListener('touchstart', () => {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('touchend', () => {
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 8000);
            });
        }
        
        // Show a specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            
            // Deactivate all dots
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Go to previous slide
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = totalSlides - 1;
            }
            showSlide(newIndex);
        }
        
        // Go to next slide
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= totalSlides) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        // Initialize slider
        initSlider();
    }
});
