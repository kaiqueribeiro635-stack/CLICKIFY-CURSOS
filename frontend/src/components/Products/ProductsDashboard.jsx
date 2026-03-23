import React, { useState, useMemo, useCallback } from 'react';
import Tabs from './Tabs';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import { MOCK_PRODUCTS } from '../../data/products';
import '../../assets/styles/products-dashboard.css';

/**
 * Dashboard de Produtos - Componente Principal
 * Gerencia navegação, busca e exibição de produtos
 */
export default function ProductsDashboard() {
  // Estado para a aba ativa
  const [activeTab, setActiveTab] = useState('Todos');
  
  // Estado para o termo de busca
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado parakey de animação (força re-render com animação)
  const [filterKey, setFilterKey] = useState(0);

  /**
   * Filtra produtos com base na aba ativa e termo de busca
   * Utiliza useMemo para performance
   */
  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS;

    // Filtro por tipo de produto (aba)
    if (activeTab !== 'Todos') {
      products = products.filter(product => product.type === activeTab);
    }

    // Filtro por busca (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      products = products.filter(product => 
        product.title.toLowerCase().includes(query)
      );
    }

    return products;
  }, [activeTab, searchQuery]);

  /**
   * Callback para mudança de aba
   * Atualiza estado e força animação
   */
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchQuery(''); // Limpa busca ao trocar aba
    setFilterKey(prev => prev + 1); // Força animação
  }, []);

  /**
   * Callback para mudança na busca
   */
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    setFilterKey(prev => prev + 1); // Força animação ao filtrar
  }, []);

  /**
   * Callback para adicionar produto
   * (Simples alerta para demonstração)
   */
  const handleAddProduct = useCallback(() => {
    // Em produção, isto abriria um modal ou redirecionaria
    alert('Funcionalidade de adicionar produto será implementada em breve!');
  }, []);

  /**
   * Callback para gerenciar produto
   */
  const handleManageProduct = useCallback((productId) => {
    console.log('Gerenciar produto:', productId);
    alert(`Gerenciando produto #${productId}`);
  }, []);

  return (
    <div className="products-dashboard">
      {/* Cabeçalho */}
      <div className="products-header">
        <div className="products-title-section">
          <h1 className="products-title">Meus Produtos</h1>
          <p className="products-subtitle">
            Gerencie seus infoprodutos, cursos e serviços
          </p>
        </div>
        
        {/* Estatísticas rápidas */}
        <div className="products-stats">
          <div className="stat-item">
            <span className="stat-number">{MOCK_PRODUCTS.length}</span>
            <span className="stat-text">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {MOCK_PRODUCTS.filter(p => p.type === 'Autoral').length}
            </span>
            <span className="stat-text">Autorais</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {MOCK_PRODUCTS.filter(p => p.type === 'Afiliação').length}
            </span>
            <span className="stat-text">Afiliações</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {MOCK_PRODUCTS.filter(p => p.type === 'Coprodução').length}
            </span>
            <span className="stat-text">Coproduções</span>
          </div>
        </div>
      </div>

      {/* Sistema de Abas */}
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Barra de Ferramentas */}
      <Toolbar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddProduct={handleAddProduct}
      />

      {/* Grid de Produtos ou Estado Vazio */}
      <div className="products-content" key={filterKey}>
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type={activeTab} 
            onAddProduct={handleAddProduct}
          />
        )}
      </div>

      {/* Resultados da busca */}
      {searchQuery && filteredProducts.length > 0 && (
        <div className="search-results-info">
          <span>
            Encontrados {filteredProducts.length} produto(s) para "{searchQuery}"
          </span>
        </div>
      )}
    </div>
  );
}
