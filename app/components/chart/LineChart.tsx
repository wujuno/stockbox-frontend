import ApexCharts from 'react-apexcharts';

type LineChartProps = {
  data: number[];
  categories: string[];
  title?: string;
  dark?: boolean;
};

const LineChart: React.FC<DefaultProps & LineChartProps> = ({ data, categories, title, dark }) => {
  const series = [{ name: 'Line_Chart', data }];
  const mode = dark ? 'dark' : 'light';

  return (
    <ApexCharts
      type="line"
      options={{
        theme: {
          mode
        },
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories
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
      height={350}
    />
  );
};

export default LineChart;
