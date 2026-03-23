import React from 'react';
import { PRODUCT_TYPES } from '../../data/products';

/**
 * Componente de Abas para navegação do Dashboard de Produtos
 * @param {string} activeTab - Aba atualmente ativa
 * @param {function} onTabChange - Função callback para mudança de aba
 */
export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="products-tabs">
      <div className="tabs-container">
        {PRODUCT_TYPES.map((type) => (
          <button
            key={type}
            className={`tab-button ${activeTab === type ? 'active' : ''}`}
            onClick={() => onTabChange(type)}
            aria-selected={activeTab === type}
            role="tab"
          >
            {type}
            {activeTab === type && <span className="tab-indicator" />}
          </button>
        ))}
      </div>
    </div>
  );
}
