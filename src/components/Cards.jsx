import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase.js'

function Estrelas({ nota }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`text-sm ${i <= Math.round(nota) ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>
        ))}
      </div>
      <span className="text-sm font-semibold text-white">{nota?.toFixed(1)}</span>
    </div>
  )
}

function Carrossel({ imagens, nome }) {
  const [idx, setIdx] = useState(0)

  if (!imagens?.length) {
    return (
      <div className="relative h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center rounded-t-2xl">
        <span className="text-5xl opacity-20">👷</span>
      </div>
    )
  }

  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl group">
      <img
        src={imagens[idx]?.url}
        alt={nome}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {imagens.length > 1 && (
        <>
          {/* Seta Esquerda */}
          <button
            onClick={e => {
              e.stopPropagation()
              setIdx(i => (i - 1 + imagens.length) % imagens.length)
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm transition z-10"
          >
            ‹
          </button>

          {/* Seta Direita */}
          <button
            onClick={e => {
              e.stopPropagation()
              setIdx(i => (i + 1) % imagens.length)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm transition z-10"
          >
            ›
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imagens.map((_, i) => (
              <button
                key={i}
                onClick={e => {
                  e.stopPropagation()
                  setIdx(i)
                }}
                className={`block w-2 h-2 rounded-full transition ${
                  i === idx ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Cards({ filtroCategoria, onMensagem, onAvaliar, onVerPerfil }) {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      setLoading(true)
      let query = supabase
        .from('profissionais')
        .select('*, profissional_imagens(*)')
        .eq('ativo', true)
        .order('avaliacao', { ascending: false })

      if (filtroCategoria) query = query.eq('categoria', filtroCategoria)

      const { data } = await query
      setProfissionais(data || [])
      setLoading(false)
    }
    carregar()
  }, [filtroCategoria])

  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="w-8 h-8 border-2 border-[#FF5C00] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!profissionais.length) return (
    <div className="text-center py-24 text-white/40">
      <p className="text-5xl mb-4">🔍</p>
      <p>Nenhum profissional encontrado</p>
    </div>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <h2 className="font-display text-3xl font-extrabold text-white mb-2">
        {filtroCategoria ? filtroCategoria : 'Profissionais Verificados'}
      </h2>
      <p className="text-white/50 mb-12">{profissionais.length} disponíveis</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profissionais.map(prof => (
          <div
            key={prof.id}
            className="group h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF5C00]/40 hover:shadow-xl hover:shadow-[#FF5C00]/10 transition-all duration-300 hover:scale-102 cursor-pointer flex flex-col"
            onClick={() => onVerPerfil(prof)}
          >
            {/* Carrossel */}
            <Carrossel imagens={prof.profissional_imagens} nome={prof.nome} />

            {/* Conteúdo */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-3">
                <h3 className="font-semibold text-white text-lg leading-tight mb-1">{prof.nome}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#FF5C00] font-medium">{prof.categoria}</span>
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    📍 {prof.cidade}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <Estrelas nota={prof.avaliacao} />
                <span className="text-xs text-white/40 ml-2">({prof.total_avaliacoes})</span>
              </div>

              {prof.bio && (
                <p className="text-sm text-white/60 mb-3 line-clamp-2">
                  {prof.bio}
                </p>
              )}

              <div className="mb-4 flex items-center gap-2 text-xs text-[#00C896] font-medium">
                <span>⏱️ Responde rápido</span>
              </div>

              <div className="mb-4 py-3 px-3 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20">
                <p className="text-xs text-white/60 mb-1">A partir de</p>
                <p className="text-xl font-bold text-[#00C896]">
                  {prof.preco_min && prof.preco_max
                    ? `R$ ${prof.preco_min}–${prof.preco_max}/h`
                    : prof.preco_min
                    ? `R$ ${prof.preco_min}/h`
                    : 'Consulte'}
                </p>
              </div>

              <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => onMensagem(prof)}
                  className="flex-1 rounded-xl bg-[#FF5C00] text-white py-2.5 text-sm font-semibold hover:bg-[#e05200] transition-all duration-200 hover:shadow-lg hover:shadow-[#FF5C00]/30"
                >
                  💬 Falar agora
                </button>
                <button
                  onClick={() => onAvaliar(prof)}
                  className="px-4 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                >
                  ⭐
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
