import { ApiResponseStatusType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const callEmailAPI = async (
  email: string
): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.get(`/api/auth/duplicate/email/${email}`);
    return response;
  } catch (error) {
    throw error;
  }
};
