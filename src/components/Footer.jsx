export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f172a]/50 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* CTA Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#22c55e]/20 to-[#16a34a]/20 border border-[#22c55e]/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Precisa de um profissional agora?</h3>
          <p className="text-white/70 mb-4">Faça uma solicitação em menos de 1 minuto e receba propostas rapidinho.</p>
          <a href="/" className="inline-block bg-[#22c55e] text-black px-6 py-3 rounded-full font-bold hover:bg-[#16a34a] transition">
            💬 Chamar agora
          </a>
        </div>

        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">Chama9</span>
              <p className="text-white/60 text-sm mt-2">Plataforma de intermediação de serviços locais em Castro - PR</p>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Conectando você aos melhores profissionais com rapidez, segurança e sem complicação.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-white/50 hover:text-[#22c55e] transition">
                🔗
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-bold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#22c55e] transition">Eletricista em Castro</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Encanador em Castro</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Pintor em Castro</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Marceneiro</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Ar-condicionado</a></li>
            </ul>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white font-bold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-[#22c55e] transition">Início</a></li>
              <li><a href="/cadastro" className="hover:text-[#22c55e] transition">Cadastrar</a></li>
              <li><a href="/admin" className="hover:text-[#22c55e] transition">Admin</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Como funciona</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Contato</a></li>
            </ul>
          </div>

          {/* Locais */}
          <div>
            <h4 className="text-white font-bold mb-4">Cidades</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#22c55e] transition">Castro - PR</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Carambeí - PR</a></li>
              <li><a href="#" className="hover:text-[#22c55e] transition">Tibagi - PR</a></li>
            </ul>
          </div>
        </div>

        {/* Confiança */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <h4 className="text-white font-bold mb-4">Por que confiar no Chama9</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✔️</span>
              <div>
                <p className="text-white font-semibold text-sm">Profissionais verificados</p>
                <p className="text-white/60 text-xs">Todos passam por análise rigorosa</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-white font-semibold text-sm">Avaliações reais</p>
                <p className="text-white/60 text-xs">Feedback de clientes verificados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-white font-semibold text-sm">Intermediação segura</p>
                <p className="text-white/60 text-xs">Toda comunicação passa pela plataforma</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white/40">
          <p>© 2024 Chama9 - Serviços locais em Castro - PR. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#22c55e] transition">Termos de uso</a>
            <a href="#" className="hover:text-[#22c55e] transition">Privacidade</a>
            <a href="#" className="hover:text-[#22c55e] transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
