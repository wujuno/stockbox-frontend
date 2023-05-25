import {
  kNameDataState,
  kTickerDataState,
  kTreeMapDataState,
  usNameDataState,
  usTickerDataState,
  usTreeMapDataState
} from '@/atoms';
import { getTreeMapDataAPI } from '@/services/chart/treemapChart';
import { countryType } from '@/types/type';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const useTreeMapData = (country: countryType) => {
  const [treemapData, setTreemapData] = useRecoilState(
    country === 'US' ? usTreeMapDataState : kTreeMapDataState
  );
  const setNameData = useSetRecoilState(country === 'US' ? usNameDataState : kNameDataState);
  const setTickerData = useSetRecoilState(country === 'US' ? usTickerDataState : kTickerDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTreeMapDataAPI(country);
        setTreemapData(data);
        setNameData(treemapData.map(obj => obj.COMNAME));
        setTickerData(treemapData.map(obj => obj.SECURITYMASTERX_ID));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setTreemapData, setNameData, setTickerData, country]);

  return treemapData;
};
