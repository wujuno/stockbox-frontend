import React, { Suspense } from 'react';
import { Page } from '@/components/Layout';
import { Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilValue } from 'recoil';
import { stockChartState } from '@/atoms';

const SChart = React.lazy(() => import('@/components/Chart'));

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const Index = () => {
  const data = useRecoilValue(stockChartState);

  const isHydrated = useHydrated();
  const { t } = useTranslation();

  return (
    <Page>
      <Typography variant="h3">{t('hello')}</Typography>
      <Suspense>{isHydrated ? <SChart data={data} /> : <Skeleton variant="rounded" animation="wave" width={500} height={500} />}</Suspense>
    </Page>
  );
};

export default Index;
