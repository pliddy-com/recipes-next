import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const {
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: spaceId,
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: token
} = process.env;

const schemaUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`;

const config: CodegenConfig = {
  schema: [
    {
      [schemaUrl]: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  ],
  documents: ['src/**/*.graphql'],
  generates: {
    'src/types/queries.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  }
};

export default config;
