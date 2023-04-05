import { coTitleState } from '@/atoms';
import { useTheme } from '@mui/material';
import ApexCharts from 'react-apexcharts';
import { useRecoilState } from 'recoil';

interface ICPData {
  data: { COMNAME: object; MARKETDATE: object; PRICE: object };
}

const LineChart = ({ data }: ICPData) => {
  const [title, setTitle] = useRecoilState(coTitleState);
  const dates = Object.values(data.MARKETDATE);
  const convertedDates = dates.map(date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  });
  const prices = Object.values(data.PRICE).map(price => price.toFixed(2));
  setTitle(Object.values(data.COMNAME)[0]);
  const series = [{ name: title, data: prices }];
  const theme = useTheme();
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
          categories: convertedDates,
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
      series={series}
      height={450}
    />
  );
};

export default LineChart;
