import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/index.css';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">
          <img src="/img/logo3.jpeg" alt="Clickify" />
          <span>Clickify</span>
        </div>
        <nav className="landing-nav">
          <Link to="#features">Recursos</Link>
          <Link to="#pricing">Preços</Link>
          <Link to="#affiliates">Afiliados</Link>
          <Link to="#contact">Contato</Link>
        </nav>
        <div className="landing-cta">
          <Link to="/login" className="landing-btn outline">Entrar</Link>
          <Link to="/register" className="landing-btn primary">Começar</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Plataforma completa para seus cursos
          </div>
          <h1 className="hero-title">
            Venda seus cursos online e aumente suas vendas
          </h1>
          <p className="hero-description">
            A plataforma mais completa para criar, vender e escalar seus cursos online. 
            Com ferramentas poderosas de marketing, afiliados e gestão de pagamentos.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="hero-btn primary">
              Criar minha conta
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/dashboard" className="hero-btn secondary">
              Ver demonstração
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">10K+</div>
              <div className="hero-stat-label">Alunos cadastrados</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Cursos publicados</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">R$ 2M+</div>
              <div className="hero-stat-label">Vendas realizadas</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Tudo que você precisa</h2>
            <p className="section-description">
              Ferramentas poderosas para criar e vender seus cursos online com facilidade
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="feature-title">Gestão de Produtos</h3>
              <p className="feature-description">
                Organize seus cursos, módulos e aulas de forma intuitiva e profissional
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-title">Programa de Afiliados</h3>
              <p className="feature-description">
                Expanda suas vendas com uma rede de afiliados integrada e automatizada
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3 className="feature-title">Pagamentos Diversos</h3>
              <p className="feature-description">
                Aceite cartões, PIX, boleto e muito mais com processamento seguro
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="feature-title">Relatórios Detalhados</h3>
              <p className="feature-description">
                Acompanhe vendas, conversões e desempenho com dashboards em tempo real
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3 className="feature-title">Notificações</h3>
              <p className="feature-description">
                Receba alertas sobre vendas, novos alunos e movimentações na sua conta
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="feature-title">Segurança Avançada</h3>
              <p className="feature-description">
                Proteção de dados e transações com criptografia de ponta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2024 Clickify Cursos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
