document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(`.fade-in-on-scroll`);
    if (!targets.length) return;
 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });

    targets.forEach((target) => observer.observe(target));
});
