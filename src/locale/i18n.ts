import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const pl = require('./pl.js');
const en = require('./en.js');

const languageDetector = {
  type: 'languageDetector',
  async: false,
  detect: () => RNLocalize.getLocales()[0].languageCode,
  init: () => null,
  cacheUserLanguage: () => null,
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: en.translations,
      pl: pl.translations,
    },
    debug: __DEV__,
  });

export default i18n;
