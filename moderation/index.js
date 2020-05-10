const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    // Moderate status based on 'orange' keyword
    const status = content.includes('orange') ? 'rejected' : 'approved';

    // updated status event bus
    await axios.post('http://localhost:4004/events', {
      type: 'CommentModerated',
      data: { id, content, postId, status },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log(`Moderation Server is running at the port 4003`);
});
