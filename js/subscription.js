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
    });

    document.addEventListener('submit', event => {
        event.preventDefault();

        fetch("https://node101.io/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.querySelector('.subscription-email-input').value,
                type: 'buildersweekistanbul'
            }),
        })
            .then(res => res.json())
            .then(res => {
                // TODO: update ui
                if (!res || !('data' in res) || res.error) {
                    console.log('failed');
                    return;
                }

                console.log('success', res.data)
            })
            .catch(err => {
                console.error('failed', err)
            });
    })
});