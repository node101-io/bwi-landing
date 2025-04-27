document.addEventListener("DOMContentLoaded", () => {
    const targetClassName = "fade-in-on-scroll";
    const visibleClassName = "is-visible";

    const targets = document.querySelectorAll(`.${targetClassName}`);

    if (!targets.length) {
        console.warn(`Animasyon için "${targetClassName}" class'ına sahip element bulunamadı.`);
        return;
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(visibleClassName);

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    targets.forEach((target) => {
        observer.observe(target);
    });
});
