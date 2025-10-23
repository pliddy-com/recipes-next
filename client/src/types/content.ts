import { ImageDefaultFragment, TagDefaultFragment } from './queries';

export interface IRecipeItemObject {
  id: string | null;
  value: string | null;
}

export interface IRecipeSection {
  id?: string | null;
  itemList?: (IRecipeItemObject | null)[];
  sectionItems?: (string | null)[];
  sectionTitle: string | null;
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
