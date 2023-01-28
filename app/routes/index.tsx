import { Page } from '@/components/Layout';
import { Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const SChart = React.lazy(() => import('../components/Chart'));

const Index = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Typography variant="h3">{t('hello')}</Typography>
      <>
        <Suspense fallback={<p>Loading...</p>}>
          <SChart />
        </Suspense>
      </>
    </Page>
  );
};

export default Index;
