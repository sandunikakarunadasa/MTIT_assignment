import React, { useState, useEffect } from 'react';
import { getAllRestaurants, searchRestaurants, deleteRestaurant } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantModal from '../components/modals/RestaurantModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import { Search, Store } from 'lucide-react';

export default function RestaurantListPage({ onManageMenu }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const res = search
        ? await searchRestaurants(search)
        : await getAllRestaurants();
      setRestaurants(res.data.data);
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchRestaurants, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async () => {
    await deleteRestaurant(deleteTarget._id);
    setDeleteTarget(null);
    fetchRestaurants();
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Restaurants</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input
              placeholder="Search by name or cuisine…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            + Add Restaurant
          </button>
        </div>
      </div>

      {restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><Store size={48} color="var(--text-muted)" /></div>
          <h3>No restaurants found</h3>
          <p>Add a restaurant to get started.</p>
        </div>
      ) : (
        <div className="grid">
          {restaurants.map(r => (
            <RestaurantCard
              key={r._id}
              restaurant={r}
              onManageMenu={onManageMenu}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <RestaurantModal
          onSave={() => { setShowAdd(false); fetchRestaurants(); }}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editTarget && (
        <RestaurantModal
          initial={editTarget}
          onSave={() => { setEditTarget(null); fetchRestaurants(); }}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          message="Are you sure you want to delete restaurant"
          itemName={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
