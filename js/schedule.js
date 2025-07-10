window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.querySelectorAll('td:not([colspan="1"]) .schedule-item-name').forEach(item => {
            item.style.paddingRight = `${item.nextElementSibling.offsetWidth + 12 + (item.parentElement.parentElement.href ? 26 : 0)}px`;
        })
    }, 2000);

    const stickyHeadWrapper = document.querySelector('.schedule-sticky-head-wrapper');

    // document.querySelector('.schedule-tables-wrapper').addEventListener('scroll', event => {
    //     stickyHeadWrapper.scrollLeft = event.target.scrollLeft;
    // });

    new ScrollMirror(document.querySelectorAll('.schedule-tables-wrapper, .schedule-sticky-head-wrapper'));


    const theadMock = document.querySelector('.schedule-tables-mock-head-for-observer');
    const tbodyMock = document.querySelector('.schedule-tables-mock-body-for-observer');

    let isHeadMockVisible = false;
    let isBodyMockVisible = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target === theadMock)
                isHeadMockVisible = entry.isIntersecting;
            else if (entry.target === tbodyMock)
                isBodyMockVisible = entry.isIntersecting;
        });

        stickyHeadWrapper.style.opacity = isHeadMockVisible || !isBodyMockVisible ? 0 : 1;
    }, {
        root: document.querySelector('.all-wrapper'),
        threshold: 0
    });

    observer.observe(theadMock);
    observer.observe(tbodyMock);
});
