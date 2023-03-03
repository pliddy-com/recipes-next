import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  recipeCollection?: Maybe<RecipeCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsRecipeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSection = Entry & {
  __typename?: 'IngredientSection';
  contentfulMetadata: ContentfulMetadata;
  ingredientList?: Maybe<Array<Maybe<Scalars['String']>>>;
  label?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<IngredientSectionLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSectionIngredientListArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSectionLabelArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSectionSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of ingredients grouped into a section with a title. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/ingredientSection) */
export type IngredientSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type IngredientSectionCollection = {
  __typename?: 'IngredientSectionCollection';
  items: Array<Maybe<IngredientSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type IngredientSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<IngredientSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IngredientSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  ingredientList_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ingredientList_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ingredientList_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ingredientList_exists?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type IngredientSectionLinkingCollections = {
  __typename?: 'IngredientSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  recipeCollection?: Maybe<RecipeCollection>;
};


export type IngredientSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type IngredientSectionLinkingCollectionsRecipeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum IngredientSectionOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSection = Entry & {
  __typename?: 'InstructionSection';
  contentfulMetadata: ContentfulMetadata;
  instructionList?: Maybe<Array<Maybe<Scalars['String']>>>;
  label?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<InstructionSectionLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSectionInstructionListArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSectionLabelArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSectionSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a list of Instructions grouped into a section with a title." [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/instructionSection) */
export type InstructionSectionTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type InstructionSectionCollection = {
  __typename?: 'InstructionSectionCollection';
  items: Array<Maybe<InstructionSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type InstructionSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<InstructionSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<InstructionSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  instructionList_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instructionList_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instructionList_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instructionList_exists?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  label_contains?: InputMaybe<Scalars['String']>;
  label_exists?: InputMaybe<Scalars['Boolean']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_not?: InputMaybe<Scalars['String']>;
  label_not_contains?: InputMaybe<Scalars['String']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InstructionSectionLinkingCollections = {
  __typename?: 'InstructionSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  recipeCollection?: Maybe<RecipeCollection>;
};


export type InstructionSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type InstructionSectionLinkingCollectionsRecipeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum InstructionSectionOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
  ingredientSection?: Maybe<IngredientSection>;
  ingredientSectionCollection?: Maybe<IngredientSectionCollection>;
  instructionSection?: Maybe<InstructionSection>;
  instructionSectionCollection?: Maybe<InstructionSectionCollection>;
  recipe?: Maybe<Recipe>;
  recipeCollection?: Maybe<RecipeCollection>;
  tag?: Maybe<Tag>;
  tagCollection?: Maybe<TagCollection>;
  taxonomy?: Maybe<Taxonomy>;
  taxonomyCollection?: Maybe<TaxonomyCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryIngredientSectionArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryIngredientSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<IngredientSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IngredientSectionFilter>;
};


export type QueryInstructionSectionArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryInstructionSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<InstructionSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InstructionSectionFilter>;
};


export type QueryRecipeArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryRecipeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<RecipeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RecipeFilter>;
};


export type QueryTagArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTagCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TagOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagFilter>;
};


export type QueryTaxonomyArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTaxonomyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TaxonomyOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TaxonomyFilter>;
};

/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type Recipe = Entry & {
  __typename?: 'Recipe';
  abstract?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  cookTime?: Maybe<Scalars['String']>;
  description?: Maybe<RecipeDescription>;
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Asset>;
  ingredientsCollection?: Maybe<RecipeIngredientsCollection>;
  instructionsCollection?: Maybe<RecipeInstructionsCollection>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  linkedFrom?: Maybe<RecipeLinkingCollections>;
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  prepTime?: Maybe<Scalars['String']>;
  recipeYield?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  tagsCollection?: Maybe<RecipeTagsCollection>;
  title?: Maybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeAbstractArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeCookTimeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeEquipmentArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeIngredientsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeInstructionsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeKeywordsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeNotesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipePrepTimeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeRecipeYieldArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeTagsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** This is a full recipe with ingredients, equipment, and directions. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/recipe) */
export type RecipeTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type RecipeCollection = {
  __typename?: 'RecipeCollection';
  items: Array<Maybe<Recipe>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type RecipeDescription = {
  __typename?: 'RecipeDescription';
  json: Scalars['JSON'];
  links: RecipeDescriptionLinks;
};

export type RecipeDescriptionAssets = {
  __typename?: 'RecipeDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type RecipeDescriptionEntries = {
  __typename?: 'RecipeDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type RecipeDescriptionLinks = {
  __typename?: 'RecipeDescriptionLinks';
  assets: RecipeDescriptionAssets;
  entries: RecipeDescriptionEntries;
};

export type RecipeFilter = {
  AND?: InputMaybe<Array<InputMaybe<RecipeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<RecipeFilter>>>;
  abstract?: InputMaybe<Scalars['String']>;
  abstract_contains?: InputMaybe<Scalars['String']>;
  abstract_exists?: InputMaybe<Scalars['Boolean']>;
  abstract_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  abstract_not?: InputMaybe<Scalars['String']>;
  abstract_not_contains?: InputMaybe<Scalars['String']>;
  abstract_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  cookTime?: InputMaybe<Scalars['String']>;
  cookTime_contains?: InputMaybe<Scalars['String']>;
  cookTime_exists?: InputMaybe<Scalars['Boolean']>;
  cookTime_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  cookTime_not?: InputMaybe<Scalars['String']>;
  cookTime_not_contains?: InputMaybe<Scalars['String']>;
  cookTime_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  equipment_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  equipment_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  equipment_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  equipment_exists?: InputMaybe<Scalars['Boolean']>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  ingredientsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  instructionsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  keywords_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywords_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywords_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywords_exists?: InputMaybe<Scalars['Boolean']>;
  notes_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notes_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notes_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notes_exists?: InputMaybe<Scalars['Boolean']>;
  prepTime?: InputMaybe<Scalars['String']>;
  prepTime_contains?: InputMaybe<Scalars['String']>;
  prepTime_exists?: InputMaybe<Scalars['Boolean']>;
  prepTime_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  prepTime_not?: InputMaybe<Scalars['String']>;
  prepTime_not_contains?: InputMaybe<Scalars['String']>;
  prepTime_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  recipeYield?: InputMaybe<Scalars['String']>;
  recipeYield_contains?: InputMaybe<Scalars['String']>;
  recipeYield_exists?: InputMaybe<Scalars['Boolean']>;
  recipeYield_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  recipeYield_not?: InputMaybe<Scalars['String']>;
  recipeYield_not_contains?: InputMaybe<Scalars['String']>;
  recipeYield_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tagsCollection_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RecipeIngredientsCollection = {
  __typename?: 'RecipeIngredientsCollection';
  items: Array<Maybe<IngredientSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type RecipeInstructionsCollection = {
  __typename?: 'RecipeInstructionsCollection';
  items: Array<Maybe<InstructionSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type RecipeLinkingCollections = {
  __typename?: 'RecipeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type RecipeLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum RecipeOrder {
  AbstractAsc = 'abstract_ASC',
  AbstractDesc = 'abstract_DESC',
  CookTimeAsc = 'cookTime_ASC',
  CookTimeDesc = 'cookTime_DESC',
  PrepTimeAsc = 'prepTime_ASC',
  PrepTimeDesc = 'prepTime_DESC',
  RecipeYieldAsc = 'recipeYield_ASC',
  RecipeYieldDesc = 'recipeYield_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type RecipeTagsCollection = {
  __typename?: 'RecipeTagsCollection';
  items: Array<Maybe<Tag>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** This is a string used as a tag for organizing content. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/tag) */
export type Tag = Entry & {
  __typename?: 'Tag';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TagLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** This is a string used as a tag for organizing content. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/tag) */
export type TagLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** This is a string used as a tag for organizing content. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/tag) */
export type TagSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a string used as a tag for organizing content. [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/tag) */
export type TagTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TagCollection = {
  __typename?: 'TagCollection';
  items: Array<Maybe<Tag>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TagFilter = {
  AND?: InputMaybe<Array<InputMaybe<TagFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TagFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TagLinkingCollections = {
  __typename?: 'TagLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  recipeCollection?: Maybe<RecipeCollection>;
  taxonomyCollection?: Maybe<TaxonomyCollection>;
};


export type TagLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TagLinkingCollectionsRecipeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TagLinkingCollectionsTaxonomyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TagOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type Taxonomy = Entry & {
  __typename?: 'Taxonomy';
  childrenCollection?: Maybe<TaxonomyChildrenCollection>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TaxonomyLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  tag?: Maybe<Tag>;
  title?: Maybe<Scalars['String']>;
};


/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type TaxonomyChildrenCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type TaxonomyLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type TaxonomySlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type TaxonomyTagArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** This is a structured collection of tags with a title [See type definition](https://app.contentful.com/spaces/fo9qwg6zarbt/content_types/taxonomy) */
export type TaxonomyTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TaxonomyChildrenCollection = {
  __typename?: 'TaxonomyChildrenCollection';
  items: Array<Maybe<TaxonomyChildrenItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TaxonomyChildrenItem = Tag | Taxonomy;

export type TaxonomyCollection = {
  __typename?: 'TaxonomyCollection';
  items: Array<Maybe<Taxonomy>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TaxonomyFilter = {
  AND?: InputMaybe<Array<InputMaybe<TaxonomyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TaxonomyFilter>>>;
  childrenCollection_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tag?: InputMaybe<CfTagNestedFilter>;
  tag_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TaxonomyLinkingCollections = {
  __typename?: 'TaxonomyLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  taxonomyCollection?: Maybe<TaxonomyCollection>;
};


export type TaxonomyLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TaxonomyLinkingCollectionsTaxonomyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TaxonomyOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type CfTagNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfTagNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfTagNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type NavMenuDataQueryVariables = Exact<{ [key: string]: never; }>;


export type NavMenuDataQuery = { __typename?: 'Query', categories?: { __typename: 'TaxonomyCollection', items: Array<{ __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | null> } | null } | null> } | null, cuisine?: { __typename: 'TaxonomyCollection', items: Array<{ __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | null> } | null } | null> } | null, tags?: { __typename: 'TagCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null> } | null };

export type RecipeSlugsQueryVariables = Exact<{
  where?: InputMaybe<RecipeFilter>;
}>;


export type RecipeSlugsQuery = { __typename?: 'Query', recipeCollection?: { __typename: 'RecipeCollection', items: Array<{ __typename?: 'Recipe', slug?: string | null } | null> } | null };

export type TagSlugsQueryVariables = Exact<{
  where?: InputMaybe<TagFilter>;
}>;


export type TagSlugsQuery = { __typename?: 'Query', tagCollection?: { __typename: 'TagCollection', items: Array<{ __typename?: 'Tag', slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null> } | null };

export type RecipeListQueryVariables = Exact<{
  where?: InputMaybe<TagFilter>;
}>;


export type RecipeListQuery = { __typename: 'Query', tagCollection?: { __typename: 'TagCollection', total: number, items: Array<{ __typename: 'Tag', slug?: string | null, title?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number, items: Array<{ __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null } | null> } | null } | null } | null> } | null };

export type RecipeIndexQueryVariables = Exact<{
  where?: InputMaybe<RecipeFilter>;
}>;


export type RecipeIndexQuery = { __typename: 'Query', recipeCollection?: { __typename?: 'RecipeCollection', total: number, items: Array<{ __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null } | null> } | null };

export type RecipePageQueryVariables = Exact<{
  where?: InputMaybe<RecipeFilter>;
}>;


export type RecipePageQuery = { __typename?: 'Query', recipeCollection?: { __typename: 'RecipeCollection', items: Array<{ __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, recipeYield?: string | null, prepTime?: string | null, cookTime?: string | null, equipment?: Array<string | null> | null, notes?: Array<string | null> | null, keywords?: Array<string | null> | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, ingredientsCollection?: { __typename?: 'RecipeIngredientsCollection', items: Array<{ __typename: 'IngredientSection', title?: string | null, slug?: string | null, label?: string | null, ingredientList?: Array<string | null> | null } | null> } | null, instructionsCollection?: { __typename?: 'RecipeInstructionsCollection', items: Array<{ __typename: 'InstructionSection', title?: string | null, slug?: string | null, label?: string | null, instructionList?: Array<string | null> | null } | null> } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null, description?: { __typename?: 'RecipeDescription', json: any, links: { __typename?: 'RecipeDescriptionLinks', assets: { __typename?: 'RecipeDescriptionAssets', block: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null> }, entries: { __typename?: 'RecipeDescriptionEntries', inline: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null> } } } | null } | null> } | null, categoriesTaxonomy?: { __typename: 'TaxonomyCollection', items: Array<{ __typename?: 'Taxonomy', childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null } | null> } | null } | null> } | null, cuisineTaxonomy?: { __typename: 'TaxonomyCollection', items: Array<{ __typename?: 'Taxonomy', childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null } | null> } | null } | null> } | null };

export type IngredientsDefaultFragment = { __typename: 'IngredientSection', title?: string | null, slug?: string | null, label?: string | null, ingredientList?: Array<string | null> | null };

export type InstructionsDefaultFragment = { __typename: 'InstructionSection', title?: string | null, slug?: string | null, label?: string | null, instructionList?: Array<string | null> | null };

export type ImageDefaultFragment = { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null };

export type DescriptionDefaultFragment = { __typename?: 'Recipe', description?: { __typename?: 'RecipeDescription', json: any, links: { __typename?: 'RecipeDescriptionLinks', assets: { __typename?: 'RecipeDescriptionAssets', block: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null> }, entries: { __typename?: 'RecipeDescriptionEntries', inline: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null> } } } | null };

export type RecipeDefaultFragment = { __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, recipeYield?: string | null, prepTime?: string | null, cookTime?: string | null, equipment?: Array<string | null> | null, notes?: Array<string | null> | null, keywords?: Array<string | null> | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, ingredientsCollection?: { __typename?: 'RecipeIngredientsCollection', items: Array<{ __typename: 'IngredientSection', title?: string | null, slug?: string | null, label?: string | null, ingredientList?: Array<string | null> | null } | null> } | null, instructionsCollection?: { __typename?: 'RecipeInstructionsCollection', items: Array<{ __typename: 'InstructionSection', title?: string | null, slug?: string | null, label?: string | null, instructionList?: Array<string | null> | null } | null> } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null, description?: { __typename?: 'RecipeDescription', json: any, links: { __typename?: 'RecipeDescriptionLinks', assets: { __typename?: 'RecipeDescriptionAssets', block: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null> }, entries: { __typename?: 'RecipeDescriptionEntries', inline: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null>, hyperlink: Array<{ __typename: 'IngredientSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'InstructionSection', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Recipe', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Tag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Taxonomy', sys: { __typename?: 'Sys', id: string } } | null> } } } | null };

export type RecipeSummaryFragment = { __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null };

export type TagDefaultFragment = { __typename: 'Tag', title?: string | null, slug?: string | null };

export type TagWithLinksFragment = { __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null };

export type ListPageItemFragment = { __typename: 'Tag', slug?: string | null, title?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number, items: Array<{ __typename: 'Recipe', title?: string | null, slug?: string | null, abstract?: string | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null }, image?: { __typename: 'Asset', title?: string | null, description?: string | null, contentType?: string | null, fileName?: string | null, size?: number | null, url?: string | null, height?: number | null, width?: number | null } | null, tagsCollection?: { __typename?: 'RecipeTagsCollection', items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | null> } | null } | null> } | null } | null };

export type TaxonomyDefaultFragment = { __typename: 'Taxonomy', title?: string | null, slug?: string | null };

export type TaxonomyRootFragment = { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null };

export type TaxonomyWithChildrenFragment = { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null };

export type NavTaxonomyFragment = { __typename: 'TaxonomyCollection', items: Array<{ __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | null, childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null, linkedFrom?: { __typename?: 'TagLinkingCollections', recipeCollection?: { __typename?: 'RecipeCollection', total: number } | null } | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null, tag?: { __typename: 'Tag', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | null> } | null } | null> };

export type SchemaTaxonomyFragment = { __typename: 'TaxonomyCollection', items: Array<{ __typename?: 'Taxonomy', childrenCollection?: { __typename?: 'TaxonomyChildrenCollection', total: number, items: Array<{ __typename: 'Tag', title?: string | null, slug?: string | null } | { __typename: 'Taxonomy', title?: string | null, slug?: string | null } | null> } | null } | null> };

export const DescriptionDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DescriptionDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DescriptionDefaultFragment, unknown>;
export const ImageDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<ImageDefaultFragment, unknown>;
export const IngredientsDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IngredientsDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientList"}}]}}]} as unknown as DocumentNode<IngredientsDefaultFragment, unknown>;
export const InstructionsDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InstructionsDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InstructionSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"instructionList"}}]}}]} as unknown as DocumentNode<InstructionsDefaultFragment, unknown>;
export const TagDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<TagDefaultFragment, unknown>;
export const RecipeDefaultFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstPublishedAt"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DescriptionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"abstract"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageDefault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeYield"}},{"kind":"Field","name":{"kind":"Name","value":"prepTime"}},{"kind":"Field","name":{"kind":"Name","value":"cookTime"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IngredientsDefault"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}},{"kind":"Field","name":{"kind":"Name","value":"instructionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstructionsDefault"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"tagsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagDefault"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}},...DescriptionDefaultFragmentDoc.definitions,...ImageDefaultFragmentDoc.definitions,...IngredientsDefaultFragmentDoc.definitions,...InstructionsDefaultFragmentDoc.definitions,...TagDefaultFragmentDoc.definitions]} as unknown as DocumentNode<RecipeDefaultFragment, unknown>;
export const RecipeSummaryFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstPublishedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"abstract"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageDefault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagDefault"}}]}}]}}]}},...ImageDefaultFragmentDoc.definitions,...TagDefaultFragmentDoc.definitions]} as unknown as DocumentNode<RecipeSummaryFragment, unknown>;
export const ListPageItemFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListPageItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"linkedFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeSummary"}}]}}]}}]}}]}},...RecipeSummaryFragmentDoc.definitions]} as unknown as DocumentNode<ListPageItemFragment, unknown>;
export const TaxonomyDefaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaxonomyDefault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Taxonomy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<TaxonomyDefaultFragment, unknown>;
export const TagWithLinksFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagWithLinks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"linkedFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<TagWithLinksFragment, unknown>;
export const TaxonomyRootFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaxonomyRoot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Taxonomy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<TaxonomyRootFragment, unknown>;
export const TaxonomyWithChildrenFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaxonomyWithChildren"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Taxonomy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagWithLinks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childrenCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagWithLinks"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaxonomyRoot"}}]}}]}}]}},...TagWithLinksFragmentDoc.definitions,...TaxonomyRootFragmentDoc.definitions]} as unknown as DocumentNode<TaxonomyWithChildrenFragment, unknown>;
export const NavTaxonomyFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NavTaxonomy"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaxonomyCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaxonomyDefault"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childrenCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"24"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"linkedFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaxonomyWithChildren"}}]}}]}}]}}]}},...TaxonomyDefaultFragmentDoc.definitions,...TaxonomyWithChildrenFragmentDoc.definitions]} as unknown as DocumentNode<NavTaxonomyFragment, unknown>;
export const SchemaTaxonomyFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SchemaTaxonomy"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaxonomyCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"childrenCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"24"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Taxonomy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaxonomyDefault"}}]}}]}}]}}]}}]}},...TaxonomyDefaultFragmentDoc.definitions]} as unknown as DocumentNode<SchemaTaxonomyFragment, unknown>;
export const NavMenuDataDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"navMenuData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categories"},"name":{"kind":"Name","value":"taxonomyCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"StringValue","value":"categories","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NavTaxonomy"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"cuisine"},"name":{"kind":"Name","value":"taxonomyCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"StringValue","value":"cuisine","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NavTaxonomy"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"tags"},"name":{"kind":"Name","value":"tagCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagDefault"}},{"kind":"Field","name":{"kind":"Name","value":"linkedFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]}},...NavTaxonomyFragmentDoc.definitions,...TagDefaultFragmentDoc.definitions]} as unknown as DocumentNode<NavMenuDataQuery, NavMenuDataQueryVariables>;
export const RecipeSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipeSlugs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<RecipeSlugsQuery, RecipeSlugsQueryVariables>;
export const TagSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tagSlugs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TagFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"linkedFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TagSlugsQuery, TagSlugsQueryVariables>;
export const RecipeListDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipeList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TagFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tagCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListPageItem"}}]}}]}}]}},...ListPageItemFragmentDoc.definitions]} as unknown as DocumentNode<RecipeListQuery, RecipeListQueryVariables>;
export const RecipeIndexDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipeIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeSummary"}}]}}]}}]}},...RecipeSummaryFragmentDoc.definitions]} as unknown as DocumentNode<RecipeIndexQuery, RecipeIndexQueryVariables>;
export const RecipePageDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDefault"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"categoriesTaxonomy"},"name":{"kind":"Name","value":"taxonomyCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"StringValue","value":"categories","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SchemaTaxonomy"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"cuisineTaxonomy"},"name":{"kind":"Name","value":"taxonomyCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"StringValue","value":"cuisine","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"title_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SchemaTaxonomy"}}]}}]}},...RecipeDefaultFragmentDoc.definitions,...SchemaTaxonomyFragmentDoc.definitions]} as unknown as DocumentNode<RecipePageQuery, RecipePageQueryVariables>;