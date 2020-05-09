const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  console.log('Event was fired ...', event);

  axios.post(`http://localhost:4000/events`, event); // event fired to posts service
  axios.post(`http://localhost:4001/events`, event); // event fired to comments service
  axios.post(`http://localhost:4002/events`, event); // event fired to query service

  res.send({ status: 'OK' });
});

app.listen(4004, () => {
  console.log(` [ Event Bus server is listening on port 4004 ]`);
});
