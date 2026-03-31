// Adicionar este componente em Admin.jsx antes do export padrão

function GerenciadorFotos({ prof, onFechar, onSalvar }) {
  const [fotos, setFotos] = useState(prof.profissional_imagens || [])
  const [uploading, setUploading] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const fileRef = useRef(null)

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${prof.id}-${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    const { error: uploadError } = await supabase.storage
      .from('profissionais')
      .upload(fileName, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('profissionais')
        .getPublicUrl(fileName)

      const { data, error: insertError } = await supabase
        .from('profissional_imagens')
        .insert({ profissional_id: prof.id, url: publicUrl })
        .select()

      if (!insertError && data) {
        setFotos([...fotos, ...data])
      }
    }
    setUploading(false)
    fileRef.current.value = ''
  }

  async function deletarFoto(id) {
    if (!confirm('Deletar essa foto?')) return
    
    await supabase.from('profissional_imagens').delete().eq('id', id)
    setFotos(fotos.filter(f => f.id !== id))
  }

  async function reordenarFotos(fromIdx, toIdx) {
    const novaOrdem = [...fotos]
    const [moved] = novaOrdem.splice(fromIdx, 1)
    novaOrdem.splice(toIdx, 0, moved)
    setFotos(novaOrdem)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#1A1A1A] rounded-3xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">📸 Gerenciar Fotos</h2>

        {/* Upload */}
        <div className="mb-6">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full bg-[#FF5C00] text-white py-3 rounded-xl font-semibold hover:bg-[#e05200] transition disabled:opacity-50 mb-4"
          >
            {uploading ? '⏳ Enviando...' : '➕ Adicionar Foto'}
          </button>
          <p className="text-xs text-white/50 text-center">Máximo 5 fotos por profissional</p>
        </div>

        {/* Fotos */}
        {fotos.length > 0 ? (
          <div className="space-y-3 mb-6">
            {fotos.map((foto, idx) => (
              <div
                key={foto.id}
                draggable
                onDragStart={() => setDraggingId(idx)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => {
                  if (draggingId !== null && draggingId !== idx) {
                    reordenarFotos(draggingId, idx)
                    setDraggingId(null)
                  }
                }}
                className={`group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing transition ${
                  draggingId === idx ? 'opacity-50' : ''
                }`}
              >
                <img src={foto.url} alt="Foto" className="w-full h-32 object-cover" />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <span className="text-2xl">🔄</span>
                  <button
                    onClick={() => deletarFoto(foto.id)}
                    className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded transition"
                  >
                    🗑️
                  </button>
                </div>

                {idx === 0 && (
                  <div className="absolute top-2 left-2 bg-[#FF5C00] text-white px-2 py-1 rounded text-xs font-semibold">
                    ⭐ Capa
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-white/40">
            <p className="text-4xl mb-2">📷</p>
            <p className="text-sm">Nenhuma foto. Adicione uma!</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={onFechar}
            className="flex-1 bg-white/10 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onSalvar()
              onFechar()
            }}
            className="flex-1 bg-[#FF5C00] text-white py-2 rounded-lg font-semibold hover:bg-[#e05200] transition"
          >
            ✔️ Pronto
          </button>
        </div>
      </div>
    </div>
  )
}

// No card da ADM, trocar o botão de foto por:
<button
  onClick={() => setModalGerenciadorFotos(prof)}
  className="w-full bg-white/5 text-white py-2 rounded-lg text-xs font-semibold hover:bg-white/10 transition"
>
  📸 Gerenciar Fotos ({prof.profissional_imagens?.length || 0})
</button>

// Adicionar state:
const [modalGerenciadorFotos, setModalGerenciadorFotos] = useState(null)

// Adicionar modal no final:
{modalGerenciadorFotos && (
  <GerenciadorFotos
    prof={modalGerenciadorFotos}
    onFechar={() => setModalGerenciadorFotos(null)}
    onSalvar={() => setProfissionais([...profissionais])}
  />
)}
