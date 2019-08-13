import React, {useState, useEffect} from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './Blog.css';
import './Font.css';

import Posts from './Posts';

const Blog = () => {
  return (
    <div className="Blog">
      <header className="Blog-header">
        <h1 className="Blog-title">The Blog</h1>
      </header>
      <Posts />
    </div>
  );
};

export default Blog;
