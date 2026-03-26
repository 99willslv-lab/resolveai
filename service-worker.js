const CACHE_NAME = 'procuro-alguem-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
]

// Install Event - Cache files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Cache opened')
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn('⚠️ Some assets failed to cache:', err)
        // Não falhar completamente se alguns assets falharem
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json'
        ])
      })
    })
  )
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // Strategy: Cache first, fallback to network (good for assets)
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'image') {
    
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const cache = caches.open(CACHE_NAME)
            cache.then((c) => c.put(request, response.clone()))
          }
          return response
        }).catch(() => {
          // Fallback for images
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="#ddd" width="100" height="100"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            )
          }
          throw new Error('Network request failed')
        })
      })
    )
  } 
  
  // Strategy: Network first, fallback to cache (good for API calls)
  else if (url.pathname.startsWith('/api/') || request.headers.get('Accept').includes('application/json')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const cache = caches.open(CACHE_NAME)
            cache.then((c) => c.put(request, response.clone()))
          }
          return response
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response
              }
              // Return offline page
              return new Response(
                JSON.stringify({
                  error: 'Offline',
                  message: 'Você está offline. Tente novamente quando reconectar.'
                }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({ 'Content-Type': 'application/json' })
                }
              )
            })
        })
    )
  }
  
  // Default: Cache first
  else {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (response && response.status !== 200) {
            return response
          }
          
          // Cache clone
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
          
          return response
        }).catch(() => {
          // Offline fallback
          return caches.match('/')
        })
      })
    )
  }
})

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🧹 Service Worker activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️ Deleting old cache: ${cacheName}`)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Take control of all pages
  self.clients.claim()
})

// Message Event - For cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({ cleared: true })
    })
  }
})

// Background Sync (opcional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites())
  }
})

// Sync helpers
async function syncFavorites() {
  try {
    // Sync favorites com backend quando voltar online
    const cache = await caches.open(CACHE_NAME)
    const requests = await cache.keys()
    
    // Process pending requests
    for (const request of requests) {
      if (request.url.includes('/api/favorites')) {
        try {
          await fetch(request)
        } catch (err) {
          console.log('Favorite sync failed, will retry later:', err)
        }
      }
    }
  } catch (err) {
    console.error('Sync error:', err)
  }
}

console.log('✅ Service Worker loaded')
