import React, { useState } from 'react';
import { addMenuItem, updateMenuItem } from '../../services/api';

export default function MenuItemModal({ restaurantId, initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial
      ? { name: initial.name, description: initial.description || '', price: initial.price, category: initial.category || '' }
      : { name: '', description: '', price: '', category: '' }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    try {
      if (isEdit) {
        await updateMenuItem(restaurantId, initial._id, payload);
      } else {
        await addMenuItem(restaurantId, payload);
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
          <h3>{isEdit ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Kottu Roti" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input name="description" value={form.description} onChange={handleChange} placeholder="Short description" />
          </div>
          <div className="form-group">
            <label>Price (LKR)</label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required placeholder="e.g. 450" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Main Course, Dessert" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
