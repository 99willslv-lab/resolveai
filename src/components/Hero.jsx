import { useState } from 'react'

const categorias = [
  { icon: '🔧', nome: 'Encanador' },
  { icon: '⚡', nome: 'Eletricista' },
  { icon: '🎨', nome: 'Pintor' },
  { icon: '🪚', nome: 'Marceneiro' },
  { icon: '❄️', nome: 'Ar-condicionado' },
  { icon: '🏠', nome: 'Pedreiro' },
  { icon: '🧹', nome: 'Faxineira' },
  { icon: '📦', nome: 'Mudança' },
]

const stats = [
  { valor: '340+', label: 'Profissionais' },
  { valor: '3', label: 'Cidades' },
  { valor: '1.2k+', label: 'Serviços feitos' },
]

export default function Hero({ onBuscar, onAdmin }) {
  const [catSelecionada, setCatSelecionada] = useState(null)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F0F0F]">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#FF5C00] opacity-10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-[#7B2FFF] opacity-10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#00C896] opacity-10 blur-[100px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-1">
          <span className="font-display text-2xl font-extrabold text-white">Resolve</span>
          <span className="font-display text-2xl font-extrabold text-[#FF5C00]">Ai</span>
        </div>
        <button onClick={onAdmin} className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition">
          Admin
        </button>
      </nav>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16 pb-24 text-center md:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF5C00]/30 bg-[#FF5C00]/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5C00] animate-pulse" />
          <span className="text-sm text-[#FF5C00] font-medium">Castro · Carambeí · Tibagi</span>
        </div>

        <h1 className="font-display text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Encontre quem<br />
          <span className="text-[#FFD600]">resolve de verdade</span>
        </h1>

        <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
          Profissionais verificados perto de você. Rápido, confiável e sem complicação.
        </p>

        <div className="mt-10 flex items-center justify-center gap-8 md:gap-16">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-white">{s.valor}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-4 text-sm text-white/40 uppercase tracking-widest">O que você precisa?</p>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {categorias.map(cat => (
              <button
                key={cat.nome}
                onClick={() => setCatSelecionada(catSelecionada === cat.nome ? null : cat.nome)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-200
                  ${catSelecionada === cat.nome
                    ? 'border-[#FF5C00] bg-[#FF5C00]/15 scale-105'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-white/70 text-center leading-tight">{cat.nome}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => onBuscar(catSelecionada)}
            className="w-full sm:w-auto rounded-full bg-[#FF5C00] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#FF5C00]/30 hover:bg-[#e05200] transition-all"
          >
            Buscar profissional {catSelecionada ? `· ${catSelecionada}` : ''}
          </button>
          <button className="w-full sm:w-auto rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all">
            Cadastrar meu serviço →
          </button>
        </div>
      </div>
    </section>
  )
}
