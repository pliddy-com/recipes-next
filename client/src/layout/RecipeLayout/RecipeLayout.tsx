import Container from '@mui/material/Container';

import Recipe from 'components/Recipe/Recipe';
import RecipeEdit from 'components/Recipe/RecipeEdit/RecipeEdit';

import { useAuthContext } from 'contexts/Authentication';
import { useContentManagementContext } from 'contexts/Content';

import { RecipeDefaultFragment } from 'types/queries';

interface IRecipePage {
  content?: RecipeDefaultFragment;
}

const RecipePage = ({ content }: IRecipePage) => {
  const { isAuth } = useAuthContext();
  const { editMode } = useContentManagementContext();

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
