import { kCoDataState } from '@/atoms';
import { Page } from '@/components/Layout';
import styled from '@emotion/styled';
import { Button, ButtonGroup, Skeleton } from '@mui/material';
import { useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHydrated } from 'remix-utils';

const LineChart = React.lazy(() => import('@/components/chart/LineChart'));

interface PeriodOption {
  [key: string]: number;
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
  const [kCoData, setKCoData] = useRecoilState(kCoDataState);
  const [period, setPeriod] = useState(90);
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
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    // 국내,해외 나누어 api 요청
    if (company?.charAt(0) === '@') {
      axios.get(`/api/pairtrading/price/?country=KOR&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(company || 0)}`).then(res => setKCoData(JSON.parse(res.data)));
    } else {
      axios.get(`/api/pairtrading/price/?country=US&start_date=${formattedDate}&securitymasterx_id=${encodeURIComponent(company || 0)}`).then(res => setKCoData(JSON.parse(res.data)));
    }
  }, [period]);

  const periodOpt: PeriodOption = { '1 주': 7, '1 달': 30, '3 달': 90, '1년': 365 };
  const IperiodOpt: Map<string, number> = new Map(Object.entries(periodOpt));

  const periodHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPeriod(Number(event.currentTarget.value));
  };

  return (
    <Page>
      <ChartBox>
        <Suspense>{isHydrated ? <LineChart data={kCoData} /> : <Skeleton variant="rounded" animation="wave" height={450} />}</Suspense>
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
    </Page>
  );
};

export default Company;
