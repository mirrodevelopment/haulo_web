import React, {
  forwardRef,
  useImperativeHandle
} from "react";

export const LeftRail = forwardRef(function LeftRail({ isDark = false }, ref) {
  useImperativeHandle(ref, () => ({
    updateProgress: (_progress) => {
      // Preserved imperative interface
    }
  }));

  return (
    <aside
      className={`hidden md:flex fixed left-4 lg:left-5 top-1/2 -translate-y-1/2 flex-col items-center gap-4 font-mono text-[10px] pointer-events-none z-40 select-none transition-colors duration-300 ${
        isDark ? "text-white/60" : "text-black/60"
      }`}
      aria-hidden="true"
    >
      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className="w-2 h-2 rounded-full bg-[#8ac900] shadow-[0_0_8px_rgba(138,201,0,0.85)]" />
      <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>AR</span>
      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>3D</span>
      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>XR</span>
      <span className={`text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
    </aside>
  );
});

LeftRail.displayName = "LeftRail";

export default LeftRail;
