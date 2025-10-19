import { ImageDefaultFragment, TagDefaultFragment } from './queries';

/*
    sectionItems are objects (define ISectionItem):
    [
      {
        id: string or generate uuidv4(),
        value: string
      }
    ]
*/

export interface IRecipeSection {
  sectionTitle: string | null;
  sectionItems: (string | null)[];
}

export interface IRecipeChangeSet {
  abstract: string;
  cookTime: string | number;
  equipment: (string | null)[];
  id: string;
  image: ImageDefaultFragment;
  ingredientsList: IRecipeSection[];
  instructionsList: IRecipeSection[];
  keywords: (string | null)[];
  notes: (string | null)[];
  prepTime: string | number;
  recipeYield: string | number;
  slug: string;
  tags: (TagDefaultFragment | null | undefined)[];
  title: string;
}
