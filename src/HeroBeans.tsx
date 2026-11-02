import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

interface BeanSpec {
  x: number; // -1..1 of visible width
  y: number; // -1..1 of visible height
  z: number;
  scale: number;
}

const BEANS: BeanSpec[] = [
  { x: -0.95, y: -0.6, z: 2.5, scale: 1.3 },
  { x: -0.8, y: 0.7, z: 0.5, scale: 0.6 },
  { x: -0.62, y: 0.2, z: -2, scale: 0.4 },
  { x: -0.7, y: -0.9, z: 0, scale: 0.8 },
  { x: -0.9, y: 0.1, z: -1.2, scale: 0.5 },
  { x: -0.55, y: 0.95, z: -1, scale: 0.9 },
  { x: -0.35, y: -0.97, z: -1.5, scale: 0.45 },
  { x: -0.3, y: 0.97, z: 1, scale: 0.35 },
  { x: 0.3, y: -0.95, z: 0.5, scale: 0.6 },
  { x: 0.35, y: 0.95, z: -2, scale: 0.7 },
  { x: 0.62, y: 0.85, z: 0.8, scale: 0.5 },
  { x: 0.72, y: -0.6, z: 2, scale: 1.1 },
  { x: 0.95, y: 0.75, z: 1.8, scale: 1.2 },
  { x: 0.97, y: -0.1, z: 0.2, scale: 0.4 },
  { x: 0.85, y: -0.95, z: -0.5, scale: 0.55 },
  { x: 0.9, y: 0.3, z: -2.5, scale: 0.75 },
  { x: 0.55, y: -0.2, z: -3, scale: 0.35 },
  { x: -0.97, y: 0.45, z: 1.5, scale: 0.3 },
];

const HeroBeans: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 10;

    scene.fog = new THREE.Fog(0x3a2a18, 7, 14);
    scene.add(new THREE.AmbientLight(0xe6c9a0, 0.7));
    const key = new THREE.DirectionalLight(0xffd9a8, 2.0);
    key.position.set(-6, 5, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6b4423, 0.4);
    rim.position.set(6, -3, -4);
    scene.add(rim);

    const loader = new THREE.TextureLoader();
    const map = loader.load('/models/bean_color.jpg');
    map.colorSpace = THREE.SRGBColorSpace;
    const bumpMap = loader.load('/models/bean_bump.jpg');
    const material = new THREE.MeshStandardMaterial({
      color: 0x7d634f,
      map,
      bumpMap,
      bumpScale: 1.2,
      roughness: 0.85,
      metalness: 0,
    });

    // Crumb-shaped sprite so the powder reads as coffee dust, not sparkles
    const crumbCanvas = document.createElement('canvas');
    crumbCanvas.width = crumbCanvas.height = 32;
    const cctx = crumbCanvas.getContext('2d')!;
    cctx.fillStyle = '#fff';
    cctx.beginPath();
    for (let k = 0; k < 7; k++) {
      const ang = (k / 7) * Math.PI * 2;
      const r = 8 + Math.random() * 6;
      cctx.lineTo(16 + Math.cos(ang) * r, 16 + Math.sin(ang) * r);
    }
    cctx.closePath();
    cctx.fill();
    const sprite = new THREE.CanvasTexture(crumbCanvas);

    // Faint soft haze for the dust cloud feel
    const hazeCanvas = document.createElement('canvas');
    hazeCanvas.width = hazeCanvas.height = 64;
    const hctx = hazeCanvas.getContext('2d')!;
    const hgrad = hctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    hgrad.addColorStop(0, 'rgba(255,255,255,0.5)');
    hgrad.addColorStop(1, 'rgba(255,255,255,0)');
    hctx.fillStyle = hgrad;
    hctx.fillRect(0, 0, 64, 64);
    const hazeSprite = new THREE.CanvasTexture(hazeCanvas);
    const powderCount = isMobile ? 350 : 1000;
    const powderTarget = new Float32Array(powderCount * 3);
    const powderDelay = new Float32Array(powderCount);
    const powderPos = new Float32Array(powderCount * 3);
    for (let i = 0; i < powderCount; i++) {
      const side = Math.random() < 0.5 ? -1 : 1;
      // Cluster towards the sides, keep the middle sparse
      const x = Math.random() < 0.75 ? side * (0.45 + Math.random() * 0.55) : (Math.random() - 0.5) * 1.6;
      powderTarget[i * 3] = x * 7.5;
      powderTarget[i * 3 + 1] = (Math.random() * 2 - 1) * 4;
      powderTarget[i * 3 + 2] = -3 + Math.random() * 7;
      powderDelay[i] = Math.random() * 0.3;
    }
    const powderGeo = new THREE.BufferGeometry();
    powderGeo.setAttribute('position', new THREE.BufferAttribute(powderPos, 3));
    const powderMat = new THREE.PointsMaterial({
      map: sprite,
      color: 0x5a3a22,
      size: 0.075,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const powder = new THREE.Points(powderGeo, powderMat);
    powder.visible = false;
    powder.frustumCulled = false;
    const hazeMat = new THREE.PointsMaterial({
      map: hazeSprite,
      color: 0x8a6440,
      size: 0.9,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const haze = new THREE.Points(powderGeo, hazeMat);
    haze.visible = false;
    haze.frustumCulled = false;
    scene.add(haze);
    scene.add(powder);

    // Frozen coffee splash: droplets fly out of the centre and then hover in a crown shape
    const dropCount = isMobile ? 90 : 220;
    const dropGeo = new THREE.SphereGeometry(0.06, 12, 10);
    const dropMat = new THREE.MeshStandardMaterial({ color: 0x6b3412, roughness: 0.08, metalness: 0.25, transparent: true, opacity: 0.9, emissive: 0x2a1204 });
    const drops = new THREE.InstancedMesh(dropGeo, dropMat, dropCount);
    drops.visible = false;
    drops.frustumCulled = false;
    scene.add(drops);
    const dropData = Array.from({ length: dropCount }, () => {
      // Two side clusters; leave the centre empty so the text stays clean
      const side = Math.random() < 0.5 ? -1 : 1;
      const ux = side * (0.55 + Math.pow(Math.random(), 0.8) * 0.43);
      const k = Math.pow(Math.random(), 1.4);
      const uy = -0.95 + k * 1.7 + (Math.random() - 0.5) * 0.15;      return {
        ux,
        uy,
        delay: Math.random() * 0.4,
        duration: 1 + Math.random() * 0.9,
        size: 0.35 + Math.random() * 0.8,
        z: (Math.random() - 0.4) * 3,
        phase: Math.random() * Math.PI * 2,
      };
    });    const dummy = new THREE.Object3D();

    const specs = isMobile ? BEANS.filter((_, i) => i % 2 === 0) : BEANS;
    type Bean = {
      mesh: THREE.Mesh; spec: BeanSpec; base: THREE.Euler; spin: number;
      phase: number; delay: number; duration: number; burst: THREE.Vector3;
    };
    const beans: Bean[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    let startTime = 0;
    let disposed = false;

    new OBJLoader().load('/models/coffee_bean.obj', (obj) => {
      if (disposed) return;
      obj.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const geo = (child.geometry as THREE.BufferGeometry).clone();
        // Center each bean and normalise its longest side to 2 units
        geo.computeBoundingBox();
        const size = new THREE.Vector3();
        geo.boundingBox!.getSize(size);
        geo.translate(...geo.boundingBox!.getCenter(new THREE.Vector3()).negate().toArray());
        geo.scale(2 / Math.max(size.x, size.y, size.z), 2 / Math.max(size.x, size.y, size.z), 2 / Math.max(size.x, size.y, size.z));
        geometries.push(geo);
      });
      if (!geometries.length) return;

      specs.forEach((spec, i) => {
        const mesh = new THREE.Mesh(geometries[i % geometries.length], material);
        const base = new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
        mesh.rotation.copy(base);
        mesh.scale.setScalar(0.0001);
        scene.add(mesh);
        beans.push({
          mesh,
          spec,
          base,
          spin: (0.15 + (i % 5) * 0.06) * (i % 2 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          delay: Math.random() * 0.35,
          duration: 1.5 + Math.random() * 0.9,
          burst: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(14),
        });
      });
      startTime = clock.getElapsedTime();
    });
    let width = 1;
    let height = 1;
    const resize = () => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0, scroll: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(container);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime() - startTime;

      smooth.x += (mouse.x - smooth.x) * 0.06;
      smooth.y += (mouse.y - smooth.y) * 0.06;
      smooth.scroll += (window.scrollY - smooth.scroll) * 0.08;

      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const motion = reduceMotion ? 0 : 1;

      for (const b of beans) {
        const depth = 0.5 + (b.spec.z + 4) / 8; // nearer beans move more
        const p = reduceMotion ? 1 : THREE.MathUtils.clamp((t - b.delay) / b.duration, 0, 1);
        const e = 1 - Math.pow(1 - p, 4);
        const arc = e * (1 - e) * 4;
        const px = b.spec.x * halfW - smooth.x * 0.35 * depth;
        const py = b.spec.y * halfH + smooth.y * 0.35 * depth + smooth.scroll * 0.004 * depth;
        const bob = Math.sin(t * 0.6 + b.phase) * 0.12 * motion * e;
        b.mesh.position.set(
          px * e + b.burst.x * arc,
          py * e + bob + b.burst.y * arc,
          b.spec.z * e + b.burst.z * arc,
        );
        b.mesh.scale.setScalar(Math.max(0.0001, b.spec.scale * 0.8 * (isMobile ? 0.8 : 1) * e));
        const explosionSpin = (1 - e) * 14 * Math.sign(b.spin);
        b.mesh.rotation.set(
          b.base.x + (t * b.spin * 0.6) * motion + smooth.y * 0.3 + smooth.scroll * 0.004 * depth + explosionSpin,
          b.base.y + (t * b.spin) * motion + smooth.x * 0.45 + smooth.scroll * 0.003 + explosionSpin * 0.7,
          b.base.z + smooth.scroll * 0.002 * b.spin * 4,
        );
      }
      if (beans.length) {
        powder.visible = true;
        haze.visible = true;
        drops.visible = true;
        const pp = powderGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < powderCount; i++) {
          const pe = reduceMotion ? 1 : THREE.MathUtils.clamp((t - powderDelay[i]) / 2.2, 0, 1);
          const ee = 1 - Math.pow(1 - pe, 3);
          pp.setXYZ(
            i,
            powderTarget[i * 3] * ee + Math.sin(t * 0.3 + i) * 0.25 * motion,
            powderTarget[i * 3 + 1] * ee + Math.cos(t * 0.25 + i * 1.7) * 0.25 * motion - t * 0.02 * motion,
            powderTarget[i * 3 + 2] * ee,
          );
        }
        pp.needsUpdate = true;
        powder.position.set(-smooth.x * 0.25, smooth.y * 0.25 + smooth.scroll * 0.002, 0);
        haze.position.copy(powder.position);

        for (let i = 0; i < dropCount; i++) {
          const d = dropData[i];
          const dp = reduceMotion ? 1 : THREE.MathUtils.clamp((t - d.delay) / d.duration, 0, 1);
          const de = 1 - Math.pow(1 - dp, 3);
          const hover = Math.sin(t * 0.8 + d.phase) * 0.05 * motion * de;
          const sway = Math.cos(t * 0.6 + d.phase) * 0.03 * motion * de;
          dummy.position.set(
            d.ux * halfW * de - smooth.x * 0.2 + sway,
            -halfH * 0.9 + (d.uy * halfH + halfH * 0.9) * de + hover + smooth.y * 0.2,
            d.z * de,
          );
          dummy.rotation.set(0, 0, 0);
          // Round droplets, slightly stretched upward only while flying
          const sc = d.size * Math.min(1, dp * 6);
          dummy.scale.set(sc, sc * (1 + (1 - de) * 1.5), sc);
          dummy.updateMatrix();
          drops.setMatrixAt(i, dummy.matrix);
        }        drops.instanceMatrix.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      disposed = true;
      powderGeo.dispose();
      powderMat.dispose();
      sprite.dispose();
      dropGeo.dispose();
      dropMat.dispose();
      drops.dispose();
      geometries.forEach((g) => g.dispose());
      map.dispose();
      bumpMap.dispose();
      hazeMat.dispose();
      hazeSprite.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes spotIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes beanFlash {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes beanFlashCore {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
          10% { opacity: 1; }
          60% { opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 48%, rgba(255,214,150,0.30) 0%, rgba(255,190,110,0.14) 40%, rgba(0,0,0,0) 75%)', mixBlendMode: 'screen', animation: 'spotIn 2s ease-out both' }}
      />
      <div ref={containerRef} aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none opacity-70 blur-[2px]" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 pointer-events-none rounded-full"
        style={{
          width: '70vmin',
          height: '70vmin',
          background: 'radial-gradient(circle, rgba(255,236,200,0.95) 0%, rgba(255,190,110,0.55) 25%, rgba(255,160,70,0.18) 50%, rgba(255,160,70,0) 70%)',
          animation: 'beanFlash 1.6s ease-out 0.1s both',
          mixBlendMode: 'screen',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 pointer-events-none rounded-full"
        style={{
          width: '22vmin',
          height: '22vmin',
          background: 'radial-gradient(circle, #fff 0%, rgba(255,240,210,0.9) 35%, rgba(255,240,210,0) 70%)',
          animation: 'beanFlashCore 0.9s ease-out 0.1s both',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

export default HeroBeans;













