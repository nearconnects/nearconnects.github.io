// scroll-metrics.js
/**
 * NEAR - Never Empty Again on Return
 * Carrusel vertical full-screen con GSAP + ScrollTrigger
 */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const swipeSection = document.querySelector(".swipe-section");
  const panels = gsap.utils.toArray(".panel");
  const summary = document.querySelector(".insights-summary");

  // Estado inicial: primera slide visible y estática
  gsap.set(panels[0], { opacity: 1, y: 0, overwrite: "auto" });

  ScrollTrigger.create({
    trigger: swipeSection,
    start: "top top",
    // 🔧 Sólo (N-1) viewports = N slides
    end: () => "+=" + (panels.length - 1) * window.innerHeight,
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      duration: { min: 0.2, max: 0.3 },
      inertia: false,
      ease: "power2.out",
      fastScrollEnd: false, // desactiva saltos por scroll rápido
    },
    preventDefault: true,
    onUpdate(self) {
      // nada de animaciones si no has movido el scroll
      if (self.progress === 0) return;

      // paneles
      panels.forEach((panel, i) => {
        const lower = i / (panels.length - 1);
        const upper = (i + 1) / (panels.length - 1);
        if (self.progress >= lower && self.progress < upper) {
          gsap.to(panel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            overwrite: "auto",
          });
        } else {
          gsap.to(panel, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            overwrite: "auto",
          });
        }
      });

      // resumen al final
      if (self.progress === 1) {
        summary?.classList.add("visible");
      } else {
        summary?.classList.remove("visible");
      }
    },
  });
});
