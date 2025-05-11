/**
 * NEAR - Never Empty Again on Return
 * Scroll Metrics Animation with GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  // Añadir un console.log para verificar la carga
  console.log("Inicializando carrusel vertical con GSAP");
  
  gsap.registerPlugin(ScrollTrigger);

  const swipeSection = document.querySelector('.swipe-section');
  const panels = gsap.utils.toArray('.panel');
  const totalPanels = panels.length;
  
  console.log(`Encontrados ${totalPanels} paneles en el carrusel`);
  
  let idx = 0, animando = false;

  // Configurar el primer panel como activo
  gsap.set(panels[0], { className: '+=active' });
  
  // Crear el ScrollTrigger con pin dinámico basado en el número de paneles
  const scrollTrigger = ScrollTrigger.create({
    trigger: swipeSection,
    pin: true,
    start: 'top top',
    end: '+=' + (totalPanels * window.innerHeight),
    anticipatePin: 1
  });
  
  // Observador de scroll dentro de la sección
  ScrollTrigger.observe({
    target: swipeSection,
    type: 'wheel,touch,pointer',
    preventDefault: true,     // bloquea el scroll nativo
    onUp: () => cambiarPanel(idx - 1),
    onDown: () => cambiarPanel(idx + 1),
    tolerance: 10
  });
  
  // Función para cambiar entre paneles
  function cambiarPanel(nuevo) {
    // Validación básica
    if (animando || nuevo < 0) return;
    
    // Si llegamos al final, desactivar ScrollTrigger y continuar con el scroll normal
    if (nuevo >= totalPanels) {
      console.log("Fin del carrusel - desactivando ScrollTrigger");
      ScrollTrigger.getAll().forEach(st => st.kill());
      
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
    
    // Quitar clase active del panel actual
    panels[idx].classList.remove('active');
    
    // Mover todo el contenedor
    gsap.to(swipeSection, {
      yPercent: -100 * nuevo,
      duration: 0.7,
      ease: 'power2.inOut',
      onStart: () => {
        // Agregar clase active al nuevo panel con un pequeño retraso
        setTimeout(() => {
          panels[nuevo].classList.add('active');
        }, 200);
        
        // Ocultar indicador de scroll después del primer movimiento
        if (idx === 0) {
          gsap.to('.scroll-indicator', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              document.querySelector('.scroll-indicator')?.classList.add('hidden');
            }
          });
        }
      },
      onComplete: () => {
        idx = nuevo;
        animando = false;
      }
    });
  }
  
  // Asegurarse de que el primer panel sea visible inicialmente
  setTimeout(() => {
    panels[0].classList.add('active');
  }, 300);
  
  // Ajustar ScrollTrigger cuando cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    ScrollTrigger.create({
      trigger: swipeSection,
      pin: true,
      start: 'top top',
      end: '+=' + (totalPanels * window.innerHeight),
      anticipatePin: 1
    });
  });
});