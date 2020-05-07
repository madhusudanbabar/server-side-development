const express = require('express');
const app = express();
const morgan = require('morgan');

const hostname = "localhost";
const port = 3000;

app.use(morgan("dev"));

app.use(express.static(__dirname+"/public"));


app.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}`);
})

app.use( (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Powered-By", "krypton")
    next();
})

//#region dishes API

app.get("/dishes",(req, res)=>{
    res.end("sending you all the dishes");
})

app.get("/dishes/:id",(req, res)=>{
    res.end(`sending you the details of dish with id ${req.params.id}`);
})

app.post("/dishes",(req, res)=>{
    res.end("new dish added");
})

app.put("/dishes",(req, res)=>{
    res.end("operation not supported");
})

app.put("/dishes/:id",(req, res)=>{
    res.end(`updating details of dish with id ${req.params.id}`);
})

app.delete("/dishes",(req, res)=>{
    res.end("deleting all the dishes");
})

app.delete("/dishes/:id",(req, res)=>{
    res.end(`deleting the details of dish with id ${req.params.id}`);
})

