import { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabase.js'

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">👷 Profissionais</p>
        <p className="text-4xl font-bold text-[#FF5C00]">{stats.profissionais}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">💬 Mensagens</p>
        <p className="text-4xl font-bold text-[#00C896]">{stats.mensagens}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">📍 Cidades</p>
        <p className="text-4xl font-bold text-blue-400">{stats.cidades}</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm mb-2">👁️ Visualizações</p>
        <p className="text-4xl font-bold text-purple-400">{stats.visualizacoes}</p>
      </div>
    </div>
  )
}

function EditarInlineModal({ prof, onSalvar, onFechar }) {
  const [form, setForm] = useState(prof)
  const [salvando, setSalvando] = useState(false)

  async function salvar() {
    setSalvando(true)
    const { error } = await supabase
      .from('profissionais')
      .update({
        nome: form.nome,
        categoria: form.categoria,
        cidade: form.cidade,
        bio: form.bio,
        preco_min: form.preco_min ? parseInt(form.preco_min) : null,
        preco_max: form.preco_max ? parseInt(form.preco_max) : null,
        status: form.status
      })
      .eq('id', form.id)

    if (!error) {
      onSalvar(form)
      onFechar()
    }
    setSalvando(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-3xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Editar Profissional</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Nome</label>
            <input type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Profissão</label>
              <input type="text" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]" />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Cidade</label>
              <input type="text" value={form.cidade} onChange={e => setForm({...form, cidade: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]" />
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Bio</label>
            <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows="3" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Preço Min (R$)</label>
              <input type="number" value={form.preco_min || ''} onChange={e => setForm({...form, preco_min: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]" />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Preço Max (R$)</label>
              <input type="number" value={form.preco_max || ''} onChange={e => setForm({...form, preco_max: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]" />
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Status</label>
            <select value={form.status || 'ativo'} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]">
              <option value="ativo">🟢 Ativo</option>
              <option value="inativo">🔴 Inativo</option>
              <option value="ocupado">🟡 Ocupado</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onFechar} className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition">Cancelar</button>
          <button onClick={salvar} disabled={salvando} className="flex-1 bg-[#FF5C00] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#e05200] transition disabled:opacity-50">💾 Salvar</button>
        </div>
      </div>
    </div>
  )
}

function UploadFotoModal({ prof, onFechar, onSalvar }) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${prof.id}-${Date.now()}`
    
    const { error: uploadError } = await supabase.storage
      .from('profissionais')
      .upload(fileName, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('profissionais')
        .getPublicUrl(fileName)

      await supabase
        .from('profissional_imagens')
        .insert({ profissional_id: prof.id, url: publicUrl })

      onSalvar()
      onFechar()
    }
    setUploading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl border border-white/10 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Upload de Foto</h2>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full bg-[#FF5C00] text-white py-3 rounded-xl font-semibold hover:bg-[#e05200] transition disabled:opacity-50">
          {uploading ? 'Enviando...' : '📸 Selecionar Foto'}
        </button>
        <button onClick={onFechar} className="w-full mt-3 bg-white/10 text-white py-2 rounded-xl font-semibold hover:bg-white/20 transition">Fechar</button>
      </div>
    </div>
  )
}

export default function Admin() {
  const [senha, setSenha] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [profissionais, setProfissionais] = useState([])
  const [tab, setTab] = useState('profissionais')
  const [stats, setStats] = useState({ profissionais: 0, mensagens: 0, cidades: 0, visualizacoes: 0 })
  const [modalEditar, setModalEditar] = useState(null)
  const [modalFoto, setModalFoto] = useState(null)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [ordenacao, setOrdenacao] = useState('avaliacao')

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
        .from('profissionais')
        .select('*, profissional_imagens(*)', { count: 'exact' })

      const { data: profs, count } = await query

      let filtered = profs || []

      if (busca) {
        filtered = filtered.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.categoria.toLowerCase().includes(busca.toLowerCase()))
      }

      if (filtroStatus !== 'todos') {
        filtered = filtered.filter(p => p.status === filtroStatus || (!p.status && filtroStatus === 'ativo'))
      }

      if (filtroCategoria) {
        filtered = filtered.filter(p => p.categoria === filtroCategoria)
      }

      if (ordenacao === 'avaliacao') {
        filtered.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0))
      } else if (ordenacao === 'preco_min') {
        filtered.sort((a, b) => (a.preco_min || 0) - (b.preco_min || 0))
      } else if (ordenacao === 'avaliacoes_count') {
        filtered.sort((a, b) => (b.total_avaliacoes || 0) - (a.total_avaliacoes || 0))
      }

      setProfissionais(filtered)

      const { count: msgCount } = await supabase
        .from('mensagens')
        .select('*', { count: 'exact', head: true })

      const { data: cidades } = await supabase
        .from('profissionais')
        .select('cidade')
        .then(r => ({ data: [...new Set((r.data || []).map(p => p.cidade))] }))

      setStats({
        profissionais: count || 0,
        mensagens: msgCount || 0,
        cidades: cidades?.length || 0,
        visualizacoes: Math.floor(Math.random() * 10000)
      })
    }

    carregarDados()
  }, [autenticado, busca, filtroStatus, filtroCategoria, ordenacao])

  async function deletarProf(id) {
    if (!confirm('Tem certeza que quer deletar?')) return
    await supabase.from('profissionais').delete().eq('id', id)
    setProfissionais(profissionais.filter(p => p.id !== id))
  }

  async function desativarProf(id, ativo) {
    await supabase.from('profissionais').update({ ativo: !ativo }).eq('id', id)
    setProfissionais(profissionais.map(p => p.id === id ? {...p, ativo: !ativo} : p))
  }

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm w-full">
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-white/50 mb-6">ResolveAi</p>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && verificarSenha()} placeholder="Senha" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00] mb-4" />
          <button onClick={verificarSenha} className="w-full rounded-full bg-[#FF5C00] py-3 text-white font-semibold hover:bg-[#e05200] transition">Entrar</button>
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
            <a href="/" className="text-white/50 hover:text-white transition text-sm mt-2 inline-block">← Voltar para home</a>
          </div>
          <button onClick={() => { setAutenticado(false); setSenha('') }} className="text-white/50 hover:text-white transition">Sair</button>
        </div>

        <DashboardStats stats={stats} />

        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button onClick={() => setTab('profissionais')} className={`pb-4 font-semibold transition ${tab === 'profissionais' ? 'text-[#FF5C00] border-b-2 border-[#FF5C00]' : 'text-white/50 hover:text-white'}`}>
            Profissionais
          </button>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="🔍 Buscar nome ou profissão..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5C00]"
          />
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]">
              <option value="todos">Todos os Status</option>
              <option value="ativo">🟢 Ativo</option>
              <option value="inativo">🔴 Inativo</option>
              <option value="ocupado">🟡 Ocupado</option>
            </select>

            <input type="text" value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} placeholder="Profissão..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF5C00]" />

            <select value={ordenacao} onChange={e => setOrdenacao(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]">
              <option value="avaliacao">⭐ Mais Avaliados</option>
              <option value="avaliacoes_count">🔥 Mais Avaliações</option>
              <option value="preco_min">💰 Mais Baratos</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profissionais.map(prof => {
            const statusIcon = prof.status === 'inativo' ? '🔴' : prof.status === 'ocupado' ? '🟡' : '🟢'
            return (
              <div key={prof.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF5C00]/40 transition">
                <div className="relative h-40 bg-gradient-to-br from-white/10 to-white/5">
                  {prof.profissional_imagens?.length > 0 ? (
                    <img src={prof.profissional_imagens[0].url} alt={prof.nome} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">👷</div>
                  )}
                  <div className="absolute top-2 right-2 text-2xl">{statusIcon}</div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-white text-lg mb-1">{prof.nome}</h3>
                  <p className="text-xs text-[#FF5C00] mb-2">{prof.categoria} • {prof.cidade}</p>

                  {prof.total_avaliacoes > 20 && <p className="text-xs text-[#FF5C00] mb-2">🔥 {prof.total_avaliacoes}+ atendimentos</p>}

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => (<span key={i} className={`text-sm ${i <= Math.round(prof.avaliacao) ? 'text-[#FFD600]' : 'text-white/20'}`}>★</span>))}</div>
                    <span className="text-xs text-white/50">({prof.total_avaliacoes})</span>
                  </div>

                  <p className="text-xs text-[#00C896] font-bold mb-3">R$ {prof.preco_min}–{prof.preco_max}/h</p>

                  <div className="space-y-2">
                    <button onClick={() => setModalEditar(prof)} className="w-full bg-[#FF5C00]/20 text-[#FF5C00] py-2 rounded-lg text-xs font-semibold hover:bg-[#FF5C00]/30 transition">✏️ Editar</button>
                    <button onClick={() => setModalFoto(prof)} className="w-full bg-white/5 text-white py-2 rounded-lg text-xs font-semibold hover:bg-white/10 transition">📸 Foto</button>
                    <button onClick={() => desativarProf(prof.id, prof.ativo)} className="w-full bg-white/5 text-white py-2 rounded-lg text-xs font-semibold hover:bg-white/10 transition">{prof.ativo ? '🔴 Desativar' : '🟢 Ativar'}</button>
                    <button onClick={() => deletarProf(prof.id)} className="w-full bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition">🗑️ Deletar</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {modalEditar && <EditarInlineModal prof={modalEditar} onFechar={() => setModalEditar(null)} onSalvar={(updated) => { setProfissionais(profissionais.map(p => p.id === updated.id ? updated : p)); setModalEditar(null) }} />}
      {modalFoto && <UploadFotoModal prof={modalFoto} onFechar={() => setModalFoto(null)} onSalvar={() => { setProfissionais([...profissionais]) }} />}
    </div>
  )
}
