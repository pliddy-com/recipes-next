import contentful from 'contentful-management';

const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const client = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

export default client;
