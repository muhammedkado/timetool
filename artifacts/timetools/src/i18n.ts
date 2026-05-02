import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

export const SUPPORTED_LANGS = ["en", "ar", "tr", "fr", "es", "hi", "zh"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const RTL_LANGS: SupportedLang[] = ["ar"];

export function isRtl(lang: string): boolean {
  return RTL_LANGS.includes(lang as SupportedLang);
}

export function isSupportedLang(lang: string): lang is SupportedLang {
  return SUPPORTED_LANGS.includes(lang as SupportedLang);
}

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    defaultNS: "translation",
    ns: ["translation"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "tz_tools_lang",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
