import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { PageLayout, FaqSection } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { TimezoneSelect } from "@/components/TimezoneSelect";
import { getUserTimezone, getUtcOffset, findTimezone } from "@/lib/timezones";

interface Participant {
  name: string;
  timezone: string;
}

const FAQ = [
  {
    q: "How do I find the best meeting time across time zones?",
    a: "Add each participant's timezone and name. The grid highlights hours where everyone is within business hours (9am–6pm local time). Green means full overlap, yellow means partial, and red means no one is available.",
  },
  {
    q: "What is the best overlap between New York and London?",
    a: "New York (EST) is UTC-5 and London (GMT) is UTC+0. Their best overlap window is typically 2pm–5pm London time, which is 9am–12pm New York time.",
  },
  {
    q: "What time zones overlap with US, Europe, and Asia?",
    a: "Finding a single slot that works for all three major regions is very difficult. The most common compromise is early morning US East Coast time (8am–10am EST), which is 1pm–3pm London and 9pm–11pm in Singapore/Tokyo.",
  },
  {
    q: "How many participants can I add to the meeting planner?",
    a: "You can add up to 6 participants from different time zones. The grid shows individual availability alongside combined overlap status.",
  },
  {
    q: "Does the meeting planner account for Daylight Saving Time?",
    a: "Yes. The planner uses the Intl API with the current date, so all offsets are accurate for the current time of year including DST.",
  },
];

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
  const localHour = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }).format(date),
    10
  );
  return localHour % 24;
}

function isBusinessHour(localHour: number) {
  return localHour >= 9 && localHour < 18;
}

function isEarlyOrLate(localHour: number) {
  return (localHour >= 7 && localHour < 9) || (localHour >= 18 && localHour < 22);
}

export default function MeetingPlanner() {
  useSeo({
    title: "Meeting Planner for Multiple Time Zones | TimeZone.tools",
    description:
      "Plan meetings across multiple time zones. Visual 24-hour grid highlights overlapping business hours. Find the best time for your global team.",
    canonical: "https://timezone.tools/meeting-planner",
  });

  const [participants, setParticipants] = useState<Participant[]>([
    { name: "You", timezone: getUserTimezone() },
    { name: "Colleague", timezone: "Europe/London" },
  ]);

  const addParticipant = () => {
    if (participants.length >= 6) return;
    setParticipants((p) => [...p, { name: `Person ${p.length + 1}`, timezone: "America/New_York" }]);
  };

  const removeParticipant = (i: number) => {
    setParticipants((p) => p.filter((_, idx) => idx !== i));
  };

  const updateParticipant = (i: number, updates: Partial<Participant>) => {
    setParticipants((p) => p.map((pt, idx) => (idx === i ? { ...pt, ...updates } : pt)));
  };

  const getBestSlots = () => {
    return HOURS.filter((h) => {
      return participants.every((p) => isBusinessHour(getLocalHour(h, p.timezone)));
    });
  };

  const bestSlots = getBestSlots();

  return (
    <PageLayout
      title="Meeting Planner"
      description="Find the best meeting time across multiple time zones. Visual grid shows overlapping business hours."
    >
      <AdSlot slot="top" className="mb-6" />

      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users size={15} className="text-primary" />
            Participants
          </h2>
          <div className="space-y-3">
            {participants.map((p, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`participant-${i}`}>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updateParticipant(i, { name: e.target.value })}
                  placeholder="Name"
                  data-testid={`input-participant-name-${i}`}
                  className="w-32 sm:w-40 px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30 flex-shrink-0"
                />
                <div className="flex-1">
                  <TimezoneSelect
                    value={p.timezone}
                    onChange={(v) => updateParticipant(i, { timezone: v })}
                    data-testid={`select-participant-tz-${i}`}
                  />
                </div>
                {participants.length > 1 && (
                  <button
                    onClick={() => removeParticipant(i)}
                    data-testid={`button-remove-participant-${i}`}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {participants.length < 6 && (
            <button
              onClick={addParticipant}
              data-testid="button-add-participant"
              className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <Plus size={15} />
              Add participant
            </button>
          )}
        </div>

        {bestSlots.length > 0 && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
              Best meeting slots (all in business hours)
            </p>
            <div className="flex flex-wrap gap-2">
              {bestSlots.map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-mono rounded-md border border-green-200 dark:border-green-700"
                >
                  {hourLabel(h)} UTC
                </span>
              ))}
            </div>
          </div>
        )}

        {bestSlots.length === 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              No perfect overlap found
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              Consider using early morning or late afternoon slots shown in yellow below.
            </p>
          </div>
        )}

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">24-Hour Availability Grid</h2>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-400 dark:bg-green-600" />
                <span className="text-xs text-muted-foreground">Business hours (9am–6pm)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-300 dark:bg-amber-700" />
                <span className="text-xs text-muted-foreground">Early/late (7am–9am, 6pm–10pm)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-muted" />
                <span className="text-xs text-muted-foreground">Off hours</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium w-32 sticky left-0 bg-card z-10">
                    Participant
                  </th>
                  {HOURS.map((h) => (
                    <th
                      key={h}
                      className="px-1 py-2 text-center text-muted-foreground font-normal min-w-[32px]"
                    >
                      {h % 3 === 0 ? hourLabel(h) : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((p, pi) => (
                  <tr key={pi} className="border-b border-border/50">
                    <td className="px-3 py-1.5 font-medium text-foreground sticky left-0 bg-card z-10">
                      <div className="truncate max-w-[120px]" title={p.name}>
                        {p.name}
                      </div>
                      <div className="text-muted-foreground text-[10px] font-normal">
                        {getUtcOffset(p.timezone)}
                      </div>
                    </td>
                    {HOURS.map((h) => {
                      const localH = getLocalHour(h, p.timezone);
                      const business = isBusinessHour(localH);
                      const offPeak = !business && isEarlyOrLate(localH);
                      return (
                        <td
                          key={h}
                          title={`${p.name}: ${String(localH).padStart(2, "0")}:00 local`}
                          className={`text-center py-1.5 transition-colors ${
                            business
                              ? "bg-green-100 dark:bg-green-900/40"
                              : offPeak
                              ? "bg-amber-100 dark:bg-amber-900/30"
                              : "bg-muted/30"
                          }`}
                        >
                          <span
                            className={`text-[10px] tabular-nums ${
                              business
                                ? "text-green-700 dark:text-green-400"
                                : offPeak
                                ? "text-amber-700 dark:text-amber-400"
                                : "text-muted-foreground/50"
                            }`}
                          >
                            {String(localH).padStart(2, "0")}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="bg-muted/20">
                  <td className="px-3 py-1.5 font-medium text-muted-foreground text-xs sticky left-0 bg-muted/20 z-10">
                    Overlap
                  </td>
                  {HOURS.map((h) => {
                    const allBusiness = participants.every((p) =>
                      isBusinessHour(getLocalHour(h, p.timezone))
                    );
                    const someBusiness = participants.some((p) =>
                      isBusinessHour(getLocalHour(h, p.timezone))
                    );
                    return (
                      <td
                        key={h}
                        className={`text-center py-1.5 ${
                          allBusiness
                            ? "bg-green-200 dark:bg-green-800/50"
                            : someBusiness
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : ""
                        }`}
                      >
                        {allBusiness && (
                          <span className="text-green-700 dark:text-green-400 text-[10px]">+</span>
                        )}
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
      <FaqSection items={FAQ} />
    </PageLayout>
  );
}
