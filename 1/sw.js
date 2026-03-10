// Nome do nosso cache (se você mudar o layout no futuro, mude para v2, v3...)
const CACHE_NAME = 'meu-app-carrossel-v2';

// Lista de todos os arquivos que queremos salvar no celular do cliente
const arquivosParaCache = [
  './',               // A página inicial do ID
  './index.html',     // O HTML
  './style.css',      // O CSS
  './script.js',      // O Javascript
  './images/image1.jpg',
  './images/image2.jpg',
  './images/image3.jpg',
  './images/image4.jpeg' // Notei que no seu HTML a foto 4 é .jpeg!
];

// ETAPA 1: Instalação - Baixa e salva tudo no cache no primeiro acesso
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso!');
        return cache.addAll(arquivosParaCache);
      })
  );
  self.skipWaiting();
});

// ETAPA 2: Interceptação - Quando o app pede um arquivo, puxamos do cache
self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request)
      .then(respostaCache => {
        // Se achou no celular (cache), entrega na hora!
        if (respostaCache) {
          return respostaCache;
        }
        // Se não achou, aí sim vai buscar na internet
        return fetch(evento.request);
      })
  );
});
