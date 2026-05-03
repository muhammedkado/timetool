const KEY = "tz_tools_recent";
const MAX = 5;

export function useRecentTimezones() {
  const getRecent = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "[]");
    } catch {
      return [];
    }
  };

  const addRecent = (tz: string) => {
    try {
      const prev = getRecent().filter((t) => t !== tz);
      localStorage.setItem(KEY, JSON.stringify([tz, ...prev].slice(0, MAX)));
    } catch {}
  };

  return { getRecent, addRecent };
}
