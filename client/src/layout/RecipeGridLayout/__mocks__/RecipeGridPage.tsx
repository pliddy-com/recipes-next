import { RecipeDefaultFragment } from 'types/queries';

jest.createMockFromModule('../RecipeGridLayout');

export const RecipeGridLayout = jest.fn(
  ({ recipes, title }: { recipes: RecipeDefaultFragment[]; title: string }) => (
    <div data-testid="RecipeGridLayout">
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

export default RecipeGridLayout;
