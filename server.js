var express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb')
const mongodb = require('./db/connect');
var baseRoutes = require('./routes');
var contactRoute = require('./routes/contacts')
const app = express();
const port = process.env.PORT || 2000 

app.use('/', baseRoutes);
  

mongodb.connectDb((err, mongodb) => {
    if (err) {
      console.log("The returned DB: ",mongodb);
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to a mongo database and listening on ${port}`);
    }
  });


  app.use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/contacts', contactRoute);