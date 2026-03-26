import React from 'react';
import { Store, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export default function Navbar({ viewMode, onToggleView }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <UtensilsCrossed size={24} color="var(--primary)" />
        Bon<span>Appetit</span>
      </span>
      <span className="navbar-sub">Restaurant Service · Microservices Architecture</span>

      <div className="navbar-user">
        <span className="user-badge" style={{ marginRight: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {viewMode === 'owner' ? <><Store size={16} /> Owner View</> : <><ShoppingBag size={16} /> Customer View</>}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onToggleView}>
          Switch to {viewMode === 'owner' ? 'Customer' : 'Owner'} Mode
        </button>
      </div>
    </nav>
  );
}
