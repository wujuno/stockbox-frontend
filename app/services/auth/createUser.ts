import { ApiResponseStatusType, userDataType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const createUserAPI = async (
  userData: userDataType
): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.post('/api/auth/signup/stock', userData);
    return response;
  } catch (error) {
    throw error;
  }
};
