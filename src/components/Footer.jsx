import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer style={{
      background: '#111827',
      color: '#e5e7eb',
      marginTop: '100px',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '60px',
        marginBottom: '60px'
      }}>
        <div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '900',
            marginBottom: '16px',
            color: '#16a34a'
          }}>
            🚀 ResolveAi
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: '#9ca3af',
            marginBottom: '24px'
          }}>
            Conectando clientes a profissionais. Problemas resolvidos. Rápido.
          </p>
        </div>

        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '800',
            marginBottom: '20px',
            color: 'white'
          }}>
            Para Clientes
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '12px' }}>
              <button onClick={() => navigate('/')} style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                ➤ Buscar Profissionais
              </button>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <button onClick={() => navigate('/')} style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                ➤ Como Funciona
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '800',
            marginBottom: '20px',
            color: 'white'
          }}>
            Contato
          </h4>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 8px 0' }}>
            📧 contato@resolveai.com
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            📱 (11) 98765-4321
          </p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #374151',
        paddingTop: '24px',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <p style={{ margin: 0 }}>
          © 2024 ResolveAi
        </p>
      </div>
    </footer>
  )
}
