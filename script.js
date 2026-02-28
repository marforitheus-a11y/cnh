const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let dragging = false;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    dragging = true;
});

track.addEventListener('touchend', e => {
    if (!dragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && index < 3) index++;
    if (diff < -50 && index > 0) index--;

    updateCarousel();
    dragging = false;
});

track.addEventListener('mousedown', e => {
    startX = e.clientX;
    dragging = true;
});

track.addEventListener('mouseup', e => {
    if (!dragging) return;
    const diff = startX - e.clientX;

    if (diff > 50 && index < 3) index++;
    if (diff < -50 && index > 0) index--;

    updateCarousel();
    dragging = false;
});