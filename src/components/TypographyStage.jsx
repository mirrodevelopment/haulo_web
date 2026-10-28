import React from 'react';
import { WordLayer } from './WordLayer';
import Frog3D from '../frog_3D/Frog3DModel';

export function TypographyStage({
  hauloRef,
  designRef,
  thinkRef,
  buildRef,
  evolveRef,
  hauloFrogRef,
  frogFacingRef,
}) {
  return (
    <div className="typography-stage">
      {/* 3D Moving Typography */}
      <WordLayer word="HAULO" className="word-haulo" imgSrc="/HAULO-LOGO-TEXT.png" alt="HAULO" ref={hauloRef} />
      <WordLayer word="DESIGN TO" className="word-design" ref={designRef} />
      <WordLayer word="THINK" className="word-think" ref={thinkRef} />
      <WordLayer word="BUILD" className="word-build" ref={buildRef} />
      <WordLayer word="AND EVOLVE" className="word-evolve" ref={evolveRef} />

      {/* One shared 3D frog travels through every typography stage. */}
      <div className="word-frog word-frog-haulo word-frog-shared" ref={hauloFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <Frog3D wordIndex={0} facingRef={frogFacingRef} />
      </div>
    </div>
  );
}
