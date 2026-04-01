import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.js'

export default function LogoUploadAdmin() {
  const [logoUrl, setLogoUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarLogos()
  }, [])

  async function carregarLogos() {
    try {
      const { data } = await supabase.from('site_config').select('*').eq('chave', 'logo_url').single()
      if (data?.valor) setLogoUrl(data.valor)

      const { data: favicon } = await supabase.from('site_config').select('*').eq('chave', 'favicon_url').single()
      if (favicon?.valor) setFaviconUrl(favicon.valor)
    } catch (err) {
      console.log('Config ainda não existe')
    }
  }

  async function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErro('Apenas imagens permitidas')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro('Máximo 5MB')
      return
    }

    setLoading(true)
    setErro('')
    setSucesso('')

    try {
      const nomeArquivo = `logo-${Date.now()}`
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(nomeArquivo, file, { upsert: true })

      if (uploadError) {
        setErro('Erro ao enviar logo')
        setLoading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(nomeArquivo)

      // Salvar URL no banco
      await supabase.from('site_config').upsert({
        chave: 'logo_url',
        valor: publicUrl,
        updated_at: new Date()
      }, { onConflict: 'chave' })

      setLogoUrl(publicUrl)
      setSucesso('✅ Logo atualizado com sucesso!')

      // Atualizar favicon também
      atualizarFavicon(file)

      setTimeout(() => {
        setSucesso('')
        window.location.reload()
      }, 2000)
    } catch (err) {
      setErro('Erro: ' + err.message)
      setLoading(false)
    }
  }

  async function atualizarFavicon(file) {
    try {
      const nomeArquivo = `favicon-${Date.now()}`
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(nomeArquivo, file, { upsert: true })

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(nomeArquivo)

        await supabase.from('site_config').upsert({
          chave: 'favicon_url',
          valor: publicUrl,
          updated_at: new Date()
        }, { onConflict: 'chave' })

        setFaviconUrl(publicUrl)
      }
    } catch (err) {
      console.log('Favicon update failed:', err)
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
      <h3 className="text-white font-bold text-lg mb-4">🎨 Logo & Favicon</h3>

      {erro && <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3"><p className="text-red-300 text-sm">{erro}</p></div>}
      {sucesso && <div className="mb-4 bg-green-500/20 border border-green-500/50 rounded-lg p-3"><p className="text-green-300 text-sm">{sucesso}</p></div>}

      <div className="mb-6">
        <label className="block text-white/70 text-sm font-semibold mb-3">Logo (PNG/JPG - máx 5MB)</label>
        <label className="block bg-white/5 border border-white/10 rounded-xl px-4 py-6 text-center cursor-pointer hover:bg-white/10 transition">
          <span className="text-white/70 text-sm">📤 Clique para enviar novo logo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={loading}
            className="hidden"
          />
        </label>

        {logoUrl && (
          <div className="mt-4">
            <p className="text-white/50 text-xs mb-2">Preview atual:</p>
            <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain rounded-lg bg-white/10 p-2" />
            <p className="text-white/40 text-xs mt-2">O logo será atualizado no header, footer e PWA</p>
          </div>
        )}
      </div>

      <div className="bg-white/5 rounded-lg p-4 text-xs text-white/60">
        <p className="font-semibold text-white/70 mb-2">📌 Informações:</p>
        <ul className="space-y-1">
          <li>• Logo aparece no topo (header) e rodapé (footer)</li>
          <li>• Favicon é usado no navegador e aba do celular</li>
          <li>• PWA usa o logo ao instalar no celular</li>
          <li>• Dimensões recomendadas: 800x300px ou maior</li>
          <li>• Formatos: PNG (fundo transparente) ou JPG</li>
        </ul>
      </div>
    </div>
  )
}
