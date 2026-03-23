import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import '../assets/styles/checkout.css';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: ''
  });

  const product = {
    name: 'Marketing Digital Completo',
    description: 'Acesso vitalício ao curso completo',
    price: 197.00,
    originalPrice: 297.00,
    requireAddress: true // Simulando que este produto exige endereço
  };

  const discount = product.originalPrice - product.price;

  const validateForm = () => {
    if (product.requireAddress) {
      const requiredFields = ['fullName', 'cep', 'street', 'number', 'district', 'city', 'state'];
      for (const field of requiredFields) {
        if (!address[field] || address[field].trim() === '') {
          alert(`O campo ${field} é obrigatório.`);
          return false;
        }
      }
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Pagamento processado com sucesso! Endereço salvo vinculado ao pedido.');
      console.log('Dados do Pedido:', {
        product: product.name,
        paymentMethod,
        address: product.requireAddress ? address : null
      });
    }, 2000);
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <h1>Finalizar Compra</h1>
          <p>Preencha os dados abaixo para completar sua purchase</p>
        </header>

        <form onSubmit={handleSubmit} className="checkout-grid">
          {/* Payment Methods */}
          <div className="payment-section">
            <h2>Forma de Pagamento</h2>
            
            <div className="payment-methods">
              <label 
                className={`payment-method ${paymentMethod === 'pix' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('pix')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                />
                <div className="payment-radio"></div>
                <div className="payment-info">
                  <div className="payment-label">PIX</div>
                  <div className="payment-desc">Pagamento instantâneo</div>
                </div>
                <div className="payment-icon pix">PIX</div>
              </label>

              <label 
                className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <div className="payment-radio"></div>
                <div className="payment-info">
                  <div className="payment-label">Cartão de Crédito</div>
                  <div className="payment-desc">Parcele em até 12x</div>
                </div>
                <div className="payment-icon card">CARD</div>
              </label>

              <label 
                className={`payment-method ${paymentMethod === 'boleto' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('boleto')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="boleto"
                  checked={paymentMethod === 'boleto'}
                  onChange={() => setPaymentMethod('boleto')}
                />
                <div className="payment-radio"></div>
                <div className="payment-info">
                  <div className="payment-label">Boleto Bancário</div>
                  <div className="payment-desc">Vencimento em 3 dias úteis</div>
                </div>
                <div className="payment-icon boleto">BOLETO</div>
              </label>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="card-form">
                <div className="form-row">
                  <div className="checkout-form-group">
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="cardHolder">Nome no Cartão</label>
                    <input
                      id="cardHolder"
                      type="text"
                      placeholder="João Silva"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="checkout-form-group">
                    <label htmlFor="expiry">Validade</label>
                    <input
                      id="expiry"
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Personal Info */}
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f1f1', margin: '0 0 20px 0' }}>
                Dados Pessoais
              </h2>
              <div className="form-row">
                <div className="checkout-form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="checkout-form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
              </div>
              <div className="checkout-form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Endereço de Entrega - Condicional */}
            {product.requireAddress && (
              <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f1f1', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Endereço de Entrega
                </h2>
                
                <div className="checkout-form-group">
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Nome de quem receberá o pedido"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="checkout-form-group">
                    <label htmlFor="cep">CEP</label>
                    <input
                      id="cep"
                      type="text"
                      placeholder="00000-000"
                      value={address.cep}
                      onChange={(e) => setAddress({...address, cep: e.target.value})}
                      maxLength={9}
                      required
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="state">Estado</label>
                    <input
                      id="state"
                      type="text"
                      placeholder="UF"
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      maxLength={2}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="checkout-form-group" style={{ flex: 2 }}>
                    <label htmlFor="street">Rua</label>
                    <input
                      id="street"
                      type="text"
                      placeholder="Nome da rua"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      required
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="number">Número</label>
                    <input
                      id="number"
                      type="text"
                      placeholder="123"
                      value={address.number}
                      onChange={(e) => setAddress({...address, number: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="checkout-form-group">
                    <label htmlFor="district">Bairro</label>
                    <input
                      id="district"
                      type="text"
                      placeholder="Seu bairro"
                      value={address.district}
                      onChange={(e) => setAddress({...address, district: e.target.value})}
                      required
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="city">Cidade</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Sua cidade"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="complement">Complemento (Opcional)</label>
                  <input
                    id="complement"
                    type="text"
                    placeholder="Apto, Bloco, Sala, etc."
                    value={address.complement}
                    onChange={(e) => setAddress({...address, complement: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Resumo do Pedido</h2>
            
            <div className="order-product">
              <div className="product-image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="order-totals">
              <div className="order-row">
                <span>Valor original</span>
                <span className="value" style={{ textDecoration: 'line-through', color: '#6b7280' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              </div>
              <div className="order-row">
                <span>Desconto</span>
                <span className="value" style={{ color: '#10b981' }}>
                  -{formatCurrency(discount)}
                </span>
              </div>
              <div className="order-row">
                <span>Taxa de processamento</span>
                <span className="value">R$ 0,00</span>
              </div>
              <div className="order-row total">
                <span>Total</span>
                <span className="value">{formatCurrency(product.price)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="checkout-btn" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
                  </svg>
                  Processando...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Pagar {formatCurrency(product.price)}
                </>
              )}
            </button>

            <div className="security-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Pagamento 100% seguro. Seus dados estão protegidos.
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
