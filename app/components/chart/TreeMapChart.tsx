import { companyData } from '@/types/type';
import { TreeMapChartData } from '@/utils/TreeMapChart';
import { useTheme } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import ApexCharts from 'react-apexcharts';

type TreemapProps = {
  data: companyData[];
};

const TreeMapChart: React.FC<DefaultProps & TreemapProps> = ({ data }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const chartData = new TreeMapChartData(data);
  const { xyData, colors, companyIds } = chartData.getData();

  const handleNavigate = (e: any) => {
    const index = Number(e.target.getAttribute('j'));
    navigate(`/${companyIds[index]}`);
  };

  return (
    <ApexCharts
      type="treemap"
      options={{
        theme: {
          mode: theme.palette.mode === 'dark' ? 'dark' : 'light'
        },
        legend: {
          show: false
        },
        colors,
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        },
        chart: {
          animations: {
            enabled: true,
            easing: 'linear',
            speed: 300,
            animateGradually: {
              enabled: true,
              delay: 50
            },
            dynamicAnimation: {
              enabled: true,
              speed: 250
            }
          },
          events: {
            click: handleNavigate
          },
          background: theme.palette.mode === 'dark' ? 'dark' : 'light',
          toolbar: {
            show: false
          }
        }
      }}
      series={[{ data: xyData }]}
      height="100%"
      width="100%"
    />
  );
};

export default TreeMapChart;
