// const maths = require("./maths");
// const fs = require("fs");


// console.log("hello")
// console.log(maths.add(3, 4));
// console.log(maths.sub(3, 4));

// fs.writeFile("./text.txt", "hey i m vivek");

const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();

function handlefunction (req, res) {

    console.log(url.parse(req.url, true));
    fs.appendFile("log.txt", `server is used on ${Date.now()}on the url ${req.url}\n`, (err, data) => {

        switch (req.url) {
            case "/": res.end("this is homepage");
                break;
            case '/about':
                 res.end("this is vivek thakur");
                break;
            default: res.end("hello from vivu's server");
        }

    });
    // console.log("new  req is recieved");
}


app.get('/', (req, res) => {
    return res.end("this is homepage");
})
const myserver = http.createServer(app);

myserver.listen(8000, () => console.log("server is started hurray!!!"))   