import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Checkout from './pages/checkout';
import Home from './pages/index';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
