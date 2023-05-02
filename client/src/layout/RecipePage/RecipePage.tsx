import Container from '@mui/material/Container';

import Recipe from 'components/Recipe/Recipe';
import RecipeEdit from 'components/Recipe/RecipeEdit';

import { useAuthContext } from 'contexts/Authentication';

import { RecipeDefaultFragment } from 'types/queries';

interface IRecipePage {
  content?: RecipeDefaultFragment;
}

const RecipePage = ({ content }: IRecipePage) => {
  const { isAuth, editMode } = useAuthContext();

  return content ? (
    <Container
      className={`page recipe ${isAuth ? 'auth' : 'noAuth'}`}
      data-testid="RecipePage"
      maxWidth="xl"
    >
      {isAuth && editMode ? (
        <RecipeEdit content={content} />
      ) : (
        <Recipe content={content} />
      )}
    </Container>
  ) : null;
};

export default RecipePage;
