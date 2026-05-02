import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { TIMEZONES, getUtcOffset } from "@/lib/timezones";

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showOffset?: boolean;
  "data-testid"?: string;
}

export function TimezoneSelect({
  value,
  onChange,
  placeholder = "Select timezone...",
  showOffset = true,
  "data-testid": testId,
}: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = TIMEZONES.find((tz) => tz.value === value);

  const filtered =
    search.trim().length > 0
      ? TIMEZONES.filter(
          (tz) =>
            tz.city.toLowerCase().includes(search.toLowerCase()) ||
            tz.country.toLowerCase().includes(search.toLowerCase()) ||
            tz.label.toLowerCase().includes(search.toLowerCase()) ||
            tz.value.toLowerCase().includes(search.toLowerCase())
        )
      : TIMEZONES;

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const offset = selected ? getUtcOffset(selected.value) : "";

  return (
    <div ref={containerRef} className="relative" data-testid={testId}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-input bg-background text-sm hover:bg-muted transition-colors text-left min-h-[44px]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selected ? (
            <>
              <span className="font-medium text-foreground truncate">{selected.city}</span>
              <span className="text-muted-foreground text-xs truncate hidden sm:inline">
                {selected.country}
              </span>
              {showOffset && (
                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground flex-shrink-0">
                  {offset}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[260px] bg-popover border border-popover-border rounded-lg shadow-xl max-h-[320px] overflow-hidden flex flex-col">
          <div className="p-2 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-input bg-background">
              <Search size={14} className="text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search city or country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                data-testid="input-timezone-search"
                onClick={(e) => e.stopPropagation()}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-y-auto flex-1" role="listbox">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4 text-center">No results found</p>
            ) : (
              filtered.map((tz) => (
                <button
                  key={tz.value}
                  type="button"
                  role="option"
                  aria-selected={value === tz.value}
                  onClick={() => {
                    onChange(tz.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors text-left gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-foreground">{tz.city}</span>
                    <span className="text-muted-foreground ml-1.5 text-xs">{tz.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs font-mono text-muted-foreground">
                      {getUtcOffset(tz.value)}
                    </span>
                    {value === tz.value && <Check size={12} className="text-primary" />}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
