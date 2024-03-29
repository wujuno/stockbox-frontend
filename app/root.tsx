import { createContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { DataFunctionArgs, json, MetaFunction, redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react';
import { namedAction } from 'remix-utils';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '@/components/Layout';
import { langCookie, themeCookie, tokenCookie } from '@/cookies';
import { PaletteMode } from '@mui/material';
import i18next from '@/i18n/server';

interface RootContextState {
  themeMode: PaletteMode | undefined;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'StockBox',
  viewport: 'width=device-width,initial-scale=1'
});

export const loader = async ({ request }: DataFunctionArgs) => {
  const cookieHeader = request.headers.get('Cookie');
  const theme: PaletteMode | undefined = (await themeCookie.parse(cookieHeader)) ?? undefined;
  const locale = await i18next.getLocale(request);
  const cacheUuid = process.env.CACHE_UUID;
  return json({ theme, locale, cacheUuid });
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
    },
    async signOut() {
      try {
        return redirect('/signin', {
          headers: {
            'Set-Cookie': await tokenCookie.serialize(null)
          }
        });
      } catch (err) {
        console.error(err);
        return redirect(referer);
      }
    }
  });
};

export const handle = { i18n: 'common' };

const defaultRootContext = {
  themeMode: undefined,
  drawerOpen: false,
  setDrawerOpen: (() => {}) as any
};

export const RootContext = createContext<RootContextState>(defaultRootContext);

const App = () => {
  const { theme, locale, cacheUuid } = useLoaderData<typeof loader>();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
          <RootContext.Provider value={{ themeMode: theme, drawerOpen, setDrawerOpen }}>
            <div id="root">
              <Outlet />
            </div>
          </RootContext.Provider>
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.cacheUuid = '${cacheUuid}';`
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
