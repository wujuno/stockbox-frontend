import React, { Suspense, useState } from 'react';
import { Page } from '@/components/Layout';
import { Divider, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilValue } from 'recoil';
import { stockChartState } from '@/atoms';
import axios from 'axios';

const TreemapChart = React.lazy(() => import('@/components/chart/TreeMapChart'));

/* export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
  } catch (err) {
    console.error(err);
  }
  return json(null);
}; */

interface ICPData {
  BEFORE_PRICE: object;
  COMNAME: object;
  EXCHNAME: object;
  MARKETCAP: object;
  MARKETDATE: object;
  PRICE: object;
  SECURITYMASTERX_ID: object;
  YIELD: object;
}

const Index = () => {
  const data = useRecoilValue(stockChartState);
  const [usData, setUsData] = useState<ICPData | undefined>();
  const [kData, setKData] = useState<ICPData | undefined>();

  const isHydrated = useHydrated();
  const { t } = useTranslation();

  axios.get('/api/pairtrading/heatmap/?country=US&limit=50').then(response => {
    setUsData(JSON.parse(response as any));
  });
  axios.get('/api/pairtrading/heatmap/?country=KOR&limit=50').then(response => {
    setKData(JSON.parse(response as any));
  });

  return (
    <Page>
      <Typography variant="h3">미국 주식</Typography>
      <Suspense>
        {isHydrated ? <TreemapChart data={usData} width={1200} height={500} title={'해외 주식'} dark={false} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}
      </Suspense>
      <Divider />
      <Typography variant="h3">국내 주식</Typography>
      <Suspense>
        {isHydrated ? <TreemapChart data={kData} width={1200} height={500} title={'국내 주식'} dark={false} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}
      </Suspense>
    </Page>
  );
};

export default Index;
