import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeftRight, Clock } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { TimezoneSelect } from "@/components/TimezoneSelect";
import { parseInTimezone, getUserTimezone, getUtcOffset, findTimezone } from "@/lib/timezones";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCurrentTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const FAQ = [
  {
    q: "What is the best free time zone converter?",
    a: "TimeZone.tools offers a free, fast, and accurate time zone converter supporting 80+ cities worldwide. It uses the browser's built-in Intl API for precise DST-aware conversions with no signup required.",
  },
  {
    q: "How do I convert EST to PST?",
    a: "Select New York (EST/EDT) as the source timezone, enter your date and time, then add Los Angeles (PST/PDT) as a target timezone. The converted time will appear instantly.",
  },
  {
    q: "What time is 3pm UTC in New York?",
    a: "3pm UTC is 11am EST (Eastern Standard Time) or 10am EDT during daylight saving time in New York. Use our converter with UTC as the source and New York as the target for accurate results.",
  },
  {
    q: "Does the converter account for Daylight Saving Time?",
    a: "Yes. The converter uses your browser's built-in timezone database (IANA/Intl API), which fully accounts for DST transitions for all regions that observe it.",
  },
  {
    q: "Can I convert time for multiple timezones at once?",
    a: "Yes. Add as many target timezones as you need using the 'Add Timezone' button. Each result updates in real time as you change the source date or time.",
  },
  {
    q: "How do I find the UTC offset for a specific city?",
    a: "The UTC offset for each timezone is shown directly next to the city name in our converter. Offsets vary by season in regions that observe Daylight Saving Time.",
  },
];

export default function TimeZoneConverter() {
  useSeo({
    title: "Time Zone Converter — Convert Times Worldwide | TimeZone.tools",
    description:
      "Free time zone converter. Convert times between 80+ cities and countries instantly. Auto-detects your timezone. Accounts for Daylight Saving Time.",
    canonical: "https://timezone.tools/time-zone-converter",
  });

  const [date, setDate] = useState(getTodayString);
  const [time, setTime] = useState(getCurrentTimeString);
  const [source, setSource] = useState(() => getUserTimezone());
  const [targets, setTargets] = useState<string[]>(["Europe/London", "Asia/Tokyo", "Australia/Sydney"]);

  const utcMoment = parseInTimezone(date, time, source);

  const addTarget = () => {
    setTargets((prev) => [...prev, "America/Chicago"]);
  };

  const removeTarget = (i: number) => {
    setTargets((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateTarget = (i: number, val: string) => {
    setTargets((prev) => prev.map((t, idx) => (idx === i ? val : t)));
  };

  const swap = (targetTz: string) => {
    setSource(targetTz);
  };

  const formatResult = (tz: string) => {
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(utcMoment);

    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(utcMoment);

    const offset = getUtcOffset(tz, utcMoment);
    return { timeStr, dateStr, offset };
  };

  const sourceInfo = findTimezone(source);
  const sourceResult = formatResult(source);

  return (
    <PageLayout
      title="Time Zone Converter"
      description="Convert times between any cities and countries. Supports 80+ timezones worldwide."
    >
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock size={15} className="text-primary" />
            Source Time
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-source-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-testid="input-source-time"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Timezone</label>
              <TimezoneSelect
                value={source}
                onChange={setSource}
                placeholder="Source timezone"
                data-testid="select-source-timezone"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-muted-foreground mb-0.5">
              {sourceInfo?.city ?? source} ({sourceInfo?.country})
            </p>
            <p className="text-2xl font-mono font-bold text-primary tabular-nums">
              {sourceResult.timeStr}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{sourceResult.dateStr}</p>
            <p className="text-xs font-mono text-muted-foreground/70 mt-0.5">{sourceResult.offset}</p>
          </div>
        </div>

        <div className="space-y-3">
          {targets.map((tz, i) => {
            const info = findTimezone(tz);
            const result = formatResult(tz);
            return (
              <div
                key={i}
                className="bg-card border border-card-border rounded-xl p-4"
                data-testid={`target-timezone-${i}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <TimezoneSelect
                      value={tz}
                      onChange={(v) => updateTarget(i, v)}
                      placeholder="Target timezone"
                      data-testid={`select-target-${i}`}
                    />
                  </div>
                  <button
                    onClick={() => swap(tz)}
                    title="Use as source"
                    data-testid={`button-swap-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors flex-shrink-0"
                  >
                    <ArrowLeftRight size={15} />
                  </button>
                  <button
                    onClick={() => removeTarget(i)}
                    title="Remove"
                    data-testid={`button-remove-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-bold text-foreground tabular-nums">
                    {result.timeStr}
                  </span>
                  <span className="text-sm text-muted-foreground">{result.dateStr}</span>
                  <span className="text-xs font-mono text-muted-foreground/70 ml-auto">
                    {result.offset}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={addTarget}
          data-testid="button-add-timezone"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <Plus size={16} />
          Add Timezone
        </button>
      </div>

      <AdSlot slot="bottom" className="mt-6" />

      <FaqSection items={FAQ} />
    </PageLayout>
  );
}
