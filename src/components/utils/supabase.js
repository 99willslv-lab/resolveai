import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funções de exemplo
export async function getProfessionals() {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('status', 'active')
  
  if (error) console.error('Erro:', error)
  return data
}

export async function createMessage(message) {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
  
  if (error) console.error('Erro:', error)
  return data
}

export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) console.error('Erro:', error)
  return data
}
