const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'General' },
  imageUrl: { type: String, default: '' },
  addons: [{
    name: { type: String, required: true },
    additionalPrice: { type: Number, required: true },
    isRequired: { type: Boolean, default: false }
  }],
  isAvailable: { type: Boolean, default: true }
});

module.exports = menuItemSchema;
