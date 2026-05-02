export interface Holiday {
  name: string;
  month: number;
  day: number;
}

const FIXED_HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", month: 1, day: 1 },
  { name: "Valentine's Day", month: 2, day: 14 },
  { name: "St. Patrick's Day", month: 3, day: 17 },
  { name: "Independence Day (US)", month: 7, day: 4 },
  { name: "Halloween", month: 10, day: 31 },
  { name: "Veterans Day (US)", month: 11, day: 11 },
  { name: "Christmas Eve", month: 12, day: 24 },
  { name: "Christmas Day", month: 12, day: 25 },
  { name: "Boxing Day (UK)", month: 12, day: 26 },
  { name: "New Year's Eve", month: 12, day: 31 },
];

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

export function getHolidaysForYear(year: number): Array<{ date: Date; name: string }> {
  const holidays = FIXED_HOLIDAYS.map((h) => ({
    date: new Date(year, h.month - 1, h.day),
    name: h.name,
  }));

  const easter = easterDate(year);
  holidays.push({ date: easter, name: "Easter Sunday" });

  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  holidays.push({ date: goodFriday, name: "Good Friday" });

  const easterMonday = new Date(easter);
  easterMonday.setDate(easter.getDate() + 1);
  holidays.push({ date: easterMonday, name: "Easter Monday" });

  // US Memorial Day: last Monday of May
  const memorial = new Date(year, 4, 31);
  while (memorial.getDay() !== 1) memorial.setDate(memorial.getDate() - 1);
  holidays.push({ date: memorial, name: "Memorial Day (US)" });

  // US Labor Day: first Monday of September
  const labor = new Date(year, 8, 1);
  while (labor.getDay() !== 1) labor.setDate(labor.getDate() + 1);
  holidays.push({ date: labor, name: "Labor Day (US)" });

  // US Thanksgiving: fourth Thursday of November
  const thanksgiving = new Date(year, 10, 1);
  while (thanksgiving.getDay() !== 4) thanksgiving.setDate(thanksgiving.getDate() + 1);
  thanksgiving.setDate(thanksgiving.getDate() + 21);
  holidays.push({ date: thanksgiving, name: "Thanksgiving (US)" });

  // UK May Day: first Monday of May
  const mayDay = new Date(year, 4, 1);
  while (mayDay.getDay() !== 1) mayDay.setDate(mayDay.getDate() + 1);
  holidays.push({ date: mayDay, name: "May Day (UK)" });

  return holidays;
}

export function isHoliday(date: Date): boolean {
  const year = date.getFullYear();
  const holidays = getHolidaysForYear(year);
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
  excludeHolidays: boolean
): number {
  let count = 0;
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    if (!isWeekend(current) && (!excludeHolidays || !isHoliday(current))) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}
