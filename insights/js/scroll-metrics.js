/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation with GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Inicializando carrusel vertical con GSAP");
  
  gsap.registerPlugin(ScrollTrigger);

  const swipeSection = document.querySelector('.swipe-section');
  const panels = gsap.utils.toArray('.swipe-section .panel');
  const totalPanels = panels.length;
  
  console.log(`Encontrados ${totalPanels} paneles en el carrusel`);
  
  let idx = 0, animando = false;

  // Configurar los paneles inicialmente
  gsap.set(panels, { opacity: 0 });
  gsap.set(panels[0], { opacity: 1 });
  
  // Pin dinámico: exactamente totalPanels × altura de ventana
  const scrollTrigger = ScrollTrigger.create({
    trigger: swipeSection,
    pin: true,
    start: 'top top',
    end: '+=' + (totalPanels * window.innerHeight),
    anticipatePin: 1
  });
  
  // Observer integrado en ScrollTrigger (no Observer.create)
  const observer = ScrollTrigger.observe({
    target: swipeSection,
    type: 'wheel,touch,pointer',
    preventDefault: true,     // Bloquea el scroll nativo mientras estamos en la sección
    tolerance: 10,
    onUp: () => cambiarPanel(idx - 1),
    onDown: () => cambiarPanel(idx + 1)
  });
  
  // Función para cambiar entre paneles
  function cambiarPanel(nuevoIndex) {
    // Validaciones
    if (animando || nuevoIndex < 0) return;
    
    // Si llegamos al final, liberar ScrollTrigger y continuar scroll nativo
    if (nuevoIndex >= totalPanels) {
      console.log("Fin del carrusel - desactivando ScrollTrigger");
      observer.kill();
      scrollTrigger.kill();
      
      // Mostrar el resumen final
      gsap.to('.insights-summary', { 
        opacity: 1,
        y: 0, 
        duration: 0.5, 
        delay: 0.3 
      });
      
      return;
    }
    
    animando = true;
    
    // Ocultar indicador de scroll después del primer movimiento
    if (idx === 0 && nuevoIndex > 0) {
      gsap.to('.scroll-indicator', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.querySelector('.scroll-indicator')?.classList.add('hidden');
        }
      });
    }
    
    // Un solo tween que mueve todo el contenedor
    gsap.to(swipeSection, {
      yPercent: -100 * nuevoIndex,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete() {
        idx = nuevoIndex;
        animando = false;
      }
    });
  }
  
  // Ajustar ScrollTrigger cuando cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const newScrollTrigger = ScrollTrigger.create({
      trigger: swipeSection,
      pin: true,
      start: 'top top',
      end: '+=' + (totalPanels * window.innerHeight),
      anticipatePin: 1
    });
    
    // Recrear el observer también para mantener la consistencia
    const newObserver = ScrollTrigger.observe({
      target: swipeSection,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      tolerance: 10,
      onUp: () => cambiarPanel(idx - 1),
      onDown: () => cambiarPanel(idx + 1)
    });
  });
});