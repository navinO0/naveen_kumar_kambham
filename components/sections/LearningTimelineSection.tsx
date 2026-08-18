"use client";

import { useState } from "react";
import { LearningTopic } from "@/lib/db/schema";
import { CheckCircle2, Clock, Hammer, Search, Award, TrendingUp } from "lucide-react";

interface LearningTimelineProps {
  topics: LearningTopic[];
}

export default function LearningTimelineSection({ topics }: LearningTimelineProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTopics = topics.filter(
    (t) => filterStatus === "all" || t.status === filterStatus
  );

  const masteredCount = topics.filter((t) => t.status === "mastered").length;
  const buildingCount = topics.filter((t) => t.status === "building").length;
  const exploringCount = topics.filter((t) => t.status === "exploring").length;
  const totalCount = topics.length;

  const masteryPercentage = Math.round((masteredCount / totalCount) * 100);

  const getStatusBadge = (status: LearningTopic["status"]) => {
    switch (status) {
      case "mastered":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-900 border-emerald-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> MASTERED
          </span>
        );
      case "building":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-amber-100 text-amber-900 border-amber-800 font-bold">
            <Hammer className="w-3.5 h-3.5 text-amber-700" /> LABBING / BUILDING
          </span>
        );
      case "exploring":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-sky-100 text-sky-900 border-sky-800 font-bold">
            <Search className="w-3.5 h-3.5 text-sky-700" /> EXPLORING
          </span>
        );
    }
  };

  return (
    <section id="learning" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Section Header & Mastery Radar Gauge */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <span className="sticker-tag mb-2 bg-[#ffe866] text-[#1e1d1b]">CONTINUOUS TECHNICAL GROWTH</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            things I'm currently learning <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(learning roadmap)</span>
          </h2>
        </div>

        {/* Growth Radar Bar */}
        <div className="sketch-card p-4 bg-white border-2 border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center gap-4 min-w-[320px]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#ff5e5b]" />
            <div>
              <span className="font-mono text-[10px] font-bold text-[#57534e] block uppercase">
                MASTERY INDEX
              </span>
              <span className="font-mono text-xl font-black text-[#1e1d1b]">
                {masteryPercentage}% Complete
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <div className="h-3 w-full bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm overflow-hidden flex">
              <div
                style={{ width: `${(masteredCount / totalCount) * 100}%` }}
                className="bg-emerald-500 h-full border-r border-[#1e1d1b]"
                title={`Mastered: ${masteredCount}`}
              />
              <div
                style={{ width: `${(buildingCount / totalCount) * 100}%` }}
                className="bg-amber-400 h-full border-r border-[#1e1d1b]"
                title={`Building: ${buildingCount}`}
              />
              <div
                style={{ width: `${(exploringCount / totalCount) * 100}%` }}
                className="bg-sky-400 h-full"
                title={`Exploring: ${exploringCount}`}
              />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-[#57534e]">
              <span>{masteredCount} Mastered</span>
              <span>{buildingCount} Building</span>
              <span>{exploringCount} Exploring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 text-xs font-mono sketch-button ${
            filterStatus === "all" ? "bg-[#ff5e5b] text-white" : "bg-white text-[#1e1d1b]"
          }`}
        >
          All Topics ({topics.length})
        </button>
        <button
          onClick={() => setFilterStatus("mastered")}
          className={`px-3 py-1.5 text-xs font-mono sketch-button ${
            filterStatus === "mastered" ? "bg-emerald-600 text-white" : "bg-white text-[#1e1d1b]"
          }`}
        >
          Mastered ({masteredCount})
        </button>
        <button
          onClick={() => setFilterStatus("building")}
          className={`px-3 py-1.5 text-xs font-mono sketch-button ${
            filterStatus === "building" ? "bg-amber-500 text-white" : "bg-white text-[#1e1d1b]"
          }`}
        >
          Labbing / Building ({buildingCount})
        </button>
        <button
          onClick={() => setFilterStatus("exploring")}
          className={`px-3 py-1.5 text-xs font-mono sketch-button ${
            filterStatus === "exploring" ? "bg-sky-500 text-white" : "bg-white text-[#1e1d1b]"
          }`}
        >
          Exploring ({exploringCount})
        </button>
      </div>

      {/* Vertical Interactive Roadmap */}
      <div className="relative border-l-2 border-dashed border-[#1e1d1b] pl-6 md:pl-8 space-y-8 ml-2 md:ml-4">
        {filteredTopics.map((topic, idx) => (
          <div key={topic.id} className="relative">
            {/* Animated Node Badge */}
            <div className="absolute -left-[37px] md:-left-[45px] top-1.5 w-6 h-6 bg-[#ffe866] border-2 border-[#1e1d1b] rounded-full sketch-border-sm flex items-center justify-center font-mono text-[10px] font-bold text-[#1e1d1b]">
              {topic.orderIndex}
            </div>

            {/* Notebook Card */}
            <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-dashed border-[#1e1d1b]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#ff5e5b] bg-[#ff5e5b]/10 px-2 py-0.5 border border-[#ff5e5b]/30">
                    TOPIC #{topic.orderIndex}
                  </span>
                  <h3 className="font-bold font-mono text-lg md:text-xl text-[#1e1d1b]">
                    {topic.topic}
                  </h3>
                </div>
                {getStatusBadge(topic.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans mb-4">
                {/* What I Understand */}
                <div className="p-4 bg-[#e8f5e9]/50 border-2 border-emerald-800 sketch-border-sm">
                  <span className="font-bold font-mono text-xs text-emerald-800 flex items-center gap-1 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> WHAT I UNDERSTAND:
                  </span>
                  <p className="text-[#1e1d1b] leading-relaxed font-medium">
                    {topic.whatIUnderstand}
                  </p>
                </div>

                {/* What I Still Need to Explore */}
                <div className="p-4 bg-[#fff3e0]/50 border-2 border-amber-800 sketch-border-sm">
                  <span className="font-bold font-mono text-xs text-amber-900 flex items-center gap-1 mb-2">
                    <Search className="w-3.5 h-3.5 text-amber-800" /> WHAT I STILL NEED TO EXPLORE:
                  </span>
                  <p className="text-[#1e1d1b] leading-relaxed font-medium">
                    {topic.whatIStillNeedToExplore}
                  </p>
                </div>
              </div>

              {/* Personal Engineering Note */}
              <div className="pt-3 border-t border-dashed border-[#1e1d1b]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#57534e]">ENGINEER NOTE:</span>
                  <span className="font-hand text-sm text-[#ff5e5b] font-bold">
                    "{topic.notes}"
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#57534e]">
                  STATUS: {topic.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
