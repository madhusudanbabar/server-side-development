const http = require("http")
const path = require('path');
const fs = require('fs');

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`request for ${req.url} by method ${req.method}`);
    var fileUrl;
    if (req.method == "GET") {
        if (req.url == "/") {
            fileUrl = "/index.html";
            fs.createReadStream(path.resolve(__dirname+ fileUrl)).pipe(res)
        }
        else {
            fileUrl = req.url;
            if (path.extname(fileUrl) == ".html") {
                fs.exists(path.resolve(__dirname+ fileUrl), (exists) => {
                    if (!exists) {
                        res.statusCode = 400;
                        res.end("<h1>file not found</h1>");
                    }
                    else {
                        fs.createReadStream(path.resolve(__dirname+ fileUrl)).pipe(res);
                    }
                })
            }
            else {
                res.statusCode = 400;
                res.end("<h1>file type not supported</h1>");
            }
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);

})