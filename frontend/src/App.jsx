import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RestaurantListPage from './pages/RestaurantListPage';
import MenuPage from './pages/MenuPage';
import CustomerView from './pages/CustomerView';
import './index.css';

export default function App() {
  // Simple toggle for demonstration purposes ('customer' or 'owner')
  const [viewMode, setViewMode] = useState('owner');
  
  // Owner navigation state
  const [activePage, setActivePage] = useState('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'owner' ? 'customer' : 'owner'));
    // Reset owner sub-navigation when switching views
    setActivePage('restaurants');
    setSelectedRestaurant(null);
  };

  const handleManageMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActivePage('menu');
  };

  return (
    <div className="app">
      <Navbar viewMode={viewMode} onToggleView={toggleViewMode} />

      {/* ── Customer View ─────────────────────────────────── */}
      {viewMode === 'customer' && <CustomerView />}

      {/* ── Shop Owner View ───────────────────────────────── */}
      {viewMode === 'owner' && activePage === 'restaurants' && (
        <RestaurantListPage onManageMenu={handleManageMenu} />
      )}
      {viewMode === 'owner' && activePage === 'menu' && selectedRestaurant && (
        <MenuPage
          restaurant={selectedRestaurant}
          onBack={() => { setSelectedRestaurant(null); setActivePage('restaurants'); }}
        />
      )}
    </div>
  );
}
