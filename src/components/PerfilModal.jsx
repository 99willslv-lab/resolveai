import { useState } from 'react'

function Estrelas({ nota }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-lg ${i <= Math.round(nota) ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>
      ))}
    </div>
  )
}

export default function PerfilModal({ profissional, onFechar, onMensagem }) {
  const [idx, setIdx] = useState(0)
  const imgs = profissional.profissional_imagens || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden my-4">

        {/* Carrossel grande */}
        <div className="relative h-72 bg-white/5">
          {imgs.length ? (
            <>
              <img src={imgs[idx]?.url} alt={profissional.nome} className="w-full h-full object-cover" />
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setIdx(i => (i - 1 + imgs.length) % imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 rounded-full w-9 h-9 flex items-center justify-center text-white hover:bg-black/80">‹</button>
                  <button onClick={() => setIdx(i => (i + 1) % imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 rounded-full w-9 h-9 flex items-center justify-center text-white hover:bg-black/80">›</button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {imgs.map((_, i) => (
                      <button key={i} onClick={() => setIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-4' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-6xl">👷</div>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white">{profissional.nome}</h2>
              <span className="text-[#FF5C00] font-medium">{profissional.categoria}</span>
              <span className="text-white/40 mx-2">·</span>
              <span className="text-white/40">{profissional.cidade}</span>
            </div>
            <button onClick={onFechar} className="text-white/50 hover:text-white text-xl ml-4">✕</button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Estrelas nota={profissional.avaliacao} />
            <span className="text-white font-semibold">{profissional.avaliacao?.toFixed(1)}</span>
            <span className="text-white/40 text-sm">({profissional.total_avaliacoes} avaliações)</span>
          </div>

          {profissional.bio && (
            <p className="text-white/70 text-sm leading-relaxed mb-4">{profissional.bio}</p>
          )}

          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-[#00C896]">
              {profissional.preco_min && profissional.preco_max
                ? `R$ ${profissional.preco_min}–${profissional.preco_max}/h`
                : profissional.preco_min
                ? `A partir de R$ ${profissional.preco_min}/h`
                : 'Consulte o valor'}
            </span>
          </div>

          <button
            onClick={() => onMensagem(profissional)}
            className="w-full rounded-full bg-[#FF5C00] py-4 font-semibold text-white text-lg hover:bg-[#e05200] transition shadow-lg shadow-[#FF5C00]/30"
          >
            💬 Enviar mensagem
          </button>
        </div>
      </div>
    </div>
  )
}
