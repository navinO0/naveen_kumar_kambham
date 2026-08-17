"use client";

import { motion } from "framer-motion";
import { ArrowDown, Cpu, Database, Flame, Server, ShieldCheck } from "lucide-react";

const techTags = [
  "Node.js",
  "Next.js",
  "Fastify",
  "PostgreSQL",
  "SQLite",
  "Redis",
  "Docker",
  "REST APIs",
  "Security",
];

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-16 px-4 max-w-5xl mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Top sticker badge */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="sticker-tag flex items-center gap-1.5 text-xs font-semibold">
          <Server className="w-3.5 h-3.5 text-[#ff5e5b]" /> STATUS: 200 OK (FOR NOW)
        </span>
        <span className="sticker-tag-red flex items-center gap-1 text-xs">
          <Flame className="w-3.5 h-3.5" /> 1 FIRE EXTINGUISHED TODAY
        </span>
      </div>

      {/* Main Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e1d1b] tracking-tight leading-tight mb-4"
      >
        hi. I build the part of the application{" "}
        <span className="marker-highlight inline-block">nobody sees until it breaks.</span>
      </motion.h1>

      {/* Subhead text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-base sm:text-lg md:text-xl text-[#57534e] max-w-3xl leading-relaxed mb-6 font-medium"
      >
        backend-focused developer working with APIs, databases, authentication, security, performance, and the occasional production fire.
      </motion.p>

      {/* Handwritten Graffiti Annotation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative inline-block mb-8 p-3 bg-[#ffe866]/30 border-1.5 border-[#1e1d1b] sketch-border-sm transform -rotate-1"
      >
        <span className="font-hand text-base md:text-lg text-[#1e1d1b] font-bold">
          "frontend gets the pixels. I get the logs."
        </span>
        <span className="absolute -top-3 -right-2 font-hand text-xs text-[#ff5e5b] font-bold">
          // fact
        </span>
      </motion.div>

      {/* Compact Tech Tags */}
      <div className="flex flex-wrap gap-2 items-center mb-10">
        <span className="font-mono text-xs font-bold uppercase text-[#57534e] mr-2">
          primary toolbelt:
        </span>
        {techTags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-mono bg-white border border-[#1e1d1b] sketch-border-sm hover:bg-[#ffe866] transition-colors"
          >
            `{tag}`
          </span>
        ))}
      </div>

      {/* Scroll Arrow annotation */}
      <div className="flex items-center space-x-3 pt-2">
        <span className="font-hand text-sm md:text-base text-[#ff5e5b] font-bold">
          scroll ↓ the interesting stuff is underneath
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-1 border border-[#1e1d1b] rounded-full bg-white sketch-border-sm"
        >
          <ArrowDown className="w-4 h-4 text-[#ff5e5b]" />
        </motion.div>
      </div>
    </section>
  );
}
