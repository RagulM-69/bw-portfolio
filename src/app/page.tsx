"use client";

import { useState } from "react";
import EntryScreen from "@/components/EntryScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academics from "@/components/Academics";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Internships from "@/components/Internships";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [entryComplete, setEntryComplete] = useState(false);
  const { scrollYProgress } = useScroll();

  // Background color interpolation based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["#0A0A0A", "#F5F1EA"]
  );

  return (
    <motion.main 
      style={{ backgroundColor }}
      className="w-full min-h-screen transition-colors duration-0"
    >
      {!entryComplete && <EntryScreen onComplete={() => setEntryComplete(true)} />}
      
      <div 
        className={`transition-opacity duration-1000 ${
          entryComplete ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none h-screen overflow-hidden"
        }`}
      >
        <Hero />
        <About />
        <Academics />
        <Skills />
        <Projects />
        <Internships />
        <Certifications />
        <Contact />
      </div>
    </motion.main>
  );
}
