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
        {/* Coluna 1: Sobre */}
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
            Conectando clientes a profissionais de confiança. Problemas resolvidos. Rápido.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              f
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              📷
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              💬
            </a>
          </div>
        </div>

        {/* Coluna 2: Para Clientes */}
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
            {[
              { label: 'Buscar Profissionais', action: '/' },
              { label: 'Como Funciona', action: '#' },
              { label: 'FAQ', action: '#' },
              { label: 'Contato', action: '#' }
            ].map((item, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <button
                  onClick={() => navigate(item.action)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  ➤ {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3: Para Profissionais */}
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '800',
            marginBottom: '20px',
            color: 'white'
          }}>
            Para Profissionais
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { label: 'Cadastrar-se', action: '/professional-form' },
              { label: 'Como Ganhar Mais', action: '#' },
              { label: 'Suporte', action: '#' },
              { label: 'Políticas', action: '#' }
            ].map((item, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <button
                  onClick={() => navigate(item.action)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  ➤ {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '800',
            marginBottom: '20px',
            color: 'white'
          }}>
            Contato
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <p style={{ margin: '0 0 8px 0', color: '#9ca3af' }}>
              📧 contato@resolveai.com
            </p>
            <p style={{ margin: '0 0 8px 0', color: '#9ca3af' }}>
              📱 (11) 98765-4321
            </p>
            <p style={{ margin: '0 0 8px 0', color: '#9ca3af' }}>
              📍 Castro, Carambeí, Tibagi - PR
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        borderTop: '1px solid #374151',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <p style={{ margin: 0 }}>
          © 2024 ResolveAi. Todos os direitos reservados.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>
            Termos de Serviço
          </a>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>
            Privacidade
          </a>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>
            Cookies
          </a>
        </div>
      </div>
    </footer>
  )
}
