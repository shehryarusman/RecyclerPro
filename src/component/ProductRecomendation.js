import React from 'react';
import { FrequentlyBoughtTogether, RelatedProducts,} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

const recommendClient = recommend('B7SXTV5YO4', 'cbd64aadfaae4628407f429fa1c95583');
const indexName = 'recycler_pro_query_suggestions';

function ProductRecomendation({}) {
  const currentObjectID = '1696302'
  return (
    <div>
      <FrequentlyBoughtTogether
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
        itemComponent={({ item }) => {
          return (
            <pre>
              <code>{JSON.stringify(item)}</code>
            </pre>
          );
        }}
      />
      <RelatedProducts
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
        itemComponent={({ item }) => {
          return (
            <pre>
              <code>{JSON.stringify(item)}</code>
            </pre>
          );
        }}
      />
    </div>
  );
}

export default ProductRecomendation;

