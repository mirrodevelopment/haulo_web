import React from 'react';
import { WordLayer } from './WordLayer';

export function TypographyStage({
  hauloRef,
  designRef,
  thinkRef,
  buildRef,
  evolveRef,
  
  hauloFrogRef,
  designFrogRef,
  thinkFrogRef,
  buildFrogRef,
  evolveFrogRef,
}) {
  return (
    <div className="typography-stage">
      {/* 3D Moving Typography */}
      <WordLayer word="HAULO" className="word-haulo" imgSrc="/HAULO-LOGO-TEXT.png" alt="HAULO" ref={hauloRef} />
      <WordLayer word="DESIGN TO" className="word-design" ref={designRef} />
      <WordLayer word="THINK" className="word-think" ref={thinkRef} />
      <WordLayer word="BUILD" className="word-build" ref={buildRef} />
      <WordLayer word="AND EVOLVE" className="word-evolve" ref={evolveRef} />

      {/* Grounded frog previews for each word */}
      <div className="word-frog word-frog-haulo" ref={hauloFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <img className="word-frog__img" src="/Frog_Img/1_Haulo_Img.png" alt="Haulo Frog" draggable={false} />
      </div>
      <div className="word-frog word-frog-design" ref={designFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <img className="word-frog__img" src="/Frog_Img/2_DesignTo_Img.png" alt="Design To Frog" draggable={false} />
      </div>
      <div className="word-frog word-frog-think" ref={thinkFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <img className="word-frog__img" src="/Frog_Img/3_Think_Img.png" alt="Think Frog" draggable={false} />
      </div>
      <div className="word-frog word-frog-build" ref={buildFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <img className="word-frog__img" src="/Frog_Img/build_Img.png" alt="Build Frog" draggable={false} />
      </div>
      <div className="word-frog word-frog-evolve" ref={evolveFrogRef}>
        <div className="frog-floor-shadow" aria-hidden="true" />
        <img className="word-frog__img" src="/Frog_Img/4_AndEvolve_Img.png" alt="And Evolve Frog" draggable={false} />
      </div>
    </div>
  );
}
