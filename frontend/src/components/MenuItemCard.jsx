import React from 'react';
import { Edit2, Trash2, RefreshCw } from 'lucide-react';

export default function MenuItemCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <div className="menu-card">
      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="menu-card-img" />}
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
          <button className="btn btn-sm btn-warning" title="Toggle availability" onClick={() => onToggle(item._id)}><RefreshCw size={14} /></button>
          <button className="btn btn-sm btn-ghost" title="Edit item" onClick={() => onEdit(item)}><Edit2 size={14} /></button>
          <button className="btn btn-sm btn-danger" title="Delete item" onClick={() => onDelete(item)}><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}
