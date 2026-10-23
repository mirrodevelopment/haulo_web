import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

export const RightRail = forwardRef(({ isDark = false }, ref) => {
  const pctRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const pct = Math.round(clamped * 100);
      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`;
      }
    }
  }));

  return (
    <aside
      className={`hidden md:flex fixed right-4 lg:right-5 top-1/2 -translate-y-1/2 flex-col items-center gap-2.5 font-mono text-[10px] pointer-events-none z-[90] select-none transition-colors duration-300 ${
        isDark ? "text-white/60" : "text-black/60"
      }`}
      aria-hidden="true"
    >
      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-xs transition-colors duration-300 ${
        isDark ? "text-white/50" : "text-black/50"
      }`}>✦</span>

      {/* Precision Ruler Ticks Top */}
      <div className="flex flex-col items-end gap-1 w-3 my-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-colors duration-300 ${
              isDark
                ? (i % 3 === 0 ? 'w-3.5 bg-white/70' : 'w-1.5 bg-white/30')
                : (i % 3 === 0 ? 'w-3.5 bg-black/70' : 'w-1.5 bg-black/30')
            }`}
          />
        ))}
      </div>

      {/* Dynamic percentage badge */}
      <span
        ref={pctRef}
        className={`text-[10px] sm:text-[11px] font-bold tracking-wider px-1.5 py-0.5 rounded-[2px] shadow-xs transition-colors duration-300 ${
          isDark
            ? "text-black bg-white"
            : "text-[#111] bg-white/90 border border-black/10"
        }`}
      >
        0%
      </span>

      {/* Precision Ruler Ticks Bottom */}
      <div className="flex flex-col items-end gap-1 w-3 my-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-colors duration-300 ${
              isDark
                ? (i % 3 === 0 ? 'w-3.5 bg-white/70' : 'w-1.5 bg-white/30')
                : (i % 3 === 0 ? 'w-3.5 bg-black/70' : 'w-1.5 bg-black/30')
            }`}
          />
        ))}
      </div>

      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
    </aside>
  );
});

RightRail.displayName = "RightRail";

export default RightRail;
