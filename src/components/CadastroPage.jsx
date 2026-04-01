import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase.js'

const CATEGORIAS = [
  'Encanador', 'Eletricista', 'Pintor', 'Marceneiro', 'Ar-condicionado',
  'Pedreiro', 'Faxineiro', 'Cabeleireira', 'Advogado', 'Consultor',
  'Limpeza', 'Reparo', 'Outro'
]

const CIDADES = ['Castro', 'Carambeí', 'Tibagi']

export default function CadastroPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [cadastroConcluido, setCadastroConcluido] = useState(false)
  const [previewImagem, setPreviewImagem] = useState(null)
  const [imagemUpload, setImagemUpload] = useState(null)
  
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    cidade: '',
    bio: '',
    preco_min: '',
    preco_max: '',
    telefone: '',
    email: '',
    imagem_url: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErro('')
  }

  function handleImagemUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErro('Apenas arquivos de imagem são permitidos')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro('Imagem não pode exceder 5MB')
      return
    }

    setImagemUpload(file)
    const reader = new FileReader()
    reader.onload = (e) => setPreviewImagem(e.target?.result)
    reader.readAsDataURL(file)
    setErro('')
  }

  function validarStep1() {
    if (!formData.nome.trim()) { setErro('Nome é obrigatório'); return false }
    if (!formData.categoria) { setErro('Profissão é obrigatória'); return false }
    if (!formData.cidade) { setErro('Cidade é obrigatória'); return false }
    return true
  }

  function validarStep2() {
    if (!formData.telefone.trim()) { setErro('Telefone é obrigatório'); return false }
    if (formData.imagem_url.trim()) {
      try { new URL(formData.imagem_url) } catch { setErro('Link de imagem inválido'); return false }
    }
    return true
  }

  async function enviarCadastro() {
    if (!validarStep2()) return
    setLoading(true)
    setErro('')

    try {
      let imagemFinal = formData.imagem_url.trim() || null

      if (imagemUpload) {
        const nomeArquivo = `perfil-${Date.now()}-${Math.random().toString(36).substring(7)}`
        const { error: uploadError } = await supabase.storage
          .from('profissionais')
          .upload(nomeArquivo, imagemUpload)

        if (uploadError) { setErro('Erro ao enviar imagem'); setLoading(false); return }

        const { data: { publicUrl } } = supabase.storage
          .from('profissionais')
          .getPublicUrl(nomeArquivo)
        imagemFinal = publicUrl
      }

      const { error } = await supabase.from('profissionais').insert({
        nome: formData.nome.trim(),
        categoria: formData.categoria,
        cidade: formData.cidade,
        bio: formData.bio.trim() || null,
        preco_min: formData.preco_min ? parseInt(formData.preco_min) : null,
        preco_max: formData.preco_max ? parseInt(formData.preco_max) : null,
        telefone: formData.telefone.trim(),
        email: formData.email.trim() || null,
        imagem_url: imagemFinal,
        avaliacao: 0,
        total_avaliacoes: 0,
        ativo: true,
        status: 'ativo'
      })

      if (error) { setErro(`Erro ao cadastrar: ${error.message}`); setLoading(false); return }

      setCadastroConcluido(true)
      setTimeout(() => {
        setFormData({ nome: '', categoria: '', cidade: '', bio: '', preco_min: '', preco_max: '', telefone: '', email: '', imagem_url: '' })
        setImagemUpload(null)
        setPreviewImagem(null)
        navigate('/')
      }, 3000)
    } catch (err) {
      setErro('Erro ao cadastrar. Tente novamente.')
      setLoading(false)
    }
  }

  if (cadastroConcluido) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1a1a2e] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-white mb-2">Cadastro realizado!</h1>
          <p className="text-white/60">Bem-vindo ao Chama9</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1a1a2e] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-[#22c55e] hover:text-[#16a34a] transition mb-4 inline-block font-semibold">← Voltar</a>
          <h1 className="text-4xl font-black text-white mb-2">Cadastre seu serviço no Chama9</h1>
          <p className="text-white/60">Passo {step} de 2</p>
        </div>

        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full transition ${step >= 1 ? 'bg-[#22c55e]' : 'bg-white/10'}`} />
          <div className={`flex-1 h-2 rounded-full transition ${step >= 2 ? 'bg-[#22c55e]' : 'bg-white/10'}`} />
        </div>

        {erro && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-300 text-sm font-semibold">⚠️ {erro}</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white font-bold mb-2">Nome completo *</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold mb-2">Profissão *</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]">
                  <option value="">Selecione</option>
                  {CATEGORIAS.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Cidade *</label>
                <select name="cidade" value={formData.cidade} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]">
                  <option value="">Selecione</option>
                  {CIDADES.map(cid => (<option key={cid} value={cid}>{cid}</option>))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Sobre você</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Experiência e especialidades..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e] resize-none" />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">📸 Sua foto (opcional)</label>
              <label className="block bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center cursor-pointer hover:bg-white/10 transition">
                <span className="text-white/70 text-sm">📤 Upload de imagem</span>
                <input type="file" accept="image/*" onChange={handleImagemUpload} className="hidden" />
              </label>
              {previewImagem && (
                <div className="mt-3 relative">
                  <img src={previewImagem} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button onClick={() => { setPreviewImagem(null); setImagemUpload(null); }} className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg transition">✕</button>
                </div>
              )}
            </div>

            <button onClick={() => { if (validarStep1()) setStep(2) }} className="w-full bg-[#22c55e] text-black font-bold py-3 rounded-xl hover:bg-[#16a34a] transition active:scale-95">
              Próximo →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold mb-2">Preço mínimo (R$/h)</label>
                <input type="number" name="preco_min" value={formData.preco_min} onChange={handleChange} placeholder="50" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]" />
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Preço máximo (R$/h)</label>
                <input type="number" name="preco_max" value={formData.preco_max} onChange={handleChange} placeholder="150" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]" />
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">WhatsApp *</label>
              <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(42) 99999-9999" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]" />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition">Voltar</button>
              <button onClick={enviarCadastro} disabled={loading} className="flex-1 bg-[#22c55e] text-black font-bold py-3 rounded-xl hover:bg-[#16a34a] transition disabled:opacity-50">
                {loading ? '⏳ Cadastrando...' : '✔️ Concluir'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
