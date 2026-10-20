/**
 * timelineConstants.js
 * Constants, hold labels, and 3D preset coordinates for the cinematic showcase timeline.
 */

export const TOTAL_TIMELINE_DURATION = 13.6;

export const SECTION_HOLD_LABELS = [
  "portalStart",    // 0: HAULO SERVICE Intro
  "heroHold",       // 1: Services Hero ("Prompts that think ahead")
  "singleCardHold", // 2: Single Pink Card (No side cards yet)
  "card0Front",     // 3: 3D Card 0 (Pink + Side Cards revealed on scroll)
  "card1Front",     // 4: 3D Card 1 (Red)
  "card2Front",     // 5: 3D Card 2 (Blue)
  "logoFront",      // 6: 3D Card 3 (Haulo Logo)
  "beyondHold",     // 7: Beyond all limits Portal
  "projectsStart",  // 8: Projects Track - Card 0: Brand & Identity
  "projCard1",      // 9: Projects Track - Card 1: E-commerce Development
  "projectsMid",    // 10: Projects Track - Card 2: Cloud & Infrastructure
  "projCard3",      // 11: Projects Track - Card 3: Software Engineering
  "projectsEnd",    // 12: Projects Track - Card 4: ERP & Business Systems
  "gallery1Hold",   // 13: Spatial Gallery Batch 1 (Assembled)
  "gallery2Hold",   // 14: Spatial Gallery Batch 2 (Assembled)
  "finalHold"       // 15: Final "Build beyond" Section
];

// Scene 8: Spatial Gallery Presets
export const B1_ENTRANCE_PRESETS = [
  { x: 520, y: -380, rotationY: -24, rotationX: 16, rotationZ: 8, scale: 0.62 },
  { x: 640, y: -460, rotationY: -28, rotationX: 20, rotationZ: 10, scale: 0.58 },
  { x: 460, y: -335, rotationY: -20, rotationX: 14, rotationZ: 6, scale: 0.66 },
  { x: 700, y: -505, rotationY: -30, rotationX: 22, rotationZ: 11, scale: 0.56 },
  { x: 580, y: -420, rotationY: -26, rotationX: 18, rotationZ: 9, scale: 0.60 },
  { x: 760, y: -545, rotationY: -32, rotationX: 24, rotationZ: 12, scale: 0.58 },
  { x: 620, y: -445, rotationY: -28, rotationX: 19, rotationZ: 9, scale: 0.62 }
];

export const B1_EXIT_PRESETS = [
  { x: 520, y: 380, rotationX: -18, rotationY: 22, rotationZ: -8, scale: 0.72 },
  { x: 620, y: 450, rotationX: -20, rotationY: 26, rotationZ: -10, scale: 0.68 },
  { x: 470, y: 345, rotationX: -16, rotationY: 20, rotationZ: -7, scale: 0.76 },
  { x: 680, y: 495, rotationX: -22, rotationY: 28, rotationZ: -11, scale: 0.66 },
  { x: 560, y: 410, rotationX: -19, rotationY: 24, rotationZ: -9, scale: 0.70 },
  { x: 740, y: 535, rotationX: -24, rotationY: 30, rotationZ: -12, scale: 0.66 },
  { x: 640, y: 465, rotationX: -21, rotationY: 26, rotationZ: -10, scale: 0.70 }
];

export const B2_ENTRANCE_PRESETS = [
  { x: -520, y: -380, rotationY: -24, rotationX: 16, rotationZ: 8, scale: 0.62 },
  { x: -640, y: -460, rotationY: -28, rotationX: 20, rotationZ: 10, scale: 0.58 },
  { x: -580, y: -420, rotationY: -26, rotationX: 18, rotationZ: 9, scale: 0.56 },
  { x: -460, y: -335, rotationY: -20, rotationX: 14, rotationZ: 6, scale: 0.66 },
  { x: -700, y: -505, rotationY: -30, rotationX: 22, rotationZ: 11, scale: 0.60 },
  { x: -760, y: -545, rotationY: -32, rotationX: 24, rotationZ: 12, scale: 0.58 },
  { x: -620, y: -445, rotationY: -28, rotationX: 19, rotationZ: 9, scale: 0.62 }
];

export const CARD_FLOAT_PRESETS = [
  { dx: 18, dy: 14, dRot: 0 },
  { dx: 24, dy: 18, dRot: 0 },
  { dx: 15, dy: 12, dRot: 0 },
  { dx: 26, dy: 20, dRot: 0 },
  { dx: 20, dy: 15, dRot: 0 },
  { dx: 28, dy: 22, dRot: 0 },
  { dx: 22, dy: 17, dRot: 0 }
];

// Batch 1 Entrance Offsets: 3D spatial assembly with cinematic momentum & depth
export const B1_ENTRANCE_OFFSETS = [
  { x: -160, y: -60, z: -320, rotZ: -4, scale: 0.78 }, // 0: WORK (Left Runner)
  { x: -130, y: 120, z: -280, rotZ: 4, scale: 0.80 },  // 1: Skater R
  { x: 0, y: 0, z: 0, rotZ: 0, scale: 1 },             // 2: (removed)
  { x: 0, y: 0, z: 0, rotZ: 0, scale: 1 },             // 3: (removed)
  { x: -40, y: -120, z: -260, rotZ: -3, scale: 0.82 }, // 4: Electric Blue Runner
  { x: 40, y: -100, z: -240, rotZ: 3, scale: 0.84 },   // 5: INNOVATION
  { x: 0, y: 0, z: -400, rotZ: 0, scale: 0.65 },       // 6: Hero Orange VISION ON WORD
  { x: 50, y: 130, z: -260, rotZ: 3, scale: 0.82 },    // 7: BIGGER DREAMS
  { x: 160, y: -90, z: -300, rotZ: 4, scale: 0.78 },   // 8: #09 / ACCEL
  { x: 180, y: 50, z: -320, rotZ: -4, scale: 0.76 },   // 9: HIGH VOLTAGE
  { x: -30, y: 110, z: -260, rotZ: 3, scale: 0.82 }    // 10: Field Report
];

// Curved IMAX-Theater Spatial Angle Architecture (Inward Cinerama Wrap)
export const B1_LEVEL_CONFIG = [
  // 0: Left Runner + WORK (Column 1 - Left Curve Inward)
  { rotY: 6.5, rotX: 1.5, rotZ: -0.5, z: 20 },
  // 1: Bottom Skater + Giant R (Column 1 - Left Curve Inward)
  { rotY: 6.5, rotX: -1.0, rotZ: 0.5, z: 15 },

  // 2: (removed)
  { rotY: 0, rotX: 0, rotZ: 0, z: 0 },
  // 3: (removed)
  { rotY: 0, rotX: 0, rotZ: 0, z: 0 },

  // 4: Center Electric Blue Runner (Column 2 - Mid-Left Inward)
  { rotY: 3.0, rotX: 1.0, rotZ: -0.2, z: 35 },

  // 5: INNOVATION (Column 3 - Center Top)
  { rotY: -1.5, rotX: 1.0, rotZ: 0.2, z: 50 },
  // 6: Hero Orange VISION ON WORD (Column 3 - Center HERO Focus)
  { rotY: -0.5, rotX: 0.0, rotZ: 0.0, z: 65 },
  // 7: BIGGER DREAMS (Column 3 - Center Bottom)
  { rotY: -1.5, rotX: -1.0, rotZ: -0.2, z: 45 },

  // 8: #09 / ACCEL (Column 4 - Right Curve Inward)
  { rotY: -7.5, rotX: 1.8, rotZ: 0.6, z: 25 },
  // 9: HIGH VOLTAGE (Column 4 - Right Curve Inward)
  { rotY: -7.5, rotX: -1.2, rotZ: -0.5, z: 20 },

  // 10: Field Report (Column 2 - Mid-Left Bottom)
  { rotY: 3.0, rotX: -1.2, rotZ: 0.3, z: 30 }
];
