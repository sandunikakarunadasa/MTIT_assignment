import React, { useState, useEffect } from 'react';
import { getAllRestaurants, searchRestaurants, getMenu } from '../services/api';
import { ArrowLeft, Phone, UtensilsCrossed, ShoppingCart, Search, MapPin, Utensils } from 'lucide-react';

function CustomerMenuView({ restaurant, onBack }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState({});

  useEffect(() => {
    getMenu(restaurant._id).then(res => {
      setMenu(res.data.data);
      setLoading(false);
    }).catch(console.error);
  }, [restaurant._id]);

  const openCustomizeModal = (item) => {
    setSelectedItem(item);
    const initialReq = {};
    item.addons?.forEach(a => { if (a.isRequired) initialReq[a._id] = true; });
    setSelectedAddons(initialReq);
  };

  const handleToggleAddon = (addon) => {
    if (addon.isRequired) return; // Prevent toggling required
    setSelectedAddons(prev => ({ ...prev, [addon._id]: !prev[addon._id] }));
  };

  const getComputedPrice = () => {
    if (!selectedItem) return 0;
    let total = selectedItem.price;
    selectedItem.addons?.forEach(a => {
      if (selectedAddons[a._id]) total += a.additionalPrice;
    });
    return total;
  };

  if (loading) return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading menu...</div>;

  return (
    <div className="container">
      <button className="btn btn-ghost back-btn" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ArrowLeft size={16} /> Back to Restaurants
      </button>

      <div className="menu-info">
        <h2 style={{ fontWeight: 800 }}>{restaurant.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {restaurant.cuisine} · {restaurant.address}
        </p>
        {restaurant.contact && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}><Phone size={14} /> {restaurant.contact}</p>}
      </div>

      {menu.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><UtensilsCrossed size={48} color="var(--text-muted)" /></div>
          <h3>No menu items yet</h3>
          <p>This restaurant hasn't added any items yet.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {menu.filter(item => item.isAvailable).map(item => (
            <div key={item._id} className="menu-card">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="menu-card-img" />}
                <div className="menu-card-top">
                  <span className="menu-card-name">{item.name}</span>
                  <span className="menu-card-price">Rs. {item.price}</span>
                </div>
                {item.description && <p className="menu-card-desc">{item.description}</p>}
                {item.category && (
                  <span className="badge badge-cuisine" style={{ alignSelf: 'flex-start', marginTop: '0.4rem' }}>
                    {item.category}
                  </span>
                )}
                <button className="btn btn-primary" onClick={() => openCustomizeModal(item)} style={{ width: '100%', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShoppingCart size={16} /> Add to Order
                </button>
              </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Customize Order: {selectedItem.name}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedItem(null)}>✕</button>
            </div>
            
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedItem.imageUrl && <img src={selectedItem.imageUrl} alt={selectedItem.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />}
              <p style={{ color: 'var(--text-muted)' }}>{selectedItem.description}</p>
              
              <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Add-ons</h4>
                {!selectedItem.addons || selectedItem.addons.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No add-ons available for this item.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedItem.addons.map(addon => (
                      <label key={addon._id || addon.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: addon.isRequired ? 'not-allowed' : 'pointer', opacity: addon.isRequired ? 0.7 : 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input 
                            type="checkbox" 
                            checked={!!selectedAddons[addon._id]} 
                            onChange={() => handleToggleAddon(addon)}
                            disabled={addon.isRequired}
                          />
                          <span>{addon.name} {addon.isRequired && <span style={{ color: 'var(--primary)', fontSize: '0.8rem', marginLeft: '4px' }}>(Required)</span>}</span>
                        </div>
                        <span style={{ fontWeight: 600 }}>+ Rs. {addon.additionalPrice}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', fontSize: '1.1rem' }}
                onClick={() => {
                  alert(`Added to cart! Total: Rs. ${getComputedPrice()}`);
                  setSelectedItem(null);
                }}
              >
                <span>Add 1 to Cart</span>
                <span>Rs. {getComputedPrice()}</span>
              </button>
            </div>
          </div>
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
          <Search size={18} color="var(--text-muted)" />
          <input
            placeholder="Search restaurants or cuisine…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><UtensilsCrossed size={48} color="var(--text-muted)" /></div>
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
                  <p className="card-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {r.address}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                  <span className="badge badge-cuisine">{r.cuisine}</span>
                  <span className="badge badge-open">● Open</span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Utensils size={14} /> {r.menu?.length || 0} items available</p>
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
