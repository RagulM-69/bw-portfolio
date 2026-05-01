"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const SKILLS = [
  { name: "JavaScript" },
  { name: "Python" },
  { name: "C++" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Next.js" },
  { name: "Tailwind CSS" },
  { name: "Supabase" },
  { name: "Git & GitHub" },
];

function OrbitingNode({ skill, index, total }: { skill: any; index: number; total: number }) {
  const group = useRef<THREE.Group>(null);
  // Increase radius slightly since there are 10 items now
  const radius = 5;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Offset each node
    const offset = (index / total) * Math.PI * 2;
    // Rotate very slowly around Y axis
    group.current.position.x = Math.sin(t * 0.4 + offset) * radius;
    group.current.position.z = Math.cos(t * 0.4 + offset) * radius;
    // Slight bobbing
    group.current.position.y = Math.sin(t * 1.2 + offset * 2) * 1.5;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#F5F1EA" wireframe />
        </mesh>
        <Html center zIndexRange={[100, 0]}>
          <div className="px-5 py-2.5 bg-[#0A0A0A] border border-[#0A0A0A]/20 text-[#F5F1EA] rounded-full text-sm font-bold tracking-widest uppercase shadow-2xl whitespace-nowrap">
            {skill.name}
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#0A0A0A" />
      
      {/* Central Text */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          fontSize={1.2}
          color="#0A0A0A"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#0A0A0A"
        >
          TECH STACK
        </Text>
      </Float>

      {/* Orbiting Icons */}
      {SKILLS.map((skill, i) => (
        <OrbitingNode key={skill.name} skill={skill} index={i} total={SKILLS.length} />
      ))}
    </>
  );
}

export default function Skills() {
  return (
    <section className="relative w-full h-[120vh] py-32 flex flex-col items-center justify-center bg-transparent z-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="absolute top-32 text-center z-20"
      >
        <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
          #03 — WHAT I WORK WITH
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
          Technical Expertise
        </h2>
      </motion.div>

      <div className="w-full h-[900px] pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
    </section>
  );
}
