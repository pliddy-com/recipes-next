import { useHits, useSearchBox, UseSearchBoxProps } from 'react-instantsearch';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RecipeCard from 'components/RecipeCard/RecipeCard';

interface HitProps {
  title: string;
  abstract: string;
  image: {
    sys: {
      id: string;
    };
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
        sys: {
          id: string;
        };
        title?: string | null | undefined;
        slug?: string | null | undefined;
      }
    ];
  };
  __typename: 'Recipe';
  sys: { id: string };
}

// TODO: mock for unit test; move to lib

/* istanbul ignore next */
const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  search(query);
};

interface SearchResultsProps {
  title: string | null | undefined;
}

const SearchResults = ({ title }: SearchResultsProps) => {
  const { query } = useSearchBox({
    queryHook
  });

  const results = useHits();

  // TODO: infer props?
  const hits = results.hits as unknown as Array<HitProps>;

  if (!query)
    hits.sort((a, b) => (a.slug && b.slug && a.slug > b.slug ? 1 : -1));

  return (
    <>
      <Typography variant="h1" component="h2">{`${title}${
        query.length > 0 ? ' for ' : ''
      }${query}`}</Typography>
      <Typography variant="subtitle1" component="h3">
        {hits && `${hits.length} Recipes`}
      </Typography>

      <Grid container spacing={2}>
        {hits &&
          hits.map((hit, index) => {
            return (
              <Grid item lg={4} md={4} sm={6} xs={12} key={hit.slug}>
                {hit && <RecipeCard recipe={hit} preloadImg={index < 3} />}
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default SearchResults;
