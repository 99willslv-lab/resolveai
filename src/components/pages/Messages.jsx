import { useState } from 'react'

export default function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'João Silva', message: 'Olá, você consegue fazer reparos hidráulicos?', date: '2024-01-15' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    setMessages([...messages, {
      id: messages.length + 1,
      name: 'Você',
      message: newMessage,
      date: new Date().toLocaleDateString()
    }])
    setNewMessage('')
  }

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '250px 1fr',
      gap: '20px',
      height: '600px'
    },
    sidebar: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflowY: 'auto'
    },
    sidebarTitle: {
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    chat: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    messages: {
      flex: 1,
      overflowY: 'auto',
      marginBottom: '15px'
    },
    message: {
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#f3f4f6',
      borderRadius: '4px'
    },
    inputGroup: {
      display: 'flex',
      gap: '10px'
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '14px'
    },
    button: {
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Conversas</h3>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>João Silva</p>
      </div>

      <div style={styles.chat}>
        <div style={styles.messages}>
          {messages.map(msg => (
            <div key={msg.id} style={styles.message}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{msg.name}</p>
              <p style={{ fontSize: '14px', marginBottom: '5px' }}>{msg.message}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>{msg.date}</p>
            </div>
          ))}
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            style={styles.input}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite uma mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button style={styles.button} onClick={handleSendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
