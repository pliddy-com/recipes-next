import Container from '@mui/material/Container';

import SearchResults from 'components/Search/SearchResults/SearchResults';
import SearchBox from 'components/Search/SearchBox/SearchBox';

interface SearchGridPageProps {
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
