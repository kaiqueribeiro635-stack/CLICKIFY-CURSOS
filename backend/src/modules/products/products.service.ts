import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: string;
  title: string;
  category: 'autoral' | 'afiliacao' | 'coproducao' | 'servico';
  type: string;
  image?: string;
  price: number;
  status: 'active' | 'inactive' | 'incomplete';
  requireAddress?: boolean;
  createdAt: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      title: 'CLICKIFY',
      category: 'autoral',
      type: 'Serviço',
      price: 0,
      status: 'incomplete',
      requireAddress: false,
      createdAt: '2024-05-20'
    },
    {
      id: '2',
      title: 'Artes Digitais Editáveis',
      category: 'autoral',
      type: 'E-book e arquivos',
      price: 47,
      status: 'active',
      requireAddress: true,
      createdAt: '2024-05-15'
    },
    {
      id: '3',
      title: 'Cortes Milionários Virais',
      category: 'autoral',
      type: 'Curso',
      price: 197,
      status: 'active',
      requireAddress: false,
      createdAt: '2024-05-10'
    },
    {
      id: '4',
      title: 'Método Doma Dog',
      category: 'afiliacao',
      type: 'Curso',
      price: 297,
      status: 'active',
      requireAddress: true,
      createdAt: '2024-05-05'
    },
    {
      id: '5',
      title: 'Mega Pack Cortes',
      category: 'afiliacao',
      type: 'E-book e arquivos',
      price: 97,
      status: 'active',
      requireAddress: false,
      createdAt: '2024-05-01'
    }
  ];

  findAll(category?: string): Product[] {
    if (category && category !== 'all') {
      return this.products.filter(p => p.category === category);
    }
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  getCounts() {
    return {
      all: this.products.length,
      autoral: this.products.filter(p => p.category === 'autoral').length,
      afiliacao: this.products.filter(p => p.category === 'afiliacao').length,
      coproducao: this.products.filter(p => p.category === 'coproducao').length,
      servico: this.products.filter(p => p.category === 'servico').length,
    };
  }
}
