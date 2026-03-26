import React, { useState, useEffect } from 'react';
import { MapPin, Star, Search, Filter, X, Phone, MessageCircle, Heart } from 'lucide-react';

const ServicesPWA = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedService, setSelectedService] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Dados mock - substitua por API real
  const mockServices = [
    {
      id: 1,
      name: 'João Silva',
      category: 'encanador',
      title: 'Encanador Profissional',
      rating: 4.8,
      reviews: 24,
      price: 'R$ 80/hora',
      image: '🔧',
      bio: 'Mais de 15 anos de experiência em reparos e instalações',
      distance: '2.3 km',
      available: true,
      phone: '(11) 99999-0001',
      tags: ['24h', 'Urgente', 'Garantia']
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      category: 'limpeza',
      title: 'Serviço de Limpeza',
      rating: 4.9,
      reviews: 47,
      price: 'R$ 100-150',
      image: '🧹',
      bio: 'Limpeza profissional com produtos eco-friendly',
      distance: '1.8 km',
      available: true,
      phone: '(11) 99999-0002',
      tags: ['Eco-friendly', 'Agendamento rápido']
    },
    {
      id: 3,
      name: 'Carlos Pereira',
      category: 'eletricista',
      title: 'Eletricista Certificado',
      rating: 4.7,
      reviews: 32,
      price: 'R$ 70/hora',
      image: '⚡',
      bio: 'Especializado em instalações e manutenção elétrica',
      distance: '3.1 km',
      available: true,
      phone: '(11) 99999-0003',
      tags: ['Certificado', 'CREA']
    },
    {
      id: 4,
      name: 'Ana Costa',
      category: 'manutencao',
      title: 'Manutenção Geral',
      rating: 4.6,
      reviews: 18,
      price: 'R$ 60/hora',
      image: '🔨',
      bio: 'Reparos e manutenção predial em geral',
      distance: '2.9 km',
      available: true,
      phone: '(11) 99999-0004',
      tags: ['Rápido', 'Confiável']
    },
    {
      id: 5,
      name: 'Roberto Souza',
      category: 'pintura',
      title: 'Pintor Profissional',
      rating: 4.9,
      reviews: 56,
      price: 'R$ 50-80/m²',
      image: '🎨',
      bio: 'Pintura residencial e comercial com acabamento premium',
      distance: '4.2 km',
      available: false,
      phone: '(11) 99999-0005',
      tags: ['Premium', 'Portfolio']
    },
    {
      id: 6,
      name: 'Juliana Lima',
      category: 'limpeza',
      title: 'Limpeza Especializada',
      rating: 4.8,
      reviews: 39,
      price: 'R$ 120-180',
      image: '🧼',
      bio: 'Limpeza de piscinas, vidros e áreas externas',
      distance: '3.5 km',
      available: true,
      phone: '(11) 99999-0006',
      tags: ['Piscina', 'Vidros', 'Áreas externas']
    },
    {
      id: 7,
      name: 'Fernando Alves',
      category: 'encanador',
      title: 'Encanador 24h',
      rating: 4.7,
      reviews: 28,
      price: 'R$ 90/hora',
      image: '🚰',
      bio: 'Atendimento 24 horas, vazamentos e instalações',
      distance: '2.1 km',
      available: true,
      phone: '(11) 99999-0007',
      tags: ['24h', 'Urgência', 'Rápido']
    },
    {
      id: 8,
      name: 'Patricia Gomes',
      category: 'manutencao',
      title: 'Manutenção de Ar',
      rating: 4.9,
      reviews: 44,
      price: 'R$ 150',
      image: '❄️',
      bio: 'Limpeza, manutenção e reparo de ar condicionado',
      distance: '2.7 km',
      available: true,
      phone: '(11) 99999-0008',
      tags: ['Ar-condicionado', 'Garantia']
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos', icon: '🏠' },
    { id: 'encanador', label: 'Encanador', icon: '🔧' },
    { id: 'eletricista', label: 'Eletricista', icon: '⚡' },
    { id: 'limpeza', label: 'Limpeza', icon: '🧹' },
    { id: 'pintura', label: 'Pintura', icon: '🎨' },
    { id: 'manutencao', label: 'Manutenção', icon: '🔨' }
  ];

  useEffect(() => {
    setServices(mockServices);
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let filtered = services;

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered.sort((a, b) => b.rating - a.rating));
  }, [searchTerm, selectedCategory, services]);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)',
      minHeight: '100vh',
      color: '#f0f9ff',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.8) 100%)',
        borderBottom: '1px solid rgba(59,130,246,0.2)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        animation: 'slideDown 0.6s ease-out'
      }}>
        <style>{`
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
            50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
          }
          .service-card {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .service-card:nth-child(1) { animation-delay: 0.1s; }
          .service-card:nth-child(2) { animation-delay: 0.2s; }
          .service-card:nth-child(3) { animation-delay: 0.3s; }
          .service-card:nth-child(4) { animation-delay: 0.4s; }
          .service-card:nth-child(5) { animation-delay: 0.5s; }
          .service-card:nth-child(6) { animation-delay: 0.6s; }
          .service-card:nth-child(7) { animation-delay: 0.7s; }
          .service-card:nth-child(8) { animation-delay: 0.8s; }
          .service-card:hover {
            transform: translateY(-8px) scale(1.02);
          }
        `}</style>

        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '4px',
            background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🏘️ Procuro Alguém
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Encontre profissionais de confiança perto de você
          </p>
        </div>

        {/* Search */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              color: '#64748b',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Buscar profissional ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                background: 'rgba(30,41,59,0.8)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '8px',
                color: '#f0f9ff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.8)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.3)'}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '10px 12px',
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '8px',
              color: '#0ea5e9',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(59,130,246,0.4)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(59,130,246,0.2)'}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollBehavior: 'smooth'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 14px',
                background: selectedCategory === cat.id
                  ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                  : 'rgba(30,41,59,0.8)',
                border: selectedCategory === cat.id
                  ? 'none'
                  : '1px solid rgba(59,130,246,0.3)',
                borderRadius: '20px',
                color: '#f0f9ff',
                cursor: 'pointer',
                fontSize: '13px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                fontWeight: selectedCategory === cat.id ? '600' : '500'
              }}
              onMouseEnter={(e) => !selectedCategory === cat.id && (e.target.style.background = 'rgba(30,41,59,0.95)')}
              onMouseLeave={(e) => !selectedCategory === cat.id && (e.target.style.background = 'rgba(30,41,59,0.8)')}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '16px', maxWidth: '100%' }}>
        {filteredServices.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p>Nenhum serviço encontrado</p>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>Tente ajustar seus filtros</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => setSelectedService(service)}
                style={{
                  background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative gradient bg */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)',
                  pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Avatar */}
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px',
                    textAlign: 'center'
                  }}>
                    {service.image}
                  </div>

                  {/* Name & Title */}
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 2px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    margin: '0 0 8px 0'
                  }}>
                    {service.title}
                  </p>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '8px',
                    fontSize: '12px'
                  }}>
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontWeight: '600' }}>{service.rating}</span>
                    <span style={{ color: '#64748b' }}>({service.reviews})</span>
                  </div>

                  {/* Distance */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    <MapPin size={12} />
                    {service.distance}
                  </div>

                  {/* Price */}
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#38bdf8',
                    marginBottom: '8px'
                  }}>
                    {service.price}
                  </div>

                  {/* Status */}
                  <div style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    background: service.available
                      ? 'rgba(34,197,94,0.2)'
                      : 'rgba(239,68,68,0.2)',
                    color: service.available ? '#86efac' : '#fca5a5',
                    borderRadius: '4px',
                    textAlign: 'center',
                    marginBottom: '8px'
                  }}>
                    {service.available ? '✓ Disponível' : '✗ Indisponível'}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(service.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '6px',
                      background: isFavorite(service.id)
                        ? 'rgba(239,68,68,0.2)'
                        : 'rgba(59,130,246,0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      color: isFavorite(service.id) ? '#ef4444' : '#64748b',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Heart
                      size={14}
                      fill={isFavorite(service.id) ? 'currentColor' : 'none'}
                    />
                    {isFavorite(service.id) ? 'Favorito' : 'Favoritar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 50,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              background: 'linear-gradient(180deg, #1a1f3a 0%, #0f172a 100%)',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px 16px 32px',
              maxHeight: '85vh',
              overflowY: 'auto',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>

            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(59,130,246,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0ea5e9',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(59,130,246,0.4)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(59,130,246,0.2)'}
            >
              <X size={20} />
            </button>

            {/* Avatar */}
            <div style={{
              fontSize: '64px',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {selectedService.image}
            </div>

            {/* Name & Rating */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '4px',
              textAlign: 'center'
            }}>
              {selectedService.name}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#94a3b8',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              {selectedService.title}
            </p>

            {/* Rating Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <span style={{ fontWeight: '600' }}>{selectedService.rating}</span>
              </div>
              <div style={{ color: '#64748b' }}>
                {selectedService.reviews} avaliações
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                background: 'rgba(30,41,59,0.6)',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>
                  Preço
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedService.price}
                </p>
              </div>
              <div style={{
                background: 'rgba(30,41,59,0.6)',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>
                  Distância
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedService.distance}
                </p>
              </div>
            </div>

            {/* Bio */}
            <p style={{
              fontSize: '14px',
              color: '#cbd5e1',
              lineHeight: '1.6',
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(59,130,246,0.1)',
              borderRadius: '8px',
              borderLeft: '3px solid rgba(59,130,246,0.5)'
            }}>
              {selectedService.bio}
            </p>

            {/* Tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {selectedService.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '12px',
                    padding: '6px 10px',
                    background: 'rgba(59,130,246,0.2)',
                    color: '#0ea5e9',
                    borderRadius: '12px',
                    border: '1px solid rgba(59,130,246,0.3)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              <button
                style={{
                  padding: '12px',
                  background: 'rgba(59,130,246,0.2)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  borderRadius: '8px',
                  color: '#0ea5e9',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59,130,246,0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(59,130,246,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <MessageCircle size={16} />
                Chat
              </button>
              <button
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f0f9ff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Phone size={16} />
                Ligar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPWA;