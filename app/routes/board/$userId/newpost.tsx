import { Page } from '@/components/Layout';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { Skeleton } from '@mui/material';
import { DataFunctionArgs, json } from '@remix-run/node';
import React, { Suspense } from 'react';
import { useHydrated } from 'remix-utils';

const TextEditor = React.lazy(() => import('@/components/board/TextEditor'));

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    return { user };
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const NewPost = () => {
  const isHydrated = useHydrated();
  return (
    <Page>
      <Suspense>{isHydrated ? <TextEditor /> : <Skeleton />}</Suspense>
    </Page>
  );
};

export default NewPost;
