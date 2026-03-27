const mongoose = require('mongoose');
const menuItemSchema = require('./MenuItem');

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  contact: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  imageUrl: { type: String, default: '' },
  operatingHours: {
    monday: { open: { type: String, default: '09:00' }, close: { type: String, default: '22:00' }, isClosed: { type: Boolean, default: false } },
    tuesday: { open: { type: String, default: '09:00' }, close: { type: String, default: '22:00' }, isClosed: { type: Boolean, default: false } },
    wednesday: { open: { type: String, default: '09:00' }, close: { type: String, default: '22:00' }, isClosed: { type: Boolean, default: false } },
    thursday: { open: { type: String, default: '09:00' }, close: { type: String, default: '22:00' }, isClosed: { type: Boolean, default: false } },
    friday: { open: { type: String, default: '09:00' }, close: { type: String, default: '23:00' }, isClosed: { type: Boolean, default: false } },
    saturday: { open: { type: String, default: '10:00' }, close: { type: String, default: '23:00' }, isClosed: { type: Boolean, default: false } },
    sunday: { open: { type: String, default: '10:00' }, close: { type: String, default: '22:00' }, isClosed: { type: Boolean, default: false } }
  },
  menu: [menuItemSchema]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Dynamic virtual field to replace the manual manual isOpen toggle
restaurantSchema.virtual('isOpen').get(function() {
  if (!this.operatingHours) return false;
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const dayName = days[now.getDay()];
  const todaySchedule = this.operatingHours[dayName];
  
  if (!todaySchedule || todaySchedule.isClosed) return false;
  
  // Calculate current time in minutes from midnight
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [openH, openM] = todaySchedule.open.split(':').map(Number);
  const [closeH, closeM] = todaySchedule.close.split(':').map(Number);
  const openTime = openH * 60 + openM;
  const closeTime = closeH * 60 + closeM;
  
  return currentTime >= openTime && currentTime <= closeTime;
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
