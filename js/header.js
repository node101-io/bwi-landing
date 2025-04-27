document.addEventListener('click', event => {
    if (event.target.closest('.header-menu-wrapper')) {
        document.querySelector('.header-responsive-menu-wrapper').classList.toggle('display-none');
        document.querySelector('.header-menu-wrapper').classList.toggle('header-menu-wrapper-toggled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('.scale-on-scroll');
    let ticking = false;
  
    function update() {
      const vpH = window.innerHeight;
      const vpCenter = vpH / 2;
  
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        const elemCenter = r.top + r.height / 2;
        const d = Math.abs(elemCenter - vpCenter);
        const D = vpCenter + r.height / 2;
        const t = Math.max(0, 1 - d / D);
        const minScale = 0.95;   // en küçük ölçek
        const maxScale = 1.0;   // en büyük ölçek
        const s = minScale + (maxScale - minScale) * t;
        el.style.transform = `scale(${s})`;
      });
  
      ticking = false;
    }
  
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
  
    document.querySelector('.all-wrapper').addEventListener('scroll', onScroll, { passive: true });
    document.querySelector('.all-wrapper').addEventListener('resize', update, { passive: true });
  
    // İlk durum için çağır
    update();
  });
  