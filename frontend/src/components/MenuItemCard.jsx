import React from 'react';

export default function MenuItemCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <div className="menu-card">
      <div className="menu-card-top">
        <span className="menu-card-name">{item.name}</span>
        <span className="menu-card-price">Rs. {item.price}</span>
      </div>

      {item.description && (
        <p className="menu-card-desc">{item.description}</p>
      )}

      <div className="menu-card-footer">
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {item.category && (
            <span className="badge badge-cuisine">{item.category}</span>
          )}
          <span className={`badge ${item.isAvailable ? 'badge-avail' : 'badge-unavail'}`}>
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="btn btn-sm btn-warning" title="Toggle availability" onClick={() => onToggle(item._id)}>⇄</button>
          <button className="btn btn-sm btn-ghost" title="Edit item" onClick={() => onEdit(item)}>✏️</button>
          <button className="btn btn-sm btn-danger" title="Delete item" onClick={() => onDelete(item)}>🗑️</button>
        </div>
      </div>
    </div>
  );
}
