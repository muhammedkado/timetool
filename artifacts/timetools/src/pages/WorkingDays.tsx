import { useState, useMemo, useCallback } from "react";
import { Briefcase, Info, Share2, Check } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { countWorkingDays, getHolidaysForYear, isWeekend, HolidayCountry } from "@/lib/holidays";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

const LANG_TO_COUNTRY: Record<string, HolidayCountry> = {
  en: "US", tr: "TR", fr: "FR", es: "ES", hi: "IN", zh: "CN", ar: "SA",
};

const COUNTRIES: HolidayCountry[] = ["US", "GB", "TR", "FR", "ES", "IN", "CN", "SA"];

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDate(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function getDayBreakdown(start: Date, end: Date, excludeHolidays: boolean, country: HolidayCountry) {
  let totalDays = 0, weekendDays = 0, holidayDays = 0, workingDays = 0;
  const years = new Set<number>();
  const tmp = new Date(start);
  while (tmp <= end) { years.add(tmp.getFullYear()); tmp.setFullYear(tmp.getFullYear() + 1); }
  const allHolidays = Array.from(years).flatMap((y) => getHolidaysForYear(y, country));
  const holidaySet = new Set(allHolidays.map((h) => `${h.date.getFullYear()}-${h.date.getMonth()}-${h.date.getDate()}`));

  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endD = new Date(end);
  endD.setHours(0, 0, 0, 0);
  while (cur <= endD) {
    totalDays++;
    const isWknd = isWeekend(cur);
    const key = `${cur.getFullYear()}-${cur.getMonth()}-${cur.getDate()}`;
    const isHol = excludeHolidays && holidaySet.has(key);
    if (isWknd) weekendDays++;
    else if (isHol) holidayDays++;
    else workingDays++;
    cur.setDate(cur.getDate() + 1);
  }
  return { totalDays, weekendDays, holidayDays, workingDays };
}

function parseShareParams(): { start: string; end: string; holidays: boolean; country: HolidayCountry } | null {
  try {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("start");
    const e = p.get("end");
    if (!s || !e) return null;
    const c = (p.get("country") as HolidayCountry) || "US";
    return { start: s, end: e, holidays: p.get("holidays") === "1", country: c };
  } catch {
    return null;
  }
}

export default function WorkingDays() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const shared = parseShareParams();
  const defaultCountry = (LANG_TO_COUNTRY[lang] ?? "US") as HolidayCountry;

  const [startDate, setStartDate] = useState(() => shared?.start ?? getTodayString());
  const [endDate, setEndDate] = useState(() => {
    if (shared?.end) return shared.end;
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [excludeHolidays, setExcludeHolidays] = useState(shared?.holidays ?? false);
  const [country, setCountry] = useState<HolidayCountry>(shared?.country ?? defaultCountry);
  const [copied, setCopied] = useState(false);

  useSeo({
    title: `${t("workDays.page_title")} | TimeZone.tools`,
    description: t("workDays.page_description"),
    canonical: `https://timezone.tools/${lang}/working-days`,
    breadcrumbs: [
      { name: "TimeZone.tools", url: `https://timezone.tools/${lang}/` },
      { name: t("workDays.page_title"), url: `https://timezone.tools/${lang}/working-days` },
    ],
  });

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`workDays.faq_q${i + 1}`),
    a: t(`workDays.faq_a${i + 1}`),
  }));

  const result = useMemo(() => {
    const s = parseDate(startDate);
    const e = parseDate(endDate);
    if (!s || !e) return null;
    const start = s <= e ? s : e;
    const end = s <= e ? e : s;
    return getDayBreakdown(start, end, excludeHolidays, country);
  }, [startDate, endDate, excludeHolidays, country]);

  const holidaysList = useMemo(() => {
    const s = parseDate(startDate);
    const e = parseDate(endDate);
    if (!s || !e) return [];
    const start = s <= e ? s : e;
    const end = s <= e ? e : s;
    const years = new Set<number>();
    const cur = new Date(start);
    while (cur <= end) { years.add(cur.getFullYear()); cur.setFullYear(cur.getFullYear() + 1); }
    const allHolidays = Array.from(years).flatMap((y) => getHolidaysForYear(y, country));
    return allHolidays.filter((h) => h.date >= start && h.date <= end && !isWeekend(h.date))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [startDate, endDate, country]);

  const share = useCallback(() => {
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
      holidays: excludeHolidays ? "1" : "0",
      country,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [startDate, endDate, excludeHolidays, country]);

  return (
    <PageLayout title={t("workDays.page_title")} description={t("workDays.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Briefcase size={15} className="text-primary" />
              {t("workDays.date_range")}
            </h2>
            <button onClick={share} data-testid="button-share"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              {copied ? <Check size={13} /> : <Share2 size={13} />}
              {copied ? t("common.copied") : t("common.share")}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("workDays.start_date")}</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} data-testid="input-start-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("workDays.end_date")}</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} data-testid="input-end-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <label className="flex items-center gap-2 cursor-pointer group flex-1">
              <input type="checkbox" checked={excludeHolidays} onChange={(e) => setExcludeHolidays(e.target.checked)}
                data-testid="checkbox-exclude-holidays" className="w-4 h-4 rounded border-input accent-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{t("workDays.exclude_holidays")}</span>
            </label>
            {excludeHolidays && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">{t("workDays.select_country")}</label>
                <select value={country} onChange={(e) => setCountry(e.target.value as HolidayCountry)}
                  data-testid="select-country"
                  className="px-2.5 py-1.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{t(`countries.${c}`)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {result && (
          <>
            <AdSlot slot="mid" className="my-2" />

            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-primary tabular-nums">{result.workingDays.toLocaleString()}</span>
                  <span className="text-lg font-medium text-foreground">{t("workDays.working_days")}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("workDays.in_period")} ({parseDate(startDate)?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} —{" "}
                  {parseDate(endDate)?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})
                </p>
                {excludeHolidays && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("workDays.country_note", { country: t(`countries.${country}`) })}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground tabular-nums">{result.totalDays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("workDays.total_days")}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground tabular-nums">{result.weekendDays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("workDays.weekend_days")}</p>
                </div>
                <div className="p-4 text-center">
                  <p className={`text-2xl font-bold tabular-nums ${result.holidayDays > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                    {result.holidayDays.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t("workDays.holidays_excluded")}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-4">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full flex rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all" style={{ width: `${(result.workingDays / result.totalDays) * 100}%` }} />
                  <div className="bg-amber-400/70 dark:bg-amber-600/70 h-full transition-all" style={{ width: `${(result.holidayDays / result.totalDays) * 100}%` }} />
                  <div className="bg-muted-foreground/20 h-full flex-1" />
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                {[
                  { color: "bg-primary", label: t("workDays.legend_working") },
                  { color: "bg-amber-400/70", label: t("workDays.legend_holidays") },
                  { color: "bg-muted-foreground/20", label: t("workDays.legend_weekends") },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded ${color}`} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {excludeHolidays && holidaysList.length > 0 && (
              <div className="bg-card border border-card-border rounded-xl p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info size={14} className="text-primary" />
                  {t("workDays.holidays_title")}
                </h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {holidaysList.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{h.name}</span>
                      <span className="text-foreground font-medium">{h.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={faqItems} />
    </PageLayout>
  );
}
