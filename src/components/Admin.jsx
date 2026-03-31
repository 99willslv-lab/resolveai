import { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabase.js'

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">👷 Profissionais</p>
        <p className="text-4xl font-bold text-[#FF5C00]">{stats.profissionais}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">💬 Mensagens</p>
        <p className="text-4xl font-bold text-[#00C896]">{stats.mensagens}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">📍 Cidades</p>
        <p className="text-4xl font-bold text-blue-400">{stats.cidades}</p>
      </div>
    </div>
  )
}

function MensagensModal({ profissional, onFechar }) {
  const [historico, setHistorico] = useState([])
  const [resposta, setResposta] = useState('')
  const [enviando, setEnviando] = useState(false)
  const fimRef = useRef(null)

  useEffect(() => {
    const channel = supabase
      .channel(`admin-mensagens-${profissional.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'mensagens',
        filter: `profissional_id=eq.${profissional.id}`
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setHistorico(h => [...h, payload.new])
        } else if (payload.eventType === 'UPDATE') {
          setHistorico(h => h.map(m => m.id === payload.new.id ? payload.new : m))
        }
      })
      .subscribe()

    supabase.from('mensagens')
      .select('*')
      .eq('profissional_id', profissional.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setHistorico(data || []))

    return () => supabase.removeChannel(channel)
  }, [profissional.id])

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [historico])

  async function enviarResposta() {
    if (!resposta.trim()) return
    setEnviando(true)

    await supabase.from('mensagens').insert({
      profissional_id: profissional.id,
      nome_cliente: 'Admin',
      mensagem: resposta,
      is_admin_response: true
    })

    setResposta('')
    setEnviando(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="font-semibold text-white">{profissional.nome}</p>
            <p className="text-xs text-[#FF5C00]">{profissional.categoria}</p>
          </div>
          <button onClick={onFechar} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>

        <div className="h-48 overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide">
          {historico.length === 0 && (
            <p className="text-center text-white/30 text-sm mt-8">Sem mensagens</p>
          )}
          {historico.map(msg => (
            <div key={msg.id} className={`rounded-2xl px-4 py-3 ${msg.is_admin_response ? 'bg-[#FF5C00]/20 border border-[#FF5C00]/30 ml-4' : 'bg-white/5'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#FF5C00]">{msg.nome_cliente}</span>
                <span className="text-xs text-white/30">{new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.is_admin_response && <span className="text-xs bg-[#FF5C00] text-white px-2 py-0.5 rounded-full">Admin</span>}
              </div>
              <p className="text-sm text-white/80">{msg.mensagem}</p>
            </div>
          ))}
          <div ref={fimRef} />
        </div>

        <div className="px-6 pb-6 border-t border-white/10 pt-4 flex gap-2">
          <input
            value={resposta}
            onChange={e => setResposta(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviarResposta()}
            placeholder="Responder..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]"
          />
          <button
            onClick={enviarResposta}
            disabled={enviando}
            className="rounded-xl bg-[#FF5C00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e05200] transition disabled:opacity-50"
          >
            {enviando ? '...' : '→'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [senha, setSenha] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [profissionais, setProfissionais] = useState([])
  const [tab, setTab] = useState('dashboard')
  const [stats, setStats] = useState({ profissionais: 0, mensagens: 0, cidades: 0 })
  const [modalMensagens, setModalMensagens] = useState(null)

  function verificarSenha() {
    if (senha === 'resolveai2024') {
      setAutenticado(true)
    } else {
      alert('Senha incorreta')
    }
  }

  useEffect(() => {
    if (!autenticado) return

    async function carregarDados() {
      const { data: profs, count: profCount } = await supabase
        .from('profissionais')
        .select('id, nome, categoria, cidade, avaliacao, total_avaliacoes, profissional_imagens(*)', { count: 'exact' })
        .eq('ativo', true)

      setProfissionais(profs || [])

      const { count: msgCount } = await supabase
        .from('mensagens')
        .select('*', { count: 'exact', head: true })

      const { data: cidades } = await supabase
        .from('profissionais')
        .select('cidade')
        .eq('ativo', true)
        .then(r => ({ data: [...new Set((r.data || []).map(p => p.cidade))] }))

      setStats({
        profissionais: profCount || 0,
        mensagens: msgCount || 0,
        cidades: cidades?.length || 0
      })
    }

    carregarDados()
  }, [autenticado])

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm w-full">
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-white/50 mb-6">ResolveAi</p>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verificarSenha()}
            placeholder="Senha"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00] mb-4"
          />
          <button
            onClick={verificarSenha}
            className="w-full rounded-full bg-[#FF5C00] py-3 text-white font-semibold hover:bg-[#e05200] transition"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => { setAutenticado(false); setSenha('') }}
            className="text-white/50 hover:text-white transition"
          >
            Sair
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setTab('dashboard')}
            className={`pb-4 font-semibold transition ${tab === 'dashboard' ? 'text-[#FF5C00] border-b-2 border-[#FF5C00]' : 'text-white/50 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setTab('profissionais')}
            className={`pb-4 font-semibold transition ${tab === 'profissionais' ? 'text-[#FF5C00] border-b-2 border-[#FF5C00]' : 'text-white/50 hover:text-white'}`}
          >
            Profissionais
          </button>
        </div>

        {tab === 'dashboard' && (
          <div>
            <DashboardStats stats={stats} />
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Resumo Rápido</h2>
              <p className="text-white/50">• Total de profissionais: <span className="text-[#FF5C00] font-bold">{stats.profissionais}</span></p>
              <p className="text-white/50">• Mensagens: <span className="text-[#00C896] font-bold">{stats.mensagens}</span></p>
              <p className="text-white/50">• Cidades: <span className="text-blue-400 font-bold">{stats.cidades}</span></p>
            </div>
          </div>
        )}

        {tab === 'profissionais' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profissionais.map(prof => (
              <div key={prof.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF5C00]/40 transition">
                {prof.profissional_imagens?.length > 0 ? (
                  <img src={prof.profissional_imagens[0].url} alt={prof.nome} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-white/5 flex items-center justify-center"><span className="text-3xl">👷</span></div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-lg">{prof.nome}</h3>
                  <p className="text-xs text-[#FF5C00] mb-2">{prof.categoria}</p>
                  <p className="text-xs text-white/40 mb-3">{prof.cidade}</p>
                  <p className="text-sm text-[#FFD600] mb-3">⭐ {prof.avaliacao?.toFixed(1)} ({prof.total_avaliacoes})</p>
                  <button
                    onClick={() => setModalMensagens(prof)}
                    className="w-full bg-[#FF5C00] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#e05200] transition"
                  >
                    Ver Mensagens
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalMensagens && (
        <MensagensModal
          profissional={modalMensagens}
          onFechar={() => setModalMensagens(null)}
        />
      )}
    </div>
  )
}
