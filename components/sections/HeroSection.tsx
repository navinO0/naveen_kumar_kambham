"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowDown, 
  Flame, 
  Server, 
  Code, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink,
  Share2
} from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4 fill-none stroke-current stroke-2"} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    handle: "github.com/navinO0",
    url: "https://github.com/navinO0",
    icon: Code,
    color: "bg-[#1e1d1b] text-white hover:bg-[#ff5e5b]",
    badge: "REPOS & SOURCE CODE"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "naveen-kumar-kambham",
    url: "https://www.linkedin.com/in/naveen-kumar-kambham/",
    icon: LinkedinIcon,
    color: "bg-[#0077b5] text-white hover:bg-[#005582]",
    badge: "CAREER & NETWORK"
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@stillix_io",
    url: "https://www.instagram.com/stillix_io",
    icon: InstagramIcon,
    color: "bg-[#e1306c] text-white hover:bg-[#b92b55]",
    badge: "BEHIND THE SCENES"
  },
  {
    id: "email",
    name: "Email",
    handle: "naveenkumarkambham1@gmail.com",
    url: "mailto:naveenkumarkambham1@gmail.com",
    icon: Mail,
    color: "bg-[#ffe866] text-[#1e1d1b] hover:bg-[#ebd555]",
    badge: "DIRECT DISPATCH"
  }
];

const avatarModes = [
  { id: "sunglasses", label: "Cool Shades", src: "/user_avatar_sunglasses.png", tag: "SHADES_MODE" },
  { id: "default", label: "200 OK", src: "/developer_avatar.png", tag: "DEFAULT_MODE" },
  { id: "base", label: "Transparent", src: "/user_avatar_base.png", tag: "CUTOUT_BASE" },
  { id: "security", label: "Security", src: "/developer_avatar_security.png", tag: "SEC_MODE" },
  { id: "stressed", label: "500 Error", src: "/developer_avatar_stressed.png", tag: "FIRE_MODE" },
  { id: "thinking", label: "Thinking", src: "/developer_avatar_thinking.png", tag: "ARCH_MODE" },
  { id: "success", label: "Deployed", src: "/developer_avatar_success.png", tag: "PASS_MODE" },
];

export default function HeroSection() {
  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentAvatar = avatarModes[activeAvatarIndex];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("naveenkumarkambham1@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

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
            className="relative inline-block mb-6 p-3 bg-[#ffe866]/30 border-1.5 border-[#1e1d1b] sketch-border-sm transform -rotate-1"
          >
            <span className="font-hand text-base md:text-lg text-[#1e1d1b] font-bold">
              "frontend gets the pixels. I get the logs."
            </span>
            <span className="absolute -top-3 -right-2 font-hand text-xs text-[#ff5e5b] font-bold">
              // fact
            </span>
          </motion.div>

          {/* REPLACEMENT: Interactive Social Links & Direct Connect Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="sketch-card p-4 md:p-5 bg-white border-2 border-[#1e1d1b] mb-6 max-w-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1e1d1b] mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#ff5e5b]" />
                <span className="font-mono text-xs font-bold text-[#1e1d1b] uppercase tracking-wider">
                  DIRECT SOCIAL & NETWORK CONNECT CHANNELS
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="sketch-button px-2.5 py-1 text-[10px] font-mono font-bold bg-[#f6f4ee] flex items-center gap-1.5 hover:bg-[#ffe866] transition-colors"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#ff5e5b]" />}
                <span>{copiedEmail ? "EMAIL COPIED!" : "COPY EMAIL"}</span>
              </button>
            </div>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group sketch-card p-3 bg-[#f6f4ee] border border-[#1e1d1b] flex items-center justify-between hover:bg-white hover:border-[#ff5e5b] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded sketch-border-sm ${item.color} shrink-0 transition-transform group-hover:scale-105`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#1e1d1b]">
                            {item.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-[#ff5e5b] uppercase">
                            {item.badge}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#57534e] truncate block">
                          {item.handle}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#57534e] group-hover:text-[#ff5e5b] shrink-0 transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>
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
