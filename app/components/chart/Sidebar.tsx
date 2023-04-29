import { kNameDataState, kTickerDataState, usNameDataState, usTickerDataState } from '@/atoms';
import { Box, Button, ButtonGroup, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

interface ISideBarProps {
  selected: '해외' | '국내';
  setSelected: (selected: '해외' | '국내') => void;
}

const SideBar: React.FC<ISideBarProps> = ({ selected, setSelected }) => {
  const usNameData = useRecoilValue(usNameDataState);
  const usTickerData = useRecoilValue(usTickerDataState);
  const kNameData = useRecoilValue(kNameDataState);
  const kTickerData = useRecoilValue(kTickerDataState);

  const navigate = useNavigate();
  const { t } = useTranslation('index');

  const handleBarOption = (value: '해외' | '국내') => {
    setSelected(value);
  };

  return (
    <Box>
      <ButtonGroup fullWidth>
        <Button
          onClick={() => handleBarOption('해외')}
          sx={{
            fontWeight: selected === '해외' ? 'bold' : 'normal'
          }}
          variant={selected === '해외' ? 'contained' : 'outlined'}
        >
          {t('USA')}
        </Button>
        <Button
          onClick={() => handleBarOption('국내')}
          sx={{
            fontWeight: selected === '국내' ? 'bold' : 'normal'
          }}
          variant={selected === '국내' ? 'contained' : 'outlined'}
        >
          {t('KOR')}
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          width: '100% ',
          overflow: 'auto',
          height: 'calc(100vh - 64px - 48px - 36px )',
          '&::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: '#F5F5F5'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px'
          }
        }}
      >
        <List>
          {selected === '해외'
            ? usNameData
              ? usNameData.map((n, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <Button
                      fullWidth
                      onClick={() => {
                        navigate(`/${usTickerData[i]}`);
                      }}
                      variant="text"
                    >
                      <Typography variant="subtitle2">{n}</Typography>
                    </Button>
                  </ListItem>
                ))
              : null
            : kNameData
            ? kNameData.map((n, i) => (
                <ListItem key={i} sx={{ pl: 0 }}>
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate(`/${kTickerData[i]}`);
                    }}
                    variant="text"
                  >
                    <Typography variant="subtitle2">{n}</Typography>
                  </Button>
                </ListItem>
              ))
            : null}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
