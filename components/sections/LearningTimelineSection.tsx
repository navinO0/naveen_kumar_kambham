"use client";

import { LearningTopic } from "@/lib/db/schema";
import { CheckCircle2, Clock, Hammer, Search } from "lucide-react";

interface LearningTimelineProps {
  topics: LearningTopic[];
}

export default function LearningTimelineSection({ topics }: LearningTimelineProps) {
  const getStatusBadge = (status: LearningTopic["status"]) => {
    switch (status) {
      case "mastered":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-green-100 text-green-800 border-green-800">
            <CheckCircle2 className="w-3 h-3 text-green-700" /> MASTERED
          </span>
        );
      case "building":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-900 border-yellow-800">
            <Hammer className="w-3 h-3 text-yellow-700" /> BUILDING
          </span>
        );
      case "exploring":
        return (
          <span className="sticker-tag flex items-center gap-1 text-[10px] bg-blue-100 text-blue-900 border-blue-800">
            <Search className="w-3 h-3 text-blue-700" /> EXPLORING
          </span>
        );
    }
  };

  return (
    <section id="learning" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">CONTINUOUS GROWTH</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            things I'm currently learning <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(learning timeline)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* query results loaded live from SQLite database */
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-dashed border-[#1e1d1b] pl-6 md:pl-8 space-y-6 ml-2 md:ml-4">
        {topics.map((topic, idx) => (
          <div key={topic.id} className="relative">
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 bg-[#ffe866] border-2 border-[#1e1d1b] rounded-full sketch-border-sm" />

            {/* Timeline Content Card */}
            <div className="sketch-card p-5 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-dashed border-[#e8e4d9]">
                <h3 className="font-bold font-mono text-base text-[#1e1d1b]">
                  {topic.orderIndex}. {topic.topic}
                </h3>
                {getStatusBadge(topic.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                {/* What I Understand */}
                <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                  <span className="font-bold font-mono text-xs text-[#2ecc71] block mb-1">
                    ✅ WHAT I UNDERSTAND:
                  </span>
                  <p className="text-[#1e1d1b] leading-relaxed">{topic.whatIUnderstand}</p>
                </div>

                {/* What I Still Need to Explore */}
                <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                  <span className="font-bold font-mono text-xs text-[#ff5e5b] block mb-1">
                    🔍 WHAT I STILL NEED TO EXPLORE:
                  </span>
                  <p className="text-[#1e1d1b] leading-relaxed">{topic.whatIStillNeedToExplore}</p>
                </div>
              </div>

              {/* Personal Notes */}
              <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                <span className="font-hand text-xs text-[#ff5e5b] font-bold">
                  "{topic.notes}"
                </span>
                <span className="font-mono text-[10px] text-[#57534e]">TOPIC #{idx + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
