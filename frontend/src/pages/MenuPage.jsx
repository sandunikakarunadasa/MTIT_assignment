import React, { useState, useEffect } from 'react';
import { getMenu, toggleMenuItemAvailability, deleteMenuItem } from '../services/api';
import MenuItemCard from '../components/MenuItemCard';
import MenuItemModal from '../components/modals/MenuItemModal';
import ConfirmModal from '../components/modals/ConfirmModal';

export default function MenuPage({ restaurant, onBack }) {
  const [menu, setMenu] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await getMenu(restaurant._id);
      setMenu(res.data.data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  useEffect(() => { fetchMenu(); }, [restaurant._id]);

  const handleToggle = async (itemId) => {
    await toggleMenuItemAvailability(restaurant._id, itemId);
    fetchMenu();
  };

  const handleDelete = async () => {
    await deleteMenuItem(restaurant._id, deleteTarget._id);
    setDeleteTarget(null);
    fetchMenu();
  };

  return (
    <div className="container">
      <button className="btn btn-ghost back-btn" onClick={onBack}>
        ← Back to Restaurants
      </button>

      <div className="menu-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontWeight: 800 }}>{restaurant.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {restaurant.cuisine} · {restaurant.address}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            + Add Menu Item
          </button>
        </div>
      </div>

      {menu.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🍽️</div>
          <h3>No menu items yet</h3>
          <p>Add your first item to get started.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {menu.map(item => (
            <MenuItemCard
              key={item._id}
              item={item}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <MenuItemModal
          restaurantId={restaurant._id}
          onSave={() => { setShowAdd(false); fetchMenu(); }}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editTarget && (
        <MenuItemModal
          restaurantId={restaurant._id}
          initial={editTarget}
          onSave={() => { setEditTarget(null); fetchMenu(); }}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          message="Are you sure you want to delete"
          itemName={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
