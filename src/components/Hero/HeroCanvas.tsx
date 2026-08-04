'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CocktailGlass({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#cfeef2',
      transparent: true,
      opacity: reduced ? 0.5 : 0.34,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide,
    });

    const gold = new THREE.MeshStandardMaterial({
      color: '#d4af37',
      metalness: 0.9,
      roughness: 0.28,
      emissive: '#5c470f',
      emissiveIntensity: 0.4,
    });

    const liquid = new THREE.MeshStandardMaterial({
      color: '#e9c13e',
      metalness: 0.45,
      roughness: 0.22,
      emissive: '#d4a017',
      emissiveIntensity: 0.55,
    });

    const bubble = new THREE.MeshStandardMaterial({
      color: '#ffe9a8',
      emissive: '#f7d97c',
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.9,
    });

    return { glass, gold, liquid, bubble };
  }, [reduced]);

  const bubbles = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    for (let i = 0; i < 7; i++) {
      const r = Math.random() * 0.55;
      const angle = Math.random() * Math.PI * 2;
      const y = 1.2 + Math.random() * 1.0;
      positions.push([
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r,
      ]);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    group.rotation.y += delta * (reduced ? 0.12 : 0.22);
    group.rotation.x = Math.sin(t * 0.4) * 0.04;
    group.position.y = Math.sin(t * 0.6) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        {/* Liquid */}
        <mesh material={materials.liquid} position={[0, 1.825, 0]}>
          <coneGeometry args={[1.42, 1.55, 24, 1, false]} />
        </mesh>

        {/* Bowl */}
        <mesh position={[0, 2.15, 0]} material={materials.glass}>
          <coneGeometry args={[1.5, 1.9, 24, 1, true]} />
        </mesh>

        {/* Bubbles */}
        {!reduced &&
          bubbles.map((pos, i) => (
            <mesh key={i} position={pos} material={materials.bubble}>
              <sphereGeometry args={[0.045, 10, 10]} />
            </mesh>
          ))}
      </Float>

      {/* Stem */}
      <mesh material={materials.gold} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.6, 10]} />
      </mesh>

      {/* Base */}
      <mesh material={materials.gold} position={[0, -0.46, 0]}>
        <cylinderGeometry args={[0.48, 0.42, 0.12, 20]} />
      </mesh>

      {/* Rim */}
      <mesh material={materials.gold} position={[0, 3.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.035, 8, 48]} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, reduced ? 1 : 2]}
      camera={{ position: [0, 0.8, 8.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 6, 4]} intensity={1.3} color="#fff3d0" />
      <pointLight position={[3, 4, 3]} intensity={2.4} distance={20} color="#f7d97c" />
      <pointLight position={[-4, 2, -3]} intensity={1.1} color="#7fd4e8" />

      <CocktailGlass reduced={reduced} />

      <Sparkles
        count={reduced ? 40 : 180}
        scale={reduced ? [9, 5, 9] : [14, 9, 11]}
        position={[0, 0.8, 0]}
        size={reduced ? 2.2 : 3.6}
        speed={0.32}
        opacity={0.65}
        color="#f0d77b"
      />
      <Sparkles
        count={reduced ? 20 : 60}
        scale={[7, 6, 7]}
        position={[0, 1.4, 0]}
        size={2}
        speed={0.5}
        opacity={0.5}
        color="#ffffff"
      />
    </Canvas>
  );
}
