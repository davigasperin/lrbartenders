'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

import { usePrefersReducedMotion } from '@/hooks/useMedia';

const MAX_DPR = 2;
const PARTICLE_COUNT = 350;

type Props = {
  className?: string;
};

export function GoldDust({ className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(min-width: 769px)').matches) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let particles: THREE.Points | null = null;
    let rafId = 0;
    let visible = true;
    let disposed = false;
    let mouseX = 0;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return;
    }

    const gl = renderer.getContext();
    if (!gl) return;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    host.appendChild(canvas);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      speeds[i] = 0.12 + Math.random() * 0.35;
      sizes[i] = 0.03 + Math.random() * 0.1;
      seeds[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorGold: { value: new THREE.Color('#C9A227') },
        uColorLight: { value: new THREE.Color('#F0D77B') },
      },
      vertexShader: `
        attribute float aSpeed;
        attribute float aSize;
        attribute float aSeed;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vAlpha;
        varying float vSize;

        void main() {
          vec3 pos = position;
          pos.y += mod(uTime * aSpeed + aSeed * 3.0, 14.0) - 7.0;
          pos.x += sin(uTime * 0.25 + aSeed * 6.0) * 0.4;

          vSize = aSize;
          vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.4 + aSpeed) + aSeed * 10.0));

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * 90.0 * uPixelRatio / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorGold;
        uniform vec3 uColorLight;

        varying float vAlpha;
        varying float vSize;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.05, d);
          vec3 color = mix(uColorGold, uColorLight, vSize * 3.0);
          gl_FragColor = vec4(color, glow * vAlpha);
        }
      `,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer!.setSize(width, height);
      renderer!.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
      camera!.aspect = width / height;
      camera!.updateProjectionMatrix();
    };
    resize();

    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: '120px' },
    );
    io.observe(host);

    let last = performance.now();
    const tick = (now: number) => {
      if (disposed) return;
      if (!visible) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (particles && material) {
        material.uniforms.uTime.value += dt;
        particles.rotation.y = mouseX * 0.15;
        particles.rotation.z = mouseX * 0.04;
      }

      renderer!.render(scene!, camera!);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      particles?.geometry.dispose();
      material.dispose();
      renderer?.dispose();
      if (canvas.parentElement === host) host.removeChild(canvas);
    };
  }, [reduced]);

  return <Host ref={hostRef} className={className} aria-hidden="true" />;
}

const Host = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
`;