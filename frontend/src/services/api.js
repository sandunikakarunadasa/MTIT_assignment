import axios from 'axios';

const BASE_URL = 'http://localhost:8000/restaurant/api/restaurants';

const api = axios.create({ baseURL: BASE_URL });

// ── Restaurants ──────────────────────────────────────────
export const getAllRestaurants = () => api.get('/');
export const searchRestaurants = (q) => api.get(`/search?q=${q}`);
export const getRestaurant = (id) => api.get(`/${id}`);
export const createRestaurant = (data) => api.post('/', data);
export const updateRestaurant = (id, data) => api.put(`/${id}`, data);
export const deleteRestaurant = (id) => api.delete(`/${id}`);
export const toggleRestaurantStatus = (id) => api.patch(`/${id}/toggle`);

// ── Menu ─────────────────────────────────────────────────
export const getMenu = (restaurantId) => api.get(`/${restaurantId}/menu`);
export const addMenuItem = (restaurantId, data) => api.post(`/${restaurantId}/menu`, data);
export const updateMenuItem = (restaurantId, itemId, data) => api.put(`/${restaurantId}/menu/${itemId}`, data);
export const deleteMenuItem = (restaurantId, itemId) => api.delete(`/${restaurantId}/menu/${itemId}`);
export const toggleMenuItemAvailability = (restaurantId, itemId) => api.patch(`/${restaurantId}/menu/${itemId}/toggle`);
