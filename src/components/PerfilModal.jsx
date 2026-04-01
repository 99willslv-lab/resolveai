import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'
import SolicitacaoServicoModal from './SolicitacaoServicoModal'

export default function PerfilModal({ profissional, onFechar }) {
  const [avaliacoes, setAvaliacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalSolicitacao, setModalSolicitacao] = useState(false)
  const [imagemCarregada, setImagemCarregada] = useState(false)
  const [erroImagem, setErroImagem] = useState(false)

  useEffect(() => {
    async function carregarAvaliacoes() {
      setLoading(true)
      const { data } = await supabase
        .from('avaliacoes')
        .select('*')
        .eq('profissional_id', profissional.id)
        .order('data_criacao', { ascending: false })
        .limit(5)
      
      setAvaliacoes(data || [])
      setLoading(false)
    }

    carregarAvaliacoes()
  }, [profissional.id])

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header com imagem 4:3 */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-white/10 to-white/5">
            {profissional.imagem_url && !erroImagem ? (
              <>
                {/* Skeleton loader */}
                {!imagemCarregada && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse" />
                )}
                
                {/* Imagem */}
                <img
                  src={profissional.imagem_url}
                  alt={profissional.nome}
                  loading="lazy"
                  onLoad={() => setImagemCarregada(true)}
                  onError={() => setErroImagem(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imagemCarregada ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            ) : (
              /* Fallback */
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl opacity-20">👷</div>
              </div>
            )}
            
            {/* Botão fechar */}
            <button
              onClick={onFechar}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            {/* Info básica */}
            <h2 className="text-2xl font-bold text-white mb-1">{profissional.nome}</h2>
            <p className="text-[#FF5C00] font-semibold mb-4">{profissional.categoria}</p>

            {/* Localização */}
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <span>📍 {profissional.cidade}</span>
            </div>

            {/* Avaliação */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i <= Math.round(profissional.avaliacao)
                        ? 'text-[#FFD600]'
                        : 'text-white/20'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white font-semibold">{profissional.avaliacao?.toFixed(1)}</span>
              <span className="text-white/50 text-sm">({profissional.total_avaliacoes} avaliações)</span>
            </div>

            {/* Bio */}
            {profissional.bio && (
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-white/70 leading-relaxed">{profissional.bio}</p>
              </div>
            )}

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-white/10 bg-[#00C896]/10 rounded-xl p-4">
              <p className="text-white/60 text-sm mb-1">Valores</p>
              <p className="text-2xl font-bold text-[#00C896]">
                A partir de R$ {profissional.preco_min || 'Consulte'}
              </p>
              <p className="text-xs text-white/50 mt-2">Orçamento personalizado após solicitação</p>
            </div>

            {/* Avaliações Recentes */}
            {loading ? (
              <div className="text-center py-6 text-white/40">
                <p>Carregando avaliações...</p>
              </div>
            ) : avaliacoes.length > 0 ? (
              <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-white font-semibold mb-4">Avaliações Recentes</h3>
                <div className="space-y-3">
                  {avaliacoes.map(av => (
                    <div key={av.id} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-semibold text-sm">{av.nome_avaliador}</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span
                              key={i}
                              className={`text-xs ${i <= av.nota ? 'text-[#FFD600]' : 'text-white/20'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">{av.comentario}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Botão de Solicitação */}
            <div className="space-y-3">
              <button
                onClick={() => setModalSolicitacao(true)}
                className="w-full bg-[#FF5C00] text-white py-3 rounded-xl font-semibold hover:bg-[#e05200] transition"
              >
                📝 Solicitar Serviço
              </button>

              <button
                onClick={onFechar}
                className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalSolicitacao && (
        <SolicitacaoServicoModal
          profissional={profissional}
          onFechar={() => {
            setModalSolicitacao(false)
            onFechar()
          }}
        />
      )}
    </>
  )
}
