import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase.js'

function Estrelas({ nota }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-sm ${i <= Math.round(nota) ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>
      ))}
    </div>
  )
}

function Carrossel({ imagens, nome }) {
  const [idx, setIdx] = useState(0)
  if (!imagens?.length) return (
    <div className="h-48 bg-white/5 flex items-center justify-center rounded-t-2xl">
      <span className="text-4xl">👷</span>
    </div>
  )
  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl">
      <img src={imagens[idx]?.url} alt={nome} className="w-full h-full object-cover" />
      {imagens.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + imagens.length) % imagens.length) }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:bg-black/70">‹</button>
          <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % imagens.length) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:bg-black/70">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imagens.map((_, i) => (
              <span key={i} className={`block w-1.5 h-1.5 rounded-full ${i === idx ? 'bg-white' : 'bg-white/40'}`} />
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
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl font-extrabold text-white mb-2">
        {filtroCategoria ? filtroCategoria : 'Todos os profissionais'}
      </h2>
      <p className="text-white/50 mb-10">{profissionais.length} disponíveis</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profissionais.map(prof => (
          <div
            key={prof.id}
            className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#FF5C00]/40 transition-all duration-300 cursor-pointer"
            onClick={() => onVerPerfil(prof)}
          >
            <Carrossel imagens={prof.profissional_imagens} nome={prof.nome} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-white text-lg leading-tight">{prof.nome}</h3>
                  <span className="text-xs text-[#FF5C00] font-medium">{prof.categoria}</span>
                </div>
                <span className="text-xs text-white/40 bg-white/5 rounded-full px-2 py-1">{prof.cidade}</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Estrelas nota={prof.avaliacao} />
                <span className="text-xs text-white/50">{prof.avaliacao?.toFixed(1)} ({prof.total_avaliacoes})</span>
              </div>

              {prof.bio && <p className="text-sm text-white/50 mb-4 line-clamp-2">{prof.bio}</p>}

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#00C896]">
                  {prof.preco_min && prof.preco_max
                    ? `R$ ${prof.preco_min}–${prof.preco_max}/h`
                    : prof.preco_min
                    ? `A partir de R$ ${prof.preco_min}/h`
                    : 'Consulte'}
                </span>
              </div>

              <div className="mt-4 flex gap-2" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => onMensagem(prof)}
                  className="flex-1 rounded-full bg-[#FF5C00] py-2.5 text-sm font-semibold text-white hover:bg-[#e05200] transition-all"
                >
                  💬 Mensagem
                </button>
                <button
                  onClick={() => onAvaliar(prof)}
                  className="rounded-full border border-white/20 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
                >
                  ★ Avaliar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
