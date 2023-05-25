import { ApiResponseStatusType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const callNicknameAPI = async (
  nickname: string
): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.get(`/api/auth/duplicate/nickname/${nickname}`);
    return response;
  } catch (error) {
    throw error;
  }
};
