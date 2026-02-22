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
            src="/img/logo3.jpeg" 
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
