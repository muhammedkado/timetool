interface AdSlotProps {
  slot: "top" | "bottom" | "sidebar";
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const base =
    "flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/20";

  const dimensions: Record<string, string> = {
    top: "w-full h-[90px]",
    bottom: "w-full h-[90px]",
    sidebar: "w-[300px] min-h-[600px] hidden xl:flex",
  };

  return (
    <div
      className={`${base} ${dimensions[slot]} ${className}`}
      data-testid={`ad-slot-${slot}`}
      aria-label="Advertisement"
    >
      <span className="text-xs text-muted-foreground/50 uppercase tracking-widest select-none">
        Advertisement
      </span>
    </div>
  );
}
