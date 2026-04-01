import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">📝 Solicitações</p>
        <p className="text-4xl font-bold text-[#FF5C00]">{stats.solicitacoes}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">🟢 Em Atendimento</p>
        <p className="text-4xl font-bold text-[#00C896]">{stats.emAtendimento}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">✅ Fechadas</p>
        <p className="text-4xl font-bold text-blue-400">{stats.fechadas}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">💰 Lucro Total</p>
        <p className="text-4xl font-bold text-purple-400">R$ {stats.lucroTotal}</p>
      </div>
    </div>
  )
}

export default function Admin() {
  const [senha, setSenha] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [solicitacoes, setSolicitacoes] = useState([])
  const [stats, setStats] = useState({ solicitacoes: 0, emAtendimento: 0, fechadas: 0, lucroTotal: 0 })
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [editandoId, setEditandoId] = useState(null)
  const [custoProf, setCustoProf] = useState('')
  const [valorCliente, setValorCliente] = useState('')

  function verificarSenha() {
    if (senha === 'resolveai2024') {
      setAutenticado(true)
    } else {
      alert('Senha incorreta')
    }
  }

  useEffect(() => {
    if (!autenticado) return

    async function carregarDados() {
      let query = supabase
        .from('solicitacoes_servico')
        .select('*, profissionais(nome, categoria)', { count: 'exact' })
        .order('data_criacao', { ascending: false })

      if (filtroStatus !== 'todos') {
        query = query.eq('status', filtroStatus)
      }

      const { data: solic, count: countSolic } = await query

      setSolicitacoes(solic || [])

      const emAtendimento = (solic || []).filter(s => s.status === 'atendimento').length
      const fechadas = (solic || []).filter(s => s.status === 'fechado').length
      const lucroTotal = (solic || [])
        .filter(s => s.status === 'fechado' && s.valor_cliente && s.custo_profissional)
        .reduce((sum, s) => sum + (parseFloat(s.valor_cliente) - parseFloat(s.custo_profissional)), 0)

      setStats({
        solicitacoes: countSolic || 0,
        emAtendimento,
        fechadas,
        lucroTotal: Math.round(lucroTotal)
      })
    }

    carregarDados()
  }, [autenticado, filtroStatus])

  async function atualizarStatus(id, novoStatus) {
    await supabase.from('solicitacoes_servico').update({ status: novoStatus }).eq('id', id)
    setSolicitacoes(solicitacoes.map(s => s.id === id ? {...s, status: novoStatus} : s))
  }

  async function salvarValores(id) {
    await supabase.from('solicitacoes_servico').update({
      custo_profissional: custoProf ? parseFloat(custoProf) : null,
      valor_cliente: valorCliente ? parseFloat(valorCliente) : null
    }).eq('id', id)
    setSolicitacoes(solicitacoes.map(s => s.id === id ? {
      ...s,
      custo_profissional: custoProf ? parseFloat(custoProf) : null,
      valor_cliente: valorCliente ? parseFloat(valorCliente) : null
    } : s))
    setEditandoId(null)
    setCustoProf('')
    setValorCliente('')
  }

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm w-full">
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-white/50 mb-6">ResolveAi</p>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verificarSenha()}
            placeholder="Senha"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00] mb-4"
          />
          <button
            onClick={verificarSenha}
            className="w-full rounded-full bg-[#FF5C00] py-3 text-white font-semibold hover:bg-[#e05200] transition"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
            <a href="/" className="text-white/50 hover:text-white transition text-sm mt-2 inline-block">
              ← Voltar para home
            </a>
          </div>
          <button onClick={() => { setAutenticado(false); setSenha('') }} className="text-white/50 hover:text-white transition">
            Sair
          </button>
        </div>

        <DashboardStats stats={stats} />

        <div className="mb-6">
          <select
            value={filtroStatus}
            onChange={e => setFiltroStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]"
          >
            <option value="todos">Todas</option>
            <option value="novo">🆕 Novas</option>
            <option value="atendimento">🟢 Em Atendimento</option>
            <option value="fechado">✅ Fechadas</option>
            <option value="cancelado">❌ Canceladas</option>
          </select>
        </div>

        <div className="space-y-3">
          {solicitacoes.length > 0 ? (
            solicitacoes.map(sol => (
              <div key={sol.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{sol.nome_cliente}</h3>
                    <p className="text-xs text-[#FF5C00]">
                      {sol.profissionais?.nome} • {sol.profissionais?.categoria}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    sol.status === 'novo' ? 'bg-yellow-500/20 text-yellow-300' :
                    sol.status === 'atendimento' ? 'bg-green-500/20 text-green-300' :
                    sol.status === 'fechado' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {sol.status === 'novo' ? '🆕 Novo' : sol.status === 'atendimento' ? '🟢 Atendimento' : sol.status === 'fechado' ? '✅ Fechado' : '❌ Cancelado'}
                  </span>
                </div>

                <p className="text-white/70 text-sm mb-3">{sol.descricao_servico}</p>

                <div className="text-xs text-white/50 mb-3">
                  📱 {sol.telefone_cliente} • 📅 {new Date(sol.data_criacao).toLocaleDateString('pt-BR')}
                </div>

                <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white/50">Custo Prof</p>
                    <p className="text-white font-semibold">{sol.custo_profissional ? `R$ ${sol.custo_profissional}` : '-'}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white/50">Valor Cliente</p>
                    <p className="text-white font-semibold">{sol.valor_cliente ? `R$ ${sol.valor_cliente}` : '-'}</p>
                  </div>
                  <div className="bg-[#00C896]/10 rounded-lg p-2">
                    <p className="text-white/50">Lucro</p>
                    <p className="text-[#00C896] font-semibold">
                      {sol.custo_profissional && sol.valor_cliente ? `R$ ${Math.round(sol.valor_cliente - sol.custo_profissional)}` : '-'}
                    </p>
                  </div>
                </div>

                {editandoId === sol.id && (
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Custo Prof"
                      value={custoProf}
                      onChange={e => setCustoProf(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#FF5C00]"
                    />
                    <input
                      type="number"
                      placeholder="Valor Cliente"
                      value={valorCliente}
                      onChange={e => setValorCliente(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#FF5C00]"
                    />
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigator.clipboard.writeText(sol.telefone_cliente)}
                    className="bg-white/10 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-white/20 transition"
                  >
                    📋 Copiar
                  </button>
                  <a
                    href={`https://wa.me/${sol.telefone_cliente.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#20BA5C] transition"
                  >
                    💬 Chat
                  </a>
                  {editandoId === sol.id ? (
                    <>
                      <button
                        onClick={() => salvarValores(sol.id)}
                        className="bg-green-500/20 text-green-300 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-500/30 transition"
                      >
                        ✅ Salvar
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        className="bg-white/10 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-white/20 transition"
                      >
                        ❌ Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditandoId(sol.id)
                        setCustoProf(sol.custo_profissional || '')
                        setValorCliente(sol.valor_cliente || '')
                      }}
                      className="bg-[#FF5C00]/20 text-[#FF5C00] px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#FF5C00]/30 transition"
                    >
                      ✏️ Valores
                    </button>
                  )}
                  <select
                    value={sol.status}
                    onChange={e => atualizarStatus(sol.id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none focus:border-[#FF5C00]"
                  >
                    <option value="novo">Novo</option>
                    <option value="atendimento">Atendimento</option>
                    <option value="fechado">Fechado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-white/40">
              <p className="text-4xl mb-2">📝</p>
              <p>Nenhuma solicitação</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
