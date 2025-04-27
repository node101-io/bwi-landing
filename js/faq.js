document.addEventListener('click', event => {
    if (event.target.closest('.faq-each-question-top-wrapper')) {
        const target = event.target.closest('.faq-each-question-wrapper');
        const isOpen = target.classList.contains('faq-each-question-wrapper-open');

        document.querySelectorAll('.faq-each-question-wrapper-open').forEach(item => {
            item.classList.remove('faq-each-question-wrapper-open')
        });

        if (!isOpen)
            target.classList.toggle('faq-each-question-wrapper-open');
    }
});
