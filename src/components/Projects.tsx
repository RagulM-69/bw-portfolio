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
    link: "https://resu-sloth.vercel.app/",
    image: "/projects/resusloth.png",
  },
  {
    id: 1,
    title: "SlothSummarizer — AI Content Compressor",
    tag: "AI · Productivity",
    description:
      "A lightweight AI-powered summarization tool that instantly converts long content into clear, concise summaries.",
    detail:
      "Built for researchers, students, and professionals who need rapid insight extraction. Paste any article, document or URL and receive a structured summary with key takeaways in seconds.",
    link: "https://sloth-summarizer.onrender.com/",
    image: "/projects/slothsummarizer.png",
  },
  {
    id: 2,
    title: "Devotional Trust Foundation",
    tag: "Next.js · Full Stack",
    description:
      "Production organization website for a devotional trust featuring online donations, merchandise, deeds, and community features.",
    detail:
      "A full-stack web platform built with Next.js, featuring secure Stripe-powered donations, a merchandise shop, a public deeds showcase, contact integration, and a private admin dashboard for content management.",
    link: "https://www.voiceofdharmafoundation.org/",
    image: "/projects/devotional.png",
  },
];

const MINOR_PROJECTS = [
  {
    title: "Cuddle Cart",
    desc: "A community-driven eCommerce platform for baby/kids products, combining smart shopping with trusted parenting insights and an AI Chatbot.",
    tags: "FlutterFlow — Supabase",
    link: "https://pookie-project-fpeyh4.flutterflow.app/finalHomePage",
    image: "/projects/cuddlecart.png",
  },
  {
    title: "LivelyChat",
    desc: "A modern real-time chat platform designed for seamless and responsive communication using WebSockets and Node.js.",
    tags: "JavaScript — Node.js",
    link: "https://likelychat-1.onrender.com/",
    image: "/projects/livelychat.png",
  },
  {
    title: "Interactive Weather App",
    desc: "Provides real-time weather information and global forecasts through a clean, responsive, and dynamic interface.",
    tags: "JavaScript — Weather API",
    link: "https://weather-app-69.vercel.app/",
    image: "/projects/weather.png",
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
        <p className="text-[#0A0A0A]/80 text-lg leading-relaxed font-medium">
          {project.description}
        </p>
        <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
          {project.detail}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b-2 border-[#0A0A0A] pb-1 self-start hover:text-[#0A0A0A]/50 hover:border-[#0A0A0A]/50 text-[#0A0A0A] transition-colors group mt-2"
        >
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
    <section id="projects" className="relative w-full py-32 px-6 bg-transparent z-10 flex flex-col items-center">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center border-b-2 border-[#0A0A0A]/10 pb-20 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="mb-8">
              <div className="text-sm font-bold tracking-widest text-[#0A0A0A]/50 uppercase mb-6">
                ⭐ Featured
              </div>
              <FeaturedDetail project={activeProject} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center w-full overflow-visible"
          >
            <CardSwap activeIndex={activeId} onSelect={setActiveId} />
          </motion.div>
        </div>

        {/* Other projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-16 pb-16">
          {MINOR_PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="h-full"
            >
              <ThreeDCard
                className="h-full"
                cardClassName="h-full bg-[#111111] rounded-2xl border border-white/8 flex flex-col cursor-default overflow-hidden group"
                maxRotation={10}
                glowOpacity={0.10}
                glowColor="245,241,234"
                shadowBlur={50}
                parallaxOffset={12}
              >
                {/* Screenshot */}
                <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220 }}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#181818]">
                      <span className="text-white/10 text-5xl font-black">{project.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
                </div>

                {/* Info panel */}
                <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-3">
                  <span className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {project.tags}
                  </span>
                  <h4 className="text-xl font-black tracking-tight text-white/90 leading-snug group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {project.desc}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 mt-2 self-start text-white/40 hover:text-white transition-colors duration-200 group/lnk"
                  >
                    <span className="text-[11px] tracking-widest uppercase font-bold border-b border-white/15 group-hover/lnk:border-white pb-px transition-colors">
                      View Project
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
