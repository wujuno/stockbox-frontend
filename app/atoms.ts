import { atom } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

interface IStockChart {
  x: string;
  y: number;
}

export const stockChartState = atom<IStockChart[]>({
  key: uuidV4(),
  default: [
    {
      x: '02-05',
      y: 54
    },
    {
      x: '02-06',
      y: 66
    },
    {
      x: '02-07',
      y: 36
    },
    {
      x: '02-08',
      y: 20
    },
    {
      x: '02-09',
      y: 80
    },
    {
      x: '02-10',
      y: 55
    }
  ]
});
