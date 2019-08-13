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
          {data.results.map(({id, title, image_url}) => (
            <p key={`post-${id}`}>
              <img alt={title} src={image_url} />
            </p>
          ))}
        </div>
      )}
    </>
  );
}
export default Posts;
