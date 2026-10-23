import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with mouse/hover support (desktop / laptop)
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasMoved = false;
    let rafId = null;

    const onMouseMove = (e) => {
      if (!hasMoved) {
        currentX = e.clientX;
        currentY = e.clientY;
        hasMoved = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, .projectPanel, .orbitCard, .headerNavLink, .promptsPrimaryBtn, .promptsSecondaryBtn, .finalCtaBtn, [data-cursor-hover], .nav-link, .tech-btn, .work-card-track-item, .card-footer-arrow'
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const render = () => {
      // Fluid luxury lerp tracking
      currentX += (mouseX - currentX) * 0.28;
      currentY += (mouseY - currentY) * 0.28;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`customCursorFollower ${isVisible ? 'visible' : ''}`}
      aria-hidden="true"
    >
      <div
        className={`customCursorRing ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />
    </div>
  );
};

export default CustomCursor;
