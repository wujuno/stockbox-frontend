import { companyArticleType } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

const SHOW_MAX_NUM = 10;

export const getArticlesDataAPI = async (
  companyName: string
): Promise<AxiosResponse<companyArticleType[], any>> => {
  try {
    const response = await axios.get(
      `/api/pairtrading/crawling/?query=${encodeURIComponent(companyName)}&news_num=${SHOW_MAX_NUM}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
