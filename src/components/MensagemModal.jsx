import { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabase.js'

export default function MensagemModal({ profissional, onFechar }) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [historico, setHistorico] = useState([])
  const fimRef = useRef(null)

  useEffect(() => {
    const channel = supabase
      .channel(`mensagens-${profissional.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'mensagens',
        filter: `profissional_id=eq.${profissional.id}`
      }, payload => {
        setHistorico(h => [...h, payload.new])
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

  async function enviar() {
    if (!nome.trim() || !mensagem.trim()) return
    setEnviando(true)
    await supabase.from('mensagens').insert({
      profissional_id: profissional.id,
      nome_cliente: nome,
      telefone_cliente: telefone,
      mensagem
    })
    setMensagem('')
    setEnviando(false)
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="font-semibold text-white">{profissional.nome}</p>
            <p className="text-xs text-[#FF5C00]">{profissional.categoria}</p>
          </div>
          <button onClick={onFechar} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>

        {/* Histórico */}
        <div className="h-48 overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide">
          {historico.length === 0 && (
            <p className="text-center text-white/30 text-sm mt-8">Inicie a conversa</p>
          )}
          {historico.map(msg => (
            <div key={msg.id} className="bg-white/5 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#FF5C00]">{msg.nome_cliente}</span>
                <span className="text-xs text-white/30">{new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-sm text-white/80">{msg.mensagem}</p>
            </div>
          ))}
          <div ref={fimRef} />
        </div>

        {/* Formulário */}
        <div className="px-6 pb-6 border-t border-white/10 pt-4 flex flex-col gap-3">
          {!historico.length && (
            <div className="flex gap-3">
              <input value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Seu nome *"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]" />
              <input value={telefone} onChange={e => setTelefone(e.target.value)}
                placeholder="WhatsApp"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]" />
            </div>
          )}
          <div className="flex gap-2">
            <input
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]"
            />
            <button
              onClick={enviar}
              disabled={enviando}
              className="rounded-xl bg-[#FF5C00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e05200] transition disabled:opacity-50"
            >
              {enviando ? '...' : enviado ? '✓' : '→'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
