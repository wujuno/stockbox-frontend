import {
  kNameDataState,
  kTickerDataState,
  kTreeMapDataState,
  usNameDataState,
  usTickerDataState,
  usTreeMapDataState
} from '@/atoms';
import { getTreeMapDataAPI } from '@/services/treemapChart';
import { companyData, countryType } from '@/types/type';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const useTreeMapData = (country: countryType) => {
  const [data, setData] = useRecoilState(country === 'US' ? usTreeMapDataState : kTreeMapDataState);
  const setNameData = useSetRecoilState(country === 'US' ? usNameDataState : kNameDataState);
  const setTickerData = useSetRecoilState(country === 'US' ? usTickerDataState : kTickerDataState);

  useEffect(() => {
    getTreeMapDataAPI(country).then(data => {
      setData([...data]);
      setNameData(data.map((obj: companyData) => obj.COMNAME));
      setTickerData(data.map((obj: companyData) => obj.SECURITYMASTERX_ID));
    });
  }, [setData, setNameData, setTickerData, country]);

  return data;
};
