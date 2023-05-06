export interface IRecipeSection {
  sectionTitle: string | null;
  sectionItems: string[] | null;
}

export interface IRecipeChangeSet {
  abstract: string;
  cookTime: string | number;
  id: string;
  prepTime: string | number;
  recipeYield: string | number;
  slug: string;
  title: string;
}
