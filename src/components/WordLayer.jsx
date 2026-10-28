import React, { forwardRef } from 'react';

// Exact target dimensions matching the 4 reference images
const WORD_CONFIGS = {
  'DESIGN TO': {
    w: 1548,
    h: 394,
    y: 366,
    fontSize: 500
  },
  'THINK': {
    w: 1548,
    h: 394,
    y: 366,
    fontSize: 500
  },
  'BUILD': {
    w: 1548,
    h: 394,
    y: 366,
    fontSize: 500
  },
  'AND EVOLVE': {
    w: 1616,
    h: 394,
    y: 366,
    fontSize: 500
  }
};

export const WordLayer = forwardRef(({ word, className, imgSrc, alt }, ref) => {
  const cfg = WORD_CONFIGS[word];

  return (
    <div className={`word-layer ${className}`} ref={ref}>
      {imgSrc ? (
        <img className="word-layer__img" src={imgSrc} alt={alt || word} draggable={false} />
      ) : cfg ? (
        <svg
          className="word-layer__svg"
          viewBox={`0 0 ${cfg.w} ${cfg.h}`}
          width="100%"
          height="100%"
          overflow="visible"
          aria-label={word}
        >
          <text
            x="0"
            y={cfg.y}
            textLength={cfg.w}
            lengthAdjust="spacingAndGlyphs"
            fontFamily="'Bebas Neue', 'Oswald', sans-serif"
            fontWeight="900"
            fontSize={cfg.fontSize}
            fill="#000000"
          >
            {word}
          </text>
        </svg>
      ) : (
        word
      )}
    </div>
  );
});

WordLayer.displayName = 'WordLayer';
