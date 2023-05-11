import { companyHistoryDataState, companyNameState } from '@/atoms';
import Articles from '@/components/Articles';
import { Page } from '@/components/Layout';
import PeriodBox from '@/components/chart/PeriodBox';
import SideBar from '@/components/chart/Sidebar';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { getStartDate } from '@/utils/LineChart';
import styled from '@emotion/styled';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { DataFunctionArgs, json } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
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

const ChartBox = styled.div`
  position: relative;
`;

const Company = () => {
  const [companyHistoryData, setCompanyHistoryData] = useRecoilState(companyHistoryDataState);
  const [period, setPeriod] = useState(90);
  const setCompanyName = useSetRecoilState(companyNameState);
  const [selected, setSelected] = useState<'해외' | '국내'>('해외');

  const { company } = useParams();
  const isHydrated = useHydrated();

  useEffect(() => {
    const { startDate } = getStartDate(period);

    // 국내,해외 나누어 api 요청
    if (company?.charAt(0) === '@') {
      axios
        .get(
          `/api/pairtrading/price/?country=KOR&start_date=${startDate}&securitymasterx_id=${encodeURIComponent(
            company || 0
          )}`
        )
        .then(response => {
          setCompanyHistoryData([...response.data.history]);
          setCompanyName(response.data.name);
        });
    } else {
      axios
        .get(
          `/api/pairtrading/price/?country=US&start_date=${startDate}&securitymasterx_id=${encodeURIComponent(
            company || 0
          )}`
        )
        .then(response => {
          setCompanyHistoryData([...response.data.history]);
          setCompanyName(response.data.name);
        });
    }

    // 사이드 메뉴 상태 설정
    company?.charAt(0) === '@' ? setSelected('국내') : setSelected('해외');
  }, [period, company, setCompanyHistoryData, setCompanyName]);

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
                <LineChart data={companyHistoryData} />
              ) : (
                <Skeleton variant="rounded" animation="wave" height={450} />
              )}
            </Suspense>
            <PeriodBox setPeriod={setPeriod} />
          </ChartBox>
          <Box>
            <Typography variant="h6">관련 기사</Typography>
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
