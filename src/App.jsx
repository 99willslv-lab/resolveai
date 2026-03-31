import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './utils/supabase.js'
import Cards from './components/Cards'
import MensagemModal from './components/MensagemModal'
import AvaliarModal from './components/AvaliarModal'
import PerfilModal from './components/PerfilModal'
import Admin from './components/Admin'
import CadastroPage from './components/CadastroPage'
import Footer from './components/Footer'

function HomePage() {
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [profissionalSelecionado, setProf] = useState(null)
  const [modalAvaliar, setModalAvaliar] = useState(null)
  const [categoriasMensagem, setCatMensagem] = useState({})

  const CATEGORIAS = [
    { nome: 'Encanador', icon: '🔧' },
    { nome: 'Eletricista', icon: '⚡' },
    { nome: 'Pintor', icon: '🎨' },
    { nome: 'Marceneiro', icon: '🪑' },
    { nome: 'Ar-condicionado', icon: '❄️' },
    { nome: 'Pedreiro', icon: '🧱' },
    { nome: 'Faxineiro', icon: '🧹' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/20 to-[#1a1a1a]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Resolve<span className="text-[#FF5C00]">Ai</span></h1>
          <nav className="flex items-center gap-4">
            <a href="/admin" className="text-white/50 hover:text-white transition text-sm">Admin</a>
            <a href="/cadastro" className="bg-[#FF5C00] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e05200] transition">
              ➕ Cadastrar
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-4 inline-block">
          <span className="text-sm text-[#FF5C00] font-medium border border-[#FF5C00] rounded-full px-4 py-1">🌟 Castro • Carambeí • Tibagi</span>
        </div>
        <h2 className="text-5xl font-extrabold text-white mb-4">
          Encontre quem<br />
          <span className="text-[#FF5C00]">resolve de verdade</span>
        </h2>
        <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
          Profissionais verificados perto de você. Rápido, confiável e sem complicação.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-16 text-center">
          <div>
            <p className="text-3xl font-bold text-[#FF5C00]">340+</p>
            <p className="text-white/50 text-sm">Profissionais</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#00C896]">3</p>
            <p className="text-white/50 text-sm">Cidades</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">1.2k+</p>
            <p className="text-white/50 text-sm">Serviços Feitos</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={() => document.querySelector('[data-buscar]')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF5C00] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e05200] transition text-lg">
            🔍 Buscar profissional
          </button>
          <a href="/cadastro" className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:border-white/40 transition text-lg">
            ➕ Cadastrar meu serviço →
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-16" data-buscar>
        <p className="text-white/50 text-sm font-medium mb-4">O QUE VOCÊ PRECISA?</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.nome}
              onClick={() => setFiltroCategoria(filtroCategoria === cat.nome ? '' : cat.nome)}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                filtroCategoria === cat.nome
                  ? 'bg-[#FF5C00] text-white'
                  : 'bg-white/5 border border-white/10 text-white hover:border-[#FF5C00]/40'
              }`}
            >
              {cat.icon} {cat.nome}
            </button>
          ))}
        </div>
      </section>

      <Cards
        filtroCategoria={filtroCategoria}
        onMensagem={prof => {
          setProf(prof)
          setCatMensagem(prev => ({ ...prev, [prof.id]: true }))
        }}
        onAvaliar={setModalAvaliar}
        onVerPerfil={setProf}
      />

      {profissionalSelecionado && !categoriasMensagem[profissionalSelecionado.id] && (
        <PerfilModal profissional={profissionalSelecionado} onFechar={() => setProf(null)} />
      )}

      {profissionalSelecionado && categoriasMensagem[profissionalSelecionado.id] && (
        <MensagemModal
          profissional={profissionalSelecionado}
          onFechar={() => {
            setProf(null)
            setCatMensagem(prev => ({ ...prev, [profissionalSelecionado.id]: false }))
          }}
        />
      )}

      {modalAvaliar && (
        <AvaliarModal
          profissional={modalAvaliar}
          onFechar={() => setModalAvaliar(null)}
        />
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
