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
/* =========================
   ATUALIZAR DATA E HORA
========================= */
function atualizarDataHoraAcesso() {
    const spanData = document.getElementById('data-atualizacao');
    
    // Se o elemento não existir, interrompe a função
    if (!spanData) return;

    const agora = new Date();

    // Formata o dia, mês e ano com 2 dígitos (ex: 03, 09)
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const ano = agora.getFullYear();

    // Formata a hora, minutos e segundos com 2 dígitos
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    // Monta a string no formato desejado
    const dataFormatada = `Atualizado em: ${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
    
    // Insere o texto no HTML
    spanData.textContent = dataFormatada;
}

// Executa a função assim que o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', atualizarDataHoraAcesso);

