import React from 'react';
import { RelatedProducts,} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import '../Product.css';
import GiftCard from './GiftCard';

const recommendClient = recommend('B7SXTV5YO4', 'cbd64aadfaae4628407f429fa1c95583');
const indexName = 'recycler_pro_query_suggestions';

function ProductRecomendation({}) {
  const currentObjectID = '3098059'
  return (
    <div>
      <RelatedProducts
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
        maxRecommendations={5}
        itemComponent={({ item }) => {
          return (
            <GiftCard data= {item} />
          );
        }}
      />
    </div>
  );
}

export default ProductRecomendation;

