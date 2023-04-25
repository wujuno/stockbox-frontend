import React, { Suspense, useEffect, useState } from 'react';
import { Page } from '@/components/Layout';
import { Box, Button, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { DataFunctionArgs, json } from '@remix-run/node';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  kNameDataState,
  kTickerDataState,
  kTreeMapDataState,
  usNameDataState,
  usTickerDataState,
  usTreeMapDataState
} from '@/atoms';
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
  /* justify-content: center;
  align-items: center; */
  width: 100%;
  height: 100%;

  .chart-wrapper {
    flex: 1;
    overflow: hidden;
    padding: 10px;
  }
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

export const handle = {
  i18n: 'index'
};

const Index = () => {
  const [usData, setUsData] = useRecoilState(usTreeMapDataState);
  const [kData, setKData] = useRecoilState(kTreeMapDataState);
  const [selected, setSelected] = useState<'domesticStocks' | 'foreignStocks'>('domesticStocks');

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

  const handleBarOption = (value: 'domesticStocks' | 'foreignStocks') => {
    setSelected(value);
  };
  return (
    <Page>
      <Wrapper>
        <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => handleBarOption('foreignStocks')}
            sx={{
              fontWeight: selected === 'foreignStocks' ? 'bold' : 'normal'
            }}
            variant={selected === 'foreignStocks' ? 'contained' : 'outlined'}
            size="large"
          >
            {t('foreignStocks')}
          </Button>
          <Button
            onClick={() => handleBarOption('domesticStocks')}
            sx={{
              fontWeight: selected === 'domesticStocks' ? 'bold' : 'normal'
            }}
            variant={selected === 'domesticStocks' ? 'contained' : 'outlined'}
            size="large"
          >
            {t('domesticStocks')}
          </Button>
        </Box>
        <div className="chart-wrapper">
          {selected === 'foreignStocks' ? (
            <Suspense>
              {isHydrated ? (
                <TreemapChart className="treemap-chart" data={usData} width="100%" height="100%" />
              ) : (
                <Skeleton variant="rounded" animation="wave" />
              )}
            </Suspense>
          ) : (
            <Suspense>
              {isHydrated ? (
                <TreemapChart className="treemap-chart" data={kData} width="100%" height="100%" />
              ) : (
                <Skeleton variant="rounded" animation="wave" />
              )}
            </Suspense>
          )}
        </div>
      </Wrapper>
    </Page>
  );
};

export default Index;
