import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Layout from 'layout/Layout/Layout';

import Loading from 'components/Loading/Loading';
import PageHead from 'components/PageHead/PageTags/PageTags';
import TagListSchema from 'components/PageHead/Schema/TagListSchema/TagListSchema';

import { getTagIndex } from 'lib/api';
import config from 'lib/config';

import { ListPageItemFragment } from 'types/queries';

const TagGridPage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'TagGridPage' */ 'layout/TagGridPage/TagGridPage'
    ),
  { suspense: true }
);

const TagIndexPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.tagIndex ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageHead
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <TagListSchema
        tags={pageContent as (ListPageItemFragment | null)[]}
        title={defaultTitle}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <TagGridPage tags={pageContent as (ListPageItemFragment | null)[]} />
      </Suspense>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getTagIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

TagIndexPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default TagIndexPage;
