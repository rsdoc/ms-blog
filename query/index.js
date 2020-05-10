const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const { eventHandler } = require('./handle-events');
const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  eventHandler(type, data, posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log(`Query Server is running at the port 4002`);

  // fetch all th events in case of service failure
  const events = await axios.get(`http://localhost:4004/events`);

  for (let evt of events.data) {
    console.log('Processing event of type : ', evt.type);
    eventHandler(evt.type, evt.data, posts);
  }
});
