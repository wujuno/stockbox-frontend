import { IBoardListData } from '@/atoms';
import axios, { AxiosResponse } from 'axios';

export const getBoardListAPI = async (): Promise<AxiosResponse<IBoardListData[], any>> => {
  try {
    const response = await axios.get('/api/board/');
    return response;
  } catch (error) {
    throw error;
  }
};
