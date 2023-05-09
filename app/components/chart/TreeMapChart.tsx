import { companyData } from '@/types/type';
import { useTheme } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import ApexCharts from 'react-apexcharts';

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
  data: companyData[];
  width?: string | number;
  height?: string | number;
  showToolbar?: boolean;
};

const TreeMapChart: React.FC<DefaultProps & TreemapProps> = ({
  data,
  width,
  height,
  showToolbar
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  //TODO: xyData 만드는 함수 생성
  const comapanyNames = data.map(obj => obj.COMNAME);
  const companyCaps = data.map(obj => obj.MARKETCAP);
  const companyId = data.map(obj => obj.SECURITYMASTERX_ID);

  const obj = { x: '', y: 0 };
  const sArr: IxyObj[] = [];
  // xyData 배열에 obj가 순서대로 나열되도록 한다. 중첩 배열이므로 평탄화해야함.
  const xyData = comapanyNames
    .map(name => {
      return sArr.concat({ ...obj, x: name });
    })
    .flat();
  companyCaps.map((cap, index) => (xyData[index].y = cap));

  //TODO: sColors 만드는 함수 생성
  const yieldVlaue: number[] = data.map(obj => obj.YIELD);
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

  //종목 클릭 시 해당 티커 ID 가 파라미터인 페이지로 이동
  const clickHandler = (e: any, charts: any, options: any) => {
    const index = Number(e.target.getAttribute('j'));
    navigate(`/${companyId[index]}`);
    // console.log(series[0].data[options.dataPointIndex]);
    // navigate(`/${cpIdArr[options.dataPointIndex]}`);
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
          },
          events: {
            click: clickHandler
          },
          background: theme.palette.mode === 'dark' ? 'dark' : 'light',
          toolbar: {
            show: showToolbar
          }
        }
      }}
      series={[{ data: xyData }]}
      height={height}
      width={width}
    />
  );
};

TreeMapChart.defaultProps = {
  showToolbar: false
};

export default TreeMapChart;
