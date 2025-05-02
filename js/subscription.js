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

        const submitButton = document.querySelector('.subscription-submit-button');
        submitButton.setAttribute('disabled', '');

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
                if ((!res || res.error) && res.error !== 'duplicated_unique_field')
                    throw new Error(res.error);

                document.querySelector('.subscription-inner-wrapper input').setAttribute('disabled', '');

                const texts = document.querySelectorAll('.subscription-inner-wrapper p');
        
                texts[1].style.maxHeight = 'calc(var(--subscription-inner-wrapper-text-font-size) * 10)';
                texts[1].style.opacity = '1';
                texts[0].style.maxHeight = '0px';
                texts[0].style.opacity = '0';
        
                submitButton.lastChild.textContent = '📬 Stay Tuned';
                submitButton.setAttribute('disabled', '');
            })
            .catch(err => {
                console.error(err);
                submitButton.lastChild.textContent = 'Oops!';
                submitButton.classList.add('subscription-submit-button-error');
                setTimeout(() => {
                    submitButton.classList.remove('subscription-submit-button-error');
                    submitButton.lastChild.textContent = 'Submit';
                    submitButton.removeAttribute('disabled');
                }, 1000);
            });
    })
});