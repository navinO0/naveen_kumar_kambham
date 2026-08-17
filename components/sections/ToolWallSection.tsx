"use client";

import { useState } from "react";
import { Tool } from "@/lib/db/schema";
import JMeterSimulator from "./JMeterSimulator";
import { Terminal, Shield, Cpu, Database, RefreshCw, Box, AlertCircle } from "lucide-react";

interface ToolWallProps {
  tools: Tool[];
}

export default function ToolWallSection({ tools }: ToolWallProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Backend Tools" },
    { id: "api_testing", label: "API Testing" },
    { id: "security", label: "Security & Burp" },
    { id: "load_testing", label: "Load Testing" },
    { id: "database", label: "Databases & SQL" },
    { id: "caching", label: "Caching & Redis" },
    { id: "infrastructure", label: "Docker & Infra" },
  ];

  const filteredTools =
    selectedCategory === "all"
      ? tools
      : tools.filter((t) => t.category === selectedCategory);

  return (
    <section id="toolbox" className="py-12 md:py-16 px-4 max-w-6xl mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">TOOLING PHILOSOPHY</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            things I learned the hard way <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(the backend tool wall)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* tools aren't badges; they are solutions to past disasters */
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-mono sketch-button ${
              selectedCategory === cat.id ? "bg-[#ff5e5b] text-white" : "bg-white text-[#1e1d1b]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="sketch-card p-5 flex flex-col justify-between relative bg-white">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold font-mono text-lg text-[#1e1d1b] flex items-center gap-2">
                  <span className="text-[#ff5e5b]">#</span> {tool.name}
                </h3>
                <span className="sticker-tag text-[10px] uppercase">{tool.category}</span>
              </div>

              {/* Human explanation */}
              <p className="text-xs md:text-sm font-sans font-semibold text-[#1e1d1b] mb-3 bg-[#f6f4ee] p-2.5 border border-[#1e1d1b] sketch-border-sm">
                "{tool.humanExplanation}"
              </p>

              {/* Technical breakdown list */}
              <div className="space-y-1.5 my-3">
                {tool.explanation.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5 text-xs font-mono text-[#57534e]">
                    <span className="text-[#ff5e5b] font-bold">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sarcastic annotation footer */}
            <div className="mt-4 pt-3 border-t border-dashed border-[#e8e4d9]">
              <span className="font-hand text-xs text-[#ff5e5b] font-bold block">
                💬 {tool.sarcasticJoke}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Interactive JMeter Simulator */}
      <JMeterSimulator />
    </section>
  );
}
