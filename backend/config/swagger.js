const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Restaurant Service API',
    description: 'Microservice API for managing Restaurants and Menus — Online Food Ordering System',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:5001', description: 'Direct Service' },
    { url: 'http://localhost:8000/restaurant', description: 'API Gateway' }
  ],
  tags: [
    { name: 'Restaurants', description: 'Restaurant management' },
    { name: 'Menu', description: 'Menu item management per restaurant' }
  ],
  paths: {
    '/api/restaurants': {
      get: {
        tags: ['Restaurants'],
        summary: 'Get all restaurants',
        responses: { '200': { description: 'List of all restaurants' } }
      },
      post: {
        tags: ['Restaurants'],
        summary: 'Create a new restaurant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'address', 'cuisine'],
                properties: {
                  name: { type: 'string', example: 'The Spice Garden' },
                  address: { type: 'string', example: '12 Main St, Colombo' },
                  cuisine: { type: 'string', example: 'Sri Lankan' },
                  contact: { type: 'string', example: '+94771234567' }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Restaurant created' } }
      }
    },
    '/api/restaurants/search': {
      get: {
        tags: ['Restaurants'],
        summary: 'Search restaurants by name or cuisine',
        parameters: [{ in: 'query', name: 'q', schema: { type: 'string' }, description: 'Search keyword' }],
        responses: { '200': { description: 'Matching restaurants' } }
      }
    },
    '/api/restaurants/{id}': {
      get: {
        tags: ['Restaurants'],
        summary: 'Get a single restaurant',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Restaurant data' }, '404': { description: 'Not found' } }
      },
      put: {
        tags: ['Restaurants'],
        summary: 'Update a restaurant',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' }, address: { type: 'string' },
                  cuisine: { type: 'string' }, contact: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Updated restaurant' } }
      },
      delete: {
        tags: ['Restaurants'],
        summary: 'Delete a restaurant',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Deleted' } }
      }
    },
    '/api/restaurants/{id}/toggle': {
      patch: {
        tags: ['Restaurants'],
        summary: 'Toggle restaurant open/closed status',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Status toggled' } }
      }
    },
    '/api/restaurants/{id}/menu': {
      get: {
        tags: ['Menu'],
        summary: 'Get all menu items for a restaurant',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Menu items' } }
      },
      post: {
        tags: ['Menu'],
        summary: 'Add a menu item',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'price'],
                properties: {
                  name: { type: 'string', example: 'Kottu Roti' },
                  description: { type: 'string', example: 'Spicy chopped flat bread' },
                  price: { type: 'number', example: 450 },
                  category: { type: 'string', example: 'Main Course' }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Item added' } }
      }
    },
    '/api/restaurants/{id}/menu/{itemId}': {
      put: {
        tags: ['Menu'],
        summary: 'Update a menu item',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'itemId', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' }, price: { type: 'number' },
                  category: { type: 'string' }, description: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Updated' } }
      },
      delete: {
        tags: ['Menu'],
        summary: 'Delete a menu item',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'itemId', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Deleted' } }
      }
    },
    '/api/restaurants/{id}/menu/{itemId}/toggle': {
      patch: {
        tags: ['Menu'],
        summary: 'Toggle menu item availability',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'itemId', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Availability toggled' } }
      }
    }
  }
};

module.exports = swaggerDocument;
