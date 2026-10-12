import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

export const LeftRail = forwardRef(function LeftRail(props, ref) {

  const fillRef = useRef(null);
  const dotRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const pct = clamped * 100;

      if (fillRef.current) {
        fillRef.current.style.height = `${pct}%`;
      }

      if (dotRef.current) {
        dotRef.current.style.top = `${pct}%`;
      }
    }
  }));

  return (
    <aside className="left-rail" aria-hidden="true">

      {/* Main rail */}
      <div className="left-rail-line" />

      {/* Scroll-driven color line */}
      <div className="left-progress-track">
        <div className="left-progress-fill" ref={fillRef} />
      </div>

      {/* Top cyan marker */}
      <span className="left-cyan-dot" ref={dotRef} />

      {/* AR */}
      <div className="left-section systems">
        <span className="rail-plus">+</span>
        <span className="rail-label">AR</span>
        <span className="rail-square lime" />
      </div>

      {/* 3D */}
      <div className="left-section interfaces">
        <span className="rail-plus">+</span>
        <span className="rail-label">3D</span>
        <span className="rail-square" />
      </div>

      {/* AI */}
      <div className="left-section intelligence">
        <span className="rail-plus">+</span>
        <span className="rail-label">AI</span>
        <span className="rail-square" />
      </div>

      {/* XR */}
      <div className="left-section objects">
        <span className="rail-plus">+</span>
        <span className="rail-label">XR</span>
        <span className="rail-square" />
      </div>

      {/* Bottom markers */}
      <span className="left-marker marker-blue" />
      <span className="left-marker marker-purple" />

    </aside>
  );
});

LeftRail.displayName = "LeftRail";