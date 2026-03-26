const express = require('express');
const router = express.Router();

const {
  getRestaurants,
  searchRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  toggleStatus
} = require('../controllers/restaurantController');

const {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability
} = require('../controllers/menuController');

// Search (before /:id to avoid route conflict)
router.get('/search', searchRestaurants);

// Restaurant CRUD
router.route('/')
  .get(getRestaurants)
  .post(createRestaurant);

router.route('/:id')
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

router.patch('/:id/toggle', toggleStatus);

// Menu routes (nested under restaurant)
router.route('/:id/menu')
  .get(getMenu)
  .post(addMenuItem);

router.route('/:id/menu/:itemId')
  .put(updateMenuItem)
  .delete(deleteMenuItem);

router.patch('/:id/menu/:itemId/toggle', toggleMenuItemAvailability);

module.exports = router;
