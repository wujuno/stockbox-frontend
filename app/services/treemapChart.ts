import { countryType } from '@/types/type';
import axios from 'axios';

const LIMIT_NUM = 50;

export const getTreeMapDataAPI = async (country: countryType) => {
  try {
    const response = await axios.get(
      `/api/pairtrading/heatmap/?country=${country}&limit=${LIMIT_NUM}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
