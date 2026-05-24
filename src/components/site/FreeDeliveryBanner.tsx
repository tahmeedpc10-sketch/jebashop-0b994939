import { useEffect, useState } from "react";
import { Truck, Clock } from "lucide-react";

const WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours rolling

function getRemaining(): number {
  const key = "jeba:free-delivery-deadline";
  const now = Date.now();
  const stored = Number(localStorage.getItem(key) || 0);
  if (!stored || stored <= now) {
    const next = now + WINDOW_MS;
    localStorage.setItem(key, String(next));
    return WINDOW_MS;
  }
  return stored - now;
}

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return { h, m, s: sec };
}

export function FreeDeliveryBanner() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    setMs(getRemaining());
    const id = setInterval(() => setMs(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const { h, m, s } = fmt(ms ?? WINDOW_MS);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white text-sm font-bn">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2 flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-center">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 shrink-0" />
          <span className="font-semibold">
            সারা বাংলাদেশে হোম ডেলিভারি একদম ফ্রি! কোনো অতিরিক্ত চার্জ নেই।
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/25 rounded-full px-3 py-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono font-bold tracking-wider tabular-nums">
            {h}:{m}:{s}
          </span>
        </div>
      </div>
    </div>
  );
}
