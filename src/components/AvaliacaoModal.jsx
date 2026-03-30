import { useState } from 'react'
import { supabase } from '../utils/supabase.js'

export default function AvaliacaoModal({ profissional, onFechar }) {
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function enviar() {
    if (!nome.trim() || nota === 0) return
    setEnviando(true)
    await supabase.from('avaliacoes').insert({
      profissional_id: profissional.id,
      nome_cliente: nome,
      nota,
      comentario
    })
    const { data: avs } = await supabase.from('avaliacoes').select('nota').eq('profissional_id', profissional.id)
    if (avs?.length) {
      const media = avs.reduce((a, b) => a + b.nota, 0) / avs.length
      await supabase.from('profissionais').update({ avaliacao: media, total_avaliacoes: avs.length }).eq('id', profissional.id)
    }
    setEnviando(false)
    setSucesso(true)
    setTimeout(onFechar, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-3xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">Avaliar {profissional.nome}</h2>
          <button onClick={onFechar} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>

        {sucesso ? (
          <div className="text-center py-8">
            <p className="text-5xl mb-3">🎉</p>
            <p className="text-white font-semibold">Avaliação enviada!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input value={nome} onChange={e => setNome(e.target.value)}
              placeholder="Seu nome *"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]" />

            <div>
              <p className="text-sm text-white/50 mb-2">Nota *</p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => (
                  <button key={i}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setNota(i)}
                    className={`text-3xl transition-transform ${i <= (hover || nota) ? 'text-[#FFD600] scale-110' : 'text-white/20'}`}
                  >★</button>
                ))}
              </div>
            </div>

            <textarea value={comentario} onChange={e => setComentario(e.target.value)}
              placeholder="Comentário (opcional)"
              rows={3}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00] resize-none" />

            <button onClick={enviar} disabled={enviando || !nome || !nota}
              className="w-full rounded-full bg-[#FF5C00] py-3 font-semibold text-white hover:bg-[#e05200] transition disabled:opacity-40">
              {enviando ? 'Enviando...' : 'Enviar avaliação'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
