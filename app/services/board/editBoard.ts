import { ApiResponseStatusType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

export const editBoardAPI = async (
  postId: string,
  title: string,
  content: string
): Promise<AxiosResponse<ApiResponseStatusType>> => {
  try {
    const response = await axios.put(`/api/board/update/${postId}`, {
      title,
      content
    });
    return response;
  } catch (error) {
    throw error;
  }
};
