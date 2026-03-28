import { useState } from 'react'

export default function AdminMessages() {
  const [messages, setMessages] = useState([
    { id: 1, client: 'João Silva', prof: 'Maria Oliveira', message: 'Preciso de um encanador urgente...', status: 'unread', time: '5 min' },
    { id: 2, client: 'Carlos Pereira', prof: 'João Silva', message: 'Qual é o melhor horário?', status: 'read', time: '30 min' },
    { id: 3, client: 'Ana Costa', prof: 'Carlos Pereira', message: 'Pode vir hoje?', status: 'unread', time: '2h' }
  ])

  const handleReply = (id) => {
    alert('Responder à mensagem ' + id)
  }

  return (
    

      

        

          💬 Gerenciar Mensagens
        


        

          
              {messages.map(msg => (
                
              ))}
            

            
              
                Cliente
                	Para
                	Mensagem
                	Status
                	Tempo
                	Ações
              

            
            
                  {msg.client}
                  	{msg.prof}
                  	
                    {msg.message}
                  
                  	
                    
                      {msg.status === 'unread' ? '🔴 Não lida' : '✓ Lida'}
                    
                  
                  	
                    {msg.time}
                  
                  	
                    

                  
                

          

        

      

    

  )
}
