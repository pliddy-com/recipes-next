#!/usr/bin/env ts-node

/**
 *  ./client/src/scripts/recipe-lists.ts
 *
 *  NOTE: have to publish version after change
 */

import { RecipeEntryQueryDocument } from '../types/queries';

import * as dotenv from 'dotenv';

dotenv.config();

const {
  CONTENTFUL_MANAGEMENT_API,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN
} = process.env;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}`;

const getEntry = async ({ id }: { id: string }) => {
  const entryUrl = `${restApi}/entries/${id}`;

  try {
    const entry = await fetch(entryUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
      }
    });

    return entry.json();
  } catch (e) {
    console.log('GET ERROR:', e);
    throw e;
  }
};

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

const updateEntry = async ({
  entryData,
  id,
  original
}: {
  entryData: IEntryData;
  id: string;
  original: { sys: { version: number }; fields: Array<never> };
}) => {
  const entryUrl = `${restApi}/entries/${id}`;
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

  console.log({ version });

  try {
    const update = await fetch(entryUrl, {
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
  const entryUrl = `${restApi}/entries/${id}/published`;

  try {
    const entry = await fetch(entryUrl, {
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

const getEntryData = async ({ id }: { id: string }) => {
  const { queryGraphQLContent } = await import('../lib/gqlClient');

  const entryVariables = {
    id
  };

  const entry = await queryGraphQLContent(
    RecipeEntryQueryDocument,
    entryVariables
  );

  const { ingredientsCollection, instructionsCollection, sys } =
    entry.recipe ?? {};
  const { publishedVersion } = sys ?? {};

  const ingredientSections = ingredientsCollection?.items;
  const instructionSections = instructionsCollection?.items;

  const ingredientsList = ingredientSections?.map((section) => {
    const sectionTitle = section?.label;
    const sectionItems = section?.ingredientList;

    return {
      sectionTitle,
      sectionItems
    };
  });

  const instructionsList = instructionSections?.map((section) => {
    const sectionTitle = section?.label;
    const sectionItems = section?.instructionList;

    return {
      sectionTitle,
      sectionItems
    };
  });

  console.log({ publishedVersion });

  return { id, publishedVersion, ingredientsList, instructionsList };
};

const main = async () => {
  /**
   *  Get data for single entry
   *  TODO: get all entries and process each
   */

  const id = 'r6KIThu0NPUez675RWCG7';
  const original = await getEntry({ id });

  console.log({ original });

  const entryData = await getEntryData({ id });

  console.log({ entryData });

  await updateEntry({ id, original, entryData });

  const version = entryData.publishedVersion
    ? entryData.publishedVersion + 2
    : 1;

  const publish = await publishEntry({ id, version });

  console.log('PUBLISH:', publish);

  // publish entry

  // fetch(`${entryUrl}/published`, {
  //   method: 'PUT',
  //   headers: {
  //     Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
  //   }
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('PUBLISH:', data);
  //     if (data.details && data.details.errors) {
  //       data.details.errors.forEach((e: Error) => console.log(e));
  //     }
  //     return data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

main();

export default main;
