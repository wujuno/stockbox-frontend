import { coDataState, coNameState } from '@/atoms';
import Articles from '@/components/Articles';
import { Page } from '@/components/Layout';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import styled from '@emotion/styled';
import { Box, Button, ButtonGroup, Grid, Link, List, ListItem, Skeleton, Typography } from '@mui/material';
import { DataFunctionArgs, json } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useHydrated } from 'remix-utils';

const LineChart = React.lazy(() => import('@/components/chart/LineChart'));
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

interface PeriodOption {
  [key: string]: number;
}
interface IOneCPData {
  COMNAME: object;
  MARKETDATE: object;
  PRICE: object;
}

const ChartBox = styled.div`
  position: relative;
`;
const PeriodBox = styled.div`
  position: absolute;
  right: 160px;
  top: 0;
`;

const Company = () => {
  const [coData, setCoData] = useRecoilState(coDataState);
  const [period, setPeriod] = useState(90);
  const [coName, setCoName] = useRecoilState(coNameState);

  //Local Storage data state
  const [usNameData, setUsNameData] = useState([]);
  const [usTickerData, setUsTickerData] = useState([]);
  const [kNameData, setKNameData] = useState([]);
  const [kTickerData, setKTickerData] = useState([]);

  const { company } = useParams();
  const isHydrated = useHydrated();
  const { t } = useTranslation('index');

  useEffect(() => {
    const today = new Date();
    const daysAgo = new Date();
    //어제 날짜부터 계산시작
    daysAgo.setDate(today.getDate() - 1);
    let daysToSubtract = period;
    //설정된 기간이 0이 될때까지 주말을 뺀 날짜를 확인
    while (daysToSubtract > 0) {
      daysAgo.setDate(daysAgo.getDate() - 1);
      if (daysAgo.getDay() !== 0 && daysAgo.getDay() !== 6) {
        daysToSubtract--;
      }
    }
    //format을 위한 연/월/일 할당
    const year = daysAgo.getFullYear();
    const month = daysAgo.getMonth() + 1;
    const day = daysAgo.getDate();
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    // 국내,해외 나누어 api 요청
    if (company?.charAt(0) === '@') {
      axios.get(`/api/pairtrading/price/?country=KOR&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(company || 0)}`).then(res => {
        const originalData: IOneCPData = JSON.parse(res.data);
        setCoData({ ...originalData });
        setCoName(Object.values(originalData.COMNAME)[0]);
      });
    } else {
      axios.get(`/api/pairtrading/price/?country=US&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(company || 0)}`).then(res => {
        const originalData: IOneCPData = JSON.parse(res.data);
        setCoData({ ...originalData });
        setCoName(Object.values(originalData.COMNAME)[0]);
      });
    }
    setUsNameData(Object.values(JSON.parse(localStorage.getItem('usNameData') as string)));
    setUsTickerData(Object.values(JSON.parse(localStorage.getItem('usTickerData') as string)));
    setKNameData(Object.values(JSON.parse(localStorage.getItem('kNameData') as string)));
    setKTickerData(Object.values(JSON.parse(localStorage.getItem('kTickerData') as string)));
  }, [period]);

  const periodOpt: PeriodOption = { '1 주': 7, '1 달': 30, '3 달': 90, '1년': 365 };
  const IperiodOpt: Map<string, number> = new Map(Object.entries(periodOpt));

  const periodHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPeriod(Number(event.currentTarget.value));
  };

  const [selected, setSelected] = useState<'해외' | '국내'>('해외');

  const handleClick = (value: '해외' | '국내') => {
    setSelected(value);
  };
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box>
            <ButtonGroup fullWidth>
              <Button
                onClick={() => handleClick('해외')}
                sx={{
                  fontWeight: selected === '해외' ? 'bold' : 'normal'
                }}
                variant={selected === '해외' ? 'contained' : 'outlined'}
              >
                {t('USA')}
              </Button>
              <Button
                onClick={() => handleClick('국내')}
                sx={{
                  fontWeight: selected === '국내' ? 'bold' : 'normal'
                }}
                variant={selected === '국내' ? 'contained' : 'outlined'}
              >
                {t('KOR')}
              </Button>
            </ButtonGroup>
            <Box sx={{ width: '100% ', overflow: 'auto', height: 'calc(100vh - 64px - 48px - 36px )' }}>
              <List>
                {selected === '해외'
                  ? usNameData
                    ? usNameData.map((n, i) => (
                        <ListItem key={i}>
                          <Link href={`/${usTickerData[i]}`} underline="hover">
                            <Typography variant="subtitle2">{n}</Typography>
                          </Link>
                        </ListItem>
                      ))
                    : null
                  : kNameData
                  ? kNameData.map((n, i) => (
                      <ListItem key={i}>
                        <Link href={`/${kTickerData[i]}`} underline="hover">
                          <Typography variant="subtitle2">{n}</Typography>
                        </Link>
                      </ListItem>
                    ))
                  : null}
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <ChartBox>
            <Suspense>{isHydrated ? <LineChart data={coData} /> : <Skeleton variant="rounded" animation="wave" height={450} />}</Suspense>
            <PeriodBox>
              <ButtonGroup variant="outlined" size="small" aria-label="outlined button group">
                {Array.from(IperiodOpt).map(([key, value]) => (
                  <Button id={key} key={key} value={value} onClick={periodHandler}>
                    {key}
                  </Button>
                ))}
              </ButtonGroup>
            </PeriodBox>
          </ChartBox>
          <Box>
            <Suspense>{isHydrated ? <Articles /> : <Skeleton variant="rounded" animation="wave" />}</Suspense>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
export default Company;
