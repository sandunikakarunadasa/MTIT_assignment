import React, { useState, useEffect } from 'react';
import { getAllRestaurants, searchRestaurants, getMenu } from '../services/api';

function CustomerMenuView({ restaurant, onBack }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu(restaurant._id).then(res => setMenu(res.data.data)).catch(console.error);
  }, [restaurant._id]);

  return (
    <div className="container">
      <button className="btn btn-ghost back-btn" onClick={onBack}>← Back to Restaurants</button>

      <div className="menu-info">
        <h2 style={{ fontWeight: 800 }}>{restaurant.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {restaurant.cuisine} · {restaurant.address}
        </p>
        {restaurant.contact && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📞 {restaurant.contact}</p>}
      </div>

      {menu.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🍽️</div>
          <h3>No menu items yet</h3>
          <p>This restaurant hasn't added any items yet.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {menu.filter(item => item.isAvailable).map(item => (
            <div key={item._id} className="menu-card">
              <div className="menu-card-top">
                <span className="menu-card-name">{item.name}</span>
                <span className="menu-card-price">Rs. {item.price}</span>
              </div>
              {item.description && <p className="menu-card-desc">{item.description}</p>}
              {item.category && (
                <span className="badge badge-cuisine" style={{ marginTop: '0.4rem', display: 'inline-block' }}>
                  {item.category}
                </span>
              )}
              {/* TODO: Connect "Add to Cart" to Order Service */}
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
                🛒 Add to Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomerView() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const res = search
        ? await searchRestaurants(search)
        : await getAllRestaurants();
      setRestaurants(res.data.data.filter(r => r.isOpen));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchRestaurants, 300);
    return () => clearTimeout(timer);
  }, [search]);

  if (selectedRestaurant) {
    return <CustomerMenuView restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Order Food</h2>
        <div className="search-bar">
          <span>🔍</span>
          <input
            placeholder="Search restaurants or cuisine…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🍽️</div>
          <h3>No open restaurants</h3>
          <p>Check back later!</p>
        </div>
      ) : (
        <div className="grid">
          {restaurants.map(r => (
            <div key={r._id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedRestaurant(r)}>
              <div className="card-header">
                <div>
                  <p className="card-title">{r.name}</p>
                  <p className="card-sub">📍 {r.address}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                  <span className="badge badge-cuisine">{r.cuisine}</span>
                  <span className="badge badge-open">● Open</span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-sub">🍽️ {r.menu?.length || 0} items available</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-sm">View Menu →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
