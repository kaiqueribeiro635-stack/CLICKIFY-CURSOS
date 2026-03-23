import React, { memo, useState } from 'react';

/**
 * Componente de Card de Produto
 * Exibe as informações de um produto no grid
 * @param {object} product - Dados do produto
 * @param {number} index - Índice para animação
 */
const ProductCard = memo(function ProductCard({ product, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(product.price);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handlePriceClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handlePriceChange = (e) => {
    setTempPrice(e.target.value);
  };

  const handlePriceBlur = () => {
    savePrice();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      savePrice();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempPrice(product.price);
    }
  };

  const savePrice = () => {
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice >= 0) {
      product.price = newPrice; // Atualiza o objeto (mock)
      setIsEditing(false);
    } else {
      setTempPrice(product.price);
      setIsEditing(false);
    }
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getTypeBadgeClass = (type) => {
    const typeMap = {
      'Autoral': 'badge-autoral',
      'Afiliação': 'badge-afiliacao',
      'Coprodução': 'badge-coproducao'
    };
    return typeMap[type] || 'badge-default';
  };

  return (
    <div 
      className="product-card" 
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-badge">
          {product.category}
        </span>
      </div>
      
      <div className="product-content">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        
        <div className="product-meta">
          <span className={`product-type-badge ${getTypeBadgeClass(product.type)}`}>
            {product.type}
          </span>
          <div className="product-price-wrapper">
            {isEditing ? (
              <input
                type="number"
                className="product-price-input"
                value={tempPrice}
                onChange={handlePriceChange}
                onBlur={handlePriceBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                step="0.01"
              />
            ) : (
              <span className="product-price" onClick={handlePriceClick} title="Clique para editar">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
        
        <div className="product-stats">
          <div className="product-stat">
            <span className="stat-value">{formatNumber(product.sales)}</span>
            <span className="stat-label">vendas</span>
          </div>
          <div className="product-stat">
            <span className="stat-value">{formatCurrency(product.revenue)}</span>
            <span className="stat-label">receita</span>
          </div>
        </div>
        
        <button className="product-manage-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
          Gerenciar
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
