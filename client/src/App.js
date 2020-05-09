import React from 'react';

import { PostCreate } from './componets/PostCreate';
import PostList from './componets/PostList';

export default () => {
  return (
    <div className='container m-5'>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
