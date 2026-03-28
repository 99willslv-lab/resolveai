import { mockProfessionals } from '../utils/mockProfessionals'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total de Profissionais', value: mockProfessionals.length, icon: '👥' },
    { label: 'Ativos Hoje', value: mockProfessionals.filter(p => p.status === 'active').length, icon: '🟢' },
    { label: 'Solicitações Pendentes', value: 5, icon: '📝' },
    { label: 'Mensagens Não Lidas', value: 12, icon: '💬' }
  ]

  return (
    

      

        

          📊 Dashboard Admin
        


        {/* Stats */}
        

          {stats.map((stat, idx) => (
            

              


                {stat.icon} {stat.label}
              

              


                {stat.value}
              

            

          ))}
        


        {/* Tabs */}
        

          

            {['Visão Geral', 'Profissionais', 'Mensagens', 'Solicitações'].map((tab, idx) => (
              

            ))}
          


          

            

              Profissionais Ativos
            

            
            
                {mockProfessionals.map(prof => (
                  
                ))}
              

              
                
                  Nome
                  	Profissão
                  	Cidade
                  	Rating
                  	Ações
                

              
              
                    {prof.name}
                    	{prof.profession}
                    	{prof.city}
                    	⭐ {prof.rating}
                    	
                      

                      

                    
                  

            

          

        

      

    

  )
}
