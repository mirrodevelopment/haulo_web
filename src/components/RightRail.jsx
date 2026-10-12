import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

export const RightRail = forwardRef((props, ref) => {

  const numberRef = useRef(null);
  const fillRef = useRef(null);
  const pctRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const pct = Math.round(clamped * 100);

      if (numberRef.current) {
        numberRef.current.textContent = `${pct < 10 ? '0' + pct : pct}`;
      }

      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`;
      }

      if (fillRef.current) {
        fillRef.current.style.height = `${clamped * 100}%`;
      }
    }
  }));

  const ticks = Array.from({ length: 28 });

  return (
    <aside className="right-rail" aria-hidden="true">

      {/* Main ruler */}
      <div className="right-ruler">

        {/* Top cyan point */}
        <span className="right-dot top-dot" />

        {/* Lime indicator */}
        <span className="right-lime-bar" />

        {/* Tick marks */}
        <div className="right-ticks">
          {ticks.map((_, index) => (
            <span
              key={index}
              className={
                index % 4 === 0
                  ? "right-tick long"
                  : "right-tick"
              }
            />
          ))}
        </div>

        {/* Number */}
        <div className="right-number">
          <span ref={numberRef}>01</span>
        </div>

        {/* Dynamic percentage indicator matching reference images (45%, 65%, 82%) */}
        <span className="right-static-pct" ref={pctRef}>0%</span>

        {/* Purple marker */}
        <span className="right-dot purple-dot" />

        {/* Bottom cyan marker */}
        <span className="right-dot bottom-dot" />

        {/* Progress */}
        <div className="right-progress">
          <div
            ref={fillRef}
            className="right-progress-fill"
          />
        </div>

      </div>

    </aside>
  );
});

RightRail.displayName = "RightRail";