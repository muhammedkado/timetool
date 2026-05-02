export interface TimezoneOption {
  value: string;
  label: string;
  city: string;
  country: string;
  region: string;
}

export const TIMEZONES: TimezoneOption[] = [
  // UTC
  { value: "UTC", label: "UTC — Coordinated Universal Time", city: "UTC", country: "Universal", region: "UTC" },
  // Americas
  { value: "America/New_York", label: "New York — EST/EDT", city: "New York", country: "United States", region: "Americas" },
  { value: "America/Los_Angeles", label: "Los Angeles — PST/PDT", city: "Los Angeles", country: "United States", region: "Americas" },
  { value: "America/Chicago", label: "Chicago — CST/CDT", city: "Chicago", country: "United States", region: "Americas" },
  { value: "America/Denver", label: "Denver — MST/MDT", city: "Denver", country: "United States", region: "Americas" },
  { value: "America/Phoenix", label: "Phoenix — MST", city: "Phoenix", country: "United States", region: "Americas" },
  { value: "America/Anchorage", label: "Anchorage — AKST/AKDT", city: "Anchorage", country: "United States", region: "Americas" },
  { value: "Pacific/Honolulu", label: "Honolulu — HST", city: "Honolulu", country: "United States", region: "Americas" },
  { value: "America/Toronto", label: "Toronto — EST/EDT", city: "Toronto", country: "Canada", region: "Americas" },
  { value: "America/Vancouver", label: "Vancouver — PST/PDT", city: "Vancouver", country: "Canada", region: "Americas" },
  { value: "America/Halifax", label: "Halifax — AST/ADT", city: "Halifax", country: "Canada", region: "Americas" },
  { value: "America/Mexico_City", label: "Mexico City — CST/CDT", city: "Mexico City", country: "Mexico", region: "Americas" },
  { value: "America/Sao_Paulo", label: "Sao Paulo — BRT", city: "Sao Paulo", country: "Brazil", region: "Americas" },
  { value: "America/Buenos_Aires", label: "Buenos Aires — ART", city: "Buenos Aires", country: "Argentina", region: "Americas" },
  { value: "America/Bogota", label: "Bogota — COT", city: "Bogota", country: "Colombia", region: "Americas" },
  { value: "America/Lima", label: "Lima — PET", city: "Lima", country: "Peru", region: "Americas" },
  { value: "America/Santiago", label: "Santiago — CLT", city: "Santiago", country: "Chile", region: "Americas" },
  { value: "America/Caracas", label: "Caracas — VET", city: "Caracas", country: "Venezuela", region: "Americas" },
  // Europe
  { value: "Europe/London", label: "London — GMT/BST", city: "London", country: "United Kingdom", region: "Europe" },
  { value: "Europe/Paris", label: "Paris — CET/CEST", city: "Paris", country: "France", region: "Europe" },
  { value: "Europe/Berlin", label: "Berlin — CET/CEST", city: "Berlin", country: "Germany", region: "Europe" },
  { value: "Europe/Madrid", label: "Madrid — CET/CEST", city: "Madrid", country: "Spain", region: "Europe" },
  { value: "Europe/Rome", label: "Rome — CET/CEST", city: "Rome", country: "Italy", region: "Europe" },
  { value: "Europe/Amsterdam", label: "Amsterdam — CET/CEST", city: "Amsterdam", country: "Netherlands", region: "Europe" },
  { value: "Europe/Brussels", label: "Brussels — CET/CEST", city: "Brussels", country: "Belgium", region: "Europe" },
  { value: "Europe/Stockholm", label: "Stockholm — CET/CEST", city: "Stockholm", country: "Sweden", region: "Europe" },
  { value: "Europe/Oslo", label: "Oslo — CET/CEST", city: "Oslo", country: "Norway", region: "Europe" },
  { value: "Europe/Copenhagen", label: "Copenhagen — CET/CEST", city: "Copenhagen", country: "Denmark", region: "Europe" },
  { value: "Europe/Warsaw", label: "Warsaw — CET/CEST", city: "Warsaw", country: "Poland", region: "Europe" },
  { value: "Europe/Prague", label: "Prague — CET/CEST", city: "Prague", country: "Czech Republic", region: "Europe" },
  { value: "Europe/Vienna", label: "Vienna — CET/CEST", city: "Vienna", country: "Austria", region: "Europe" },
  { value: "Europe/Zurich", label: "Zurich — CET/CEST", city: "Zurich", country: "Switzerland", region: "Europe" },
  { value: "Europe/Helsinki", label: "Helsinki — EET/EEST", city: "Helsinki", country: "Finland", region: "Europe" },
  { value: "Europe/Athens", label: "Athens — EET/EEST", city: "Athens", country: "Greece", region: "Europe" },
  { value: "Europe/Istanbul", label: "Istanbul — TRT", city: "Istanbul", country: "Turkey", region: "Europe" },
  { value: "Europe/Moscow", label: "Moscow — MSK", city: "Moscow", country: "Russia", region: "Europe" },
  { value: "Europe/Kyiv", label: "Kyiv — EET/EEST", city: "Kyiv", country: "Ukraine", region: "Europe" },
  { value: "Europe/Lisbon", label: "Lisbon — WET/WEST", city: "Lisbon", country: "Portugal", region: "Europe" },
  { value: "Europe/Dublin", label: "Dublin — GMT/IST", city: "Dublin", country: "Ireland", region: "Europe" },
  { value: "Europe/Budapest", label: "Budapest — CET/CEST", city: "Budapest", country: "Hungary", region: "Europe" },
  { value: "Europe/Bucharest", label: "Bucharest — EET/EEST", city: "Bucharest", country: "Romania", region: "Europe" },
  // Asia
  { value: "Asia/Dubai", label: "Dubai — GST", city: "Dubai", country: "UAE", region: "Asia" },
  { value: "Asia/Riyadh", label: "Riyadh — AST", city: "Riyadh", country: "Saudi Arabia", region: "Asia" },
  { value: "Asia/Tehran", label: "Tehran — IRST", city: "Tehran", country: "Iran", region: "Asia" },
  { value: "Asia/Kolkata", label: "Mumbai / Delhi — IST", city: "Mumbai", country: "India", region: "Asia" },
  { value: "Asia/Karachi", label: "Karachi — PKT", city: "Karachi", country: "Pakistan", region: "Asia" },
  { value: "Asia/Dhaka", label: "Dhaka — BST", city: "Dhaka", country: "Bangladesh", region: "Asia" },
  { value: "Asia/Colombo", label: "Colombo — SLST", city: "Colombo", country: "Sri Lanka", region: "Asia" },
  { value: "Asia/Bangkok", label: "Bangkok — ICT", city: "Bangkok", country: "Thailand", region: "Asia" },
  { value: "Asia/Singapore", label: "Singapore — SGT", city: "Singapore", country: "Singapore", region: "Asia" },
  { value: "Asia/Hong_Kong", label: "Hong Kong — HKT", city: "Hong Kong", country: "Hong Kong", region: "Asia" },
  { value: "Asia/Shanghai", label: "Shanghai / Beijing — CST", city: "Shanghai", country: "China", region: "Asia" },
  { value: "Asia/Tokyo", label: "Tokyo — JST", city: "Tokyo", country: "Japan", region: "Asia" },
  { value: "Asia/Seoul", label: "Seoul — KST", city: "Seoul", country: "South Korea", region: "Asia" },
  { value: "Asia/Taipei", label: "Taipei — CST", city: "Taipei", country: "Taiwan", region: "Asia" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur — MYT", city: "Kuala Lumpur", country: "Malaysia", region: "Asia" },
  { value: "Asia/Jakarta", label: "Jakarta — WIB", city: "Jakarta", country: "Indonesia", region: "Asia" },
  { value: "Asia/Manila", label: "Manila — PHT", city: "Manila", country: "Philippines", region: "Asia" },
  { value: "Asia/Ho_Chi_Minh", label: "Ho Chi Minh — ICT", city: "Ho Chi Minh", country: "Vietnam", region: "Asia" },
  { value: "Asia/Kathmandu", label: "Kathmandu — NPT", city: "Kathmandu", country: "Nepal", region: "Asia" },
  { value: "Asia/Almaty", label: "Almaty — ALMT", city: "Almaty", country: "Kazakhstan", region: "Asia" },
  { value: "Asia/Tashkent", label: "Tashkent — UZT", city: "Tashkent", country: "Uzbekistan", region: "Asia" },
  { value: "Asia/Yekaterinburg", label: "Yekaterinburg — YEKT", city: "Yekaterinburg", country: "Russia", region: "Asia" },
  // Africa
  { value: "Africa/Cairo", label: "Cairo — EET", city: "Cairo", country: "Egypt", region: "Africa" },
  { value: "Africa/Lagos", label: "Lagos — WAT", city: "Lagos", country: "Nigeria", region: "Africa" },
  { value: "Africa/Johannesburg", label: "Johannesburg — SAST", city: "Johannesburg", country: "South Africa", region: "Africa" },
  { value: "Africa/Nairobi", label: "Nairobi — EAT", city: "Nairobi", country: "Kenya", region: "Africa" },
  { value: "Africa/Casablanca", label: "Casablanca — WET", city: "Casablanca", country: "Morocco", region: "Africa" },
  { value: "Africa/Accra", label: "Accra — GMT", city: "Accra", country: "Ghana", region: "Africa" },
  // Oceania
  { value: "Australia/Sydney", label: "Sydney — AEST/AEDT", city: "Sydney", country: "Australia", region: "Oceania" },
  { value: "Australia/Melbourne", label: "Melbourne — AEST/AEDT", city: "Melbourne", country: "Australia", region: "Oceania" },
  { value: "Australia/Perth", label: "Perth — AWST", city: "Perth", country: "Australia", region: "Oceania" },
  { value: "Australia/Brisbane", label: "Brisbane — AEST", city: "Brisbane", country: "Australia", region: "Oceania" },
  { value: "Australia/Adelaide", label: "Adelaide — ACST/ACDT", city: "Adelaide", country: "Australia", region: "Oceania" },
  { value: "Pacific/Auckland", label: "Auckland — NZST/NZDT", city: "Auckland", country: "New Zealand", region: "Oceania" },
  { value: "Pacific/Honolulu", label: "Honolulu — HST", city: "Honolulu", country: "United States", region: "Oceania" },
];

export function getUtcOffset(timezone: string, date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(date);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "UTC";
  } catch {
    return "UTC";
  }
}

export function parseInTimezone(dateStr: string, timeStr: string, tz: string): Date {
  const isoString = `${dateStr}T${timeStr}:00`;
  const utcGuess = new Date(isoString + "Z");

  const localInTz = new Intl.DateTimeFormat("sv-SE", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(utcGuess)
    .replace(" ", "T");

  const desiredMs = utcGuess.getTime();
  const actualMs = new Date(localInTz + "Z").getTime();
  const diffMs = desiredMs - actualMs;

  return new Date(utcGuess.getTime() + diffMs);
}

export function formatInTimezone(
  date: Date,
  timezone: string,
  options: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: timezone }).format(date);
}

export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "America/New_York";
  }
}

export function findTimezone(tzValue: string): TimezoneOption | undefined {
  return TIMEZONES.find((t) => t.value === tzValue);
}
