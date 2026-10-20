import React from "react";

export const MarqueeLayer = ({ marqueeWorldRef, marqueeRef }) => {
  return (
    <div ref={marqueeWorldRef} className="worldLayer marqueeWorld">
      <div ref={marqueeRef} className="marqueeContainer">
        <div className="marqueeTrack">
          <h1 className="marqueeText">Building the web without limits</h1>
          <span className="marqueeDot">•</span>
          <h1 className="marqueeText">Design that sells without compromise</h1>
          <span className="marqueeDot">•</span>
          <h1 className="marqueeText">Design that feels as good as it looks</h1>
          <span className="marqueeDot">•</span>
          <h1 className="marqueeText">We build what moves the future</h1>
        </div>
      </div>
    </div>
  );
};

export default MarqueeLayer;
