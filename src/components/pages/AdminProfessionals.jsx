import { useState } from 'react'
import { mockProfessionals } from '../utils/mockProfessionals'

export default function AdminProfessionals() {
  const [professionals, setProfessionals] = useState(mockProfessionals)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = professionals.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.profession.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBlock = (id) => {
    setProfessionals(professionals.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'blocked' : 'active' } : p
    ))
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    searchBox: {
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      maxWidth: '400px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '14px'
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
    button: {
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      marginRight: '8px'
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    blockButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    unblockButton: {
      backgroundColor: '#10b981',
      color: 'white'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gerenciar Profissionais</h1>
        
        <div style={styles.searchBox}>
          <input
            type="text"
            style={styles.input}
            placeholder="Buscar por nome ou profissão..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Profissão</th>
            <th style={styles.th}>Cidade</th>
            <th style={styles.th}>Avaliação</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(prof => (
            <tr key={prof.id}>
              <td style={styles.td}>{prof.name}</td>
              <td style={styles.td}>{prof.profession}</td>
              <td style={styles.td}>{prof.city}</td>
              <td style={styles.td}>⭐ {prof.rating}</td>
              <td style={styles.td}>
                <span style={{
                  backgroundColor: prof.status === 'active' ? '#d1fae5' : '#fee2e2',
                  color: prof.status === 'active' ? '#065f46' : '#7f1d1d',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {prof.status === 'active' ? 'Ativo' : 'Bloqueado'}
                </span>
              </td>
              <td style={styles.td}>
                <button style={{ ...styles.button, ...styles.editButton }}>
                  Editar
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...(prof.status === 'active' ? styles.blockButton : styles.unblockButton)
                  }}
                  onClick={() => handleBlock(prof.id)}
                >
                  {prof.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
          Nenhum profissional encontrado.
        </p>
      )}
    </div>
  )
}
