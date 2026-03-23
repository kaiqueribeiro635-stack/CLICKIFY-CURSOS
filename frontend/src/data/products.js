/**
 * Dados mockados de produtos para o Dashboard de Produtos
 * Simula uma API REST com dados de infoprodutos
 */

export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Curso Completo de Marketing Digital',
    category: 'Curso',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    price: 297.00,
    sales: 1247,
    revenue: 370659.00,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'E-book: Guia Definitivo de Copywriting',
    category: 'Ebook',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    price: 47.00,
    sales: 3421,
    revenue: 160787.00,
    status: 'active',
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    title: 'Mentoria Premium 360',
    category: 'Serviço',
    type: 'Coprodução',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
    price: 1997.00,
    sales: 89,
    revenue: 177733.00,
    status: 'active',
    createdAt: '2024-03-10'
  },
  {
    id: 4,
    title: 'Workshop Ao Vivo: Vendas no Automático',
    category: 'Curso',
    type: 'Afiliação',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop',
    price: 197.00,
    sales: 567,
    revenue: 111699.00,
    status: 'active',
    createdAt: '2024-03-25'
  },
  {
    id: 5,
    title: 'Assinatura Mensal de Templates',
    category: 'Serviço',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop',
    price: 67.00,
    sales: 2156,
    revenue: 144452.00,
    status: 'active',
    createdAt: '2024-04-05'
  },
  {
    id: 6,
    title: 'Pacote de Ferramentas IA',
    category: 'Software',
    type: 'Coprodução',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    price: 147.00,
    sales: 892,
    revenue: 131124.00,
    status: 'active',
    createdAt: '2024-04-18'
  },
  {
    id: 7,
    title: 'Curso de Dropshipping Avançado',
    category: 'Curso',
    type: 'Afiliação',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    price: 297.00,
    sales: 423,
    revenue: 125631.00,
    status: 'active',
    createdAt: '2024-05-02'
  },
  {
    id: 8,
    title: 'E-book: Investimentos para Iniciantes',
    category: 'Ebook',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=400&fit=crop',
    price: 27.00,
    sales: 8934,
    revenue: 241218.00,
    status: 'active',
    createdAt: '2024-05-15'
  },
  {
    id: 9,
    title: 'Consultoria SEO Express',
    category: 'Serviço',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=400&h=400&fit=crop',
    price: 397.00,
    sales: 156,
    revenue: 61932.00,
    status: 'active',
    createdAt: '2024-06-01'
  },
  {
    id: 10,
    title: 'Academia de Fitness Online',
    category: 'Curso',
    type: 'Coprodução',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    price: 67.00,
    sales: 3421,
    revenue: 229207.00,
    status: 'active',
    createdAt: '2024-06-20'
  },
  {
    id: 11,
    title: 'Masterclass: Liderança Extrema',
    category: 'Curso',
    type: 'Afiliação',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
    price: 97.00,
    sales: 1289,
    revenue: 125033.00,
    status: 'active',
    createdAt: '2024-07-05'
  },
  {
    id: 12,
    title: 'Pack de Fontes Profissionais',
    category: 'Software',
    type: 'Autoral',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
    price: 37.00,
    sales: 5678,
    revenue: 210086.00,
    status: 'active',
    createdAt: '2024-07-18'
  }
];

/**
 * Tipos de produtos disponíveis
 */
export const PRODUCT_TYPES = ['Todos', 'Autoral', 'Afiliação', 'Coprodução'];

/**
 * Categorias de produtos
 */
export const PRODUCT_CATEGORIES = ['Curso', 'Ebook', 'Serviço', 'Software'];
