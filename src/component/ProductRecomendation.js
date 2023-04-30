import React from 'react';
import { FrequentlyBoughtTogether, RelatedProducts,} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

const recommendClient = recommend('B7SXTV5YO4', 'recycler_pro_query_suggestions');
const indexName = 'cbd64aadfaae4628407f429fa1c95583';

function ProductRecomendation({currentObjectID}) {
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

