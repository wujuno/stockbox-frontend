import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import i18nConfig from '@/i18n/config';
import { getInitialNamespaces } from 'remix-i18next';

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
  });
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18nConfig,
    ns: getInitialNamespaces(),
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?uuid=${window.cacheUuid}`
    },
    detection: {
      order: ['htmlTag'],
      caches: []
    }
  })
  .then(() => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(hydrate);
    else setTimeout(hydrate, 1);
  });
