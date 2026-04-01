const CACHE_NAME = 'chama9-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
  '/apple-touch-icon.png'
]

// Instalar SW e fazer cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll failed:', err)
        return Promise.resolve()
      })
    }).catch(err => {
      console.log('Cache open failed:', err)
      return Promise.resolve()
    })
  )
  self.skipWaiting()
})

// Ativar SW e limpar cache antigo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Estratégia: Network First (com fallback para cache)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }
        
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        
        return response
      })
      .catch(error => {
        return caches.match(event.request)
          .then(response => {
            return response || new Response(
              'Sem conexão. Tente novamente quando reconectar.',
              { status: 503, statusText: 'Service Unavailable' }
            )
          })
      })
  )
})
