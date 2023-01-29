import { useContext, useMemo } from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import roboto100 from '@fontsource/roboto/100.css';
import roboto300 from '@fontsource/roboto/300.css';
import roboto400 from '@fontsource/roboto/400.css';
import roboto500 from '@fontsource/roboto/500.css';
import roboto700 from '@fontsource/roboto/700.css';
import roboto900 from '@fontsource/roboto/900.css';
import Header from '@/components/Header';
import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeModeContext } from '@/root';

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
`;

const Main = styled.main<{ muiTheme: Theme }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .contents {
    flex: 1;
    padding: 15px;
    background-color: ${({ muiTheme }) => muiTheme.palette.background.paper};
    overflow-y: auto;
  }
`;

export const GlobalStyle = () => <Global styles={styles} />;

export const Page = ({ className, style, children }: DefaultProps) => {
  const themeMode = useContext(ThemeModeContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode
        },
        typography: {
          allVariants: {
            color: themeMode === 'light' ? '#000' : '#fff'
          }
        }
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Main className={className} muiTheme={theme} style={style}>
        <Header />
        <Box className="contents">{children}</Box>
      </Main>
    </ThemeProvider>
  );
};
