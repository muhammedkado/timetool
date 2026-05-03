import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Replace these with new slot IDs once created in AdSense dashboard
// AdSense → Ads → Ad units → Create ad unit (one per position)
const SLOT_IDS: Record<"top" | "bottom" | "sidebar" | "mid", string> = {
  top: "9572282035",
  bottom: "9590569694",
  mid: "5281683234",
  sidebar: "2742090319",
};

interface AdSlotProps {
  slot: "top" | "bottom" | "sidebar" | "mid";
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const { t } = useTranslation();
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const containerClass =
    slot === "sidebar"
      ? "ad-container hidden xl:flex items-center justify-center w-[300px] min-h-[600px]"
      : "ad-container flex items-center justify-center w-full min-h-[90px]";

  return (
    <div
      className={`${containerClass} ${className}`}
      data-testid={`ad-slot-${slot}`}
      aria-label={t("common.advertisement")}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2855881084010257"
        data-ad-slot={SLOT_IDS[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
