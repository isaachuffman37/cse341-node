const mongodb = require('../db/connect');
var ObjectId = require('mongodb').ObjectId;

function getName(request, response, next){
    response.json('Brandon Sill');
}

async function getAllContacts(req, res, next) {
    const result = await mongodb.getMongoDb().db("cse341").collection("contacts").find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); // we just need the first one (the only one)
    })
}

async function getOneContact(req, res, next) {
    const contactId = req.query.id;
    await mongodb.getMongoDb().db("cse341").collection("contacts").findOne({ "_id": new ObjectId(contactId) })
    .then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact); // we just need the first one (the only one)
    })
}


module.exports = { getName, getAllContacts, getOneContact};