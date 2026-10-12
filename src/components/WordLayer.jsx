import React, { forwardRef } from 'react';

export const WordLayer = forwardRef(({ word, className, imgSrc, alt }, ref) => {
  return (
    <div className={`word-layer ${className}`} ref={ref}>
      {imgSrc ? (
        <img className="word-layer__img" src={imgSrc} alt={alt || word} draggable={false} />
      ) : (
        word
      )}
    </div>
  );
});

WordLayer.displayName = 'WordLayer';
