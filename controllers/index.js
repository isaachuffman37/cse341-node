const { response } = require('express');
const mongodb = require('../db/connect');
var ObjectId = require('mongodb').ObjectId;

function getName(request, response, next) {
  response.json('Brandon Sill');
}

async function getAllContacts(req, res, next) {
  const result = await mongodb.getMongoDb().db('cse341').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
}

async function getOneContact(req, res, next) {
  const contactId = req.params.id;
  await mongodb
    .getMongoDb()
    .db('cse341')
    .collection('contacts')
    .findOne({ _id: new ObjectId(contactId) })
    .then((contact) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    });
}

async function insertOneContact(req, res, next) {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  await mongodb
    .getMongoDb()
    .db('cse341')
    .collection('contacts')
    .insertOne(newUser)
    .then((response) => {
      if (response.acknowledged) {
        res.status(202).json(response.insertedId);
      } else {
        res.status(500).json(response.error);
      }
    });
}

async function deleteOneContact(req, res, next) {
  const contactId = req.params.id;
  try {
    await mongodb
      .getMongoDb()
      .db('cse341')
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(contactId) })
      .then((deletedResponse) => {
        if (deletedResponse.acknowledged) {
          if (deletedResponse.deletedCount > 0) {
            res.status(200).send();
          } else {
            res
              .status(202)
              .json(
                'Request was successful but no document deleted (probably due to id not matching)'
              );
          }
        } else {
          res.status(500).json(res.error);
        }
      });
  } catch (e) {
    throw new Error(e);
  }
}

async function updateOneContact(req, res, next) {
  const contactId = req.params.id;
  const filter = { _id: new ObjectId(contactId) };
  const updateDoc = {
    $set: {
      firstName: req.body.firstName
    }
  };
  await mongodb
    .getMongoDb()
    .db('cse341')
    .collection('contacts')
    .updateOne(filter, updateDoc)
    .then((response) => {
      if (response.acknowledged) {
        if (response.modifiedCount <= 0) {
          if (response.matchedCount > 0) {
            res
              .status(201)
              .json(
                'No error but document not modified due to same data in put request as the original data'
              );
          } else {
            res.status(202).json('ID did not match any current data');
          }
        } else {
          res.status(200).send();
        }
      } else {
        res.status(500).json(response.error || 'Could not update due to unknown error');
      }
    });
}

module.exports = {
  getName,
  getAllContacts,
  getOneContact,
  insertOneContact,
  deleteOneContact,
  updateOneContact
};
