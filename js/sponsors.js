document.addEventListener("DOMContentLoaded", function () {
    const scrollers = document.querySelectorAll(".landing-sponsors-wrapper");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        addAnimation();

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".landing-sponsors-inner-wrapper");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }
});
