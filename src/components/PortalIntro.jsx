import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import hauloLogoText from "../assets/HAULO-LOGO-TEXT.png";

const SERVICE_WORD = "SERVICES";

export const PortalIntro = ({
  portalWorldRef,
  portalGlowRef,
  portalTextRef,
  portalTopWordRef,
  portalBottomWordRef,
  onAutoAdvanceToHero
}) => {
  const topWordRef = useRef(null);
  const bottomWordRef = useRef(null);
  const blackScreenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const topWordEl = topWordRef.current;
      const bottomWordEl = bottomWordRef.current;
      const blackScreenEl = blackScreenRef.current;
      const glowEl = portalGlowRef?.current;

      // Center container positioning
      if (portalTextRef?.current) {
        gsap.set(portalTextRef.current, {
          xPercent: -50,
          yPercent: -50,
          position: "absolute",
          top: "50%",
          left: "50%"
        });
      }

      // 1. Initial State:
      // Both elements placed dead-center, no translation from any side
      if (topWordEl) {
        gsap.set(topWordEl, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
          willChange: "opacity"
        });
      }

      // Screen 2: Black screen hidden initially
      if (blackScreenEl) {
        gsap.set(blackScreenEl, {
          opacity: 0,
          willChange: "opacity"
        });
      }

      // SERVICES text placed dead-center, no translation from any side
      if (bottomWordEl) {
        gsap.set(bottomWordEl, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
          willChange: "opacity"
        });
      }

      if (glowEl) {
        gsap.set(glowEl, {
          opacity: 0,
          willChange: "opacity"
        });
      }

      // 2. Choreographed intro timeline (Snappy, cinematic, zero dead time)
      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // [0.08s - 0.95s]: SCREEN 1 - HAULO LOGO on White Screen
      if (topWordEl) {
        introTl.to(
          topWordEl,
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out"
          },
          0.08
        );

        // At 0.95s: HAULO logo smoothly fades out
        introTl.to(
          topWordEl,
          {
            opacity: 0,
            duration: 0.20,
            ease: "power2.inOut"
          },
          0.95
        );
      }

      // [1.05s - 1.75s]: SCREEN 2 - SERVICES on Black Screen
      if (blackScreenEl) {
        introTl.to(
          blackScreenEl,
          {
            opacity: 1,
            duration: 0.22,
            ease: "power2.inOut"
          },
          1.05
        );
      }

      // SERVICES word appears in crisp white text in center
      if (bottomWordEl) {
        introTl.to(
          bottomWordEl,
          {
            opacity: 1,
            duration: 0.32,
            ease: "power2.out"
          },
          1.15
        );

        // At 1.75s: SERVICES smoothly fades out before advancing
        introTl.to(
          bottomWordEl,
          {
            opacity: 0,
            duration: 0.20,
            ease: "power2.inOut"
          },
          1.75
        );
      }

      // Black screen fades out to reveal Hero Section
      if (blackScreenEl) {
        introTl.to(
          blackScreenEl,
          {
            opacity: 0,
            duration: 0.22,
            ease: "power2.inOut"
          },
          1.75
        );
      }

      // Hide portal intro world completely so it never overlaps
      if (portalWorldRef?.current) {
        introTl.to(
          portalWorldRef.current,
          {
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.inOut",
            onComplete: () => {
              if (portalWorldRef.current) {
                portalWorldRef.current.style.display = "none";
              }
            }
          },
          1.75
        );
      }

      // Auto advance directly to Hero Section at 1.85s (zero dead waiting time)
      introTl.call(
        () => {
          if (onAutoAdvanceToHero) {
            onAutoAdvanceToHero();
          }
        },
        null,
        1.85
      );
    }, portalWorldRef);

    return () => ctx.revert();
  }, [portalTextRef, portalGlowRef, portalWorldRef, onAutoAdvanceToHero]);

  return (
    <div
      ref={portalWorldRef}
      className="worldLayer portalWorld"
      style={{
        background: "#ffffff",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div ref={portalGlowRef} className="portalGlow" style={{ display: "none" }} />

      {/* SCREEN 1: WHITE BACKGROUND WITH HAULO LOGO IN CENTER */}
      <div
        ref={portalTextRef}
        className="portalTextBackdrop"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        <div
          ref={(el) => {
            topWordRef.current = el;
            if (portalTopWordRef) {
              if (typeof portalTopWordRef === "function") portalTopWordRef(el);
              else portalTopWordRef.current = el;
            }
          }}
          className="portalWordGroup portalWordTop portalWordLogo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "opacity"
          }}
        >
          <img
            src={hauloLogoText}
            alt="HAULO"
            className="portalLogoImg"
            draggable={false}
            style={{
              display: "block",
              width: "clamp(260px, 42vw, 640px)",
              maxWidth: "88vw",
              height: "auto",
              aspectRatio: "1515 / 300",
              objectFit: "contain",
              userSelect: "none"
            }}
          />
        </div>
      </div>

      {/* SCREEN 2: BLACK BACKGROUND WITH SERVICES TYPOGRAPHY IN CENTER */}
      <div
        ref={blackScreenRef}
        className="portalBlackScreen"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: 0,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          willChange: "opacity"
        }}
      >
        <div
          ref={(el) => {
            bottomWordRef.current = el;
            if (portalBottomWordRef) {
              if (typeof portalBottomWordRef === "function") portalBottomWordRef(el);
              else portalBottomWordRef.current = el;
            }
          }}
          className="portalWordGroup portalWordBottom portalServicesWhite"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
            fontSize: "clamp(38px, 6.2vw, 98px)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1,
            willChange: "opacity"
          }}
        >
          {SERVICE_WORD.split("").map((char, currentIdx) => (
            <span
              key={`services-${currentIdx}`}
              className={`portalLetter portalLetter--${currentIdx}`}
              data-letter-index={currentIdx}
              style={{ display: "inline-block", color: "#ffffff" }}
            >
              <span
                className="portalLetterInner"
                style={{
                  color: "#ffffff",
                  background: "none",
                  WebkitBackgroundClip: "unset",
                  WebkitTextFillColor: "#ffffff",
                  fontWeight: 700
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalIntro;
