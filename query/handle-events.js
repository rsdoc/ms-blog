const eventHandler = (type, data, posts) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  // CommentUpdated event after - moderation
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    // find the specific comment in the post
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

module.exports = { eventHandler };
