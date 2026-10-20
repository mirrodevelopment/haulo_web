/**
 * proceduralFrameRenderer.js
 *
 * Procedural HTML5 Canvas 2D vector renderer for cybernetic hardware monitor frames:
 * - Machined brushed titanium metallic chassis with specular chamfers and micro-grain
 * - Recessed dark slots with pure white frosted diffuser and electric cyber-yellow neon status bars
 * - Multi-element camera lens with cyan/violet AR coating and pinhole optical sensor
 * - Countersunk hexagonal mech bolts with metallic bevel rims
 * - Dual electric cyber-yellow cathode status channels and CNC cooling louvers
 * - Cybernetic cylindrical hinge knuckles at 4 corners with neon yellow glowing cartridges
 */

/**
 * Draws an image with object-fit: cover inside the specified canvas bounds
 */
export function drawImageCover(ctx, img, x, y, w, h) {
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) return;
  const targetRatio = w / h;
  const imgRatio = imgW / imgH;
  let sx, sy, sw, sh;
  if (imgRatio > targetRatio) {
    sh = imgH;
    sw = imgH * targetRatio;
    sx = (imgW - sw) / 2;
    sy = 0;
  } else {
    sw = imgW;
    sh = imgW / targetRatio;
    sx = 0;
    sy = (imgH - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/**
 * Helper to draw a rounded rectangle with individual corner radii: [tl, tr, br, bl] or single radius number
 */
export function drawRoundedRect(ctx, x, y, w, h, r) {
  let tl, tr, br, bl;
  if (Array.isArray(r)) {
    [tl, tr, br, bl] = r;
  } else {
    tl = tr = br = bl = r;
  }
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

/**
 * Draws the card screen content (solid color or custom element) inside the specified bounds
 */
export function drawCardScreen(ctx, colorItem, x, y, w, h, r) {
  if (!colorItem || colorItem === 'transparent') {
    return;
  }
  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.clip();

  const isColor = typeof colorItem === 'string' && (colorItem.startsWith('#') || colorItem.startsWith('rgb'));
  if (isColor) {
    ctx.fillStyle = colorItem;
    ctx.fillRect(x, y, w, h);
  } else if (colorItem instanceof HTMLImageElement || colorItem instanceof HTMLCanvasElement) {
    ctx.drawImage(colorItem, x, y, w, h);
  } else if (typeof colorItem === 'string') {
    ctx.fillStyle = colorItem;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();
}

/**
 * Draws a countersunk hexagonal mech bolt with metallic bevel rim and dark socket head
 */
export function drawHexBolt(ctx, cx, cy, r, angle = 0) {
  // Countersunk outer ring
  const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  grad.addColorStop(0, '#5C697B');
  grad.addColorStop(0.5, '#2D3540');
  grad.addColorStop(1, '#8A97A8');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // Dark cavity recess
  ctx.fillStyle = '#07090C';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.05, 0, Math.PI * 2);
  ctx.fill();

  // Hex head socket
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = angle + (i * Math.PI) / 3;
    const hx = cx + Math.cos(a) * r * 0.72;
    const hy = cy + Math.sin(a) * r * 0.72;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.fillStyle = '#1D242E';
  ctx.fill();
  ctx.strokeStyle = '#4A5666';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Center pin
  ctx.fillStyle = '#06080A';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Draws anisotropic brushed metal micro-grain texture simulating CNC-milled titanium
 */
export function drawBrushedGrain(ctx, x, y, w, h, step = 2) {
  ctx.save();
  for (let gy = y; gy < y + h; gy += step) {
    const isLight = ((gy * 19) % 7) > 3;
    ctx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.045)' : 'rgba(0, 0, 0, 0.055)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draws an intense photorealistic cybernetic yellow neon light bar with multi-pass optical bloom,
 * 3D cylindrical lens shading, white-hot laser filament, and specular glass glint.
 */
export function drawCyberYellowNeonBar(ctx, x, y, w, h, r, S) {
  ctx.save();

  // Pass 1: Wide atmospheric yellow bloom
  ctx.shadowColor = 'rgba(255, 230, 0, 0.90)';
  ctx.shadowBlur = Math.round(34 * S);
  ctx.fillStyle = 'rgba(255, 235, 0, 0.50)';
  drawRoundedRect(ctx, x - 1 * S, y - 1 * S, w + 2 * S, h + 2 * S, r);
  ctx.fill();

  // Pass 2: Focused high-intensity electric neon aura
  ctx.shadowColor = '#FAFF00';
  ctx.shadowBlur = Math.round(18 * S);
  ctx.fillStyle = '#EAFF00';
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Pass 3: 3D Cylindrical Light-Guide Body
  const tubeGrad = ctx.createLinearGradient(0, y, 0, y + h);
  tubeGrad.addColorStop(0.0, '#FFFFFF'); // Top specular glint
  tubeGrad.addColorStop(0.18, '#FFFFB8'); // Upper hot light
  tubeGrad.addColorStop(0.50, '#F4FF00'); // Pure electric cyber yellow
  tubeGrad.addColorStop(0.80, '#C8F800'); // Refraction edge
  tubeGrad.addColorStop(1.00, '#82A800'); // Base reflection
  ctx.fillStyle = tubeGrad;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Pass 4: White-Hot Center Laser Filament
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = Math.round(8 * S);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = Math.max(1.5, Math.round(2.2 * S));
  ctx.lineCap = 'round';
  ctx.beginPath();
  const pad = Math.max(r, Math.round(6 * S));
  ctx.moveTo(x + pad, y + h / 2);
  ctx.lineTo(x + w - pad, y + h / 2);
  ctx.stroke();

  // Pass 5: Razor-sharp upper specular lens glint
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = Math.max(1, Math.round(1.0 * S));
  ctx.beginPath();
  ctx.moveTo(x + pad + 2 * S, y + Math.round(1.8 * S));
  ctx.lineTo(x + w - pad - 2 * S, y + Math.round(1.8 * S));
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws the vertical cybernetic yellow neon core on the corner hinge knuckles
 */
export function drawCyberYellowKnuckleCore(ctx, x, y, w, h, isLeftEdge, S) {
  ctx.save();

  // Pass 1: Wide atmospheric yellow bloom spilling onto metal knuckle housing
  ctx.shadowColor = 'rgba(255, 230, 0, 0.90)';
  ctx.shadowBlur = Math.round(28 * S);
  ctx.fillStyle = 'rgba(255, 235, 0, 0.50)';
  ctx.fillRect(x, y, w, h);

  // Pass 2: High-intensity neon aura
  ctx.shadowColor = '#FAFF00';
  ctx.shadowBlur = Math.round(16 * S);
  ctx.fillStyle = '#EAFF00';
  ctx.fillRect(x, y, w, h);

  // Pass 3: 3D Cylindrical cartridge gradient across X
  const cartGrad = ctx.createLinearGradient(x, 0, x + w, 0);
  if (isLeftEdge) {
    cartGrad.addColorStop(0.0, '#FFFFFF'); // Center hot
    cartGrad.addColorStop(0.25, '#FFFFB8');
    cartGrad.addColorStop(0.65, '#F4FF00');
    cartGrad.addColorStop(1.00, '#82A800'); // Outer edge dark
  } else {
    cartGrad.addColorStop(0.00, '#82A800'); // Outer edge dark
    cartGrad.addColorStop(0.35, '#F4FF00');
    cartGrad.addColorStop(0.75, '#FFFFB8');
    cartGrad.addColorStop(1.00, '#FFFFFF'); // Center hot
  }
  ctx.fillStyle = cartGrad;
  ctx.fillRect(x, y, w, h);

  // Pass 4: White-hot vertical laser core line
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = Math.round(8 * S);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = Math.max(1.5, Math.round(2.2 * S));
  ctx.lineCap = 'round';
  const lineX = isLeftEdge ? (x + Math.round(2 * S)) : (x + w - Math.round(2 * S));
  ctx.beginPath();
  ctx.moveTo(lineX, y + Math.round(3 * S));
  ctx.lineTo(lineX, y + h - Math.round(3 * S));
  ctx.stroke();

  ctx.restore();
}

/**
 * Renders cybernetic card frames procedurally via HTML5 Canvas 2D vector code
 */
export function renderProceduralCard(canvas, colorItem, isLeftRight) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const S = W / 580;

  const H_TOP = Math.round(66 * S);
  const H_BTM = Math.round(66 * S);
  const W_SIDE = isLeftRight ? 0 : Math.round(16 * S);
  const BEZEL = isLeftRight ? 0 : Math.round(14 * S);

  // 1. Screen boundaries
  const scrX = W_SIDE + BEZEL;
  const scrY = H_TOP + BEZEL;
  const scrW = W - 2 * scrX;
  const scrH = H - scrY - (H_BTM + BEZEL);

  // Draw card screen content (transparent if null)
  drawCardScreen(ctx, colorItem, scrX, scrY, scrW, scrH, isLeftRight ? 0 : Math.round(6 * S));

  // Ambient Occlusion Undercut Shadows
  const aoH = Math.round(14 * S);
  const topAO = ctx.createLinearGradient(0, H_TOP, 0, H_TOP + aoH);
  topAO.addColorStop(0, 'rgba(0, 0, 0, 0.70)');
  topAO.addColorStop(0.35, 'rgba(0, 0, 0, 0.35)');
  topAO.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = topAO;
  ctx.fillRect(0, H_TOP, W, aoH);

  const bY = H - H_BTM;
  const btmAO = ctx.createLinearGradient(0, bY, 0, bY - aoH);
  btmAO.addColorStop(0, 'rgba(0, 0, 0, 0.70)');
  btmAO.addColorStop(0.35, 'rgba(0, 0, 0, 0.35)');
  btmAO.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = btmAO;
  ctx.fillRect(0, bY - aoH, W, aoH);

  if (!isLeftRight) {
    // Inner shadow on screen top and left (recessed screen depth)
    ctx.save();
    const shadowSteps = Math.round(8 * S);
    for (let i = 0; i < shadowSteps; i++) {
      const a = 0.35 * (1.0 - i / shadowSteps);
      ctx.strokeStyle = `rgba(0, 0, 0, ${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scrX + Math.round(6 * S), scrY + i);
      ctx.lineTo(scrX + scrW - Math.round(6 * S), scrY + i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(scrX + i, scrY + Math.round(6 * S));
      ctx.lineTo(scrX + i, scrY + scrH - Math.round(6 * S));
      ctx.stroke();
    }
    ctx.restore();

    // Black matte inner bezel around screen
    ctx.strokeStyle = '#0A0C10';
    ctx.lineWidth = BEZEL;
    drawRoundedRect(
      ctx,
      W_SIDE + BEZEL / 2,
      H_TOP + BEZEL / 2,
      W - 2 * (W_SIDE + BEZEL / 2),
      H - (H_TOP + H_BTM + BEZEL),
      Math.round(8 * S)
    );
    ctx.stroke();

    // Inner bezel rim chamfer
    ctx.strokeStyle = '#262C38';
    ctx.lineWidth = Math.max(1, Math.round(1.5 * S));
    drawRoundedRect(ctx, scrX - 1, scrY - 1, scrW + 2, scrH + 2, Math.round(6 * S));
    ctx.stroke();
  }

  // ==========================================
  // 2. TOP TITANIUM METALLIC CHASSIS CAP
  // ==========================================
  ctx.save();
  const cornerChamfer = Math.round(16 * S);
  ctx.beginPath();
  ctx.moveTo(cornerChamfer, 0);
  ctx.lineTo(W - cornerChamfer, 0);
  ctx.lineTo(W, cornerChamfer);
  ctx.lineTo(W, H_TOP);
  ctx.lineTo(0, H_TOP);
  ctx.lineTo(0, cornerChamfer);
  ctx.closePath();
  ctx.clip();

  // Multi-stage cylindrical metallic reflection
  const topGrad = ctx.createLinearGradient(0, 0, 0, H_TOP);
  topGrad.addColorStop(0.00, '#FFFFFF'); // Specular keylight rim
  topGrad.addColorStop(0.04, '#F4F7FA');
  topGrad.addColorStop(0.12, '#D2DBE7'); // Upper chamfer
  topGrad.addColorStop(0.28, '#ECF2F8'); // Main highlight band
  topGrad.addColorStop(0.55, '#C6D0DD'); // Titanium midtone
  topGrad.addColorStop(0.80, '#98A5B6'); // Core shadow
  topGrad.addColorStop(0.92, '#6F7B8D'); // Undercut bevel
  topGrad.addColorStop(0.98, '#323A46'); // Recessed groove
  topGrad.addColorStop(1.00, '#0C0E14'); // Aperture boundary
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, H_TOP);

  // Brushed anisotropic micro-grain
  drawBrushedGrain(ctx, 0, 0, W, H_TOP, 2);

  // Studio lighting specular reflection highlights
  const topSpec = ctx.createLinearGradient(0, 0, W, 0);
  topSpec.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)');
  topSpec.addColorStop(0.25, 'rgba(255, 255, 255, 0.18)');
  topSpec.addColorStop(0.40, 'rgba(255, 255, 255, 0.0)');
  topSpec.addColorStop(0.70, 'rgba(255, 255, 255, 0.16)');
  topSpec.addColorStop(0.85, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = topSpec;
  ctx.fillRect(0, 0, W, H_TOP);

  ctx.restore();

  // Top edge razor-sharp specular bevel highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.lineWidth = Math.round(2 * S);
  ctx.beginPath();
  ctx.moveTo(cornerChamfer, Math.round(1.5 * S));
  ctx.lineTo(W - cornerChamfer, Math.round(1.5 * S));
  ctx.stroke();

  // Outer corner chamfer highlight strokes
  ctx.beginPath();
  ctx.moveTo(0, cornerChamfer);
  ctx.lineTo(cornerChamfer, 0);
  ctx.moveTo(W - cornerChamfer, 0);
  ctx.lineTo(W, cornerChamfer);
  ctx.stroke();

  // Top chassis lower edge mechanical step
  ctx.strokeStyle = '#0C0F14';
  ctx.lineWidth = Math.round(2.5 * S);
  ctx.beginPath();
  ctx.moveTo(0, H_TOP);
  ctx.lineTo(W, H_TOP);
  ctx.stroke();

  ctx.strokeStyle = '#4A5568';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H_TOP - Math.round(2.5 * S));
  ctx.lineTo(W, H_TOP - Math.round(2.5 * S));
  ctx.stroke();

  // Modular Panel Expansion Seams
  const seamL = Math.round(52 * S);
  const seamR = W - seamL;
  const seamW = Math.round(3.5 * S);

  ctx.fillStyle = '#06080B';
  ctx.fillRect(seamL - seamW / 2, 0, seamW, H_TOP);
  ctx.fillRect(seamR - seamW / 2, 0, seamW, H_TOP);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(seamL + seamW / 2, 0);
  ctx.lineTo(seamL + seamW / 2, H_TOP);
  ctx.moveTo(seamR - seamW / 2, 0);
  ctx.lineTo(seamR - seamW / 2, H_TOP);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.beginPath();
  ctx.moveTo(seamL - seamW / 2 - 1, 0);
  ctx.lineTo(seamL - seamW / 2 - 1, H_TOP);
  ctx.moveTo(seamR + seamW / 2 + 1, 0);
  ctx.lineTo(seamR + seamW / 2 + 1, H_TOP);
  ctx.stroke();

  // Countersunk Hex Mech Bolts on End-Caps
  drawHexBolt(ctx, seamL / 2, H_TOP / 2, Math.round(4.5 * S), 0);
  drawHexBolt(ctx, W - seamL / 2, H_TOP / 2, Math.round(4.5 * S), Math.PI / 6);

  // Top chassis component slots
  const slotH = Math.round(25 * S);
  const slotY = Math.round((H_TOP - slotH) / 2);

  // ----------------------------------------------------
  // Left: Warm Frosted LED Light Diffuser Bar
  // ----------------------------------------------------
  const lX = Math.round(72 * S);
  const lW = Math.round(200 * S);
  const slotR = Math.round(9 * S);

  // Recessed pocket with dark bevel edge
  drawRoundedRect(ctx, lX, slotY, lW, slotH, slotR);
  ctx.fillStyle = '#090B0F';
  ctx.fill();
  ctx.strokeStyle = '#363E4D';
  ctx.lineWidth = Math.round(1.5 * S);
  ctx.stroke();

  // Silver / Polished Chrome Titanium Bezel Ring
  const bzInset = Math.round(2.5 * S);
  drawRoundedRect(ctx, lX + bzInset, slotY + bzInset, lW - 2 * bzInset, slotH - 2 * bzInset, slotR - 1);
  const silverGrad = ctx.createLinearGradient(0, slotY, 0, slotY + slotH);
  silverGrad.addColorStop(0.0, '#FFFFFF');
  silverGrad.addColorStop(0.3, '#E8EEF5');
  silverGrad.addColorStop(0.7, '#B8C4D2');
  silverGrad.addColorStop(1.0, '#6E7B8C');
  ctx.fillStyle = silverGrad;
  ctx.fill();

  // Frosted Diffuser Body with Brilliant Pure White Glow
  const dfInset = Math.round(4.5 * S);
  const dfW = lW - 2 * dfInset;
  const dfH = slotH - 2 * dfInset;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
  ctx.shadowBlur = Math.round(22 * S);
  drawRoundedRect(ctx, lX + dfInset, slotY + dfInset, dfW, dfH, slotR - 3);
  const diffGrad = ctx.createLinearGradient(0, slotY + dfInset, 0, slotY + dfInset + dfH);
  diffGrad.addColorStop(0.0, '#FFFFFF');
  diffGrad.addColorStop(0.5, '#FFFFFF');
  diffGrad.addColorStop(1.0, '#F4F7FB');
  ctx.fillStyle = diffGrad;
  ctx.fill();
  ctx.restore();

  // Internal micro-fluting Fresnel lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.50)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(lX + dfInset + Math.round(6 * S), slotY + slotH / 2 - Math.round(2 * S));
  ctx.lineTo(lX + lW - dfInset - Math.round(6 * S), slotY + slotH / 2 - Math.round(2 * S));
  ctx.moveTo(lX + dfInset + Math.round(6 * S), slotY + slotH / 2 + Math.round(2 * S));
  ctx.lineTo(lX + lW - dfInset - Math.round(6 * S), slotY + slotH / 2 + Math.round(2 * S));
  ctx.stroke();

  // Top surface specular glint line
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = Math.round(1.5 * S);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lX + dfInset + Math.round(10 * S), slotY + dfInset + Math.round(2 * S));
  ctx.lineTo(lX + lW - dfInset - Math.round(10 * S), slotY + dfInset + Math.round(2 * S));
  ctx.stroke();

  // ----------------------------------------------------
  // Right: Gloss Obsidian Sensor & Camera Capsule
  // ----------------------------------------------------
  const rX = Math.round(290 * S);
  const rW = Math.round(230 * S);

  // Recessed pocket with dark bevel edge
  drawRoundedRect(ctx, rX, slotY, rW, slotH, slotR);
  ctx.fillStyle = '#080A0E';
  ctx.fill();
  ctx.strokeStyle = '#363E4D';
  ctx.lineWidth = Math.round(1.5 * S);
  ctx.stroke();

  // High-Gloss Obsidian Glass Window
  drawRoundedRect(ctx, rX + Math.round(1.5 * S), slotY + Math.round(1.5 * S), rW - Math.round(3 * S), slotH - Math.round(3 * S), slotR - 1);
  const obsGrad = ctx.createLinearGradient(0, slotY, 0, slotY + slotH);
  obsGrad.addColorStop(0.0, '#0B0F15');
  obsGrad.addColorStop(0.4, '#07090C');
  obsGrad.addColorStop(1.0, '#151A22');
  ctx.fillStyle = obsGrad;
  ctx.fill();

  // Curved glass specular glare reflection
  ctx.save();
  ctx.clip();
  const glareGrad = ctx.createLinearGradient(rX, slotY, rX + rW, slotY + slotH);
  glareGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.25)');
  glareGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.03)');
  glareGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = glareGrad;
  ctx.fillRect(rX, slotY, rW, slotH / 2);
  ctx.restore();

  // a) Ambient Light / IR Pinhole Sensor
  const c1_x = rX + Math.round(22 * S);
  const c1_y = slotY + slotH / 2;
  const c1_r = Math.round(4.0 * S);
  ctx.beginPath();
  ctx.arc(c1_x, c1_y, c1_r, 0, Math.PI * 2);
  ctx.fillStyle = '#36404F';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(c1_x, c1_y, Math.round(2.5 * S), 0, Math.PI * 2);
  ctx.fillStyle = '#020305';
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(c1_x - 0.75, c1_y - 1.25, 1.5, 1.5);

  // b) Multi-Element Optical Camera Module
  const c2_x = rX + Math.round(72 * S);
  const c2_y = slotY + slotH / 2;
  const c2_r = Math.round(8.5 * S);

  // Outer chrome lens bezel ring
  const lensRimGrad = ctx.createLinearGradient(c2_x - c2_r, c2_y - c2_r, c2_x + c2_r, c2_y + c2_r);
  lensRimGrad.addColorStop(0.0, '#9AA7BA');
  lensRimGrad.addColorStop(0.5, '#485465');
  lensRimGrad.addColorStop(1.0, '#2D3542');
  ctx.beginPath();
  ctx.arc(c2_x, c2_y, c2_r, 0, Math.PI * 2);
  ctx.fillStyle = lensRimGrad;
  ctx.fill();

  // Stepped inner lens barrel
  ctx.beginPath();
  ctx.arc(c2_x, c2_y, Math.round(6.5 * S), 0, Math.PI * 2);
  ctx.fillStyle = '#121620';
  ctx.fill();

  // Multi-coated optical glass element (Cyan/Violet AR coating)
  const lensRadGrad = ctx.createRadialGradient(c2_x, c2_y, 0, c2_x, c2_y, Math.round(5.0 * S));
  lensRadGrad.addColorStop(0.00, '#04060A'); // Pupil
  lensRadGrad.addColorStop(0.40, '#0B172C'); // Deep navy
  lensRadGrad.addColorStop(0.72, '#2D144A'); // Violet AR coating
  lensRadGrad.addColorStop(0.92, '#0B5E7F'); // Cyan AR ring
  lensRadGrad.addColorStop(1.00, '#121620');
  ctx.beginPath();
  ctx.arc(c2_x, c2_y, Math.round(5.0 * S), 0, Math.PI * 2);
  ctx.fillStyle = lensRadGrad;
  ctx.fill();

  // White pinpoint specular lens flare dot
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(c2_x - Math.round(1.8 * S), c2_y - Math.round(2.0 * S), Math.round(1.3 * S), 0, Math.PI * 2);
  ctx.fill();

  // Secondary soft ghost flare
  ctx.fillStyle = 'rgba(140, 200, 255, 0.55)';
  ctx.beginPath();
  ctx.arc(c2_x + Math.round(1.6 * S), c2_y + Math.round(1.6 * S), Math.round(0.75 * S), 0, Math.PI * 2);
  ctx.fill();

  // c) Glowing Electric Cyber Yellow Status Slit
  const slitX = rX + Math.round(135 * S);
  const slitW = Math.round(75 * S);
  const slitH = Math.round(7.5 * S);
  const slitY = slotY + slotH / 2 - slitH / 2;

  // Recessed dark housing
  drawRoundedRect(ctx, slitX - Math.round(2 * S), slitY - Math.round(1.5 * S), slitW + Math.round(4 * S), slitH + Math.round(3 * S), Math.round(3.5 * S));
  ctx.fillStyle = '#050805';
  ctx.fill();

  // Electric Cyber Yellow Neon Bar with multi-pass bloom & 3D lens
  drawCyberYellowNeonBar(ctx, slitX, slitY, slitW, slitH, Math.round(3.5 * S), S);

  // ==========================================
  // 3. BOTTOM TITANIUM METALLIC CHASSIS CAP
  // ==========================================
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, bY);
  ctx.lineTo(W, bY);
  ctx.lineTo(W, H - cornerChamfer);
  ctx.lineTo(W - cornerChamfer, H);
  ctx.lineTo(cornerChamfer, H);
  ctx.lineTo(0, H - cornerChamfer);
  ctx.closePath();
  ctx.clip();

  // Cylindrical metallic gradient with ground bounce specular highlight
  const btmGrad = ctx.createLinearGradient(0, bY, 0, H);
  btmGrad.addColorStop(0.00, '#0C0E14'); // Screen aperture boundary
  btmGrad.addColorStop(0.04, '#323A46'); // Recessed groove
  btmGrad.addColorStop(0.12, '#6F7B8D'); // Undercut bevel
  btmGrad.addColorStop(0.35, '#9AA7B8'); // Core shadow
  btmGrad.addColorStop(0.65, '#CAD4E2'); // Titanium midtone
  btmGrad.addColorStop(0.88, '#F0F5FA'); // Ground bounce highlight
  btmGrad.addColorStop(0.96, '#FFFFFF'); // Specular rim
  btmGrad.addColorStop(1.00, '#262D38'); // Bottom edge
  ctx.fillStyle = btmGrad;
  ctx.fillRect(0, bY, W, H_BTM);

  // Brushed anisotropic micro-grain
  drawBrushedGrain(ctx, 0, bY, W, H_BTM, 2);

  // Studio lighting specular reflection highlights
  ctx.fillStyle = topSpec;
  ctx.fillRect(0, bY, W, H_BTM);

  ctx.restore();

  // Bottom chassis upper edge mechanical step
  ctx.strokeStyle = '#0C0F14';
  ctx.lineWidth = Math.round(2.5 * S);
  ctx.beginPath();
  ctx.moveTo(0, bY);
  ctx.lineTo(W, bY);
  ctx.stroke();

  ctx.strokeStyle = '#4A5568';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, bY + Math.round(2.5 * S));
  ctx.lineTo(W, bY + Math.round(2.5 * S));
  ctx.stroke();

  // Bottom edge ground bounce specular highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.lineWidth = Math.round(2 * S);
  ctx.beginPath();
  ctx.moveTo(cornerChamfer, H - Math.round(1.5 * S));
  ctx.lineTo(W - cornerChamfer, H - Math.round(1.5 * S));
  ctx.stroke();

  // Outer corner chamfer highlight strokes
  ctx.beginPath();
  ctx.moveTo(0, H - cornerChamfer);
  ctx.lineTo(cornerChamfer, H);
  ctx.moveTo(W - cornerChamfer, H);
  ctx.lineTo(W, H - cornerChamfer);
  ctx.stroke();

  // Bottom Modular Panel Expansion Seams
  ctx.fillStyle = '#06080B';
  ctx.fillRect(seamL - seamW / 2, bY, seamW, H_BTM);
  ctx.fillRect(seamR - seamW / 2, bY, seamW, H_BTM);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(seamL + seamW / 2, bY);
  ctx.lineTo(seamL + seamW / 2, H);
  ctx.moveTo(seamR - seamW / 2, bY);
  ctx.lineTo(seamR - seamW / 2, H);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.beginPath();
  ctx.moveTo(seamL - seamW / 2 - 1, bY);
  ctx.lineTo(seamL - seamW / 2 - 1, H);
  ctx.moveTo(seamR + seamW / 2 + 1, bY);
  ctx.lineTo(seamR + seamW / 2 + 1, H);
  ctx.stroke();

  // Bottom Countersunk Hex Mech Bolts
  drawHexBolt(ctx, seamL / 2, bY + H_BTM / 2, Math.round(4.5 * S), Math.PI / 4);
  drawHexBolt(ctx, W - seamL / 2, bY + H_BTM / 2, Math.round(4.5 * S), -Math.PI / 6);

  // ----------------------------------------------------
  // Bottom Central Status Channel with Dual Electric Cyber Yellow Bars
  // ----------------------------------------------------
  const bSlotH = Math.round(24 * S);
  const bSlotY = bY + Math.round((H_BTM - bSlotH) / 2);
  const bSlotW = Math.round(450 * S);
  const bSlotX = Math.round((W - bSlotW) / 2);

  // Recessed dark pocket
  drawRoundedRect(ctx, bSlotX, bSlotY, bSlotW, bSlotH, slotR);
  ctx.fillStyle = '#080A0E';
  ctx.fill();
  ctx.strokeStyle = '#363E4D';
  ctx.lineWidth = Math.round(1.5 * S);
  ctx.stroke();

  // Left electric cyber yellow bar
  const b1_x = bSlotX + Math.round(24 * S);
  const b1_w = Math.round(105 * S);
  const bBarH = Math.round(7.5 * S);
  const bBarY = bSlotY + (bSlotH - bBarH) / 2;
  drawCyberYellowNeonBar(ctx, b1_x, bBarY, b1_w, bBarH, Math.round(3.5 * S), S);

  // Right electric cyber yellow bar
  const b2_x = bSlotX + bSlotW - Math.round(129 * S);
  const b2_w = Math.round(105 * S);
  drawCyberYellowNeonBar(ctx, b2_x, bBarY, b2_w, bBarH, Math.round(3.5 * S), S);

  // Center section: CNC heat-sink cooling louvers & Telemetry HUD
  const cLouvX = b1_x + b1_w + Math.round(16 * S);
  const cLouvW = b2_x - cLouvX - Math.round(16 * S);
  for (let li = 0; li < 4; li++) {
    const ly = bSlotY + Math.round(7 * S) + li * Math.round(3.5 * S);
    ctx.strokeStyle = '#040508';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cLouvX, ly);
    ctx.lineTo(cLouvX + cLouvW, ly);
    ctx.stroke();

    ctx.strokeStyle = '#28313E';
    ctx.beginPath();
    ctx.moveTo(cLouvX, ly + 1);
    ctx.lineTo(cLouvX + cLouvW, ly + 1);
    ctx.stroke();
  }

  // Micro-HUD tick marks in center (radiant cyber yellow)
  ctx.save();
  ctx.shadowColor = '#FAFF00';
  ctx.shadowBlur = Math.round(6 * S);
  ctx.fillStyle = '#EAFF00';
  const tickCount = 7;
  for (let ti = 0; ti < tickCount; ti++) {
    const tx = cLouvX + (cLouvW / (tickCount - 1)) * ti;
    ctx.fillRect(tx - 0.5, bSlotY + Math.round(4 * S), 1.5, Math.round(2.5 * S));
    ctx.fillRect(tx - 0.5, bSlotY + bSlotH - Math.round(6.5 * S), 1.5, Math.round(2.5 * S));
  }
  ctx.restore();

  // ==========================================
  // 4. CYBERNETIC CORNER HINGE KNUCKLES
  // ==========================================
  const kHalfW = Math.round(10 * S);
  const kH = Math.round(58 * S);
  const kLimeHalfW = Math.round(6.5 * S);
  const kLimeH = Math.round(36 * S);

  const knuckleYPositions = [
    Math.round(8 * S),
    H - Math.round(8 * S) - kH
  ];

  for (const ky of knuckleYPositions) {
    // === LEFT EDGE (RIGHT-HALF KNUCKLE) ===
    const lKnuckleGrad = ctx.createLinearGradient(0, ky, kHalfW, ky);
    lKnuckleGrad.addColorStop(0.0, '#3A4452');
    lKnuckleGrad.addColorStop(0.4, '#1C222B');
    lKnuckleGrad.addColorStop(1.0, '#0C0E14');
    ctx.fillStyle = lKnuckleGrad;
    ctx.fillRect(0, ky, kHalfW, kH);

    ctx.strokeStyle = '#5A6678';
    ctx.lineWidth = Math.round(1 * S);
    ctx.beginPath();
    ctx.moveTo(kHalfW, ky);
    ctx.lineTo(kHalfW, ky + kH);
    ctx.stroke();

    ctx.fillStyle = '#485566';
    ctx.fillRect(0, ky + Math.round(2 * S), kHalfW - 1, Math.round(5 * S));
    ctx.fillRect(0, ky + kH - Math.round(7 * S), kHalfW - 1, Math.round(5 * S));

    const ly = ky + Math.round(11 * S);
    drawCyberYellowKnuckleCore(ctx, 0, ly, kLimeHalfW, kLimeH, true, S);

    // === RIGHT EDGE (LEFT-HALF KNUCKLE) ===
    const rKnuckleGrad = ctx.createLinearGradient(W - kHalfW, ky, W, ky);
    rKnuckleGrad.addColorStop(0.0, '#0C0E14');
    rKnuckleGrad.addColorStop(0.6, '#1C222B');
    rKnuckleGrad.addColorStop(1.0, '#3A4452');
    ctx.fillStyle = rKnuckleGrad;
    ctx.fillRect(W - kHalfW, ky, kHalfW, kH);

    ctx.strokeStyle = '#5A6678';
    ctx.lineWidth = Math.round(1 * S);
    ctx.beginPath();
    ctx.moveTo(W - kHalfW, ky);
    ctx.lineTo(W - kHalfW, ky + kH);
    ctx.stroke();

    ctx.fillStyle = '#485566';
    ctx.fillRect(W - kHalfW + 1, ky + Math.round(2 * S), kHalfW, Math.round(5 * S));
    ctx.fillRect(W - kHalfW + 1, ky + kH - Math.round(7 * S), kHalfW, Math.round(5 * S));

    drawCyberYellowKnuckleCore(ctx, W - kLimeHalfW, ly, kLimeHalfW, kLimeH, false, S);
  }

  // Side rails and guide rods
  if (!isLeftRight) {
    ctx.fillStyle = '#0C0E14';
    ctx.fillRect(0, H_TOP, W_SIDE, H - H_TOP - H_BTM);
    ctx.fillRect(W - W_SIDE, H_TOP, W_SIDE, H - H_TOP - H_BTM);

    const rodW = Math.round(4 * S);
    for (let rx = 0; rx < rodW; rx++) {
      const rc = Math.round(240 - rx * (120 / rodW));
      ctx.strokeStyle = `rgb(${rc}, ${rc}, ${rc + 5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, H_TOP + Math.round(45 * S));
      ctx.lineTo(rx, H - H_BTM - Math.round(45 * S));
      ctx.stroke();
    }
    for (let rx = 0; rx < rodW; rx++) {
      const rc = Math.round(120 + rx * (120 / rodW));
      ctx.strokeStyle = `rgb(${rc}, ${rc}, ${rc + 5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W - rodW + rx, H_TOP + Math.round(45 * S));
      ctx.lineTo(W - rodW + rx, H - H_BTM - Math.round(45 * S));
      ctx.stroke();
    }
  }
}
