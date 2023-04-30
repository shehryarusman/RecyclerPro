import React from 'react';
import { FrequentlyBoughtTogether, RelatedProducts,} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import '../Product.css';
import GiftCard from './GiftCard';

const recommendClient = recommend('B7SXTV5YO4', 'cbd64aadfaae4628407f429fa1c95583');
const indexName = 'recycler_pro_query_suggestions';

function ProductRecomendation({}) {
  const currentObjectID = '1696302'
  return (
    <div>
      <RelatedProducts
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
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

