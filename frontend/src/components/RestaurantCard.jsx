import React from 'react';
import { MapPin, Phone, Utensils } from 'lucide-react';

export default function RestaurantCard({ restaurant, onManageMenu, onEdit, onDelete }) {
  const { _id, name, address, cuisine, contact, isOpen, menu, imageUrl } = restaurant;

  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={name} className="card-img" />}
      <div className="card-header">
        <div>
          <p className="card-title">{name}</p>
          <p className="card-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} /> {address}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
          <span className="badge badge-cuisine">{cuisine}</span>
          <span className={`badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
            {isOpen ? '● Open' : '● Closed'}
          </span>
        </div>
      </div>

      <div className="card-body">
        {contact && <p className="card-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {contact}</p>}
        <p className="card-sub" style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Utensils size={14} /> {menu?.length || 0} menu items
        </p>
      </div>

      <div className="card-footer">
        <button className="btn btn-sm btn-primary" onClick={() => onManageMenu(restaurant)}>
          Manage Menu
        </button>
        <button className="btn btn-sm btn-ghost" onClick={() => onEdit(restaurant)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(restaurant)}>
          Delete
        </button>
      </div>
    </div>
  );
}
