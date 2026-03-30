import { useState } from 'react'

export default function AdminMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      clientName: 'Pedro Santos',
      profissional: 'João Silva',
      message: 'Qual é o preço para um reparo hidráulico?',
      status: 'unread',
      date: '2024-01-15'
    },
    {
      id: 2,
      clientName: 'Maria Silva',
      profissional: 'Maria Oliveira',
      message: 'Posso agendar uma limpeza para próxima semana?',
      status: 'read',
      date: '2024-01-14'
    }
  ])

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'read' } : msg
    ))
  }

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    th: {
      backgroundColor: '#f3f4f6',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    td: {
      padding: '12px',
      borderTop: '1px solid #e5e7eb'
    },
    unread: {
      fontWeight: 'bold',
      backgroundColor: '#eff6ff'
    },
    badge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: '8px'
    },
    unreadBadge: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    readBadge: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    button: {
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      marginRight: '8px'
    },
    markButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciar Mensagens</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Cliente</th>
            <th style={styles.th}>Profissional</th>
            <th style={styles.th}>Mensagem</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Data</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr
              key={msg.id}
              style={msg.status === 'unread' ? styles.unread : {}}
            >
              <td style={styles.td}>{msg.clientName}</td>
              <td style={styles.td}>{msg.profissional}</td>
              <td style={styles.td}>{msg.message}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.badge,
                    ...(msg.status === 'unread' ? styles.unreadBadge : styles.readBadge)
                  }}
                >
                  {msg.status === 'unread' ? 'Não lida' : 'Lida'}
                </span>
              </td>
              <td style={styles.td}>{msg.date}</td>
              <td style={styles.td}>
                {msg.status === 'unread' && (
                  <button
                    style={{ ...styles.button, ...styles.markButton }}
                    onClick={() => handleMarkAsRead(msg.id)}
                  >
                    Marcar como lida
                  </button>
                )}
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(msg.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {messages.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
          Nenhuma mensagem encontrada.
        </p>
      )}
    </div>
  )
}
