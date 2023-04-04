import { kCoDataState } from '@/atoms';
import { Page } from '@/components/Layout';
import { Skeleton } from '@mui/material';
import { useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHydrated } from 'remix-utils';

const LineChart = React.lazy(() => import('@/components/chart/LineChart'));

const Company = () => {
  const [kCoData, setKCoData] = useRecoilState(kCoDataState);
  const [period, setPeriod] = useState(30);
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

  const periodEx = ['1 주', '1 달', '3 달', '1 년'];
  // 날짜 선택 -> state 저장, default 값 한 달

  return (
    <Page>
      <div>
        <Suspense>{isHydrated ? <LineChart data={kCoData} /> : <Skeleton variant="rounded" animation="wave" height={450} />}</Suspense>
      </div>
    </Page>
  );
};

export default Company;
