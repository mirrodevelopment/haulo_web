import React, { useMemo } from 'react'
import { Box3, Vector3, Color, DoubleSide, SRGBColorSpace, RepeatWrapping, MeshBasicMaterial, MeshStandardMaterial, Float32BufferAttribute, CanvasTexture, BufferGeometry, AdditiveBlending } from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import defaultCardImg from '../assets/modelCard/service-1.png'
import service2Img from '../assets/modelCard/service-2.png'
import service3Img from '../assets/modelCard/service-3.png'
import service4Img from '../assets/modelCard/service-4.png'
import capsuleGlowImg from '../assets/modelCard/capsule_glow_lamp.png'
import project1Img from '../assets/projects-img/1-project.webp'
import project1Png from '../assets/projects-img/project1.png'
import project2Img from '../assets/projects-img/2-project.webp'
import project3Img from '../assets/projects-img/3-project.webp'
import project4Img from '../assets/projects-img/4-project.webp'

/**
 * CyberFrameModel
 * Complete 3D Cyber Frame for `public/glb-file/frame5_light_strength.glb`.
 * Features an integrated high-definition center card display fitted with `service-1.png`.
 * 
 * Accurately calibrated PBR materials matching reference:
 * - Ceramic silver armor: Brushed sleek silver metallic chassis
 * - Machined titanium: High-gloss polished titanium chrome bevels & rails
 * - Graphite recess: Deep contrast obsidian gunmetal recesses & latch bays
 * - Lime luminous inserts: Electric cyber neon lime glowing LED indicators
 * - Black typography: High-contrast carbon black branding (HAULO, 01 / SERVICE, slashes)
 * - Center Card Screen: Sits flush inside the frame opening with zero aspect ratio distortion.
 *
 * Symmetrically centered in X, Y, and Z.
 */
export function CyberFrameModel({ imageSrc = defaultCardImg, theme = 'silver', ...props }) {
  const isBlackTheme = theme === 'metallic-light-black' || theme === 'black'
  const { scene } = useGLTF('/glb-file/frame5_light_strength.glb')
  const texture = useTexture(imageSrc)
  const capsuleGlowTexture = useTexture(capsuleGlowImg)

  // Configure textures with sRGB color space
  useMemo(() => {
    if (capsuleGlowTexture) {
      capsuleGlowTexture.colorSpace = SRGBColorSpace
      capsuleGlowTexture.needsUpdate = true
    }
  }, [capsuleGlowTexture])

  // Configure card texture with sRGB color space and aspect ratio preservation (object-fit: cover)
  useMemo(() => {
    if (!texture) return
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping

    // Inner frame opening bounds: width = 7.30, height = 11.38 (aspect ratio = 0.6415)
    // Preserves 1:1 image proportions with zero stretching/squishing:
    const meshAspect = 7.30 / 11.38
    const imgAspect = texture.image && texture.image.height > 0
      ? texture.image.width / texture.image.height
      : 1086 / 1448 // 0.7500 default for service-1.png

    if (imgAspect > meshAspect) {
      const scaleX = meshAspect / imgAspect
      texture.repeat.set(scaleX, 1)
      texture.offset.set((1 - scaleX) / 2, 0)
    } else {
      const scaleY = imgAspect / meshAspect
      texture.repeat.set(1, scaleY)
      texture.offset.set(0, (1 - scaleY) / 2)
    }
    texture.needsUpdate = true
  }, [texture])

  // 5. Neon Green Light Inserts: #B7FF00 (Black theme) or #F2FF9E (Silver theme)
  const uniformLedMat = useMemo(() => {
    return new MeshBasicMaterial({
      color: new Color(isBlackTheme ? '#B7FF00' : '#F2FF9E'),
      toneMapped: false,
      side: DoubleSide
    })
  }, [isBlackTheme])

  // Procedural subtle brushed-metal texture for matte metallic finish
  const brushedMetalTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, 256, 256)
    // Add micro directional brushed-metal grain
    for (let i = 0; i < 700; i++) {
      const y = Math.random() * 256
      const h = 1 + Math.random() * 1.5
      const val = 118 + Math.floor(Math.random() * 28)
      ctx.fillStyle = `rgb(${val},${val},${val})`
      ctx.fillRect(0, y, 256, h)
    }
    const t = new CanvasTexture(canvas)
    t.wrapS = RepeatWrapping
    t.wrapT = RepeatWrapping
    t.repeat.set(4, 16)
    return t
  }, [])

  // Shadow: Black – #080B0C (rgb: 8, 11, 12) drop shadow
  const shadowTex = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 192
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const grad = ctx.createRadialGradient(64, 96, 24, 64, 96, 64)
    grad.addColorStop(0, 'rgba(8, 11, 12, 0.72)')
    grad.addColorStop(0.5, 'rgba(8, 11, 12, 0.32)')
    grad.addColorStop(0.85, 'rgba(8, 11, 12, 0.09)')
    grad.addColorStop(1, 'rgba(8, 11, 12, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 128, 192)
    const t = new CanvasTexture(canvas)
    return t
  }, [])

  const frameScene = useMemo(() => {
    if (!scene) return null
    const clone = scene.clone(true)

    // Remove inner plane meshes so they don't conflict with our high-def card screen
    const plane = clone.getObjectByName('Plane')
    if (plane) {
      plane.parent?.remove(plane)
    }
    const plane2 = clone.getObjectByName('Plane.002')
    if (plane2) {
      plane2.parent?.remove(plane2)
    }

    // Keep upright orientation (rotate Blender scene to upright)
    clone.traverse((child) => {
      if (child.name === 'Blender_Scene_(Z_up_to_Y_up)') {
        child.rotation.set(0, 0, 0)
        child.position.set(-28.837, 0, 0)
      }

      if (child.isMesh && child.material) {
        // Clone material so each mesh can have independent tuning
        const mat = child.material.clone()
        const matName = mat.name || ''
        const meshName = child.name || ''

        if (meshName.toLowerCase().includes('lime vertical light')) {
          // Hide old thin wire lights; replaced with authentic elongated capsule LED strips
          child.visible = false
        } else if (matName.includes('Lime luminous') || meshName.toLowerCase().includes('lime')) {
          // 5. Neon Green Light Inserts: #B7FF00
          child.material = uniformLedMat
        } else if (meshName.includes('Inner polished reveal')) {
          // 2. Inner Frame – Deep Graphite: Base #090B10, Satin gunmetal, Metallic 0.75, Roughness 0.28
          mat.color = new Color(isBlackTheme ? '#090B10' : '#171C1E')
          mat.metalness = isBlackTheme ? 0.75 : 0.60
          mat.roughness = isBlackTheme ? 0.28 : 0.40
        } else if (
          meshName.includes('Cylinder') ||
          meshName.includes('Screw driver slot')
        ) {
          // 6. Screws and Small Mechanical Details: Base #343A40, Metallic 0.85, Roughness 0.25
          mat.color = new Color(isBlackTheme ? '#343A40' : '#F4F5F2')
          mat.metalness = 0.85
          mat.roughness = 0.25
          if (brushedMetalTexture) {
            mat.bumpMap = brushedMetalTexture
            mat.bumpScale = 0.0015
          }
        } else if (
          meshName.includes('Outer titanium rim') ||
          meshName.includes('Upper chamfer shoulder') ||
          meshName.includes('Lower chamfer shoulder') ||
          meshName.includes('Rail titanium inlay') ||
          meshName.includes('Torus')
        ) {
          // 3. Silver Mechanical Edges: Main #AEB5BD, Highlight #E1E5E9, Metallic 0.9, Roughness 0.24
          mat.color = new Color(isBlackTheme ? '#AEB5BD' : '#F4F5F2')
          mat.metalness = 0.90
          mat.roughness = isBlackTheme ? 0.24 : 0.26
          if (brushedMetalTexture) {
            mat.bumpMap = brushedMetalTexture
            mat.bumpScale = 0.0015
          }
        } else if (
          meshName.includes('Side cartridge black pocket') ||
          meshName.includes('Latch recess') ||
          meshName.includes('Long rail gasket') ||
          meshName.includes('Side cartridge titanium lip') ||
          meshName.includes('Rail latch') ||
          meshName.includes('Diagonal lamp housing')
        ) {
          // 4. Corner Armour Panels: Base #20242A, Metallic 0.80, Roughness 0.35
          mat.color = new Color(isBlackTheme ? '#20242A' : '#303638')
          mat.metalness = isBlackTheme ? 0.80 : 0.70
          mat.roughness = isBlackTheme ? 0.35 : 0.42
        } else if (
          matName.includes('Ceramic silver armor') ||
          meshName.includes('Continuous rear chassis') ||
          meshName.includes('Side armor segment') ||
          meshName.includes('Broad HAULO header')
        ) {
          // 1. Main Outer Frame – Black Titanium: Base #17191D, Dark brushed titanium, Metallic 0.85, Roughness 0.32
          mat.color = new Color(isBlackTheme ? '#17191D' : '#D5D8D8')
          mat.metalness = isBlackTheme ? 0.85 : 0.80
          mat.roughness = isBlackTheme ? 0.32 : 0.36
          if (brushedMetalTexture) {
            mat.bumpMap = brushedMetalTexture
            mat.bumpScale = 0.002
          }
        } else if (matName.includes('Black typography')) {
          // Technical typography: Solid carbon black on silver OR crisp laser-etched silver-white #E1E5E9 on Black Titanium
          child.material = new MeshBasicMaterial({
            color: new Color(isBlackTheme ? '#E1E5E9' : '#0a0d0e'),
            side: DoubleSide
          })
          child.castShadow = false
          child.receiveShadow = false
          return
        } else {
          // Dark borders fallback: Base #20242A (black theme) or #303638 (silver theme)
          mat.color = new Color(isBlackTheme ? '#20242A' : '#303638')
          mat.metalness = 0.70
          mat.roughness = 0.42
        }

        // Ensure all faces render with DoubleSide so no backface is culled when viewed from angles or side
        mat.side = DoubleSide
        child.material = mat
        child.castShadow = false
        child.receiveShadow = false
      }
    })

    // Compute exact bounding box and shift to absolute center (0, 0, 0)
    clone.updateMatrixWorld(true)
    const box = new Box3().setFromObject(clone)
    const center = new Vector3()
    box.getCenter(center)
    clone.position.x -= center.x
    clone.position.y -= center.y
    clone.position.z -= center.z
    clone.updateMatrixWorld(true)

    return clone
  }, [scene, isBlackTheme])

  // Complete solid unibody mechanical side enclosure geometry
  // Bridges front (Z > 0) to rear (Z < 0) around all 8 perimeter edges with zero gaps
  const enclosureGeom = useMemo(() => {
    const geom = new BufferGeometry()

    const perimeter2D = [
      [-3.48, 6.26],   // 0: top-left start
      [3.48, 6.26],    // 1: top-right start
      [4.015, 5.60],   // 2: right top
      [4.015, -5.60],  // 3: right bottom
      [3.48, -6.26],   // 4: bottom-right
      [-3.48, -6.26],  // 5: bottom-left
      [-4.015, -5.60], // 6: left bottom
      [-4.015, 5.60],  // 7: left top
    ]

    const zFront = 0.30
    const zBack = -0.30
    const positions = []
    const normals = []
    const uvs = []

    for (let i = 0; i < perimeter2D.length; i++) {
      const next = (i + 1) % perimeter2D.length
      const [x1, y1] = perimeter2D[i]
      const [x2, y2] = perimeter2D[next]

      const dx = x2 - x1
      const dy = y2 - y1
      const len = Math.hypot(dx, dy)
      const nx = dy / len
      const ny = -dx / len

      positions.push(
        x1, y1, zFront,
        x2, y2, zFront,
        x2, y2, zBack,
        x1, y1, zFront,
        x2, y2, zBack,
        x1, y1, zBack
      )

      for (let k = 0; k < 6; k++) {
        normals.push(nx, ny, 0)
      }

      uvs.push(
        0, 1,   1, 1,   1, 0,
        0, 1,   1, 0,   0, 0
      )
    }

    geom.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geom.setAttribute('normal', new Float32BufferAttribute(normals, 3))
    geom.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
    return geom
  }, [])

  // 1. Main frame unibody enclosure: Black Titanium (#17191D) or Metallic silver (#D5D8D8)
  const enclosureMat = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(isBlackTheme ? '#17191D' : '#D5D8D8'),
      metalness: isBlackTheme ? 0.85 : 0.88,
      roughness: isBlackTheme ? 0.32 : 0.28,
      bumpMap: brushedMetalTexture || undefined,
      bumpScale: 0.002,
      side: DoubleSide
    })
  }, [brushedMetalTexture, isBlackTheme])

  // 4. Dark recessed mechanical slots: #090A0C (Black theme) or #303638 (Silver theme)
  const slotMat = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(isBlackTheme ? '#090A0C' : '#303638'),
      metalness: 0.70,
      roughness: 0.42,
      side: DoubleSide
    })
  }, [isBlackTheme])

  // =========================================================================
  // NEON CAPSULE LED STRIP TEXTURE (Calibrated for Silver or Black Titanium)
  // - Black Titanium Theme: Main #B7FF00, Bright core #DFFF54, Secondary #85D900
  // - Silver Theme: Light pastel fluorescent lime #F2FF9E / #FFFFE6
  // - 100% vertically uniform neon tube: ZERO center point / hotspot / dark edges
  // =========================================================================
  const neonCapsuleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    const w = 128
    const h = 512
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const imgData = ctx.createImageData(w, h)
    const data = imgData.data
    const r = (w / 2) - 2

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x - (w / 2)
        let dist = 0
        if (y < r) {
          const dy = r - y
          dist = Math.sqrt(dx * dx + dy * dy)
        } else if (y > h - r) {
          const dy = y - (h - r)
          dist = Math.sqrt(dx * dx + dy * dy)
        } else {
          dist = Math.abs(dx)
        }

        if (dist <= r) {
          const t = dist / r
          let red = 255
          let green = 255
          let blue = 230
          let alpha = 255

          if (isBlackTheme) {
            // 5. Neon Green Light Inserts:
            // Bright core: #DFFF54 (223, 255, 84)
            // Main colour: #B7FF00 (183, 255, 0)
            // Secondary rim: #85D900 (133, 217, 0)
            if (t < 0.38) {
              const f = t / 0.38
              red = Math.round((1 - f) * 235 + f * 223)
              green = 255
              blue = Math.round((1 - f) * 120 + f * 84)
            } else if (t < 0.80) {
              const f = (t - 0.38) / 0.42
              red = Math.round((1 - f) * 223 + f * 183)
              green = 255
              blue = Math.round((1 - f) * 84 + f * 0)
            } else {
              const f = (t - 0.80) / 0.20
              red = Math.round((1 - f) * 183 + f * 133)
              green = Math.round((1 - f) * 255 + f * 217)
              blue = 0
              alpha = Math.round(255 * (1 - f * 0.35))
            }
          } else {
            // Silver theme: Soft light pastel fluorescent yellow-lime
            if (t < 0.40) {
              const f = t / 0.40
              red = Math.round((1 - f) * 255 + f * 244)
              green = 255
              blue = Math.round((1 - f) * 230 + f * 176)
            } else if (t < 0.82) {
              const f = (t - 0.40) / 0.42
              red = Math.round((1 - f) * 244 + f * 232)
              green = 255
              blue = Math.round((1 - f) * 176 + f * 160)
            } else {
              const f = (t - 0.82) / 0.18
              red = Math.round((1 - f) * 232 + f * 216)
              green = 255
              blue = Math.round((1 - f) * 160 + f * 132)
              alpha = Math.round(255 * (1 - f * 0.35))
            }
          }

          const idx = (y * w + x) * 4
          data[idx] = red
          data[idx + 1] = green
          data[idx + 2] = blue
          data[idx + 3] = alpha
        }
      }
    }

    ctx.putImageData(imgData, 0, 0)
    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    tex.needsUpdate = true
    return tex
  }, [isBlackTheme])

  // Diffuse outer glow aura texture: Subtle localized green glow
  const neonGlowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    const w = 128
    const h = 512
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.clearRect(0, 0, w, h)
    const grad = ctx.createLinearGradient(0, 0, w, 0)
    if (isBlackTheme) {
      grad.addColorStop(0.0, 'rgba(183, 255, 0, 0)')
      grad.addColorStop(0.30, 'rgba(183, 255, 0, 0.08)')
      grad.addColorStop(0.50, 'rgba(223, 255, 84, 0.18)')
      grad.addColorStop(0.70, 'rgba(183, 255, 0, 0.08)')
      grad.addColorStop(1.0, 'rgba(183, 255, 0, 0)')
    } else {
      grad.addColorStop(0.0, 'rgba(235, 255, 160, 0)')
      grad.addColorStop(0.30, 'rgba(240, 255, 175, 0.08)')
      grad.addColorStop(0.50, 'rgba(255, 255, 210, 0.18)')
      grad.addColorStop(0.70, 'rgba(240, 255, 175, 0.08)')
      grad.addColorStop(1.0, 'rgba(235, 255, 160, 0)')
    }
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    tex.needsUpdate = true
    return tex
  }, [isBlackTheme])

  // Solid, fully illuminated neon capsule strip material (even top-to-bottom, no center point)
  const capsuleStripMat = useMemo(() => {
    return new MeshBasicMaterial({
      map: neonCapsuleTexture,
      transparent: true,
      toneMapped: false,
      side: DoubleSide
    })
  }, [neonCapsuleTexture])

  // Subtle outer neon glow material reflecting onto frame
  const capsuleGlowMat = useMemo(() => {
    return new MeshBasicMaterial({
      map: neonGlowTexture,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.16,
      side: DoubleSide
    })
  }, [neonGlowTexture])

  // 5. Housing colour: #111719 (Black theme) or #101314 (Silver theme)
  const channelTroughMat = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(isBlackTheme ? '#111719' : '#101314'),
      metalness: 0.60,
      roughness: 0.40,
      side: DoubleSide
    })
  }, [isBlackTheme])

  if (!frameScene) return null

  return (
    <group {...props} dispose={null}>
      {/* Shadow: Black – #080B0C */}
      {shadowTex && (
        <mesh position={[0.10, -0.36, -0.25]}>
          <planeGeometry args={[9.4, 13.8]} />
          <meshBasicMaterial
            map={shadowTex}
            color={new Color('#080B0C')}
            transparent={true}
            opacity={0.72}
            depthWrite={false}
          />
        </mesh>
      )}

      <primitive object={frameScene} />

      {/* Complete solid mechanical perimeter wall bridging front to back */}
      {enclosureGeom && enclosureMat && (
        <mesh geometry={enclosureGeom} material={enclosureMat} />
      )}

      {/* Recessed mechanical slots along side rails matching reference CAD structure */}
      {slotMat && (
        <>
          <mesh position={[4.02, 0, 0]} material={slotMat}>
            <boxGeometry args={[0.04, 9.8, 0.24]} />
          </mesh>
          <mesh position={[-4.02, 0, 0]} material={slotMat}>
            <boxGeometry args={[0.04, 9.8, 0.24]} />
          </mesh>
        </>
      )}

      {/* ========================================================================= */}
      {/* ELONGATED CAPSULE-SHAPED NEON-GREEN LED STRIP LIGHTS                      */}
      {/* Continuous bright lime-green/yellow core recessed inside dark channels    */}
      {/* ========================================================================= */}

      {/* FRONT FACE: Left & Right Vertical Rails (Flush at Z=0.345 inside trough) */}
      <ElongatedCapsuleLight
        position={[-3.828, 3.12, 0.345]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[-3.828, -0.20, 0.345]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[3.828, 3.12, 0.345]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[3.828, -0.20, 0.345]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />

      {/* SIDE PROFILE RAILS: Left & Right Outer Edges (Visible on 3D rotation) */}
      <ElongatedCapsuleLight
        position={[-4.015, 3.12, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[-4.015, -0.20, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[4.015, 3.12, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[4.015, -0.20, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />

      {/* REAR FACE: Left & Right Vertical Rails (Visible during 3D rotation) */}
      <ElongatedCapsuleLight
        position={[-3.828, 3.12, -0.345]}
        rotation={[0, Math.PI, 0]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[-3.828, -0.20, -0.345]}
        rotation={[0, Math.PI, 0]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[3.828, 3.12, -0.345]}
        rotation={[0, Math.PI, 0]}
        width={0.14}
        height={1.05}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />
      <ElongatedCapsuleLight
        position={[3.828, -0.20, -0.345]}
        rotation={[0, Math.PI, 0]}
        width={0.14}
        height={1.95}
        channelTroughMat={channelTroughMat}
        capsuleStripMat={capsuleStripMat}
        capsuleGlowMat={capsuleGlowMat}
      />

      {/* High-definition card screen fitted directly into the center place of the frame */}
      <mesh position={[0, -0.28, 0.0]}>
        <planeGeometry args={[7.30, 11.38]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={DoubleSide}
        />
      </mesh>
    </group>
  )
}

/**
 * ElongatedCapsuleLight
 * Renders an authentic futuristic capsule-shaped LED strip recessed inside
 * a dark mechanical channel with soft glowing aura and specular chrome gleam.
 * Additive glow plane provides genuine neon luminance without dynamic pointLight GPU overhead.
 */
function ElongatedCapsuleLight({
  position,
  rotation = [0, 0, 0],
  width = 0.14,
  height = 1.20,
  channelTroughMat,
  capsuleStripMat,
  capsuleGlowMat
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* 1. Recessed dark metallic mechanical channel trough */}
      <mesh position={[0, 0, -0.012]} material={channelTroughMat}>
        <boxGeometry args={[width * 1.15, height * 1.02, 0.024]} />
      </mesh>

      {/* 2. Soft subtle outer glow plane */}
      <mesh position={[0, 0, 0.003]} material={capsuleGlowMat}>
        <planeGeometry args={[width * 1.18, height * 1.01]} />
      </mesh>

      {/* 3. Solid, fully-illuminated neon fluorescent capsule strip (100% even top-to-bottom, zero center point) */}
      <mesh position={[0, 0, 0.008]} material={capsuleStripMat}>
        <planeGeometry args={[width, height]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/glb-file/frame5_light_strength.glb')
useTexture.preload(defaultCardImg)
useTexture.preload(service2Img)
useTexture.preload(service3Img)
useTexture.preload(service4Img)
useTexture.preload(project1Img)
useTexture.preload(project1Png)
useTexture.preload(project2Img)
useTexture.preload(project3Img)
useTexture.preload(project4Img)
useTexture.preload(capsuleGlowImg)

export default CyberFrameModel
