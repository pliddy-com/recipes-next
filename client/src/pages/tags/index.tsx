import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';
import TagListSchema from 'components/PageHead/Schema/TagListSchema/TagListSchema';

import { getTagIndex } from 'lib/api';
import config from 'lib/config';

import { ListPageItemFragment } from 'types/queries';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

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
      <PageTags
        defaultTitle={defaultTitle}
        description={description}
        title={defaultTitle}
      />
      <TagListSchema
        description={description}
        tags={pageContent as (ListPageItemFragment | null)[]}
        title={defaultTitle}
      />
      <Suspense fallback={<Loading />}>
        <TagGridPage
          isIndex={true}
          tags={pageContent as (ListPageItemFragment | null)[]}
          title={defaultTitle}
        />
      </Suspense>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getTagIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

TagIndexPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default TagIndexPage;
