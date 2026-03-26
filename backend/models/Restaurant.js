const mongoose = require('mongoose');
const menuItemSchema = require('./MenuItem');

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  contact: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isOpen: { type: Boolean, default: true },
  menu: [menuItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
