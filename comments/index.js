const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const comments = {};

app.use(cors());
app.use(bodyParser.json());

// get all comments by post
app.get('/posts/:id/comments', (req, res) => {
  res.send(comments);
});

// create comments for post by id
app.post('/posts/:id/comments', (req, res) => {
  // create the post here
  const id = randomBytes(4).toString('hex');
  const { postId, content } = req.body;

  comments[id] = { id, postId, content };

  res.status(201).send(comments[id]);
});

app.listen(4100, () => {
  console.log(`Comments Server is running at the port 4100`);
});
