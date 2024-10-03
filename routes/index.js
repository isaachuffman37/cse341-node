const routes = require('express').Router();

var controllers = require('../controllers');

routes.get('/', controllers.getName);

module.exports = routes;
