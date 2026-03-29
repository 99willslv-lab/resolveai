import { useState } from 'react'
import { mockProfessionals } from '../utils/mockProfessionals'

export default function AdminProfessionals() {
  const [profs, setProfs] = useState(mockProfessionals)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = profs.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.profession.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#16a34a', margin: 0 }}>
            👥 Gerenciar Profissionais
          </h1>
          <button style={{
            background: '#16a34a',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700'
          }}>
            ➕ Novo Profissional
          </button>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <input
            type="text"
            placeholder="🔍 Buscar profissional..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '24px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>Nome</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>Profissão</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>Cidade</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '700' }}>Rating</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '700' }}>Contatos</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '700' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(prof => (
                <tr key={prof.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}><strong>{prof.name}</strong></td>
                  <td style={{ padding: '12px' }}>{prof.profession}</td>
                  <td style={{ padding: '12px' }}>{prof.city}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>⭐ {prof.rating}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>📞 {Math.floor(Math.random() * 20) + 5}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button style={{
                      background: '#dcfce7',
                      color: '#16a34a',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                      marginRight: '4px'
                    }}>
                      ✏️ Editar
                    </button>
                    <button style={{
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      🚫 Bloquear
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
