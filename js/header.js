document.addEventListener('click', event => {
    if (event.target.closest('.header-menu-wrapper')) {
        document.querySelector('.header-responsive-menu-wrapper').classList.toggle('display-none');
        document.querySelector('.header-menu-wrapper').classList.toggle('header-menu-wrapper-toggled');
    }
});
