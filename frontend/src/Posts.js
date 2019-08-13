import React from 'react';
import {useFetch} from './Hooks';
import moment from 'moment';
moment.locale('kr');

function Posts() {
  const [data, loading] = useFetch('http://localhost:8080/api/posts/');
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {data.results.map(post => (
            <div className="Post" key={`post-${post.id}`}>
              <h4 className="Post-title">{post.title}</h4>
              <div>{moment(post.created_at).format('lll')}</div>
              <div>{moment(post.created_at).format('lll')}</div>
              <div className="Post-tags">
                {post.tags.map((tag, i) => (
                  <span key={i}>
                    {i > 0 && ','}
                    {tag}
                  </span>
                ))}
              </div>
              <div className="Post-body">{post.body}</div>
              <img alt={post.title} src={post.image_url} />
              <div className="Post-author">{post.author.name}</div>
              <div className="Post-author-role">{post.author.role}</div>
              <div className="Post-author-location">{post.author.location}</div>
              <img
                className="Post-author-avatar"
                alt={post.author.name}
                src={post.author.avatar}
                width="{{32}}"
                height="{{32}}"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Posts;
