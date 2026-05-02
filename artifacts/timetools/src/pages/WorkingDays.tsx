import { useState, useMemo } from "react";
import { Briefcase, Info } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { countWorkingDays, getHolidaysForYear, isWeekend } from "@/lib/holidays";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDate(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function getDayBreakdown(start: Date, end: Date, excludeHolidays: boolean) {
  let totalDays = 0, weekendDays = 0, holidayDays = 0, workingDays = 0;
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endD = new Date(end);
  endD.setHours(0, 0, 0, 0);
  const holidays = [...getHolidaysForYear(start.getFullYear()), ...getHolidaysForYear(end.getFullYear())];
  while (cur <= endD) {
    totalDays++;
    const isWknd = isWeekend(cur);
    const isHol = excludeHolidays && holidays.some(
      (h) => h.date.getFullYear() === cur.getFullYear() && h.date.getMonth() === cur.getMonth() && h.date.getDate() === cur.getDate()
    );
    if (isWknd) weekendDays++;
    else if (isHol) holidayDays++;
    else workingDays++;
    cur.setDate(cur.getDate() + 1);
  }
  return { totalDays, weekendDays, holidayDays, workingDays };
}

export default function WorkingDays() {
  const { t } = useTranslation();
  const { lang } = useLang();

  useSeo({
    title: `${t("workDays.page_title")} | TimeZone.tools`,
    description: t("workDays.page_description"),
    canonical: `https://timezone.tools/${lang}/working-days`,
  });

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`workDays.faq_q${i + 1}`),
    a: t(`workDays.faq_a${i + 1}`),
  }));

  const today = getTodayString();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [excludeHolidays, setExcludeHolidays] = useState(false);

  const result = useMemo(() => {
    const s = parseDate(startDate);
    const e = parseDate(endDate);
    if (!s || !e) return null;
    const start = s <= e ? s : e;
    const end = s <= e ? e : s;
    return getDayBreakdown(start, end, excludeHolidays);
  }, [startDate, endDate, excludeHolidays]);

  const holidaysList = useMemo(() => {
    const s = parseDate(startDate);
    const e = parseDate(endDate);
    if (!s || !e) return [];
    const start = s <= e ? s : e;
    const end = s <= e ? e : s;
    const years = new Set<number>();
    const cur = new Date(start);
    while (cur <= end) { years.add(cur.getFullYear()); cur.setFullYear(cur.getFullYear() + 1); }
    const allHolidays = Array.from(years).flatMap((y) => getHolidaysForYear(y));
    return allHolidays.filter((h) => h.date >= start && h.date <= end && !isWeekend(h.date))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [startDate, endDate]);

  return (
    <PageLayout title={t("workDays.page_title")} description={t("workDays.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase size={15} className="text-primary" />
            {t("workDays.date_range")}
          </h2>
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
          <label className="flex items-center gap-2 mt-4 cursor-pointer group">
            <input type="checkbox" checked={excludeHolidays} onChange={(e) => setExcludeHolidays(e.target.checked)}
              data-testid="checkbox-exclude-holidays" className="w-4 h-4 rounded border-input accent-primary" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{t("workDays.exclude_holidays")}</span>
          </label>
        </div>

        {result && (
          <>
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
