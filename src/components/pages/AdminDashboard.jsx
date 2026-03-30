import { useNavigate } from 'react-router-dom'
import { mockProfessionals } from '../utils/mockProfessionals'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('adminLoggedIn')

  if (!isLoggedIn) {
    navigate('/admin/login')
    return null
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#dc2626',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#16a34a',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
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
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Painel Admin</h1>
        <button
          style={styles.button}
          onClick={() => {
            localStorage.removeItem('adminLoggedIn')
            navigate('/admin/login')
          }}
        >
          Sair
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{mockProfessionals.length}</div>
          <div style={styles.statLabel}>Profissionais</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{mockProfessionals.filter(p => p.status === 'active').length}</div>
          <div style={styles.statLabel}>Ativos</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{Math.round(mockProfessionals.reduce((acc, p) => acc + p.rating, 0) / mockProfessionals.length * 10) / 10}</div>
          <div style={styles.statLabel}>Avaliação Média</div>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Profissionais Cadastrados</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Profissão</th>
            <th style={styles.th}>Cidade</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mockProfessionals.map(prof => (
            <tr key={prof.id}>
              <td style={styles.td}>{prof.name}</td>
              <td style={styles.td}>{prof.profession}</td>
              <td style={styles.td}>{prof.city}</td>
              <td style={styles.td}>
                <span style={{
                  backgroundColor: prof.status === 'active' ? '#d1fae5' : '#fee2e2',
                  color: prof.status === 'active' ? '#065f46' : '#7f1d1d',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {prof.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td style={styles.td}>
                <button style={{ ...styles.button, marginRight: '10px' }}>Editar</button>
                <button style={{ ...styles.button, backgroundColor: '#f97316' }}>Bloquear</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
