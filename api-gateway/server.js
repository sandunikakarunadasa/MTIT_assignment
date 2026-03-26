const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Proxy requests to Restaurant Service
app.use('/restaurant', proxy(process.env.RESTAURANT_SERVICE_URL));

// Placeholder for other services
app.use('/customer', (req, res) => res.status(503).send('Customer Service not available yet'));
app.use('/order', (req, res) => res.status(503).send('Order Service not available yet'));
app.use('/delivery', (req, res) => res.status(503).send('Delivery Service not available yet'));

const PORT = process.env.PORT || 8000;

app.get('/health', (req, res) => {
  res.json({ status: 'Gateway is up and running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
