import { useEffect, useState } from 'react'

export function usePWAInstall() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar se já está instalado como PWA
    const checkInstalled = () => {
      // Check if running as PWA (standalone mode)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ PWA já está instalado (standalone mode)')
        setIsInstalled(true)
        return true
      }

      // Check for iOS PWA
      if (window.navigator.standalone === true) {
        console.log('✅ PWA já está instalado (iOS)')
        setIsInstalled(true)
        return true
      }

      return false
    }

    // Se já está instalado, não mostra notificação
    if (checkInstalled()) {
      return
    }

    // Listener para beforeinstallprompt (Android Chrome)
    const handleBeforeInstallPrompt = (e) => {
      console.log('📱 beforeinstallprompt detectado')
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    // Listener para appinstalled (quando o usuário instala)
    const handleAppInstalled = () => {
      console.log('✅ App instalado com sucesso!')
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      setIsInstalled(true)
    }

    // Verificar standalone mode quando muda
    const handleDisplayModeChange = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ App está rodando em standalone')
        setIsInstalled(true)
        setShowInstallPrompt(false)
      }
    }

    // Listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayModeChange)

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('❌ Nenhum prompt de instalação disponível')
      return
    }

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      console.log(`Usuário respondeu: ${outcome}`)

      if (outcome === 'accepted') {
        console.log('✅ Usuário aceitou instalação')
        setShowInstallPrompt(false)
        setIsInstalled(true)
      } else {
        console.log('❌ Usuário rejeitou instalação')
      }

      setDeferredPrompt(null)
    } catch (err) {
      console.error('Erro ao instalar:', err)
    }
  }

  const dismissPrompt = () => {
    console.log('👤 Usuário descartou notificação')
    setShowInstallPrompt(false)
  }

  return {
    showInstallPrompt,
    isInstalled,
    installApp,
    dismissPrompt,
    deferredPrompt
  }
}
