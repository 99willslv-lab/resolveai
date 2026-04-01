import { useState } from 'react'
import { supabase } from '../utils/supabase.js'

export default function AvaliarModal({ profissional, onFechar }) {
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState(5)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  async function enviarAvaliacao() {
    setErro('')

    if (!nome.trim()) {
      setErro('Nome é obrigatório')
      return
    }

    if (!comentario.trim()) {
      setErro('Comentário é obrigatório')
      return
    }

    setEnviando(true)

    try {
      // Salva avaliação direto no banco
      const { error: avError } = await supabase.from('avaliacoes').insert({
        profissional_id: profissional.id,
        nome_avaliador: nome.trim(),
        nota: parseInt(nota),
        comentario: comentario.trim(),
        data_criacao: new Date().toISOString()
      })

      if (avError) {
        setErro('Erro ao enviar avaliação. Tente novamente.')
        setEnviando(false)
        return
      }

      // Atualiza média de avaliação do profissional
      const { data: avaliacoes } = await supabase
        .from('avaliacoes')
        .select('nota')
        .eq('profissional_id', profissional.id)

      if (avaliacoes && avaliacoes.length > 0) {
        const mediaAvaliacoes = avaliacoes.reduce((sum, av) => sum + av.nota, 0) / avaliacoes.length
        
        await supabase
          .from('profissionais')
          .update({
            avaliacao: mediaAvaliacoes,
            total_avaliacoes: avaliacoes.length
          })
          .eq('id', profissional.id)
      }

      setEnviado(true)
      
      setTimeout(() => {
        // Limpa estados em memória
        setNome('')
        setNota(5)
        setComentario('')
        setEnviado(false)
        onFechar()
      }, 2000)
    } catch (err) {
      setErro('Erro ao enviar avaliação. Tente novamente.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="text-center bg-[#1A1A1A] rounded-3xl p-8 max-w-sm border border-white/10">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-white font-semibold mb-2">Avaliação Enviada!</p>
          <p className="text-white/70 text-sm">Obrigado por sua avaliação!</p>
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
            <label className="block text-white text-sm font-semibold mb-3">Sua Nota *</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setNota(n)}
                  className={`text-4xl transition ${nota >= n ? 'text-[#FFD600]' : 'text-white/20 hover:text-white/40'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">Comentário *</label>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="O que você achou do serviço?"
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
            onClick={enviarAvaliacao}
            disabled={enviando}
            className="flex-1 bg-[#FF5C00] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e05200] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? '⏳ Enviando...' : '⭐ Avaliar'}
          </button>
        </div>
      </div>
    </div>
  )
}
