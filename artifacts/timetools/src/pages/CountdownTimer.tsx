import { useState, useEffect, useCallback } from "react";
import { Timer, Share2, Check } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

function pad(n: number) { return String(Math.max(0, n)).padStart(2, "0"); }

function getPresets() {
  const now = new Date();
  const year = now.getFullYear();
  const nextYear = now.getMonth() === 11 && now.getDate() > 25 ? year + 1 : year;
  const thisOrNext = (month: number, day: number) => {
    const d = new Date(year, month - 1, day);
    return d < now ? new Date(year + 1, month - 1, day) : d;
  };
  return [
    { key: "preset_new_year", date: new Date(nextYear + 1, 0, 1) },
    { key: "preset_christmas", date: thisOrNext(12, 25) },
    { key: "preset_valentine", date: thisOrNext(2, 14) },
    { key: "preset_halloween", date: thisOrNext(10, 31) },
  ].map((p) => ({
    ...p,
    dateStr: `${p.date.getFullYear()}-${String(p.date.getMonth() + 1).padStart(2, "0")}-${String(p.date.getDate()).padStart(2, "0")}`,
  }));
}

function parseFromUrl(): { date: string; time: string; name: string } | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("d");
    const t = params.get("t");
    const n = params.get("n");
    if (d) return { date: d, time: t ?? "00:00", name: n ?? "" };
  } catch {}
  return null;
}

function getYearProgress() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1).getTime();
  const end = new Date(now.getFullYear() + 1, 0, 1).getTime();
  return ((now.getTime() - start) / (end - start)) * 100;
}

export default function CountdownTimer() {
  const { t } = useTranslation();
  const { lang } = useLang();

  useSeo({
    title: `${t("countdown.page_title")} | TimeZone.tools`,
    description: t("countdown.page_description"),
    canonical: `https://timezone.tools/${lang}/countdown-timer`,
    breadcrumbs: [
      { name: "TimeZone.tools", url: `https://timezone.tools/${lang}/` },
      { name: t("countdown.page_title"), url: `https://timezone.tools/${lang}/countdown-timer` },
    ],
  });

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`countdown.faq_q${i + 1}`),
    a: t(`countdown.faq_a${i + 1}`),
  }));

  const fromUrl = parseFromUrl();
  const [date, setDate] = useState(() => {
    if (fromUrl?.date) return fromUrl.date;
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [time, setTime] = useState(fromUrl?.time ?? "00:00");
  const [eventName, setEventName] = useState(fromUrl?.name ?? "My Event");
  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(`${date}T${time}:00`);
  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs <= 0;
  const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const yearProgress = getYearProgress();
  const presets = getPresets();

  const share = useCallback(() => {
    const params = new URLSearchParams({ d: date, t: time, n: eventName });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [date, time, eventName]);

  return (
    <PageLayout title={t("countdown.page_title")} description={t("countdown.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Timer size={15} className="text-primary" />
            {t("countdown.set_countdown")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("countdown.event_name")}</label>
              <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}
                placeholder={t("countdown.event_name")} data-testid="input-event-name"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("countdown.target_date")}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="input-target-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("countdown.target_time")}</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} data-testid="input-target-time"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button key={p.key} onClick={() => { setDate(p.dateStr); setTime("00:00"); setEventName(t(`countdown.${p.key}`)); }}
                data-testid={`button-preset-${p.key}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                {t(`countdown.${p.key}`)}
              </button>
            ))}
          </div>
        </div>

        <AdSlot slot="mid" className="my-2" />

        {isPast ? (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
            <p className="text-4xl font-bold text-primary mb-2">{t("countdown.times_up")}</p>
            <p className="text-muted-foreground">{eventName} {diffMs < 0 ? t("countdown.has_passed") : t("countdown.is_now")}</p>
          </div>
        ) : (
          <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">{eventName}</p>
            <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
              {[
                { value: days, label: t("countdown.days") },
                { value: hours, label: t("countdown.hours") },
                { value: minutes, label: t("countdown.minutes") },
                { value: seconds, label: t("countdown.seconds") },
              ].map(({ value, label }) => (
                <div key={label} data-testid={`countdown-${label.toLowerCase()}`}
                  className="bg-primary/10 border border-primary/20 rounded-xl py-4 sm:py-6">
                  <p className="text-3xl sm:text-5xl font-mono font-bold text-primary tabular-nums leading-none">{pad(value)}</p>
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              {target.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              {" "}{t("countdown.at")}{" "}
              {target.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        )}

        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {new Date().getFullYear()} {t("countdown.year_progress_title")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{yearProgress.toFixed(1)}% {t("countdown.year_elapsed")}</p>
            </div>
            <button onClick={share} data-testid="button-share"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? t("countdown.copied") : t("countdown.share")}
            </button>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${yearProgress}%` }} data-testid="year-progress-bar" />
          </div>
        </div>
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={faqItems} />
    </PageLayout>
  );
}
