window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.querySelectorAll('td:not([colspan="1"]) .schedule-item-name').forEach(item => {
            item.style.paddingRight = `${item.nextElementSibling.offsetWidth + 12}px`;
        })
    }, 2000);
})