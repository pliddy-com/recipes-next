import Container from '@mui/material/Container';

import SearchResults from 'components/Search/SearchResults/SearchResults';
import SearchBox from 'components/Search/SearchBox/SearchBox';

interface SearchGridPageProps {
  title?: string | null;
  numRecipes: number;
}
const SearchGridPage = ({ numRecipes, title }: SearchGridPageProps) => {
  return (
    <Container
      className="page recipegrid search"
      data-testid="page"
      maxWidth="xl"
    >
      <SearchBox />
      <SearchResults title={title} numRecipes={numRecipes} />
    </Container>
  );
};

export default SearchGridPage;
