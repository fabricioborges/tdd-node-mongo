const { Router } = require('express');
const ProductController = require('./controllers/ProductController');

const routes = Router();

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.delete('/products', ProductController.delete);
routes.put('/products', ProductController.edit);

module.exports = routes;