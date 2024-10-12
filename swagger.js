const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'An API that returns temples'
  },
  host: process.env.HOST,
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/contacts.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);