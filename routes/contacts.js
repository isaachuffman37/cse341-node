const routes = require('express').Router();
const controllers = require('../controllers');

routes.get('/', (req, res, next) => {
    if (req.query.id) {
      controllers.getOneContact(req, res, next); // Call getOneContact when an ID is present
    } else {
      controllers.getAllContacts(req, res, next); // Otherwise, call getAllContacts
    }
  });

module.exports = routes;