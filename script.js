const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-track img');

let slideWidth = carousel.offsetWidth;

/* Atualiza largura no resize */
window.addEventListener('resize', () => {
    slideWidth = carousel.offsetWidth;
});

/* =========================
   ATUALIZA DOTS AO SCROLL
========================= */
carousel.addEventListener('scroll', () => {
    const index = Math.round(carousel.scrollLeft / slideWidth);

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
});

/* =========================
   CLIQUE NOS DOTS
========================= */
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        carousel.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });
    });
});
