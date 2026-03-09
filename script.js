const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-track img');

let slideWidth = carousel.offsetWidth;

/* Atualiza largura no resize */
window.addEventListener('resize', () => {
    slideWidth = carousel.offsetWidth;
});

/* =========================
   ATUALIZA DOTS AO SCROLL (CORRIGIDO)
========================= */
carousel.addEventListener('scroll', () => {
    // Pega a largura exata no momento do scroll para evitar bugar no primeiro carregamento
    const currentWidth = carousel.clientWidth;
    if (currentWidth === 0) return;

    const index = Math.round(carousel.scrollLeft / currentWidth);

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
});

/* =========================
   CLIQUE NOS DOTS
========================= */
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const currentWidth = carousel.clientWidth;
        carousel.scrollTo({
            left: currentWidth * index,
            behavior: 'smooth'
        });
    });
});

/* =========================
   ATUALIZAR DATA E HORA
========================= */
function atualizarDataHoraAcesso() {
    const spanData = document.getElementById('data-atualizacao');
    
    if (!spanData) return;

    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); 
    const ano = agora.getFullYear();

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    const dataFormatada = `Atualizado em: ${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
    
    spanData.textContent = dataFormatada;
}

document.addEventListener('DOMContentLoaded', atualizarDataHoraAcesso);
