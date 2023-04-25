import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { Form, useLoaderData, useNavigate, useSubmit } from '@remix-run/react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import roboto100 from '@fontsource/roboto/100.css';
import roboto300 from '@fontsource/roboto/300.css';
import roboto400 from '@fontsource/roboto/400.css';
import roboto500 from '@fontsource/roboto/500.css';
import roboto700 from '@fontsource/roboto/700.css';
import roboto900 from '@fontsource/roboto/900.css';
import { RootContext } from '@/root';
import Header from '@/components/Header';
import {
  createTheme,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  PaletteMode,
  Theme,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

const styles = css`
  @import '${roboto100}';
  @import '${roboto300}';
  @import '${roboto400}';
  @import '${roboto500}';
  @import '${roboto700}';
  @import '${roboto900}';

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  .global-drawer {
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 300px;
      padding: 10px !important;
    }

    .drawer-item {
      display: flex;
      align-items: center;
      width: 300px;
      padding: 0;

      .drawer-item-btn {
        display: flex;
        gap: 10px;
      }
    }
  }
`;

const Main = styled.main<{ muiTheme: Theme }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .contents-wrapper {
    display: flex;
    background-color: ${({ muiTheme }) => muiTheme.palette.background.paper};
    flex: 1;

    .side-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      gap: 5px;
      width: 60px;
      height: 100%;
      background-color: ${({ muiTheme }) => muiTheme.palette.divider};

      .side-bar-btn {
        .side-bar-icon {
          width: 32px;
          height: 32px;
        }
      }
    }

    .contents {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
    }
  }
`;

export const GlobalStyle = () => <Global styles={styles} />;

export const Page = ({ className, style, children }: DefaultProps) => {
  const { user } = useLoaderData();
  const { themeMode, drawerOpen, setDrawerOpen } = useContext(RootContext);

  const submit = useSubmit();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const themeFormRef = useRef<HTMLFormElement>(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode
        },
        typography: {
          allVariants: {
            color: themeMode === 'dark' ? '#fff' : '#000'
          }
        }
      }),
    [themeMode]
  );

  const movePage = useCallback(
    (to: string) => {
      setDrawerOpen(false);
      navigate(to);
    },
    [setDrawerOpen, navigate]
  );

  useEffect(() => {
    const themeForm = themeFormRef.current;
    if (themeMode || !themeForm) return;
    const systemTheme: PaletteMode | undefined = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    themeForm.themeMode.value = systemTheme;
    submit(themeForm);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Main className={className} muiTheme={theme} style={style}>
        <Header user={user} />
        <Box className="contents-wrapper">
          <Box className="side-bar">
            <Tooltip title={t('home')} placement="right">
              <IconButton className="side-bar-btn" onClick={() => movePage('/')}>
                <HomeIcon className="side-bar-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('board')} placement="right">
              <IconButton className="side-bar-btn" onClick={() => movePage('/board')}>
                <AssignmentIcon className="side-bar-icon" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box className="contents">{children}</Box>
        </Box>
      </Main>
      <Form ref={themeFormRef} method="post" action="/?/changeTheme" replace>
        <input type="hidden" name="themeMode" />
      </Form>
      <Drawer
        className="global-drawer"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar className="drawer-header drawer-item">
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon width={24} height={24} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem className="drawer-item">
            <ListItemButton className="drawer-item-btn" onClick={() => movePage('/')}>
              <HomeIcon />
              <Typography>{t('home')}</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem className="drawer-item">
            <ListItemButton className="drawer-item-btn" onClick={() => movePage('/board')}>
              <AssignmentIcon />
              <Typography>{t('board')}</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};
