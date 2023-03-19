import { RecipeDefaultFragment } from 'types/queries';

jest.createMockFromModule('../RecipeGridPage');

export const RecipeGridPage = jest.fn(
  ({ recipes, title }: { recipes: RecipeDefaultFragment[]; title: string }) => (
    <div data-testid="RecipeGridPage">
      <h1>{title}</h1>
      {recipes &&
        recipes.map(({ slug, title }) => {
          return (
            <div key={slug}>
              <p>{slug}</p>
              <p>{title}</p>
            </div>
          );
        })}
    </div>
  )
);

export default RecipeGridPage;
