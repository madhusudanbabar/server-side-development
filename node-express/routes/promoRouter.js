const express = require('express');
const bodyParser = require('body-parser');
var promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route("/").all((req, res, next)=>{
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain")
    next();
})
.get( (req, res) => {
    res.end("all promotions")
})
.put((req, res) => {
    res.end("put method for promoRouter")
})

.post((req, res) => {
    res.end("new promotion added");
})
.delete( (req, res) => {
    res.end(`deleting all promotions`);
});

promoRouter.route("/:promoId").all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.delete((req, res) => {
    res.end(`deleting the details of promotion with promoId ${req.params.promoId}`);
})
.put((req, res) => {
    res.end(`updating details of promotion with promoId ${req.params.promoId}`);
})
.get((req, res) => {
    res.end(`sending you the details of promotion with promoId ${req.params.promoId}`);
})

module.exports = promoRouter
