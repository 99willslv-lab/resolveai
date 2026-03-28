import { useState } from 'react'

export default function Messages() {
  const [conversations, setConversations] = useState([
    { id: 1, name: 'João Silva', lastMessage: 'Olá! Preciso de um encanador...', time: '5 min', unread: 2 },
    { id: 2, name: 'Maria Oliveira', lastMessage: 'Qual é seu disponibilidade?', time: '30 min', unread: 0 },
    { id: 3, name: 'Carlos Pereira', lastMessage: 'Obrigado pelo serviço!', time: '2h', unread: 0 }
  ])
  
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  return (
    

      {/* Sidebar */}
      

        

          
        


        

          {conversations.map(conv => (
            

          ))}
        

      


      {/* Chat */}
      

        {/* Header */}
        

          

            {selectedChat.name}
          

          
            💬 WhatsApp
          
        


        {/* Messages */}
        

          

            Olá! Preciso de um encanador urgente
          

          

            Oi! Posso ir em 2 horas
          

          

            Perfeito! Qual é o endereço?
          

        


        {/* Input */}
        

           setMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          

        

      

    

  )
}
