1import { useState } from 'react'
import Hero from './components/Hero.jsx'
import Cards from './components/Cards.jsx'
import MensagemModal from './components/MensagemModal.jsx'
import AvaliacaoModal from './components/AvaliacaoModal.jsx'
import PerfilModal from './components/PerfilModal.jsx'
import Admin from './components/Admin.jsx'

export default function App() {
  const [pagina, setPagina] = useState('home')
  const [mensagemProfissional, setMensagemProfissional] = useState(null)
  const [avaliacaoProfissional, setAvaliacaoProfissional] = useState(null)
  const [perfilProfissional, setPerfilProfissional] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState(null)

  if (pagina === 'admin') return <Admin onVoltar={() => setPagina('home')} />

  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Hero
        onBuscar={cat => { setFiltroCategoria(cat); document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth' }) }}
        onAdmin={() => setPagina('admin')}
      />
      <div id="cards">
        <Cards
          filtroCategoria={filtroCategoria}
          onMensagem={prof => setMensagemProfissional(prof)}
          onAvaliar={prof => setAvaliacaoProfissional(prof)}
          onVerPerfil={prof => setPerfilProfissional(prof)}
        />
      </div>
      {mensagemProfissional && (
        <MensagemModal profissional={mensagemProfissional} onFechar={() => setMensagemProfissional(null)} />
      )}
      {avaliacaoProfissional && (
        <AvaliacaoModal profissional={avaliacaoProfissional} onFechar={() => setAvaliacaoProfissional(null)} />
      )}
      {perfilProfissional && (
        <PerfilModal profissional={perfilProfissional} onFechar={() => setPerfilProfissional(null)} onMensagem={p => { setPerfilProfissional(null); setMensagemProfissional(p) }} />
      )}
    </main>
  )
}
