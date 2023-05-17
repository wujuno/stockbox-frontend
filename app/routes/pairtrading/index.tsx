import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { Page } from '@/components/Layout';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { DataFunctionArgs, json } from '@remix-run/node';
import {
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  PaletteMode,
  TextField,
  Theme,
  Typography,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled';
import { useRecoilValueLoadable } from 'recoil';
import { useHydrated } from 'remix-utils';
import debounce from 'lodash/debounce';
import qs from 'qs';
import { ComData, CountryType, comSelectorFamily } from '@/modules/pairtrading';
import { RootContext } from '@/root';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

interface ListItemsProps {
  page?: number;
  searchText: string;
  country: CountryType;
  onClick?: (comData: ComData) => void;
}

interface ListItemsRef {
  reset: () => void;
}

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    return { user };
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const StyledPage = styled(Page)<{ theme: Theme; themeMode?: PaletteMode }>`
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    .list-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      width: 100%;
      height: 480px;

      .list {
        width: 100%;
        height: 100%;
        max-width: 360px;
        max-height: 480px;
        ${({ themeMode }) =>
          themeMode === 'dark' ? 'background-color: #333;' : 'background-color: #eee;'}
        overflow-y: hidden;

        .sub-header {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 60px;
          ${({ themeMode }) =>
            themeMode === 'dark' ? 'background-color: #333;' : 'background-color: #eee;'}

          .com-search {
            flex: 1;
          }
        }

        .list-item-wrapper {
          height: calc(100% - 48px);
          overflow-y: auto;

          .list-item-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .btn-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;

        button {
          width: 100%;
          background-color: #1976d2;

          p {
            color: #fff;
          }

          &:disabled {
            background-color: #777;
          }
        }
      }
    }
  }
`;

const ListItems = forwardRef<ListItemsRef, ListItemsProps>(
  ({ page = 1, searchText, country, onClick }, ref) => {
    const [selectedCom, setSelectedCom] = useState<ComData | null>(null);

    const comDataLoadable = useRecoilValueLoadable(comSelectorFamily(country));
    const { contents, state } = comDataLoadable;

    const filteredComData = useMemo(() => {
      if (state !== 'hasValue') return;
      return contents.filter(d => new RegExp(searchText, 'i').test(d.name)).slice(0, 10 * page);
    }, [contents, state, page, searchText]);

    useImperativeHandle(ref, () => ({
      reset: () => setSelectedCom(null)
    }));

    return (
      <>
        {state === 'hasValue' &&
          filteredComData?.map((d, i) => (
            <ListItemButton
              key={i}
              title={d.name}
              selected={d.id === selectedCom?.id && d.name === selectedCom?.name}
              disabled={!!selectedCom}
              onClick={() => {
                setSelectedCom(d);
                onClick?.(d);
              }}
            >
              <ListItem>
                <Typography className="list-item-text">{d.name}</Typography>
              </ListItem>
            </ListItemButton>
          ))}
      </>
    );
  }
);

export const handle = {
  i18n: 'pairtrading'
};

const PairTrading = () => {
  const [country, setCountry] = useState<CountryType>('KOR');
  const [comPage1, setComPage1] = useState(1);
  const [comPage2, setComPage2] = useState(1);
  const [comSearchText1, setComSearchText1] = useState('');
  const [comSearchText2, setComSearchText2] = useState('');
  const [selectedComId1, setSelectedComId1] = useState<string | null>(null);
  const [selectedComId2, setSelectedComId2] = useState<string | null>(null);

  const { themeMode } = useContext(RootContext);

  const theme = useTheme();
  const isHydrated = useHydrated();
  const navigate = useNavigate();
  const { t } = useTranslation('pairtrading');

  const debounceFunc = useRef<any>(null);
  const comSearchInput1 = useRef<HTMLInputElement>(null);
  const comSearchInput2 = useRef<HTMLInputElement>(null);
  const comListWrapper1 = useRef<HTMLDivElement>(null);
  const comListWrapper2 = useRef<HTMLDivElement>(null);
  const comList1 = useRef<ListItemsRef>(null);
  const comList2 = useRef<ListItemsRef>(null);

  const handleScrollList = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>, lr: 'left' | 'right') => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight < scrollHeight) return;
      if (lr === 'left') setComPage1(comPage1 + 1);
      if (lr === 'right') setComPage2(comPage2 + 1);
    },
    [comPage1, comPage2]
  );

  const handleChangeComSearch = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, lr: 'left' | 'right') => {
      debounceFunc.current?.cancel();
      debounceFunc.current = debounce(() => {
        if (lr === 'left') {
          setComPage1(1);
          setComSearchText1(e.target.value);
        }
        if (lr === 'right') {
          setComPage2(1);
          setComSearchText2(e.target.value);
        }
        debounceFunc.current = null;
      }, 500);
      debounceFunc.current?.();
    },
    []
  );

  const handleClickComItem = useCallback((comData: ComData, lr: 'left' | 'right') => {
    console.log('handleClickComItem', comData);
    if (lr === 'left') {
      if (comSearchInput1.current) comSearchInput1.current.value = comData.name;
      setComSearchText1(comData.name);
      setSelectedComId1(comData.id);
    }
    if (lr === 'right') {
      if (comSearchInput2.current) comSearchInput2.current.value = comData.name;
      setComSearchText2(comData.name);
      setSelectedComId2(comData.id);
    }
  }, []);

  const handleClickCompareButton = useCallback(() => {
    const query = qs.stringify({ country, comId1: selectedComId1, comId2: selectedComId2 });
    console.log(query);
    navigate(`/pairtrading/compare?${query}`);
  }, [country, selectedComId1, selectedComId2, navigate]);

  const handleClickResetButton = useCallback(() => {
    if (comSearchInput1.current) comSearchInput1.current.value = '';
    if (comSearchInput2.current) comSearchInput2.current.value = '';
    comList1.current?.reset();
    comList2.current?.reset();
    setComPage1(1);
    setComPage2(1);
    setComSearchText1('');
    setComSearchText2('');
    setSelectedComId1(null);
    setSelectedComId2(null);
  }, []);

  const handleChangCountry = useCallback(
    (changedCountry: CountryType) => {
      setCountry(changedCountry);
      handleClickResetButton();
    },
    [handleClickResetButton]
  );

  useEffect(() => {
    if (comListWrapper1.current) comListWrapper1.current.scrollTop = 0;
  }, [comSearchText1]);

  useEffect(() => {
    if (comListWrapper2.current) comListWrapper2.current.scrollTop = 0;
  }, [comSearchText2]);

  return (
    <StyledPage theme={theme} themeMode={themeMode}>
      <ButtonGroup variant="outlined" size="large">
        <Button
          variant={country === 'KOR' ? 'contained' : 'outlined'}
          onClick={() => handleChangCountry('KOR')}
        >
          {t('domesticStocks')}
        </Button>
        <Button
          variant={country === 'KOR' ? 'outlined' : 'contained'}
          onClick={() => handleChangCountry('US')}
        >
          {t('foreignStocks')}
        </Button>
      </ButtonGroup>
      <div className="list-wrapper">
        <List
          className="list"
          subheader={
            <ListSubheader className="sub-header">
              <Typography>{`${t('com')} 1`}</Typography>
              <TextField
                inputProps={{ ref: comSearchInput1 }}
                className="com-search"
                variant="outlined"
                size="small"
                onChange={e => handleChangeComSearch(e, 'left')}
              />
            </ListSubheader>
          }
        >
          <Divider />
          <div
            ref={comListWrapper1}
            className="list-item-wrapper"
            onScroll={e => handleScrollList(e, 'left')}
          >
            {isHydrated && (
              <ListItems
                ref={comList1}
                page={comPage1}
                searchText={comSearchText1}
                country={country}
                onClick={comData => handleClickComItem(comData, 'left')}
              />
            )}
          </div>
        </List>
        <div className="btn-wrapper">
          <Button
            variant="contained"
            disabled={!(selectedComId1 && selectedComId2)}
            onClick={handleClickCompareButton}
          >
            <Typography>{t('compare')}</Typography>
          </Button>
          <Button
            variant="contained"
            disabled={!(selectedComId1 || selectedComId2)}
            onClick={handleClickResetButton}
          >
            <Typography>{t('reset')}</Typography>
          </Button>
        </div>
        <List
          className="list"
          subheader={
            <ListSubheader className="sub-header">
              <Typography>{`${t('com')} 2`}</Typography>
              <TextField
                inputProps={{ ref: comSearchInput2 }}
                className="com-search"
                variant="outlined"
                size="small"
                onChange={e => handleChangeComSearch(e, 'right')}
              />
            </ListSubheader>
          }
        >
          <Divider />
          <div
            ref={comListWrapper2}
            className="list-item-wrapper"
            onScroll={e => handleScrollList(e, 'right')}
          >
            {isHydrated && (
              <ListItems
                ref={comList2}
                page={comPage2}
                searchText={comSearchText2}
                country={country}
                onClick={comData => handleClickComItem(comData, 'right')}
              />
            )}
          </div>
        </List>
      </div>
    </StyledPage>
  );
};

export default PairTrading;
