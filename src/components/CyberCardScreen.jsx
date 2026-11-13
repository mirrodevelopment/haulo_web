import React from 'react';
import hauloIconLogo from '../assets/logo/haulo-icon-logo.png';

/**
 * CyberCardScreen
 * Futuristic interactive cyber screen placed inside the 3D Cyber Frame.
 * Replaces static pre-baked images (service-page-card.png) with true dynamic
 * cybernetic service UI interfaces.
 */
export const CyberCardScreen = ({
  badge = '01 // ARCHITECTURE',
  tagline = 'CORE ENGINE',
  title = 'WEB DEVELOPMENT',
  subtitle = 'High-performance spatial web architectures & immersive digital systems.',
  metrics = ['REACT 18', 'THREE.JS', 'CLOUD NATIVE'],
  status = 'SYSTEM READY // 99.9% UPTIME',
  accentColor = '#00f0ff',
  isLogoCard = false,
  logoRef = null
}) => {
  return (
    <div className="cyberScreenRoot">
      {/* Background ambient mesh & tech grid */}
      <div
        className="cyberScreenBg"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 20%, ${accentColor}18 0%, rgba(6, 8, 14, 0.96) 65%, #030408 100%)`
        }}
      />
      <div className="cyberScreenGrid" />

      {/* Top technical status header */}
      <div className="cyberScreenHeader">
        <span className="cyberScreenBadge" style={{ color: accentColor, borderColor: `${accentColor}44` }}>
          {badge}
        </span>
        <span className="cyberScreenSignal">
          <span className="cyberSignalDot" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
          LIVE
        </span>
      </div>

      {/* Middle Core Area */}
      <div className="cyberScreenBody">
        {isLogoCard ? (
          <div className="cyberLogoContainer" ref={logoRef}>
            <div
              className="cyberLogoBacklight"
              style={{ background: `radial-gradient(circle, ${accentColor}44 0%, transparent 70%)` }}
            />
            <img src={hauloIconLogo} alt="Haulo Logo" className="cyberLogoImg" decoding="async" />
            <div className="cyberLogoLabel">
              <span className="cyberLogoLabelMain">HAULO LABS</span>
              <span className="cyberLogoLabelSub">BEYOND DIGITAL LIMITS</span>
            </div>
          </div>
        ) : (
          <div className="cyberContentBlock">
            <span className="cyberTagline" style={{ color: `${accentColor}cc` }}>
              {tagline}
            </span>
            <h2 className="cyberTitle">{title}</h2>
            <p className="cyberSubtitle">{subtitle}</p>

            {/* Metric pill tags */}
            <div className="cyberTagsRow">
              {metrics.map((tag, i) => (
                <span
                  key={i}
                  className="cyberMetricTag"
                  style={{ borderColor: `${accentColor}33`, color: '#d0d8e8' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom technical telemetry readout */}
      <div className="cyberScreenFooter">
        <div className="cyberFooterLine" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)` }} />
        <div className="cyberFooterRow">
          <span className="cyberStatusText">{status}</span>
          <span className="cyberHexCode" style={{ color: `${accentColor}88` }}>0x7F4A</span>
        </div>
      </div>
    </div>
  );
};

export default CyberCardScreen;

