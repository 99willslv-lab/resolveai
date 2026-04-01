import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './utils/supabase.js'
import Cards from './components/Cards'
import PerfilModal from './components/PerfilModal'
import CategoriasPremium from './components/CategoriasPremium'
import Admin from './components/Admin'
import CadastroPage from './components/CadastroPage'
import Footer from './components/Footer'

function HomePage() {
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [profissionalSelecionado, setProf] = useState(null)

  useEffect(() => {
    // SEO Meta tags
    document.title = 'Chama9 – Serviços locais em Castro PR | Encontre profissionais rápido'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Encontre profissionais em Castro PR com rapidez e segurança. Solicite serviços como eletricista, encanador, pintor e mais no Chama9.')
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', 'serviços em Castro PR, eletricista Castro, encanador Castro, pintor Castro, profissionais locais, contratar serviços, Chama9')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-slate-900 to-[#0f172a]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">Chama9</span>
            <span className="text-xs text-white/40 font-semibold">Castro - PR</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="/admin" className="text-white/50 hover:text-white transition text-xs sm:text-sm px-3 py-2 rounded hover:bg-white/10">
              Admin
            </a>
            <a href="/cadastro" className="bg-[#22c55e] text-black px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-[#16a34a] transition whitespace-nowrap">
              ➕ Cadastrar
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="mb-4 inline-block">
          <span className="text-xs sm:text-sm text-[#22c55e] font-bold border border-[#22c55e] rounded-full px-3 sm:px-4 py-1">🚀 Chamou, resolveu.</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">
          Encontre profissionais em Castro<br />
          <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">de forma rápida e segura</span>
        </h1>
        
        <p className="text-base sm:text-xl text-white/60 mb-8 sm:mb-12 max-w-3xl mx-auto">
          Conectamos você aos melhores profissionais da sua cidade. Solicite um serviço, 
          nós cuidamos do resto. Sem complicação, sem intermediários desnecessários.
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-16 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#22c55e]">340+</p>
            <p className="text-white/50 text-xs sm:text-sm">Profissionais</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#22c55e]">3</p>
            <p className="text-white/50 text-xs sm:text-sm">Cidades</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#22c55e]">1.2k+</p>
            <p className="text-white/50 text-xs sm:text-sm">Serviços</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
          <button 
            onClick={() => {
              const element = document.querySelector('[data-buscar]')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-[#22c55e] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-[#16a34a] transition text-sm sm:text-lg active:scale-95 shadow-lg shadow-[#22c55e]/30"
          >
            🔍 Buscar profissional
          </button>
          <a 
            href="/cadastro" 
            className="border-2 border-[#22c55e] text-[#22c55e] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-[#22c55e]/10 transition text-sm sm:text-lg text-center active:scale-95"
          >
            💼 Cadastrar meu serviço
          </a>
        </div>
      </section>

      {/* Seção de categorias premium */}
      <CategoriasPremium 
        filtroCategoria={filtroCategoria}
        onSelectCategoria={setFiltroCategoria}
      />

      {/* Cards de profissionais */}
      <div data-buscar>
        <Cards
          filtroCategoria={filtroCategoria}
          onVerPerfil={setProf}
        />
      </div>

      {profissionalSelecionado && (
        <PerfilModal profissional={profissionalSelecionado} onFechar={() => setProf(null)} />
      )}

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </Router>
  )
}
