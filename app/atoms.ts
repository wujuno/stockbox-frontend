import { atom } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

interface ICPData {
  BEFORE_PRICE: object;
  COMNAME: object;
  EXCHNAME: object;
  MARKETCAP: object;
  MARKETDATE: object;
  PRICE: object;
  SECURITYMASTERX_ID: object;
  YIELD: object;
}

interface IOneCPData {
  COMNAME: object;
  MARKETDATE: object;
  PRICE: object;
}

interface IBoardListData {
  id: number;
  title: string;
  content: string;
  data_updated: string;
  user_id: number;
}

//////chart//////

export const usTreeMapDataState = atom<ICPData>({
  key: uuidV4(),
  default: {
    BEFORE_PRICE: {},
    COMNAME: {},
    EXCHNAME: {},
    MARKETCAP: {},
    MARKETDATE: {},
    PRICE: {},
    SECURITYMASTERX_ID: {},
    YIELD: {}
  }
});
export const kTreeMapDataState = atom<ICPData>({
  key: uuidV4(),
  default: {
    BEFORE_PRICE: {},
    COMNAME: {},
    EXCHNAME: {},
    MARKETCAP: {},
    MARKETDATE: {},
    PRICE: {},
    SECURITYMASTERX_ID: {},
    YIELD: {}
  }
});

export const coDataState = atom<IOneCPData>({
  key: uuidV4(),
  default: {
    COMNAME: {},
    MARKETDATE: {},
    PRICE: {}
  }
});

export const coArticleState = atom({
  key: uuidV4(),
  default: {
    title: {},
    url: {}
  }
});

export const coNameState = atom<string>({
  key: uuidV4(),
  default: ''
});

export const coTitleState = atom<string>({
  key: uuidV4(),
  default: ''
});

/////board/////

export const postListState = atom<IBoardListData[]>({
  key: uuidV4(),
  default: []
});
