import '@testing-library/jest-dom';
// import testing-library methods
import { act, fireEvent, render, waitFor } from '@testing-library/react';

// import the component to test
import RecipeEdit from './RecipeEdit';

import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';
// import * as AuthContext from 'contexts/Authentication';
import * as ContentManagementContext from 'contexts/Content';

jest.mock('lib/api');
jest.mock('contexts/Authentication');
jest.mock('contexts/Content');

jest.mock('./EditComponents/TagsEdit');

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', async () => {
      const titleValue = 'TITLE';
      const abstractValue = 'ABSTRACT';
      const prepTimeValue = '30';
      const cookTimeValue = '30';
      const recipeYieldValue = '10';

      const { recipe } = await api.getRecipePage();

      const { asFragment, getByRole, queryByLabelText, queryByTestId } = render(
        <RecipeEdit content={recipe} />
      );

      await act(async () =>
        expect(queryByTestId('RecipeEdit')).toBeInTheDocument()
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();

      // check code for toggling Save enabled

      const recipeYieldInput = queryByLabelText('Recipe Yield');
      recipeYieldInput &&
        fireEvent.change(recipeYieldInput, {
          target: { value: recipeYieldValue }
        });
      expect(recipeYieldInput).toHaveValue(recipeYieldValue);

      recipeYieldInput &&
        fireEvent.change(recipeYieldInput, {
          target: { value: '4' }
        });
      expect(recipeYieldInput).toHaveValue('4');

      // Test form field inputs
      const titleInput = queryByLabelText('Title');

      // check code for toggling Save enabled
      titleInput &&
        fireEvent.change(titleInput, { target: { value: titleValue } });
      expect(titleInput).toHaveValue(titleValue);

      titleInput &&
        fireEvent.change(titleInput, { target: { value: 'Recipe Title' } });
      expect(titleInput).toHaveValue('Recipe Title');

      // slug is slugified title
      const slugInput = queryByLabelText('Slug');
      expect(slugInput).toHaveValue('recipe-title');

      const abstractInput = queryByLabelText('Abstract');
      abstractInput &&
        fireEvent.change(abstractInput, {
          target: { value: abstractValue }
        });
      expect(abstractInput).toHaveValue(abstractValue);

      const tagControl = queryByTestId('tags-select') as HTMLInputElement;

      // assert that callback is called on click & there was a change in the DOM
      tagControl && fireEvent.click(tagControl);

      const tagItem = queryByTestId('test-value');

      waitFor(async () => expect(tagItem).toBeVisible());

      tagControl &&
        fireEvent.change(tagControl, { target: { value: 'Test Value' } });

      await act(
        async () => tagControl && expect(tagControl.value).toBe('test-value')
      );

      const prepTimeInput = queryByLabelText('Prep Time');
      prepTimeInput &&
        fireEvent.change(prepTimeInput, {
          target: { value: prepTimeValue }
        });
      expect(prepTimeInput).toHaveValue(prepTimeValue);

      const cookTimeInput = queryByLabelText('Cook Time');
      cookTimeInput &&
        fireEvent.change(cookTimeInput, {
          target: { value: cookTimeValue }
        });
      expect(cookTimeInput).toHaveValue(cookTimeValue);

      const clickImage = getByRole('button', {
        name: 'select image biscuits.jpg'
      });

      clickImage && fireEvent.click(clickImage);

      const equipmentInput = queryByLabelText('Equipment 1');
      equipmentInput &&
        fireEvent.change(equipmentInput, {
          target: { value: 'test' }
        });
      expect(equipmentInput).toBeInTheDocument();

      const notesInput = queryByLabelText('Notes 1');
      notesInput &&
        fireEvent.change(notesInput, {
          target: { value: 'test' }
        });
      expect(notesInput).toBeInTheDocument();

      const keywordsInput = queryByLabelText('Keywords 1');
      keywordsInput &&
        fireEvent.change(keywordsInput, {
          target: { value: 'test' }
        });
      expect(keywordsInput).toBeInTheDocument();

      const ingredientsInput = queryByLabelText('Ingredients Section Label 1');
      ingredientsInput &&
        fireEvent.change(ingredientsInput, {
          target: { value: 'test' }
        });
      expect(ingredientsInput).toBeInTheDocument();

      const instructionsInput = queryByLabelText(
        'Instructions Section Label 1'
      );
      instructionsInput &&
        fireEvent.change(instructionsInput, {
          target: { value: 'test' }
        });
      expect(instructionsInput).toBeInTheDocument();
    });
  });

  describe('when editLoading is true', () => {
    it('displays the Loading component', async () => {
      const content = await api.getRecipePage();

      const testContentManagementContext = {
        ...ContentManagementContext.useContentManagementContext(),
        editLoading: true
      };

      jest
        .spyOn(ContentManagementContext, 'useContentManagementContext')
        .mockImplementationOnce(() => testContentManagementContext);

      const { asFragment, queryByRole } = render(
        <RecipeEdit content={content as unknown as RecipeDefaultFragment} />
      );

      // assert that an SVG with an aria role of 'graphics-symbol' exists
      const component = queryByRole('graphics-symbol', { name: 'spinner' });
      expect(component).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the Recipe', () => {
      const content = undefined;

      // test if content is not rendered
      const { queryByTestId } = render(<RecipeEdit content={content} />);

      const recipe = queryByTestId('RecipeEdit');
      expect(recipe).toBeNull();
    });
  });
});
