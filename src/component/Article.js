import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Article = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/news')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.log(error));
  }, []);

  console.log(news);

  return (
    <div className="news-container">
      <h1 className="news-header">Latest News</h1>
      {news.length > 0 ? (
        <ul className="news-list">
          {news.map(item => (
            <li key={item.id} className="news-item">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-body">{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-news">No news to show.</p>
      )}
      <Link className="news-back-link" to="/">Back to Home</Link>
    </div>
  );
};

export default Article;
