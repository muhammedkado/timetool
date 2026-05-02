import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Clock, Users, Calendar, Timer, Briefcase, ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Layout } from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

const WORLD_CITIES = [
  { city: "New York", timezone: "America/New_York" },
  { city: "London", timezone: "Europe/London" },
  { city: "Dubai", timezone: "Asia/Dubai" },
  { city: "Singapore", timezone: "Asia/Singapore" },
  { city: "Tokyo", timezone: "Asia/Tokyo" },
  { city: "Sydney", timezone: "Australia/Sydney" },
];

function WorldClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {WORLD_CITIES.map(({ city, timezone }) => {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        }).format(now);
        const dateStr = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone, weekday: "short", month: "short", day: "numeric",
        }).format(now);
        const offset = (() => {
          const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone, timeZoneName: "shortOffset",
          }).formatToParts(now);
          return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
        })();
        return (
          <div key={city} data-testid={`world-clock-${city.toLowerCase().replace(/\s/g, "-")}`}
            className="bg-card border border-card-border rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">{city}</p>
            <p className="text-2xl font-mono font-bold text-primary tabular-nums leading-none">{timeStr}</p>
            <p className="text-xs text-muted-foreground mt-1.5">{dateStr}</p>
            <p className="text-xs font-mono text-muted-foreground/70 mt-0.5">{offset}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { langPath, lang } = useLang();

  useSeo({
    title: `Free Time & Date Tools | TimeZone.tools`,
    description: "Free time zone converter, meeting planner, date difference calculator, countdown timer, and working days calculator. Precise tools for a global world.",
    canonical: `https://timezone.tools/${lang}/`,
  });

  const TOOLS = [
    { path: "/time-zone-converter", icon: Clock, titleKey: "home.timezone_title", descKey: "home.timezone_desc" },
    { path: "/meeting-planner", icon: Users, titleKey: "home.meeting_title", descKey: "home.meeting_desc" },
    { path: "/date-difference", icon: Calendar, titleKey: "home.dateDiff_title", descKey: "home.dateDiff_desc" },
    { path: "/countdown-timer", icon: Timer, titleKey: "home.countdown_title", descKey: "home.countdown_desc" },
    { path: "/working-days", icon: Briefcase, titleKey: "home.workDays_title", descKey: "home.workDays_desc" },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-muted/40 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-5 border border-primary/20">
            <Clock size={12} />
            <span>{t("common.free_no_signup")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t("home.hero_title")}
            <br className="hidden sm:block" />
            <span className="text-primary"> {t("home.hero_subtitle")}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t("home.hero_description")}
          </p>
          <WorldClock />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground">{t("home.all_tools")}</h2>
          <p className="text-muted-foreground text-sm mt-1">{t("home.all_tools_subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(({ path, icon: Icon, titleKey, descKey }) => (
            <Link key={path} href={langPath(path)}
              data-testid={`tool-card-${path.replace("/", "")}`}
              className="group bg-card border border-card-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground mb-1.5">{t(titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-primary mt-4 group-hover:gap-2 transition-all">
                {t("common.open_tool")}
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">80+</p>
              <p className="text-sm text-muted-foreground mt-1">{t("home.stat_cities")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground mt-1">{t("home.stat_tools")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-1">{t("home.stat_free")}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
