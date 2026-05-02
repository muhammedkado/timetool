import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Clock, Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";
import { SUPPORTED_LANGS, SupportedLang } from "@/i18n";
import { AdSlot } from "@/components/AdSlot";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const langNames: Record<SupportedLang, string> = {
    en: "EN",
    ar: "عر",
    tr: "TR",
    fr: "FR",
    es: "ES",
    hi: "हि",
    zh: "中",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm font-medium"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="hidden sm:inline text-xs">{langNames[lang]}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute end-0 top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px]">
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l as SupportedLang); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-start hover:bg-muted transition-colors ${
                  lang === l ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                }`}
              >
                <span className="w-6 text-xs font-mono text-muted-foreground">{langNames[l as SupportedLang]}</span>
                <span>{t(`lang.${l}`)}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = false }: LayoutProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const { langPath } = useLang();

  const NAV_LINKS = [
    { path: "/time-zone-converter", key: "nav.timezone_converter" },
    { path: "/meeting-planner", key: "nav.meeting_planner" },
    { path: "/date-difference", key: "nav.date_difference" },
    { path: "/countdown-timer", key: "nav.countdown_timer" },
    { path: "/working-days", key: "nav.working_days" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href={langPath("/")}
              className="flex items-center gap-2 font-bold text-base text-primary hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Clock size={20} className="flex-shrink-0" />
              <span>TimeZone.tools</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto" aria-label="Main navigation">
              {NAV_LINKS.map(({ path, key }) => {
                const href = langPath(path);
                const isActive = location === href || location === href + "/";
                return (
                  <Link
                    key={path}
                    href={href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <button
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                data-testid="button-mobile-menu"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-0.5">
              {NAV_LINKS.map(({ path, key }) => {
                const href = langPath(path);
                const isActive = location === href || location === href + "/";
                return (
                  <Link
                    key={path}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 min-w-0">{children}</div>
        {showSidebar && (
          <aside className="hidden xl:block flex-shrink-0 px-4 py-8 border-s border-border">
            <AdSlot slot="sidebar" />
          </aside>
        )}
      </div>

      <footer className="border-t border-border bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={15} />
              <span className="text-sm font-semibold">TimeZone.tools</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Footer navigation">
              {NAV_LINKS.map(({ path, key }) => (
                <Link
                  key={path}
                  href={langPath(path)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-muted-foreground">{t("common.footer_tagline")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <Layout showSidebar>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-1.5 text-muted-foreground text-sm sm:text-base">{description}</p>
        </div>
        {children}
      </div>
    </Layout>
  );
}

interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const { t } = useTranslation();
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">{t("common.faq_title")}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="group border border-border rounded-lg overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-muted transition-colors list-none">
              <span>{item.q}</span>
              <svg
                className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ms-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
