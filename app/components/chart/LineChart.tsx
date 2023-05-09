import { companyNameState } from '@/atoms';
import { companyHistoryType } from '@/types/type';
import { useTheme } from '@mui/material';
import ApexCharts from 'react-apexcharts';
import { useRecoilValue } from 'recoil';

type LineChartProps = {
  data: companyHistoryType[];
};

const LineChart = ({ data }: LineChartProps) => {
  const theme = useTheme();

  const title = useRecoilValue(companyNameState);
  const dates = data.map(obj => obj.date);
  const prices = data.map(obj => obj.price).map(price => parseInt(price.toFixed(2)));
  return (
    <ApexCharts
      type="line"
      options={{
        theme: {
          mode: theme.palette.mode === 'dark' ? 'dark' : 'light'
        },
        chart: {
          zoom: {
            enabled: true
          },
          background: theme.palette.mode === 'dark' ? 'dark' : 'light'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: dates,
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Price'
          }
        },
        title: {
          text: title,
          align: 'left'
        }
      }}
      series={[{ name: title, data: prices }]}
      height={450}
    />
  );
};

export default LineChart;
