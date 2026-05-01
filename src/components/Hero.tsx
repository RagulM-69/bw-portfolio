"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 30 }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#F5F1EA] rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [0.1, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-[#0A0A0A] overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0A0A0A] to-[#0A0A0A] z-0" />
      
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-2xl text-[#F5F1EA]/80 font-medium mix-blend-difference mb-4 tracking-widest uppercase italic"
        >
          Hey, I&apos;m
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-[#F5F1EA] mix-blend-difference leading-none">
            RAGUL M
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="mt-8 max-w-3xl text-base md:text-xl text-[#F5F1EA]/70 font-light leading-relaxed mix-blend-difference"
        >
          ECE Student & Builder of AI-powered tools, web apps & data-driven solutions — turning ideas into working products.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 mix-blend-difference"
        >
          <button className="px-8 py-4 border border-[#F5F1EA] text-[#0A0A0A] bg-[#F5F1EA] text-sm tracking-widest uppercase font-bold hover:bg-transparent hover:text-[#F5F1EA] transition-colors duration-500 rounded-sm">
            View My Work
          </button>
          <button className="px-8 py-4 border border-[#F5F1EA]/30 text-[#F5F1EA] bg-transparent text-sm tracking-widest uppercase font-bold hover:border-[#F5F1EA] transition-colors duration-500 rounded-sm">
            Download Resume
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 z-10 mix-blend-difference"
      >
        <div className="text-[#F5F1EA]/50 text-xs tracking-[0.3em] uppercase">Scroll</div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#F5F1EA] to-transparent"
        />
      </motion.div>
    </section>
  );
}
