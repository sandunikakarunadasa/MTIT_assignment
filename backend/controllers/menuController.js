const Restaurant = require('../models/Restaurant');

// @desc    Get menu for a restaurant
// @route   GET /api/restaurants/:id/menu
exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.status(200).json({ success: true, count: restaurant.menu.length, data: restaurant.menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Add menu item to a restaurant
// @route   POST /api/restaurants/:id/menu
exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    restaurant.menu.push(req.body);
    await restaurant.save();
    res.status(201).json({ success: true, data: restaurant.menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/restaurants/:id/menu/:itemId
exports.updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found' });
    Object.assign(item, req.body);
    await restaurant.save();
    res.status(200).json({ success: true, data: restaurant.menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/restaurants/:id/menu/:itemId
exports.deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    restaurant.menu = restaurant.menu.filter(item => item._id.toString() !== req.params.itemId);
    await restaurant.save();
    res.status(200).json({ success: true, message: 'Menu item deleted', data: restaurant.menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Toggle menu item availability
// @route   PATCH /api/restaurants/:id/menu/:itemId/toggle
exports.toggleMenuItemAvailability = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found' });
    item.isAvailable = !item.isAvailable;
    await restaurant.save();
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
