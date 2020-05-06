const express = require('express');
const app = express()

const hostname = "localhost";
const port = 3000;

app.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}`);
})

app.use( (req, res, next) =>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>hello world!</h1><p>i'm from express server</p>")
})