import React, { Suspense, useEffect, useState } from 'react';
import { Page } from '@/components/Layout';
import { Box, Button, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kNameDataState, kTickerDataState, kTreeMapDataState, usNameDataState, usTickerDataState, usTreeMapDataState } from '@/atoms';
import axios from 'axios';
import styled from '@emotion/styled';

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
  const [usData, setUsData] = useRecoilState(usTreeMapDataState);
  const [kData, setKData] = useRecoilState(kTreeMapDataState);
  const [selected, setSelected] = useState<'해외' | '국내'>('해외');

  const setUsNameData = useSetRecoilState(usNameDataState);
  const setKNameData = useSetRecoilState(kNameDataState);
  const setUsTickerData = useSetRecoilState(usTickerDataState);
  const setKTickerData = useSetRecoilState(kTickerDataState);

  const isHydrated = useHydrated();
  const { t } = useTranslation('index');

  useEffect(() => {
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

  const handleBarOption = (value: '해외' | '국내') => {
    setSelected(value);
  };
  return (
    <Page>
      <Wrapper>
        <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => handleBarOption('해외')}
            sx={{
              fontWeight: selected === '해외' ? 'bold' : 'normal'
            }}
            variant={selected === '해외' ? 'contained' : 'outlined'}
            size="large"
          >
            해외 주식
          </Button>
          <Button
            onClick={() => handleBarOption('국내')}
            sx={{
              fontWeight: selected === '국내' ? 'bold' : 'normal'
            }}
            variant={selected === '국내' ? 'contained' : 'outlined'}
            size="large"
          >
            국내 주식
          </Button>
        </Box>
        <div>
          {selected === '해외' ? (
            <Suspense>{isHydrated ? <TreemapChart data={usData} width={1400} height={500} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}</Suspense>
          ) : (
            <Suspense>{isHydrated ? <TreemapChart data={kData} width={1400} height={500} /> : <Skeleton variant="rounded" animation="wave" width={1200} height={500} />}</Suspense>
          )}
        </div>
      </Wrapper>
    </Page>
  );
};

export default Index;
