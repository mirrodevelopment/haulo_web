import React, { useEffect, useState } from 'react';
import { AboutHeader } from '../components/about/AboutHeader';
import { AboutHero } from '../components/about/AboutHero';
import { AboutLoader } from '../components/about/AboutLoader';
import { SelectedWork } from '../components/about/SelectedWork';
import { ServicesList } from '../components/about/ServicesList';
import { ClientWork } from '../components/about/ClientWork';
import { ApproachSection } from '../components/about/ApproachSection';
import { PhilosophySection } from '../components/about/PhilosophySection';
import { CapabilitySection } from '../components/about/CapabilitySection';
import { ExperimentsSection } from '../components/about/ExperimentsSection';
import { JournalSection } from '../components/about/JournalSection';
import { AboutFinalCTA } from '../components/about/AboutFinalCTA';
import { AboutFooter } from '../components/about/AboutFooter';
import { GlobalFloor } from '../components/GlobalFloor';
import '../styles/about.css';

export function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ABOUT — HAULO Architecture & Creative Technology';
    document.body.style.backgroundColor = '#F4F4F6';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="about-page">
      {/* Sleek Loading Screen on initial tab load */}
      {loading && <AboutLoader onComplete={() => setLoading(false)} />}

      {/* Shared GLOBAL FLOOR: futuristic floor behind all about content */}
      <GlobalFloor />

      {/* Header Navigation */}
      <AboutHeader />

      {/* 01 Hero / Opening Positioning */}
      <AboutHero />

      {/* 03-07 Selected Work Case Studies */}
      <SelectedWork />

      {/* 08 What We Do (Services) */}
      <ServicesList />

      {/* 09-12 Client Work */}
      <ClientWork />

      {/* 13 Approach: One Team. One Standard. */}
      <ApproachSection />

      {/* 14 Philosophy: Built Whole, Not in Fragments. */}
      <PhilosophySection />

      {/* 15 Capability: Technology x Design x Intelligence */}
      <CapabilitySection />

      {/* 16 More Work / Experiments */}
      <ExperimentsSection />

      {/* 17 From the Journal */}
      <JournalSection />

      {/* 18 Final CTA */}
      <AboutFinalCTA />

      {/* 19 Footer */}
      <AboutFooter />
    </div>
  );
}
