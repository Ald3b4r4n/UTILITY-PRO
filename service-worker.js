const CACHE_NAME = "documentos-policiais-v1";
const urlsToCache = ["/", "/index.html", "icon.png"];

// Instalação do Service Worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar requisições
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Retorna o cache se encontrado, senão faz a requisição
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Atualizar cache quando necessário
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("Deletando cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
