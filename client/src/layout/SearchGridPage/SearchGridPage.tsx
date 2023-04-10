import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
      <>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1" component="h2">
          {numRecipes} Recipes
        </Typography>
      </>
      <SearchResults title={title} />
    </Container>
  );
};

export default SearchGridPage;
