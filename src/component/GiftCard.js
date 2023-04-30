import React from 'react';
import '../Product.css';

const GiftCard = ({ data }) => {
  return (
    <div className="gift-card">
      <div className="gift-card-image">
        <img src={data.image} alt={data.name} />
      </div>
      <div className="gift-card-info">
        <h2 className="gift-card-name">{data.name}</h2>
        <p className="gift-card-description">{data.shortDescription}</p>
        <div className="gift-card-details">
          <p className="gift-card-price">Price: {data.salePrice}</p>
          <p className="gift-card-manufacturer">Manufacturer: {data.manufacturer}</p>
          <p className="gift-card-categories">Categories: {data.categories.join(', ')}</p>
          <p className="gift-card-customer-reviews">Customer Reviews: {data.customerReviewCount}</p>
          <p className="gift-card-best-selling-rank">Best Selling Rank: {data.bestSellingRank}</p>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
