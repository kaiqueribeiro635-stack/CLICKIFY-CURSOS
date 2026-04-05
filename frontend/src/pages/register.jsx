import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/styles/login.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const logoSrc = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22140%22%20height%3D%2240%22%20viewBox%3D%220%200%20140%2040%22%3E%3Crect%20width%3D%22140%22%20height%3D%2240%22%20rx%3D%2210%22%20fill%3D%22%230f172a%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2218%22%20fill%3D%22%23ffffff%22%3ECLICKIFY%3C/text%3E%3C/svg%3E';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await api.post('/users', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Falha ao cadastrar. Verifique os dados informados.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img 
            src={logoSrc} 
            alt="Clickify Cursos" 
            className="login-logo"
          />
          <h1>Criar conta</h1>
          <p>Comece a vender seus cursos hoje mesmo</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Criar conta'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Já tem conta?{' '}
            <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
