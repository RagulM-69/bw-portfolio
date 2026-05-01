"use client";

import { motion } from "framer-motion";
import ThreeDCard from "./ThreeDCard";

const internships = [
  {
    role: "Virtual Internship",
    company: "ServiceNow",
    tag: "Enterprise Platform",
    description:
      "Hands-on exposure to the ServiceNow enterprise platform — workflows, modules, and IT service management.",
  },
  {
    role: "Web Development (Virtual)",
    company: "IBM SkillBuild",
    tag: "Frontend Development",
    description:
      "Frontend foundations, project-based learning and IBM-curated industry mentorship.",
  },
  {
    role: "Artificial Intelligence",
    company: "Botroid",
    tag: "AI & Machine Learning",
    description:
      "Worked on AI fundamentals, model usage and applied mini-projects.",
  },
  {
    role: "Web Development",
    company: "Lets Game Tech",
    tag: "Live Product",
    description:
      "Built and shipped components for live web products with real users in mind.",
  },
];

export default function Internships() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10">
      <div className="max-w-7xl w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
            #05 — WHERE I&apos;VE BEEN LEARNING
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
            Internships
          </h2>
        </motion.div>

        {/* 3D dark cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {internships.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              className="h-full"
            >
              <ThreeDCard
                className="h-full"
                cardClassName="h-full bg-[#0A0A0A] rounded-xl border border-[#F5F1EA]/10 p-8 flex flex-col gap-4 cursor-default overflow-hidden"
                maxRotation={10}
                glowOpacity={0.15}
                glowColor="245,241,234"
                shadowBlur={36}
                parallaxOffset={18}
              >
                {/* Ghost number */}
                <div className="absolute text-[#F5F1EA]/5 -right-3 -top-6 text-[9rem] font-black pointer-events-none select-none">
                  0{i + 1}
                </div>

                <span className="text-[#F5F1EA]/50 text-xs font-bold tracking-widest uppercase">
                  {item.tag}
                </span>
                <h4 className="text-xl font-black tracking-tight text-[#F5F1EA] leading-snug">
                  {item.role}
                </h4>
                <p className="text-[#F5F1EA]/60 font-bold text-sm tracking-wide">
                  {item.company}
                </p>
                <p className="text-[#F5F1EA]/70 font-medium leading-relaxed text-sm">
                  {item.description}
                </p>
                <div className="w-10 h-[2px] bg-[#F5F1EA]/20 mt-auto" />
              </ThreeDCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
