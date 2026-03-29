const CACHE_NAME = 'resolveai-v1'

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
]

// INSTALAÇÃO
self.addEventListener('install', (event) => {
  console.log('Service Worker instalando...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto:', CACHE_NAME)
        return cache.addAll(urlsToCache)
      })
      .catch((err) => {
        console.error('Erro ao abrir cache:', err)
      })
  )
  
  self.skipWaiting()
})

// ATIVAÇÃO
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativando...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  self.clients.claim()
})

// FETCH - Network First
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone()
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })
        
        return response
      })
      .catch(() => {
        return caches.match(request)
          .then((cachedResponse) => {
            return cachedResponse || new Response(
              'Você está offline',
              { status: 503 }
            )
          })
      })
  )
})

console.log('Service Worker carregado')
