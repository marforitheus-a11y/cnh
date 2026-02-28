const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let slideWidth = carousel.offsetWidth;
const threshold = 60;

/* Atualiza largura ao resize / rotação */
window.addEventListener('resize', () => {
    slideWidth = carousel.offsetWidth;
    setPositionByIndex(false);
});

/* Helpers */
function setPositionByIndex(animate = true) {
    if (animate) {
        track.style.transition = 'transform 0.3s ease';
    } else {
        track.style.transition = 'none';
    }

    currentTranslate = -index * slideWidth;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;

    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function clampIndex() {
    if (index < 0) index = 0;
    if (index > slides.length - 1) index = slides.length - 1;
}

/* POINTER EVENTS (touch + mouse) */
track.addEventListener('pointerdown', pointerDown);
track.addEventListener('pointermove', pointerMove);
track.addEventListener('pointerup', pointerUp);
track.addEventListener('pointercancel', pointerUp);
track.addEventListener('pointerleave', pointerUp);

function pointerDown(e) {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
}

function pointerMove(e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;

    track.style.transform = `translateX(${currentTranslate}px)`;
}

function pointerUp(e) {
    if (!isDragging) return;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -threshold) index++;
    if (movedBy > threshold) index--;

    clampIndex();
    setPositionByIndex(true);

    isDragging = false;
    track.releasePointerCapture(e.pointerId);
}

/* Inicialização */
setPositionByIndex(false);
