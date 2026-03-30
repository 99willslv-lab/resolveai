import { Link } from 'react-router-dom'

export default function Header() {
  const styles = {
    header: {
      backgroundColor: '#16a34a',
      color: 'white',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'white'
    },
    nav: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'opacity 0.2s'
    },
    button: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'none'
    }
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🔧 ResolveAi
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Início</Link>
          <Link to="/messages" style={styles.link}>Mensagens</Link>
          <Link to="/professional-form" style={styles.link}>Cadastrar</Link>
          <Link to="/admin/login" style={styles.button}>Admin</Link>
        </nav>
      </div>
    </header>
  )
}
