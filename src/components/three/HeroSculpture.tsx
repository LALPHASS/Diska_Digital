'use client';

import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Group, PMREMGenerator } from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
/* eslint-disable react-hooks/immutability -- Three.js owns this mutable scene; the effect restores its environment on cleanup. */
function StudioEnvironment() {
  const {
    gl,
    scene
  } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, 0.04);
    const previous = scene.environment;
    scene.environment = environment.texture;
    room.dispose();
    generator.dispose();
    return () => {
      scene.environment = previous;
      environment.dispose();
    };
  }, [gl, scene]);
  return null;
}
/* eslint-enable react-hooks/immutability */
function Sculpture({
  reduced
}: {
  reduced: boolean;
}) {
  const group = useRef<Group>(null);
  useFrame(({
    clock,
    pointer
  }) => {
    if (!group.current || reduced) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x += (0.45 + pointer.y * 0.18 - group.current.rotation.x) * 0.035;
    group.current.rotation.y += (0.3 + Math.sin(t * 0.2) * 0.25 + pointer.x * 0.25 - group.current.rotation.y) * 0.035;
    group.current.rotation.z = -0.35 + Math.sin(t * 0.25) * 0.06;
    group.current.position.y = Math.sin(t * 0.65) * 0.09;
  });
  return <group ref={group} rotation={[0.45, 0.3, -0.35]}>
    <mesh>
      <torusKnotGeometry args={[1.15, 0.39, 192, 40, 2, 3]} />
      <meshPhysicalMaterial color="#173fea" metalness={0.55} roughness={0.21} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.5} />
    </mesh>
  </group>;
}
class SculptureBoundary extends Component<{
  children: ReactNode;
}, {
  failed: boolean;
}> {
  state = {
    failed: false
  };
  static getDerivedStateFromError() {
    return {
      failed: true
    };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function HeroSculpture() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px'
    });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className="sculpture-canvas" aria-hidden="true">
    <SculptureBoundary>
      <Canvas camera={{
        position: [0, 0, 7.4],
        fov: 38
      }} dpr={[1, 1.5]} frameloop={reduced || !visible ? 'demand' : 'always'} gl={{
        antialias: true,
        alpha: true
      }} fallback={null}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 5]} intensity={3} />
        <directionalLight position={[-4, 1, 2]} intensity={2} color="#a8bdff" />
        <StudioEnvironment />
        <Sculpture reduced={reduced} />
      </Canvas>
    </SculptureBoundary>
  </div>;
}
