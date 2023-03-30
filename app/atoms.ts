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
