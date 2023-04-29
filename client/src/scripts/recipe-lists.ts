#!/usr/bin/env ts-node

/**
 *  ./client/src/scripts/recipe-lists.ts
 *
 *  NOTE: have to publish version after change
 */

import {
  RecipeEntryQueryDocument,
  //   RecipeCollectionQueryDocument,
  RecipeEntryQueryQuery
} from '../types/queries';

import * as dotenv from 'dotenv';

dotenv.config();

const {
  CONTENTFUL_MANAGEMENT_API,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN
} = process.env;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}`;

const getEntryData = (entry: RecipeEntryQueryQuery) => {
  const { ingredientsCollection, instructionsCollection, sys } =
    entry.recipe ?? {};
  const { id, publishedVersion } = sys ?? {};

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

  return { id, publishedVersion, ingredientsList, instructionsList };
};

const main = async () => {
  const { queryGraphQLContent } = await import('../lib/gqlClient');

  const entryVariables = {
    id: '4MEb13R1iT1s7huTumqtBT'
  };

  const entry = await queryGraphQLContent(
    RecipeEntryQueryDocument,
    entryVariables
  );

  const entryData = getEntryData(entry);

  console.log(entry);
  console.log(entryData);

  //   const collection = await queryGraphQLContent(RecipeCollectionQueryDocument);

  //   console.log(collection);

  //   const output = collection?.recipeCollection?.items.map((item) => {
  //     const { ingredientsCollection, instructionsCollection, sys } = item ?? {};
  //     const { id, publishedVersion } = sys ?? {};

  //     const ingredientSections = ingredientsCollection?.items;
  //     const instructionSections = instructionsCollection?.items;

  //     const ingredientsList = ingredientSections?.map((section) => {
  //       const sectionTitle = section?.label;
  //       const sectionItems = section?.ingredientList;

  //       return {
  //         sectionTitle,
  //         sectionItems
  //       };
  //     });

  //     const instructionsList = instructionSections?.map((section) => {
  //       const sectionTitle = section?.label;
  //       const sectionItems = section?.instructionList;

  //       return {
  //         sectionTitle,
  //         sectionItems
  //       };
  //     });

  //     return { id, publishedVersion, ingredientsList, instructionsList };
  //   });

  const entryUrl = `${restApi}/entries/${entryData.id}`;

  const obj = [
    {
      op: 'replace',
      path: '/fields/title/en-US',
      value: 'Air Fry Pork Cutlets'
    }
  ];

  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json-patch+json'
  });

  console.log(blob);

  fetch(entryUrl, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
      'Content-Type': 'application/json-patch+json',
      'X-Contentful-Version': `${
        entryData.publishedVersion ? entryData.publishedVersion + 1 : 1
      }`
    },
    body: blob
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('RESPONSE');
      console.log(data);
      //   data.details.errors.forEach((e: Error) => console.log(e));
    })
    .catch((error) => {
      console.log(error);
    });

  //   console.log({ output });
  console.log({ restApi });
};

main();

export default main;
