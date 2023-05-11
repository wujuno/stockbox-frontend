import { countryType } from '@/types/type';
import axios from 'axios';

const LIMIT_NUM = 50;

export const getTreeMapDataAPI = async (country: countryType) => {
  return await axios
    .get(`/api/pairtrading/heatmap/?country=${country}&limit=${LIMIT_NUM}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
};
