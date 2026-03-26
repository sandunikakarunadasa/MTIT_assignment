import React from 'react';

export default function RestaurantCard({ restaurant, onManageMenu, onEdit, onToggle, onDelete }) {
  const { _id, name, address, cuisine, contact, isOpen, menu } = restaurant;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="card-title">{name}</p>
          <p className="card-sub">📍 {address}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
          <span className="badge badge-cuisine">{cuisine}</span>
          <span className={`badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
            {isOpen ? '● Open' : '● Closed'}
          </span>
        </div>
      </div>

      <div className="card-body">
        {contact && <p className="card-sub">📞 {contact}</p>}
        <p className="card-sub" style={{ marginTop: '0.4rem' }}>
          🍽️ {menu?.length || 0} menu items
        </p>
      </div>

      <div className="card-footer">
        <button className="btn btn-sm btn-primary" onClick={() => onManageMenu(restaurant)}>
          Manage Menu
        </button>
        <button className="btn btn-sm btn-ghost" onClick={() => onEdit(restaurant)}>
          Edit
        </button>
        <button className="btn btn-sm btn-warning" onClick={() => onToggle(_id)}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(restaurant)}>
          Delete
        </button>
      </div>
    </div>
  );
}
