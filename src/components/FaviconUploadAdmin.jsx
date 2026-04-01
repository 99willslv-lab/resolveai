import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'

export default function FaviconUploadAdmin() {
  const [faviconUrl, setFaviconUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    carregarFavicon()
  }, [])

  async function carregarFavicon() {
    try {
      const { data } = await supabase
        .from('site_config')
        .select('valor')
        .eq('chave', 'favicon_url')
        .single()

      if (data?.valor) {
        setFaviconUrl(data.valor)
      }
    } catch (err) {
      console.log('Favicon não configurado ainda')
    }
  }

  async function handleFaviconUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErro('❌ Apenas imagens permitidas')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro('❌ Máximo 5MB')
      return
    }

    setLoading(true)
    setErro('')
    setSucesso('')

    try {
      // Preview local
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result)
      reader.readAsDataURL(file)

      // Upload para Supabase Storage - bucket 'profissionais'
      const nomeArquivo = `favicon-${Date.now()}-${Math.random().toString(36).substring(7)}`
      const { error: uploadError } = await supabase.storage
        .from('profissionais')
        .upload(nomeArquivo, file)

      if (uploadError) {
        setErro('❌ Erro ao enviar: ' + uploadError.message)
        setLoading(false)
        return
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('profissionais')
        .getPublicUrl(nomeArquivo)

      // Salvar no banco de dados
      const { error: dbError } = await supabase
        .from('site_config')
        .upsert({
          chave: 'favicon_url',
          valor: publicUrl,
          updated_at: new Date()
        }, { onConflict: 'chave' })

      if (dbError) {
        setErro('❌ Erro ao salvar: ' + dbError.message)
        setLoading(false)
        return
      }

      setFaviconUrl(publicUrl)

      // Atualizar favicon no navegador
      atualizarFaviconNoBrowser(publicUrl)

      setSucesso('✅ Favicon atualizado! Recarregando...')
      setLoading(false)

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setErro('❌ Erro: ' + err.message)
      setLoading(false)
    }
  }

  function atualizarFaviconNoBrowser(url) {
    // Remover favicon antigo
    let link = document.querySelector("link[rel*='icon']")
    if (link) {
      link.remove()
    }

    // Adicionar novo favicon
    link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = url
    document.head.appendChild(link)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">🔰 Upload de FAVICON</h3>

      {erro && <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3"><p className="text-red-300 text-sm font-semibold">{erro}</p></div>}
      {sucesso && <div className="mb-4 bg-green-500/20 border border-green-500/50 rounded-lg p-3"><p className="text-green-300 text-sm font-semibold">{sucesso}</p></div>}

      <div className="mb-6">
        <label className="block text-white/70 text-sm font-semibold mb-3">📤 Selecione uma imagem PNG (32x32)</label>
        <label className="block bg-white/5 border-2 border-dashed border-white/20 rounded-xl px-6 py-8 text-center cursor-pointer hover:bg-white/10 hover:border-[#22c55e]/50 transition">
          <span className="text-white/70 text-sm">📤 Clique para enviar ou arraste a imagem</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFaviconUpload}
            disabled={loading}
            className="hidden"
          />
        </label>

        {preview && (
          <div className="mt-4">
            <p className="text-white/50 text-xs mb-2">Preview:</p>
            <img src={preview} alt="Preview" className="h-8 w-8 object-contain rounded-lg bg-white/10 p-1" />
          </div>
        )}

        {faviconUrl && !preview && (
          <div className="mt-4">
            <p className="text-white/50 text-xs mb-2">Favicon atual (aparece na aba do navegador):</p>
            <img src={faviconUrl} alt="Favicon" className="h-8 w-8 object-contain rounded-lg bg-white/10 p-1" />
          </div>
        )}
      </div>

      <div className="bg-white/5 rounded-lg p-4 text-xs text-white/60 space-y-1">
        <p className="font-semibold text-white/70">ℹ️ Informações:</p>
        <p>• Favicon aparece na aba do navegador e PWA</p>
        <p>• Dimensões ideais: 32x32px, 64x64px ou 192x192px</p>
        <p>• Formatos: PNG (recomendado) ou ICO</p>
        <p>• Máximo: 5MB</p>
        <p>• Se PNG, recomenda-se fundo transparente</p>
      </div>
    </div>
  )
}
