import React from 'react';
import {useFetch} from './Hooks';
import {Card, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTag} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/ko';

function Posts() {
  const [data, loading] = useFetch('http://localhost:8080/api/posts/');
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {data.results.map(post => (
            <Card
              style={{
                margin: '20px',
                border: 'none',
                borderRadius: '0 !important',
                width: 'auto',
              }}
              key={post.id}>
              <Card.Body>
                <Card.Title
                  style={{
                    fontFamily: 'Archivo Black',
                    fontStyle: 'bold, italic',
                    fontSize: '1.8em',
                  }}>
                  {post.title}
                </Card.Title>
                <div className="box2 justify-content-end">
                  <Image
                    style={{
                      verticalAlign: 'middle',
                      width: '50px',
                      height: '50px',
                    }}
                    src={post.author.avatar}
                    roundedCircle
                  />
                  <span style={{}}>
                    <div>
                      {post.author.name}
                      <br />
                      {post.author.location}
                    </div>
                  </span>
                </div>
                <Card.Subtitle className="mb-2 text-muted">
                  Created: {moment(post.created_at * 1000).format('lll')}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Updated: {moment(post.updated_at * 1000).format('lll')}
                </Card.Subtitle>
                <div className="Post-tags">
                  <FontAwesomeIcon icon={faTag} />
                  {post.tags.map((tag, i) => (
                    <span key={i}>
                      {i > 0 && ','} {tag}
                    </span>
                  ))}
                </div>
                <div className="box">
                  <Card.Img
                    style={{
                      width: '200px',
                      paddingTop: '20px',
                      paddingRight: '20px',
                      paddingBottom: '20px',
                    }}
                    variant="top"
                    src={post.image_url}
                  />
                  <span
                    style={{
                      paddingTop: '20px',
                    }}>
                    {post.body}
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
export default Posts;
