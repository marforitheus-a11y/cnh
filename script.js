const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

function updateCarousel() {
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

/* TOUCH (CELULAR) */
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
}, { passive: true });

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    track.style.transform =
        `translateX(calc(-${index * 100}% - ${diff}px))`;
}, { passive: true });

track.addEventListener('touchend', () => {
    if (!isDragging) return;

    const diff = startX - currentX;

    if (diff > 50 && index < dots.length - 1) index++;
    if (diff < -50 && index > 0) index--;

    updateCarousel();
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
    const diff = startX - currentX;

    track.style.transform =
        `translateX(calc(-${index * 100}% - ${diff}px))`;
});

track.addEventListener('mouseup', () => {
    if (!isDragging) return;

    const diff = startX - currentX;

    if (diff > 50 && index < dots.length - 1) index++;
    if (diff < -50 && index > 0) index--;

    updateCarousel();
    isDragging = false;
});

track.addEventListener('mouseleave', () => {
    if (isDragging) {
        updateCarousel();
        isDragging = false;
    }
});
