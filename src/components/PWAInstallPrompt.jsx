import { usePWAInstall } from '../hooks/usePWAInstall'

export default function PWAInstallPrompt() {
  const { showInstallPrompt, installApp, dismissPrompt } = usePWAInstall()

  if (!showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] shadow-2xl border-t-2 border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Chama9" 
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Texto */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                Instale o Chama9
              </h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Acesso rápido direto na sua tela inicial
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={dismissPrompt}
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95"
            >
              Agora não
            </button>
            <button
              onClick={installApp}
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/30 hover:bg-white/40 text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <span>📥</span>
              <span className="hidden sm:inline">Instalar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
