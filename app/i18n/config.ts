import { InitOptions } from 'i18next';

const i18nConfig: InitOptions = {
  supportedLngs: ['ko', 'en'],
  fallbackLng: 'ko',
  defaultNS: 'common',
  react: {
    useSuspense: false
  }
};

export default i18nConfig;
