import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { countWorkingDays } from "@/lib/holidays";
import { differenceInCalendarDays, differenceInMonths, differenceInYears } from "date-fns";
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

export default function DateDifference() {
  const { t } = useTranslation();
  const { lang } = useLang();

  useSeo({
    title: `${t("dateDiff.page_title")} | TimeZone.tools`,
    description: t("dateDiff.page_description"),
    canonical: `https://timezone.tools/${lang}/date-difference`,
  });

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`dateDiff.faq_q${i + 1}`),
    a: t(`dateDiff.faq_a${i + 1}`),
  }));

  const today = getTodayString();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [includeToday, setIncludeToday] = useState(false);

  const result = useMemo(() => {
    const s = parseDate(startDate);
    const e = parseDate(endDate);
    if (!s || !e) return null;
    const start = s <= e ? s : e;
    const end = s <= e ? e : s;
    const isSwapped = s > e;
    const adjustedEnd = includeToday ? new Date(end.getTime() + 86400000) : end;
    const totalDays = differenceInCalendarDays(adjustedEnd, start);
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const months = differenceInMonths(adjustedEnd, start);
    const years = differenceInYears(adjustedEnd, start);
    const workingDays = countWorkingDays(start, includeToday ? adjustedEnd : end, false);
    const workingDaysNoHolidays = countWorkingDays(start, includeToday ? adjustedEnd : end, true);
    return { totalDays, weeks, remainingDays, months, years, workingDays, workingDaysNoHolidays, isSwapped, start, end };
  }, [startDate, endDate, includeToday]);

  const StatCard = ({ label, value, sub }: { label: string; value: number | string; sub?: string }) => (
    <div className="bg-card border border-card-border rounded-xl p-4 text-center">
      <p className="text-3xl font-bold text-primary tabular-nums">{value}</p>
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );

  return (
    <PageLayout title={t("dateDiff.page_title")} description={t("dateDiff.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar size={15} className="text-primary" />
            {t("dateDiff.select_dates")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("dateDiff.start_date")}</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} data-testid="input-start-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("dateDiff.end_date")}</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} data-testid="input-end-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input type="checkbox" checked={includeToday} onChange={(e) => setIncludeToday(e.target.checked)}
              data-testid="checkbox-include-today" className="w-4 h-4 rounded border-input accent-primary" />
            <span className="text-sm text-muted-foreground">{t("dateDiff.include_end")}</span>
          </label>
        </div>

        {result && (
          <>
            {result.isSwapped && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 rounded-lg">
                {t("dateDiff.swapped_warning")}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label={t("dateDiff.total_days")} value={result.totalDays.toLocaleString()} />
              <StatCard label={t("dateDiff.weeks")} value={result.weeks.toLocaleString()}
                sub={`+ ${result.remainingDays} day${result.remainingDays !== 1 ? "s" : ""}`} />
              <StatCard label={t("dateDiff.months")} value={result.months.toLocaleString()} />
              <StatCard label={t("dateDiff.years")} value={result.years.toLocaleString()} />
            </div>
            <div className="bg-card border border-card-border rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">{t("dateDiff.working_days_title")}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-0.5">{t("dateDiff.weekdays_monfri")}</p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">{result.workingDays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("dateDiff.excludes_weekends", { count: result.totalDays - result.workingDays })}
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-0.5">{t("dateDiff.weekdays_no_holidays")}</p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">{result.workingDaysNoHolidays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("dateDiff.also_excludes", { count: result.workingDays - result.workingDaysNoHolidays })}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                {t("dateDiff.from")}{" "}
                <strong className="text-foreground">{result.start.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
                {" "}{t("dateDiff.to")}{" "}
                <strong className="text-foreground">{result.end.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
              </p>
            </div>
          </>
        )}
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={faqItems} />
    </PageLayout>
  );
}
