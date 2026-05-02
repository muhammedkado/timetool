import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useLocation } from "wouter";
import i18n, { SUPPORTED_LANGS, SupportedLang, isSupportedLang, isRtl } from "@/i18n";

interface LangContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  rtl: boolean;
  langPath: (path: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  rtl: false,
  langPath: (p) => p,
});

export function useLang() {
  return useContext(LangContext);
}

function detectBrowserLang(): SupportedLang {
  const saved = localStorage.getItem("tz_tools_lang");
  if (saved && isSupportedLang(saved)) return saved;

  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav && isSupportedLang(nav)) return nav;

  return "en";
}

function applyLangToDocument(lang: SupportedLang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";

  document.documentElement.classList.remove(...SUPPORTED_LANGS.map((l) => `lang-${l}`));
  document.documentElement.classList.add(`lang-${lang}`);
}

interface LangProviderProps {
  children: ReactNode;
  initialLang?: SupportedLang;
}

export function LangProvider({ children, initialLang }: LangProviderProps) {
  const [lang, setLangState] = useState<SupportedLang>(initialLang ?? detectBrowserLang());
  const [, navigate] = useLocation();

  const setLang = useCallback(
    (newLang: SupportedLang) => {
      if (newLang === lang) return;
      localStorage.setItem("tz_tools_lang", newLang);
      i18n.changeLanguage(newLang);
      applyLangToDocument(newLang);
      setLangState(newLang);

      const currentPath = window.location.pathname;
      const segments = currentPath.split("/").filter(Boolean);
      if (segments.length > 0 && isSupportedLang(segments[0])) {
        segments[0] = newLang;
      } else {
        segments.unshift(newLang);
      }
      navigate("/" + segments.join("/"));
    },
    [lang, navigate]
  );

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLangState(initialLang);
      localStorage.setItem("tz_tools_lang", initialLang);
    }
    const active = initialLang ?? lang;
    i18n.changeLanguage(active);
    applyLangToDocument(active);
  }, [initialLang]);

  const langPath = useCallback(
    (path: string) => {
      const p = path.startsWith("/") ? path : `/${path}`;
      return `/${lang}${p}`;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, rtl: isRtl(lang), langPath }}>
      {children}
    </LangContext.Provider>
  );
}
