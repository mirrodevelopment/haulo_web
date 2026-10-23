import React, { useRef, useCallback } from "react";
import topBlueRunner from "../assets/editorial/top_blue_runner.jpg";
import amberSunglasses from "../assets/editorial/amber_sunglasses.jpg";
import centerBlueRunner from "../assets/editorial/center_blue_runner.jpg";
import leftVerticalRunner from "../assets/editorial/left_vertical_runner.jpg";
import heroOrangeRunner from "../assets/editorial/hero_orange_runner.jpg";
import yellowThumb1 from "../assets/editorial/yellow_thumb_1.jpg";
import yellowThumb2 from "../assets/editorial/yellow_thumb_2.jpg";
import bottomSkater from "../assets/editorial/bottom_skater.jpg";
import bottomRedNeon from "../assets/editorial/bottom_red_neon.jpg";
import card6Img from "../assets/gallery/Card-6.jpg";
import card7Img from "../assets/gallery/Card-7.jpg";
import card10Img from "../assets/gallery/Card-10.jpg";

// Section 2 (Face 2 / Back Side) Assets
import brandIdentityImg from "../assets/projects/brand-identity.jpg";
import ecommerceDevImg from "../assets/projects/ecommerce-dev.jpg";
import galleryCard8Img from "../assets/gallery/Card-8.jpg";
import digitalTransformCardImg from "../assets/cards/digital-transformation.png";
import crmCustomerPlatformsImg from "../assets/projects/crm-customer-platforms.jpg";
import galleryCard9Img from "../assets/gallery/Card-9.jpg";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import spaceImg from "../assets/space-img/space-img.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";
import { ThreeEditorialWorld } from "./ThreeEditorialWorld";
import ButtonBorderTrace from "./ButtonBorderTrace";

export const SpatialGallerySection = ({
  galleryWorldRef,
  batch1NodesRef,
  batch2NodesRef
}) => {
  const stageRef = useRef(null);

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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ==============================================================
            FACE 1: BALANCED 3-COLUMN EDITORIAL SHOWCASE
            ============================================================== */}
        <div className="editorialFace editorialFaceFront">
          {/* 1. Left Column: Vertical Athlete Card + SELECTED WORK */}
          <div
            ref={(el) => (batch1NodesRef.current[0] = el)}
            className="editorialElement editorialLevel1 editorialLeftRunnerCard"
            style={{ top: "22vh", left: "9vw" }}
          >
            <div className="editorialVerticalLabel">STYLE AT_A ENERGY LIFE</div>
            <div className="editorialCardFrame editorialLeftFrame">
              <img src={leftVerticalRunner} alt="Athlete" className="editorialImg" />
            </div>
            <div className="editorialAlphaflyTitle">SELECTED WORK</div>
          </div>

          {/* 2. Bottom Skater + CREATE */}
          <div
            ref={(el) => (batch1NodesRef.current[1] = el)}
            className="editorialElement editorialLevel1 editorialBottomSkaterCard"
            style={{ top: "66vh", left: "9vw" }}
          >
            <div className="editorialCardFrame skaterFrame">
              <img src={bottomSkater} alt="Skater" className="editorialImg" />
            </div>
            <div className="editorialGiantR">CREATE</div>
          </div>

          {/* 3. Center Column (Top): Electric Blue Runner Card */}
          <div
            ref={(el) => (batch1NodesRef.current[4] = el)}
            className="editorialElement editorialLevel2 editorialCenterBlueCard"
            style={{ top: "22vh", left: "32vw" }}
          >
            <div className="editorialScanline" />
            <div className="editorialCardFrame centerBlueFrame">
              <img src={centerBlueRunner} alt="Electric Blue Runner" className="editorialImg" />
            </div>
          </div>

          {/* 4. Center Column (Bottom): Digital Project Card */}
          <div
            ref={(el) => (batch1NodesRef.current[10] = el)}
            className="editorialElement editorialLevel2 editorialBottomCenterCard"
            style={{ top: "58vh", left: "32vw" }}
          >
            <div className="editorialCornerTick bottomCenterTick" />
            <div className="editorialCardFrame bottomCenterFrame">
              <img src={card6Img} alt="Digital Project" className="editorialImg" />
            </div>
            <div className="editorialScanline bottomCenterScan" />
            <div className="editorialFieldReportTag">DIGITAL PROJECT / 004</div>
          </div>

          {/* 5. Right-Center: DIGITAL INNOVATION + 2 Yellow Thumbnails */}
          <div
            ref={(el) => (batch1NodesRef.current[5] = el)}
            className="editorialElement editorialLevel3 editorialInnovationBlock"
            style={{ top: "14vh", left: "54vw" }}
          >
            <h2 className="editorialHeadline">DIGITAL INNOVATION</h2>
            <div className="editorialYellowRow">
              <div className="editorialYellowThumb">
                <img src={yellowThumb1} alt="Innovation 1" className="editorialImg" />
              </div>
              <div className="editorialYellowThumb">
                <img src={yellowThumb2} alt="Innovation 2" className="editorialImg" />
              </div>
            </div>
          </div>

          {/* 6. Main Hero Orange Card: VISION INTO REALITY */}
          <div
            ref={(el) => (batch1NodesRef.current[6] = el)}
            className="editorialElement editorialLevel3 editorialHeroOrangeBlock"
            style={{ top: "28vh", left: "54vw" }}
          >
            <h2 className="editorialVisionTitle">VISION INTO REALITY</h2>
            <div className="editorialHeroCardWrapper">
              <div className="editorialCardFrame heroFrame">
                <img src={heroOrangeRunner} alt="Vision Into Reality" className="editorialImg" />
              </div>
              <div className="editorialVerticalCreate">IMAGINE / DESIGN / BUILD</div>
            </div>
            <p className="editorialIdeasText">
              IDEAS THAT MOVE PEOPLE, BRANDS, CULTURE, THROUGH CREATIVITY.
            </p>
          </div>

          {/* 7. Bottom Quote & Red Neon Photo with Corner Brackets */}
          <div
            ref={(el) => (batch1NodesRef.current[7] = el)}
            className="editorialElement editorialLevel3 editorialBottomRightBlock"
            style={{ top: "74vh", left: "54vw" }}
          >
            <div className="editorialBiggerDreams">
              BOLD IDEAS.<br />
              BETTER EXPERIENCES.
            </div>
            <div className="editorialRedNeonFrame">
              <div className="editorialCornerBracket bracketTL" />
              <img src={bottomRedNeon} alt="Red Neon" className="editorialImg" />
              <div className="editorialCornerBracket bracketBR" />
            </div>
          </div>

          {/* 8. Far-Right Top: Cyber Runner Card */}
          <div
            ref={(el) => (batch1NodesRef.current[8] = el)}
            className="editorialElement editorialLevel3 editorialFarRightTopCard"
            style={{ top: "14vh", left: "74vw" }}
          >
            <div className="editorialCrosshair topFarRightCross">+</div>
            <div className="editorialCardFrame farRightTopFrame">
              <img src={card10Img} alt="Cyber Protocol" className="editorialImg" />
            </div>
            <div className="editorialMicroTag">PROJECT / 009</div>
          </div>

          {/* 9. Far-Right Middle: Kinetic Runner Card */}
          <div
            ref={(el) => (batch1NodesRef.current[9] = el)}
            className="editorialElement editorialLevel3 editorialFarRightMidCard"
            style={{ top: "38vh", left: "74vw" }}
          >
            <div className="editorialCornerTick farRightTick" />
            <div className="editorialCardFrame farRightMidFrame">
              <div className="editorialCornerBracket bracketTL" />
              <img src={card7Img} alt="Kinetic Runner" className="editorialImg" />
              <div className="editorialCornerBracket bracketBR" />
            </div>
            <div className="editorialVerticalKinetic">MOTION / INTERACTION</div>
            <div className="editorialHighVoltageTitle">CREATIVE ENERGY</div>
          </div>
        </div>

        {/* ==============================================================
            FACE 2: SECOND IMAGE SECTION ("BUILD BEYOND." Showcase)
            ============================================================== */}
        <div className="editorialFace editorialFaceBack">
          <div className="finalScreenCard">
            {/* Ambient radial gradient background */}
            <div className="finalCardAmbient" />

            <div className="finalLeftContent">
              <span className="finalEyebrow">HAULO / BEYOND THE ORDINARY</span>

              <h2 className="finalTitle">BUILD BEYOND.</h2>

              <p className="finalTagline">Think bigger. Create what's next.</p>

              <p className="finalBody">
                From brand identity and digital experiences to intelligent, scalable systems, we bring ambitious ideas to life through design and technology.
              </p>

              <button
                onClick={() => {
                  window.location.href = "mailto:hello@haulo.com?subject=Project%20Inquiry%20via%20HAULO";
                }}
                className="finalCtaBtn"
              >
                <span>Start a Project</span>
                <span className="finalCtaIconBadge">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
                <ButtonBorderTrace />
              </button>

              <div className="finalPillars">
                STRATEGY · DESIGN · TECHNOLOGY
              </div>
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
