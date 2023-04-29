import { useEffect, useState } from 'react';
import Article from './Article';
import news from "../news.json";

function News() {
  const [articles, setArticles] = useState(news);



  return (
    <div>  
      {
         articles.map((article) => (
          <Article {...article} key={article.title} />
        ))
      }

    
    </div>
  );
}

function Spinner() {
  return <div className="spinner" />;
}

export default News;
