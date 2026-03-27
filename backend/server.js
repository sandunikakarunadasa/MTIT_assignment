const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const connectDB = require('./config/db');
const swaggerDocument = require('./config/swagger');
const restaurantRoutes = require('./routes/restaurantRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Restaurant Service is up', port: process.env.PORT || 5001 });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Restaurant Service running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
