import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase.js'

const CATEGORIAS_ICONES = [
  { nome: 'Encanador', icon: '🔧', cor: 'from-blue-600 to-blue-400' },
  { nome: 'Eletricista', icon: '⚡', cor: 'from-yellow-600 to-yellow-400' },
  { nome: 'Pintor', icon: '🎨', cor: 'from-purple-600 to-purple-400' },
  { nome: 'Marceneiro', icon: '🪑', cor: 'from-amber-600 to-amber-400' },
  { nome: 'Ar-condicionado', icon: '❄️', cor: 'from-cyan-600 to-cyan-400' },
  { nome: 'Pedreiro', icon: '🧱', cor: 'from-orange-600 to-orange-400' },
  { nome: 'Faxineiro', icon: '🧹', cor: 'from-green-600 to-green-400' },
]

export default function CategoriasPremium({ onSelectCategoria, filtroCategoria }) {
  const [contagemProfissionais, setContagemProfissionais] = useState({})

  useEffect(() => {
    async function carregarContagemPorCategoria() {
      const { data } = await supabase
        .from('profissionais')
        .select('categoria', { count: 'exact' })
        .eq('ativo', true)

      const contagem = {}
      CATEGORIAS_ICONES.forEach(cat => {
        contagem[cat.nome] = (data || []).filter(p => p.categoria === cat.nome).length
      })
      setContagemProfissionais(contagem)
    }

    carregarContagemPorCategoria()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Categorias de Serviços</h2>
        <p className="text-white/60">Encontre profissionais especializados em diversas áreas</p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-7 gap-4">
        {CATEGORIAS_ICONES.map(cat => (
          <button
            key={cat.nome}
            onClick={() => onSelectCategoria(filtroCategoria === cat.nome ? '' : cat.nome)}
            className={`group relative h-32 rounded-2xl overflow-hidden transition-all duration-300 ${
              filtroCategoria === cat.nome ? 'ring-2 ring-[#FF5C00]' : ''
            }`}
          >
            {/* Fundo com gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-20`} />
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all" />

            {/* Efeito glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-10 blur-xl`} />
            </div>

            {/* Conteúdo */}
            <div className="relative h-full flex flex-col items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
              {/* Ícone */}
              <div className={`text-4xl mb-2 filter drop-shadow-lg`}>
                {cat.icon}
              </div>

              {/* Nome */}
              <h3 className="text-xs font-bold text-white text-center line-clamp-2 mb-1">
                {cat.nome}
              </h3>

              {/* Contagem */}
              <span className="text-xs text-white/70 font-semibold">
                {contagemProfissionais[cat.nome] || 0} profissionais
              </span>
            </div>

            {/* Border */}
            <div className={`absolute inset-0 border rounded-2xl ${
              filtroCategoria === cat.nome 
                ? 'border-[#FF5C00]' 
                : 'border-white/10 group-hover:border-white/30'
            } transition-colors pointer-events-none`} />
          </button>
        ))}
      </div>

      {/* Tablet Grid (5 colunas) */}
      <div className="hidden md:grid lg:hidden grid-cols-5 gap-3">
        {CATEGORIAS_ICONES.map(cat => (
          <button
            key={cat.nome}
            onClick={() => onSelectCategoria(filtroCategoria === cat.nome ? '' : cat.nome)}
            className={`group relative h-28 rounded-xl overflow-hidden transition-all duration-300 ${
              filtroCategoria === cat.nome ? 'ring-2 ring-[#FF5C00]' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-20`} />
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-10 blur-xl`} />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-1">{cat.icon}</div>
              <h3 className="text-xs font-bold text-white text-center line-clamp-2">
                {cat.nome}
              </h3>
              <span className="text-xs text-white/70 font-semibold mt-1">
                {contagemProfissionais[cat.nome] || 0}
              </span>
            </div>

            <div className={`absolute inset-0 border rounded-xl ${
              filtroCategoria === cat.nome 
                ? 'border-[#FF5C00]' 
                : 'border-white/10 group-hover:border-white/30'
            } transition-colors pointer-events-none`} />
          </button>
        ))}
      </div>

      {/* Mobile Scroll Horizontal */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIAS_ICONES.map(cat => (
            <button
              key={cat.nome}
              onClick={() => onSelectCategoria(filtroCategoria === cat.nome ? '' : cat.nome)}
              className={`group relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                filtroCategoria === cat.nome ? 'ring-2 ring-[#FF5C00]' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-20`} />
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-10 blur-xl`} />
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-1">{cat.icon}</div>
                <span className="text-xs text-white/70 font-semibold">
                  {contagemProfissionais[cat.nome] || 0}
                </span>
              </div>

              <div className={`absolute inset-0 border rounded-xl ${
                filtroCategoria === cat.nome 
                  ? 'border-[#FF5C00]' 
                  : 'border-white/10 group-hover:border-white/30'
              } transition-colors pointer-events-none`} />
            </button>
          ))}
        </div>
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}
