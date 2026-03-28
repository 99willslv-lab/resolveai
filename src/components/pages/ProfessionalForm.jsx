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
    

      

        

          🚀 Anuncie seu Serviço
        

        


          Preencha os dados para ser anunciado na plataforma
        


        {submitted && (
          

            ✅ Solicitação enviada com sucesso!
          

        )}

        

          {/* Progress */}
          

            {[1, 2, 3, 4].map(s => (
              

            ))}
          


          {step === 1 && (
            

              

                📋 Dados Básicos
              

              

                
                  Nome Completo *
                
                 handleInputChange('name', e.target.value)}
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
              


              

                
                  Email *
                
                 handleInputChange('email', e.target.value)}
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
              


              

                
                  Telefone/WhatsApp *
                
                 handleInputChange('phone', e.target.value)}
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
              

            

          )}

          {step === 2 && (
            

              

                🔧 Profissão
              

              

                
                  Profissão *
                
                

              


              

                
                  Anos de Experiência *
                
                 handleInputChange('experience', e.target.value)}
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
              


              

                
                  Descrição *
                
                 handleInputChange('bio', e.target.value)}
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

          {/* Botões */}
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
}</code>
            <button class="copy-btn" onclick="copyToClipboard('code7', this)">📋 Copiar</button>
        </div>

        <div style={{
          background: '#dcfce7',
          padding: '40px 20px',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
            <h2 style={{ color: '#16a34a', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>
              ✅ Pronto!
            </h2>
            <p style={{ color: '#374151', margin: 0 }}>
              Copie as 7 páginas acima e cole no seu projeto em src/pages/
            </p>
        </div>
      </div>
    </div>
  </div>

  <script>
    function copyToClipboard(elementId, button) {
      const code = document.getElementById(elementId).textContent;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = '✅ Copiado!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = '📋 Copiar';
          button.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        alert('Erro ao copiar: ' + err);
      });
    }
  </script>
</body>
</html>
