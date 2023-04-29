import React from 'react'

function Article({ img, sentiment, source, summary, title, url }) {
    return (
        <div className="article" key={title}>
          <div className="article-image">
            <img src={img} alt={title} />
          </div>
          <div className='article-list'>
          <div className="article-content">
            <h2 className="article-title">{title}</h2>
            <p className="article-summary">{summary}</p>
            <p className="article-source">{source}</p>
            <p className="article-sentiment">{sentiment}</p>
            <a className="article-link" href={url}>Read More</a>
          </div>
          </div>
        </div>
    )
}

export default Article
