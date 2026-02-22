import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../assets/styles/dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Receita Total',
      value: 'R$ 12.450,00',
      trend: '+12.5%',
      trendUp: true,
      icon: 'blue',
      iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
    },
    {
      label: 'Vendas Hoje',
      value: '47',
      trend: '+8.2%',
      trendUp: true,
      icon: 'green',
      iconPath: 'M3 3v18h18M18 9l-5 5-4-4-3 3'
    },
    {
      label: 'Novos Alunos',
      value: '156',
      trend: '+23.1%',
      trendUp: true,
      icon: 'orange',
      iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
    },
    {
      label: 'Taxa de Conversão',
      value: '3.24%',
      trend: '-2.1%',
      trendUp: false,
      icon: 'purple',
      iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2'
    }
  ];

  const activities = [
    {
      title: 'Nova venda realizada',
      description: 'E-book: Marketing Digital',
      time: 'Há 5 minutos',
      icon: 'success',
      iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14'
    },
    {
      title: 'Novo aluno cadastrado',
      description: 'João Silva',
      time: 'Há 15 minutos',
      icon: 'info',
      iconPath: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
    },
    {
      title: 'Pagamento aprovado',
      description: 'Valor: R$ 297,00',
      time: 'Há 1 hora',
      icon: 'success',
      iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14'
    },
    {
      title: 'Bônus de afiliado pago',
      description: 'Referência: #1234',
      time: 'Há 2 horas',
      icon: 'warning',
      iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
    }
  ];

  const quickActions = [

    { label: 'Criar Página', icon: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' },
    { label: 'Ver Afiliados', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { label: 'Relatórios', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }
  ];

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/img/logo3.jpeg" alt="Clickify" />
            <span>Clickify</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Principal</div>
            <Link to="/dashboard" className="nav-link active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              Dashboard
            </Link>
            <Link to="/checkout" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Minhas Compras
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Gestão</div>
            <Link to="/products" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              Produtos
            </Link>
            <Link to="/affiliates" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Afiliados
            </Link>
            <Link to="/orders" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Pedidos
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Financeiro</div>
            <Link to="/transactions" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Transações
            </Link>
            <Link to="/withdrawals" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5l-5 5-5-5" />
              </svg>
              Saques
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card" onClick={logout}>
            <div className="user-avatar">{userInitial}</div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'Usuário'}</div>
              <div className="user-email">{user?.email || '—'}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Dashboard</h1>
            <p>Bem-vindo de volta, {user?.name || 'Usuário'}!</p>
          </div>
          <div className="header-actions">
            <button className="header-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exportar
            </button>

          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon ${stat.icon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={stat.iconPath} />
                  </svg>
                </div>
                <div className={`stat-trend ${stat.trendUp ? 'up' : 'down'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {stat.trendUp ? (
                      <polyline points="23 6 13.5 15.5 10.5 8.5 1 18" />
                    ) : (
                      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                    )}
                  </svg>
                  {stat.trend}
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Chart Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Receita dos Últimos 30 Dias</h3>
              <div className="card-actions">
                <button className="header-btn">Este Mês</button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                {/* Placeholder for chart - replace with actual chart library */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  justifyContent: 'space-around',
                  height: '100%',
                  padding: '20px 0'
                }}>
                  {[35, 55, 40, 70, 85, 60, 90, 75, 95, 65, 80, 100].map((height, i) => (
                    <div 
                      key={i}
                      style={{
                        width: '30px',
                        height: `${height}%`,
                        background: `linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)`,
                        borderRadius: '6px 6px 0 0',
                        opacity: 0.8,
                        transition: 'opacity 0.2s',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity & Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Activity Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Atividades Recentes</h3>
              </div>
              <div className="card-body">
                <div className="activity-list">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`activity-icon ${activity.icon}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={activity.iconPath} />
                        </svg>
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Ações Rápidas</h3>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  {quickActions.map((action, index) => (
                    <button key={index} className="quick-action-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={action.icon} />
                      </svg>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
