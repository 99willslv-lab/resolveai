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
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px', color: '#16a34a' }}>
          💬 Gerenciar Mensagens
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Cliente</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Para</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Mensagem</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Tempo</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} style={{
                  borderBottom: '1px solid #e5e7eb',
                  background: msg.status === 'unread' ? '#f0fdf4' : 'white'
                }}>
                  <td style={{ padding: '16px' }}><strong>{msg.client}</strong></td>
                  <td style={{ padding: '16px' }}>{msg.prof}</td>
                  <td style={{ padding: '16px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.message}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      background: msg.status === 'unread' ? '#fef3c7' : '#dcfce7',
                      color: msg.status === 'unread' ? '#b45309' : '#16a34a',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {msg.status === 'unread' ? '🔴 Não lida' : '✓ Lida'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
                    {msg.time}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleReply(msg.id)}
                      style={{
                        background: '#dcfce7',
                        color: '#16a34a',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                    >
                      Responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
