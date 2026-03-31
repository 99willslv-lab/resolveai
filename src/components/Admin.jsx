// Adicionar esta aba no Admin.jsx depois de "Profissionais"

{/* Aba Mensagens */}
<button 
  onClick={() => setTab('mensagens')} 
  className={`pb-4 font-semibold transition ${
    tab === 'mensagens' 
      ? 'text-[#FF5C00] border-b-2 border-[#FF5C00]' 
      : 'text-white/50 hover:text-white'
  }`}
>
  💬 Mensagens
</button>

// Adicionar states:
const [mensagensRecebidas, setMensagensRecebidas] = useState([])
const [filtroStatusMsg, setFiltroStatusMsg] = useState('novo')

// Adicionar no useEffect de carregarDados:
async function carregarMensagens() {
  let query = supabase
    .from('mensagens')
    .select('*, profissionais(nome, categoria)')
    .order('data_criacao', { ascending: false })

  if (filtroStatusMsg !== 'todos') {
    query = query.eq('status', filtroStatusMsg)
  }

  const { data } = await query
  setMensagensRecebidas(data || [])
}

carregarMensagens()

// Adicionar conteúdo da aba Mensagens:
{tab === 'mensagens' && (
  <div>
    <div className="mb-6 flex gap-3">
      <select 
        value={filtroStatusMsg} 
        onChange={e => setFiltroStatusMsg(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#FF5C00]"
      >
        <option value="todos">Todas</option>
        <option value="novo">🆕 Novas</option>
        <option value="respondido">✅ Respondidas</option>
        <option value="arquivado">📦 Arquivadas</option>
      </select>
    </div>

    <div className="space-y-3">
      {mensagensRecebidas.length > 0 ? (
        mensagensRecebidas.map(msg => (
          <div key={msg.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#FF5C00]/40 transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{msg.nome_cliente}</h3>
                <p className="text-xs text-[#FF5C00]">{msg.profissionais?.nome} • {msg.profissionais?.categoria}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                msg.status === 'novo' ? 'bg-yellow-500/20 text-yellow-300' :
                msg.status === 'respondido' ? 'bg-green-500/20 text-green-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {msg.status === 'novo' ? '🆕 Novo' : msg.status === 'respondido' ? '✅ Respondido' : '📦 Arquivado'}
              </span>
            </div>

            <p className="text-white/70 text-sm mb-3 line-clamp-2">{msg.mensagem}</p>

            <div className="flex items-center justify-between mb-3 text-xs text-white/50">
              <span>📱 {msg.telefone_cliente}</span>
              <span>📅 {new Date(msg.data_criacao).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(msg.telefone_cliente)}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-semibold hover:bg-white/20 transition"
              >
                📋 Copiar WhatsApp
              </button>
              <a
                href={`https://wa.me/${msg.telefone_cliente.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#20BA5C] transition text-center"
              >
                💬 Abrir Chat
              </a>
              <select
                value={msg.status}
                onChange={async (e) => {
                  await supabase.from('mensagens').update({ status: e.target.value }).eq('id', msg.id)
                  setMensagensRecebidas(mensagensRecebidas.map(m => m.id === msg.id ? {...m, status: e.target.value} : m))
                }}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none focus:border-[#FF5C00]"
              >
                <option value="novo">Novo</option>
                <option value="respondido">Respondido</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-white/40">
          <p className="text-4xl mb-2">💬</p>
          <p>Nenhuma mensagem {filtroStatusMsg !== 'todos' ? filtroStatusMsg : ''}</p>
        </div>
      )}
    </div>
  </div>
)}
