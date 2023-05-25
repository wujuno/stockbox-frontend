import { companyData, countryType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

const LIMIT_NUM = 50;

export const getTreeMapDataAPI = async (
  country: countryType
): Promise<AxiosResponse<companyData[], any>> => {
  try {
    const response = await axios.get(
      `/api/pairtrading/heatmap/?country=${country}&limit=${LIMIT_NUM}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
