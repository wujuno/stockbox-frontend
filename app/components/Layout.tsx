import { useContext, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import roboto100 from '@fontsource/roboto/100.css';
import roboto300 from '@fontsource/roboto/300.css';
import roboto400 from '@fontsource/roboto/400.css';
import roboto500 from '@fontsource/roboto/500.css';
import roboto700 from '@fontsource/roboto/700.css';
import roboto900 from '@fontsource/roboto/900.css';
import Header from '@/components/Header';
import { createTheme, PaletteMode, Theme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeModeContext } from '@/root';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';

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
  const { user } = useLoaderData();

  const themeMode = useContext(ThemeModeContext);
  const submit = useSubmit();

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

  useEffect(() => {
    const themeForm = themeFormRef.current;
    if (themeMode || !themeForm) return;
    const systemTheme: PaletteMode | undefined = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    themeForm.themeMode.value = systemTheme;
    submit(themeForm);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Main className={className} muiTheme={theme} style={style}>
        <Header user={user} />
        <Box className="contents">{children}</Box>
      </Main>
      <Form ref={themeFormRef} method="post" action="/?/changeTheme" replace>
        <input type="hidden" name="themeMode" />
      </Form>
    </ThemeProvider>
  );
};
