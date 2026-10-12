import React, { useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './Header';
import { LeftRail } from './LeftRail';
import { RightRail } from './RightRail';
import { BottomCaption } from './BottomCaption';
import { FloatingFragments } from './FloatingFragments';
import { EditorialHero } from './EditorialHero';
import { TypographyStage } from './TypographyStage';
import { NextSection } from './NextSection';
import { UnderwaterBackground } from './UnderwaterBackground';
import { SPACE_ITEMS } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);



function catmullRom(p0, p1, p2, p3, u) {
  const u2 = u * u;
  const u3 = u2 * u;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * u +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * u3
  );
}

// =============================================================================
// HERO TYPOGRAPHY CONVEYOR: CINEMATIC HARMONIC TRAJECTORY WITH 3D DEPTH
// =============================================================================
const WORD_WAYPOINTS = [
  { t: -0.08, xPct: 114.0, yPct: 112.0, z: -100, scale: 0.88, rotY: -35.0, rotZ: 0.0 },
  { t:  0.00, xPct: 106.0, yPct: 102.0, z:  -80, scale: 0.90, rotY: -32.0, rotZ: 0.0 },
  { t:  0.18, xPct:  88.0, yPct:  76.0, z:  -45, scale: 0.94, rotY: -24.0, rotZ: 0.0 },
  { t:  0.34, xPct:  69.0, yPct:  50.0, z:  -18, scale: 0.97, rotY: -12.0, rotZ: 0.0 },
  { t:  0.46, xPct:  54.0, yPct:  32.5, z:    5, scale: 0.99, rotY:  -3.0, rotZ: 0.0 },
  { t:  0.50, xPct:  50.0, yPct:  29.5, z:   10, scale: 1.00, rotY:   0.0, rotZ: 0.0 },
  { t:  0.54, xPct:  46.0, yPct:  29.6, z:    5, scale: 0.99, rotY:   5.0, rotZ: 0.0 },
  { t:  0.66, xPct:  34.0, yPct:  30.0, z:  -20, scale: 0.96, rotY:  24.0, rotZ: 0.0 },
  { t:  0.80, xPct:  18.0, yPct:  30.5, z:  -55, scale: 0.91, rotY:  52.0, rotZ: 0.0 },
  { t:  0.94, xPct:  -8.0, yPct:  30.8, z:  -95, scale: 0.82, rotY:  76.0, rotZ: 0.0 },
  { t:  1.00, xPct: -32.0, yPct:  31.0, z: -120, scale: 0.74, rotY:  84.0, rotZ: 0.0 },
  { t:  1.08, xPct: -52.0, yPct:  31.2, z: -140, scale: 0.66, rotY:  88.0, rotZ: 0.0 }
];

// Technical callout annotations synchronized with the 5 conveyor words
const WORD_CALLOUTS = [
  // 0: HAULO (TR defines top of 'O', BL defines left leg of 'H', BR defines frog foot)
  {
    trSub: 'SF / LDN / TYO',
    blBrand: 'HAULO',
    blBrandSup: 'TM',
    blLine1: 'DIGITAL / PHYSICAL / AI',
    blLine2: 'FOR A BRIGHTER TOMORROW.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M4 36 L34 10 L100 10',
    trStartDot: { cx: 4, cy: 36 },
    trEndDot: { cx: 100, cy: 10 },
    trPos: { top: 'clamp(95px, 15vh, 145px)', right: 'clamp(38px, 8vw, 135px)' },
    blPath: 'M4 106 L34 106 L96 18 L96 4',
    blStartDot: { cx: 4, cy: 106 },
    blEndDot: { cx: 96, cy: 4 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(65px, 12vh, 115px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '3px',
    blSvgSize: { width: 104, height: 114, viewBox: '0 0 104 114' },
  },
  // 1: DESIGN TO (TR defines top-right of 'T' in TO, BL defines bottom-right of 'D' in DESIGN)
  {
    trSub: 'SYS / INT / FWD',
    blBrand: 'HAULO',
    blBrandSup: '®',
    blLine1: 'DIGITAL / PHYSICAL / AI',
    blLine2: 'FOR A BRIGHTER TOMORROW.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M4 42 L36 12 L96 12',
    trStartDot: { cx: 4, cy: 42 },
    trEndDot: { cx: 96, cy: 12 },
    trPos: { top: 'clamp(105px, 16.5vh, 160px)', right: 'clamp(48px, 10vw, 160px)' },
    blPath: 'M4 96 L28 96 L88 12',
    blStartDot: { cx: 4, cy: 96 },
    blEndDot: { cx: 88, cy: 12 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(65px, 12vh, 115px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '3px',
    blSvgSize: { width: 104, height: 114, viewBox: '0 0 104 114' },
  },
  // 2: THINK (TR defines top diagonal arm of 'K', BL defines bottom of left leg of 'H')
  {
    trSub: 'SYS / INT / FWD',
    blBrand: 'HAULO',
    blBrandSup: '®',
    blLine1: 'DIGITAL / PHYSICAL / AI',
    blLine2: 'FOR A BRIGHTER TOMORROW.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M4 38 L32 10 L96 10',
    trStartDot: { cx: 4, cy: 38 },
    trEndDot: { cx: 96, cy: 10 },
    trPos: { top: 'clamp(90px, 14.5vh, 145px)', right: 'clamp(42px, 8.5vw, 140px)' },
    blPath: 'M4 92 L32 92 L92 8',
    blStartDot: { cx: 4, cy: 92 },
    blEndDot: { cx: 92, cy: 8 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(65px, 12vh, 115px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '3px',
    blSvgSize: { width: 104, height: 114, viewBox: '0 0 104 114' },
  },
  // 3: BUILD (TR defines top curve of 'D', BL defines bottom bowl of 'B')
  {
    trSub: 'SYS / INT / FWD',
    blBrand: 'HAULO',
    blBrandSup: '®',
    blLine1: 'IDEAS TO REALITY.',
    blLine2: 'BUILT FOR A BRIGHTER TOMORROW.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M4 36 L34 10 L96 10',
    trStartDot: { cx: 4, cy: 36 },
    trEndDot: { cx: 96, cy: 10 },
    trPos: { top: 'clamp(85px, 14vh, 140px)', right: 'clamp(42px, 8.5vw, 140px)' },
    blPath: 'M4 88 L34 88 L90 12',
    blStartDot: { cx: 4, cy: 88 },
    blEndDot: { cx: 90, cy: 12 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(65px, 12vh, 115px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '3px',
    blSvgSize: { width: 104, height: 114, viewBox: '0 0 104 114' },
  },
  // 4: AND EVOLVE (TR defines top of 'V' in EVOLVE, BL defines bottom of 'N' in AND)
  {
    trSub: 'SYS / INT / FWD',
    blBrand: 'HAULO',
    blBrandSup: '®',
    blLine1: 'SYSTEMS THAT ADAPT.',
    blLine2: 'BUILT TO EVOLVE.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M4 36 L32 10 L96 10',
    trStartDot: { cx: 4, cy: 36 },
    trEndDot: { cx: 96, cy: 10 },
    trPos: { top: 'clamp(85px, 14vh, 140px)', right: 'clamp(42px, 8.5vw, 140px)' },
    blPath: 'M4 86 L32 86 L86 14',
    blStartDot: { cx: 4, cy: 86 },
    blEndDot: { cx: 86, cy: 14 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(65px, 12vh, 115px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '3px',
    blSvgSize: { width: 104, height: 114, viewBox: '0 0 104 114' },
  },
  // 5: EDITORIAL HERO (TR defines glowing frog ear antenna, BL defines BUILT TO EVOLVE. headline)
  {
    trSub: 'SYS / INT / FWD',
    blBrand: 'HAULO',
    blBrandSup: '®',
    blLine1: 'DIGITAL / PHYSICAL / INTELLIGENT',
    blLine2: 'SYSTEMS BUILT TO MOVE FORWARD.',
    hasColorBar: true,
    barColors: { bar1: '#20aef3', bar2: '#000000' },
    trPath: 'M26 48 L56 14 L100 14',
    trStartDot: { cx: 26, cy: 48 },
    trEndDot: { cx: 100, cy: 14 },
    trPos: { top: 'clamp(180px, 31.5vh, 230px)', right: 'clamp(32px, 5.5vw, 90px)' },
    blPath: 'M36 52 L36 22 L8 6',
    blStartDot: { cx: 36, cy: 52 },
    blEndDot: { cx: 8, cy: 6 },
    blPos: { left: 'clamp(36px, 6.5vw, 110px)', bottom: 'clamp(55px, 10.5vh, 95px)' },
    blFlexDirection: 'column',
    blAlignItems: 'flex-start',
    blGap: '4px',
    blSvgSize: { width: 90, height: 58, viewBox: '0 0 90 58' },
  },
];

// Precompute time-weighted C1 tangents for silky-smooth, continuous velocity across all waypoints
const WORD_TANGENTS = (() => {
  const pts = WORD_WAYPOINTS;
  const keys = ['xPct', 'yPct', 'z', 'scale', 'rotY', 'rotZ'];
  return pts.map((p, i) => {
    const m = {};
    keys.forEach((k) => {
      if (i === 0) {
        m[k] = (pts[1][k] - pts[0][k]) / (pts[1].t - pts[0].t);
      } else if (i === pts.length - 1) {
        m[k] = (pts[i][k] - pts[i - 1][k]) / (pts[i].t - pts[i - 1].t);
      } else {
        const dt0 = pts[i].t - pts[i - 1].t;
        const dt1 = pts[i + 1].t - pts[i].t;
        const v0 = (pts[i][k] - pts[i - 1][k]) / dt0;
        const v1 = (pts[i + 1][k] - pts[i][k]) / dt1;
        // Interval-weighted average ensures C1 continuity with zero velocity spikes
        m[k] = (v0 * dt1 + v1 * dt0) / (dt0 + dt1);
      }
    });
    return m;
  });
})();

function paceProgress(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  // Gentle harmonic easing near center spotlight without artificial flat spots
  const delta = t - 0.50;
  const settle = delta * (1 - 0.16 * Math.exp(-24 * delta * delta));
  return Math.max(0, Math.min(1, 0.50 + settle));
}

function calcPixels(xPct, yPct, z, scale, rotY, rotZ, width, height) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const pxCenterX = (vw * xPct) / 100;
  const pxCenterY = (vh * yPct) / 100;

  const posX = pxCenterX - (width * scale) / 2;
  const posY = pxCenterY - (height * scale) / 2;

  return { x: posX, y: posY, z, scale, rotationX: 0, rotationY: rotY, rotationZ: rotZ };
}

function evaluateTrack(t, width, height) {
  const pts = WORD_WAYPOINTS;
  const n = pts.length;
  if (t <= pts[0].t) {
    const wp = pts[0];
    return calcPixels(wp.xPct, wp.yPct, wp.z, wp.scale, wp.rotY, wp.rotZ, width, height);
  }
  if (t >= pts[n - 1].t) {
    const wp = pts[n - 1];
    return calcPixels(wp.xPct, wp.yPct, wp.z, wp.scale, wp.rotY, wp.rotZ, width, height);
  }

  let i = 0;
  while (i < n - 1 && pts[i + 1].t < t) {
    i++;
  }

  const p0 = pts[i];
  const p1 = pts[Math.min(n - 1, i + 1)];
  const m0 = WORD_TANGENTS[i];
  const m1 = WORD_TANGENTS[Math.min(n - 1, i + 1)];
  const dt = p1.t - p0.t;
  const u = dt > 0 ? (t - p0.t) / dt : 0;
  const u2 = u * u;
  const u3 = u2 * u;

  // Cubic Hermite basis functions
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;

  const xPct = h00 * p0.xPct + h10 * (dt * m0.xPct) + h01 * p1.xPct + h11 * (dt * m1.xPct);
  const yPct = h00 * p0.yPct + h10 * (dt * m0.yPct) + h01 * p1.yPct + h11 * (dt * m1.yPct);
  const z = h00 * p0.z + h10 * (dt * m0.z) + h01 * p1.z + h11 * (dt * m1.z);
  const scale = h00 * p0.scale + h10 * (dt * m0.scale) + h01 * p1.scale + h11 * (dt * m1.scale);
  const rotY = h00 * p0.rotY + h10 * (dt * m0.rotY) + h01 * p1.rotY + h11 * (dt * m1.rotY);
  const rotZ = h00 * p0.rotZ + h10 * (dt * m0.rotZ) + h01 * p1.rotZ + h11 * (dt * m1.rotZ);

  return calcPixels(xPct, yPct, z, scale, rotY, rotZ, width, height);
}

// =============================================================================
// 3D CYLINDRICAL RING SPLINE TRAJECTORY NODES & INTERPOLATION
// =============================================================================
const SPLINE_NODES = [
  { t: 0.00, xVw: 0.0, yVh: -85.0, zPx: -55, scale: 0.90, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 0.15, xVw: 0.0, yVh: -55.0, zPx: -35, scale: 0.94, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 0.30, xVw: 0.0, yVh: -26.0, zPx:  -5, scale: 0.98, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 0.50, xVw: 0.0, yVh:   0.0, zPx:  15, scale: 1.00, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 0.70, xVw: 0.0, yVh:  26.0, zPx:  -5, scale: 0.98, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 0.85, xVw: 0.0, yVh:  55.0, zPx: -35, scale: 0.94, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 },
  { t: 1.00, xVw: 0.0, yVh:  85.0, zPx: -55, scale: 0.90, rotX: 0.0, rotY: 0.0, rotZ: 0.0, cylRotY: 0.0 }
];

function paceRingProgress(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const delta = t - 0.50;
  // Harmonic subtle deceleration near center spotlight so each ring pauses gracefully in focus
  const settle = delta * (1 - 0.24 * Math.exp(-24 * delta * delta));
  return Math.max(0, Math.min(1, 0.50 + settle));
}

function evaluateRingSpline(t, geo) {
  const clampedT = Math.max(0, Math.min(1, t));
  const nodes = SPLINE_NODES;
  const n = nodes.length;

  let i = 0;
  while (i < n - 1 && nodes[i + 1].t < clampedT) {
    i++;
  }

  const k1 = nodes[i];
  const k2 = nodes[Math.min(n - 1, i + 1)];
  const k0 = i > 0 ? nodes[i - 1] : {
    ...k1,
    xVw: 2 * k1.xVw - k2.xVw,
    yVh: 2 * k1.yVh - k2.yVh,
    zPx: 2 * k1.zPx - k2.zPx,
    scale: 2 * k1.scale - k2.scale,
    rotX: 2 * k1.rotX - k2.rotX,
    rotY: 2 * k1.rotY - k2.rotY,
    rotZ: 2 * k1.rotZ - k2.rotZ,
    cylRotY: 2 * k1.cylRotY - k2.cylRotY
  };
  const k3 = i + 2 < n ? nodes[i + 2] : {
    ...k2,
    xVw: 2 * k2.xVw - k1.xVw,
    yVh: 2 * k2.yVh - k1.yVh,
    zPx: 2 * k2.zPx - k1.zPx,
    scale: 2 * k2.scale - k1.scale,
    rotX: 2 * k2.rotX - k1.rotX,
    rotY: 2 * k2.rotY - k1.rotY,
    rotZ: 2 * k2.rotZ - k1.rotZ,
    cylRotY: 2 * k2.cylRotY - k1.cylRotY
  };

  const dt = k2.t - k1.t;
  const u = dt > 0 ? (clampedT - k1.t) / dt : 0;

  const xVw = catmullRom(k0.xVw, k1.xVw, k2.xVw, k3.xVw, u);
  const yVh = catmullRom(k0.yVh, k1.yVh, k2.yVh, k3.yVh, u);
  const zPx = catmullRom(k0.zPx, k1.zPx, k2.zPx, k3.zPx, u);
  const scale = catmullRom(k0.scale, k1.scale, k2.scale, k3.scale, u);
  const rotX = catmullRom(k0.rotX, k1.rotX, k2.rotX, k3.rotX, u);
  const rotY = catmullRom(k0.rotY, k1.rotY, k2.rotY, k3.rotY, u);
  const rotZ = catmullRom(k0.rotZ, k1.rotZ, k2.rotZ, k3.rotZ, u);
  const cylRotY = catmullRom(k0.cylRotY, k1.cylRotY, k2.cylRotY, k3.cylRotY, u);

  const vw = geo.vw;
  const vh = geo.vh;

  return {
    x: (xVw * vw) / 100,
    y: (yVh * vh) / 100,
    z: zPx,
    scale,
    rotX,
    rotY,
    rotZ,
    cylRotY
  };
}

function computeGeometry() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw <= 768;

  return {
    vw,
    vh,
    isMobile
  };
}

// =============================================================================
// HERO EXPERIENCE COMPONENT
// =============================================================================
export const HeroExperience = forwardRef(function HeroExperience(
  { hasSplash = false, isJourneyActive = false, isHandoff = false, onJourneyComplete },
  ref
) {
  const hideHeroVisuals = (hasSplash || isJourneyActive) && !isHandoff;
  const heroRef = useRef(null);
  const pinRef = useRef(null);
  const worldRef = useRef(null);
  const heroSceneRef = useRef(null);
  const conveyorSceneRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroIntroPlayedRef = useRef(false);

  // 3D Space Ring Spline Conveyor refs
  const spaceWorldRef = useRef(null);
  const ringRefs = useRef([]);
  const cylinderRefs = useRef([]);
  const badgeRefs = useRef([]);
  const hoveredRingIndexRef = useRef(-1);

  const calloutTrRef = useRef(null);
  const calloutBlRef = useRef(null);
  const calloutBrRef = useRef(null);
  const calloutTrSubRef = useRef(null);
  const calloutBlBrandRef = useRef(null);
  const calloutBlSupRef = useRef(null);
  const calloutBlLine1Ref = useRef(null);
  const calloutBlLine2Ref = useRef(null);
  const calloutBlColorBarRef = useRef(null);
  const calloutBlBar1Ref = useRef(null);
  const calloutBlBar2Ref = useRef(null);
  const trLinePathRef = useRef(null);
  const blLinePathRef = useRef(null);
  const brLinePathRef = useRef(null);
  const trStartDotRef = useRef(null);
  const trEndDotRef = useRef(null);
  const blStartDotRef = useRef(null);
  const blEndDotRef = useRef(null);
  const brStartDotRef = useRef(null);
  const brEndDotRef = useRef(null);
  const trTextGroupRef = useRef(null);
  const blTextGroupRef = useRef(null);
  const brTextGroupRef = useRef(null);
  const blSvgRef = useRef(null);
  const prevActiveWordIdxRef = useRef(0);
  const isAirborneRef = useRef(false);
  const landingAnimTimelineRef = useRef(null);
  const bottomCaptionRef = useRef(null);

  // HUD staged entrance refs
  const headerContainerRef = useRef(null);
  const leftRailContainerRef = useRef(null);
  const leftProgressMarkerRef = useRef(null);
  const rightRailContainerRef = useRef(null);
  const bottomCaptionContainerRef = useRef(null);

  // Typography word refs
  const hauloRef = useRef(null);
  const designRef = useRef(null);
  const thinkRef = useRef(null);
  const buildRef = useRef(null);
  const evolveRef = useRef(null);

  // Grounded frog preview refs for each word
  const hauloFrogRef = useRef(null);
  const designFrogRef = useRef(null);
  const thinkFrogRef = useRef(null);
  const buildFrogRef = useRef(null);
  const evolveFrogRef = useRef(null);



  // HUD & Fragment refs
  const progressMarkerRef = useRef(null);
  const fragmentsRef = useRef([]);

  // Background environment refs
  const bgGridRef = useRef(null);
  const causticsRef = useRef(null);
  const currentsRef = useRef(null);

  // Gated Hero scroll progress (Rule 2: do NOT recreate Hero ScrollTrigger, hold at initial frame)
  const [initialHasSplash] = useState(hasSplash);
  const heroActiveRef = useRef(!initialHasSplash);
  const updateConveyorFnRef = useRef(null);
  const refreshDimsFnRef = useRef(null);

  // Expose hero activation to parent / journey controller
  useImperativeHandle(ref, () => ({
    startJourney: () => {
      console.log('>>> [HeroExperience] startJourney — activating hero scroll');

      heroActiveRef.current = true;

      // Unlock document scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      // Restore HUD elements that were hidden during splash & journey initialization
      if (headerContainerRef.current) gsap.set(headerContainerRef.current, { opacity: 1, visibility: 'visible' });
      if (leftRailContainerRef.current) gsap.set(leftRailContainerRef.current, { opacity: 1, visibility: 'visible' });
      if (rightRailContainerRef.current) gsap.set(rightRailContainerRef.current, { opacity: 1, visibility: 'visible' });
      if (bottomCaptionContainerRef.current) gsap.set(bottomCaptionContainerRef.current, { opacity: 1, visibility: 'visible' });
      if (calloutTrRef.current) gsap.set(calloutTrRef.current, { opacity: 1, visibility: 'visible' });
      if (calloutBlRef.current) gsap.set(calloutBlRef.current, { opacity: 1, visibility: 'visible' });
      if (calloutBrRef.current) gsap.set(calloutBrRef.current, { opacity: 1, visibility: 'visible' });

      // Restore HAULO typography visibility
      if (hauloRef.current) {
        gsap.set(hauloRef.current, { opacity: 1, visibility: 'visible' });
      }

      // Re-measure exact element dimensions and update conveyor to initial frame 0
      if (refreshDimsFnRef.current) {
        refreshDimsFnRef.current();
      }
      if (updateConveyorFnRef.current) {
        updateConveyorFnRef.current(0);
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      if (onJourneyComplete) {
        onJourneyComplete();
      }
    },
  }));

  useLayoutEffect(() => {
    // Ensure viewport always starts at top on load / refresh
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      const haulo = hauloRef.current;
      const design = designRef.current;
      const think = thinkRef.current;
      const build = buildRef.current;
      const evolve = evolveRef.current;
      const worldEl = worldRef.current;
      const heroSceneEl = heroSceneRef.current;
      const heroCopyEl = heroSceneEl ? heroSceneEl.querySelector('.haulo-hero__copy') : null;
      const heroFrogEl = heroSceneEl ? heroSceneEl.querySelector('.haulo-hero__frog') : null;
      const heroFrogShadowEl = heroFrogEl ? heroFrogEl.querySelector('.haulo-hero__frog-shadow') : null;
      const heroDecoEl = heroSceneEl ? heroSceneEl.querySelector('.haulo-hero__deco') : null;
      const bottomCaptionEl = bottomCaptionRef.current;
      const progressMarker = progressMarkerRef.current;
      const fragments = fragmentsRef.current;

      if (!worldEl || !heroSceneEl) return;

      // The legacy floating word conveyor is optional: the editorial hero owns
      // the first screen now, so the list may legitimately be empty.
      const wordElements = [haulo, design, think, build, evolve].filter(Boolean);

      if (wordElements.length) {
        // Hide non-primary phrases initially and clear transforms
        gsap.set(wordElements.slice(1), {
          visibility: 'hidden',
          clearProps: 'transform'
        });
      }

      if (initialHasSplash) {
        // Lock document scroll during splash & journey
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Hero visual elements are hidden until 3D journey handoff phase (t >= 0.85)
        gsap.set(worldEl, {
          x: 0,
          y: 0,
          z: 0,
          scale: 1.035,
          rotationY: 0,
          rotationX: 0,
          rotationZ: 0,
          transformOrigin: '50% 50%'
        });

        // HAULO typography hidden during splash & journey
        if (haulo) {
          gsap.set(haulo, {
            z: 0,
            scale: 1.0,
            opacity: 0,
            visibility: 'hidden'
          });
        }

        // HUD elements hidden during splash & journey
        if (headerContainerRef.current) gsap.set(headerContainerRef.current, { y: 0, opacity: 0, visibility: 'hidden' });
        if (leftRailContainerRef.current) gsap.set(leftRailContainerRef.current, { x: 0, opacity: 0, visibility: 'hidden' });
        if (rightRailContainerRef.current) gsap.set(rightRailContainerRef.current, { x: 0, opacity: 0, visibility: 'hidden' });
        if (bottomCaptionContainerRef.current) gsap.set(bottomCaptionContainerRef.current, { y: 0, opacity: 0, visibility: 'hidden' });
        if (calloutTrRef.current) gsap.set(calloutTrRef.current, { opacity: 0, visibility: 'hidden' });
        if (calloutBlRef.current) gsap.set(calloutBlRef.current, { opacity: 0, visibility: 'hidden' });
        if (calloutBrRef.current) gsap.set(calloutBrRef.current, { opacity: 0, visibility: 'hidden' });
      } else {
        // Direct landing without splash: initialize to standard hero first frame
        if (haulo) {
          gsap.fromTo(
            haulo,
            { opacity: 0 },
            { opacity: 1, duration: 0.7, ease: 'power2.out' }
          );
        }
      }

      // Cache word dimensions for precise centering
      let cachedDims = wordElements.map((el) => ({
        width: el.offsetWidth || 400,
        height: el.offsetHeight || 150
      }));

      // Cache dynamic geometry
      let geo = computeGeometry();

      const refreshDims = () => {
        cachedDims = wordElements.map((el) => ({
          width: el.offsetWidth || 400,
          height: el.offsetHeight || 150
        }));

        geo = computeGeometry();
      };

      refreshDimsFnRef.current = refreshDims;
      refreshDims();
      window.addEventListener('resize', refreshDims);
      const dimTimer = setTimeout(refreshDims, 150);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refreshDims).catch(() => {});
      }

      // CACHED GSAP QUICKSETTERS FOR 60FPS PERFORMANCE
      const wordSetters = wordElements.map((el) => ({
        x: gsap.quickSetter(el, 'x', 'px'),
        y: gsap.quickSetter(el, 'y', 'px'),
        z: gsap.quickSetter(el, 'z', 'px'),
        scale: gsap.quickSetter(el, 'scale'),
        rotationX: gsap.quickSetter(el, 'rotationX', 'deg'),
        rotationY: gsap.quickSetter(el, 'rotationY', 'deg'),
        rotationZ: gsap.quickSetter(el, 'rotationZ', 'deg'),
        opacity: gsap.quickSetter(el, 'opacity'),
        visibility: gsap.quickSetter(el, 'visibility')
      }));

      // Grounded frog preview setters
      const frogElements = [
        hauloFrogRef.current,
        designFrogRef.current,
        thinkFrogRef.current,
        buildFrogRef.current,
        evolveFrogRef.current
      ];

      const frogSetters = frogElements.map((el) =>
        el
          ? {
              x: gsap.quickSetter(el, 'x', 'px'),
              y: gsap.quickSetter(el, 'y', 'px'),
              scaleX: gsap.quickSetter(el, 'scaleX'),
              scaleY: gsap.quickSetter(el, 'scaleY'),
              rotation: gsap.quickSetter(el, 'rotation', 'deg'),
              opacity: gsap.quickSetter(el, 'opacity')
            }
          : null
      );

      const frogShadowSetters = frogElements.map((el) => {
        const shadow = el ? el.querySelector('.frog-floor-shadow') : null;
        return shadow
          ? {
              y: gsap.quickSetter(shadow, 'y', 'px'),
              scaleX: gsap.quickSetter(shadow, 'scaleX'),
              scaleY: gsap.quickSetter(shadow, 'scaleY'),
              opacity: gsap.quickSetter(shadow, 'opacity')
            }
          : null;
      });

      const worldSetters = {
        x: gsap.quickSetter(worldEl, 'x', 'px'),
        y: gsap.quickSetter(worldEl, 'y', 'px'),
        scale: gsap.quickSetter(worldEl, 'scale'),
        rotationY: gsap.quickSetter(worldEl, 'rotationY', 'deg'),
        rotationX: gsap.quickSetter(worldEl, 'rotationX', 'deg'),
        rotationZ: gsap.quickSetter(worldEl, 'rotationZ', 'deg')
      };

      // 3D Space Ring Spline Conveyor Setters & State
      const spaceWorldEl = spaceWorldRef.current;
      const SPACE_COUNT = SPACE_ITEMS.length;

      const ringEls = (ringRefs.current && ringRefs.current.filter(Boolean).length === SPACE_COUNT)
        ? ringRefs.current
        : Array.from(spaceWorldEl ? spaceWorldEl.querySelectorAll('.space-ring-item') : []);
      const cylinderEls = (cylinderRefs.current && cylinderRefs.current.filter(Boolean).length === SPACE_COUNT)
        ? cylinderRefs.current
        : Array.from(spaceWorldEl ? spaceWorldEl.querySelectorAll('.space-ring-cylinder') : []);
      const badgeEls = (badgeRefs.current && badgeRefs.current.filter(Boolean).length === SPACE_COUNT)
        ? badgeRefs.current
        : Array.from(spaceWorldEl ? spaceWorldEl.querySelectorAll('.ring-view-case-badge') : []);

      const ringSetters = ringEls.map((el) => ({
        x: gsap.quickSetter(el, 'x', 'px'),
        y: gsap.quickSetter(el, 'y', 'px'),
        z: gsap.quickSetter(el, 'z', 'px'),
        scale: gsap.quickSetter(el, 'scale'),
        rotationX: gsap.quickSetter(el, 'rotationX', 'deg'),
        rotationY: gsap.quickSetter(el, 'rotationY', 'deg'),
        rotationZ: gsap.quickSetter(el, 'rotationZ', 'deg'),
        opacity: gsap.quickSetter(el, 'opacity'),
        visibility: gsap.quickSetter(el, 'visibility')
      }));

      const cylinderSetters = cylinderEls.map((el) => ({
        rotationY: gsap.quickSetter(el, 'rotationY', 'deg')
      }));

      const badgeSetters = badgeEls.map((el) => ({
        opacity: gsap.quickSetter(el, 'opacity'),
        scale: gsap.quickSetter(el, 'scale'),
        visibility: gsap.quickSetter(el, 'visibility')
      }));

      const hoverScales = new Float32Array(SPACE_COUNT).fill(1.0);
      const badgeAlphas = new Float32Array(SPACE_COUNT).fill(0.0);
      const badgeScales = new Float32Array(SPACE_COUNT).fill(0.6);

      let mouseTiltX = 0;
      let mouseTiltY = 0;
      let targetTiltX = 0;
      let targetTiltY = 0;

      const onPointerMove = (e) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        targetTiltX = -normY * 3.5;
        targetTiltY = normX * 5.0;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      // Background element setters
      const causticsEl = causticsRef.current;
      const currentsEl = currentsRef.current;

      const causticYSetter = causticsEl ? gsap.quickSetter(causticsEl, 'y', 'px') : null;
      const causticRotSetter = causticsEl ? gsap.quickSetter(causticsEl, 'rotation', 'deg') : null;
      const currentsYSetter = currentsEl ? gsap.quickSetter(currentsEl, 'y', 'px') : null;
      const currentsScaleSetter = currentsEl ? gsap.quickSetter(currentsEl, 'scale') : null;

      const progressSetter = progressMarker ? gsap.quickSetter(progressMarker, 'scaleY') : null;

      function getHeroWorldTransform(localT) {
        let rotY = 0;
        let rotX = 0;
        let rotZ = 0;
        let scale = 1.0;
        let x = 0;
        let y = 0;

        if (localT < 0.50) {
          const norm = Math.max(0, localT / 0.50);
          const ease = Math.sin((norm * Math.PI) / 2);

          rotY = -2.0 * (1 - ease);
          rotX = 1.0 * (1 - ease);
          rotZ = 0.5 * (1 - ease);
          scale = 1.015 + (1.035 - 1.015) * ease;
          x = (1.5 * (1 - ease) * geo.vw) / 100;
          y = (1.0 * (1 - ease) * geo.vh) / 100;
        } else {
          const norm = Math.min(1, (localT - 0.50) / 0.50);
          const ease = norm * norm;

          rotY = 2.5 * ease;
          rotX = -0.8 * ease;
          rotZ = -0.7 * ease;
          scale = 1.035 - (1.035 - 1.01) * norm;
          x = (-1.5 * ease * geo.vw) / 100;
          y = (-0.6 * ease * geo.vh) / 100;
        }

        return { rotY, rotX, rotZ, scale, x, y };
      }

      // =======================================================================
      // MASTER CHRONOLOGICAL MILESTONE RANGES (CONTINUOUS 3D SHOWCASE)
      // 1. Conveyor Words (HAULO, DESIGN, THINK, BUILD, EVOLVE): 0.00 -> 0.13
      // 2. HAULO Editorial Hero (HAULO / SYS / INT / FWD): 0.14 -> 0.25 (holds at 0.19)
      // 3. 3D Space Ring Spline Conveyor: 0.24 -> 1.00 (Continuous 3D stream)
      //    Ring 0 (Portfolio Intro): 0.24 -> 0.40 (focal center at 0.24)
      //    Ring 1 (Theory of Bloom): 0.38 -> 0.58 (focal center at 0.43)
      //    Ring 2 (Stakor):          0.52 -> 0.74 (focal center at 0.61)
      //    Ring 3 (Think):           0.68 -> 0.90 (focal center at 0.79)
      //    Ring 4 (Build):           0.82 -> 1.00 (focal center at 0.98)
      // =======================================================================
      // MASTER CHRONOLOGICAL MILESTONE RANGES (SMOOTH STEPPED CONVEYOR)
      // 1. Conveyor Words (HAULO, DESIGN, THINK, BUILD, EVOLVE): 0.00 -> 0.36
      //    Word 0 (HAULO):      center at 0.00
      //    Word 1 (DESIGN TO):  center at 0.09
      //    Word 2 (THINK):      center at 0.18
      //    Word 3 (BUILD):      center at 0.27
      //    Word 4 (AND EVOLVE): center at 0.36
      //    Hold & sink Word 4:  0.36 -> 0.42
      // 2. HAULO Editorial Hero: 0.41 -> 0.53 (holds at 0.48)
      // 3. 3D Space Ring Spline Conveyor: 0.52 -> 0.98
      // =======================================================================
      const WORD_SPACING = 0.60;
      const WORD_OFFSETS = [
        0,
        WORD_SPACING,
        2 * WORD_SPACING,
        3 * WORD_SPACING,
        4 * WORD_SPACING
      ];
      const TOTAL_HERO_TRAVEL = WORD_OFFSETS[4];

      // 1) Conveyor pacing (Evenly distributed 5 words across 0.00 -> 0.36)
      const TYPO_END = 0.36;
      const WORD_STEP = TYPO_END / 4; // 0.09 per word transition
      const CONVEYOR_SCENE_END = 0.44; // Word sinks down, frog vaults up into Editorial Hero

      // 2) Editorial hero scene (Enters from top side without blur or opacity style)
      const HERO_ENTER_START = 0.38;
      const HERO_ENTER_END = 0.43;
      const HERO_HOLD_END = 0.48;
      const HERO_EXIT_END = 0.52; // Editorial Hero copy completely sinks down & fades out by 0.52

      // 3) Continuous 3D Space Spline Conveyor (NextSection.jsx: comes from top side into clear stage)
      const SPACE_START = 0.53; // Space activates after Editorial Hero exits cleanly
      const SPACE_FOCUS_START = 0.60; // Ring 0 lands in center focus
      const SPACE_END = 0.98;
      // Purposeful, generous gaps between space projects:
      // Ring 0 (0-space-portfolio intro): 0.00
      // Ring 1 (Theory of Bloom): 0.80
      // Ring 2 (Stakor): 1.60
      // Ring 3 (Think / Awkn): 2.40
      // Ring 4 (Build / Truly Bare): 3.20
      const RING_OFFSETS = [
        0.00,
        0.80,
        1.60,
        2.40,
        3.20
      ];
      const TOTAL_SPACE_TRAVEL = 0.50 + RING_OFFSETS[SPACE_COUNT - 1];
      let currentGlobalProgress = 0;

      // Snappy micro-animation when landing on a new word after jumping
      const playPinkLineLandingAnim = () => {
        if (landingAnimTimelineRef.current) {
          landingAnimTimelineRef.current.kill();
        }

        const tl = gsap.timeline();
        landingAnimTimelineRef.current = tl;

        const paths = [trLinePathRef.current, blLinePathRef.current, brLinePathRef.current].filter(Boolean);
        const dots = [
          trStartDotRef.current,
          trEndDotRef.current,
          blStartDotRef.current,
          blEndDotRef.current,
          brStartDotRef.current,
          brEndDotRef.current
        ].filter(Boolean);
        const trText = trTextGroupRef.current;
        const blText = blTextGroupRef.current;
        const brText = brTextGroupRef.current;

        // Reset paths to hidden dashoffset for clean draw animation
        tl.set(paths, {
          strokeDasharray: 180,
          strokeDashoffset: 180,
          opacity: 0,
        });
        tl.set(dots, {
          scale: 0.3,
          opacity: 0,
          transformOrigin: 'center center',
        });

        // 1. Draw in the leader lines from word towards callouts
        tl.to(paths, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
          stagger: 0.03,
        }, 0);

        // 2. Pop in terminal reticle dots with snappy spring
        tl.to(dots, {
          scale: 1,
          opacity: 1,
          duration: 0.22,
          ease: 'back.out(2.4)',
          stagger: 0.03,
        }, 0.10);

        // 3. Subtle slide + reveal on callout text annotations
        if (trText) {
          tl.fromTo(trText,
            { opacity: 0, x: 6 },
            { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' },
            0.08
          );
        }
        if (blText) {
          tl.fromTo(blText,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' },
            0.08
          );
        }
        if (brText) {
          tl.fromTo(brText,
            { opacity: 0, x: 6 },
            { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' },
            0.08
          );
        }
      };

      function updateConveyor(globalProgress) {
        if (progressMarkerRef.current?.updateProgress) {
          progressMarkerRef.current.updateProgress(globalProgress);
        } else if (progressSetter) {
          progressSetter(globalProgress);
        }

        if (leftProgressMarkerRef.current?.updateProgress) {
          leftProgressMarkerRef.current.updateProgress(globalProgress);
        }

        // ---------------------------------------------------------------------
        // 1) HERO TYPOGRAPHY STAGE (0.00 -> 0.32)
        // ---------------------------------------------------------------------
        let activeHeroLocalT = 0.50;
        let minHeroDist = 999;
        let lastWordDownEase = 0;
        const frogProxByIndex = {};

        wordElements.forEach((el, index) => {
          let localProgress = globalProgress * (TOTAL_HERO_TRAVEL / TYPO_END) - WORD_OFFSETS[index] + 0.50;

          if (index === 4 && localProgress > 0.50) {
            localProgress = 0.50;
          }

          const dist = Math.abs(localProgress - 0.50);
          if (dist < minHeroDist && localProgress >= 0.00 && localProgress <= 1.00) {
            minHeroDist = dist;
            activeHeroLocalT = localProgress;
          }

          if (localProgress < 0.00 || localProgress > 1.00 || globalProgress > CONVEYOR_SCENE_END) {
            wordSetters[index].opacity(0);
            wordSetters[index].visibility('hidden');
            frogProxByIndex[index] = 0;
            return;
          }

          // NO BLUR WHEN WORD IN AND OUT: Crisp solid opacity across entire visible flight
          let wordAlpha = 1;

          const pacedT = paceProgress(localProgress);
          const tf = evaluateTrack(pacedT, cachedDims[index].width, cachedDims[index].height);

          // Word 0 (HAULO) sits at natural height; words 1-4 centered gracefully behind the frog
          if (index === 0) {
            tf.y += window.innerHeight * (geo.isMobile ? 0.04 : 0.038);
          } else {
            tf.y += window.innerHeight * (geo.isMobile ? 0.06 : 0.16);
          }

          // Last word (AND EVOLVE): moves to DOWN SIDE with size decreasing equal to scroll
          let lastWordJumpScale = 1;
          if (index === 4) {
            // Fine-tune horizontal alignment so center letter 'E' sits directly behind the frog at center
            tf.x += window.innerWidth * 0.022;

            // As user scrolls past TYPO_END (0.36), scroll directly decreases size and moves word down
            const downRaw = (globalProgress - TYPO_END) / (CONVEYOR_SCENE_END - TYPO_END);
            const downP = Math.max(0, Math.min(1, downRaw));
            lastWordDownEase = downP;

            if (downP > 0) {
              // Word moves to down position while scroll equally decreases size
              tf.y += downP * (window.innerHeight * 1.35);
              lastWordJumpScale = Math.max(0.18, 1.0 - 0.78 * downP); // directly scales down to 0.22 with scroll
              wordAlpha = downP >= 1 ? 0 : 1;
            }

            const currentWordScale = tf.scale * lastWordJumpScale;

            // Direct gsap.set ensures scale, scaleX, and scaleY are compiled into DOM transform matrix
            gsap.set(el, {
              x: tf.x,
              y: tf.y,
              z: tf.z,
              scale: currentWordScale,
              scaleX: currentWordScale,
              scaleY: currentWordScale,
              transformOrigin: '50% 50%',
              rotationX: 0,
              rotationY: tf.rotationY,
              rotationZ: tf.rotationZ,
              opacity: wordAlpha,
              visibility: wordAlpha > 0.005 ? 'visible' : 'hidden'
            });
          } else {
            wordSetters[index].x(tf.x);
            wordSetters[index].y(tf.y);
            wordSetters[index].z(tf.z);
            wordSetters[index].scale(tf.scale * lastWordJumpScale);
            wordSetters[index].rotationX(0);
            wordSetters[index].rotationY(tf.rotationY);
            wordSetters[index].rotationZ(tf.rotationZ);
            wordSetters[index].opacity(wordAlpha);
            wordSetters[index].visibility(wordAlpha > 0.005 ? 'visible' : 'hidden');
          }

          // Crossfade the grounded frog preview by proximity of its word to viewport center
          const frogSpacing = WORD_SPACING;
          const frogP = Math.max(0, 1 - dist / frogSpacing);
          const frogSmooth = frogP * frogP * (3 - 2 * frogP);
          let lastWordFrogFade = 1;
          if (index === 4 && lastWordDownEase > 0) {
            // Keep frog fully visible throughout upward jump into NextSection.jsx, fade out at top boundary
            const frogTopFade = Math.max(0, (lastWordDownEase - 0.88) / 0.12);
            lastWordFrogFade = Math.max(0, 1 - frogTopFade * frogTopFade);
          }
          frogProxByIndex[index] = frogSmooth * lastWordFrogFade;
        });

        // ---------------------------------------------------------------------
        // FROG JUMP KINEMATICS & BALLISTIC TRAJECTORY (1.0s JUMP BETWEEN WORDS)
        // Whenever transitioning to next word, the mechanical frog vaults into
        // the air, morphs mid-flight, and lands as the next word arrives in center.
        // ---------------------------------------------------------------------
        let frogJumpY = 0;
        let frogScaleX = 1.0;
        let frogScaleY = 1.0;
        let frogRot = 0;

        if (globalProgress <= TYPO_END) {
          const pRel = globalProgress / WORD_STEP;
          const baseStep = Math.floor(pRel);
          if (baseStep < 4) {
            const frac = Math.max(0, Math.min(1, pRel - baseStep));
            const jumpSin = Math.sin(Math.PI * frac);

            // Ballistic vertical jump arc (vaults up into the air)
            const jumpHeight = Math.min(230, window.innerHeight * 0.26);
            frogJumpY = -jumpHeight * Math.pow(jumpSin, 0.85);

            // Dynamic rotation: pitch up during launch, pitch down into landing
            frogRot = -7 * Math.sin(Math.PI * (frac - 0.22) * 1.4) * jumpSin;

            // Character squash & stretch
            if (frac < 0.14) {
              // Crouch anticipation
              const crouchP = Math.sin((frac / 0.14) * Math.PI);
              frogScaleX = 1.0 + 0.07 * crouchP;
              frogScaleY = 1.0 - 0.09 * crouchP;
            } else if (frac > 0.86) {
              // Landing impact squash
              const landP = Math.sin(((frac - 0.86) / 0.14) * Math.PI);
              frogScaleX = 1.0 + 0.08 * landP;
              frogScaleY = 1.0 - 0.10 * landP;
            } else {
              // In-flight aerodynamic stretch
              frogScaleX = 1.0 - 0.05 * jumpSin;
              frogScaleY = 1.0 + 0.09 * jumpSin;
            }
          }
        }

        // Apply physical jump transforms & crossfade to every grounded frog preview
        frogSetters.forEach((frogSet, index) => {
          if (!frogSet) return;
          const alpha = frogProxByIndex[index] || 0;
          let currentFrogY = frogJumpY;
          let currentScaleX = frogScaleX;
          let currentScaleY = frogScaleY;
          let currentRot = frogRot;

          // For the final frog transitioning to NextSection.jsx:
          if (index === 4 && lastWordDownEase > 0) {
            // Frog ONLY jumps to top (vaults upward through top of screen into NextSection.jsx)
            currentFrogY = -lastWordDownEase * (window.innerHeight * 1.45);
            if (lastWordDownEase < 0.14) {
              const crouch = Math.sin((lastWordDownEase / 0.14) * Math.PI);
              currentScaleX = 1.0 + 0.12 * crouch;
              currentScaleY = 1.0 - 0.15 * crouch;
              currentRot = 4 * crouch;
            } else {
              const leapSin = Math.sin(Math.min(1, (lastWordDownEase - 0.14) / 0.86) * Math.PI);
              currentScaleX = 1.0 - 0.14 * leapSin;
              currentScaleY = 1.0 + 0.28 * leapSin;
              currentRot = -10 * leapSin;
            }
          }

          frogSet.x(0);
          frogSet.y(currentFrogY);
          frogSet.scaleX(currentScaleX);
          frogSet.scaleY(currentScaleY);
          frogSet.rotation(currentRot);
          frogSet.opacity(alpha);

          // Counter-translate the floor shadow so it remains grounded on the floor while frog is airborne
          const shadowSet = frogShadowSetters[index];
          if (shadowSet) {
            shadowSet.y(-currentFrogY);

            // Calculate jump elevation ratio for realistic shadow diffusion
            const maxElevation = Math.max(1, Math.min(230, window.innerHeight * 0.26));
            const elevationFrac = Math.max(0, Math.min(1, Math.abs(currentFrogY) / maxElevation));

            // Shadow contracts slightly and softens when frog is high in the air
            let shadowScale = 1.0 - 0.22 * elevationFrac;
            let shadowAlpha = 1.0 - 0.40 * elevationFrac;

            if (index === 4 && lastWordDownEase > 0) {
              // As the last frog leaves into space, its floor shadow fades out
              shadowAlpha *= Math.max(0, 1.0 - lastWordDownEase * 2.5);
              shadowScale *= Math.max(0.2, 1.0 - lastWordDownEase * 0.8);
            }

            shadowSet.scaleX(shadowScale);
            shadowSet.scaleY(shadowScale);
            shadowSet.opacity(shadowAlpha);
          }
        });

        // ---------------------------------------------------------------------
        // 2) HAULO EDITORIAL HERO
        // "next section coming from top side without blur or opacity style"
        // "then next section frog summing to space"
        // ---------------------------------------------------------------------
        let heroAlpha = 0;
        let heroYPercent = -105;

        if (globalProgress >= HERO_ENTER_START && globalProgress <= HERO_EXIT_END) {
          heroAlpha = 1; // Solid 100% opacity without blur or opacity style!

          if (globalProgress < HERO_ENTER_END) {
            // Coming from TOP SIDE (-105% down to 0%)
            const tEnter = (globalProgress - HERO_ENTER_START) / (HERO_ENTER_END - HERO_ENTER_START);
            const easeEnter = tEnter * tEnter * (3 - 2 * tEnter);
            heroYPercent = geo.isMobile ? -20 * (1 - easeEnter) : -105 * (1 - easeEnter);
            heroAlpha = geo.isMobile ? easeEnter : 1;
          } else {
            heroYPercent = 0;
          }
        }

        gsap.set(heroSceneEl, {
          xPercent: 0,
          yPercent: heroYPercent,
          scale: 1,
          rotationZ: 0,
          autoAlpha: heroAlpha
        });

        if (globalProgress <= HERO_HOLD_END) {
          if (heroCopyEl) gsap.set(heroCopyEl, { yPercent: 0, autoAlpha: 1 });
          if (heroDecoEl) gsap.set(heroDecoEl, { yPercent: 0, autoAlpha: 1 });
          if (heroFrogEl) gsap.set(heroFrogEl, { xPercent: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1 });
          if (heroFrogShadowEl) gsap.set(heroFrogShadowEl, { y: 0, opacity: 1, scale: 1 });
        } else if (globalProgress <= HERO_EXIT_END) {
          // Frog swimming into space! Copy sinks to down side!
          const tHandoff = Math.min(1, (globalProgress - HERO_HOLD_END) / (HERO_EXIT_END - HERO_HOLD_END));
          const easeHandoff = tHandoff * tHandoff * (3 - 2 * tHandoff);

          if (heroCopyEl) {
            gsap.set(heroCopyEl, {
              yPercent: 260 * easeHandoff,
              autoAlpha: Math.max(0, 1 - tHandoff * 2.2)
            });
          }
          if (heroDecoEl) {
            gsap.set(heroDecoEl, {
              yPercent: 260 * easeHandoff,
              autoAlpha: Math.max(0, 1 - tHandoff * 2.2)
            });
          }
          if (heroFrogEl) {
            // Frog swims / undulates diagonally and upward into space!
            const swimStroke = Math.sin(tHandoff * Math.PI * 3.5);
            const swimKick = Math.sin(tHandoff * Math.PI * 7.0);
            const frogSwimY = -window.innerHeight * 1.25 * easeHandoff + 22 * swimStroke;
            gsap.set(heroFrogEl, {
              xPercent: -35 * easeHandoff,
              y: frogSwimY,
              scale: (1.0 - 0.48 * easeHandoff) * (1.0 + 0.04 * swimKick),
              rotation: -14 + 8 * swimStroke,
              autoAlpha: Math.max(0, 1 - Math.max(0, (tHandoff - 0.88) / 0.12))
            });

            if (heroFrogShadowEl) {
              const shadowAlpha = Math.max(0, 1.0 - tHandoff * 3.2);
              const shadowScale = Math.max(0.1, 1.0 - tHandoff * 1.5);
              gsap.set(heroFrogShadowEl, {
                y: -frogSwimY,
                opacity: shadowAlpha,
                scale: shadowScale
              });
            }
          }
        }

        // Play the EditorialHero entrance exactly once, as the scene takes over.
        if (!heroIntroPlayedRef.current && globalProgress >= HERO_ENTER_START) {
          heroIntroPlayedRef.current = true;
          heroSectionRef.current?.playIntro?.();
        }

        // ---------------------------------------------------------------------
        // 3) CONTINUOUS 3D SPACE MECH RING SPLINE CONVEYOR (NextSection.jsx)
        // Comes from top side without blur or opacity style
        // ---------------------------------------------------------------------
        if (spaceWorldEl) {
          const sVisible = globalProgress >= SPACE_START;
          gsap.set(spaceWorldEl, {
            autoAlpha: sVisible ? 1 : 0, // Solid 100% opacity without blur or opacity style!
            pointerEvents: sVisible ? 'auto' : 'none'
          });
        }

        let travel = 0;
        if (globalProgress >= SPACE_START) {
          if (globalProgress <= SPACE_FOCUS_START) {
            // Space image comes from top side (-70vh) down into center (0vh)
            const pIntro = (globalProgress - SPACE_START) / (SPACE_FOCUS_START - SPACE_START);
            const easeIntro = pIntro * pIntro * (3 - 2 * pIntro);
            travel = 0.00 + 0.50 * easeIntro;
          } else {
            // Continuous browsing through all remaining rings in NextSection
            const pBrowse = Math.min(1, (globalProgress - SPACE_FOCUS_START) / (SPACE_END - SPACE_FOCUS_START));
            travel = 0.50 + pBrowse * (TOTAL_SPACE_TRAVEL - 0.50);
          }
        }

        let sumWeight = 0;
        let sumX = 0;
        let sumY = 0;

        for (let i = 0; i < SPACE_COUNT; i++) {
          const localT = travel - RING_OFFSETS[i];
          const rSetter = ringSetters[i];
          const cSetter = cylinderSetters[i];
          const bSetter = badgeSetters[i];

          if (!rSetter) continue;

          // Interactive Hover Zoom & VIEW CASE Badge Animation
          const isHovered = (hoveredRingIndexRef.current === i);
          const targetHoverScale = isHovered ? 1.08 : 1.0;
          const targetBadgeAlpha = isHovered ? 1.0 : 0.0;
          const targetBadgeScale = isHovered ? 1.0 : 0.6;

          hoverScales[i] += (targetHoverScale - hoverScales[i]) * 0.16;
          badgeAlphas[i] += (targetBadgeAlpha - badgeAlphas[i]) * 0.16;
          badgeScales[i] += (targetBadgeScale - badgeScales[i]) * 0.16;

          // Strictly hide inactive rings outside visible viewport bounds
          if (localT < -0.08 || localT > 1.08 || globalProgress < SPACE_START) {
            rSetter.opacity(0);
            rSetter.visibility('hidden');
            if (bSetter) {
              bSetter.opacity(0);
              bSetter.visibility('hidden');
            }
            continue;
          }

          // Smooth harmonic pacing around focal center (localT = 0.50)
          const clampedT = Math.max(0, Math.min(1, localT));
          const pacedT = paceRingProgress(clampedT);
          const tf = evaluateRingSpline(pacedT, geo);

          // Graceful fade at entry and exit so projects transition cleanly with generous breathing room
          let ringAlpha = 1;
          if (localT < 0.08) {
            ringAlpha = Math.max(0, localT / 0.08);
          } else if (localT > 0.88) {
            ringAlpha = Math.max(0, 1 - (localT - 0.88) / 0.16);
          }


          rSetter.x(tf.x);
          rSetter.y(tf.y);
          rSetter.z(tf.z);
          rSetter.scale(tf.scale * hoverScales[i]);
          rSetter.rotationX(0);
          rSetter.rotationY(0);
          rSetter.rotationZ(0);
          rSetter.opacity(ringAlpha);
          rSetter.visibility(ringAlpha > 0.001 ? 'visible' : 'hidden');

          if (cSetter) {
            cSetter.rotationY(0);
          }

          if (bSetter) {
            bSetter.opacity(badgeAlphas[i]);
            if (bSetter.scale) bSetter.scale(badgeScales[i]);
            bSetter.visibility(badgeAlphas[i] > 0.005 ? 'visible' : 'hidden');
          }

          // Camera focus weighting for smooth tracking
          if (localT >= 0.20 && localT <= 0.80) {
            const normDist = Math.abs(localT - 0.50) / 0.30;
            if (normDist < 1.0) {
              const w = 1.0 - normDist;
              const focusWeight = w * w * (3 - 2 * w);
              sumWeight += focusWeight;
              sumX += tf.x * focusWeight;
              sumY += tf.y * focusWeight;
            }
          }
        }

        // ---------------------------------------------------------------------
        // 4) CAMERA RIG & WORLD TRANSFORM BLENDING
        // ---------------------------------------------------------------------
        let wTf = { x: 0, y: 0, scale: 1.0, rotY: 0, rotX: 0, rotZ: 0 };

        if (globalProgress <= TYPO_END) {
          wTf = getHeroWorldTransform(activeHeroLocalT);
        } else if (globalProgress <= HERO_EXIT_END) {
          const tNorm = (globalProgress - TYPO_END) / (HERO_EXIT_END - TYPO_END);
          const sinV = Math.sin(tNorm * Math.PI);
          wTf.rotX = -1.8 * sinV;
          wTf.rotY = 0.7 * sinV;
          wTf.rotZ = -0.3 * sinV;
          wTf.scale = 1.03 - 0.015 * sinV;
        } else {
          let camX = 0;
          let camY = 0;
          if (sumWeight > 0.001) {
            camX = (sumX / sumWeight) * 0.035 * (geo.isMobile ? 0.6 : 1.0);
            camY = (sumY / sumWeight) * 0.02 * (geo.isMobile ? 0.6 : 1.0);
          }

          wTf.x = -camX;
          wTf.y = -camY;
          wTf.scale = 1.01;
          wTf.rotX = Math.max(-1.5, Math.min(1.5, (camY / 15) * 0.5));
          wTf.rotY = Math.max(-1.2, Math.min(1.2, (-camX / 15) * 0.5));
          wTf.rotZ = 0;
        }

        worldSetters.x(wTf.x);
        worldSetters.y(wTf.y);
        worldSetters.scale(wTf.scale);
        worldSetters.rotationY(wTf.rotY);
        worldSetters.rotationX(wTf.rotX);
        worldSetters.rotationZ(wTf.rotZ);

        // ---------------------------------------------------------------------
        // 6) FLOATING FRAGMENTS PARALLAX (Persistent across scenes)
        // ---------------------------------------------------------------------
        if (fragments && fragments.length >= 12) {
          const extraY = globalProgress > TYPO_END ? (globalProgress - TYPO_END) * 200 : 0;
          gsap.set(fragments[0], { x: -60 * globalProgress, y: -40 * globalProgress + extraY * 0.8, rotation: 25 * globalProgress });
          gsap.set(fragments[2], { x: -90 * globalProgress, y: 30 * globalProgress + extraY * 0.5, rotation: -35 * globalProgress });
          gsap.set(fragments[3], { x: -50 * globalProgress, y: 60 * globalProgress + extraY * 0.5, rotation: 15 * globalProgress });
          gsap.set(fragments[1], { x: 70 * globalProgress, y: -50 * globalProgress + extraY * 0.8, rotation: -45 * globalProgress });
          gsap.set(fragments[4], { x: 40 * globalProgress, y: 80 * globalProgress + extraY * 0.5, rotation: 60 * globalProgress });
          gsap.set(fragments[5], { x: 80 * globalProgress, y: -30 * globalProgress + extraY * 0.8, rotation: -20 * globalProgress });
          gsap.set(fragments[6], { x: 100 * globalProgress, y: 50 * globalProgress + extraY * 0.25, rotation: -40 * globalProgress });
          gsap.set(fragments[8], { x: 70 * globalProgress, y: 90 * globalProgress + extraY * 0.25, rotation: 50 * globalProgress });
          gsap.set(fragments[9], { x: -80 * globalProgress, y: -40 * globalProgress + extraY * 0.8, rotation: 30 * globalProgress });
          gsap.set(fragments[11], { x: -60 * globalProgress, y: 70 * globalProgress + extraY * 0.25, rotation: -45 * globalProgress });
        }

        // ---------------------------------------------------------------------
        // 8) UNDERWATER AQUATIC FLUID MOTION PARALLAX
        // ---------------------------------------------------------------------
        if (causticYSetter) {
          causticYSetter(globalProgress * -160);
          causticRotSetter(globalProgress * 6);
        }
        if (currentsYSetter) {
          currentsYSetter(globalProgress * 120);
          currentsScaleSetter(1 + globalProgress * 0.07);
        }

        // ---------------------------------------------------------------------
        // 9) TECHNICAL CORNER CALLOUTS & FLOOR HUD (PERSISTENT ACROSS WORDS & EDITORIAL HERO)
        // ---------------------------------------------------------------------
        let calloutAlpha = 1;
        if (globalProgress > HERO_HOLD_END) {
          const tFade = Math.min(1, (globalProgress - HERO_HOLD_END) / (HERO_EXIT_END - HERO_HOLD_END));
          calloutAlpha = Math.max(0, 1 - tFade);
        }
        if (calloutTrRef.current) gsap.set(calloutTrRef.current, { autoAlpha: calloutAlpha });
        if (calloutBlRef.current) gsap.set(calloutBlRef.current, { autoAlpha: calloutAlpha });

        // Bottom-Right Callout (OBJECT_001 HAULO FROG) is only on Word 0, fades out on Word 1 transition
        let calloutBrAlpha = 0;
        if (globalProgress <= WORD_STEP * 0.9) {
          const tBr = Math.min(1, globalProgress / (WORD_STEP * 0.7));
          calloutBrAlpha = 1 - tBr;
        }
        if (calloutBrRef.current) gsap.set(calloutBrRef.current, { autoAlpha: calloutBrAlpha });

        // Dynamic callout copy synchronized with active word and Editorial Hero
        let activeWordIdx = 0;
        if (globalProgress < HERO_ENTER_START) {
          activeWordIdx = Math.max(0, Math.min(4, Math.round(globalProgress / WORD_STEP)));
        } else if (globalProgress <= HERO_EXIT_END) {
          activeWordIdx = 5; // Editorial Hero (matches reference media_1791543610636_8aae770f.jpg)
        }
        const calloutData = WORD_CALLOUTS[activeWordIdx];
        if (calloutData) {
          if (calloutTrSubRef.current && calloutTrSubRef.current.textContent !== calloutData.trSub) {
            calloutTrSubRef.current.textContent = calloutData.trSub;
          }
          if (calloutBlBrandRef.current && calloutBlBrandRef.current.textContent !== calloutData.blBrand) {
            calloutBlBrandRef.current.textContent = calloutData.blBrand;
          }
          if (calloutBlSupRef.current && calloutBlSupRef.current.textContent !== calloutData.blBrandSup) {
            calloutBlSupRef.current.textContent = calloutData.blBrandSup;
          }
          if (calloutBlLine1Ref.current && calloutBlLine1Ref.current.textContent !== calloutData.blLine1) {
            calloutBlLine1Ref.current.textContent = calloutData.blLine1;
          }
          if (calloutBlLine2Ref.current && calloutBlLine2Ref.current.textContent !== calloutData.blLine2) {
            calloutBlLine2Ref.current.textContent = calloutData.blLine2;
          }
          if (calloutBlColorBarRef.current) {
            calloutBlColorBarRef.current.style.display = calloutData.hasColorBar ? 'flex' : 'none';
          }
          if (calloutBlBar1Ref.current && calloutBlBar2Ref.current && calloutData.barColors) {
            calloutBlBar1Ref.current.style.backgroundColor = calloutData.barColors.bar1;
            calloutBlBar2Ref.current.style.backgroundColor = calloutData.barColors.bar2;
          }

          // Dynamically adjust callout position & leader line path to match current word & figure
          if (calloutTrRef.current && calloutData.trPos) {
            calloutTrRef.current.style.top = calloutData.trPos.top;
            calloutTrRef.current.style.right = calloutData.trPos.right;
          }
          if (calloutBlRef.current && calloutData.blPos) {
            calloutBlRef.current.style.left = calloutData.blPos.left;
            calloutBlRef.current.style.bottom = calloutData.blPos.bottom;
            calloutBlRef.current.style.flexDirection = calloutData.blFlexDirection || 'column';
            calloutBlRef.current.style.alignItems = calloutData.blAlignItems || 'flex-start';
            calloutBlRef.current.style.gap = calloutData.blGap || '3px';
          }
          if (blSvgRef.current && calloutData.blSvgSize) {
            blSvgRef.current.setAttribute('width', calloutData.blSvgSize.width);
            blSvgRef.current.setAttribute('height', calloutData.blSvgSize.height);
            blSvgRef.current.setAttribute('viewBox', calloutData.blSvgSize.viewBox);
          }
          if (trLinePathRef.current && calloutData.trPath) {
            trLinePathRef.current.setAttribute('d', calloutData.trPath);
          }
          if (blLinePathRef.current && calloutData.blPath) {
            blLinePathRef.current.setAttribute('d', calloutData.blPath);
          }
          if (trStartDotRef.current && calloutData.trStartDot) {
            trStartDotRef.current.setAttribute('cx', calloutData.trStartDot.cx);
            trStartDotRef.current.setAttribute('cy', calloutData.trStartDot.cy);
          }
          if (trEndDotRef.current && calloutData.trEndDot) {
            trEndDotRef.current.setAttribute('cx', calloutData.trEndDot.cx);
            trEndDotRef.current.setAttribute('cy', calloutData.trEndDot.cy);
          }
          if (blStartDotRef.current && calloutData.blStartDot) {
            if (calloutData.blStartDot.cx !== undefined) {
              blStartDotRef.current.setAttribute('cx', calloutData.blStartDot.cx);
              blStartDotRef.current.setAttribute('cy', calloutData.blStartDot.cy);
            } else {
              blStartDotRef.current.setAttribute('x', calloutData.blStartDot.x);
              blStartDotRef.current.setAttribute('y', calloutData.blStartDot.y);
            }
          }
          if (blEndDotRef.current && calloutData.blEndDot) {
            blEndDotRef.current.setAttribute('cx', calloutData.blEndDot.cx);
            blEndDotRef.current.setAttribute('cy', calloutData.blEndDot.cy);
          }

          // Trigger landing animation when active word changes
          if (prevActiveWordIdxRef.current !== activeWordIdx) {
            prevActiveWordIdxRef.current = activeWordIdx;
            if (!isAirborneRef.current) {
              playPinkLineLandingAnim();
            }
          }
        }

        // Word-to-word jump detection: disable pink line during jump, enable with small animation on landing
        if (globalProgress < HERO_ENTER_START) {
          const pRel = Math.min(4, globalProgress / WORD_STEP);
          const distFromCenter = Math.abs(pRel - Math.round(pRel));
          const inAirborneRange = pRel < 3.92 && distFromCenter > (isAirborneRef.current ? 0.12 : 0.16);

          if (inAirborneRange) {
            // Mid-air jump: DISABLE pink line
            if (!isAirborneRef.current) {
              isAirborneRef.current = true;
              if (landingAnimTimelineRef.current) {
                landingAnimTimelineRef.current.kill();
                landingAnimTimelineRef.current = null;
              }
              const paths = [trLinePathRef.current, blLinePathRef.current, brLinePathRef.current].filter(Boolean);
              const dots = [
                trStartDotRef.current,
                trEndDotRef.current,
                blStartDotRef.current,
                blEndDotRef.current,
                brStartDotRef.current,
                brEndDotRef.current
              ].filter(Boolean);
              gsap.set(paths, { opacity: 0, strokeDashoffset: 180 });
              gsap.set(dots, { opacity: 0 });
              if (trTextGroupRef.current) gsap.set(trTextGroupRef.current, { opacity: 0 });
              if (blTextGroupRef.current) gsap.set(blTextGroupRef.current, { opacity: 0 });
              if (brTextGroupRef.current) gsap.set(brTextGroupRef.current, { opacity: 0 });
            }
          } else {
            // Landed on a word: ENABLE with small animation
            if (isAirborneRef.current) {
              isAirborneRef.current = false;
              playPinkLineLandingAnim();
            }
          }
        } else if (globalProgress <= HERO_EXIT_END) {
          // Editorial Hero scene: ensure pink lines and HUD are fully enabled
          if (isAirborneRef.current) {
            isAirborneRef.current = false;
            playPinkLineLandingAnim();
          }
        }
      }

      // Store conveyor reference for external journey handoff
      updateConveyorFnRef.current = updateConveyor;

      // Synchronously apply initial track state at progress 0 if not waiting for splash journey
      refreshDims();
      if (!initialHasSplash) {
        updateConveyor(0);
      }

      // EXTENDED MASTER PINNED SCROLLTRIGGER ACROSS ALL 4 PHASES
      // Bottom hero CTAs + text: hide AND disable the whole bottom caption as
      // soon as the user scrolls (buttons + "WE BUILD WHAT'S NEXT." text).
      const updateHeroButtons = (progress) => {
        if (!bottomCaptionEl) return;
        const p = Math.min(1, Math.max(0, progress * 18));
        const hidden = p > 0.001;
        bottomCaptionEl.classList.toggle('is-scroll-disabled', hidden);
        gsap.set(bottomCaptionEl, {
          autoAlpha: 1 - p,
          y: 30 * p,
          pointerEvents: hidden ? 'none' : 'auto',
        });
        const btnEls = bottomCaptionEl.querySelectorAll('.hero-buttons');
        if (btnEls.length) {
          gsap.set(btnEls, {
            pointerEvents: hidden ? 'none' : 'auto',
          });
        }
      };

      const heroScrollTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        pin: pinRef.current,
        start: 'top top',
        end: window.innerWidth > 1200 ? '+=7600' : window.innerWidth > 768 ? '+=5800' : '+=4400',
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!heroActiveRef.current) return;
          updateConveyor(self.progress);
          updateHeroButtons(self.progress);
        },
        onRefresh: (self) => {
          if (!heroActiveRef.current) return;
          updateConveyor(self.progress);
          updateHeroButtons(self.progress);
        }
      });

      // =======================================================================
      // =======================================================================
      // DISCRETE SINGLE-WORD SCROLL DETENTS (1 Scroll = Frog Jump to Next Step)
      // Clean, seamless progression across words, editorial hero, and space rings.
      // NEVER locks or traps the user.
      // =======================================================================
      const SNAP_STEPS = [
        0.00,  // Word 0: HAULO
        0.09,  // Word 1: DESIGN TO
        0.18,  // Word 2: THINK
        0.27,  // Word 3: BUILD
        0.36,  // Word 4: AND EVOLVE
        0.46,  // HAULO Editorial Hero ("WE TURN BOLD IDEAS...")
        0.60,  // Space Ring 0: 0-space-portfolio.png (BROWSE OUR PORTFOLIO)
        0.695, // Space Ring 1: 01-space-theory.png (THEORY OF BLOOM)
        0.790, // Space Ring 2: 02-space-stakor.png (STAKOR)
        0.885, // Space Ring 3: 03-space-awkn.png (THINK / AWKN)
        0.980  // Space Ring 4: 04-space_truly.png (BUILD / TRULY BARE)
      ];
      let isWordAnimating = false;

      const animateToScrollY = (targetY) => {
        isWordAnimating = true;
        if (window.lenis) {
          window.lenis.scrollTo(targetY, {
            duration: 0.95,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
            lock: true,
            force: true,
            onComplete: () => {
              setTimeout(() => {
                isWordAnimating = false;
              }, 50);
            }
          });
        } else {
          const scrollProxy = { y: window.scrollY };
          gsap.to(scrollProxy, {
            y: targetY,
            duration: 0.95,
            ease: 'power3.inOut',
            overwrite: 'auto',
            onUpdate: () => {
              window.scrollTo(0, scrollProxy.y);
            },
            onComplete: () => {
              setTimeout(() => {
                isWordAnimating = false;
              }, 50);
            }
          });
        }
      };

      const handleWheel = (e) => {
        if (!heroActiveRef.current) return;
        const currentY = window.lenis ? window.lenis.scroll : window.scrollY;
        const startY = heroScrollTrigger.start;
        const totalDist = heroScrollTrigger.end - heroScrollTrigger.start;
        if (!totalDist || totalDist <= 0) return;

        // Snapping boundary: active through words, editorial hero, and all space mech rings
        const snapLimitY = startY + 1.05 * totalDist;

        if (currentY >= startY - 10 && currentY <= snapLimitY) {
          if (Math.abs(e.deltaY) < 6) return;

          if (isWordAnimating) {
            e.preventDefault();
            return;
          }

          const currentProgress = Math.max(0, (currentY - startY) / totalDist);

          if (e.deltaY > 0) {
            // Scrolling DOWN: find next step
            const nextStep = SNAP_STEPS.find((s) => s > currentProgress + 0.012);
            if (nextStep !== undefined) {
              e.preventDefault();
              const targetY = startY + nextStep * totalDist;
              animateToScrollY(targetY);
            }
          } else if (e.deltaY < 0) {
            // Scrolling UP: find previous step
            const prevStep = [...SNAP_STEPS].reverse().find((s) => s < currentProgress - 0.012);
            if (prevStep !== undefined) {
              e.preventDefault();
              const targetY = startY + prevStep * totalDist;
              animateToScrollY(targetY);
            }
          }
        }
      };

      let touchStartY = 0;
      const handleTouchStart = (e) => {
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e) => {
        if (!heroActiveRef.current || !e.touches || !e.touches[0]) return;
        const currentY = window.lenis ? window.lenis.scroll : window.scrollY;
        const startY = heroScrollTrigger.start;
        const totalDist = heroScrollTrigger.end - heroScrollTrigger.start;
        if (!totalDist || totalDist <= 0) return;

        const snapLimitY = startY + 1.05 * totalDist;
        if (currentY >= startY - 10 && currentY <= snapLimitY) {
          const deltaY = touchStartY - e.touches[0].clientY;
          if (Math.abs(deltaY) < 16) return;

          if (isWordAnimating) {
            e.preventDefault();
            return;
          }

          touchStartY = e.touches[0].clientY;
          const currentProgress = Math.max(0, (currentY - startY) / totalDist);

          if (deltaY > 0) {
            // Swipe UP -> scroll DOWN
            const nextStep = SNAP_STEPS.find((s) => s > currentProgress + 0.012);
            if (nextStep !== undefined) {
              e.preventDefault();
              const targetY = startY + nextStep * totalDist;
              animateToScrollY(targetY);
            }
          } else if (deltaY < 0) {
            // Swipe DOWN -> scroll UP
            const prevStep = [...SNAP_STEPS].reverse().find((s) => s < currentProgress - 0.012);
            if (prevStep !== undefined) {
              e.preventDefault();
              const targetY = startY + prevStep * totalDist;
              animateToScrollY(targetY);
            }
          }
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      let autoCylRotY = 0;

      const tickerUpdate = (time, deltaTime) => {
        if (!heroActiveRef.current) return;

        const dt = (deltaTime || 16.67) / 1000;
        autoCylRotY = (autoCylRotY + dt * 24) % 360;

        for (let i = 0; i < cylinderSetters.length; i++) {
          const cSetter = cylinderSetters[i];
          if (cSetter) {
            cSetter.rotationY(i === 0 ? 0 : Math.sin((autoCylRotY * Math.PI) / 180 + i * 1.2) * 6);
          }
        }

        if (currentGlobalProgress >= SPACE_START) {
          mouseTiltX += (targetTiltX - mouseTiltX) * 0.08;
          mouseTiltY += (targetTiltY - mouseTiltY) * 0.08;
          updateConveyor(currentGlobalProgress);
        }
      };
      gsap.ticker.add(tickerUpdate);

      return () => {
        if (landingAnimTimelineRef.current) {
          landingAnimTimelineRef.current.kill();
        }
        clearTimeout(dimTimer);
        window.removeEventListener('resize', refreshDims);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        gsap.ticker.remove(tickerUpdate);
      };
    });

    return () => ctx.revert();
  }, [initialHasSplash]);

  return (
    <div className="home-page-flow">
      <section className="hero-scroll" ref={heroRef}>
        <div className="hero-pin" ref={pinRef}>

        {/* ROTATING 3D CAMERA WORLD */}
        <div className="hero-camera">
          <div className="hero-world" ref={worldRef}>
            {/* PERSISTENT CLEAN WHITE ENVIRONMENT */}
            <UnderwaterBackground
              bgGridRef={bgGridRef}
              causticsRef={causticsRef}
              currentsRef={currentsRef}
            />

            {/* FOREGROUND HERO VISUALS (Explicitly hidden during splash & journey to prevent transparent canvas overlay stacked text) */}
            <div
              className={`hero-foreground-visuals ${hideHeroVisuals ? 'hero-during-journey' : ''}`}
              style={{
                visibility: hideHeroVisuals ? 'hidden' : 'visible',
                opacity: hideHeroVisuals ? 0 : 1,
                pointerEvents: hideHeroVisuals ? 'none' : 'auto',
                transition: 'opacity 0.35s ease, visibility 0.35s ease',
              }}
            >

              {/* 12 Floating Abstract Shards */}
              <FloatingFragments ref={fragmentsRef} />

              {/* 1. OPENING SCENE (Section 01 — original flying-word conveyor) */}
              <div className="hero-scene hero-scene--conveyor" ref={conveyorSceneRef}>
                <TypographyStage
                  hauloRef={hauloRef}
                  designRef={designRef}
                  thinkRef={thinkRef}
                  buildRef={buildRef}
                  evolveRef={evolveRef}
                  hauloFrogRef={hauloFrogRef}
                  designFrogRef={designFrogRef}
                  thinkFrogRef={thinkFrogRef}
                  buildFrogRef={buildFrogRef}
                  evolveFrogRef={evolveFrogRef}
                />
              </div>

              {/* 2. OUTGOING HERO SCENE (Section 01b — HAULO editorial hero) */}
              <div className="hero-scene hero-scene--editorial" ref={heroSceneRef}>
                <EditorialHero ref={heroSectionRef} deferIntro />
              </div>

              {/* 3. CONTINUOUS 3D SPACE MECH RING SPLINE CONVEYOR */}
              <NextSection
                stageRef={spaceWorldRef}
                ringRefs={ringRefs}
                cylinderRefs={cylinderRefs}
                badgeRefs={badgeRefs}
                onRingMouseEnter={(idx) => { hoveredRingIndexRef.current = idx; }}
                onRingMouseLeave={() => { hoveredRingIndexRef.current = -1; }}
              />


            </div>

          </div>
        </div>

        {/* PERSISTENT SCREEN-LOCKED HUD ELEMENTS */}
        <div
          className={`hero-hud-layer ${hideHeroVisuals ? 'hero-during-journey' : ''}`}
          style={{
            visibility: hideHeroVisuals ? 'hidden' : 'visible',
            opacity: hideHeroVisuals ? 0 : 1,
            pointerEvents: 'none',
            transition: 'opacity 0.35s ease, visibility 0.35s ease',
          }}
        >
          {/* VIEWPORT CORNER RETICLES / CURSORS (PERSISTENT ACROSS ALL SECTIONS) */}
          <span className="corner-cursor corner-cursor--tl" aria-hidden="true" />
          <span className="corner-cursor corner-cursor--tr" aria-hidden="true" />
          <span className="corner-cursor corner-cursor--bl" aria-hidden="true" />
          <span className="corner-cursor corner-cursor--br" aria-hidden="true" />

          {/* PURPOSEFUL TECHNICAL CALLOUTS WITH PINK LEADER LINES (EXACT REFERENCE PARITY) */}
          <div className="hero-callout hero-callout--tr" ref={calloutTrRef}>
            <svg className="callout-leader-line callout-leader-line--tr" width="108" height="78" viewBox="0 0 108 78" fill="none" aria-hidden="true">
              <path
                ref={trLinePathRef}
                className="pink-leader-path"
                d="M4 36 L34 10 L100 10"
                stroke="#000000"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle ref={trStartDotRef} className="pink-leader-dot" cx="4" cy="36" r="2.5" fill="#d64cff" />
              <circle ref={trEndDotRef} className="pink-leader-end" cx="100" cy="10" r="2.5" fill="#d64cff" />
            </svg>
            <div className="callout-text-group" ref={trTextGroupRef}>
              <div className="callout-header-row">
                <span className="callout-title">EST.2024</span>
              </div>
              <div className="callout-subtitle" ref={calloutTrSubRef}>SF / LDN / TYO</div>
            </div>
          </div>

          <div className="hero-callout hero-callout--bl" ref={calloutBlRef}>
            <div className="callout-text-group" ref={blTextGroupRef}>
              <div className="callout-header-row">
                <span className="callout-title">
                  <span ref={calloutBlBrandRef}>HAULO</span>
                  <sup ref={calloutBlSupRef}>TM</sup>
                </span>
              </div>
              <div className="callout-subtitle" ref={calloutBlLine1Ref}>DIGITAL / PHYSICAL / AI</div>
              <div className="callout-detail" ref={calloutBlLine2Ref}>FOR A BRIGHTER TOMORROW.</div>
              <div className="callout-hash-row">
                <svg className="callout-hash-stripes-svg" width="38" height="10" viewBox="0 0 38 10" fill="none" aria-hidden="true">
                  <path d="M6 0h3L3 10H0z M11 0h3L8 10H5z M16 0h3L13 10h-3z M21 0h3L18 10h-3z M26 0h3L23 10h-3z M31 0h3L28 10h-3z M36 0h3L33 10h-3z" fill="#000000" />
                </svg>
                <div className="callout-color-bar" ref={calloutBlColorBarRef} aria-hidden="true">
                  <span className="color-bar-cyan" ref={calloutBlBar1Ref} />
                  <span className="color-bar-pink" ref={calloutBlBar2Ref} />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-callout hero-callout--br" ref={calloutBrRef}>
            <svg className="callout-leader-line callout-leader-line--br" width="88" height="54" viewBox="0 0 88 54" fill="none" aria-hidden="true">
              <path
                ref={brLinePathRef}
                className="pink-leader-path"
                d="M4 48 L46 12 L84 12"
                stroke="#000000"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle ref={brStartDotRef} className="pink-leader-dot" cx="4" cy="48" r="2.5" fill="#d64cff" />
              <circle ref={brEndDotRef} className="pink-leader-end" cx="84" cy="12" r="2.5" fill="#d64cff" />
            </svg>
            <div className="callout-text-group" ref={brTextGroupRef}>
              <div className="callout-hash-row">
                <svg className="callout-hash-stripes-svg callout-hash-stripes-svg--br" width="63" height="10" viewBox="0 0 63 10" fill="none" aria-hidden="true">
                  <path d="M6 0h3L3 10H0z M11 0h3L8 10H5z M16 0h3L13 10h-3z M21 0h3L18 10h-3z M26 0h3L23 10h-3z M31 0h3L28 10h-3z M36 0h3L33 10h-3z M41 0h3L38 10h-3z M46 0h3L43 10h-3z M51 0h3L48 10h-3z M56 0h3L53 10h-3z M61 0h3L58 10h-3z" fill="#000000" />
                </svg>
              </div>
              <div className="callout-subtitle">OBJECT_001</div>
              <div className="callout-title">HAULO FROG</div>
              <div className="callout-detail">V1.0 // 2024</div>
            </div>
          </div>

          <div ref={headerContainerRef} style={{ width: '100%', pointerEvents: 'none' }}>
            <Header />
          </div>
          <div ref={leftRailContainerRef} style={{ position: 'absolute', top: 0, left: 0, height: '100%', pointerEvents: 'none' }}>
            <LeftRail ref={leftProgressMarkerRef} />
          </div>
          <div ref={rightRailContainerRef} style={{ position: 'absolute', top: 0, right: 0, height: '100%', pointerEvents: 'none' }}>
            <RightRail ref={progressMarkerRef} />
          </div>
          <div ref={bottomCaptionContainerRef} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 100 }}>
            <BottomCaption ref={bottomCaptionRef} />
          </div>
        </div>
      </div>
    </section>
  </div>
  );
});

HeroExperience.displayName = 'HeroExperience';
