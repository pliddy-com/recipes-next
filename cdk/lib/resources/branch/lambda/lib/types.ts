// TODO: share this defintion with client without crossing workspaces (shared space?)

export interface IRecipeSection {
  sectionTitle: string | null;
  sectionItems: (string | null)[];
}

export interface IRecipeChangeSet {
  abstract: string;
  cookTime: string | number;
  equipment: (string | null)[];
  id: string;
  ingredientsList: IRecipeSection[];
  instructionsList: IRecipeSection[];
  keywords: (string | null)[];
  notes: (string | null)[];
  prepTime: string | number;
  recipeYield: string | number;
  slug: string;
  title: string;
}
