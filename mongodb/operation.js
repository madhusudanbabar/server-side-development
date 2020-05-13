const client = require("mongodb").MongoClient;
const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, res) =>{
        assert.equal(err, null);
        console.log("inserted "+res.result.n +"documents to the collection");
        callback(res);
    })
}

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) =>{
        assert.equal(err, null);
        callback(docs);
    })
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, res) => {
        assert.equal(err, null);
        console.log("Removed the document :"+document);
        callback(res)
    })
}

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update}, null, (err, res) =>{
        assert.equal(err, null);
        console.log("Updated the document with ", update);
    })
}