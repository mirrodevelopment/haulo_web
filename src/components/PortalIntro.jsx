import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import hauloLogoText from "../assets/HAULO-LOGO-TEXT.png";

const SERVICE_WORD = "SERVICE";

export const PortalIntro = ({
  portalWorldRef,
  portalGlowRef,
  portalTextRef,
  portalTopWordRef,
  portalBottomWordRef,
  onAutoAdvanceToHero
}) => {
  const wordGroupRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const topWordEl = wordGroupRefs.current[0];
      const bottomWordEl = wordGroupRefs.current[1];

      if (topWordEl) {
        gsap.set(topWordEl, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotationX: 0,
          clearProps: "transform,willChange"
        });
      }
      if (bottomWordEl) {
        gsap.set(bottomWordEl, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotationX: 0,
          clearProps: "transform,willChange"
        });
      }

      const introTl = gsap.timeline();

      // Automatically advance to the next section after intro hold
      introTl.call(
        () => {
          if (onAutoAdvanceToHero) {
            onAutoAdvanceToHero();
          }
        },
        null,
        "+=2.0"
      );
    }, portalTextRef);

    return () => ctx.revert();
  }, [portalTextRef, onAutoAdvanceToHero]);

  return (
    <div ref={portalWorldRef} className="worldLayer portalWorld">
      <div ref={portalGlowRef} className="portalGlow" />
      <div ref={portalTextRef} className="portalTextBackdrop">
        <div className="portalWorkText" aria-label="HAULO SERVICE">
          {/* TOP ELEMENT: HAULO LOGO IMAGE */}
          <div
            ref={(el) => {
              wordGroupRefs.current[0] = el;
              if (portalTopWordRef) {
                if (typeof portalTopWordRef === "function") portalTopWordRef(el);
                else portalTopWordRef.current = el;
              }
            }}
            className="portalWordGroup portalWordTop portalWordLogo"
          >
            <img
              src={hauloLogoText}
              alt="HAULO"
              className="portalLogoImg"
              draggable={false}
            />
          </div>

          {/* BOTTOM ELEMENT: SERVICE TYPOGRAPHY */}
          <div
            ref={(el) => {
              wordGroupRefs.current[1] = el;
              if (portalBottomWordRef) {
                if (typeof portalBottomWordRef === "function") portalBottomWordRef(el);
                else portalBottomWordRef.current = el;
              }
            }}
            className="portalWordGroup portalWordBottom"
          >
            {SERVICE_WORD.split("").map((char, currentIdx) => (
              <span
                key={`service-${currentIdx}`}
                className={`portalLetter portalLetter--${currentIdx}`}
                data-letter-index={currentIdx}
              >
                <span className="portalLetterInner">{char}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalIntro;
