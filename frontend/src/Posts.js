import React from 'react';
import {useFetch} from './Hooks';
function Posts() {
  const [data, loading] = useFetch('http://localhost:8080/api/posts/');
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {data.results.map(post => (
            <div key={`post-${post.id}`}>
              <h4>{post.title}</h4>
              <small>{post.created_at}</small>
              <img alt={post.title} src={post.image_url} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Posts;
