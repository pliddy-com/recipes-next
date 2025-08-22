#!/usr/bin/env ts-node
/* eslint-disable no-await-in-loop */

/**
 *  ./client/src/scripts/recipe-lists.ts
 */

import { RecipeEntryQueryDocument } from '../types/queries';

// import * as dotenv from 'dotenv';

// dotenv.config({ quiet: true });

import 'dotenv/config';

const {
  CONTENTFUL_MANAGEMENT_API,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN
} = process.env;

// const contentfulEnv = 'test';
const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

interface IEntryData {
  id: string;
  publishedVersion: number | null | undefined;
  ingredientsList:
    | {
        sectionTitle: string | null | undefined;
        sectionItems: (string | null)[] | null | undefined;
      }[]
    | undefined;
  instructionsList:
    | {
        sectionTitle: string | null | undefined;
        sectionItems: (string | null)[] | null | undefined;
      }[]
    | undefined;
}

interface IRecipe {
  sys: {
    contentType: { sys: { id: string } };
    id: string;
    version: number;
  };
  fields: { ingredientsList: object; instructionsList: object };
}

// const getEntry = async ({ id }: { id: string }) => {
//   const url = `${restApi}/entries/${id}`;

//   try {
//     const entry = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
//       }
//     });

//     return entry.json();
//   } catch (e) {
//     console.log('GET ERROR:', e);
//     throw e;
//   }
// };

const getEntryData = async ({ id }: { id: string }) => {
  const { queryGraphQLContent } = await import('../lib/gqlClient');

  const entryVariables = {
    id
  };

  const entry = await queryGraphQLContent(
    RecipeEntryQueryDocument,
    entryVariables
  );

  const { ingredientsList, instructionsList, sys } = entry.recipe ?? {};
  const { publishedVersion } = sys ?? {};

  // const ingredientSections = ingredientsCollection?.items;
  // const instructionSections = instructionsCollection?.items;

  // const ingredientsList = ingredientSections?.map(({section}) => {
  //   const sectionTitle = section?.label;
  //   const sectionItems = section?.ingredientList;

  //   return {
  //     sectionTitle,
  //     sectionItems
  //   };
  // });

  // const instructionsList = instructionSections?.map((section) => {
  //   const sectionTitle = section?.label;
  //   const sectionItems = section?.instructionList;

  //   return {
  //     sectionTitle,
  //     sectionItems
  //   };
  // });

  return { id, publishedVersion, ingredientsList, instructionsList };
};

const getEntries = async (): Promise<IRecipe[]> => {
  console.log('getEntryies');

  const url = `${restApi}/public/entries/`;

  try {
    const entries = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
      }
    });
    const res = await entries.json();

    const recipes = res.items.filter(
      (entry: IRecipe) => entry.sys.contentType.sys.id === 'recipe'
    );

    return recipes;
  } catch (e) {
    console.log('LIST ERROR:', e);
    throw e;
  }
};

const updateEntry = async ({
  entryData,
  id,
  original
}: {
  entryData: IEntryData;
  id: string;
  original: IRecipe;
}) => {
  console.log('updateEntry', id);

  const url = `${restApi}/entries/${id}`;
  const obj = {
    fields: {
      ...original.fields,
      ingredientsList: {
        'en-US': entryData.ingredientsList
      },
      instructionsList: {
        'en-US': entryData.instructionsList
      }
    }
  };

  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json-patch+json'
  });

  const version = entryData.publishedVersion
    ? entryData.publishedVersion + 1
    : 1;

  try {
    const update = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/json-patch+json',
        'X-Contentful-Version': `${version}`
      },
      body: blob
    });

    return update.json();
  } catch (e) {
    console.log('UPDATE ERROR:', e);
    throw e;
  }
};

const publishEntry = async ({
  id,
  version
}: {
  id: string;
  version: number;
}) => {
  console.log('publishEntry', id);

  const url = `${restApi}/entries/${id}/published`;

  try {
    const entry = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        'X-Contentful-Version': `${version}`
      }
    });

    return entry.json();
  } catch (e) {
    console.log('PUBLISH ERROR:', e);
    throw e;
  }
};

const main = async () => {
  const recipes = await getEntries();
  console.log('recipes:', recipes.length);

  for (const recipe of recipes) {
    const id = recipe.sys.id;

    const entryData = await getEntryData({ id });

    const version = entryData.publishedVersion
      ? entryData.publishedVersion + 2
      : 1;

    entryData &&
      Promise.all([
        await updateEntry({ id, original: recipe, entryData }),
        await publishEntry({ id, version })
      ]).then((res) => console.log({ res }));
  }
};

main();

export default main;
