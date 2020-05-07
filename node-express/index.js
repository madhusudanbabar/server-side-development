const express = require('express');
const app = express();
const morgan = require('morgan');
const dishRouter = require("./routes/dishRouter")
const promoRouter = require("./routes/promoRouter")
const leadersRouter = require("./routes/leadersRouter")

const hostname = "localhost";
const port = 3000;

app.use(morgan("dev"));

app.use(express.static(__dirname+"/public"));

app.use("/dishes", dishRouter)
app.use("/promotions", promoRouter)
app.use("/leaders", leadersRouter)

app.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}`);
})

app.use( (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Powered-By", "krypton")
    next();
})


