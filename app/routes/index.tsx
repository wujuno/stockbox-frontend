import React, { Suspense, useEffect } from 'react';
import { Page } from '@/components/Layout';
import { Divider, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilState } from 'recoil';
import { kTreeMapDataState, usTreeMapDataState } from '@/atoms';
import axios from 'axios';
import styled from '@emotion/styled';

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

interface ServerData {
  data: string;
}

const Index = () => {
  const [usData, setUsData] = useRecoilState(usTreeMapDataState);
  const [kData, setKData] = useRecoilState(kTreeMapDataState);

  const isHydrated = useHydrated();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get('/api/pairtrading/heatmap/?country=US&limit=50')
      .then((response: ServerData) => {
        const parsedData: ICPData = JSON.parse(response.data);
        setUsData({ ...parsedData });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('/api/pairtrading/heatmap/?country=KOR&limit=50')
      .then(response => {
        const parsedData: ICPData = JSON.parse(response.data);
        setKData(parsedData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <Page>
      <Wrapper>
        <Suspense>
          {isHydrated ? <TreemapChart data={usData} width={1400} height={500} title={'해외'} dark={false} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}
        </Suspense>
        <Suspense>
          {isHydrated ? <TreemapChart data={kData} width={1400} height={500} title={'국내'} dark={false} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}
        </Suspense>
      </Wrapper>
    </Page>
  );
};

export default Index;
