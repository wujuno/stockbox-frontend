import { coDataState, coNameState } from '@/atoms';
import Articles from '@/components/Articles';
import { Page } from '@/components/Layout';
import PeriodBox from '@/components/chart/PeriodBox';
import SideBar from '@/components/chart/Sidebar';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import styled from '@emotion/styled';
import { Box, Grid, Skeleton } from '@mui/material';
import { DataFunctionArgs, json } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
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

interface IOneCPData {
  COMNAME: object;
  MARKETDATE: object;
  PRICE: object;
}

const ChartBox = styled.div`
  position: relative;
`;

const Company = () => {
  const [coData, setCoData] = useRecoilState(coDataState);
  const [period, setPeriod] = useState(90);
  const [coName, setCoName] = useRecoilState(coNameState);
  const [selected, setSelected] = useState<'해외' | '국내'>('해외');

  const { company } = useParams();
  const isHydrated = useHydrated();

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
    const formattedDate =
      year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    // 국내,해외 나누어 api 요청
    if (company?.charAt(0) === '@') {
      axios
        .get(
          `/api/pairtrading/price/?country=KOR&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(
            company || 0
          )}`
        )
        .then(res => {
          console.log(res.data);
          const originalData: IOneCPData = JSON.parse(res.data);
          setCoData({ ...originalData });
          setCoName(Object.values(originalData.COMNAME)[0]);
        });
    } else {
      axios
        .get(
          `/api/pairtrading/price/?country=US&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(
            company || 0
          )}`
        )
        .then(res => {
          const originalData: IOneCPData = JSON.parse(res.data);
          setCoData({ ...originalData });
          setCoName(Object.values(originalData.COMNAME)[0]);
        });
    }

    // 사이드 메뉴 상태 설정
    company?.charAt(0) === '@' ? setSelected('국내') : setSelected('해외');
  }, [period, company]);

  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar selected={selected} setSelected={setSelected} />
        </Grid>
        <Grid item xs={10}>
          <ChartBox>
            <Suspense>
              {isHydrated ? (
                <LineChart data={coData} />
              ) : (
                <Skeleton variant="rounded" animation="wave" height={450} />
              )}
            </Suspense>
            <PeriodBox setPeriod={setPeriod} />
          </ChartBox>
          <Box>
            <Suspense>
              {isHydrated ? <Articles /> : <Skeleton variant="rounded" animation="wave" />}
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
export default Company;
