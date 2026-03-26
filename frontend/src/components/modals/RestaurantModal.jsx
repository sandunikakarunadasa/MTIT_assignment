import React, { useState } from 'react';
import { createRestaurant, updateRestaurant } from '../../services/api';

export default function RestaurantModal({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial
      ? { name: initial.name, address: initial.address, cuisine: initial.cuisine, contact: initial.contact || '' }
      : { name: '', address: '', cuisine: '', contact: '' }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateRestaurant(initial._id, form);
      } else {
        await createRestaurant(form);
      }
      onSave();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. The Spice Garden" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} required placeholder="e.g. 12 Main St, Colombo" />
          </div>
          <div className="form-group">
            <label>Cuisine</label>
            <input name="cuisine" value={form.cuisine} onChange={handleChange} required placeholder="e.g. Sri Lankan, Italian" />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="e.g. +94771234567" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Add Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
