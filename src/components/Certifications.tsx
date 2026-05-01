"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ThreeDCard from "./ThreeDCard";

/* ── Official SVG logos as inline components ───────────────────── */
const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00"/>
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF"/>
    <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M28.7 23.6l-9.9 16.4h4.2l2-3.4h9.9l2 3.4h4.3l-9.9-16.4h-2.6zm1.3 5l3.3 5.6h-6.6l3.3-5.6zM55.2 23.6l-5 11.2-5-11.2H41l7.1 16.4h4.1l7.1-16.4h-4.1zM74.3 36.6c-3.1 0-5.1-2.1-5.1-5.1s2-5.1 5.1-5.1c1.8 0 3.3.8 4.3 2l2.8-2.2c-1.6-2-4-3.2-7.1-3.2-5.1 0-9 3.6-9 8.5s3.9 8.5 9 8.5c3.1 0 5.6-1.3 7.3-3.4l-2.8-2.2c-1 1.4-2.6 2.2-4.5 2.2z" fill="#FF9900"/>
    <path d="M14.5 47.2c-6.8-4.9-10.5-13-9.3-21.5C6.6 16.2 13 8.8 21.3 5.9c8.3-2.9 17.5-1 23.9 5 .5.5 1.4.5 1.9 0 .5-.5.5-1.4 0-1.9C40 2.5 30 .3 21 3.4 11.9 6.5 4.9 14.6 3.6 24.1c-1.3 9.5 2.8 18.9 10.5 24.4.3.2.6.3.9.3.5 0 1-.2 1.3-.7.5-.7.3-1.6-.4-2.1l.6.2z" fill="#FF9900"/>
    <path d="M95.5 41.3c-1.2-1.5-3-2.2-5.8-2.2h-.7v-2.5h.7c2.1 0 3.2-.8 3.2-2.2 0-1.5-1.1-2.2-3-2.2-1.8 0-3.3.7-4.3 2.1l-2.2-2.2c1.6-2 4-3.1 6.7-3.1 3.9 0 6.3 1.9 6.3 4.9 0 1.8-.9 3.3-2.5 4 2 .7 3.2 2.2 3.2 4.3 0 3.3-2.7 5.4-7 5.4-2.9 0-5.4-1.1-7-3.1l2.2-2.2c1.1 1.5 2.8 2.3 4.9 2.3 2.1 0 3.3-.9 3.3-2.3z" fill="#FF9900"/>
  </svg>
);

const OracleLogo = () => (
  <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M40 10h120c16.6 0 30 13.4 30 30s-13.4 30-30 30H40C23.4 70 10 56.6 10 40S23.4 10 40 10zm0 15c-8.3 0-15 6.7-15 15s6.7 15 15 15h120c8.3 0 15-6.7 15-15s-6.7-15-15-15H40z" fill="#F80000"/>
  </svg>
);

const SalesforceLogo = () => (
  <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M41.5 14.4a18 18 0 0 1 12.8-5.3c6.7 0 12.5 3.6 15.7 9a20.4 20.4 0 0 1 7.3-1.4c11.3 0 20.5 9.2 20.5 20.5S88.6 57.7 77.3 57.7H25.2C15.7 57.7 8 50 8 40.5c0-8.7 6.2-15.9 14.4-17.6a17 17 0 0 1 19.1-8.5z" fill="#00A1E0"/>
  </svg>
);

const DatabricksLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M50 5L95 31.3V68.7L50 95 5 68.7V31.3L50 5z" fill="#FF3621"/>
    <path d="M50 20l30 17.3v10L50 65 20 47.3v-10L50 20z" fill="white" opacity="0.9"/>
    <path d="M50 35l15 8.6v5L50 57 35 48.6v-5L50 35z" fill="#FF3621"/>
  </svg>
);

const SnowflakeLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#29B5E8"/>
    <line x1="50" y1="15" x2="50" y2="85" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <line x1="17" y1="32.5" x2="83" y2="67.5" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <line x1="83" y1="32.5" x2="17" y2="67.5" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="15" r="5" fill="white"/>
    <circle cx="50" cy="85" r="5" fill="white"/>
    <circle cx="17" cy="32.5" r="5" fill="white"/>
    <circle cx="83" cy="67.5" r="5" fill="white"/>
    <circle cx="83" cy="32.5" r="5" fill="white"/>
    <circle cx="17" cy="67.5" r="5" fill="white"/>
  </svg>
);

const ServiceNowLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#62D84E"/>
    <path d="M30 55c0-11 9-20 20-20s20 9 20 20" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <circle cx="50" cy="55" r="7" fill="white"/>
  </svg>
);

const GoogleCloudLogo = () => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M50 8l14.4 8.3H64l10.3 5.9v11.7l7.2 4.2v8.3l-7.2 4.2v11.7l-10.3 5.9h-.5L50 72 35.6 63.7h-.5L24.8 57.8V46.1l-7.2-4.2v-8.3l7.2-4.2V18.2L35.6 12.3h.5L50 4l0 4z" fill="none"/>
    <path d="M62.5 25H37.5c-6.9 0-12.5 5.6-12.5 12.5S30.6 50 37.5 50H50v-7.5H37.5c-2.8 0-5-2.2-5-5s2.2-5 5-5H62.5c2.8 0 5 2.2 5 5v.5c0 2.8-2.2 5-5 5H57V50h5.5C69.4 50 75 44.4 75 37.5S69.4 25 62.5 25z" fill="#4285F4"/>
    <circle cx="38" cy="62" r="7" fill="#EA4335"/>
    <circle cx="62" cy="62" r="7" fill="#FBBC05"/>
    <circle cx="50" cy="20" r="7" fill="#34A853"/>
  </svg>
);

/* ── Cert data with logo components ────────────────────────────── */
const certifications = [
  { title: "Azure AI Fundamentals",        issuer: "Microsoft",        category: "AI & Cloud",      bg: "#0078D4", Logo: MicrosoftLogo },
  { title: "AWS ML Foundations",           issuer: "Amazon Web Svcs",  category: "Cloud & AI",      bg: "#232F3E", Logo: AWSLogo       },
  { title: "AWS GenAI Foundations",        issuer: "Amazon Web Svcs",  category: "Generative AI",   bg: "#232F3E", Logo: AWSLogo       },
  { title: "OCI DevOps Professional",      issuer: "Oracle Cloud",     category: "DevOps",          bg: "#1a1a1a", Logo: OracleLogo    },
  { title: "OCI GenAI Professional",       issuer: "Oracle Cloud",     category: "Generative AI",   bg: "#1a1a1a", Logo: OracleLogo    },
  { title: "Agentforce Specialist",        issuer: "Salesforce",       category: "AI Agents",       bg: "#032D60", Logo: SalesforceLogo},
  { title: "Databricks Fundamentals",      issuer: "Databricks",       category: "Data Platform",   bg: "#1B1B1B", Logo: DatabricksLogo},
  { title: "GenAI Fundamentals",           issuer: "Databricks",       category: "Generative AI",   bg: "#1B1B1B", Logo: DatabricksLogo},
  { title: "SnowPro Associate",            issuer: "Snowflake",        category: "Data Platform",   bg: "#11A9D8", Logo: SnowflakeLogo },
  { title: "ServiceNow CSA",              issuer: "ServiceNow",       category: "Enterprise IT",   bg: "#003B5C", Logo: ServiceNowLogo},
  { title: "Google Cloud Arcade",          issuer: "Google Cloud",     category: "Cloud",           bg: "#1a1a2e", Logo: GoogleCloudLogo},
];

const TICKER = [...certifications, ...certifications];

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const { Logo } = cert;
  return (
    <ThreeDCard
      className="shrink-0 w-64 h-56"
      cardClassName="w-full h-full bg-[#0A0A0A] rounded-xl border border-[#F5F1EA]/10 p-7 flex flex-col gap-3 cursor-default overflow-hidden"
      maxRotation={8}
      glowOpacity={0.14}
      glowColor="245,241,234"
      shadowBlur={32}
      parallaxOffset={16}
    >
      {/* Ghost number */}
      <div className="absolute text-[#F5F1EA]/5 -right-3 -top-6 text-[8rem] font-black pointer-events-none select-none">
        {String((index % certifications.length) + 1).padStart(2, "00")}
      </div>

      {/* Logo badge */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shadow-lg shrink-0"
        style={{ backgroundColor: cert.bg }}
      >
        <Logo />
      </div>

      <span className="text-[#F5F1EA]/40 text-xs font-bold tracking-widest uppercase">
        {cert.category}
      </span>

      <h4 className="text-lg font-black text-[#F5F1EA] leading-snug">
        {cert.title}
      </h4>

      <p className="text-[#F5F1EA]/50 font-bold text-xs tracking-wide">
        {cert.issuer}
      </p>

      <div className="w-10 h-[2px] bg-[#F5F1EA]/20 mt-1" />
    </ThreeDCard>
  );
}

export default function Certifications() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-32 flex flex-col items-center z-10 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
            #06 — VERIFIED CREDENTIALS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
            Certifications
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F5F1EA, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #F5F1EA, transparent)" }}
        />

        <div
          ref={trackRef}
          className="flex gap-6 w-max animate-cert-marquee hover:[animation-play-state:paused] px-6"
        >
          {TICKER.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cert-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-cert-marquee {
          animation: cert-marquee 36s linear infinite;
        }
      `}</style>
    </section>
  );
}
