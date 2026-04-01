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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/20 to-[#1a1a1a]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Resolve<span className="text-[#FF5C00]">Ai</span></h1>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="/admin" className="text-white/50 hover:text-white transition text-xs sm:text-sm px-3 py-2 rounded hover:bg-white/10">
              Admin
            </a>
            <a href="/cadastro" className="bg-[#FF5C00] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#e05200] transition whitespace-nowrap">
              ➕ Cadastrar
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="mb-4 inline-block">
          <span className="text-xs sm:text-sm text-[#FF5C00] font-medium border border-[#FF5C00] rounded-full px-3 sm:px-4 py-1">🌟 Castro • Carambeí • Tibagi</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Encontre quem<br />
          <span className="text-[#FF5C00]">resolve de verdade</span>
        </h2>
        <p className="text-base sm:text-xl text-white/50 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Profissionais verificados perto de você. Rápido, confiável e sem complicação.
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-16 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#FF5C00]">340+</p>
            <p className="text-white/50 text-xs sm:text-sm">Profissionais</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#00C896]">3</p>
            <p className="text-white/50 text-xs sm:text-sm">Cidades</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">1.2k+</p>
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
            className="bg-[#FF5C00] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#e05200] transition text-sm sm:text-lg active:scale-95"
          >
            🔍 Buscar profissional
          </button>
          <a 
            href="/cadastro" 
            className="border-2 border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:border-white/40 transition text-sm sm:text-lg text-center active:scale-95"
          >
            ➕ Cadastrar meu serviço →
          </a>
        </div>
      </section>

      {/* Nova seção de categorias premium */}
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
