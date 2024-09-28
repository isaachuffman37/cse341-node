var express = require('express');
var routes = require('./routes')
const app = express()
const port = process.env.PORT || 2000 

app.use('/', routes);

app.listen(port, () => {
    console.log(`Hello from port ${port}`)
});