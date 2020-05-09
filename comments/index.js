const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());

// get all comments by post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// create comments for post by id
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post(`http://localhost:4004/events`, {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log(` Event Received is of : ${req.body.type}`);
  res.send({});
});

app.listen(4001, () => {
  console.log(`Comments Server is running at the port 4001`);
});
