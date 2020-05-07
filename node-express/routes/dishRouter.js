const express = require('express');
const bodyParser = require('body-parser');
var dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
    })

    .get( (req, res) => {
        res.end("sending you all the dishes")
    })
    .put((req, res) => {
        res.end("put method")
    })

    .post((req, res) => {
        res.end("new dish added");
    })
    .delete( (req, res) => {
        res.end(`deleting all dishes`);
    });

    dishRouter.route("/:id").all((req, res, next) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
    })
    .delete((req, res) => {
        res.end(`deleting the details of dish with id ${req.params.id}`);
    })
    .put((req, res) => {
        res.end(`updating details of dish with id ${req.params.id}`);
    })
    .get((req, res) => {
        res.end(`sending you the details of dish with id ${req.params.id}`);
    })

module.exports = dishRouter