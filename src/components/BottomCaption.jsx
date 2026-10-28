import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroButtons } from './HeroButtons';
import '../styles/buttons.css';

export const BottomCaption = forwardRef(function BottomCaption(props, ref) {
  const navigate = useNavigate();

  const handleWorkClick = (e) => {
    e.stopPropagation();
    navigate('/work');
  };

  const handleServicesClick = (e) => {
    e.stopPropagation();
    navigate('/about');
  };

  return (
    <div className="bottom-caption-container" ref={ref}>
      {/* Hero Tech Buttons */}
      <HeroButtons
        onViewWork={handleWorkClick}
        onExplore={handleServicesClick}
      />
    </div>
  );
});

