const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const events = [];

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  console.log('Event was fired ...', event.type);

  axios.post(`http://localhost:4000/events`, event); // event fired to posts service
  axios.post(`http://localhost:4001/events`, event); // event fired to comments service
  axios.post(`http://localhost:4002/events`, event); // event fired to query service
  axios.post(`http://localhost:4003/events`, event); // event fired to moderation service

  res.send({ status: 'OK' });
});

// endpoint for getting all the fired events
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4004, () => {
  console.log(` [ Event Bus server is listening on port 4004 ]`);
});
