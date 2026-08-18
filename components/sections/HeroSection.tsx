"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

const avatarModes = [
  { id: "default", label: "200 OK", src: "/developer_avatar.png", tag: "DEFAULT_MODE" },
  { id: "base", label: "Transparent", src: "/user_avatar_base.png", tag: "CUTOUT_BASE" },
  { id: "security", label: "Security", src: "/developer_avatar_security.png", tag: "SEC_MODE" },
  { id: "stressed", label: "500 Error", src: "/developer_avatar_stressed.png", tag: "FIRE_MODE" },
  { id: "thinking", label: "Thinking", src: "/developer_avatar_thinking.png", tag: "ARCH_MODE" },
  { id: "success", label: "Deployed", src: "/developer_avatar_success.png", tag: "PASS_MODE" },
];

export default function HeroSection() {
  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);
  const currentAvatar = avatarModes[activeAvatarIndex];

  return (
    <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Top sticker badge */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="sticker-tag flex items-center gap-1.5 text-xs font-semibold">
          <Server className="w-3.5 h-3.5 text-[#ff5e5b]" /> STATUS: 200 OK (FOR NOW)
        </span>
        <span className="sticker-tag-red flex items-center gap-1 text-xs">
          <Flame className="w-3.5 h-3.5" /> 1 FIRE EXTINGUISHED TODAY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text & Hero Content */}
        <div className="lg:col-span-8">
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
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="font-mono text-xs font-bold uppercase text-[#57534e] mr-2">
              primary toolbelt:
            </span>
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono bg-[#ffffff] border border-[#1e1d1b] sketch-border-sm hover:bg-[#ffe866] transition-colors"
              >
                `{tag}`
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: 2D Vector Avatar Card (Transparent Background) */}
        <div className="lg:col-span-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative sketch-card p-4 bg-[#fcfbfa] border-2 border-[#1e1d1b] max-w-sm w-full transform rotate-1 hover:rotate-0 transition-transform"
          >
            <span className="absolute -top-3 left-4 sticker-tag text-[10px] uppercase font-mono font-bold z-10">
              AVATAR // {currentAvatar.tag}
            </span>

            {/* Avatar Display Container - Transparent BG */}
            <div className="relative aspect-square w-full border-2 border-[#1e1d1b] rounded bg-paper-dots p-2 flex items-center justify-center overflow-hidden">
              <motion.div
                key={currentAvatar.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={currentAvatar.src}
                  alt={`Developer Vector Avatar - ${currentAvatar.label}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-1 drop-shadow-md"
                  priority
                />
              </motion.div>
            </div>

            {/* Avatar Mode State Selector Buttons */}
            <div className="mt-3 pt-2 border-t border-dashed border-[#1e1d1b]">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#57534e] mb-1.5">
                <span>AVATAR STATE:</span>
                <span className="font-hand text-[#ff5e5b] font-bold">// Transparent Vector</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {avatarModes.map((mode, idx) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveAvatarIndex(idx)}
                    className={`px-2 py-0.5 text-[11px] font-mono border rounded transition-colors ${
                      activeAvatarIndex === idx
                        ? "bg-[#1e1d1b] text-[#ffe866] border-[#1e1d1b] font-bold"
                        : "bg-white text-[#1e1d1b] border-[#1e1d1b] hover:bg-[#ffe866]"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Arrow annotation */}
      <div className="flex items-center space-x-3 pt-6">
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
