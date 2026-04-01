'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}

function Sphere({ position, color, speed = 1, distort = 0.3 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Torus({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.25, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function Icosahedron({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35 * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}


/**
 * Hook to track scroll position for parallax effect
 * Returns normalized scroll value (0 at top, increases as user scrolls)
 */
function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll position relative to viewport height
      const normalized = window.scrollY / window.innerHeight;
      setScrollY(normalized);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

/**
 * FloatingShapes - 3D scene with abstract floating shapes (spheres, tori, icosahedrons)
 * 
 * Validates: Requirements 1.5, 10.1, 10.2, 10.3, 16.2
 * - 1.5: Render animated 3D element (floating abstract shapes) in Hero background
 * - 10.1: Render at least one interactive 3D scene with floating objects
 * - 10.2: Apply rotation/drift response to mouse movement (handled by MouseTracker)
 * - 10.3: Render at 30+ FPS on hardware-accelerated devices
 * - 16.2: Apply parallax scrolling effect to background element
 */
export function FloatingShapes() {
  const scrollY = useScrollParallax();
  const groupRef = useRef<THREE.Group>(null);

  // Apply scroll-based parallax effect
  useFrame(() => {
    if (groupRef.current) {
      // Move shapes up as user scrolls down (parallax effect)
      // Multiplier of 2 creates noticeable depth effect
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollY * 2,
        0.1
      );
      // Subtle rotation based on scroll
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        scrollY * 0.1,
        0.05
      );
    }
  });
  // Memoize shape configurations to prevent recreation on re-renders
  const shapes = useMemo(
    () => ({
      spheres: [
        { position: [-3, 1.5, -2] as [number, number, number], color: '#8b5cf6', speed: 0.8, distort: 0.4 },
        { position: [3.5, -1, -3] as [number, number, number], color: '#06b6d4', speed: 1.2, distort: 0.3 },
        { position: [0, 2.5, -4] as [number, number, number], color: '#a855f7', speed: 1, distort: 0.35 },
      ],
      tori: [
        { position: [2.5, 2, -2.5] as [number, number, number], color: '#7c3aed', speed: 0.9 },
        { position: [-2.5, -1.5, -3.5] as [number, number, number], color: '#0891b2', speed: 1.1 },
      ],
      icosahedrons: [
        { position: [-1, -2, -2] as [number, number, number], color: '#c084fc', speed: 0.7 },
        { position: [4, 0.5, -4] as [number, number, number], color: '#22d3d8', speed: 1.3 },
      ],
    }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      
      {/* Accent lights for color effects */}
      <pointLight position={[-5, 3, 2]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[5, -3, 2]} intensity={0.5} color="#06b6d4" />

      {/* Spheres */}
      {shapes.spheres.map((props, i) => (
        <Sphere key={`sphere-${i}`} {...props} />
      ))}

      {/* Tori */}
      {shapes.tori.map((props, i) => (
        <Torus key={`torus-${i}`} {...props} />
      ))}

      {/* Icosahedrons */}
      {shapes.icosahedrons.map((props, i) => (
        <Icosahedron key={`icosahedron-${i}`} {...props} />
      ))}
    </group>
  );
}
