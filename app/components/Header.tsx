import { AppBar, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { Form, useNavigate, useSubmit } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCallback, useRef } from 'react';

interface HeaderProps {
  user?: TokenBody;
}

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

  .header-left {
    .header-logo {
      user-select: none;
      cursor: pointer;
    }
  }

  .header-right {
    justify-content: flex-end;
  }
`;

const Header = ({ user }: HeaderProps) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const signOutFormRef = useRef<HTMLFormElement>(null);

  const handleClickSignOutButton = useCallback(() => {
    Swal.fire({
      icon: 'question',
      title: t('signOut') as string,
      text: t('signOutMessage') as string,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: t('confirm') as string,
      cancelButtonText: t('cancel') as string,
      heightAuto: false
    }).then(result => {
      if (!result.isConfirmed || !signOutFormRef.current) return;
      submit(signOutFormRef.current);
    });
  }, [t, submit]);

  return (
    <AppBar position="static">
      <StyledToolbar variant="dense">
        <div className="header-left">
          <Typography className="header-logo" variant="h6" component="div" color="inherit" onClick={() => navigate('/')}>
            StockBox
          </Typography>
        </div>
        <div className="header-right">
          <Form method="post" replace action="/?/changeTheme">
            <input type="hidden" name="themeMode" value={theme.palette.mode === 'light' ? 'dark' : 'light'} />
            <Tooltip title={`${t('theme')}: ${t(theme.palette.mode)}`}>
              <IconButton type="submit" color="inherit">
                {theme.palette.mode === 'dark' ? <DarkModeIcon width={24} height={24} /> : <LightModeIcon width={24} height={24} />}
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
          {user && (
            <>
              <Tooltip title={t('signOut')}>
                <IconButton color="inherit" onClick={handleClickSignOutButton}>
                  <LogoutIcon width={24} height={24} />
                </IconButton>
              </Tooltip>
              <Form ref={signOutFormRef} method="post" replace action="/?/signOut" />
            </>
          )}
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
