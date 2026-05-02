import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Clock, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { AdSlot } from "@/components/AdSlot";

const NAV_LINKS = [
  { href: "/time-zone-converter", label: "Time Zone Converter" },
  { href: "/meeting-planner", label: "Meeting Planner" },
  { href: "/date-difference", label: "Date Difference" },
  { href: "/countdown-timer", label: "Countdown Timer" },
  { href: "/working-days", label: "Working Days" },
];

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = false }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-base text-primary hover:opacity-80 transition-opacity"
            >
              <Clock size={20} className="flex-shrink-0" />
              <span>TimeZone.tools</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    location === href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
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
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location === href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 min-w-0">{children}</div>
        {showSidebar && (
          <aside className="hidden xl:block flex-shrink-0 px-4 py-8 border-l border-border">
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
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-muted-foreground">Free tools for a connected world</p>
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
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border border-border rounded-lg overflow-hidden"
          >
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-muted transition-colors list-none">
              <span>{item.q}</span>
              <svg
                className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
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
