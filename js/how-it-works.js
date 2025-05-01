
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for videos
    const lazyVideos = document.querySelectorAll('video.lazy');
    
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.classList.remove('lazy');
                observer.unobserve(video);
            }
        });
    });
    
    lazyVideos.forEach(video => videoObserver.observe(video));
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
});
