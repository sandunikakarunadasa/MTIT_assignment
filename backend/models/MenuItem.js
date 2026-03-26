const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'General' },
  isAvailable: { type: Boolean, default: true }
});

module.exports = menuItemSchema;
