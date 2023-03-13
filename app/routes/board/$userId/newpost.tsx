import { Page } from '@/components/Layout';
import { Button, Skeleton, TextField } from '@mui/material';
import React, { Suspense, useState } from 'react';
import { useHydrated } from 'remix-utils';

const TextEditor = React.lazy(() => import('@/components/board/TextEditor'));

const NewPost = () => {
  const isHydrated = useHydrated();
  return (
    <Page>
      <Suspense>{isHydrated ? <TextEditor /> : <Skeleton />}</Suspense>
    </Page>
  );
};

export default NewPost;
