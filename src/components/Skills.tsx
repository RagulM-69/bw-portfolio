"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const SKILLS = [
  { name: "JavaScript",   color: "#F7DF1E", abbr: "JS"  },
  { name: "TypeScript",   color: "#3178C6", abbr: "TS"  },
  { name: "Python",       color: "#3776AB", abbr: "Py"  },
  { name: "C++",          color: "#00599C", abbr: "C+"  },
  { name: "HTML & CSS",   color: "#E34F26", abbr: "H5"  },
  { name: "React",        color: "#61DAFB", abbr: "⚛"   },
  { name: "Node.js",      color: "#339933", abbr: "No"  },
  { name: "Express",      color: "#aaaaaa", abbr: "Ex"  },
  { name: "Next.js",      color: "#ffffff", abbr: "Nx"  },
  { name: "Tailwind CSS", color: "#06B6D4", abbr: "Tw"  },
  { name: "Git",          color: "#F05032", abbr: "Git" },
  { name: "GitHub",       color: "#cccccc", abbr: "GH"  },
  { name: "VS Code",      color: "#007ACC", abbr: "VS"  },
  { name: "Figma",        color: "#F24E1E", abbr: "Fi"  },
  { name: "Supabase",     color: "#3ECF8E", abbr: "Sb"  },
];

function OrbitingNode({ skill, index, total }: { skill: typeof SKILLS[0]; index: number; total: number }) {
  const group = useRef<THREE.Group>(null);
  const radius = 6;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const offset = (index / total) * Math.PI * 2;
    group.current.position.x = Math.sin(t * 0.35 + offset) * radius;
    group.current.position.z = Math.cos(t * 0.35 + offset) * radius;
    group.current.position.y = Math.sin(t * 1.1 + offset * 2) * 1.6;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial color="#F5F1EA" wireframe />
        </mesh>
        <Html center zIndexRange={[100, 0]}>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 14px 6px 8px",
            background: "#0A0A0A",
            border: "1px solid rgba(245,241,234,0.15)",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            boxShadow: `0 0 16px ${skill.color}33`,
          }}>
            {/* Brand badge */}
            <span style={{
              width: 22, height: 22, borderRadius: "50%",
              background: skill.color,
              color: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, fontWeight: 900, flexShrink: 0,
              letterSpacing: "0.05em",
            }}>
              {skill.abbr}
            </span>
            <span style={{
              color: "#F5F1EA", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              {skill.name}
            </span>
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
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          fontSize={1.1}
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
      {SKILLS.map((skill, i) => (
        <OrbitingNode key={skill.name} skill={skill} index={i} total={SKILLS.length} />
      ))}
    </>
  );
}

function MobileSkills() {
  return (
    <div className="flex flex-wrap gap-3 justify-center px-6 py-8">
      {SKILLS.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="flex items-center gap-2 pl-2 pr-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-full shadow-lg"
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-black flex-shrink-0"
            style={{ background: skill.color }}
          >
            {skill.abbr}
          </span>
          <span className="text-[#F5F1EA] text-xs font-bold tracking-widest uppercase">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <>
      {/* Divider before */}
      <div className="relative w-full py-10 flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#0A0A0A]/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-7 py-2.5 border border-[#0A0A0A]/15 rounded-full bg-[#F5F1EA] text-[#0A0A0A]/40 text-[11px] font-black tracking-[0.25em] uppercase"
        >
          ✦ What I work with ✦
        </motion.div>
      </div>

      {/* Main section */}
      <section className="relative w-full bg-transparent z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center pt-10 pb-4 px-6 z-20 relative"
        >
          <div className="text-xl font-bold tracking-widest mb-3 text-[#0A0A0A]">
            #03 — WHAT I WORK WITH
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
            Technical Expertise
          </h2>
        </motion.div>

        {/* 3D orbit — desktop */}
        <div className="hidden md:block w-full h-[750px] pointer-events-none md:pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>

        {/* Pill grid — mobile */}
        <div className="md:hidden pb-10">
          <MobileSkills />
        </div>
      </section>

      {/* Divider after */}
      <div className="relative w-full py-10 flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#0A0A0A]/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-7 py-2.5 border border-[#0A0A0A]/15 rounded-full bg-[#F5F1EA] text-[#0A0A0A]/40 text-[11px] font-black tracking-[0.25em] uppercase"
        >
          ✦ Things I&apos;ve built ✦
        </motion.div>
      </div>
    </>
  );
}
