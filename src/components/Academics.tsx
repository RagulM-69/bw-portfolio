"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2023 – 2027 (Present)",
    title: "B.E. Electronics and Communication Engineering",
    institution: "SNS College of Technology — Coimbatore",
    description: "Current CGPA: 8.5 / 10. Actively working on projects related to AI tools, web development, and intelligent systems. Continuously exploring areas such as machine learning, data analytics, and software development."
  },
  {
    year: "2021 – 2022",
    title: "HSC — Computer Science",
    institution: "Adharsh Vidhyalaya Matric Higher Secondary School",
    description: "Secured 87% aggregate. Built strong foundations in programming, logical thinking, and mathematics. Developed early interest in technology and software development."
  },
  {
    year: "2020 – 2021",
    title: "Secondary School Leaving Certificate (SSLC)",
    institution: "Adharsh Vidhyalaya Matric Higher Secondary School",
    description: "Successfully completed secondary school education. Developed strong academic foundations in science, mathematics, and analytical thinking."
  }
];

export default function Academics() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10">
      <div className="max-w-4xl w-full mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-xl font-bold tracking-widest mb-4 text-[#0A0A0A]">
            #02 — ECE STUDENT
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A]">
            My Academic Journey
          </h2>
        </motion.div>

        <div className="relative border-l-2 border-[#0A0A0A]/20 pl-8 md:pl-12 flex flex-col gap-16">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group block"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[39.5px] md:-left-[55.5px] top-10 w-4 h-4 rounded-full bg-[#F5F1EA] border-2 border-[#0A0A0A] group-hover:bg-[#0A0A0A] transition-colors duration-500" />
              
              <div className="flex flex-col gap-4 p-8 border-2 border-[#0A0A0A]/10 rounded-xl hover:-translate-y-2 hover:border-[#0A0A0A]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white/50 backdrop-blur-md">
                <span className="text-sm tracking-widest uppercase text-[#0A0A0A]/60 font-bold">
                  {item.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-[#0A0A0A] leading-tight">
                  {item.title}
                </h3>
                <h4 className="text-lg text-[#0A0A0A]/80 font-bold tracking-wide">
                  {item.institution}
                </h4>
                <p className="mt-2 text-[#0A0A0A]/70 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
