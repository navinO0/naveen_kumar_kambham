"use client";

import { useState } from "react";
import { TrenchNote } from "@/lib/db/schema";
import { Quote, Shield, Database, Cpu, Activity, Bug, Pin } from "lucide-react";

interface TrenchNotesProps {
  notes: TrenchNote[];
}

export default function TrenchNotesSection({ notes }: TrenchNotesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Trench Rules" },
    { id: "security", label: "Security & Validation" },
    { id: "database", label: "Databases & Connections" },
    { id: "architecture", label: "System Architecture" },
    { id: "performance", label: "Performance & Caching" },
    { id: "debugging", label: "Debugging & Outages" }
  ];

  const filteredNotes = notes.filter(
    (n) => activeCategory === "all" || n.category === activeCategory
  );

  const getCategoryIcon = (cat: TrenchNote["category"]) => {
    switch (cat) {
      case "security":
        return <Shield className="w-4 h-4 text-rose-600" />;
      case "database":
        return <Database className="w-4 h-4 text-amber-600" />;
      case "architecture":
        return <Cpu className="w-4 h-4 text-purple-600" />;
      case "performance":
        return <Activity className="w-4 h-4 text-emerald-600" />;
      case "debugging":
        return <Bug className="w-4 h-4 text-blue-600" />;
      default:
        return <Quote className="w-4 h-4 text-[#ff5e5b]" />;
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2 bg-[#ff5e5b] text-white">RAW BATTLE OBSERVATIONS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            notes from the backend trenches <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(developer sticky wall)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* developer observations collected over years of production outages */
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const count =
            cat.id === "all"
              ? notes.length
              : notes.filter((n) => n.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono sketch-button flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-[#1e1d1b] text-white"
                  : "bg-white text-[#1e1d1b]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  activeCategory === cat.id
                    ? "bg-[#ff5e5b] text-white"
                    : "bg-[#f6f4ee] text-[#57534e]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Interactive Sticky Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((n, idx) => {
          const tilts = [
            "transform -rotate-1",
            "transform rotate-1",
            "transform -rotate-2",
            "transform rotate-2",
            "transform rotate-0"
          ];
          const tilt = tilts[idx % tilts.length];

          return (
            <div
              key={n.id}
              className={`sketch-card p-6 bg-[#ffe866]/30 border-2 border-[#1e1d1b] flex flex-col justify-between ${tilt} hover:rotate-0 hover:scale-[1.02] transition-all relative overflow-hidden group`}
            >
              {/* Paper Tape Strip Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#f6f4ee]/80 border border-[#1e1d1b]/40 rotate-1 flex items-center justify-center">
                <Pin className="w-3 h-3 text-[#ff5e5b] rotate-45" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 pt-2">
                  <div className="flex items-center gap-1.5 p-1 bg-white border border-[#1e1d1b] sketch-border-sm">
                    {getCategoryIcon(n.category)}
                    <span className="font-mono text-[10px] font-bold text-[#1e1d1b] uppercase">
                      {n.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#ff5e5b] border border-[#ff5e5b] px-1.5 py-0.5 bg-white">
                    RULE #{idx + 1}
                  </span>
                </div>

                {/* Quote */}
                <h3 className="font-hand text-xl md:text-2xl font-bold text-[#1e1d1b] leading-snug mb-3 group-hover:text-[#ff5e5b] transition-colors">
                  "{n.quote}"
                </h3>

                {/* Context */}
                <p className="text-xs text-[#1e1d1b] font-sans leading-relaxed font-medium bg-white/80 p-3 border border-[#1e1d1b] sketch-border-sm">
                  {n.context}
                </p>
              </div>

              {/* Verified Stamp Footer */}
              <div className="mt-5 pt-3 border-t-2 border-dashed border-[#1e1d1b]/40 flex justify-between items-center text-[10px] font-mono text-[#57534e]">
                <span className="font-bold text-[#1e1d1b]">VERIFIED IN PRODUCTION</span>
                <span className="font-hand text-xs text-[#ff5e5b] font-bold">✓ Production Tested</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
