export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#1f2937',
      color: '#f3f4f6',
      padding: '40px 20px',
      marginTop: '40px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px'
    },
    section: {
      marginBottom: '20px'
    },
    heading: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#16a34a'
    },
    link: {
      display: 'block',
      color: '#d1d5db',
      textDecoration: 'none',
      marginBottom: '8px',
      fontSize: '14px'
    },
    copyright: {
      textAlign: 'center',
      paddingTop: '20px',
      marginTop: '30px',
      borderTop: '1px solid #374151',
      fontSize: '12px',
      color: '#9ca3af'
    }
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>Sobre</h3>
          <p style={{ color: '#d1d5db', fontSize: '14px' }}>
            ResolveAi conecta você com profissionais qualificados de confiança.
          </p>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.heading}>Links Rápidos</h3>
          <a href="/" style={styles.link}>Início</a>
          <a href="/professional-form" style={styles.link}>Cadastrar Serviço</a>
          <a href="/messages" style={styles.link}>Mensagens</a>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.heading}>Contato</h3>
          <a href="mailto:contato@resolveai.com" style={styles.link}>contato@resolveai.com</a>
          <a href="tel:+5542998765432" style={styles.link}>(42) 99876-5432</a>
        </div>
      </div>
      
      <div style={styles.copyright}>
        <p>&copy; 2024 ResolveAi. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
