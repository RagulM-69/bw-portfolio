"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardSwap, { FEATURED_PROJECTS } from "./projects/CardSwap";
import ThreeDCard from "./ThreeDCard";
import { ArrowUpRight } from "lucide-react";

const FEATURED_DETAIL = [
  {
    id: 0,
    title: "ResuSloth — AI Resume Analyzer",
    tag: "AI · Full Stack",
    description:
      "An intelligent resume analysis tool that evaluates how well a resume matches a job description.",
    detail:
      "ResuSloth helps job seekers optimize their resumes to pass modern Applicant Tracking Systems (ATS) and increase interview chances. Get an AI-powered ATS score, skill gap detection, and actionable insights.",
    link: "https://github.com/RagulM-69",
  },
  {
    id: 1,
    title: "SlothSummarizer — AI Content Compressor",
    tag: "AI · Productivity",
    description:
      "A lightweight AI-powered summarization tool that instantly converts long content into clear, concise summaries.",
    detail:
      "Built for researchers, students, and professionals who need rapid insight extraction. Paste any article, document or URL and receive a structured summary with key takeaways in seconds.",
    link: "https://github.com/RagulM-69",
  },
  {
    id: 2,
    title: "Devotional Trust Foundation",
    tag: "Next.js · Full Stack",
    description:
      "Production organization website for a devotional trust featuring online donations, merchandise, deeds, and community features.",
    detail:
      "A full-stack web platform built with Next.js, featuring secure Stripe-powered donations, a merchandise shop, a public deeds showcase, contact integration, and a private admin dashboard for content management.",
    link: "https://github.com/RagulM-69",
  },
];

const MINOR_PROJECTS = [
  {
    title: "Cuddle Cart",
    desc: "A community-driven eCommerce platform for baby/kids products, combining smart shopping with trusted parenting insights and an AI Chatbot.",
    tags: "FlutterFlow — Supabase",
  },
  {
    title: "LivelyChat",
    desc: "A modern real-time chat platform designed for seamless and responsive communication using WebSockets and Node.js.",
    tags: "JavaScript — Node.js",
  },
  {
    title: "Interactive Weather App",
    desc: "Provides real-time weather information and global forecasts through a clean, responsive, and dynamic interface.",
    tags: "JavaScript — Weather API",
  },
];

function FeaturedDetail({ project }: { project: (typeof FEATURED_DETAIL)[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-col gap-5"
      >
        <span className="text-xs font-black tracking-[0.2em] uppercase text-[#0A0A0A]/50 border border-[#0A0A0A]/15 rounded-full self-start px-3 py-1">
          {project.tag}
        </span>
        <h3 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter leading-tight">
          {project.title}
        </h3>
        <p className="text-[#0A0A0A]/80 text-lg md:text-xl leading-relaxed font-medium">
          {project.description}
        </p>
        <p className="text-[#0A0A0A]/60 text-base leading-relaxed font-medium">
          {project.detail}
        </p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border-b-2 border-[#0A0A0A] pb-1 self-start hover:text-[#0A0A0A]/50 hover:border-[#0A0A0A]/50 text-[#0A0A0A] transition-colors group mt-2">
          <span className="uppercase tracking-widest text-sm font-bold">View Project</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState(0);
  const activeProject = FEATURED_DETAIL[activeId];

  return (
    <section className="relative w-full py-32 px-6 bg-transparent z-10 flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
            #04 — PROBLEM SOLVER
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-20 text-[#0A0A0A]">
            Things I&apos;ve Built
          </h2>
        </motion.div>

        {/* Featured block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b-2 border-[#0A0A0A]/10 pb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="text-sm font-bold tracking-widest text-[#0A0A0A]/50 uppercase mr-1">
                ⭐ Featured
              </div>
              {FEATURED_PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeId === p.id
                      ? "bg-[#0A0A0A] scale-125"
                      : "bg-[#0A0A0A]/25 hover:bg-[#0A0A0A]/50"
                  }`}
                  aria-label={`Select ${p.cardLabel}`}
                />
              ))}
            </div>
            <FeaturedDetail project={activeProject} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="hidden sm:flex flex-col items-center gap-4"
          >
            <CardSwap activeIndex={activeId} onSelect={setActiveId} />
            <p className="text-xs tracking-widest uppercase font-bold text-[#0A0A0A]/30 mt-2">
              Click a card to switch
            </p>
          </motion.div>
        </div>

        {/* Other projects grid — now with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20 pb-20">
          {MINOR_PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="h-full"
            >
              <a href="https://github.com/RagulM-69" target="_blank" rel="noopener noreferrer" className="block h-full">
                <ThreeDCard
                  className="h-full"
                  cardClassName="h-full bg-[#0A0A0A] rounded-xl border border-[#F5F1EA]/10 p-8 flex flex-col justify-between cursor-pointer overflow-hidden group"
                  maxRotation={12}
                  glowOpacity={0.15}
                  glowColor="245,241,234"
                  shadowBlur={40}
                  parallaxOffset={20}
                >
                  {/* Ghost number */}
                  <div className="absolute text-[#F5F1EA]/5 -right-4 -top-8 text-[12rem] font-black pointer-events-none select-none">
                    0{i + 1}
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-[#F5F1EA]/50 text-xs font-bold tracking-widest uppercase">
                      {project.tags}
                    </span>
                    <h4 className="text-2xl lg:text-3xl font-black tracking-tight text-[#F5F1EA] leading-snug group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-[#F5F1EA]/70 font-medium leading-relaxed mt-2 text-sm">
                      {project.desc}
                    </p>
                    <div className="w-12 h-[2px] bg-[#F5F1EA]/30 mt-4 group-hover:w-full group-hover:bg-[#F5F1EA] transition-all duration-500" />
                  </div>

                  <div className="flex justify-between items-end text-[#F5F1EA]/60 group-hover:text-[#F5F1EA] transition-colors duration-300 mt-10">
                    <span className="text-sm tracking-widest uppercase font-bold">View Project</span>
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </ThreeDCard>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
