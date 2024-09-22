var express = require('express');
const route = require('express').Router();
const app = express()
const port = process.env.PORT || 2000 

route.get('/', (request, response, next) => {
    response.json('Brandon Sill');
})

app.use('/', route);

app.listen(port, () => {
    console.log(`Hello from port ${port}`)
});