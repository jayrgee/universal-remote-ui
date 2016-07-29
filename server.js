// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post("/api", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    console.log(req.body);
    res.sendStatus(200);
});

// listen for requests :)
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});