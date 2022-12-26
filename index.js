// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  // let header = JSON.stringify(req.headers);
  let header = req.headers;
  let taskInfo = {
    "ipaddress": header.referer,
    "language" : header["accept-language"],
    "software" : header["user-agent"]
  };
  return res.end(JSON.stringify(taskInfo)); 
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
