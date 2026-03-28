// PROFISSIONAIS
export const getProfessionals = async () => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('status', 'active')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

export const getProfessionalById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

export const createProfessional = async (professionalData) => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .insert([professionalData])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}
