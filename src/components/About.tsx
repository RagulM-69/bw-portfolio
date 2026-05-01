"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string, label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-end">
      <div className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0A0A0A]">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm tracking-widest uppercase mt-4 text-[#0A0A0A]/70 font-bold text-center lg:text-right max-w-[150px]">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 flex flex-col justify-center items-center bg-transparent z-10">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-24">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center justify-between">
          {/* Left Side: Title and Abstract */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <div className="text-xl font-black tracking-widest mb-6 text-[#0A0A0A]">
              #01 — AI BUILDER
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-[#0A0A0A] mb-8">
              Who I Am
            </h2>
            <div className="flex flex-col gap-6 text-lg text-[#0A0A0A]/80 font-medium leading-relaxed">
              <p>
                I build intelligent tools and digital solutions that solve real-world problems. I&apos;m Ragul M, an Electronics and Communication Engineering student at SNS College of Technology, passionate about building AI-powered applications, web tools, and data-driven systems.
              </p>
              <p>
                I enjoy transforming ideas into practical products — from AI tools like ResuSloth and SlothSummarizer to platforms like Cuddle Cart, a community-driven eCommerce app for parents. I also explore areas like AI agents, automation systems, and decision-support tools.
              </p>
              <p>
                My approach to learning is simple: build, experiment, and improve continuously. Whether it&apos;s working with APIs, developing web applications, or experimenting with intelligent systems, I enjoy diving deep into problems and creating meaningful solutions.
              </p>
              <p>
                Currently seeking internship opportunities, collaborations, and challenging projects where I can grow as a developer and contribute to impactful technology.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Stats */}
          <div className="flex-1 flex flex-col w-full lg:items-end">
            <div className="grid grid-cols-2 gap-16 w-full lg:w-auto">
              <AnimatedCounter value={15} suffix="+" label="Projects Built" />
              <AnimatedCounter value={15} suffix="+" label="Technologies Explored" />
              <AnimatedCounter value={3} suffix="+" label="Years Learning Programming" />
              <AnimatedCounter value={7} suffix="+" label="Global Certifications" />
            </div>
          </div>
        </div>

        {/* Traits & Current Focus */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#0A0A0A]/10 pt-24"
        >
          {/* Traits */}
          <div className="flex flex-col gap-10 border-r-0 md:border-r border-[#0A0A0A]/10 pr-0 md:pr-10">
            <div>
              <h3 className="text-2xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tight">Fast Learner</h3>
              <p className="text-[#0A0A0A]/70 font-medium leading-relaxed">I pick up new technologies quickly, shipping production-ready code within days.</p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tight">Open Source</h3>
              <p className="text-[#0A0A0A]/70 font-medium leading-relaxed">Contributing to communities, sharing knowledge and improving shared tools.</p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tight">Team Player</h3>
              <p className="text-[#0A0A0A]/70 font-medium leading-relaxed">Experienced in collaborative environments, hackathons, and agile workflows.</p>
            </div>
          </div>

          {/* Current Focus */}
          <div className="flex flex-col gap-6 pl-0 md:pl-6">
            <div className="text-xl font-black tracking-widest mb-4 text-[#0A0A0A]">
              CURRENTLY WORKING ON
            </div>
            <ul className="flex flex-col gap-6">
              {[
                "Building a personalised website for an organization — featuring donations, merchandise, deeds, and contact sections",
                "Building AI-powered productivity tools and web applications",
                "Learning Data Analytics and real-world business problem solving",
                "Experimenting with AI agents and automation frameworks"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2 w-2 h-2 bg-[#0A0A0A] rounded-full shrink-0" />
                  <p className="text-[#0A0A0A]/80 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
