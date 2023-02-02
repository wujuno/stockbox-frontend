import React, { Suspense, useEffect } from 'react';
import { Page } from '@/components/Layout';
import { Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { useNavigate } from '@remix-run/react';

const SChart = React.lazy(() => import('@/components/Chart'));

const Index = () => {
  const isHydrated = useHydrated();
  const { t } = useTranslation();

  return (
    <Page>
      <Typography variant="h3">{t('hello')}</Typography>
      <Suspense>
        {isHydrated ? (
          <SChart />
        ) : (
          <Skeleton
            variant="rounded"
            animation="wave"
            width={500}
            height={500}
          />
        )}
      </Suspense>
    </Page>
  );
};

export default Index;
