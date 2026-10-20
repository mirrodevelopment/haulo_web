import React, { useState, useEffect, useRef } from 'react';

/**
 * Theory of Bloom Case Study Data for the 4 Modular Pods
 */
const POD_DATA = [
  {
    id: '01',
    label: 'BRIEF',
    titleTag: '01 / CASE STUDY — BRIEF',
    statusTag: 'PROJECT DOCKED',
    statusColor: '#d4e157',
    headline: 'THEORY',
    headlineSub: 'BLOOM',
    logo: '/second-section/Theory-of-Bloom-Logo.png',
    subtitle:
      'A brand and digital experience exploring storytelling, identity and immersive design through a refined botanical visual language.',
    tags: ['BRAND ARCHITECTURE', 'IMMERSIVE WEBGL', 'BOTANICAL IDENTITY']
  },
  {
    id: '02',
    label: 'SYSTEM',
    titleTag: '02 / CASE STUDY — SYSTEM',
    statusTag: 'SYSTEM ONLINE',
    statusColor: '#00b8d4',
    headline: 'STAKOR',
    headlineSub: '',
    subtitle:
      'Engineered procedural design tokens, reactive sacred geometry algorithms, and cyber-organic component architecture.',
    tags: ['GLSL SHADERS', 'PROCEDURAL TOKENS', 'SACRED GEOMETRY']
  },
  {
    id: '03',
    label: 'EXPERIENCE',
    titleTag: '03 / CASE STUDY — EXPERIENCE',
    statusTag: 'IMMERSIVE MODE',
    statusColor: '#8ac900',
    headline: 'TRULY',
    headlineSub: 'BARE',
    subtitle:
      'Multi-sensory tactile WebGL interaction ribbons, spatial acoustics, and high-frequency real-time physics deformation.',
    tags: ['DYNAMIC RIBBONS', 'SPATIAL AUDIO', 'VERLET SPRING']
  },
  {
    id: '04',
    label: 'RESULT',
    titleTag: '04 / CASE STUDY — RESULT',
    statusTag: 'DEPLOYED // VERIFIED',
    statusColor: '#9c27b0',
    headline: 'AWKN',
    headlineSub: '',
    subtitle:
      '120 FPS fluid mobile rendering, 4.2M global impressions, and recognized with FWA of the Day and Awwwards honors.',
    tags: ['GLOBAL RECOGNITION', 'FWA OF DAY', '4.2M IMPRESSIONS']
  }
];

export function SecondSection({ activePodIndex: controlledIndex, onSelectPod: controlledOnSelect }) {
  const [localIndex, setLocalIndex] = useState(0);
  const activePodIndex = controlledIndex !== undefined ? controlledIndex : localIndex;
  const handleSelectPod = controlledOnSelect || setLocalIndex;

  // Purposefully synchronized content transition state
  const [displayIndex, setDisplayIndex] = useState(activePodIndex);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentY, setContentY] = useState(0);
  const [contentBlur, setContentBlur] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // 1. As frog launches (0-260ms): gently dissolve out old case study with upward float
    setContentOpacity(0);
    setContentY(-8);
    setContentBlur(3);

    const t1 = setTimeout(() => {
      // 2. Mid-air apex (260ms): switch to new pod data and prep entry from below
      setDisplayIndex(activePodIndex);
      setContentY(8);
    }, 260);

    const t2 = setTimeout(() => {
      // 3. As frog descends & lands (310-750ms): smoothly glide in new case study
      setContentOpacity(1);
      setContentY(0);
      setContentBlur(0);
    }, 310);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activePodIndex]);

  const activePod = POD_DATA[displayIndex] || POD_DATA[0];

  return (
    <section
      id="case-study-dock"
      className="relative w-full select-none"
      style={{ height: '400vh' }}
      aria-label="Case Study - Theory of Bloom"
    >
      {/* Sticky Viewport Stage: Locks in viewport while scrolling through all 4 pods */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden select-none">
        {/* Studio Lighting Background Environment */}
        <div
          className="absolute inset-0 bg-white pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Subtle Ground Plane Seams */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1400px] h-px bg-black/5" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70vw] max-w-[1100px] h-px bg-black/5" />
        </div>



      {/* Central 3D Cybernetic Gantry Stage */}
      <div className="relative w-full flex items-center justify-center px-2 sm:px-4 md:px-6 z-10">
        {/* Fixed Aspect Ratio Container strictly locked to 1670 / 941 with generous headroom */}
        <div
          className="relative mx-auto select-none"
          style={{
            width: 'min(92vw, 1600px, calc((100vh - 120px) * 1670 / 941))',
            aspectRatio: '1670 / 941'
          }}
        >
          {/* Frame Top Header Title: INNOVATION WORKS */}
          <div className="absolute top-[5.2%] sm:top-[6.0%] md:top-[6.8%] lg:top-[7.4%] left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none text-center whitespace-nowrap">
            <h2 className="font-sans text-xs sm:text-sm md:text-base lg:text-[18px] uppercase tracking-[0.26em] text-[#08090b] font-bold leading-none">
              innovation works
            </h2>
          </div>

          {/* ========================================================= */}
          {/* LAYER 1: Panoramic Curved Screen Surface & Content (z-10) */}
          {/* Fits precisely within the gantry monitor bezel aperture   */}
          {/* ========================================================= */}
          <div
            className="absolute rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col justify-between pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-4 md:pb-4 px-6 sm:px-10 md:px-14 lg:px-16 transition-all duration-300"
            style={{
              top: '18.5%',
              bottom: '27.2%',
              left: '14.5%',
              right: '14.5%',
              background: 'radial-gradient(ellipse at 50% 45%, #ffffff 58%, #f6f8fb 86%, #edf0f5 100%)',
              boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.04), inset 0 2px 6px rgba(255, 255, 255, 0.9)'
            }}
          >
            {/* Screen Center Showcase: Pure Editorial Typography (Dynamic per pod) */}
            <div
              className="flex flex-col items-center justify-center my-auto text-center px-4 sm:px-8 z-10 will-change-[transform,opacity,filter]"
              style={{
                opacity: contentOpacity,
                transform: `translate3d(0, ${contentY}px, 0)`,
                filter: `blur(${contentBlur}px)`,
                transition: contentOpacity === 1
                  ? 'opacity 440ms cubic-bezier(0.16, 1, 0.3, 1), transform 440ms cubic-bezier(0.16, 1, 0.3, 1), filter 440ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1), filter 250ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Category / Case Study Split Header: Moved further out to left & right edges */}
              <div className="w-full flex items-center justify-between px-1 sm:px-2 md:px-3 mb-2.5 sm:mb-3">
                <div className="flex items-center -ml-3 sm:-ml-5 md:-ml-8 lg:-ml-9">
                  <span className="font-mono text-[8px] sm:text-[9.5px] md:text-[11px] font-bold tracking-[0.2em] text-[#555a66] uppercase">
                    {activePod.id} / CASE STUDY
                  </span>
                </div>
                <div className="flex items-center gap-1.5 -mr-3 sm:-mr-5 md:-mr-8 lg:-mr-9">
                  <span className="font-mono text-[8px] sm:text-[9.5px] md:text-[11px] font-bold tracking-[0.2em] text-[#0d0f12] uppercase px-2.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.07]">
                    {activePod.label}
                  </span>
                </div>
              </div>

              {/* Dynamic Editorial Headline / Logo */}
              <div className="flex flex-col items-center justify-center select-text">
                {activePod.logo ? (
                  <img
                    src={activePod.logo}
                    alt={`${activePod.headline} Logo`}
                    className="w-auto h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.06)] pointer-events-none select-none mt-0.5 mb-1 sm:mb-1.5"
                  />
                ) : (
                  <>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-semibold tracking-[0.06em] text-[#0d0f12] uppercase leading-none">
                      {activePod.headline}
                    </h2>
                    {activePod.headlineSub && (
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-semibold tracking-[0.06em] text-[#0d0f12] uppercase leading-none mt-1 sm:mt-1.5">
                        {activePod.headlineSub}
                      </h3>
                    )}
                  </>
                )}
              </div>

              {/* Subtitle Description */}
              <p className="font-serif italic text-[8.5px] sm:text-[9.5px] md:text-[11px] lg:text-[12.5px] xl:text-[13.5px] text-[#2c3038] text-center max-w-[88%] sm:max-w-[82%] md:max-w-md lg:max-w-lg mx-auto leading-relaxed mt-1 sm:mt-1.5 mb-1 sm:mb-2 select-text">
                {activePod.subtitle}
              </p>
            </div>

            {/* Subtle Screen Ambient Vignette Reflection Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent z-10" />
          </div>

          {/* ========================================================= */}
          {/* LAYER 2: Transparent Robotic Gantry Frame (z-20)          */}
          {/* Fully transparent inside and outside, overlays cleanly    */}
          {/* ========================================================= */}
          <img
            src="/second-section/work-second-frame.png"
            alt="Robotic Gantry Frame"
            className="absolute inset-0 w-full h-full block pointer-events-none select-none z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
          />

          {/* ========================================================= */}
          {/* LAYER 3: 4 Modular Pod Clickable Tabs (z-30)              */}
          {/* Perfectly aligned over each cylinder face in the image    */}
          {/* ========================================================= */}
          {/* Pod 01: BRIEF */}
          <button
            type="button"
            onClick={() => handleSelectPod(0)}
            className={`absolute flex items-center justify-between px-2 sm:px-2.5 md:px-3.5 py-1 cursor-pointer transition-all duration-200 z-30 group rounded-xs outline-none ${
              activePodIndex === 0
                ? 'bg-black/[0.04] shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]'
                : 'hover:bg-black/[0.02]'
            }`}
            style={{
              left: '12.74%',
              width: '10.11%',
              top: '85.02%',
              height: '9.35%'
            }}
            aria-label="Pod 01: BRIEF"
          >
            <div className="flex flex-col items-start leading-tight">
              <span
                className={`font-mono text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-bold transition-colors ${
                  activePodIndex === 0 ? 'text-[#0d0f12]' : 'text-[#333] group-hover:text-black'
                }`}
              >
                01
              </span>
              <span
                className={`font-mono text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] tracking-wider font-semibold transition-colors ${
                  activePodIndex === 0 ? 'text-[#0d0f12] font-bold' : 'text-[#444] group-hover:text-black'
                }`}
              >
                BRIEF
              </span>
            </div>
            <span
              className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-[1px] transition-all duration-300 ${
                activePodIndex === 0
                  ? 'bg-[#d4e157] shadow-[0_0_8px_#d4e157]'
                  : 'bg-[#d4e157]/30 group-hover:bg-[#d4e157]/60'
              }`}
            />
          </button>

          {/* Pod 02: SYSTEM */}
          <button
            type="button"
            onClick={() => handleSelectPod(1)}
            className={`absolute flex items-center justify-between px-2 sm:px-2.5 md:px-3.5 py-1 cursor-pointer transition-all duration-200 z-30 group rounded-xs outline-none ${
              activePodIndex === 1
                ? 'bg-black/[0.04] shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]'
                : 'hover:bg-black/[0.02]'
            }`}
            style={{
              left: '33.85%',
              width: '9.09%',
              top: '85.02%',
              height: '9.35%'
            }}
            aria-label="Pod 02: SYSTEM"
          >
            <div className="flex flex-col items-start leading-tight">
              <span
                className={`font-mono text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-bold transition-colors ${
                  activePodIndex === 1 ? 'text-[#0d0f12]' : 'text-[#333] group-hover:text-black'
                }`}
              >
                02
              </span>
              <span
                className={`font-mono text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] tracking-wider font-semibold transition-colors ${
                  activePodIndex === 1 ? 'text-[#0d0f12] font-bold' : 'text-[#444] group-hover:text-black'
                }`}
              >
                SYSTEM
              </span>
            </div>
            <span
              className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-[1px] transition-all duration-300 ${
                activePodIndex === 1
                  ? 'bg-[#00b8d4] shadow-[0_0_8px_#00b8d4]'
                  : 'bg-[#00b8d4]/30 group-hover:bg-[#00b8d4]/60'
              }`}
            />
          </button>

          {/* Pod 03: EXPERIENCE */}
          <button
            type="button"
            onClick={() => handleSelectPod(2)}
            className={`absolute flex items-center justify-between px-2 sm:px-2.5 md:px-3.5 py-1 cursor-pointer transition-all duration-200 z-30 group rounded-xs outline-none ${
              activePodIndex === 2
                ? 'bg-black/[0.04] shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]'
                : 'hover:bg-black/[0.02]'
            }`}
            style={{
              left: '56.88%',
              width: '10.47%',
              top: '84.70%',
              height: '9.99%'
            }}
            aria-label="Pod 03: EXPERIENCE"
          >
            <div className="flex flex-col items-start leading-tight">
              <span
                className={`font-mono text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-bold transition-colors ${
                  activePodIndex === 2 ? 'text-[#0d0f12]' : 'text-[#333] group-hover:text-black'
                }`}
              >
                03
              </span>
              <span
                className={`font-mono text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] tracking-wider font-semibold transition-colors ${
                  activePodIndex === 2 ? 'text-[#0d0f12] font-bold' : 'text-[#444] group-hover:text-black'
                }`}
              >
                EXPERIENCE
              </span>
            </div>
            <span
              className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-[1px] transition-all duration-300 ${
                activePodIndex === 2
                  ? 'bg-[#8ac900] shadow-[0_0_8px_#8ac900]'
                  : 'bg-[#8ac900]/30 group-hover:bg-[#8ac900]/60'
              }`}
            />
          </button>

          {/* Pod 04: RESULT */}
          <button
            type="button"
            onClick={() => handleSelectPod(3)}
            className={`absolute flex items-center justify-between px-2 sm:px-2.5 md:px-3.5 py-1 cursor-pointer transition-all duration-200 z-30 group rounded-xs outline-none ${
              activePodIndex === 3
                ? 'bg-black/[0.04] shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]'
                : 'hover:bg-black/[0.02]'
            }`}
            style={{
              left: '78.47%',
              width: '8.61%',
              top: '85.02%',
              height: '9.67%'
            }}
            aria-label="Pod 04: RESULT"
          >
            <div className="flex flex-col items-start leading-tight">
              <span
                className={`font-mono text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-bold transition-colors ${
                  activePodIndex === 3 ? 'text-[#0d0f12]' : 'text-[#333] group-hover:text-black'
                }`}
              >
                04
              </span>
              <span
                className={`font-mono text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] tracking-wider font-semibold transition-colors ${
                  activePodIndex === 3 ? 'text-[#0d0f12] font-bold' : 'text-[#444] group-hover:text-black'
                }`}
              >
                RESULT
              </span>
            </div>
            <span
              className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-[1px] transition-all duration-300 ${
                activePodIndex === 3
                  ? 'bg-[#9c27b0] shadow-[0_0_8px_#9c27b0]'
                  : 'bg-[#9c27b0]/30 group-hover:bg-[#9c27b0]/60'
              }`}
            />
          </button>

          {/* ========================================================= */}
          {/* LAYER 4: Perched Cyber Frog Landing Anchors for 4 Pods    */}
          {/* Exact landing target coordinate anchors for hop physics   */}
          {/* ========================================================= */}
          {/* Pod 01 Anchor */}
          <div
            id="frog-landing-pod-0"
            className="absolute pointer-events-none z-30 opacity-0"
            style={{
              left: '11.8%',
              width: '12.0%',
              top: '71.5%',
              height: '13.5%'
            }}
            aria-hidden="true"
          />
          {/* Pod 02 Anchor */}
          <div
            id="frog-landing-pod-1"
            className="absolute pointer-events-none z-30 opacity-0"
            style={{
              left: '32.3%',
              width: '12.0%',
              top: '71.5%',
              height: '13.5%'
            }}
            aria-hidden="true"
          />
          {/* Pod 03 Anchor */}
          <div
            id="frog-landing-pod-2"
            className="absolute pointer-events-none z-30 opacity-0"
            style={{
              left: '56.0%',
              width: '12.0%',
              top: '71.2%',
              height: '13.5%'
            }}
            aria-hidden="true"
          />
          {/* Pod 04 Anchor */}
          <div
            id="frog-landing-pod-3"
            className="absolute pointer-events-none z-30 opacity-0"
            style={{
              left: '76.6%',
              width: '12.0%',
              top: '71.5%',
              height: '13.5%'
            }}
            aria-hidden="true"
          />
          {/* Backwards compatible fallback alias anchor for Pod 0 */}
          <div
            id="frog-landing-pod-target"
            className="absolute pointer-events-none z-30 opacity-0"
            style={{
              left: '11.8%',
              width: '12.0%',
              top: '71.5%',
              height: '13.5%'
            }}
            aria-hidden="true"
          />

        </div>
      </div>
    </div>
  </section>
);
}

export default SecondSection;
