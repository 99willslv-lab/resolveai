import { useState, useRef } from 'react'
import { supabase } from '../utils/supabase.js'

export default function MensagemModal({ profissional, onFechar }) {
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar() {
    setErro('')

    if (!nome.trim()) {
      setErro('Nome é obrigatório')
      return
    }
    if (!whatsapp.trim()) {
      setErro('WhatsApp é obrigatório')
      return
    }
    if (!mensagem.trim()) {
      setErro('Mensagem é obrigatória')
      return
    }

    setEnviando(true)

    try {
      const { error } = await supabase.from('mensagens').insert({
        profissional_id: profissional.id,
        nome_cliente: nome.trim(),
        telefone_cliente: whatsapp.trim(),
        mensagem: mensagem.trim(),
        status: 'novo',
        data_criacao: new Date().toISOString()
      })

      if (error) {
        setErro('Erro ao enviar. Tente novamente.')
        setEnviando(false)
        return
      }

      setEnviado(true)
      setTimeout(() => {
        onFechar()
        setNome('')
        setWhatsapp('')
        setMensagem('')
        setEnviado(false)
      }, 3000)
    } catch (err) {
      setErro('Erro ao enviar. Tente novamente.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="text-center bg-[#1A1A1A] rounded-3xl p-8 max-w-sm border border-white/10">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-white font-semibold mb-2">Mensagem Enviada!</p>
          <p className="text-white/70 text-sm">Recebemos sua mensagem. Em breve responderemos no seu WhatsApp.</p>
        </div>
      </div>
    )
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

        <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          {erro && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-300 text-xs font-semibold">⚠️ {erro}</p>
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-semibold mb-2">Seu Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF5C00]"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">WhatsApp *</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="(42) 99999-9999"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF5C00]"
            />
            <p className="text-xs text-white/40 mt-1">Usaremos para responder você</p>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">Sua Mensagem *</label>
            <textarea
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              placeholder="Descreva o que você precisa..."
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF5C00] resize-none"
            />
          </div>
        </div>

        <div className="px-6 pb-6 border-t border-white/10 pt-4 flex gap-2">
          <button
            onClick={onFechar}
            className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition"
          >
            Cancelar
          </button>
          <button
            onClick={enviar}
            disabled={enviando}
            className="flex-1 bg-[#FF5C00] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e05200] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? '⏳ Enviando...' : '💬 Enviar Mensagem'}
          </button>
        </div>
      </div>
    </div>
  )
}
