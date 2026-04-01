import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useLogo() {
  const [logoUrl, setLogoUrl] = useState(() => {
    // Tentar carregar do localStorage primeiro
    try {
      const cached = localStorage.getItem('chama9_logo_url')
      return cached || '/logo.png'
    } catch {
      return '/logo.png'
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarLogo()
  }, [])

  async function carregarLogo() {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('valor')
        .eq('chave', 'logo_url')
        .single()

      if (!error && data?.valor) {
        // Salvar no localStorage
        try {
          localStorage.setItem('chama9_logo_url', data.valor)
        } catch (e) {
          console.log('localStorage não disponível')
        }

        setLogoUrl(data.valor)
        atualizarFavicon(data.valor)
      }
      
      setLoading(false)
    } catch (err) {
      console.log('Logo: usando fallback padrão')
      setLoading(false)
    }
  }

  function atualizarFavicon(url) {
    try {
      let link = document.querySelector("link[rel*='icon']")
      if (link) {
        link.href = url
      } else {
        link = document.createElement('link')
        link.rel = 'icon'
        link.type = 'image/png'
        link.href = url
        document.head.appendChild(link)
      }
    } catch (err) {
      console.log('Favicon update falhou')
    }
  }

  return { logoUrl, loading, refresh: carregarLogo }
}
