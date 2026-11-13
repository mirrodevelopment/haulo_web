import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

export const RightRail = forwardRef(({ isDark = false, visible = true }, ref) => {
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
      className={`flex fixed right-1.5 sm:right-2.5 md:right-4 lg:right-5 top-1/2 flex-col items-center gap-1 sm:gap-1.5 md:gap-2.5 font-mono text-[8px] sm:text-[9px] md:text-[10px] z-[90] select-none pointer-events-none transition-colors duration-300 ${
        isDark ? "text-white/60" : "text-black/60"
      }`}
      style={{
        transform: visible ? 'translate(0, -50%)' : 'translate(24px, -50%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, color 0.3s ease',
        willChange: 'transform, opacity'
      }}
      aria-hidden="true"
    >
      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-[10px] sm:text-[11px] md:text-xs transition-colors duration-300 ${
        isDark ? "text-white/50" : "text-black/50"
      }`}>✦</span>

      {/* Precision Ruler Ticks Top */}
      <div className="flex flex-col items-end gap-0.5 sm:gap-1 w-2 sm:w-2.5 md:w-3 my-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-colors duration-300 ${
              isDark
                ? (i % 3 === 0 ? 'w-2 sm:w-2.5 md:w-3.5 bg-white/70' : 'w-1 sm:w-1 md:w-1.5 bg-white/30')
                : (i % 3 === 0 ? 'w-2 sm:w-2.5 md:w-3.5 bg-black/70' : 'w-1 sm:w-1 md:w-1.5 bg-black/30')
            }`}
          />
        ))}
      </div>

      {/* Dynamic percentage badge */}
      <span
        ref={pctRef}
        className={`text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-wider px-1 md:px-1.5 py-0.5 rounded-[2px] shadow-xs transition-colors duration-300 ${
          isDark
            ? "text-black bg-white"
            : "text-[#111] bg-white/90 border border-black/10"
        }`}
      >
        0%
      </span>

      {/* Precision Ruler Ticks Bottom */}
      <div className="flex flex-col items-end gap-0.5 sm:gap-1 w-2 sm:w-2.5 md:w-3 my-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-colors duration-300 ${
              isDark
                ? (i % 3 === 0 ? 'w-2 sm:w-2.5 md:w-3.5 bg-white/70' : 'w-1 sm:w-1 md:w-1.5 bg-white/30')
                : (i % 3 === 0 ? 'w-2 sm:w-2.5 md:w-3.5 bg-black/70' : 'w-1 sm:w-1 md:w-1.5 bg-black/30')
            }`}
          />
        ))}
      </div>

      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
    </aside>
  );
});

RightRail.displayName = "RightRail";

export default RightRail;
