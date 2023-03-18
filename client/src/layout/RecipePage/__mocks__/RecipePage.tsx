import { RecipeDefaultFragment } from 'types/queries';

jest.createMockFromModule('../RecipePage');

export const RecipePage = jest.fn(
  ({ content }: { content: RecipeDefaultFragment }) => {
    const { title, slug, abstract, image } = content;
    const { fileName } = image ?? {};

    return (
      <div data-testid="RecipePage">
        <h1>{title}</h1>
        <p>{slug}</p>
        <p>{abstract}</p>
        <p>{fileName}</p>
      </div>
    );
  }
);

export default RecipePage;
