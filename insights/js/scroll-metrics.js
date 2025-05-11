/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation
 * 
 * This script handles the scroll-based animation of metrics cards,
 * dynamically building the content for each fullscreen card and
 * creating a horizontal summary of all cards once they've all been viewed.
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.fullscreen-card');
  const summary = document.getElementById('horizontal-group');
  let shownCount = 0;

  // Add content to each fullscreen card
  slides.forEach(slide => {
    const title = slide.dataset.title;
    const value = slide.dataset.value;
    const percent = slide.dataset.percent || '';
    const desc = slide.dataset.desc;
    const iconHTML = slide.innerHTML;
    
    // Replace contents with structured data
    slide.innerHTML = `
      ${iconHTML}
      <h3>${title}</h3>
      <p class="value">${value}</p>
      ${percent ? `<p class="percent">${percent}</p>` : ''}
      <p class="description">${desc}</p>
    `;
  });

  // IntersectionObserver simple
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slide = entry.target;
        if (!slide.classList.contains('visible')) {
          slide.classList.add('visible');
          shownCount++;

          // Cuando hemos mostrado la última slide...
          if (shownCount === slides.length) {
            setTimeout(buildHorizontal, 500);
          }
        }
      }
    });
  }, { threshold: 0.6 }); // Element must be 60% visible

  // Observe each slide
  slides.forEach(s => io.observe(s));

  // Build horizontal summary
  function buildHorizontal() {
    // Avoid creating twice
    if (summary.classList.contains('show')) return;
    
    // Rellenamos el contenedor y lo mostramos
    summary.innerHTML = '';
    slides.forEach(slide => {
      const title = slide.dataset.title;
      const val = slide.dataset.value;
      const pct = slide.dataset.percent || '';
      const desc = slide.dataset.desc;
      const iconHTML = slide.querySelector('i').outerHTML;

      summary.innerHTML += `
        <div class="card">
          ${iconHTML}
          <h4>${title}</h4>
          <strong>${val}</strong>
          ${pct ? `<p style="color: #28a745;">${pct}</p>` : ''}
          <p style="font-size: .9rem; color: #555;">${desc}</p>
        </div>`;
    });

    summary.classList.remove('hidden');
    summary.classList.add('show');
    
    // Hide scroll indicator if exists
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.classList.add('hidden');
    }
    
    // Show insights summary if exists
    const insightsSummary = document.querySelector('.insights-summary');
    if (insightsSummary) {
      insightsSummary.classList.add('visible');
    }
  }
  
  // Add scrolling behavior from cards to slides
  summary.addEventListener('click', (e) => {
    // Find the clicked card or its parent
    const card = e.target.closest('.card');
    if (!card) return;
    
    // Find index of the card
    const cards = summary.querySelectorAll('.card');
    const index = Array.from(cards).indexOf(card);
    
    // Scroll to corresponding slide
    if (index >= 0 && index < slides.length) {
      slides[index].scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Show the first slide by default (with slight delay)
  setTimeout(() => {
    if (slides.length > 0) {
      slides[0].classList.add('visible');
      shownCount = 1;
    }
  }, 500);
});