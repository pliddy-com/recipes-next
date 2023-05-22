import { ImageDefaultFragment, TagDefaultFragment } from './queries';

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
