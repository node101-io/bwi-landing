document.addEventListener('DOMContentLoaded', () => {
    const minScale = 0.95;
    const maxScale = 1.0;
    const elementsToScaleOnScroll = document.querySelectorAll('.scale-on-scroll');

    let ticking = false;

    function update() {
        const vpCenter = window.innerHeight / 2;

        elementsToScaleOnScroll.forEach(element => {
            const elementSizes = element.getBoundingClientRect();
            element.style.transform = `scale(${minScale + (maxScale - minScale) * Math.max(0, 1 - Math.abs((elementSizes.top + elementSizes.height / 2) - vpCenter) / (vpCenter + elementSizes.height / 2))})`;
        });

        ticking = false;
    }

    document.querySelector('.all-wrapper').addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    document.querySelector('.all-wrapper').addEventListener('resize', update, { passive: true });

    update();
});
