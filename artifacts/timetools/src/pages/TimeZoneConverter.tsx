import { useState, useCallback } from "react";
import { Plus, Trash2, ArrowLeftRight, Clock, Share2, Check } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { TimezoneSelect } from "@/components/TimezoneSelect";
import { parseInTimezone, getUserTimezone, getUtcOffset, findTimezone } from "@/lib/timezones";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCurrentTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function parseShareParams(): { src: string; targets: string[]; date: string; time: string } | null {
  try {
    const p = new URLSearchParams(window.location.search);
    const src = p.get("src");
    const targets = p.get("targets")?.split(",").filter(Boolean);
    if (!src || !targets?.length) return null;
    return { src, targets, date: p.get("date") ?? getTodayString(), time: p.get("time") ?? getCurrentTimeString() };
  } catch {
    return null;
  }
}

export default function TimeZoneConverter() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const shared = parseShareParams();

  useSeo({
    title: `${t("tz.page_title")} | TimeZone.tools`,
    description: t("tz.page_description"),
    canonical: `https://timezone.tools/${lang}/time-zone-converter`,
    breadcrumbs: [
      { name: "TimeZone.tools", url: `https://timezone.tools/${lang}/` },
      { name: t("tz.page_title"), url: `https://timezone.tools/${lang}/time-zone-converter` },
    ],
  });

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    q: t(`tz.faq_q${i + 1}`),
    a: t(`tz.faq_a${i + 1}`),
  }));

  const [date, setDate] = useState(shared?.date ?? getTodayString);
  const [time, setTime] = useState(shared?.time ?? getCurrentTimeString);
  const [source, setSource] = useState(() => shared?.src ?? getUserTimezone());
  const [targets, setTargets] = useState<string[]>(shared?.targets ?? ["Europe/London", "Asia/Tokyo", "Australia/Sydney"]);
  const [copied, setCopied] = useState(false);

  const utcMoment = parseInTimezone(date, time, source);

  const addTarget = () => setTargets((prev) => [...prev, "America/Chicago"]);
  const removeTarget = (i: number) => setTargets((prev) => prev.filter((_, idx) => idx !== i));
  const updateTarget = (i: number, val: string) => setTargets((prev) => prev.map((t, idx) => (idx === i ? val : t)));
  const swap = (targetTz: string) => setSource(targetTz);

  const formatResult = (tz: string) => {
    const timeStr = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(utcMoment);
    const dateStr = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(utcMoment);
    const offset = getUtcOffset(tz, utcMoment);
    return { timeStr, dateStr, offset };
  };

  const share = useCallback(() => {
    const params = new URLSearchParams({ src: source, targets: targets.join(","), date, time });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [source, targets, date, time]);

  const sourceInfo = findTimezone(source);
  const sourceResult = formatResult(source);

  return (
    <PageLayout title={t("tz.page_title")} description={t("tz.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock size={15} className="text-primary" />
            {t("tz.source_time")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("tz.date")}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="input-source-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("tz.time")}</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} data-testid="input-source-time"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("tz.timezone")}</label>
              <TimezoneSelect value={source} onChange={setSource} placeholder={t("tz.placeholder_source")} data-testid="select-source-timezone" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-muted-foreground mb-0.5">{sourceInfo?.city ?? source} ({sourceInfo?.country})</p>
            <p className="text-2xl font-mono font-bold text-primary tabular-nums">{sourceResult.timeStr}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{sourceResult.dateStr}</p>
            <p className="text-xs font-mono text-muted-foreground/70 mt-0.5">{sourceResult.offset}</p>
          </div>
        </div>

        <AdSlot slot="mid" className="my-2" />

        <div className="space-y-3">
          {targets.map((tz, i) => {
            const info = findTimezone(tz);
            const result = formatResult(tz);
            return (
              <div key={i} className="bg-card border border-card-border rounded-xl p-4" data-testid={`target-timezone-${i}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <TimezoneSelect value={tz} onChange={(v) => updateTarget(i, v)} placeholder={t("tz.placeholder_target")} data-testid={`select-target-${i}`} />
                  </div>
                  <button onClick={() => swap(tz)} title={t("tz.use_as_source")} data-testid={`button-swap-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors flex-shrink-0">
                    <ArrowLeftRight size={15} />
                  </button>
                  <button onClick={() => removeTarget(i)} title={t("tz.remove")} data-testid={`button-remove-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex-shrink-0">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-bold text-foreground tabular-nums">{result.timeStr}</span>
                  <span className="text-sm text-muted-foreground">{result.dateStr}</span>
                  <span className="text-xs font-mono text-muted-foreground/70 ms-auto">{result.offset}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={addTarget} data-testid="button-add-timezone"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Plus size={16} />
            {t("tz.add_timezone")}
          </button>
          <button onClick={share} data-testid="button-share"
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            {copied ? <Check size={15} /> : <Share2 size={15} />}
            {copied ? t("common.copied") : t("common.share")}
          </button>
        </div>
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={faqItems} />
    </PageLayout>
  );
}
