const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let slideWidth = carousel.offsetWidth;

/* Atualiza largura ao rotacionar / resize */
window.addEventListener('resize', () => {
    slideWidth = carousel.offsetWidth;
    moveToSlide(index, false);
});

function moveToSlide(i, animate = true) {
    if (animate) {
        track.style.transition = 'transform 0.3s ease';
    } else {
        track.style.transition = 'none';
    }

    track.style.transform = `translateX(${-i * slideWidth}px)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[i].classList.add('active');
}

/* TOUCH EVENTS */
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    track.style.transform =
        `translateX(${-index * slideWidth + diff}px)`;
});

track.addEventListener('touchend', () => {
    if (!isDragging) return;

    const diff = currentX - startX;

    if (diff < -50 && index < slides.length - 1) index++;
    if (diff > 50 && index > 0) index--;

    moveToSlide(index);
    isDragging = false;
});

/* MOUSE (DESKTOP) */
track.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    track.style.transition = 'none';
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    currentX = e.clientX;
    const diff = currentX - startX;

    track.style.transform =
        `translateX(${-index * slideWidth + diff}px)`;
});

track.addEventListener('mouseup', () => {
    if (!isDragging) return;

    const diff = currentX - startX;

    if (diff < -50 && index < slides.length - 1) index++;
    if (diff > 50 && index > 0) index--;

    moveToSlide(index);
    isDragging = false;
});

track.addEventListener('mouseleave', () => {
    if (isDragging) {
        moveToSlide(index);
        isDragging = false;
    }
});
