import { createContext, useEffect } from 'react';
import { DataFunctionArgs, json, MetaFunction, redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { GlobalStyle } from '@/components/Layout';
import { langCookie, themeCookie } from '@/cookies';
import { PaletteMode } from '@mui/material';
import { namedAction } from 'remix-utils';
import i18next from '@/i18n/server';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'StockBox',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader = async ({ request }: DataFunctionArgs) => {
  const theme: PaletteMode | undefined = await themeCookie.parse(request.headers.get('Cookie')) ?? undefined;
  const locale = await i18next.getLocale(request);
  const frontendVersion = process.env.FRONTEND_VERSION;
  return json({ theme, locale, frontendVersion });
};

export const action = async ({ request }: DataFunctionArgs) => {
  const referer = request.headers.get('Referer') ?? '/';

  return namedAction(request, {
    async changeTheme() {
      try {
        const themeMode = (await request.formData()).get('themeMode');
        return redirect(referer, {
          headers: {
            'Set-Cookie': await themeCookie.serialize(themeMode ?? null)
          }
        });
      } catch (err) {
        console.error(err);
        return redirect(referer);
      }
    },
    async changeLang() {
      try {
        const locale = await i18next.getLocale(request);
        return redirect(referer, {
          headers: {
            'Set-Cookie': await langCookie.serialize(locale === 'en' ? 'ko' : 'en')
          }
        });
      } catch (err) {
        console.error(err);
        return redirect(referer);
      }
    }
  })
};

export const handle = { i18n: 'common' };

export const ThemeModeContext = createContext<PaletteMode | undefined>(undefined);

const App = () => {
  const { theme, locale, frontendVersion } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <RecoilRoot>
      <html lang={locale} dir={i18n.dir()}>
        <head>
          <Meta />
          <Links />
          <GlobalStyle />
        </head>
        <body>
          <ThemeModeContext.Provider value={theme}>
            <div id="root">
              <Outlet />
            </div>
          </ThemeModeContext.Provider>
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.frontendVersion = '${frontendVersion}';`,
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </RecoilRoot>
  );
};

export default App;
