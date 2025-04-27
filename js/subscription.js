window.addEventListener('load', () => {
    if (!window.matchMedia('(orientation: portrait)').matches) {
        document.querySelector('.subscription-inner-wrapper').classList.add('subscription-inner-wrapper-shifted');
    }

    document.addEventListener('click', event => {
        if (event.target.closest('.subscription-button')) {
            document.querySelector('.subscription-inner-wrapper').classList.add('subscription-inner-wrapper-shifted');
        }

        if (!event.target.closest('.subscription-wrapper')) {
            document.querySelector('.subscription-inner-wrapper').classList.remove('subscription-inner-wrapper-shifted');
        }

        if (event.target.closest('.subscription-submit-button')) {
            fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({ email: document.querySelector('.subscription-email-input').value }),
            })
                .then(res => res.json())
                .then(res => {
                    // TODO
                    console.log(res);
                })
                .catch(console.error)
        }
    });
});