"use client";

import { useEffect, useState } from "react";
import { Rocket, Compass, Building2, Workflow, Gamepad2, Cpu, Mail, Brain } from "lucide-react";

const CHAPTERS = [
  { id: "about", label: "01. Launchpad & Philosophy", short: "01. Launchpad", icon: Rocket, color: "bg-[#ffe866]" },
  { id: "experience", label: "02. Career & Systems Journey", short: "02. Journey", icon: Building2, color: "bg-[#ff5e5b] text-white" },
  { id: "ai-lab", label: "03. Hobby AI Systems Lab", short: "03. AI Lab", icon: Brain, color: "bg-[#6366f1] text-white" },
  // Original: { id: "playgrounds", label: "04. Gravity Arcade & Playgrounds", short: "04. Gravity Arcade", icon: Gamepad2, color: "bg-[#10b981] text-white" },
  { id: "playgrounds", label: "04. Production Simulators", short: "04. Simulators", icon: Gamepad2, color: "bg-[#10b981] text-white" },
  { id: "contact", label: "06. Dispatch & Connect", short: "06. Dispatch", icon: Mail, color: "bg-[#1e1d1b] text-white" },
];

export default function JourneyNav() {
  const [activeChapter, setActiveChapter] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[57px] z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-2 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        {/* Left title badge */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 font-mono text-xs font-bold text-slate-800">
          <Compass className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="uppercase tracking-wider">ENGINEERING JOURNEY:</span>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 w-full lg:w-auto py-0.5">
          {CHAPTERS.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToSection(ch.id)}
                className={`group px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{ch.label}</span>
                <span className="sm:hidden">{ch.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
