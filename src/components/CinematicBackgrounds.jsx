import React from "react";

export const CinematicBackgrounds = ({ bgDarkRef, bgLightRef }) => {
  return (
    <>
      <div ref={bgDarkRef} className="darkBackground" />
      <div ref={bgLightRef} className="lightBackground" />
    </>
  );
};

export default CinematicBackgrounds;
