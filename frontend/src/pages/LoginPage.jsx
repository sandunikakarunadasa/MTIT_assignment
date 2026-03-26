import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to Customer Service API (/api/customers/login or /register)
    // For now, simulate login with role stored in localStorage
    const user = { name: form.name || form.email.split('@')[0], email: form.email, role };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">Bon<span>Appetit</span></div>
        <p className="auth-sub">Online Food Ordering System</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
          </div>

          <div className="form-group">
            <label>I am a</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${role === 'customer' ? 'active' : ''}`}
                onClick={() => setRole('customer')}
              >
                🛍️ Customer
              </button>
              <button
                type="button"
                className={`role-btn ${role === 'owner' ? 'active' : ''}`}
                onClick={() => setRole('owner')}
              >
                🏪 Shop Owner
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
