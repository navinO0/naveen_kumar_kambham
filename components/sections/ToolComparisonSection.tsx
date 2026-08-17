"use client";

import { Tool } from "@/lib/db/schema";
import { Check, HelpCircle, Wrench } from "lucide-react";

interface ToolComparisonProps {
  tools: Tool[];
}

export default function ToolComparisonSection({ tools }: ToolComparisonProps) {
  return (
    <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">DECISION MATRIX</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            what I use vs why I use it <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(tool matrix)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* tools matched directly to the problem they solve */
        </p>
      </div>

      {/* Comparison Table */}
      <div className="sketch-card p-4 bg-white overflow-x-auto">
        <table className="w-full text-left font-mono text-xs md:text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-[#1e1d1b] bg-[#ffe866]/40">
              <th className="p-3 font-black text-[#1e1d1b] uppercase">TOOL</th>
              <th className="p-3 font-black text-[#1e1d1b] uppercase">WHY IT EXISTS</th>
              <th className="p-3 font-black text-[#1e1d1b] uppercase">WHAT PROBLEM IT SOLVES</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, idx) => (
              <tr
                key={tool.id}
                className={`border-b border-[#e8e4d9] hover:bg-[#f6f4ee] transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#fcfbfa]"
                }`}
              >
                <td className="p-3 font-bold text-[#1e1d1b] whitespace-nowrap">
                  <span className="text-[#ff5e5b] mr-1 font-bold">#</span> `{tool.name}`
                </td>
                <td className="p-3 text-[#57534e] font-sans font-medium">
                  {tool.whyItExists}
                </td>
                <td className="p-3 font-hand text-sm text-[#ff5e5b] font-bold">
                  "{tool.problemItSolves}"
                </td>
              </tr>
            ))}
            {/* Added SQLite row */}
            <tr className="border-b border-[#e8e4d9] hover:bg-[#f6f4ee] transition-colors bg-white">
              <td className="p-3 font-bold text-[#1e1d1b] whitespace-nowrap">
                <span className="text-[#ff5e5b] mr-1 font-bold">#</span> `SQLite (WAL)`
              </td>
              <td className="p-3 text-[#57534e] font-sans font-medium">
                Simple zero-config embedded data storage
              </td>
              <td className="p-3 font-hand text-sm text-[#ff5e5b] font-bold">
                "Do we really need a database cluster for 40 rows?"
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
