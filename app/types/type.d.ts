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
