export type HolidayCountry = "US" | "GB" | "TR" | "FR" | "ES" | "IN" | "CN" | "SA";

export interface Holiday {
  name: string;
  month: number;
  day: number;
}

interface FixedHoliday {
  name: string;
  month: number;
  day: number;
}

const FIXED_BY_COUNTRY: Record<HolidayCountry, FixedHoliday[]> = {
  US: [
    { name: "New Year's Day", month: 1, day: 1 },
    { name: "Independence Day", month: 7, day: 4 },
    { name: "Veterans Day", month: 11, day: 11 },
    { name: "Christmas Day", month: 12, day: 25 },
  ],
  GB: [
    { name: "New Year's Day", month: 1, day: 1 },
    { name: "Christmas Day", month: 12, day: 25 },
    { name: "Boxing Day", month: 12, day: 26 },
  ],
  TR: [
    { name: "Yeni Yıl", month: 1, day: 1 },
    { name: "Ulusal Egemenlik ve Çocuk Bayramı", month: 4, day: 23 },
    { name: "Emek ve Dayanışma Günü", month: 5, day: 1 },
    { name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", month: 5, day: 19 },
    { name: "Demokrasi ve Millî Birlik Günü", month: 7, day: 15 },
    { name: "Zafer Bayramı", month: 8, day: 30 },
    { name: "Cumhuriyet Bayramı", month: 10, day: 29 },
  ],
  FR: [
    { name: "Jour de l'An", month: 1, day: 1 },
    { name: "Fête du Travail", month: 5, day: 1 },
    { name: "Victoire 1945", month: 5, day: 8 },
    { name: "Fête Nationale", month: 7, day: 14 },
    { name: "Assomption", month: 8, day: 15 },
    { name: "Toussaint", month: 11, day: 1 },
    { name: "Armistice", month: 11, day: 11 },
    { name: "Noël", month: 12, day: 25 },
  ],
  ES: [
    { name: "Año Nuevo", month: 1, day: 1 },
    { name: "Reyes Magos", month: 1, day: 6 },
    { name: "Día del Trabajo", month: 5, day: 1 },
    { name: "Asunción", month: 8, day: 15 },
    { name: "Fiesta Nacional de España", month: 10, day: 12 },
    { name: "Todos los Santos", month: 11, day: 1 },
    { name: "Día de la Constitución", month: 12, day: 6 },
    { name: "Inmaculada Concepción", month: 12, day: 8 },
    { name: "Navidad", month: 12, day: 25 },
  ],
  IN: [
    { name: "Republic Day", month: 1, day: 26 },
    { name: "Independence Day", month: 8, day: 15 },
    { name: "Gandhi Jayanti", month: 10, day: 2 },
    { name: "Christmas Day", month: 12, day: 25 },
  ],
  CN: [
    { name: "元旦", month: 1, day: 1 },
    { name: "劳动节", month: 5, day: 1 },
    { name: "国庆节 (Day 1)", month: 10, day: 1 },
    { name: "国庆节 (Day 2)", month: 10, day: 2 },
    { name: "国庆节 (Day 3)", month: 10, day: 3 },
  ],
  SA: [
    { name: "يوم التأسيس", month: 2, day: 22 },
    { name: "اليوم الوطني", month: 9, day: 23 },
  ],
};

// Lookup table for lunar/Islamic/Chinese holidays (2024–2028)
// Dates in "MM-DD" format
const LUNAR_HOLIDAYS: Partial<Record<number, Partial<Record<HolidayCountry, Array<{ name: string; dates: string[] }>>>>> = {
  2024: {
    TR: [
      { name: "Ramazan Bayramı", dates: ["04-10", "04-11", "04-12"] },
      { name: "Kurban Bayramı", dates: ["06-16", "06-17", "06-18", "06-19"] },
    ],
    SA: [
      { name: "عيد الفطر", dates: ["04-10", "04-11", "04-12"] },
      { name: "عيد الأضحى", dates: ["06-16", "06-17", "06-18", "06-19"] },
    ],
    CN: [
      { name: "春节", dates: ["02-10", "02-11", "02-12", "02-13", "02-14", "02-15", "02-16", "02-17"] },
      { name: "清明节", dates: ["04-04"] },
      { name: "端午节", dates: ["06-10"] },
      { name: "中秋节", dates: ["09-17"] },
    ],
  },
  2025: {
    TR: [
      { name: "Ramazan Bayramı", dates: ["03-30", "03-31", "04-01"] },
      { name: "Kurban Bayramı", dates: ["06-06", "06-07", "06-08", "06-09"] },
    ],
    SA: [
      { name: "عيد الفطر", dates: ["03-30", "03-31", "04-01"] },
      { name: "عيد الأضحى", dates: ["06-06", "06-07", "06-08", "06-09"] },
    ],
    CN: [
      { name: "春节", dates: ["01-29", "01-30", "01-31", "02-01", "02-02", "02-03", "02-04"] },
      { name: "清明节", dates: ["04-04"] },
      { name: "端午节", dates: ["06-02"] },
      { name: "中秋节", dates: ["10-06"] },
    ],
  },
  2026: {
    TR: [
      { name: "Ramazan Bayramı", dates: ["03-20", "03-21", "03-22"] },
      { name: "Kurban Bayramı", dates: ["05-27", "05-28", "05-29", "05-30"] },
    ],
    SA: [
      { name: "عيد الفطر", dates: ["03-20", "03-21", "03-22"] },
      { name: "عيد الأضحى", dates: ["05-27", "05-28", "05-29", "05-30"] },
    ],
    CN: [
      { name: "春节", dates: ["02-17", "02-18", "02-19", "02-20", "02-21", "02-22", "02-23"] },
      { name: "清明节", dates: ["04-05"] },
      { name: "端午节", dates: ["06-20"] },
      { name: "中秋节", dates: ["09-25"] },
    ],
  },
  2027: {
    TR: [
      { name: "Ramazan Bayramı", dates: ["03-09", "03-10", "03-11"] },
      { name: "Kurban Bayramı", dates: ["05-16", "05-17", "05-18", "05-19"] },
    ],
    SA: [
      { name: "عيد الفطر", dates: ["03-09", "03-10", "03-11"] },
      { name: "عيد الأضحى", dates: ["05-16", "05-17", "05-18", "05-19"] },
    ],
    CN: [
      { name: "春节", dates: ["02-06", "02-07", "02-08", "02-09", "02-10", "02-11", "02-12"] },
      { name: "清明节", dates: ["04-05"] },
      { name: "端午节", dates: ["06-09"] },
      { name: "中秋节", dates: ["09-15"] },
    ],
  },
  2028: {
    TR: [
      { name: "Ramazan Bayramı", dates: ["02-26", "02-27", "02-28"] },
      { name: "Kurban Bayramı", dates: ["05-04", "05-05", "05-06", "05-07"] },
    ],
    SA: [
      { name: "عيد الفطر", dates: ["02-26", "02-27", "02-28"] },
      { name: "عيد الأضحى", dates: ["05-04", "05-05", "05-06", "05-07"] },
    ],
    CN: [
      { name: "春节", dates: ["01-26", "01-27", "01-28", "01-29", "01-30", "01-31", "02-01"] },
      { name: "清明节", dates: ["04-04"] },
      { name: "端午节", dates: ["05-28"] },
      { name: "中秋节", dates: ["10-02"] },
    ],
  },
};

function easterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addNthWeekday(year: number, month: number, weekday: number, nth: number): Date {
  const d = new Date(year, month - 1, 1);
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1);
  d.setDate(d.getDate() + (nth - 1) * 7);
  return d;
}

function lastWeekday(year: number, month: number, weekday: number): Date {
  const d = new Date(year, month, 0); // last day of month
  while (d.getDay() !== weekday) d.setDate(d.getDate() - 1);
  return d;
}

export function getHolidaysForYear(year: number, country: HolidayCountry = "US"): Array<{ date: Date; name: string }> {
  const fixed = FIXED_BY_COUNTRY[country];
  const holidays: Array<{ date: Date; name: string }> = fixed.map((h) => ({
    date: new Date(year, h.month - 1, h.day),
    name: h.name,
  }));

  if (country === "US") {
    // MLK Day: 3rd Monday of January
    holidays.push({ date: addNthWeekday(year, 1, 1, 3), name: "Martin Luther King Jr. Day" });
    // Presidents' Day: 3rd Monday of February
    holidays.push({ date: addNthWeekday(year, 2, 1, 3), name: "Presidents' Day" });
    // Memorial Day: last Monday of May
    holidays.push({ date: lastWeekday(year, 5, 1), name: "Memorial Day" });
    // Labor Day: first Monday of September
    holidays.push({ date: addNthWeekday(year, 9, 1, 1), name: "Labor Day" });
    // Thanksgiving: 4th Thursday of November
    holidays.push({ date: addNthWeekday(year, 11, 4, 4), name: "Thanksgiving" });
  }

  if (country === "GB") {
    const easter = easterDate(year);
    const goodFriday = new Date(easter); goodFriday.setDate(easter.getDate() - 2);
    holidays.push({ date: goodFriday, name: "Good Friday" });
    const easterMonday = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
    holidays.push({ date: easterMonday, name: "Easter Monday" });
    // May Day: first Monday of May
    holidays.push({ date: addNthWeekday(year, 5, 1, 1), name: "May Day" });
    // Spring Bank Holiday: last Monday of May
    holidays.push({ date: lastWeekday(year, 5, 1), name: "Spring Bank Holiday" });
    // Summer Bank Holiday: last Monday of August
    holidays.push({ date: lastWeekday(year, 8, 1), name: "Summer Bank Holiday" });
  }

  if (country === "FR") {
    const easter = easterDate(year);
    const easterMonday = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
    holidays.push({ date: easterMonday, name: "Lundi de Pâques" });
    // Ascension: 39 days after Easter
    const ascension = new Date(easter); ascension.setDate(easter.getDate() + 39);
    holidays.push({ date: ascension, name: "Ascension" });
    // Whit Monday: 50 days after Easter
    const whitMonday = new Date(easter); whitMonday.setDate(easter.getDate() + 50);
    holidays.push({ date: whitMonday, name: "Lundi de Pentecôte" });
  }

  if (country === "ES") {
    const easter = easterDate(year);
    const goodFriday = new Date(easter); goodFriday.setDate(easter.getDate() - 2);
    holidays.push({ date: goodFriday, name: "Viernes Santo" });
  }

  // Lunar holidays from lookup table
  const lunarYear = LUNAR_HOLIDAYS[year]?.[country];
  if (lunarYear) {
    for (const group of lunarYear) {
      for (const mmdd of group.dates) {
        const [mm, dd] = mmdd.split("-").map(Number);
        holidays.push({ date: new Date(year, mm - 1, dd), name: group.name });
      }
    }
  }

  return holidays;
}

export function isHoliday(date: Date, country: HolidayCountry = "US"): boolean {
  const year = date.getFullYear();
  const holidays = getHolidaysForYear(year, country);
  return holidays.some(
    (h) =>
      h.date.getFullYear() === year &&
      h.date.getMonth() === date.getMonth() &&
      h.date.getDate() === date.getDate()
  );
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function countWorkingDays(
  start: Date,
  end: Date,
  excludeHolidays: boolean,
  country: HolidayCountry = "US"
): number {
  let count = 0;
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  // Cache holidays for all years in the range
  const years = new Set<number>();
  const cur = new Date(current);
  while (cur <= endDate) { years.add(cur.getFullYear()); cur.setFullYear(cur.getFullYear() + 1); }
  const holidaySet = new Set(
    Array.from(years)
      .flatMap((y) => getHolidaysForYear(y, country))
      .map((h) => `${h.date.getFullYear()}-${h.date.getMonth()}-${h.date.getDate()}`)
  );

  const iter = new Date(current);
  while (iter <= endDate) {
    const key = `${iter.getFullYear()}-${iter.getMonth()}-${iter.getDate()}`;
    if (!isWeekend(iter) && (!excludeHolidays || !holidaySet.has(key))) {
      count++;
    }
    iter.setDate(iter.getDate() + 1);
  }
  return count;
}
