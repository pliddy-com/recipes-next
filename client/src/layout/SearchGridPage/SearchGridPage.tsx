/* istanbul ignore file */

import Container from '@mui/material/Container';

import { RecipeDefaultFragment } from 'types/queries';

import SearchResults from 'components/Search/SearchResults/SearchResults';
import SearchBox from 'components/Search/SearchBox/SearchBox';

interface SearchGridPageProps {
  description?: string | null;
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const SearchGridPage = ({ title }: SearchGridPageProps) => {
  return (
    <Container
      className="page recipegrid search"
      data-testid="page"
      maxWidth="xl"
    >
      <SearchBox />
      <SearchResults title={title} />
    </Container>
  );
};

export default SearchGridPage;
