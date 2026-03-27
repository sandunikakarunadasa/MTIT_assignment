import React, { useState } from 'react';
import { createRestaurant, updateRestaurant, uploadImage } from '../../services/api';

export default function RestaurantModal({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const defaultSchedule = { open: '09:00', close: '22:00', isClosed: false };
  const initialHours = initial?.operatingHours || {
    monday: { ...defaultSchedule }, tuesday: { ...defaultSchedule }, wednesday: { ...defaultSchedule },
    thursday: { ...defaultSchedule }, friday: { ...defaultSchedule }, saturday: { ...defaultSchedule }, sunday: { ...defaultSchedule }
  };

  const [form, setForm] = useState(
    initial
      ? { name: initial.name, address: initial.address, cuisine: initial.cuisine, contact: initial.contact || '', imageUrl: initial.imageUrl || '' }
      : { name: '', address: '', cuisine: '', contact: '', imageUrl: '' }
  );
  const [operatingHours, setOperatingHours] = useState(initialHours);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleHoursChange = (day, field, value) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalForm = { ...form, operatingHours };
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await uploadImage(formData);
        finalForm.imageUrl = uploadRes.data.url;
      }

      if (isEdit) {
        await updateRestaurant(initial._id, finalForm);
      } else {
        await createRestaurant(finalForm);
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
          <div className="form-group">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {form.imageUrl && !file && <p style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-muted)' }}>Current image exists.</p>}
          </div>

          <div className="form-group">
            <label style={{ marginBottom: '0.75rem', display: 'block' }}>Operating Hours (7-Day Schedule)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg)', padding: '1rem', borderRadius: '8px' }}>
              {Object.keys(operatingHours).map(day => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: '80px', textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 600 }}>{day}</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', width: '70px' }}>
                    <input type="checkbox" checked={operatingHours[day].isClosed} onChange={(e) => handleHoursChange(day, 'isClosed', e.target.checked)} />
                    Closed
                  </label>
                  {!operatingHours[day].isClosed && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
                      <input type="time" value={operatingHours[day].open} onChange={(e) => handleHoursChange(day, 'open', e.target.value)} style={{ padding: '4px', flex: 1 }} required />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>to</span>
                      <input type="time" value={operatingHours[day].close} onChange={(e) => handleHoursChange(day, 'close', e.target.value)} style={{ padding: '4px', flex: 1 }} required />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={uploading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Restaurant')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
