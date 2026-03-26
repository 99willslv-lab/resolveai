# 🏘️ Procuro Alguém - PWA de Serviços Locais

## 📱 Características

✅ **Mobile-First App Design** - Interface com cara de app nativa
✅ **Busca e Filtro** - Encontre serviços por categoria e localização
✅ **Sistema de Favoritos** - Salve profissionais (localStorage)
✅ **Rating & Reviews** - Veja avaliações dos clientes
✅ **Animações Suaves** - Micro-interações delightful
✅ **Dark Theme** - Design moderno e elegante
✅ **Responsivo** - Funciona perfeito em mobile/tablet/desktop

---

## 🚀 Quick Start Local

### 1️⃣ Setup Com Vite (Recomendado)

```bash
npm create vite@latest services-pwa -- --template react
cd services-pwa
npm install lucide-react
```

### 2️⃣ Copie o componente
- Substitua o conteúdo de `src/App.jsx` com o arquivo `services-pwa.jsx`

### 3️⃣ Rode localmente
```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📦 Estrutura Para Produção

```
services-pwa/
├── public/
│   ├── manifest.json          # PWA Manifest
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── src/
│   ├── components/
│   │   └── ServicesPWA.jsx    # Componente principal
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🔧 Configuração PWA

### 1. Create `public/manifest.json`

```json
{
  "name": "Procuro Alguém - Serviços Locais",
  "short_name": "Procuro Alguém",
  "description": "Encontre profissionais de confiança perto de você",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#0f172a",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "categories": ["business", "productivity"],
  "screenshots": [
    {
      "src": "/screenshot-540x720.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### 2. Create `public/service-worker.js`

```javascript
const CACHE_NAME = 'procuro-alguem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 3. Register Service Worker em `src/main.jsx`

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

### 4. Update `index.html`

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Encontre profissionais de confiança perto de você">
    <meta name="theme-color" content="#0ea5e9">
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="/icon-192x192.png">
    <link rel="icon" type="image/png" href="/icon-192x192.png">
    <title>Procuro Alguém - Serviços Locais</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🚀 Deploy no Vercel

### 1. Push para GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/services-pwa
git push -u origin main
```

### 2. Vercel Setup
- Vá em [vercel.com](https://vercel.com)
- Clique em "New Project"
- Selecione seu repositório
- Vercel detecta automaticamente Vite/React
- Clique "Deploy"

**Variáveis de Ambiente (opcional):**
```
VITE_API_URL=https://sua-api.com
```

### 3. Custom Domain (opcional)
- Em Project Settings → Domains
- Adicione seu domínio

---

## 🗄️ Integração com Supabase (Backend)

### 1. Setup Supabase

```bash
npm install @supabase/supabase-js
```

### 2. Create `src/services/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3. Create Tables em Supabase

**Tabela: `professionals`**
```sql
create table professionals (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  title text not null,
  bio text,
  rating float default 5,
  reviews_count int default 0,
  price text,
  distance text,
  phone text,
  available boolean default true,
  created_at timestamp default now()
);
```

**Tabela: `favorites`**
```sql
create table favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  professional_id uuid not null,
  created_at timestamp default now(),
  foreign key (professional_id) references professionals(id)
);
```

### 4. Update Component com Supabase

```javascript
import { supabase } from './services/supabase'

// Fetch from database
const fetchServices = async () => {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .order('rating', { ascending: false })
  
  if (error) console.error(error)
  else setServices(data)
}

useEffect(() => {
  fetchServices()
}, [])
```

---

## 🎨 Customização

### Cores
Procure por `#0ea5e9`, `#0f172a`, `#1a1f3a` e ajuste para sua paleta

### Categorias
Edite o array `categories` no componente com suas próprias categorias

### Dados
Substitua `mockServices` por fetch real do seu backend

### Ícones
Use emojis ou imagens reais em `service.image`

---

## 📊 Analytics (Opcional)

### Google Analytics
```bash
npm install web-vitals
```

### Sentry (Error Tracking)
```bash
npm install @sentry/react
```

---

## 🧪 Teste PWA

### 1. Lighthouse
- Chrome DevTools → Lighthouse
- Rode audit para PWA
- Alvo: Score >90

### 2. Teste Offline
- DevTools → Network → Offline
- App deve funcionar com cache

### 3. Mobile
- DevTools → Device Toolbar
- Teste em iPhone/Android

---

## 📈 Performance Checklist

- ✅ Images otimizadas (WebP, lazy-load)
- ✅ Code splitting com React.lazy()
- ✅ Service Worker com cache strategy
- ✅ Minified CSS/JS (Vite faz automático)
- ✅ SEO meta tags
- ✅ Mobile viewport

---

## 🔐 Segurança

```javascript
// CORS - configure em seu backend
const allowedOrigins = [
  'https://seu-app.vercel.app',
  'https://seu-dominio.com'
];

// .env
VITE_SUPABASE_URL=sua-url
VITE_SUPABASE_ANON_KEY=sua-chave
```

---

## 📚 Próximos Passos

1. ✅ Setup local e teste
2. ✅ Configure PWA manifest + SW
3. ✅ Deploy no Vercel
4. ✅ Setup Supabase
5. ✅ Integre backend
6. ✅ Add autenticação (Auth0/Supabase Auth)
7. ✅ Improve com pagamentos (Stripe)
8. ✅ Marketing + Launch

---

## 💡 Features a Implementar

- [ ] Autenticação (Login/Register)
- [ ] Chat entre usuários
- [ ] Agendamento de serviços
- [ ] Integração de pagamento
- [ ] Notificações push
- [ ] Maps/Geolocalização
- [ ] Admin dashboard
- [ ] Reviews/ratings do cliente
- [ ] Sistema de pontos/cashback

---

## 📞 Suporte

- Docs Vercel: https://vercel.com/docs
- Docs Supabase: https://supabase.com/docs
- Docs PWA: https://web.dev/progressive-web-apps/

**Feito com ❤️ para sua comunidade local!**
