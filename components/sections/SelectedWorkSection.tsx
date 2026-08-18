"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/db/schema";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Code2, ExternalLink, Wrench, Code } from "lucide-react";

interface SelectedWorkProps {
  projects: Project[];
}

export default function SelectedWorkSection({ projects }: SelectedWorkProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(projects[0]?.id || null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section id="work" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">PROD SYSTEMS & APIS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            selected work <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(backend-focused case studies)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* click any project to view technical post-mortem */
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {projects.map((proj) => {
          const isSelected = proj.id === activeProjectId;
          return (
            <div
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              className={`sketch-card p-6 cursor-pointer relative transition-all ${
                isSelected ? "border-[#ff5e5b] bg-[#fffdfa] ring-2 ring-[#ff5e5b]/30" : ""
              }`}
            >
              {/* Top Row: Title & Year */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-lg font-mono text-[#1e1d1b]">
                      {proj.name}
                    </h3>
                    <span className="sticker-tag text-[10px] font-mono">{proj.year}</span>
                  </div>
                  <p className="text-xs font-sans text-[#57534e] mt-1 font-medium">
                    {proj.oneLine}
                  </p>
                </div>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {proj.stack.map((st) => (
                  <span
                    key={st}
                    className="px-2 py-0.5 text-[10px] font-mono bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm"
                  >
                    {st}
                  </span>
                ))}
              </div>

              {/* Highlighted Engineering Problem */}
              <div className="p-3 bg-[#ffe866]/20 border border-[#1e1d1b] sketch-border-sm my-3 text-xs">
                <span className="font-bold font-mono text-[#1e1d1b] block mb-1">
                  ⚡ Engineering Problem:
                </span>
                <p className="text-[#57534e] text-xs leading-normal">
                  {proj.interestingProblem}
                </p>
              </div>

              {/* View Case Study Toggle Button */}
              <div className="mt-4 pt-2 border-t border-dashed border-[#e8e4d9] flex items-center justify-between">
                <span className="font-hand text-xs font-bold text-[#ff5e5b]">
                  {isSelected ? "// active case study below" : "// click to inspect post-mortem"}
                </span>
                <button
                  className={`sketch-button text-xs px-3 py-1 flex items-center gap-1 font-mono font-bold ${
                    isSelected ? "bg-[#ff5e5b] text-white" : ""
                  }`}
                >
                  <span>{isSelected ? "inspecting" : "view case study"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Technical Case Study Post-Mortem Panel */}
      {activeProject && (
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
            <div>
              <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">
                POST-MORTEM CASE STUDY
              </span>
              <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
                {activeProject.name}
              </h3>
            </div>
            <div className="flex items-center space-x-3 mt-3 md:mt-0 font-mono text-xs">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sketch-button px-3 py-1.5 bg-white flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" /> Repository
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sketch-button px-3 py-1.5 bg-[#ffe866] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live API
                </a>
              )}
            </div>
          </div>

          {/* 4 Key Post-Mortem Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. What Broke */}
            <div className="p-4 bg-[#fee2e2]/40 border-1.5 border-[#991b1b] sketch-border-sm">
              <div className="flex items-center space-x-2 text-[#991b1b] font-bold font-mono text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>WHAT BROKE</span>
              </div>
              <p className="text-xs md:text-sm text-[#1e1d1b] leading-relaxed font-sans font-medium">
                {activeProject.whatBroke}
              </p>
            </div>

            {/* 2. What I Changed */}
            <div className="p-4 bg-[#dcfce7]/50 border-1.5 border-[#166534] sketch-border-sm">
              <div className="flex items-center space-x-2 text-[#166534] font-bold font-mono text-sm mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>WHAT I CHANGED</span>
              </div>
              <p className="text-xs md:text-sm text-[#1e1d1b] leading-relaxed font-sans font-medium">
                {activeProject.whatIChanged}
              </p>
            </div>

            {/* 3. Why I Chose It */}
            <div className="p-4 bg-[#e0f2fe]/50 border-1.5 border-[#075985] sketch-border-sm">
              <div className="flex items-center space-x-2 text-[#075985] font-bold font-mono text-sm mb-2">
                <Wrench className="w-4 h-4" />
                <span>WHY I CHOSE IT</span>
              </div>
              <p className="text-xs md:text-sm text-[#1e1d1b] leading-relaxed font-sans font-medium">
                {activeProject.whyIChoseIt}
              </p>
            </div>

            {/* 4. What I Learned */}
            <div className="p-4 bg-[#fef9c3]/50 border-1.5 border-[#854d0e] sketch-border-sm">
              <div className="flex items-center space-x-2 text-[#854d0e] font-bold font-mono text-sm mb-2">
                <Code2 className="w-4 h-4" />
                <span>WHAT I LEARNED</span>
              </div>
              <p className="text-xs md:text-sm text-[#1e1d1b] leading-relaxed font-sans font-medium font-bold">
                "{activeProject.whatILearned}"
              </p>
            </div>
          </div>

          {/* Backend Responsibilities List */}
          <div className="mt-6 pt-4 border-t border-dashed border-[#1e1d1b]">
            <span className="font-mono text-xs font-bold uppercase text-[#57534e] block mb-2">
              CORE BACKEND RESPONSIBILITIES IN THIS PROJECT:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeProject.backendResponsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs font-mono text-[#1e1d1b]">
                  <span className="text-[#ff5e5b] font-bold">›</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </section>
  );
}
