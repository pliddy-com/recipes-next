// TODO: share this defintion with client without crossing workspaces (shared space?)

export type TagDefaultFragment = {
  __typename: 'Tag';
  slug?: string | null;
  sys: { __typename?: 'Sys'; id: string };
  title?: string | null;
};

export type ImageDefaultFragment = {
  __typename?: 'Asset';
  contentType?: string | null;
  description?: string | null;
  fileName?: string | null;
  height?: number | null;
  size?: number | null;
  sys: { __typename?: 'Sys'; id: string };
  title?: string | null;
  url?: string | null;
  width?: number | null;
};

export interface IRecipeSection {
  sectionItems: (string | null)[];
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
