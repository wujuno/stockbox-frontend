import axios, { AxiosResponse } from 'axios';
import { selectorFamily } from 'recoil';

export type CountryType = 'US' | 'KOR';

export interface ComData {
  id: string;
  name: string;
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
