import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { TimezoneSelect } from "@/components/TimezoneSelect";
import { getUserTimezone, getUtcOffset } from "@/lib/timezones";
import { useTranslation } from "react-i18next";
import { useLang } from "@/contexts/LangContext";

interface Participant { name: string; timezone: string; }

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function hourLabel(h: number) {
  if (h === 0) return "12am";
  if (h < 12) return `${h}am`;
  if (h === 12) return "12pm";
  return `${h - 12}pm`;
}

function getLocalHour(utcHour: number, timezone: string): number {
  const date = new Date();
  date.setUTCHours(utcHour, 0, 0, 0);
  const localHour = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", hour12: false }).format(date), 10);
  return localHour % 24;
}

function isBusinessHour(h: number) { return h >= 9 && h < 18; }
function isEarlyOrLate(h: number) { return (h >= 7 && h < 9) || (h >= 18 && h < 22); }

export default function MeetingPlanner() {
  const { t } = useTranslation();
  const { lang } = useLang();

  useSeo({
    title: `${t("meet.page_title")} | TimeZone.tools`,
    description: t("meet.page_description"),
    canonical: `https://timezone.tools/${lang}/meeting-planner`,
  });

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`meet.faq_q${i + 1}`),
    a: t(`meet.faq_a${i + 1}`),
  }));

  const [participants, setParticipants] = useState<Participant[]>([
    { name: "You", timezone: getUserTimezone() },
    { name: "Colleague", timezone: "Europe/London" },
  ]);

  const addParticipant = () => {
    if (participants.length >= 6) return;
    setParticipants((p) => [...p, { name: `Person ${p.length + 1}`, timezone: "America/New_York" }]);
  };
  const removeParticipant = (i: number) => setParticipants((p) => p.filter((_, idx) => idx !== i));
  const updateParticipant = (i: number, updates: Partial<Participant>) =>
    setParticipants((p) => p.map((pt, idx) => (idx === i ? { ...pt, ...updates } : pt)));

  const bestSlots = HOURS.filter((h) => participants.every((p) => isBusinessHour(getLocalHour(h, p.timezone))));

  return (
    <PageLayout title={t("meet.page_title")} description={t("meet.page_description")}>
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users size={15} className="text-primary" />
            {t("meet.participants")}
          </h2>
          <div className="space-y-3">
            {participants.map((p, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`participant-${i}`}>
                <input type="text" value={p.name} onChange={(e) => updateParticipant(i, { name: e.target.value })}
                  placeholder={t("meet.name_placeholder")} data-testid={`input-participant-name-${i}`}
                  className="w-32 sm:w-40 px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30 flex-shrink-0" />
                <div className="flex-1">
                  <TimezoneSelect value={p.timezone} onChange={(v) => updateParticipant(i, { timezone: v })} data-testid={`select-participant-tz-${i}`} />
                </div>
                {participants.length > 1 && (
                  <button onClick={() => removeParticipant(i)} data-testid={`button-remove-participant-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex-shrink-0">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {participants.length < 6 && (
            <button onClick={addParticipant} data-testid="button-add-participant"
              className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              <Plus size={15} />
              {t("meet.add_participant")}
            </button>
          )}
        </div>

        {bestSlots.length > 0 ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">{t("meet.best_slots_title")}</p>
            <div className="flex flex-wrap gap-2">
              {bestSlots.map((h) => (
                <span key={h} className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-mono rounded-md border border-green-200 dark:border-green-700">
                  {hourLabel(h)} UTC
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{t("meet.no_overlap_title")}</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">{t("meet.no_overlap_desc")}</p>
          </div>
        )}

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">{t("meet.grid_title")}</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { color: "bg-green-400 dark:bg-green-600", label: t("meet.legend_business") },
                { color: "bg-amber-300 dark:bg-amber-700", label: t("meet.legend_early_late") },
                { color: "bg-muted", label: t("meet.legend_off") },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-start text-muted-foreground font-medium w-32 sticky start-0 bg-card z-10">{t("meet.participants")}</th>
                  {HOURS.map((h) => (
                    <th key={h} className="px-1 py-2 text-center text-muted-foreground font-normal min-w-[32px]">
                      {h % 3 === 0 ? hourLabel(h) : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((p, pi) => (
                  <tr key={pi} className="border-b border-border/50">
                    <td className="px-3 py-1.5 font-medium text-foreground sticky start-0 bg-card z-10">
                      <div className="truncate max-w-[120px]" title={p.name}>{p.name}</div>
                      <div className="text-muted-foreground text-[10px] font-normal">{getUtcOffset(p.timezone)}</div>
                    </td>
                    {HOURS.map((h) => {
                      const localH = getLocalHour(h, p.timezone);
                      const business = isBusinessHour(localH);
                      const offPeak = !business && isEarlyOrLate(localH);
                      return (
                        <td key={h} title={`${p.name}: ${String(localH).padStart(2, "0")}:00 local`}
                          className={`text-center py-1.5 transition-colors ${business ? "bg-green-100 dark:bg-green-900/40" : offPeak ? "bg-amber-100 dark:bg-amber-900/30" : "bg-muted/30"}`}>
                          <span className={`text-[10px] tabular-nums ${business ? "text-green-700 dark:text-green-400" : offPeak ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground/50"}`}>
                            {String(localH).padStart(2, "0")}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="bg-muted/20">
                  <td className="px-3 py-1.5 font-medium text-muted-foreground text-xs sticky start-0 bg-muted/20 z-10">{t("meet.overlap")}</td>
                  {HOURS.map((h) => {
                    const allBusiness = participants.every((p) => isBusinessHour(getLocalHour(h, p.timezone)));
                    const someBusiness = participants.some((p) => isBusinessHour(getLocalHour(h, p.timezone)));
                    return (
                      <td key={h} className={`text-center py-1.5 ${allBusiness ? "bg-green-200 dark:bg-green-800/50" : someBusiness ? "bg-amber-100 dark:bg-amber-900/30" : ""}`}>
                        {allBusiness && <span className="text-green-700 dark:text-green-400 text-[10px]">+</span>}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdSlot slot="bottom" className="mt-6" />
      <FaqSection items={faqItems} />
    </PageLayout>
  );
}
