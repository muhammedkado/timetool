import { useState, useEffect, useCallback } from "react";
import { Timer, Share2, Check } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";

const FAQ = [
  {
    q: "How do I create a countdown timer online?",
    a: "Enter your target date and time, give it an event name, and the timer starts counting down immediately. You can share it with others using the Share button.",
  },
  {
    q: "How do I share a countdown timer?",
    a: "Click the Share button to copy a link. The target date is encoded in the URL, so anyone who opens it will see the same countdown.",
  },
  {
    q: "How many days until New Year?",
    a: "Use the 'New Year' preset button to instantly start a countdown to January 1st of next year.",
  },
  {
    q: "Can I count down to a specific time of day?",
    a: "Yes. Enter both the target date and time. The countdown shows days, hours, minutes, and seconds remaining.",
  },
  {
    q: "What happens when the countdown reaches zero?",
    a: "When the countdown reaches zero, the timer displays a completion message instead of counting negative.",
  },
];

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getPresets() {
  const now = new Date();
  const year = now.getFullYear();
  const nextYear = now.getMonth() === 11 && now.getDate() > 25 ? year + 1 : year;
  const thisOrNextYear = (month: number, day: number) => {
    const d = new Date(year, month - 1, day);
    return d < now ? new Date(year + 1, month - 1, day) : d;
  };

  return [
    {
      label: "New Year",
      date: new Date(nextYear + 1, 0, 1),
    },
    { label: "Christmas", date: thisOrNextYear(12, 25) },
    { label: "Valentine's Day", date: thisOrNextYear(2, 14) },
    { label: "Halloween", date: thisOrNextYear(10, 31) },
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
  useSeo({
    title: "Countdown Timer Online — Count Down to Any Event | TimeZone.tools",
    description:
      "Free online countdown timer. Count down to any date and time. Share your countdown with a unique link. Preset events: New Year, Christmas, and more.",
    canonical: "https://timezone.tools/countdown-timer",
  });

  const fromUrl = parseFromUrl();
  const [date, setDate] = useState(() => fromUrl?.date ?? (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })());
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

  const setPreset = (preset: { dateStr: string }) => {
    setDate(preset.dateStr);
    setTime("00:00");
  };

  const share = useCallback(() => {
    const params = new URLSearchParams({ d: date, t: time, n: eventName });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [date, time, eventName]);

  const presets = getPresets();

  return (
    <PageLayout
      title="Countdown Timer"
      description="Count down to any date and time. Share your countdown with a unique link."
    >
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Timer size={15} className="text-primary" />
            Set Your Countdown
          </h2>

          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="My Event"
                data-testid="input-event-name"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-target-date"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Target Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-testid="input-target-time"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => { setPreset(p); setEventName(p.label); }}
                data-testid={`button-preset-${p.label.toLowerCase().replace(/\s/g, "-")}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {isPast ? (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
            <p className="text-4xl font-bold text-primary mb-2">Time's up!</p>
            <p className="text-muted-foreground">
              {eventName} {diffMs < 0 ? "has passed" : "is now"}
            </p>
          </div>
        ) : (
          <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
              {eventName}
            </p>
            <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hours" },
                { value: minutes, label: "Minutes" },
                { value: seconds, label: "Seconds" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  data-testid={`countdown-${label.toLowerCase()}`}
                  className="bg-primary/10 border border-primary/20 rounded-xl py-4 sm:py-6"
                >
                  <p className="text-3xl sm:text-5xl font-mono font-bold text-primary tabular-nums leading-none">
                    {pad(value)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              {target.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at{" "}
              {target.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        )}

        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {new Date().getFullYear()} Year Progress
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {yearProgress.toFixed(1)}% of the year elapsed
              </p>
            </div>
            <button
              onClick={share}
              data-testid="button-share"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${yearProgress}%` }}
              data-testid="year-progress-bar"
            />
          </div>
        </div>
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={FAQ} />
    </PageLayout>
  );
}
