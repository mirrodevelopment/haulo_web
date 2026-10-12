import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { GlobalFloor } from '../components/GlobalFloor';
import { WorkHero } from '../components/work/WorkHero';
import { WorkShowcase } from '../components/work/WorkShowcase';
import { WorkClosing } from '../components/work/WorkClosing';
import { WorkFooter } from '../components/work/WorkFooter';

export function WorkPage() {
  useEffect(() => {
    // Scroll cleanly to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="work-page">
      {/* 1. Dedicated Reference Lavender/Periwinkle Dotted Atmosphere */}
      <div className="work-bg-layer">
        <div className="work-bg-gradient" />
        <div className="work-bg-dots" />
        <div className="work-bg-orb" aria-hidden="true" />
        <div className="work-bg-orb-secondary" aria-hidden="true" />
      </div>

      {/* Shared GLOBAL FLOOR: futuristic floor behind all work content */}
      <GlobalFloor />

      {/* 2. Top Header Navigation */}
      <Header />

      {/* 3. Main Work Page Content Flow */}
      <main className="work-content-flow">
        <WorkHero />
        <WorkShowcase />
        <WorkClosing />
        <WorkFooter />
      </main>
    </div>
  );
}
