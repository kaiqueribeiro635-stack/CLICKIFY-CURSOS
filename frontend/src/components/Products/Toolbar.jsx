import React from 'react';

/**
 * Componente de Barra de Ferramentas
 * Contém campo de busca e botão de adicionar produto
 * @param {string} searchQuery - Termo de busca atual
 * @param {function} onSearchChange - Callback para mudança na busca
 * @param {function} onAddProduct - Callback para adicionar produto
 */
export default function Toolbar({ searchQuery, onSearchChange, onAddProduct }) {
  return (
    <div className="products-toolbar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg 
            className="search-icon" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Limpar busca"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <button className="add-product-btn" onClick={onAddProduct}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        Adicionar Produto
      </button>
    </div>
  );
}
