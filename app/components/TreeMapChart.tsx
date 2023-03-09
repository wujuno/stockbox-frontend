import ApexCharts from 'react-apexcharts';

type TreemapProps = {
  data: {
    x: string;
    y: number;
    value: number;
  }[];
  height?: number;
  width?: number;
  title?: string;
  dark?: boolean;
};

const TreeMapChart: React.FC<DefaultProps & TreemapProps> = ({ data, height, width, title, dark }) => {
  const series = [{ name: title, data }];
  const mode = dark ? 'dark' : 'light';

  return (
    <ApexCharts
      type="treemap"
      options={{
        theme: {
          mode
        },
        legend: {
          show: false
        },
        title: {
          text: title,
          align: 'left'
        },
        xaxis: {
          type: 'category'
        },

        plotOptions: {
          treemap: {
            colorScale: {
              ranges: [
                {
                  from: -3,
                  to: -1,
                  color: '#CD363A'
                },
                {
                  from: -1.001,
                  to: 1,
                  color: '#2a2a2a'
                },
                {
                  from: 1.001,
                  to: 3,
                  color: '#1c7d21'
                }
              ]
            }
          }
        }
      }}
      series={series}
      height={height}
      width={width}
    />
  );
};

export default TreeMapChart;
