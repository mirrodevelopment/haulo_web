import * as THREE from 'three';
import { drawImageCover } from './proceduralFrameRenderer';

export const CW_TEX = 700;
export const CH_TEX = 960;
export const LINE_W = 5;

/**
 * Creates and renders a dynamic Three.js CanvasTexture for a carousel card item.
 * Features:
 * - Cover-fit image with fallback color
 * - Bottom gradient scrim for high-contrast legibility
 * - Pure white one-word title and one-line text
 * - Crisp white edge divider seams
 * - Asynchronous image loading and live texture updates
 */
export function createCardTexture(item, maxAnisotropy = 8) {
  const color = (typeof item === 'string' && (item.startsWith('#') || item.startsWith('rgb')))
    ? item
    : (item?.color || '#0D52D6');
  const title = (typeof item === 'object' && item?.title)
    ? item.title
    : 'HAULO';
  const text = (typeof item === 'object' && item?.text)
    ? item.text
    : 'Intelligent spatial computing platform.';
  const imgSrc = (typeof item === 'object' && item?.image)
    ? item.image
    : (typeof item === 'string' && !item.startsWith('#') && !item.startsWith('rgb') ? item : null);

  const cvs = document.createElement('canvas');
  cvs.width = CW_TEX;
  cvs.height = CH_TEX;
  const cctx = cvs.getContext('2d');

  const tex = new THREE.CanvasTexture(cvs);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = maxAnisotropy;

  function renderCard(loadedImg = null) {
    // 1. Fill card content (image or fallback color)
    if (loadedImg && (loadedImg.complete && (loadedImg.naturalWidth || loadedImg.width) > 0)) {
      cctx.fillStyle = color;
      cctx.fillRect(0, 0, CW_TEX, CH_TEX);
      drawImageCover(cctx, loadedImg, 0, 0, CW_TEX, CH_TEX);

      // Subtle overall overlay so white text & divider lines pop with clarity
      cctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      cctx.fillRect(0, 0, CW_TEX, CH_TEX);
    } else {
      cctx.fillStyle = color;
      cctx.fillRect(0, 0, CW_TEX, CH_TEX);
    }

    // 2. Title (one word) & Text (one line) positioned at the BOTTOM in WHITE color
    const scrim = cctx.createLinearGradient(0, CH_TEX - 320, 0, CH_TEX - 80);
    scrim.addColorStop(0.0, 'rgba(0, 0, 0, 0.0)');
    scrim.addColorStop(0.45, 'rgba(0, 0, 0, 0.50)');
    scrim.addColorStop(1.0, 'rgba(0, 0, 0, 0.82)');
    cctx.fillStyle = scrim;
    cctx.fillRect(0, CH_TEX - 320, CW_TEX, 240);

    cctx.save();
    cctx.textAlign = 'center';
    cctx.textBaseline = 'middle';

    // Drop shadow for crisp legibility against all backgrounds
    cctx.shadowColor = 'rgba(0, 0, 0, 0.70)';
    cctx.shadowBlur = 14;
    cctx.shadowOffsetX = 0;
    cctx.shadowOffsetY = 2;

    // Title: Bold One Word (White) at bottom
    cctx.fillStyle = '#FFFFFF';
    cctx.font = '700 58px "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif';
    if ('letterSpacing' in cctx) {
      cctx.letterSpacing = '5px';
    }
    cctx.fillText(title, CW_TEX / 2, CH_TEX - 180);

    // Text: Elegant One Line (White) below title
    cctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    cctx.font = '400 22px "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif';
    if ('letterSpacing' in cctx) {
      cctx.letterSpacing = '1px';
    }
    cctx.fillText(text, CW_TEX / 2, CH_TEX - 125);

    cctx.restore();

    // 3. Straight white vertical divider lines on left and right edges
    cctx.fillStyle = '#FFFFFF';
    cctx.fillRect(0, 0, LINE_W, CH_TEX);
    cctx.fillRect(CW_TEX - LINE_W, 0, LINE_W, CH_TEX);

    // 4. Subtle depth shadow on the inner edge of the white divider
    cctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    cctx.fillRect(LINE_W, 0, 1.5, CH_TEX);
    cctx.fillRect(CW_TEX - LINE_W - 1.5, 0, 1.5, CH_TEX);

    tex.needsUpdate = true;
  }

  // Initial immediate draw
  renderCard(null);

  // Asynchronously load card image and redraw
  if (imgSrc) {
    const img = new Image();
    img.onload = () => {
      renderCard(img);
    };
    img.src = imgSrc;
    if (img.complete && (img.naturalWidth || img.width) > 0) {
      renderCard(img);
    }
  }

  return { texture: tex, canvas: cvs };
}
