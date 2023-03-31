import { useTheme } from '@mui/material';
import ApexCharts from 'react-apexcharts';

interface ICPData {
  BEFORE_PRICE: object;
  COMNAME: object;
  EXCHNAME: object;
  MARKETCAP: object;
  MARKETDATE: object;
  PRICE: object;
  SECURITYMASTERX_ID: object;
  YIELD: object;
}
interface IxyObj {
  x: string;
  y: number;
}
enum colors {
  '#991f29',
  '#f23645',
  '#f77c80',
  '#c1c4cd',
  '#42bd7f',
  '#089950',
  '#056636'
}

type TreemapProps = {
  data: ICPData;
  height?: number;
  width?: number;
};

const TreeMapChart: React.FC<DefaultProps & TreemapProps> = ({ data, height, width }) => {
  //data는 parsed 된 형태로 전달.
  const cpNameArr: string[] = Object.values(data.COMNAME);
  const cpCapArr: number[] = Object.values(data.MARKETCAP);
  const obj = { x: '', y: 0 };
  const sArr: IxyObj[] = [];
  // xyData 배열에 obj가 순서대로 나열되도록 한다. 중첩 배열이므로 평탄화해야함.
  const xyData = cpNameArr
    .map(name => {
      return sArr.concat({ ...obj, x: name });
    })
    .flat();
  //xyData 배열의 각 객체의 y의 값을 추가한다.
  cpCapArr.map((cap, index) => (xyData[index].y = cap));

  const yieldVlaue: number[] = Object.values(data.YIELD);
  //YIELD 퍼센트 값을 소숫점 둘째 자리까지 나타낸다.
  const yieldData = yieldVlaue.map(x => +(x * 100).toFixed(2));
  //  yieldData를 enum colors의 index값에 맞게 조정한다.
  // -3 ~ 3 사이의 정수로 변환한 뒤 0~6 사이의 정수로 변환한다.
  const colorData: number[] = yieldData
    .map(x => Math.floor(x))
    .map(x => {
      if (x >= 3) {
        return 3;
      } else if (x <= -3) {
        return -3;
      } else {
        return x;
      }
    })
    .map(x => x + 3);
  // enum을 이용해서 배열에 16진수 색상값 문자열을 나열한다.
  const sColor = colorData.map(x => {
    let text: string = colors[x];
    return text;
  });

  const series = [{ data: xyData }];
  const theme = useTheme();

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
        xaxis: {
          type: 'category'
        },
        colors: sColor,
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
