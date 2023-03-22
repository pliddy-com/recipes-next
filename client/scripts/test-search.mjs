#!/usr/bin/env node

import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

(async () => {
  // initialize environment variables
  dotenv.config();

  const { NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_SEARCH_ADMIN_KEY } = process.env;

  const client = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_ADMIN_KEY
  );

  const index = client.initIndex('recipes_index');

  const queryText = 'baking';

  index.search(queryText).then(({ hits }) => {
    console.log(hits);
  });
})();
