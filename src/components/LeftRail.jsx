import React, {
  forwardRef,
  useImperativeHandle
} from "react";

export const LeftRail = forwardRef(function LeftRail({ isDark = false, visible = true }, ref) {
  useImperativeHandle(ref, () => ({
    updateProgress: (_progress) => {
      // Preserved imperative interface
    }
  }));

  return (
    <aside
      className={`flex fixed left-1.5 sm:left-2.5 md:left-4 lg:left-5 top-1/2 flex-col items-center gap-2 sm:gap-3 md:gap-4 font-mono text-[8px] sm:text-[9px] md:text-[10px] z-[90] select-none pointer-events-none transition-colors duration-300 ${
        isDark ? "text-white/60" : "text-black/60"
      }`}
      style={{
        transform: visible ? 'translate(0, -50%)' : 'translate(-24px, -50%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, color 0.3s ease',
        willChange: 'transform, opacity'
      }}
      aria-hidden="true"
    >
      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#8ac900] shadow-[0_0_8px_rgba(138,201,0,0.85)]" />
      <span className={`text-[8.5px] sm:text-[9px] md:text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>AR</span>
      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-[8.5px] sm:text-[9px] md:text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>3D</span>
      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
      <span className={`text-[8.5px] sm:text-[9px] md:text-[10px] font-bold tracking-widest transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#111]"
      }`}>XR</span>
      <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-none transition-colors duration-300 ${
        isDark ? "text-white/40" : "text-black/40"
      }`}>+</span>
    </aside>
  );
});

LeftRail.displayName = "LeftRail";

export default LeftRail;
