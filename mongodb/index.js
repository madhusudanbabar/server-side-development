const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const dboper = require("./operation");


const url = "mongodb://localhost:27017";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) =>{
    assert.equal(err, null);
    console.log("connected to server");
    const db = client.db(dbname);
    dboper.insertDocument(db, { name :"tbd", des:"xyz"}, "dishes", (res) =>{
        console.log("insertDocument:\n ", res.ops);
        dboper.findDocuments(db, "dishes", (docs) =>{
            console.log("found documents:\n ", docs);
            dboper.updateDocument(db, { name: "tbd"}, {des : "updated"}, "dishes", (res) =>{
                console.log("updated document:\n", res.result);
                dboper.findDocuments(db, "dishes",(docs) =>{
                    console.log("found documents:\n", docs);
                    db.dropCollection("dishes", (res)=>{
                        console.log("dropped collection:", res)
                        client.close()
                    })
                })
            })
        })
    })
})