import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'

export default function PerfilModal({ profissional, onFechar }) {
  const [avaliacoes, setAvaliacoes] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase
        .from('avaliacoes')
        .select('*')
        .eq('profissional_id', profissional.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setAvaliacoes(data || [])
      setCarregando(false)
    }

    carregar()
  }, [profissional.id])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header com imagem */}
        <div className="relative">
          {profissional.profissional_imagens?.length > 0 ? (
            <img src={profissional.profissional_imagens[0].url} alt={profissional.nome} className="w-full h-64 object-cover" />
          ) : (
            <div className="w-full h-64 bg-gradient-to-r from-[#FF5C00] to-[#e05200] flex items-center justify-center">
              <span className="text-6xl">👷</span>
            </div>
          )}
          <button onClick={onFechar} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center">✕</button>
        </div>

        <div className="px-6 py-6">
          {/* Info básica */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{profissional.nome}</h1>
            <p className="text-[#FF5C00] font-semibold text-lg mb-2">{profissional.categoria}</p>
            <p className="text-white/50 mb-4">📍 {profissional.cidade}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`text-lg ${i <= Math.round(profissional.avaliacao) ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>
                ))}
              </div>
              <span className="text-white font-semibold">{profissional.avaliacao?.toFixed(1)}</span>
              <span className="text-white/50">({profissional.total_avaliacoes} avaliações)</span>
            </div>
          </div>

          {/* Sobre */}
          {profissional.bio && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <h2 className="text-white font-semibold mb-3">Sobre</h2>
              <p className="text-white/70">{profissional.bio}</p>
            </div>
          )}

          {/* Preço */}
          {(profissional.preco_min || profissional.preco_max) && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <h2 className="text-white font-semibold mb-3">Preço</h2>
              <p className="text-[#00C896] text-xl font-bold">
                {profissional.preco_min && profissional.preco_max
                  ? `R$ ${profissional.preco_min} - R$ ${profissional.preco_max}/h`
                  : profissional.preco_min
                  ? `A partir de R$ ${profissional.preco_min}/h`
                  : 'Consulte'}
              </p>
            </div>
          )}

          {/* Contato */}
          {(profissional.telefone || profissional.email) && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <h2 className="text-white font-semibold mb-3">Contato</h2>
              {profissional.telefone && (
                <p className="text-white/70 mb-2">
                  📱 {profissional.telefone}
                </p>
              )}
              {profissional.email && (
                <p className="text-white/70">
                  📧 {profissional.email}
                </p>
              )}
            </div>
          )}

          {/* Avaliações */}
          {!carregando && avaliacoes.length > 0 && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <h2 className="text-white font-semibold mb-4">Avaliações recentes</h2>
              <div className="space-y-3">
                {avaliacoes.map(av => (
                  <div key={av.id} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className={`text-sm ${i <= av.nota ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-white/50 text-xs">{new Date(av.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p className="text-white/80 text-sm">{av.comentario}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-3">
            <button
              onClick={onFechar}
              className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition"
            >
              Fechar
            </button>
            
              href={`https://wa.me/${profissional.telefone?.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#FF5C00] text-white py-3 rounded-xl font-semibold hover:bg-[#e05200] transition text-center"
            >
              💬 Contatar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
