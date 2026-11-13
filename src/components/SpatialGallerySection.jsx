import React, { useRef, useCallback, useState, useEffect } from "react";

// Section 1: Service Universe Track & Platforms Assets
import frameCenterImg from "../assets/gallery/frame-center.webp";
import frameTopBeamImg from "../assets/gallery/frame-top-beam.webp";
import frameCornerImg from "../assets/gallery/frame-corner.webp";
import cosmicVortexImg from "../assets/gallery/cosmic-vortex.webp";
import brandImg from "../assets/gallery/brand.webp";
import contentImg from "../assets/gallery/content.webp";
import automationImg from "../assets/gallery/automation.webp";
import seoImg from "../assets/gallery/seo.webp";
import iotImg from "../assets/gallery/iot.webp";
import mobileImg from "../assets/gallery/mobile.webp";
import cloudImg from "../assets/gallery/cloud.webp";
import webImg from "../assets/gallery/web.webp";
import erpImg from "../assets/gallery/erp.webp";
import aiImg from "../assets/gallery/ai.webp";
import ecommerceImg from "../assets/gallery/e-commerce.webp";

// Section 2 (Face 2 / Back Side) Assets
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import spaceImg from "../assets/space-img/final-sapce.webp";
import earthImg from "../assets/space-img/earth.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";
import { ThreeEditorialWorld } from "./ThreeEditorialWorld";
import ButtonBorderTrace from "./ButtonBorderTrace";
import "./HeroButtons.css";

// 11 3D Service Platforms on the Orbital Spiral Track - Locked to 2:1 Frame Track
const UNIVERSE_SERVICE_NODES = [
  {
    id: "brand",
    code: "01",
    name: "BRAND &\nIDENTITY",
    category: "CREATIVE & STRATEGY",
    desc: "We shape enduring brands through visionary identity systems, precision 3D assets, and scalable design languages.",
    capabilities: ["Brand Strategy", "Visual Identity System", "3D Motion & Assets", "Design Guidelines", "Brand Voice"],
    img: brandImg,
    left: "20.8%",
    top: "33.4%",
    width: "17.7%",
    zIndex: 13,
    labelAlign: "right",
    labelStyle: { left: "84%", top: "22%" }
  },
  {
    id: "content",
    code: "02",
    name: "CONTENT &\nMEDIA",
    category: "PRODUCTION & STORYTELLING",
    desc: "Cinematic digital narratives, high-fidelity 3D motion, and compelling visual content engineered to stop the scroll.",
    capabilities: ["3D Animation", "Cinematic Teasers", "Art Direction", "Motion Graphics", "Content Ecosystems"],
    img: contentImg,
    left: "47.8%",
    top: "20.9%",
    width: "14.8%",
    zIndex: 8,
    labelAlign: "right",
    labelStyle: { left: "85%", top: "22%" }
  },
  {
    id: "automation",
    code: "03",
    name: "AUTOMATION",
    category: "PROCESS OPTIMIZATION",
    desc: "Autonomous workflow pipelines, robotic process execution, and seamless intelligent data bridges.",
    capabilities: ["Workflow Pipelines", "Autonomous Bots", "API Orchestration", "CI/CD Architecture", "Real-Time Sync"],
    img: automationImg,
    left: "71.0%",
    top: "13.4%",
    width: "8.0%",
    zIndex: 7,
    labelAlign: "right",
    labelStyle: { left: "15%", top: "-30%" }
  },
  {
    id: "seo",
    code: "04",
    name: "SEO &\nGROWTH",
    category: "PERFORMANCE & AUDIENCE",
    desc: "Data-driven organic search architectures, technical speed optimization, and viral conversion flywheels.",
    capabilities: ["Technical SEO", "Core Web Vitals", "Semantic Search", "Funnel Optimization", "Growth Analytics"],
    img: seoImg,
    left: "84.7%",
    top: "7.6%",
    width: "6.1%",
    zIndex: 6,
    labelAlign: "right",
    labelStyle: { left: "10%", top: "-38%" }
  },
  {
    id: "iot",
    code: "05",
    name: "HARDWARE\n& IOT",
    category: "EMBEDDED INTELLIGENCE",
    desc: "Bridging the physical and digital with custom sensor telemetry, connected hardware prototypes, and embedded firmware.",
    capabilities: ["Embedded Firmware", "Edge Telemetry", "Hardware Prototyping", "BLE / MQTT", "Industrial IoT Hubs"],
    img: iotImg,
    left: "90.6%",
    top: "27.6%",
    width: "5.9%",
    zIndex: 9,
    labelAlign: "left",
    labelStyle: { right: "108%", top: "35%" }
  },
  {
    id: "mobile",
    code: "06",
    name: "MOBILE\nDEVELOPMENT",
    category: "NATIVE & CROSS-PLATFORM",
    desc: "Fluid, high-performance mobile applications engineered with native iOS/Android, Flutter, and cutting-edge haptic UX.",
    capabilities: ["iOS / Swift", "Android / Kotlin", "Cross-Platform Flutter", "Biometrics & Apple Pay", "Offline-First Sync"],
    img: mobileImg,
    left: "38.9%",
    top: "43.4%",
    width: "16.3%",
    zIndex: 14,
    labelAlign: "right",
    labelStyle: { left: "86%", top: "32%" }
  },
  {
    id: "cloud",
    code: "07",
    name: "CLOUD &\nINFRASTRUCTURE",
    category: "SCALABLE SYSTEMS",
    desc: "Rock-solid cloud architecture, zero-downtime microservices, and elastic infrastructure engineered to handle millions.",
    capabilities: ["AWS / GCP Architecture", "Kubernetes & Docker", "High Availability", "Zero-Trust Security", "Terraform / IaC"],
    img: cloudImg,
    left: "76.6%",
    top: "42.5%",
    width: "17.7%",
    zIndex: 12,
    labelAlign: "right",
    labelStyle: { left: "86%", top: "38%" }
  },
  {
    id: "web",
    code: "08",
    name: "WEB\nDEVELOPMENT",
    category: "FULL-STACK PLATFORMS",
    desc: "Award-winning web experiences, custom SaaS platforms, and blisteringly fast architectures built with React and Next.js.",
    capabilities: ["Next.js & React", "WebGL & 3D Shaders", "Enterprise SaaS Portals", "Headless CMS", "Real-Time WebSockets"],
    img: webImg,
    left: "7.2%",
    top: "69.9%",
    width: "21.4%",
    zIndex: 18,
    labelAlign: "right",
    labelStyle: { left: "86%", top: "25%" }
  },
  {
    id: "erp",
    code: "09",
    name: "ERP /\nSYSTEMS",
    category: "ENTERPRISE CORE",
    desc: "Custom operational software, real-time logistics tracking, and enterprise-grade resource planning hubs.",
    capabilities: ["Custom ERP Platforms", "CRM Systems", "Inventory Telemetry", "Role-Based Access", "Custom API Integrations"],
    img: erpImg,
    left: "58.6%",
    top: "60.0%",
    width: "16.3%",
    zIndex: 15,
    labelAlign: "right",
    labelStyle: { left: "85%", top: "34%" }
  },
  {
    id: "ai",
    code: "10",
    name: "AI\nINTEGRATION",
    category: "APPLIED MACHINE INTELLIGENCE",
    desc: "Next-generation LLM agents, private enterprise RAG pipelines, predictive machine learning models, and automated reasoning.",
    capabilities: ["Autonomous AI Agents", "Private Vector RAG", "Fine-Tuned LLMs", "Predictive Analytics", "Computer Vision"],
    img: aiImg,
    left: "87.7%",
    top: "83.2%",
    width: "21.4%",
    zIndex: 17,
    labelAlign: "right",
    labelStyle: { left: "84%", top: "26%" }
  },
  {
    id: "ecommerce",
    code: "11",
    name: "E-COMMERCE\nDEVELOPMENT",
    category: "GLOBAL DIGITAL COMMERCE",
    desc: "High-converting headless commerce experiences, frictionless one-click checkouts, and custom store ecosystems.",
    capabilities: ["Headless Shopify", "Multi-Currency Checkout", "Custom Cart Logic", "Interactive 3D Viewers", "ERP & Inventory Sync"],
    img: ecommerceImg,
    left: "37.5%",
    top: "81.6%",
    width: "24.4%",
    zIndex: 19,
    labelAlign: "right",
    labelStyle: { left: "88%", top: "35%" }
  }
];

export const SpatialGallerySection = ({
  galleryWorldRef,
  batch1NodesRef,
  batch2NodesRef
}) => {
  const stageRef = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleNodeClick = useCallback((e, id) => {
    e.stopPropagation();
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const handleStageClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedNodeId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = stageRef.current;
    if (!el) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    el.style.setProperty("--gx", nx.toFixed(3));
    el.style.setProperty("--gy", ny.toFixed(3));
    el.style.setProperty("--mx-tilt", `${(-nx * 4.5).toFixed(2)}deg`);
    el.style.setProperty("--my-tilt", `${(ny * 3.5).toFixed(2)}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--gx", "0");
    el.style.setProperty("--gy", "0");
    el.style.setProperty("--mx-tilt", "0deg");
    el.style.setProperty("--my-tilt", "0deg");
  }, []);

  return (
    <div ref={galleryWorldRef} className="worldLayer galleryWorld editorialGalleryWorld">
      {/* 2D Cosmic Starfield Canvas (Twinkling Stars & 4-Point Glints) */}
      <GalleryStarfieldCanvas />
      {/* Three.js 3D Background World (particle constellation, dynamic lighting) */}
      <ThreeEditorialWorld />

      <div
        ref={stageRef}
        className="editorialStage"
        onClick={handleStageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ==============================================================
            FACE 1: SERVICE UNIVERSE HERO SHOWCASE
            ============================================================== */}
        <div className="editorialFace editorialFaceFront">
          {/* Deep Space Sky Atmosphere & Cosmic Glow (Behind Track & Platforms) */}
          <div className="universeSkyAtmosphere" aria-hidden="true">
            <div className="universeSkyNebula" />
            <div className="universeSkyVortex">
              <img
                src={cosmicVortexImg}
                alt="Cosmic Singularity Vortex"
                className="universeSkyVortexImg"
                draggable={false}
              />
            </div>
          </div>

          {/* Top Ceiling Framing Rail Beam */}
          <div className="universeTopBeam">
            <img
              src={frameTopBeamImg}
              alt="Ceiling Framing Beam"
              className="universeTopBeamImg"
              draggable={false}
            />
          </div>

          {/* Orbital System: Futuristic Tech Rail Track + 11 Service Platforms */}
          <div className="universeOrbitSystem">
            {/* Centered Futuristic Orbital Tech Rail Track */}
            <div className="universeCenterFrameContainer">
              <img
                src={frameCenterImg}
                alt="Orbital Tech Frame"
                className="universeCenterFrameImg"
                draggable={false}
              />

              {/* 11 Interactive 3D Service Platforms Locked Directly on the Orbital Track */}
              <div className="universeNodesStage">
                {UNIVERSE_SERVICE_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isDimmed = selectedNodeId !== null && !isSelected;

                  return (
                    <div
                      key={node.id}
                      className={`serviceTrackNode serviceNode_${node.id} ${
                        isSelected ? "is-selected" : ""
                      } ${isDimmed ? "is-dimmed" : ""}`}
                      style={{
                        left: node.left,
                        top: node.top,
                        width: node.width,
                        zIndex: isSelected ? 99 : node.zIndex
                      }}
                      onClick={(e) => handleNodeClick(e, node.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleNodeClick(e, node.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${node.name.replace("\n", " ")}`}
                      aria-pressed={isSelected}
                    >
                      <div className="serviceNodeInner">
                        {/* Cyber Beacon Sonar Ring beneath platform */}
                        <span className="serviceNodeBeaconRing" aria-hidden="true" />

                        <img
                          src={node.img}
                          alt={node.name.replace("\n", " ")}
                          className="serviceNodeImg"
                          draggable={false}
                        />
                        <div
                          className={`serviceNodeLabel labelAlign_${node.labelAlign}`}
                          style={node.labelStyle}
                        >
                          <span className="serviceNodeTagBar" />
                          <span className="serviceNodeTagText">
                            {node.name.split("\n").map((line, i) => (
                              <span key={i} className="serviceNodeTagLine">{line}</span>
                            ))}
                          </span>
                          {/* Micro-telemetry hover pill */}
                          <span className="serviceNodeTelemetryChip" aria-hidden="true">
                            <Sparkles size={8} className="serviceNodeChipIcon" />
                            <span>SYS // {node.code}</span>
                          </span>

                          {/* Expandable Technical Capability HUD (revealed when selected) */}
                          {isSelected && (
                            <div className="serviceNodeExpandedHud" role="region" aria-label={`${node.name.replace("\n", " ")} Capabilities`}>
                              <div className="hudCategoryLine">{node.category}</div>
                              <div className="hudTagsRow">
                                {node.capabilities.slice(0, 3).map((cap, i) => (
                                  <span key={i} className="hudCapTag">{cap}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="serviceUniverseContainer">
            {/* Eyebrow: Lime bar + SERVICE UNIVERSE */}
            <div className="universeEyebrow">
              <span className="universeEyebrowBar" />
              <span className="universeEyebrowText">SERVICE UNIVERSE</span>
            </div>

            {/* Massive Bold Headline: DESIGN. BUILD. CONNECT. SCALE. */}
            <h1 className="universeHeadline">
              <span>DESIGN.</span>
              <span>BUILD.</span>
              <span>CONNECT.</span>
              <span>SCALE.</span>
            </h1>

            {/* Description Subtitle
            <p className="universeTagline">
              A full-spectrum technology partner across digital, software, hardware and systems.
            </p> */}

            {/* Neon Lime Pill Button: EXPLORE SERVICES -> */}
            <button
              type="button"
              className="universeCtaBtn"
              onClick={() => {
                const targetY = (document.documentElement.scrollHeight - window.innerHeight) * (13.5 / 14.2);
                window.__lenis ? window.__lenis.scrollTo(targetY, { duration: 1.2 }) : window.scrollTo({ top: targetY, behavior: "smooth" });
              }}
            >
              <span className="universeBtnText">EXPLORE SERVICES</span>
              <ArrowRight className="universeBtnArrow" size={19} strokeWidth={2.4} />
            </button>
          </div>

          {/* Left-Bottom Corner Framing Beam */}
          <div className="universeCornerBeam">
            <img
              src={frameCornerImg}
              alt="Corner Framing Beam"
              className="universeCornerBeamImg"
              draggable={false}
            />
          </div>
        </div>

        {/* ==============================================================
            FACE 2: SECOND IMAGE SECTION ("BUILD BEYOND." Showcase)
            ============================================================== */}
        <div className="editorialFace editorialFaceBack">
          <div className="finalScreenCard">
            {/* Ambient radial gradient background */}
            <div className="finalCardAmbient" />

            {/* Earth horizon on the bottom-left / button side */}
            <div className="finalEarthContent">
              <img
                src={earthImg}
                alt="Earth Horizon"
                className="finalEarthImg"
                draggable={false}
              />
            </div>

            <div className="finalLeftContent">
              <div className="finalEyebrow">
                <span className="finalEyebrowBar" />
                <span className="finalEyebrowText">HAULO / BEYOND THE ORDINARY</span>
              </div>

              <h2 className="finalTitle">
                <span>BUILD</span>
                <span>BEYOND.</span>
              </h2>

              <p className="finalTagline">Think bigger. Create what's next.</p>

              <button
                onClick={() => {
                  window.location.href = "mailto:hello@haulo.com?subject=Project%20Inquiry%20via%20HAULO";
                }}
                className="finalTechCtaBtn"
                type="button"
                data-cursor-hover="true"
              >
                {/* Purposeful Four-Side Corner Technical SVG Frame */}
                <svg className="tech-btn-frame" viewBox="-2 -2 254 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  {/* Solid capsule fill (Black) */}
                  <polygon className="btn-bg-polygon" points="13,1 237,1 249,13 249,31 237,43 13,43 1,31 1,13" fill="#000000" />

                  {/* Top-left chamfer with notch */}
                  <line x1="1" y1="13" x2="4" y2="10" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="8" y1="6" x2="13" y2="1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="13" y1="1" x2="237" y2="1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Top-right chamfer and right edge */}
                  <line x1="237" y1="1" x2="249" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="249" y1="13" x2="249" y2="31" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Bottom-right chamfer and bottom edge */}
                  <line x1="249" y1="31" x2="237" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="237" y1="43" x2="25" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
                  <line x1="19" y1="43" x2="13" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="13" y1="43" x2="1" y2="31" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="1" y1="31" x2="1" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Top-right floating reticle dot */}
                  <circle cx="251" cy="2" r="1.3" fill="#FFFFFF" />

                  {/* Bottom-right white technical accent wedge & expanding horizontal line */}
                  <g className="btn-corner-accent">
                    <polygon points="234.5,43 249,28 249,25 234.5,39" fill="#FFFFFF" />
                    <rect x="220" y="40" width="14.5" height="3" fill="#FFFFFF" className="btn-accent-bar" />
                  </g>
                </svg>

                <span className="finalStatusDot" />
                <span className="finalBtnText">START A PROJECT</span>
                <ArrowUpRight className="finalBtnArrow" size={17} strokeWidth={2.4} />
              </button>
            </div>

            {/* Right side: Futuristic sci-fi space station */}
            <div className="finalRightContent">
              <img
                src={spaceImg}
                alt="Space Station"
                className="finalSpaceImg"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialGallerySection;
