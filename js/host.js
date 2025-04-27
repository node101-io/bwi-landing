const BOXES = [
    { text: 'hello!', color: '#D4E9BF' },
    { text: "let's", color: '#D6B9FF' },
    { text: '<3', color: '#84FFE3' },
    { text: 'start now', color: '#FFD230' },
    { text: 'ready?', color: '#FF9DF4' },
    { text: 'okeyyy', color: '#36CFF6' },
    { text: ':)', color: '#FF9B51' },
    { text: 'hackathon', color: '#0F7' },
    { text: 'conference', color: '#CE1CC5' },
    { text: 'huh??', color: '#009E68' },
    { text: 'a hacker??', color: '#F3FF3F' },
    { text: "let's build", color: '#BD8DF8' },
    { text: 'cats', color: '#FF3C05' },
    { text: 'hack&build', color: '#FFD600' },
    { text: 'code', color: '#A034D5' },
    { text: 'future', color: '#ACFF49' }
];

window.addEventListener('load', () => {
    let lastX = null;
    let lastY = null;

    const wrapper = document.querySelector('.host-wrapper');
    wrapper.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;

        // 80px'den fazla uzaklaşınca yeni box oluştur
        if (
            lastX === null ||
            (x - lastX) * (x - lastX) + (y - lastY) * (y - lastY) >= 3000
        ) {
            lastX = x;
            lastY = y;

            // Rastgele bir text+color seç
            const { text, color } =
                BOXES[Math.floor(Math.random() * BOXES.length)];

            const box = document.createElement('div');
            box.className = 'host-trail-box';
            box.style.left = x - 40 + 'px';
            box.style.top = y - 15 + 'px';
            box.innerText = text;
            box.style.backgroundColor = color;

            const dot = document.createElement('div');
            box.appendChild(dot);

            document.body.appendChild(box);

            // 500ms sonra animasyon bitene kadar ekranda kalıp sonra sil
            setTimeout(() => box.remove(), 500);
        }
    });
});
