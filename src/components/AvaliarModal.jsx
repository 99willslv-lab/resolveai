import { useState } from 'react'
import { supabase } from '../utils/supabase.js'

export default function AvaliarModal({ profissional, onFechar }) {
  const [nota, setNota] = useState(5)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  async function enviar() {
    if (!comentario.trim()) {
      alert('Digite um comentário')
      return
    }

    setEnviando(true)

    try {
      await supabase.from('avaliacoes').insert({
        profissional_id: profissional.id,
        nota,
        comentario
      })

      setEnviado(true)
      setTimeout(() => onFechar(), 2000)
    } catch (err) {
      alert('Erro ao enviar avaliação')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="text-center bg-[#1A1A1A] rounded-3xl p-8 max-w-sm">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-white font-semibold mb-2">Obrigado!</p>
          <p className="text-white/50 text-sm">Sua avaliação foi registrada</p>
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

        <div className="px-6 py-6 space-y-4">
          <div>
            <p className="text-white font-semibold mb-4">Como foi a experiência?</p>
            <div className="flex gap-3 mb-4">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setNota(n)}
                  className={`text-4xl transition ${n <= nota ? 'scale-110' : 'opacity-40'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-white/50 text-sm">{nota === 5 ? 'Excelente!' : nota === 4 ? 'Muito bom!' : nota === 3 ? 'Bom' : nota === 2 ? 'Ruim' : 'Péssimo'}</p>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Comentário</label>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Conte sua experiência..."
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00] resize-none"
            />
          </div>
        </div>

        <div className="px-6 pb-6 border-t border-white/10 pt-4 flex gap-3">
          <button
            onClick={onFechar}
            className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition"
          >
            Cancelar
          </button>
          <button
            onClick={enviar}
            disabled={enviando}
            className="flex-1 bg-[#FF5C00] text-white py-3 rounded-xl font-semibold hover:bg-[#e05200] transition disabled:opacity-50"
          >
            {enviando ? '...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  )
}
