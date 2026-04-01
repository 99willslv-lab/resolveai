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
      const { data, error } = await supabase
        .from('site_config')
        .select('valor')
        .eq('chave', 'logo_url')
        .single()

      if (error) {
        console.log('Logo não encontrado, usando default')
        setLoading(false)
        return
      }

      if (data?.valor) {
        setLogoUrl(data.valor)
        // Atualizar favicon também
        atualizarFavicon(data.valor)
      }
      
      setLoading(false)
    } catch (err) {
      console.log('Erro ao carregar logo:', err.message)
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
        link.href = url
        document.head.appendChild(link)
      }
    } catch (err) {
      console.log('Erro ao atualizar favicon:', err.message)
    }
  }

  return { logoUrl, loading, refresh: carregarLogo }
}
