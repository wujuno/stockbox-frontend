import { companyHistoryType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

type LineChartDataType = {
  name: string;
  history: companyHistoryType[];
};

export const getKORLineChartDataAPI = async (
  startDate: string,
  company: string
): Promise<AxiosResponse<LineChartDataType, any>> => {
  try {
    const response = await axios.get(
      `/api/pairtrading/price/?country=KOR&start_date=${startDate}&securitymasterx_id=${encodeURIComponent(
        company || 0
      )}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUSLineChartDataAPI = async (
  startDate: string,
  company: string
): Promise<AxiosResponse<LineChartDataType, any>> => {
  try {
    const response = await axios.get(
      `/api/pairtrading/price/?country=US&start_date=${startDate}&securitymasterx_id=${encodeURIComponent(
        company || 0
      )}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
