/**
 * timelineConstants.js
 * Constants, hold labels, and 3D preset coordinates for the cinematic showcase timeline.
 */

export const TOTAL_TIMELINE_DURATION = 13.50;

export const SECTION_HOLD_LABELS = [
  "portalStart",        // 0: HAULO SERVICE Intro
  "heroHold",           // 1: Services Hero ("Prompts that think ahead")
  "singleCardHold",     // 2: Single Pink Card (No side cards yet)
  "card0Front",         // 3: 3D Card 0 (Pink + Side Cards revealed on scroll)
  "card1Front",         // 4: 3D Card 1 (Red)
  "card2Front",         // 5: 3D Card 2 (Blue)
  "logoFront",          // 6: 3D Card 3 (Haulo Logo)
  "beyondHold",         // 7: Beyond all limits Portal
  "projectsStart",      // 8: Projects Track - Card 0: Brand & Identity
  "projCard1",          // 9: Projects Track - Card 1: E-commerce Development
  "projectsMid",        // 10: Projects Track - Card 2: Cloud & Infrastructure
  "projCard3",          // 11: Projects Track - Card 3: Software Engineering
  "projectsEnd",        // 12: Projects Track - Card 4: ERP & Business Systems
  "gallery1Hold",       // 13: 1st scroll - First image section (Design. Build. Connect. Scale. + 11 platforms on track)
  "galleryDim1Forward", // 14: 2nd scroll - Second image section (Mobile spotlight + rear platforms forward)
  "gallery2Hold"        // 15: 3rd scroll - Camera moves inside cosmic-vortex.webp, then open next section!
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
  { x: 30, y: -40, z: -260, rotZ: -2, scale: 0.85 }, // 0: Left Runner + WORK
  { x: 30, y: 40, z: -260, rotZ: 2, scale: 0.85 },  // 1: Skater R + CREATE
  { x: -90, y: -110, z: -250, rotZ: 3, scale: 0.82 },   // 2: Small-Card-7 (AURA)
  { x: -60, y: 40, z: -350, rotZ: -2, scale: 0.70 },    // 3: Small-Card-4 (HYPER - VERY BIG)
  { x: -40, y: -120, z: -260, rotZ: -3, scale: 0.82 }, // 4: Center Electric Blue Runner
  { x: 15, y: -130, z: -270, rotZ: -3, scale: 0.80 },   // 5: Card-10 (PRISM - HALF-CUT)
  { x: -30, y: 110, z: -260, rotZ: 3, scale: 0.82 },   // 6: Field Report 004
  { x: 0, y: 80, z: -200, rotZ: 4, scale: 0.85 },       // 7: top_blue_runner (VELOCITY - MICRO)
  { x: 40, y: -100, z: -240, rotZ: 3, scale: 0.84 },   // 8: INNOVATION
  { x: 0, y: 0, z: -400, rotZ: 0, scale: 0.65 },       // 9: Hero Orange VISION
  { x: 50, y: 130, z: -260, rotZ: 3, scale: 0.82 },    // 10: BIGGER DREAMS
  { x: 80, y: -70, z: -280, rotZ: 3, scale: 0.80 },   // 11: #09 Project
  { x: 90, y: 40, z: -290, rotZ: -3, scale: 0.80 },   // 12: CREATIVE ENERGY
  { x: 70, y: 80, z: -270, rotZ: -2, scale: 0.82 },  // 13: Small-Card-8 (VECTOR)
  { x: 80, y: -50, z: -300, rotZ: 3, scale: 0.78 }    // 14: Small-Card-11 (IGNITE)
];

// Curved IMAX-Theater Spatial Angle Architecture (Inward Cinerama Wrap)
export const B1_LEVEL_CONFIG = [
  { rotY: 6.5, rotX: 1.5, rotZ: -0.5, z: 20 },          // 0: Left Runner + WORK
  { rotY: 6.5, rotX: -1.0, rotZ: 0.5, z: 15 },          // 1: Skater R + CREATE
  { rotY: 5.0, rotX: 1.2, rotZ: -0.3, z: 25 },          // 2: Small-Card-7 (AURA)
  { rotY: 4.5, rotX: -0.8, rotZ: 0.4, z: 75 },          // 3: Small-Card-4 (HYPER - VERY BIG)
  { rotY: 3.0, rotX: 1.0, rotZ: -0.2, z: 35 },          // 4: Center Electric Blue Runner
  { rotY: 1.0, rotX: 1.4, rotZ: -0.2, z: 35 },          // 5: Card-10 (PRISM - HALF-CUT)
  { rotY: 3.0, rotX: -1.2, rotZ: 0.3, z: 30 },          // 6: Field Report 004
  { rotY: 0.5, rotX: -1.0, rotZ: 0.5, z: 90 },          // 7: top_blue_runner (VELOCITY - MICRO)
  { rotY: -1.5, rotX: 1.0, rotZ: 0.2, z: 50 },         // 8: INNOVATION
  { rotY: -0.5, rotX: 0.0, rotZ: 0.0, z: 65 },         // 9: Hero Orange VISION
  { rotY: -1.5, rotX: -1.0, rotZ: -0.2, z: 45 },        // 10: BIGGER DREAMS
  { rotY: -7.5, rotX: 1.8, rotZ: 0.6, z: 25 },          // 11: #09 Project
  { rotY: -7.5, rotX: -1.2, rotZ: -0.5, z: 20 },        // 12: CREATIVE ENERGY
  { rotY: -6.0, rotX: -1.2, rotZ: -0.4, z: 40 },        // 13: Small-Card-8 (VECTOR)
  { rotY: -10.0, rotX: 1.5, rotZ: 0.8, z: 15 }          // 14: Small-Card-11 (IGNITE)
];

// Outward Radial Fly-Through Exit Vectors (Pass camera outside of screen)
export const B1_EXIT_VECTORS = [
  { x: -520, y: -140, z: 1300, scale: 2.1 }, // 0: Left Runner + WORK (top-left)
  { x: -520, y: 340, z: 1300, scale: 2.1 },  // 1: Skater R + CREATE (bottom-left)
  { x: -380, y: -320, z: 1300, scale: 2.1 }, // 2: Small-Card-7 (AURA) (top-left)
  { x: -620, y: 100, z: 1380, scale: 2.3 },  // 3: Small-Card-4 (HYPER - VERY BIG) (mid-left)
  { x: -90, y: -380, z: 1300, scale: 2.1 },  // 4: Center Electric Blue Runner (top-center)
  { x: 110, y: -400, z: 1300, scale: 2.1 },  // 5: Card-10 (PRISM - HALF-CUT) (top-center)
  { x: -140, y: 400, z: 1300, scale: 2.1 },  // 6: Field Report 004 (bottom-center)
  { x: -40, y: 460, z: 1350, scale: 2.2 },   // 7: top_blue_runner (VELOCITY - MICRO) (bottom)
  { x: 340, y: -340, z: 1300, scale: 2.1 },  // 8: INNOVATION (top-right)
  { x: 380, y: -140, z: 1400, scale: 2.4 },  // 9: Hero Orange VISION (center-right)
  { x: 280, y: 420, z: 1300, scale: 2.1 },   // 10: BIGGER DREAMS (bottom-right)
  { x: 540, y: -260, z: 1300, scale: 2.1 },  // 11: #09 Project (top-far-right)
  { x: 520, y: 100, z: 1300, scale: 2.1 },   // 12: CREATIVE ENERGY (mid-far-right)
  { x: 500, y: 360, z: 1300, scale: 2.1 },   // 13: Small-Card-8 (VECTOR) (bottom-far-right)
  { x: 600, y: -70, z: 1300, scale: 2.1 }    // 14: Small-Card-11 (IGNITE) (mid-outer-right)
];
