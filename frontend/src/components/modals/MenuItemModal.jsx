import React, { useState } from 'react';
import { addMenuItem, updateMenuItem, uploadImage } from '../../services/api';
import { Trash2, Plus } from 'lucide-react';

export default function MenuItemModal({ restaurantId, initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial
      ? { name: initial.name, description: initial.description || '', price: initial.price, category: initial.category || '', imageUrl: initial.imageUrl || '' }
      : { name: '', description: '', price: '', category: '', imageUrl: '' }
  );
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [addons, setAddons] = useState(initial?.addons || []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAddAddon = () => setAddons([...addons, { name: '', additionalPrice: 0, isRequired: false }]);
  const handleRemoveAddon = (idx) => setAddons(addons.filter((_, i) => i !== idx));
  const handleAddonChange = (idx, field, value) => {
    const newAddons = [...addons];
    newAddons[idx][field] = value;
    setAddons(newAddons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let payload = { ...form, price: Number(form.price), addons };
    try {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await uploadImage(formData);
        payload.imageUrl = uploadRes.data.url;
      }

      if (isEdit) {
        await updateMenuItem(restaurantId, initial._id, payload);
      } else {
        await addMenuItem(restaurantId, payload);
      }
      onSave();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
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
          <div className="form-group">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {form.imageUrl && !file && <p style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-muted)' }}>Current image exists.</p>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ margin: 0 }}>Menu Add-ons</label>
              <button type="button" className="btn btn-sm btn-ghost" onClick={handleAddAddon} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Plus size={14} /> Add Option
              </button>
            </div>
            
            {addons.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg)', padding: '1rem', borderRadius: '8px' }}>
                {addons.map((addon, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="text" placeholder="e.g. Extra Cheese" value={addon.name} onChange={(e) => handleAddonChange(idx, 'name', e.target.value)} required style={{ flex: 2, padding: '4px' }} />
                    <input type="number" placeholder="+ Rs.0" value={addon.additionalPrice} onChange={(e) => handleAddonChange(idx, 'additionalPrice', Number(e.target.value))} required style={{ flex: 1, padding: '4px' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                      <input type="checkbox" checked={addon.isRequired} onChange={(e) => handleAddonChange(idx, 'isRequired', e.target.checked)} />
                      Req.
                    </label>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveAddon(idx)} style={{ padding: '0.4rem' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={uploading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
