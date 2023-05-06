// TODO: share this defintion with client without crossing workspaces (shared space?)

export interface IRecipeChangeSet {
  abstract: string;
  cookTime: string | number;
  id: string;
  prepTime: string | number;
  recipeYield: string | number;
  slug: string;
  title: string;
}
