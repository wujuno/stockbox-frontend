import { stockChartState } from '@/atoms';
import styled from '@emotion/styled';
import { useTheme } from "@mui/material";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from 'recoil';

const ChartBox = styled.div`
  width:500px;
  height:500px;
`

const SChart = () => {
  const theme = useTheme();
  const data = useRecoilValue(stockChartState);
    return (
        <ChartBox>
            <ApexCharts
            type="area"
            series = {
              [
              {
                data,
                name:'Test'
              }
            ]
            }
          options={{
            theme: {
              mode: theme.palette.mode === 'dark' ? 'dark' : 'light'
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              title: {
                text: 'Price'
              },
            },
            chart:{
              height: '50%',
              width: '50%',
              toolbar: {
                show:true,
              },
              background: "transparent"
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Stock Price Movement',
              align: 'left'
            },
            
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            
          }
        }
          />
        </ChartBox>
    )
}

export default SChart;