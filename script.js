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

/* =========================
   FUNÇÕES CENTRAIS
========================= */

function setPositionByIndex(animate = true) {
    track.style.transition = animate ? 'transform 0.3s ease' : 'none';

    currentTranslate = -index * slideWidth;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;

    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function clampIndex() {
    index = Math.max(0, Math.min(index, slides.length - 1));
}

/* =========================
   SWIPE (POINTER EVENTS)
========================= */

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

    const diff = e.clientX - startX;
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

/* =========================
   DOTS (CLIQUE)
========================= */

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        setPositionByIndex(true);
    });
});

/* =========================
   INIT
========================= */

setPositionByIndex(false);
