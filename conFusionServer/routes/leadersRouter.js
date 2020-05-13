const express = require('express');
const bodyParser = require('body-parser');
var leadersRouter = express.Router();

leadersRouter.use(bodyParser.json())

leadersRouter.route("/").all((req, res, next)=>{
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain")
    next();
})
.get( (req, res) => {
    res.end("all leader details")
})
.put((req, res) => {
    res.end("put method for leadersRouter")
})

.post((req, res) => {
    res.end("new leader added");
})
.delete( (req, res) => {
    res.end(`deleting all leaders`);
});

leadersRouter.route("/:leaderId").all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.delete((req, res) => {
    res.end(`deleting the details of leader with ileaderId ${req.params.leaderId}`);
})
.put((req, res) => {
    res.end(`updating details of leader with leaderId ${req.params.leaderId}`);
})
.get((req, res) => {
    res.end(`sending you the details of leader with leaderId ${req.params.leaderId}`);
})
.post((req, res) =>{
    res.end(`POST operation not supported on /leaders${req.url}`)
})

module.exports = leadersRouter
