// MENSAGENS
export const getMessages = async (professionalId = null) => {
  try {
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (professionalId) {
      query = query.eq('professional_id', professionalId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

export const createMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}
