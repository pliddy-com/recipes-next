#!/usr/bin/env ts-node

// import * as dotenv from 'dotenv';

// dotenv.config();

import 'dotenv/config';

import path from 'path';
import fs from 'fs';
import { NavMenuDataDocument, NavMenuDataQuery } from '../types/queries';
import { queryGraphQLContent } from '../lib/gqlClient';

import {
  filterTagsWithRecipes,
  filterTaxonomyItemsWithRecipes
} from '../lib/apiFilters';

const filePath = path.join(__dirname, '../navData.json');

export const getNavTaxonomy = async () => {
  const results: NavMenuDataQuery = await queryGraphQLContent(
    NavMenuDataDocument
  );

  const { categories, cuisine, tags } = results;

  return {
    ...(categories && {
      categories: filterTaxonomyItemsWithRecipes({
        taxonomyCollection: categories
      })
    }),
    ...(cuisine && {
      cuisine: filterTaxonomyItemsWithRecipes({ taxonomyCollection: cuisine })
    }),
    ...(tags && {
      tags: filterTagsWithRecipes({ tagCollection: tags })
    })
  };
};

const main = async () => {
  try {
    getNavTaxonomy().then((navData) => {
      fs.writeFileSync(filePath, JSON.stringify(navData, null, 2));
    });
    console.log('> generated src/navData.json');
  } catch (e) {
    console.error(e);
  }
};

main();

export default main;
