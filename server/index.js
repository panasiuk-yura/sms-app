const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const pino = require('express-pino-logger')();
require('dotenv').config()
const accountSID = process.env.TWILIO_ACCOUNT_SID
const twilioTocken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(
  accountSID,
  twilioTocken
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const port = 3001;
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
      
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});