import { ApiResponseStatusType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const deleteBoardAPI = async (id: number): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.delete(`/api/board/delete/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
