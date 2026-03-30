import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'

const SENHA = 'resolveai2024'

const categorias = ['Encanador','Eletricista','Pintor','Marceneiro','Ar-condicionado','Pedreiro','Faxineira','Mudança']
const cidades = ['Castro','Carambeí','Tibagi']

function Login({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  function tentar() {
    if (senha === SENHA) onLogin()
    else setErro(true)
  }
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl border border-white/10 p-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Admin</h1>
        <p className="text-white/40 text-sm mb-6">ResolveAi</p>
        <input type="password" value={senha} onChange={e => { setSenha(e.target.value); setErro(false) }}
          onKeyDown={e => e.key === 'Enter' && tentar()}
          placeholder="Senha"
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none mb-3 ${erro ? 'border-red-500' : 'border-white/10 focus:border-[#FF5C00]'}`} />
        {erro && <p className="text-red-400 text-xs mb-3">Senha incorreta</p>}
        <button onClick={tentar} className="w-full rounded-full bg-[#FF5C00] py-3 font-semibold text-white hover:bg-[#e05200] transition">
          Entrar
        </button>
      </div>
    </div>
  )
}

function ModalProfissional({ prof, onFechar, onSalvo }) {
  const novo = !prof?.id
  const [form, setForm] = useState({
    nome: prof?.nome || '',
    categoria: prof?.categoria || categorias[0],
    cidade: prof?.cidade || cidades[0],
    bio: prof?.bio || '',
    telefone: prof?.telefone || '',
    preco_min: prof?.preco_min || '',
    preco_max: prof?.preco_max || '',
    ativo: prof?.ativo ?? false,
  })
  const [imagens, setImagens] = useState(prof?.profissional_imagens || [])
  const [uploading, setUploading] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function uploadFoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const nome = `${Date.now()}-${file.name}`
    const { data } = await supabase.storage.from('profissionais').upload(nome, file)
    if (data) {
      const { data: pub } = supabase.storage.from('profissionais').getPublicUrl(nome)
      const url = pub.publicUrl
      if (prof?.id) {
        const { data: img } = await supabase.from('profissional_imagens').insert({ profissional_id: prof.id, url, ordem: imagens.length }).select().single()
        setImagens(i => [...i, img])
      } else {
        setImagens(i => [...i, { url, temp: true }])
      }
    }
    setUploading(false)
  }

  async function adicionarLink() {
    if (!linkUrl.trim()) return
    if (prof?.id) {
      const { data: img } = await supabase.from('profissional_imagens').insert({ profissional_id: prof.id, url: linkUrl, ordem: imagens.length }).select().single()
      setImagens(i => [...i, img])
    } else {
      setImagens(i => [...i, { url: linkUrl, temp: true }])
    }
    setLinkUrl('')
  }

  async function removerImagem(img, i) {
    if (img.id) {
      await supabase.from('profissional_imagens').delete().eq('id', img.id)
    }
    setImagens(imgs => imgs.filter((_, idx) => idx !== i))
  }

  async function salvar() {
    setSalvando(true)
    const payload = {
      nome: form.nome, categoria: form.categoria, cidade: form.cidade,
      bio: form.bio, telefone: form.telefone,
      preco_min: form.preco_min || null, preco_max: form.preco_max || null,
      ativo: form.ativo
    }
    let id = prof?.id
    if (novo) {
      const { data } = await supabase.from('profissionais').insert(payload).select().single()
      id = data.id
      for (const img of imagens) {
        await supabase.from('profissional_imagens').insert({ profissional_id: id, url: img.url, ordem: 0 })
      }
    } else {
      await supabase.from('profissionais').update(payload).eq('id', id)
    }
    setSalvando(false)
    onSalvo()
    onFechar()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-[#1A1A1A] rounded-3xl border border-white/10 p-6 my-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">{novo ? 'Novo profissional' : 'Editar'}</h2>
          <button onClick={onFechar} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <input value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Nome completo *"
            className="input-adm" />

          <div className="grid grid-cols-2 gap-3">
            <select value={form.categoria} onChange={e => set('categoria', e.target.value)} className="input-adm">
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.cidade} onChange={e => set('cidade', e.target.value)} className="input-adm">
              {cidades.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <textarea value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Bio / descrição" rows={3}
            className="input-adm resize-none" />

          <input value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="Telefone / WhatsApp"
            className="input-adm" />

          <div className="grid grid-cols-2 gap-3">
            <input type="number" value={form.preco_min} onChange={e => set('preco_min', e.target.value)} placeholder="Preço mín/h (R$)"
              className="input-adm" />
            <input type="number" value={form.preco_max} onChange={e => set('preco_max', e.target.value)} placeholder="Preço máx/h (R$)"
              className="input-adm" />
          </div>

          {/* Imagens */}
          <div>
            <p className="text-sm text-white/50 mb-2">Imagens do profissional</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {imagens.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                  <img src={img.url} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => removerImagem(img, i)}
                    className="absolute top-0.5 right-0.5 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white">✕</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-2">
              <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="Colar URL da imagem"
                className="flex-1 input-adm text-sm" />
              <button onClick={adicionarLink} className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition">
                Adicionar
              </button>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/50 hover:text-white transition">
              <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
                {uploading ? 'Enviando...' : '📁 Upload foto'}
              </span>
              <input type="file" accept="image/*" onChange={uploadFoto} className="hidden" />
            </label>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => set('ativo', !form.ativo)}
              className={`w-11 h-6 rounded-full transition-all ${form.ativo ? 'bg-[#FF5C00]' : 'bg-white/20'} relative`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.ativo ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-sm text-white/70">{form.ativo ? 'Ativo (visível)' : 'Inativo (oculto)'}</span>
          </label>

          <button onClick={salvar} disabled={salvando || !form.nome}
            className="w-full rounded-full bg-[#FF5C00] py-3 font-semibold text-white hover:bg-[#e05200] transition disabled:opacity-40">
            {salvando ? 'Salvando...' : 'Salvar profissional'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Admin({ onVoltar }) {
  const [logado, setLogado] = useState(false)
  const [aba, setAba] = useState('profissionais')
  const [profissionais, setProfissionais] = useState([])
  const [mensagens, setMensagens] = useState([])
  const [modalProf, setModalProf] = useState(null)
  const [abrirNovo, setAbrirNovo] = useState(false)

  useEffect(() => {
    if (!logado) return
    carregarProfissionais()
    carregarMensagens()
  }, [logado])

  async function carregarProfissionais() {
    const { data } = await supabase.from('profissionais').select('*, profissional_imagens(*)').order('created_at', { ascending: false })
    setProfissionais(data || [])
  }

  async function carregarMensagens() {
    const { data } = await supabase.from('mensagens').select('*, profissionais(nome)').order('created_at', { ascending: false })
    setMensagens(data || [])
  }

  async function toggleAtivo(prof) {
    await supabase.from('profissionais').update({ ativo: !prof.ativo }).eq('id', prof.id)
    carregarProfissionais()
  }

  async function excluir(id) {
    if (!confirm('Excluir profissional?')) return
    await supabase.from('profissionais').delete().eq('id', id)
    carregarProfissionais()
  }

  async function marcarLida(id) {
    await supabase.from('mensagens').update({ lida: true }).eq('id', id)
    carregarMensagens()
  }

  if (!logado) return <Login onLogin={() => setLogado(true)} />

  const naoLidas = mensagens.filter(m => !m.lida).length
  const ativos = profissionais.filter(p => p.ativo).length

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <style>{`.input-adm { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 16px; color: white; width: 100%; font-size: 14px; outline: none; } .input-adm:focus { border-color: #FF5C00; } .input-adm::placeholder { color: rgba(255,255,255,0.3); } select.input-adm option { background: #1A1A1A; }`}</style>

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-white/50 hover:text-white transition text-sm">← Voltar</button>
          <span className="text-white/20">|</span>
          <span className="font-display font-bold text-white">Admin</span>
          <span className="font-display font-bold text-[#FF5C00]">ResolveAi</span>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4 px-6 py-6 md:grid-cols-4">
        {[
          { label: 'Total profissionais', valor: profissionais.length, cor: 'text-white' },
          { label: 'Ativos', valor: ativos, cor: 'text-[#00C896]' },
          { label: 'Mensagens', valor: mensagens.length, cor: 'text-white' },
          { label: 'Não lidas', valor: naoLidas, cor: 'text-[#FF5C00]' },
        ].map(m => (
          <div key={m.label} className="bg-white/5 rounded-2xl border border-white/10 p-4">
            <p className="text-white/40 text-xs mb-1">{m.label}</p>
            <p className={`font-display text-3xl font-extrabold ${m.cor}`}>{m.valor}</p>
          </div>
        ))}
      </div>

      {/* Abas */}
      <div className="flex gap-1 px-6 mb-6">
        {['profissionais', 'mensagens'].map(a => (
          <button key={a} onClick={() => setAba(a)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition capitalize ${aba === a ? 'bg-[#FF5C00] text-white' : 'text-white/50 hover:text-white'}`}>
            {a} {a === 'mensagens' && naoLidas > 0 && <span className="ml-1 bg-white text-[#FF5C00] rounded-full px-1.5 text-xs">{naoLidas}</span>}
          </button>
        ))}
      </div>

      {/* Profissionais */}
      {aba === 'profissionais' && (
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-white">Profissionais</h2>
            <button onClick={() => setAbrirNovo(true)}
              className="rounded-full bg-[#FF5C00] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e05200] transition">
              + Novo
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {profissionais.map(prof => (
              <div key={prof.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                  {prof.profissional_imagens?.[0]
                    ? <img src={prof.profissional_imagens[0].url} className="w-full h-full object-cover" alt="" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">👷</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{prof.nome}</p>
                  <p className="text-xs text-white/40">{prof.categoria} · {prof.cidade}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleAtivo(prof)}
                    className={`text-xs rounded-full px-3 py-1 font-medium transition ${prof.ativo ? 'bg-[#00C896]/20 text-[#00C896]' : 'bg-white/10 text-white/40'}`}>
                    {prof.ativo ? 'Ativo' : 'Inativo'}
                  </button>
                  <button onClick={() => setModalProf(prof)} className="text-white/50 hover:text-white text-sm px-2">✏️</button>
                  <button onClick={() => excluir(prof.id)} className="text-red-400/60 hover:text-red-400 text-sm px-2">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagens */}
      {aba === 'mensagens' && (
        <div className="px-6 pb-12">
          <h2 className="font-display text-xl font-bold text-white mb-4">Mensagens</h2>
          <div className="flex flex-col gap-3">
            {mensagens.map(msg => (
              <div key={msg.id} className={`rounded-2xl border p-4 ${msg.lida ? 'bg-white/3 border-white/5' : 'bg-white/8 border-[#FF5C00]/20'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.lida && <span className="w-2 h-2 rounded-full bg-[#FF5C00] flex-shrink-0" />}
                      <span className="font-semibold text-white text-sm">{msg.nome_cliente}</span>
                      <span className="text-white/30 text-xs">→ {msg.profissionais?.nome}</span>
                    </div>
                    {msg.telefone_cliente && <p className="text-xs text-[#00C896] mb-1">{msg.telefone_cliente}</p>}
                    <p className="text-white/70 text-sm">{msg.mensagem}</p>
                    <p className="text-white/30 text-xs mt-1">{new Date(msg.created_at).toLocaleString('pt-BR')}</p>
                  </div>
                  {!msg.lida && (
                    <button onClick={() => marcarLida(msg.id)}
                      className="text-xs text-white/40 hover:text-white transition flex-shrink-0">✓ lida</button>
                  )}
                </div>
              </div>
            ))}
            {!mensagens.length && <p className="text-white/30 text-center py-8">Nenhuma mensagem ainda</p>}
          </div>
        </div>
      )}

      {(modalProf || abrirNovo) && (
        <ModalProfissional
          prof={abrirNovo ? null : modalProf}
          onFechar={() => { setModalProf(null); setAbrirNovo(false) }}
          onSalvo={carregarProfissionais}
        />
      )}
    </div>
  )
}
