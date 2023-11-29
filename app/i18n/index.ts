import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18n } from '@/next-i18next.config';

export default async function initTranslations(locale: any, namespaces: any[]) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`locales/${language}/common.json`),
      ),
    )
    .init({
      lng: locale,
      fallbackLng: i18n.defaultLocale,
      supportedLngs: i18n.locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      preload: typeof window === 'undefined' ? i18n.locales : [],
    });

  return i18nInstance;
}
