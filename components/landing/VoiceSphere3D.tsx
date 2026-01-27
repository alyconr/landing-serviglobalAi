'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d'; 

function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
        // Subtle rotation
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
      <MeshDistortMaterial
        color="#8b5cf6" // Violet-500
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function VoiceSphere3D() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center relative">
      <Canvas className="bg-transparent" camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a78bfa" />
        <AnimatedSphere />
      </Canvas>
      {/* Glow effect backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-violet-500/30 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}
