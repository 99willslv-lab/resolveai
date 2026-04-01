import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useLogo() {
  const [logoUrl, setLogoUrl] = useState('/logo.png') // fallback padrão
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarLogo()
  }, [])

  async function carregarLogo() {
    try {
      const { data } = await supabase
        .from('site_config')
        .select('valor')
        .eq('chave', 'logo_url')
        .single()

      if (data?.valor) {
        setLogoUrl(data.valor)
        // Atualizar favicon também
        atualizarFavicon(data.valor)
      }
    } catch (err) {
      console.log('Using default logo')
    } finally {
      setLoading(false)
    }
  }

  function atualizarFavicon(url) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.rel = 'icon'
    link.href = url
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(link)
    }
  }

  return { logoUrl, loading, refresh: carregarLogo }
}
