export type companyData = {
  BEFORE_PRICE: number;
  COMNAME: string;
  EXCHNAME: string;
  MARKETCAP: number;
  MARKETDATE: string;
  PRICE: number;
  SECURITYMASTERX_ID: string;
  YIELD: number;
};

export type companyHistoryType = {
  date: string;
  price: number;
};

export type companyArticleType = {
  title: string;
  url: string;
};

export type xyDataType = {
  x: string;
  y: number;
};

export type countryType = 'US' | 'KOR';

export type ApiResponseStatusType = {
  status: number;
};

export type userDataType = {
  name: string;
  nickname: FormDataEntryValue | null;
  email: string;
  password: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  address: FormDataEntryValue | null;
  address_detail: FormDataEntryValue | null;
  birthday: FormDataEntryValue | null;
};
