export const mockProfessionals = [
  {
    id: 1,
    name: 'João Silva',
    profession: 'Encanador Profissional',
    specialties: ['Hidráulica', 'Vazamentos', 'Instalação'],
    city: 'Castro',
    neighborhood: 'Centro',
    description: 'Mais de 15 anos de experiência em reparos e instalações hidráulicas.',
    pricePerHour: 80,
    priceMinimum: 150,
    rating: 4.9,
    reviewsCount: 187,
    status: 'active',
    phone: '(11) 98765-4321',
    email: 'joao@email.com',
    whatsapp: '(11) 98765-4321',
    instagram: '@joaosilvaencanador',
    availabilityDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    availabilityStart: '08:00',
    availabilityEnd: '18:00',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
      'https://images.unsplash.com/photo-1581092918080-24i2b8d3a842?w=600'
    ]
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    profession: 'Limpeza Premium',
    specialties: ['Residencial', 'Comercial', 'Pós-obra'],
    city: 'Carambeí',
    neighborhood: 'Vila Nova',
    description: 'Serviço de limpeza profissional com produtos de qualidade.',
    pricePerHour: 0,
    priceMinimum: 200,
    rating: 4.8,
    reviewsCount: 156,
    status: 'active',
    phone: '(11) 98765-4322',
    email: 'maria@email.com',
    whatsapp: '(11) 98765-4322',
    instagram: '@marialimpeza',
    availabilityDays: ['seg', 'ter', 'qua', 'qui', 'sex'],
    availabilityStart: '07:00',
    availabilityEnd: '17:00',
    images: [
      'https://images.unsplash.com/photo-1563453392-3bea7873c3c9?w=600',
      'https://images.unsplash.com/photo-1581578731548-c64695c952952?w=600'
    ]
  },
  {
    id: 3,
    name: 'Carlos Pereira',
    profession: 'Eletricista Certificado',
    specialties: ['Residencial', 'Comercial', 'Manutenção'],
    city: 'Tibagi',
    neighborhood: 'Jardim das Flores',
    description: 'Eletricista com certificação ABNT.',
    pricePerHour: 70,
    priceMinimum: 120,
    rating: 4.7,
    reviewsCount: 143,
    status: 'active',
    phone: '(11) 98765-4323',
    email: 'carlos@email.com',
    whatsapp: '(11) 98765-4323',
    instagram: '@carloseletricista',
    availabilityDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    availabilityStart: '08:00',
    availabilityEnd: '19:00',
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=600'
    ]
  },
  {
    id: 4,
    name: 'Ana Costa',
    profession: 'Pintora',
    specialties: ['Residencial', 'Comercial', 'Restauração'],
    city: 'Castro',
    neighborhood: 'Bairro Alto',
    description: 'Pintora com 10 anos de experiência. Trabalho impecável.',
    pricePerHour: 60,
    priceMinimum: 200,
    rating: 4.9,
    reviewsCount: 98,
    status: 'active',
    phone: '(11) 98765-4324',
    email: 'ana@email.com',
    whatsapp: '(11) 98765-4324',
    instagram: '@anapintora',
    availabilityDays: ['seg', 'ter', 'qua', 'qui', 'sex'],
    availabilityStart: '09:00',
    availabilityEnd: '18:00',
    images: [
      'https://images.unsplash.com/photo-1562259949-260bbb08f935?w=600'
    ]
  }
]

export const categories = [
  { id: 1, name: 'Encanador', emoji: '🔧', count: 24 },
  { id: 2, name: 'Eletricista', emoji: '⚡', count: 18 },
  { id: 3, name: 'Limpeza', emoji: '🧹', count: 32 },
  { id: 4, name: 'Pintura', emoji: '🎨', count: 15 },
  { id: 5, name: 'Carpinteiro', emoji: '🪚', count: 12 },
  { id: 6, name: 'Jardinagem', emoji: '🌱', count: 9 }
]

export const cities = ['Castro', 'Carambeí', 'Tibagi']
