import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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

export const updateMessageStatus = async (messageId, status) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', messageId)
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

// REVIEWS
export const getReviews = async (professionalId) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

export const createReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

// AUTENTICAÇÃO
export const loginAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data.user
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

export const logoutAdmin = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  } catch (error) {
    console.error('Erro:', error)
    return false
  }
}

// PESQUISA
export const searchProfessionals = async (filters) => {
  try {
    let query = supabase
      .from('professionals')
      .select('*')
      .eq('status', 'active')
    
    if (filters.city) {
      query = query.eq('city', filters.city)
    }
    
    if (filters.profession) {
      query = query.ilike('profession', `%${filters.profession}%`)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}
