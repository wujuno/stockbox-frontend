import Backend from 'i18next-fs-backend';
import { resolve } from 'path';
import { RemixI18Next } from 'remix-i18next';
import i18n from '@/i18n/config';
import { langCookie } from '@/cookies';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs as string[],
    fallbackLanguage: i18n.fallbackLng as string,
    cookie: langCookie
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  backend: Backend,
});

export default i18next;
