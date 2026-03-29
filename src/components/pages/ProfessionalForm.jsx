import { useState } from 'react'

export default function ProfessionalForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    city: 'Castro',
    experience: '',
    bio: '',
    price: '',
    whatsapp: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      minHeight: '100vh',
      padding: '40px 16px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '900',
          color: 'white',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          🚀 Anuncie seu Serviço
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Preencha os dados para ser anunciado na plataforma
        </p>

        {submitted && (
          <div style={{
            background: '#dcfce7',
            color: '#16a34a',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            ✅ Solicitação enviada com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{
                height: '6px',
                background: s <= step ? '#16a34a' : '#e5e7eb',
                borderRadius: '3px',
                transition: 'all 0.3s'
              }} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#16a34a' }}>
                📋 Dados Básicos
              </h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 98765-4321"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#16a34a' }}>
                🔧 Profissão
              </h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Profissão *
                </label>
                <select
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option>Selecione uma profissão</option>
                  <option>Encanador</option>
                  <option>Eletricista</option>
                  <option>Limpeza</option>
                  <option>Pintura</option>
                  <option>Carpinteiro</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Anos de Experiência *
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Ex: 10"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Descrição *
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Descreva sua experiência..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    minHeight: '100px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#16a34a' }}>
                📍 Localização
              </h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Cidade *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option>Castro</option>
                  <option>Carambeí</option>
                  <option>Tibagi</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  Preço/Hora *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Ex: 80"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#16a34a' }}>
                ✅ Confirmar
              </h2>
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '16px',
                fontSize: '13px'
              }}>
                <p><strong>Nome:</strong> {formData.name}</p>
                <p><strong>Profissão:</strong> {formData.profession}</p>
                <p><strong>Cidade:</strong> {formData.city}</p>
                <p><strong>Preço/Hora:</strong> R$ {formData.price}</p>
              </div>

              <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
                <input type="checkbox" required />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  Concordo com os Termos de Serviço
                </span>
              </label>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f3f4f6',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Voltar
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Enviar Solicitação
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
