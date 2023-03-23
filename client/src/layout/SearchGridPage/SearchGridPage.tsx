/* istanbul ignore file */

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/queries';
import SearchBox from 'components/SearchBox/SearchBox';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom';

const searchClient =
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY &&
  algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );

interface HitProps {
  title: string;
  abstract: string;
  image: {
    __typename: 'Asset';
    description: string;
    height: number;
    url: string;
    width: number;
  };
  slug: string;
  tagsCollection: {
    items: [
      {
        __typename: 'Tag';
        title?: string | null | undefined;
        slug?: string | null | undefined;
      }
    ];
  };
  __typename: 'Recipe';
  sys: object;
}

const Hits = ({ hits }: { hits: Array<HitProps> }) => {
  return (
    <Grid container spacing={2}>
      {hits &&
        hits.map((hit, index) => {
          //   const recipe = hitToRecipe(hit);
          return (
            <Grid item lg={4} md={4} sm={6} xs={12} key={hit?.slug}>
              {hit && <RecipeCard recipe={hit} preloadImg={index < 3} />}
            </Grid>
          );
        })}
    </Grid>
  );
};

const CustomHits = connectHits(Hits);

interface SearchGridPageProps {
  description?: string | null;
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const SearchGridPage = ({ recipes, title }: SearchGridPageProps) => {
  const [data, setData] = useState<(RecipeDefaultFragment | null)[]>([]);

  const numPreload = 6;
  const scrollThreshold = 900;

  useEffect(() => {
    if (recipes) {
      const subset = recipes.slice(0, numPreload);
      setData(subset);
    }
  }, [recipes]);

  /* istanbul ignore next */
  const loadNext = () => setData(recipes.slice(0, data.length + numPreload));

  return data && data.length > 0 ? (
    <Container className="page recipegrid" data-testid="page" maxWidth="xl">
      <InstantSearch searchClient={searchClient} indexName="recipes_index">
        <Configure hitsPerPage={100} />
        <SearchBox />
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1" component="h2">
          {recipes && `${recipes.length} Recipes`}
        </Typography>
        <InfiniteScroll
          hasMore={data.length < recipes.length}
          initialLoad={true}
          loader={<Loading key={`loading-${data.length}`} />}
          loadMore={loadNext}
          pageStart={0}
          threshold={scrollThreshold}
        >
          <CustomHits />
        </InfiniteScroll>
      </InstantSearch>
    </Container>
  ) : null;
};

export default SearchGridPage;
