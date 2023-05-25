import { ApiResponseStatusType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const createBoardAPI = async (
  title: string,
  content: string
): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.post('/api/board/create', {
      title,
      content
    });
    return response;
  } catch (error) {
    throw error;
  }
};
