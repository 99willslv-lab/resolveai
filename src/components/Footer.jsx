export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black/40 to-black/80 border-t border-white/10 mt-20">
      {/* CTA Banner */}
      <div className="bg-[#FF5C00]/10 border-b border-[#FF5C00]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/80 mb-3">Pronto para encontrar um profissional?</p>
          <a href="#" className="inline-block bg-[#FF5C00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e05200] transition">
            💬 Encontrar profissional agora
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          
          {/* Brand & Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">Resolve<span className="text-[#FF5C00]">Ai</span></h3>
            <p className="text-white/60 text-sm mb-4">
              👉 Encontre profissionais em Castro rápido e grátis
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>📍 Castro - PR</span>
            </div>
          </div>

          {/* Menu Principal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-white/60 hover:text-white transition">
              <li><a href="/" className="hover:text-[#FF5C00]">👉 Início</a></li>
              <li><a href="#" className="hover:text-[#FF5C00]">👉 Buscar profissionais</a></li>
              <li><a href="#" className="hover:text-[#FF5C00]">👉 Como funciona</a></li>
              <li><a href="/cadastro" className="hover:text-[#FF5C00]">👉 Cadastrar</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="https://wa.me/5542999999999" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5C00] transition">
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contato@resolveai.com" className="hover:text-[#FF5C00] transition">
                  📧 Email
                </a>
              </li>
            </ul>
          </div>

          {/* Confiança */}
          <div>
            <h4 className="font-semibold text-white mb-4">Confiança</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <span>✔</span>
                <span>Profissionais verificados</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✔</span>
                <span>Avaliações reais</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✔</span>
                <span>Seguro e confiável</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60 hover:text-white transition">
              <li><a href="#" className="hover:text-[#FF5C00]">Termos de serviço</a></li>
              <li><a href="#" className="hover:text-[#FF5C00]">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-[#FF5C00]">Cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2026 ResolveAi. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Disponível em Castro, Carambeí e Tibagi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
