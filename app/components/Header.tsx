import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled';
import { Form } from '@remix-run/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-right {
    justify-content: flex-end;
  }
`;

const Header = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <AppBar position="static">
      <StyledToolbar variant="dense">
        <div className="header-left">
          <Typography variant="h6" component="div" color="inherit">
            StockBox
          </Typography>
        </div>
        <div className="header-right">
          <Form method="post" replace action="/?/changeTheme">
            <input
              type="hidden"
              name="themeMode"
              value={theme.palette.mode === 'light' ? 'dark' : 'light'}
            />
            <Tooltip title={`${t('theme')}: ${t(theme.palette.mode)}`}>
              <IconButton type="submit" color="inherit">
                {theme.palette.mode === 'dark' ? (
                  <DarkModeIcon width={24} height={24} />
                ) : (
                  <LightModeIcon width={24} height={24} />
                )}
              </IconButton>
            </Tooltip>
          </Form>
          <Form method="post" replace action="/?/changeLang">
            <Tooltip title={`${t('language')}: ${t('currentLanguage')}`}>
              <IconButton type="submit" color="inherit">
                <Typography width={24} height={24} color="inherit">
                  {i18n.language === 'en' ? 'En' : '한'}
                </Typography>
              </IconButton>
            </Tooltip>
          </Form>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
