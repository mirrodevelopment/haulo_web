import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CelestialMoon3D
 * High-end cinematic Three.js WebGL Celestial Moon with atmospheric Rayleigh scattering,
 * razor-sharp illuminated crescent rim line, orbital neon particle arcs, and deep spatial depth.
 * Replaces flat SVG curves with real-time AAA sci-fi celestial rendering.
 */
export const CelestialMoon3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = null;
    let isMounted = true;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000);
    camera.position.set(0, 0, 600);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. CELESTIAL MOON GROUP (Positioned in Top-Right quadrant, matching the showcase cards)
    const moonGroup = new THREE.Group();
    // Responsive positioning: top-right corner
    moonGroup.position.set(width * 0.36, height * 0.22, -80);
    scene.add(moonGroup);

    // Geometry
    const radius = Math.min(width, height) * 0.38;
    const sphereGeo = new THREE.SphereGeometry(radius, 40, 40);

    // --- A. MOON BODY SHADER (Dark celestial body with subtle planetary surface detail) ---
    const moonBodyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        sunDirection: { value: new THREE.Vector3(0.7, 0.65, 0.5).normalize() }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 sunDirection;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        // Procedural organic planetary cloud/crater turbulence
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // Sunlight dot product
          float NdotL = dot(normal, sunDirection);
          float diffuse = smoothstep(-0.05, 0.45, NdotL);

          // Planetary texture noise (subtle ocean & land mass shading)
          float n = noise(vUv * 18.0) * 0.25 + noise(vUv * 45.0) * 0.12;
          vec3 darkOcean = vec3(0.015, 0.035, 0.075);
          vec3 landMass = vec3(0.025, 0.055, 0.11);
          vec3 baseColor = mix(darkOcean, landMass, n);

          // Deep dark side of the moon
          vec3 ambient = vec3(0.002, 0.006, 0.014);

          // Atmospheric Fresnel edge rim illumination (The "Moon Shape Line")
          float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
          float rimIntensity = pow(fresnel, 3.2) * smoothstep(-0.25, 0.4, NdotL);

          // Intense cyan/white atmospheric glow along the sunlit crescent
          vec3 cyanRim = vec3(0.25, 0.75, 1.0) * rimIntensity * 2.8;
          vec3 whiteCore = vec3(1.0, 1.0, 1.0) * pow(rimIntensity, 2.8) * 4.0;

          vec3 finalColor = ambient + (baseColor * diffuse) + cyanRim + whiteCore;
          gl_FragColor = vec4(finalColor, 0.98);
        }
      `,
      transparent: true
    });

    const moonMesh = new THREE.Mesh(sphereGeo, moonBodyMaterial);
    moonGroup.add(moonMesh);

    // --- B. VOLUMETRIC ATMOSPHERIC CORONA (Rayleigh scattering outer glow halo) ---
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.065, 40, 40);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x38bdf8) },
        sunDirection: { value: new THREE.Vector3(0.7, 0.65, 0.5).normalize() }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform vec3 sunDirection;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          float NdotL = dot(normal, sunDirection);
          float sunFactor = smoothstep(-0.35, 0.65, NdotL);

          // Atmospheric scattering falloff
          float intensity = pow(1.0 - abs(dot(normal, viewDir)), 3.8) * sunFactor;
          vec3 col = mix(glowColor, vec3(0.85, 0.95, 1.0), pow(intensity, 2.0));
          gl_FragColor = vec4(col, intensity * 0.95);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMaterial);
    moonGroup.add(atmosphereMesh);

    // --- C. SECONDARY DEEP PLANET (Bottom-Left quadrant, balancing the cosmic space) ---
    const planetGroup = new THREE.Group();
    planetGroup.position.set(-width * 0.42, -height * 0.32, -140);
    scene.add(planetGroup);

    const planetRadius = Math.min(width, height) * 0.45;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 36, 36);

    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        sunDirection: { value: new THREE.Vector3(0.65, 0.72, 0.4).normalize() }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 sunDirection;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          float NdotL = dot(normal, sunDirection);
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 3.5);
          float rim = fresnel * smoothstep(-0.2, 0.5, NdotL);

          vec3 col = vec3(0.18, 0.55, 0.95) * rim * 2.2 + vec3(0.9, 0.96, 1.0) * pow(rim, 3.2) * 3.0;
          float alpha = smoothstep(0.02, 0.4, rim) * 0.85;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const planetMesh = new THREE.Mesh(planetGeo, planetMaterial);
    planetGroup.add(planetMesh);

    // --- D. CELESTIAL ORBITAL ENERGY RINGS (Removed orbital line per user request) ---
    const ringsGroup = new THREE.Group();
    moonGroup.add(ringsGroup);

    // 5. INTERACTIVE MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. RESIZE LISTENER
    const handleResize = () => {
      if (!container || !isMounted) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      moonGroup.position.set(w * 0.36, h * 0.22, -80);
      planetGroup.position.set(-w * 0.42, -h * 0.32, -140);
    };
    window.addEventListener("resize", handleResize);

    // 7. REAL-TIME ANIMATION LOOP WITH ZERO-REFLOW VISIBILITY OBSERVER
    let isVisible = true;
    const parentEl = container.closest('.projectsWorld') || container;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (parentEl) observer.observe(parentEl);

    let time = 0;
    const animate = () => {
      if (!isMounted) return;

      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      time += 0.008;

      // Slow majestic planetary rotation
      moonMesh.rotation.y = time * 0.15;
      moonMesh.rotation.x = Math.sin(time * 0.08) * 0.05;

      // Subtle slow rotation of the orbital rings
      ringsGroup.rotation.z = 0.35 + time * 0.06;
      ringsGroup.rotation.y = Math.sin(time * 0.1) * 0.12;

      // Smooth camera parallax
      const targetCamX = mouseX * 22;
      const targetCamY = -mouseY * 16;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      isMounted = false;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Memory cleanup
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="projectsMoon3DContainer"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden"
      }}
    />
  );
};

export default CelestialMoon3D;

