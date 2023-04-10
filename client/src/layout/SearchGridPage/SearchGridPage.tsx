import Container from '@mui/material/Container';

import SearchResults from 'components/Search/SearchResults/SearchResults';
import SearchBox from 'components/Search/SearchBox/SearchBox';
import Typography from '@mui/material/Typography';

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
      <Typography variant="h1" sx={{ marginBottom: '0.75rem' }}>
        {title}
      </Typography>

      <SearchBox />
      <SearchResults />
    </Container>
  );
};

export default SearchGridPage;
