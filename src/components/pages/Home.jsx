import { useState } from 'react'
import { mockProfessionals, categories, cities } from '../utils/mockProfessionals'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  const [filteredProfs, setFilteredProfs] = useState(mockProfessionals)
  const [selectedCity, setSelectedCity] = useState('Castro')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProf, setSelectedProf] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleFilter = (city, category) => {
    setSelectedCity(city)
    setSelectedCategory(category)
    
    let filtered = mockProfessionals
    if (city) filtered = filtered.filter(p => p.city === city)
    if (category) filtered = filtered.filter(p => p.profession.toLowerCase().includes(category.toLowerCase()))
    setFilteredProfs(filtered)
  }

  return (
    

      {/* Hero */}
      

        

          ResolveAi
        

        


          Encontre profissionais de confiança perto de você
        

        
      


      

        {/* Filtros */}
        

          

            🔧 Categorias
          

          

            {categories.map(cat => (
              

            ))}
          


          

            📍 Cidades
          

          

            {cities.map(city => (
              

            ))}
          

        


        {/* Cards */}
        

          {filteredProfs.map(prof => (
            
 e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              
              
              

                

                  {prof.name}
                

                


                  {prof.profession}
                

                
                


                  📍 {prof.city} - {prof.neighborhood}
                

                
                


                  ⭐ {prof.rating} ({prof.reviewsCount})
                


                


                  R$ {prof.pricePerHour ? prof.pricePerHour + '/hora' : 'Consultar'}
                


                

                  

                  

                

              

            

          ))}
        

      


      {/* Modal */}
      {showModal && selectedProf && (
        
 setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          
 e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '24px'
            }}
          >
            


            

            

              {selectedProf.name}
            

            


              {selectedProf.profession}
            


            


              {selectedProf.description}
            


            

              

Avaliação: ⭐ {selectedProf.rating} ({selectedProf.reviewsCount} reviews)

              

Preço: R$ {selectedProf.pricePerHour ? selectedProf.pricePerHour + '/hora' : 'Consultar'}

              

Cidade: {selectedProf.city}

              

WhatsApp: {selectedProf.whatsapp}

            


            

          

        

      )}
    

  )
}
