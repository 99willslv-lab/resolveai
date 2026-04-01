import { usePWAInstall } from '../hooks/usePWAInstall'

export default function PWAInstallPrompt() {
  const { showInstallPrompt, installApp, dismissPrompt, isInstalled } = usePWAInstall()

  // Não mostra se já está instalado
  if (!showInstallPrompt || isInstalled) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
          {/* Conteúdo */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-1">
              📱 Instale o Chama9
            </h3>
            <p className="text-white/80 text-xs sm:text-sm">
              Acesso rápido direto na tela inicial do seu celular
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={dismissPrompt}
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              Agora não
            </button>
            <button
              onClick={installApp}
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/30 hover:bg-white/40 text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <span>📥</span>
              <span>Instalar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
