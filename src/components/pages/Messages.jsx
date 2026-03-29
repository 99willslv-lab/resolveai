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
    <div style={{
      background: 'white',
      minHeight: 'calc(100vh - 120px)',
      display: 'grid',
      gridTemplateColumns: '350px 1fr',
      overflow: 'hidden'
    }}>
      <div style={{
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        background: '#f9fafb'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <input
            type="text"
            placeholder="Buscar conversa..."
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv)}
              style={{
                width: '100%',
                padding: '16px',
                background: selectedChat.id === conv.id ? '#dcfce7' : 'transparent',
                border: 'none',
                borderLeft: selectedChat.id === conv.id ? '4px solid #16a34a' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <div style={{ fontWeight: '700', color: '#111827', fontSize: '14px', marginBottom: '4px' }}>
                {conv.name}
                {conv.unread > 0 && (
                  <span style={{
                    background: '#16a34a',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginLeft: '8px'
                  }}>
                    {conv.unread}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {conv.lastMessage}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>
            {selectedChat.name}
          </h2>
          <a href={`https://wa.me/5511987654321`} target="_blank" rel="noopener noreferrer" style={{
            background: '#25d366',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            textDecoration: 'none'
          }}>
            💬 WhatsApp
          </a>
        </div>

        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            background: '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            maxWidth: '70%',
            fontSize: '13px'
          }}>
            Olá! Preciso de um encanador urgente
          </div>
          <div style={{
            background: '#16a34a',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            maxWidth: '70%',
            fontSize: '13px',
            marginLeft: 'auto'
          }}>
            Oi! Posso ir em 2 horas
          </div>
          <div style={{
            background: '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            maxWidth: '70%',
            fontSize: '13px'
          }}>
            Perfeito! Qual é o endereço?
          </div>
        </div>

        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <button
            onClick={handleSend}
            style={{
              background: '#16a34a',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '13px'
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
