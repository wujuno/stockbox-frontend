import { atom } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

interface IOneCPData {
  COMNAME: object;
  MARKETDATE: object;
  PRICE: object;
}

interface IBoardListData {
  id: number;
  title: string;
  content: string;
  date_updated: string;
  user: {
    id: number;
    nickname: string;
  };
}

interface IEditContents {
  title: string;
  content: string;
}

/////sideBar/////

export const usNameDataState = atom<string[]>({
  key: uuidV4(),
  default: []
});
export const kNameDataState = atom<string[]>({
  key: uuidV4(),
  default: []
});
export const usTickerDataState = atom<string[]>({
  key: uuidV4(),
  default: []
});
export const kTickerDataState = atom<string[]>({
  key: uuidV4(),
  default: []
});

//////chart//////

export const usTreeMapDataState = atom<companyData[]>({
  key: uuidV4(),
  default: []
});
export const kTreeMapDataState = atom<companyData[]>({
  key: uuidV4(),
  default: []
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
    url: {},
    img_url: {}
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

export const editContentsState = atom<IEditContents | null>({
  key: uuidV4(),
  default: null
});
