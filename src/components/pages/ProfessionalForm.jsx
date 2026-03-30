import { useState } from 'react'

export default function ProfessionalForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    city: '',
    neighborhood: '',
    phone: '',
    email: '',
    whatsapp: '',
    instagram: '',
    description: '',
    pricePerHour: '',
    priceMinimum: '',
    specialties: '',
    availabilityDays: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    alert('Profissional cadastrado com sucesso!')
    setStep(1)
    setFormData({
      name: '',
      profession: '',
      city: '',
      neighborhood: '',
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      description: '',
      pricePerHour: '',
      priceMinimum: '',
      specialties: '',
      availabilityDays: ''
    })
  }

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    progressBar: {
      marginBottom: '30px'
    },
    progress: {
      height: '4px',
      backgroundColor: '#e5e7eb',
      borderRadius: '2px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#16a34a',
      width: `${(step / 4) * 100}%`,
      transition: 'width 0.3s'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    group: {
      marginBottom: '15px'
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      boxSizing: 'border-box',
      minHeight: '100px',
      fontFamily: 'inherit'
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      marginTop: '30px'
    },
    button: {
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      flex: 1
    },
    prevButton: {
      backgroundColor: '#d1d5db',
      color: '#1f2937'
    },
    nextButton: {
      backgroundColor: '#16a34a',
      color: 'white'
    },
    submitButton: {
      backgroundColor: '#16a34a',
      color: 'white'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastrar Serviço Profissional</h1>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Passo {step} de 4</p>

      <div style={styles.progressBar}>
        <div style={styles.progress}>
          <div style={styles.progressFill}></div>
        </div>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        {/* PASSO 1: Informações Básicas */}
        {step === 1 && (
          <>
            <div style={styles.group}>
              <label style={styles.label}>Nome Completo</label>
              <input
                type="text"
                name="name"
                style={styles.input}
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Profissão</label>
              <input
                type="text"
                name="profession"
                style={styles.input}
                value={formData.profession}
                onChange={handleChange}
                placeholder="Ex: Encanador, Eletricista"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Descrição</label>
              <textarea
                name="description"
                style={styles.textarea}
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva sua experiência e serviços"
              />
            </div>
          </>
        )}

        {/* PASSO 2: Localização */}
        {step === 2 && (
          <>
            <div style={styles.group}>
              <label style={styles.label}>Cidade</label>
              <select
                name="city"
                style={styles.input}
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma cidade</option>
                <option value="Castro">Castro</option>
                <option value="Carambeí">Carambeí</option>
                <option value="Tibagi">Tibagi</option>
              </select>
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Bairro</label>
              <input
                type="text"
                name="neighborhood"
                style={styles.input}
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Seu bairro"
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Especialidades</label>
              <input
                type="text"
                name="specialties"
                style={styles.input}
                value={formData.specialties}
                onChange={handleChange}
                placeholder="Separar por vírgula"
              />
            </div>
          </>
        )}

        {/* PASSO 3: Preços */}
        {step === 3 && (
          <>
            <div style={styles.group}>
              <label style={styles.label}>Preço por Hora (R$)</label>
              <input
                type="number"
                name="pricePerHour"
                style={styles.input}
                value={formData.pricePerHour}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Preço Mínimo (R$)</label>
              <input
                type="number"
                name="priceMinimum"
                style={styles.input}
                value={formData.priceMinimum}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Dias Disponíveis</label>
              <input
                type="text"
                name="availabilityDays"
                style={styles.input}
                value={formData.availabilityDays}
                onChange={handleChange}
                placeholder="Ex: Seg, Ter, Qua, Qui, Sex"
              />
            </div>
          </>
        )}

        {/* PASSO 4: Contato */}
        {step === 4 && (
          <>
            <div style={styles.group}>
              <label style={styles.label}>Telefone</label>
              <input
                type="tel"
                name="phone"
                style={styles.input}
                value={formData.phone}
                onChange={handleChange}
                placeholder="(42) 98765-4321"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                style={styles.input}
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(42) 98765-4321"
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Instagram</label>
              <input
                type="text"
                name="instagram"
                style={styles.input}
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@seuinstagram"
              />
            </div>
          </>
        )}

        <div style={styles.buttons}>
          {step > 1 && (
            <button
              type="button"
              style={{ ...styles.button, ...styles.prevButton }}
              onClick={handlePrev}
            >
              Anterior
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              style={{ ...styles.button, ...styles.nextButton }}
              onClick={handleNext}
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
            >
              Enviar Cadastro
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
