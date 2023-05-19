// TODO: share this defintion with client without crossing workspaces (shared space?)

export type TagDefaultFragment = {
  __typename: 'Tag';
  title?: string | null;
  slug?: string | null;
  sys: { __typename?: 'Sys'; id: string };
};

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
  tags: (TagDefaultFragment | null | undefined)[];
  title: string;
}
