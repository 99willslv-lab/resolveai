import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase.js'

function Estrelas({ nota }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`text-sm ${i <= Math.round(nota) ? 'text-yellow-400' : 'text-white/20'}`}>★</span>
        ))}
      </div>
      <span className="text-sm font-semibold text-white">{nota?.toFixed(1)}</span>
    </div>
  )
}

function ImagemPerfil({ src, nome }) {
  const [loaded, setLoaded] = useState(false)
  const [erro, setErro] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-t-2xl overflow-hidden">
      {src && !erro ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse" />
          )}
          
          <img
            src={src}
            alt={nome}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErro(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-5xl opacity-20">👷</div>
        </div>
      )}
    </div>
  )
}

export default function Cards({ filtroCategoria, onVerPerfil }) {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      setLoading(true)
      let query = supabase
        .from('profissionais')
        .select('*')
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
      <div className="w-8 h-8 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!profissionais.length) return (
    <div className="text-center py-24 text-white/40">
      <p className="text-5xl mb-4">🔍</p>
      <p>Nenhum profissional encontrado em {filtroCategoria || 'Castro'}</p>
    </div>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <h2 className="font-display text-3xl font-black text-white mb-2">
        {filtroCategoria ? `${filtroCategoria} em Castro` : 'Profissionais verificados em Castro'}
      </h2>
      <p className="text-white/50 mb-12">{profissionais.length} profissionais disponíveis</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profissionais.map(prof => (
          <div
            key={prof.id}
            className="group h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#22c55e]/50 hover:shadow-xl hover:shadow-[#22c55e]/20 transition-all duration-300 hover:scale-102 cursor-pointer flex flex-col"
            onClick={() => onVerPerfil(prof)}
          >
            <ImagemPerfil src={prof.imagem_url} nome={prof.nome} />

            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-3">
                <h3 className="font-bold text-white text-lg leading-tight mb-1">{prof.nome}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#22c55e] font-bold">{prof.categoria}</span>
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    📍 Castro - PR
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

              <div className="mb-4 py-3 px-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20">
                <p className="text-xs text-white/60 mb-1">A partir de</p>
                <p className="text-xl font-bold text-[#22c55e]">
                  R$ {prof.preco_min || 'Consulte'}
                </p>
              </div>

              <button
                className="w-full rounded-xl bg-[#22c55e] text-black py-2.5 text-sm font-bold hover:bg-[#16a34a] transition-all duration-200 hover:shadow-lg hover:shadow-[#22c55e]/40 mt-auto"
                onClick={e => e.stopPropagation()}
              >
                📝 Solicitar serviço
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
