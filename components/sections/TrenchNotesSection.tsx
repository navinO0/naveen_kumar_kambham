"use client";

import { TrenchNote } from "@/lib/db/schema";
import { MessageSquare, Quote } from "lucide-react";

interface TrenchNotesProps {
  notes: TrenchNote[];
}

export default function TrenchNotesSection({ notes }: TrenchNotesProps) {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">RAW OBSERVATIONS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            notes from the backend trenches <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(sticky note wall)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* developer observations collected over years of outages */
        </p>
      </div>

      {/* Grid of Sticky Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((n, idx) => {
          const tilts = ["transform -rotate-1", "transform rotate-1", "transform -rotate-2", "transform rotate-2", "transform rotate-0"];
          const tilt = tilts[idx % tilts.length];

          return (
            <div
              key={n.id}
              className={`sketch-card p-5 bg-[#ffe866]/30 border-2 border-[#1e1d1b] flex flex-col justify-between ${tilt} hover:rotate-0 transition-transform`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-5 h-5 text-[#ff5e5b]" />
                  <span className="sticker-tag text-[9px] uppercase">{n.category}</span>
                </div>
                <h3 className="font-hand text-lg md:text-xl font-bold text-[#1e1d1b] leading-tight mb-3">
                  "{n.quote}"
                </h3>
                <p className="text-xs text-[#57534e] font-sans leading-relaxed">
                  {n.context}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-dashed border-[#1e1d1b]/30 flex justify-between items-center text-[10px] font-mono text-[#57534e]">
                <span>TRENCH NOTE #{idx + 1}</span>
                <span className="text-[#ff5e5b]">VERIFIED IN PROD</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
