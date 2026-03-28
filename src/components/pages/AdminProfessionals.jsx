import { useState } from 'react'
import { mockProfessionals } from '../utils/mockProfessionals'

export default function AdminProfessionals() {
  const [profs, setProfs] = useState(mockProfessionals)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = profs.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.profession.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    

      

        

          

            👥 Gerenciar Profissionais
          

          

        


        

           setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '24px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          
              {filtered.map(prof => (
                
              ))}
            

            
              
                Nome
                	Profissão
                	Cidade
                	Rating
                	Contatos
                	Ações
              

            
            
                  {prof.name}
                  	{prof.profession}
                  	{prof.city}
                  	⭐ {prof.rating}
                  	📞 {Math.floor(Math.random() * 20) + 5}
                  	
                    

                    

                  
                

          

        

      

    

  )
}
