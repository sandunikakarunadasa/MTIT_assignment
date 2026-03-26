import React from 'react';

export default function Navbar({ viewMode, onToggleView }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">
        Bon<span>Appetit</span>
      </span>
      <span className="navbar-sub">Restaurant Service · Microservices Architecture</span>

      <div className="navbar-user">
        <span className="user-badge" style={{ marginRight: '8px' }}>
          {viewMode === 'owner' ? '🏪 Owner View' : '🛍️ Customer View'}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onToggleView}>
          Switch to {viewMode === 'owner' ? 'Customer' : 'Owner'} Mode
        </button>
      </div>
    </nav>
  );
}
