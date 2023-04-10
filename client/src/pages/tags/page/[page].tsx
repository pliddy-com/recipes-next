import { ReactElement, Suspense } from 'react';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';
import TagListSchema from 'components/PageHead/Schema/TagListSchema/TagListSchema';

import { getTagIndex } from 'lib/api';
import { paginateResults } from 'lib/infiniteScroll';

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

const TagListPage = ({
  pageContent,
  page
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.tagIndex ?? {};
  const title = `${defaultTitle} (Page ${page})`;

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageTags
        {...(page === 1 ? { canonicalPath: '/' } : {})}
        defaultTitle={defaultTitle}
        description={description}
        title={title}
      />
      <TagListSchema
        description={description}
        tags={pageContent as (ListPageItemFragment | null)[]}
        title={title}
      />
      <Suspense fallback={<Loading />}>
        <TagGridPage
          page={page}
          tags={pageContent as (ListPageItemFragment | null)[]}
          title={title}
        />
      </Suspense>
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagList = await getTagIndex();
  const pageSize = 4;

  const pages = paginateResults({ data: tagList, pageSize });

  const paths = pages
    .map((page, pageNum) => pageNum)
    .map((pageNum) => ({
      params: { page: String(pageNum + 1) }
    }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, preview } = context;
  const page = params?.page ? Number(params.page) : undefined;
  const pageContent = await getTagIndex();

  return {
    props: { pageContent, page, preview: Boolean(preview) },
    revalidate: 60
  };
};

TagListPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default TagListPage;
