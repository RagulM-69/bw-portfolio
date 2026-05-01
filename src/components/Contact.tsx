"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ThreeDCard from "./ThreeDCard";

/* ── Social SVG icons ───────────────────────────────────────────── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  return `mailto:ragulm780@gmail.com?subject=${subject}&body=${body}`;
}

/* ── Quick-contact pill cards ───────────────────────────────────── */
function ContactPill({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <ThreeDCard
      cardClassName="bg-[#0A0A0A] rounded-2xl border border-[#F5F1EA]/10 px-6 py-5 flex items-center gap-4 cursor-pointer"
      maxRotation={8}
      glowOpacity={0.14}
      glowColor="245,241,234"
      shadowBlur={28}
      parallaxOffset={14}
    >
      <span className="text-[#F5F1EA]/70">{icon}</span>
      <span className="text-[#F5F1EA] font-bold text-sm tracking-wide">{label}</span>
    </ThreeDCard>
  );
}

export default function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = buildMailto(name, email, message);
  };

  return (
    <section className="relative w-full pt-32 flex flex-col justify-center items-center bg-transparent z-10 overflow-hidden">
      <div className="max-w-5xl w-full mx-auto px-6 flex flex-col">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
            #07 — CONTACT
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
            Let&apos;s Work Together
          </h2>
          <p className="mt-6 text-lg text-[#0A0A0A]/70 font-medium max-w-xl leading-relaxed">
            Whether you have a project in mind, a collaboration idea, or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        {/* ── Quick contact pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <a href="mailto:ragulm780@gmail.com">
            <ContactPill icon={<MailIcon />} label="ragulm780@gmail.com" href="mailto:ragulm780@gmail.com" />
          </a>
          <a href="https://linkedin.com/in/m-ragul" target="_blank" rel="noopener noreferrer">
            <ContactPill icon={<LinkedInIcon />} label="linkedin.com/in/m-ragul" href="#" />
          </a>
          <a href="https://github.com/RagulM-69" target="_blank" rel="noopener noreferrer">
            <ContactPill icon={<GitHubIcon />} label="github.com/RagulM-69" href="#" />
          </a>
        </motion.div>

        {/* ── Form container (3D card) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <ThreeDCard
            cardClassName="bg-[#0A0A0A] rounded-3xl border border-[#F5F1EA]/10 p-10 md:p-14"
            maxRotation={5}
            glowOpacity={0.1}
            glowColor="245,241,234"
            shadowBlur={60}
            parallaxOffset={10}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Name + Email row */}
              <div className="flex flex-col md:flex-row gap-8">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#F5F1EA]/20 pb-4 text-[#F5F1EA] text-lg font-bold focus:outline-none focus:border-[#F5F1EA]/60 transition-colors placeholder:text-[#F5F1EA]/30 placeholder:font-medium"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#F5F1EA]/20 pb-4 text-[#F5F1EA] text-lg font-bold focus:outline-none focus:border-[#F5F1EA]/60 transition-colors placeholder:text-[#F5F1EA]/30 placeholder:font-medium"
                />
              </div>

              {/* Message */}
              <textarea
                required
                placeholder="Your Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#F5F1EA]/20 pb-4 text-[#F5F1EA] text-lg font-bold focus:outline-none focus:border-[#F5F1EA]/60 transition-colors placeholder:text-[#F5F1EA]/30 resize-none placeholder:font-medium"
              />

              {/* Footer row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                <span className="text-[#F5F1EA]/40 text-sm font-bold uppercase tracking-widest">
                  Available for opportunities
                  <br />
                  <span className="text-xs normal-case font-medium text-[#F5F1EA]/30">
                    Opens your mail app with content pre-filled
                  </span>
                </span>

                <button
                  type="submit"
                  className="group w-full sm:w-auto relative px-12 py-5 text-sm tracking-[0.3em] text-[#0A0A0A] uppercase overflow-hidden border border-[#F5F1EA] bg-[#F5F1EA] rounded-sm transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 font-black">Send Message →</span>
                </button>
              </div>
            </form>
          </ThreeDCard>
        </motion.div>

      </div>

      {/* ── Footer ── */}
      <footer className="w-full mt-32 border-t-2 border-[#0A0A0A]/10">
        <div className="max-w-7xl mx-auto py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[#0A0A0A]/60 text-xs tracking-widest uppercase font-bold">
          <div className="text-xl text-[#0A0A0A] font-black tracking-normal">Ragul M</div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/RagulM-69" target="_blank" rel="noopener noreferrer"
              className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] transition-colors" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/m-ragul" target="_blank" rel="noopener noreferrer"
              className="text-[#0075B4]/70 hover:text-[#0075B4] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="mailto:ragulm780@gmail.com"
              className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] transition-colors" aria-label="Email">
              <MailIcon />
            </a>
          </div>

          <div>© 2025 · Built with passion</div>
        </div>
      </footer>
    </section>
  );
}
