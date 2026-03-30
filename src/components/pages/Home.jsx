import { useState } from 'react'
import ImageSlider from '../components/ImageSlider'
import { mockProfessionals, categories, cities } from '../utils/mockProfessionals'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState(null)

  const filtered = mockProfessionals.filter(p => {
    const matchCategory = !selectedCategory || p.profession === selectedCategory
    const matchCity = !selectedCity || p.city === selectedCity
    return matchCategory && matchCity && p.status === 'active'
  })

  const styles = {
    hero: {
      backgroundColor: '#16a34a',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center',
      marginBottom: '40px'
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    heroDesc: {
      fontSize: '16px',
      opacity: 0.9
    },
    filters: {
      display: 'flex',
      gap: '15px',
      marginBottom: '30px',
      flexWrap: 'wrap'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#374151'
    },
    select: {
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      minWidth: '180px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    cardContent: {
      padding: '15px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    cardProfession: {
      color: '#16a34a',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    cardLocation: {
      color: '#6b7280',
      fontSize: '12px',
      marginBottom: '10px'
    },
    rating: {
      color: '#f59e0b',
      fontSize: '14px',
      marginBottom: '10px'
    },
    price: {
      backgroundColor: '#ecfdf5',
      color: '#16a34a',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      marginBottom: '10px'
    },
    button: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '14px'
    },
    modal: {
      display: selectedProfessional ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    closeButton: {
      float: 'right',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#6b7280',
      background: 'none',
      border: 'none'
    }
  }

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Encontre Profissionais de Confiança</h1>
        <p style={styles.heroDesc}>Resolva seus problemas rápido e fácil</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={styles.filters}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Categoria</label>
            <select
              style={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Cidade</label>
            <select
              style={styles.select}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Todas as cidades</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>
            Nenhum profissional encontrado com esses filtros.
          </p>
        ) : (
          <div style={styles.grid}>
            {filtered.map(prof => (
              <div
                key={prof.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <ImageSlider images={prof.images} />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{prof.name}</h3>
                  <p style={styles.cardProfession}>{prof.profession}</p>
                  <p style={styles.cardLocation}>
                    📍 {prof.neighborhood}, {prof.city}
                  </p>
                  <p style={styles.rating}>
                    ⭐ {prof.rating} ({prof.reviewsCount} avaliações)
                  </p>
                  {prof.pricePerHour && (
                    <p style={styles.price}>R$ {prof.pricePerHour}/hora</p>
                  )}
                  {prof.priceMinimum && (
                    <p style={styles.price}>Mínimo: R$ {prof.priceMinimum}</p>
                  )}
                  <button
                    style={styles.button}
                    onClick={() => setSelectedProfessional(prof)}
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setSelectedProfessional(null)}
          >
            ×
          </button>
          {selectedProfessional && (
            <>
              <ImageSlider images={selectedProfessional.images} />
              <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>
                {selectedProfessional.name}
              </h2>
              <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '15px' }}>
                {selectedProfessional.profession}
              </p>
              <p style={{ marginBottom: '15px' }}>
                {selectedProfessional.description}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Especialidades:</strong> {selectedProfessional.specialties.join(', ')}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Localização:</strong> {selectedProfessional.neighborhood}, {selectedProfessional.city}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Avaliação:</strong> ⭐ {selectedProfessional.rating}
              </p>
              <p style={{ marginBottom: '20px' }}>
                <strong>WhatsApp:</strong> {selectedProfessional.whatsapp}
              </p>
              <a
                href={`https://wa.me/55${selectedProfessional.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.button,
                  display: 'inline-block',
                  textDecoration: 'none',
                  textAlign: 'center',
                  backgroundColor: '#25d366'
                }}
              >
                Conversar no WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
