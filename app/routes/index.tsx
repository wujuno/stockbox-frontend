import React, { Suspense, useEffect } from 'react';
import { Page } from '@/components/Layout';
import { Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kNameDataState, kTickerDataState, kTreeMapDataState, usNameDataState, usTickerDataState, usTreeMapDataState } from '@/atoms';
import axios from 'axios';
import styled from '@emotion/styled';
import { useLoaderData } from '@remix-run/react';

const TreemapChart = React.lazy(() => import('@/components/chart/TreeMapChart'));

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
  const loaderData = useLoaderData();

  const [usData, setUsData] = useRecoilState(usTreeMapDataState);
  const [kData, setKData] = useRecoilState(kTreeMapDataState);

  const setUsNameData = useSetRecoilState(usNameDataState);
  const setKNameData = useSetRecoilState(kNameDataState);
  const setUsTickerData = useSetRecoilState(usTickerDataState);
  const setKTickerData = useSetRecoilState(kTickerDataState);

  const isHydrated = useHydrated();
  const { t } = useTranslation('index');

  useEffect(() => {
    console.log(loaderData);
    axios
      .get('/api/pairtrading/heatmap/?country=US&limit=50')
      .then(response => {
        const parsedData: ICPData = JSON.parse(response.data);
        setUsData({ ...parsedData });
        setUsNameData(Object.values(parsedData.COMNAME));
        setUsTickerData(Object.values(parsedData.SECURITYMASTERX_ID));
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('/api/pairtrading/heatmap/?country=KOR&limit=50')
      .then(response => {
        const parsedData: ICPData = JSON.parse(response.data);
        setKData({ ...parsedData });
        setKNameData(Object.values(parsedData.COMNAME));
        setKTickerData(Object.values(parsedData.SECURITYMASTERX_ID));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <Page>
      <Wrapper>
        <div>
          <Typography variant="h5">{t('USA')}</Typography>
          <Suspense>{isHydrated ? <TreemapChart data={usData} width={1400} height={500} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}</Suspense>
        </div>
        <div>
          <Typography variant="h5">{t('KOR')}</Typography>
          <Suspense>{isHydrated ? <TreemapChart data={kData} width={1400} height={500} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}</Suspense>
        </div>
      </Wrapper>
    </Page>
  );
};

export default Index;
