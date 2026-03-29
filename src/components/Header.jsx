import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: '900',
            color: '#16a34a'
          }}
        >
          🚀 ResolveAi
        </button>

        <nav style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flex: 1,
          marginLeft: '40px'
        }}>
          <button onClick={() => navigate('/')} style={{
            background: 'none',
            border: 'none',
            color: '#111827',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            🏠 Início
          </button>
          <button onClick={() => navigate('/messages')} style={{
            background: 'none',
            border: 'none',
            color: '#111827',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            💬 Mensagens
          </button>
          <button onClick={() => navigate('/professional-form')} style={{
            background: 'none',
            border: 'none',
            color: '#111827',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📝 Cadastro
          </button>
        </nav>

        <button
          onClick={() => navigate('/admin/login')}
          style={{
            padding: '8px 16px',
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          🔐 Admin
        </button>
      </div>
    </header>
  )
}
