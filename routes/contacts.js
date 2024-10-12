const routes = require('express').Router();
const controller = require('../controllers');

routes.use('/', require('./swagger'));

routes.get('/', controller.getAllContacts);
routes.get('/:id', controller.getOneContact);
routes.post('/', controller.insertOneContact);
routes.delete('/:id', controller.deleteOneContact);
routes.put('/:id', controller.updateOneContact);

module.exports = routes;
