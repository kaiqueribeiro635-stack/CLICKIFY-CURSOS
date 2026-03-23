import React from 'react';

/**
 * Componente de Estado Vazio
 * Exibido quando não há produtos na aba/categoria selecionada
 * @param {string} type - Tipo de produto selecionado
 * @param {function} onAddProduct - Callback para adicionar produto
 */
export default function EmptyState({ type, onAddProduct }) {
  const getMessage = () => {
    switch (type) {
      case 'Autoral':
        return 'Você ainda não possui produtos autorais. Comece a criar seu primeiro infoproduto!';
      case 'Afiliação':
        return 'Você ainda não possui afiliaciones. Comece a promover produtos de terceiros!';
      case 'Coprodução':
        return 'Você ainda não possui coproduções. Comece a vender agora!';
      default:
        return 'Você ainda não possui produtos. Comece a criar seu primeiro infoproduto!';
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="80" height="60" rx="8" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
          <rect x="35" y="45" width="20" height="20" rx="4" fill="#E2E8F0"/>
          <rect x="65" y="45" width="20" height="8" rx="2" fill="#E2E8F0"/>
          <rect x="65" y="57" width="15" height="8" rx="2" fill="#E2E8F0"/>
          <circle cx="60" cy="75" r="8" stroke="#CBD5E1" strokeWidth="2"/>
          <path d="M57 75L59 77L63 73" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M85 25L95 15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 95L15 105" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      
      <h3 className="empty-state-title">
        Nenhum produto encontrado
      </h3>
      
      <p className="empty-state-message">
        {getMessage()}
      </p>
      
      <button className="empty-state-btn" onClick={onAddProduct}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        Criar Primeiro Produto
      </button>
    </div>
  );
}
