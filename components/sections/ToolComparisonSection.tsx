"use client";

import { useState } from "react";
import { Tool } from "@/lib/db/schema";
import { 
  Search, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  LayoutGrid, 
  Table as TableIcon,
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  Layers,
  HelpCircle,
  Flame
} from "lucide-react";

interface ToolComparisonProps {
  tools: Tool[];
}

export default function ToolComparisonSection({ tools }: ToolComparisonProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const categories = [
    { id: "all", label: "All 30 Tools" },
    { id: "framework", label: "Frameworks" },
    { id: "languages", label: "Languages" },
    { id: "database", label: "Databases" },
    { id: "caching", label: "Caching & Queues" },
    { id: "infrastructure", label: "Docker & Cloud" },
    { id: "security", label: "Security & Auth" },
    { id: "ai_frontier", label: "AI Frontier" },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.whyItExists.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.problemItSolves.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "framework":
        return <span className="sticker-tag text-[9px] bg-purple-100 text-purple-900 border-purple-800 font-bold">FRAMEWORK</span>;
      case "languages":
        return <span className="sticker-tag text-[9px] bg-blue-100 text-blue-900 border-blue-800 font-bold">LANG & SPEC</span>;
      case "database":
        return <span className="sticker-tag text-[9px] bg-amber-100 text-amber-900 border-amber-800 font-bold">DATABASE</span>;
      case "caching":
        return <span className="sticker-tag text-[9px] bg-emerald-100 text-emerald-900 border-emerald-800 font-bold">CACHE / QUEUE</span>;
      case "infrastructure":
        return <span className="sticker-tag text-[9px] bg-sky-100 text-sky-900 border-sky-800 font-bold">INFRA / DEVOPS</span>;
      case "security":
        return <span className="sticker-tag text-[9px] bg-rose-100 text-rose-900 border-rose-800 font-bold">SECURITY</span>;
      case "ai_frontier":
        return <span className="sticker-tag text-[9px] bg-pink-100 text-pink-900 border-pink-800 font-bold">AI FRONTIER</span>;
      default:
        return <span className="sticker-tag text-[9px] bg-gray-100 text-gray-800 border-gray-800 font-bold">{cat.toUpperCase()}</span>;
    }
  };

  return (
    <section id="toolbox" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sticker-tag bg-[#1e1d1b] text-white">ARCHITECTURAL RATIONALE</span>
            <span className="sticker-tag bg-[#ffe866] text-[#1e1d1b]">30 TECH DECISIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1e1d1b] font-mono">
            what I use vs why I use it <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(engineering decision matrix)</span>
          </h2>
        </div>

        {/* View Mode & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white p-2 border-2 border-[#1e1d1b] sketch-card w-full sm:w-72">
            <Search className="w-4 h-4 text-[#ff5e5b] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tool or rationale..."
              className="w-full text-xs font-mono bg-transparent outline-none text-[#1e1d1b] placeholder:text-[#57534e]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-mono font-bold text-[#ff5e5b] px-1 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#f6f4ee] p-1 border-2 border-[#1e1d1b] sketch-border-sm shrink-0">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 text-xs font-mono font-bold sketch-button flex items-center gap-1.5 transition-all ${
                viewMode === "cards" ? "bg-[#1e1d1b] text-white" : "bg-white text-[#1e1d1b]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Versus Cards</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 text-xs font-mono font-bold sketch-button flex items-center gap-1.5 transition-all ${
                viewMode === "table" ? "bg-[#1e1d1b] text-white" : "bg-white text-[#1e1d1b]"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matrix Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const count =
            cat.id === "all"
              ? tools.length
              : tools.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono sketch-button flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-[#ff5e5b] text-white font-bold"
                  : "bg-white text-[#1e1d1b]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  selectedCategory === cat.id
                    ? "bg-white text-[#ff5e5b]"
                    : "bg-[#f6f4ee] text-[#57534e]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count Header */}
      <div className="mb-4 flex items-center justify-between font-mono text-xs text-[#57534e]">
        <span>
          SHOWING <strong className="text-[#1e1d1b]">{filteredTools.length}</strong> OF{" "}
          <strong className="text-[#1e1d1b]">{tools.length}</strong> ARCHITECTURAL TOOLS
        </span>
        <span className="hidden sm:inline">/* Click any card to examine production rationales */</span>
      </div>

      {/* VIEW MODE 1: VERSUS CARDS GRID */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="sketch-card bg-white border-2 border-[#1e1d1b] p-5 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Header: Tool Name & Domain Badge */}
              <div className="pb-3 border-b-2 border-dashed border-[#1e1d1b] mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#ffe866] border border-[#1e1d1b] sketch-border-sm">
                    <Wrench className="w-4 h-4 text-[#1e1d1b]" />
                  </div>
                  <h3 className="font-mono font-black text-lg md:text-xl text-[#1e1d1b]">
                    {tool.name}
                  </h3>
                </div>
                {getCategoryBadge(tool.category)}
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {/* WHAT I USE */}
                <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                  <span className="font-mono text-[10px] font-bold text-[#57534e] uppercase block mb-1">
                    🛠️ WHAT I USE (THE STACK):
                  </span>
                  <p className="font-sans text-xs text-[#1e1d1b] leading-relaxed font-semibold">
                    {tool.whyItExists}
                  </p>
                </div>

                {/* WHY I USE IT / PROBLEM SOLVED */}
                <div className="p-3 bg-[#ff5e5b]/5 border border-[#ff5e5b]/30 sketch-border-sm">
                  <span className="font-mono text-[10px] font-bold text-[#ff5e5b] uppercase block mb-1">
                    ⚡ WHY I USE IT (THE PROBLEM SOLVED):
                  </span>
                  <p className="font-hand text-xs text-[#ff5e5b] font-bold leading-relaxed">
                    "{tool.problemItSolves}"
                  </p>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="pt-2 border-t border-dashed border-[#1e1d1b]/30 flex items-center justify-between text-[10px] font-mono text-[#57534e]">
                <span>CATEGORY: {tool.category.toUpperCase()}</span>
                <span className="text-emerald-700 font-bold">✓ VERIFIED PROD TOOL</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* VIEW MODE 2: MATRIX TABLE */
        <div className="sketch-card p-4 bg-white overflow-x-auto border-2 border-[#1e1d1b]">
          <table className="w-full text-left font-mono text-xs md:text-sm border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b-2 border-[#1e1d1b] bg-[#ffe866]/40">
                <th className="p-3 font-black text-[#1e1d1b] uppercase w-[220px]">WHAT I USE (TOOL)</th>
                <th className="p-3 font-black text-[#1e1d1b] uppercase">ENGINEERING RATIONALE</th>
                <th className="p-3 font-black text-[#1e1d1b] uppercase">WHY I USE IT (PROBLEM SOLVED)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => (
                  <tr
                    key={tool.id}
                    className={`border-b border-[#e8e4d9] hover:bg-[#f6f4ee] transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#fcfbfa]"
                    }`}
                  >
                    <td className="p-3 font-bold text-[#1e1d1b] align-top">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[#ff5e5b] font-bold">#</span>
                        <span className="font-mono font-bold text-sm text-[#1e1d1b]">{tool.name}</span>
                      </div>
                      {getCategoryBadge(tool.category)}
                    </td>
                    <td className="p-3 text-[#1e1d1b] font-sans font-medium align-top leading-relaxed">
                      {tool.whyItExists}
                    </td>
                    <td className="p-3 font-hand text-sm text-[#ff5e5b] font-bold align-top leading-relaxed">
                      "{tool.problemItSolves}"
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-xs font-mono text-[#57534e]">
                    No matching tools found for "{searchQuery}". Try clearing search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
