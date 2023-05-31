import axios, { AxiosResponse } from 'axios';
import { selectorFamily } from 'recoil';

export type CountryType = 'US' | 'KOR';

export interface ComData {
  id: string;
  name: string;
}

export interface RunData {
  stockprice: string;
  cummulative: string;
  cointegration: string;
  ratio: string;
  'z-score': string;
  buysell1: string;
  buysell2: string;
  simulation: string;
}

export const comSelectorFamily = selectorFamily<ComData[], CountryType>({
  key: 'comSelectorFamily',
  get: country => async () => {
    const { data } = await axios<any, AxiosResponse<ComData[]>>({
      method: 'GET',
      url: '/api/pairtrading/com',
      params: { country }
    });
    return data;
  }
});

export const runSelectorFamily = selectorFamily<
  RunData,
  { country: CountryType; comname1: string; comname2: string }
>({
  key: 'runSelectorFamily',
  get:
    ({ country, comname1, comname2 }) =>
    async () => {
      const { data } = await axios<any, AxiosResponse<RunData>>({
        method: 'GET',
        url: `/api/pairtrading/${country === 'KOR' ? 'kor' : 'us'}_run/`,
        params: { comname1, comname2 }
      });
      return data;
    }
});
