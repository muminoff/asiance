import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './Blog.css';
import './Font.css';

import Posts from './Posts';

const Blog = () => {
  return (
    <div className="Main">
      <header className="Blog-header">
        <h1 className="Blog-title">The Blog</h1>
      </header>
      <Container fluid={true}>
        <Row>
          <Posts />
        </Row>
      </Container>
    </div>
  );
};

export default Blog;
