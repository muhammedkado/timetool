import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { countWorkingDays } from "@/lib/holidays";
import { differenceInCalendarDays, differenceInMonths, differenceInYears } from "date-fns";

const FAQ = [
  {
    q: "How do I calculate the number of days between two dates?",
    a: "Enter a start date and end date in the calculator above. The tool instantly shows the total number of days, weeks, months, and years between the two dates.",
  },
  {
    q: "What is the difference between calendar days and working days?",
    a: "Calendar days count every day of the week including weekends. Working days (also called business days) only count Monday through Friday, optionally excluding public holidays.",
  },
  {
    q: "How many days until a specific date?",
    a: "Set today as the start date and your target date as the end date. The result shows exactly how many days remain.",
  },
  {
    q: "How many weeks are between two dates?",
    a: "The date difference calculator shows full weeks as well as the remaining days. For example, 30 days = 4 weeks and 2 days.",
  },
  {
    q: "Can I calculate how old I am in days?",
    a: "Yes. Enter your birth date as the start date and today as the end date. The result shows your exact age in years, months, weeks, and days.",
  },
];

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
  useSeo({
    title: "Date Difference Calculator — Days Between Dates | TimeZone.tools",
    description:
      "Calculate the exact number of days, weeks, months, and years between any two dates. Includes working days count. Free and instant.",
    canonical: "https://timezone.tools/date-difference",
  });

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

    return {
      totalDays,
      weeks,
      remainingDays,
      months,
      years,
      workingDays,
      workingDaysNoHolidays,
      isSwapped,
      start,
      end,
    };
  }, [startDate, endDate, includeToday]);

  const StatCard = ({
    label,
    value,
    sub,
  }: {
    label: string;
    value: number | string;
    sub?: string;
  }) => (
    <div className="bg-card border border-card-border rounded-xl p-4 text-center">
      <p className="text-3xl font-bold text-primary tabular-nums">{value}</p>
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );

  return (
    <PageLayout
      title="Date Difference Calculator"
      description="Calculate the exact number of days, weeks, months, and years between any two dates."
    >
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar size={15} className="text-primary" />
            Select Dates
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                data-testid="input-start-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                data-testid="input-end-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={includeToday}
              onChange={(e) => setIncludeToday(e.target.checked)}
              data-testid="checkbox-include-today"
              className="w-4 h-4 rounded border-input accent-primary"
            />
            <span className="text-sm text-muted-foreground">Include end date in count</span>
          </label>
        </div>

        {result && (
          <>
            {result.isSwapped && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 rounded-lg">
                End date is before start date — showing absolute difference.
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Total Days" value={result.totalDays.toLocaleString()} />
              <StatCard
                label="Weeks"
                value={result.weeks.toLocaleString()}
                sub={`+ ${result.remainingDays} day${result.remainingDays !== 1 ? "s" : ""}`}
              />
              <StatCard label="Months" value={result.months.toLocaleString()} />
              <StatCard label="Years" value={result.years.toLocaleString()} />
            </div>

            <div className="bg-card border border-card-border rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">Working Days</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-0.5">Weekdays (Mon–Fri)</p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">
                    {result.workingDays.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Excludes{" "}
                    {(result.totalDays - result.workingDays).toLocaleString()} weekend days
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Weekdays (excl. holidays)
                  </p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">
                    {result.workingDaysNoHolidays.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Also excludes{" "}
                    {(result.workingDays - result.workingDaysNoHolidays).toLocaleString()} holidays
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                From{" "}
                <strong className="text-foreground">
                  {result.start.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>{" "}
                to{" "}
                <strong className="text-foreground">
                  {result.end.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </p>
            </div>
          </>
        )}
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={FAQ} />
    </PageLayout>
  );
}
