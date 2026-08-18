"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Code2, Database, ShieldAlert, Zap } from "lucide-react";

const principles = [
  {
    title: "1. Build the API first",
    detail: "Decouple backend contract design from UI implementation. A clean API doesn't care if the caller is React, a mobile app, or a curl command.",
    annotation: "// contract > UI",
    highlightColor: "marker-highlight-yellow",
  },
  {
    title: "2. Understand data before writing queries",
    detail: "Draw the ERD diagram and query execution plan before writing complex joins. Indexes exist because databases also get tired.",
    annotation: "// EXPLAIN ANALYZE always",
    highlightColor: "marker-highlight-green",
  },
  {
    title: "3. Validate input at the boundary",
    detail: "Never trust frontend validation. The client is an untrusted remote CLI. Validate schemas with strict Zod parsing at the API gateway.",
    annotation: "// input = suspect until proven valid",
    highlightColor: "marker-highlight-red",
  },
  {
    title: "4. Assume users will send weird requests",
    detail: "If your endpoint accepts a string, someone will send a 40MB PDF or a SQL payload. Handle edge cases defensively with explicit limits.",
    annotation: "// expect the unexpected",
    highlightColor: "marker-highlight-yellow",
  },
  {
    title: "5. Authentication is not authorization",
    detail: "Knowing WHO someone is (Authentication ✅) does not mean they get to touch or delete the requested resource (Authorization ❌).",
    annotation: "// roles are not vibes",
    highlightColor: "marker-highlight-red",
  },
  {
    title: "6. Logs are part of the product",
    detail: "Logging 'Error: request failed' is useless. Log structured context: correlation ID, user ID, payload digest, latency, and stack trace.",
    annotation: "// debug-ready logs",
    highlightColor: "marker-highlight-green",
  },
  {
    title: "7. Performance must be measured, not guessed",
    detail: "Don't guess where the latency bottleneck is. Run JMeter stress suites, inspect p99 distributions, and profile socket queues.",
    annotation: "// p99 > average latency",
    highlightColor: "marker-highlight-yellow",
  },
  {
    title: "8. Security is an architectural constraint",
    detail: "Security is not a checkbox you review before launch. Rate limits, CORS, TLS, least privilege, and parameter sanitization belong in core architecture.",
    annotation: "// zero trust by default",
    highlightColor: "marker-highlight-red",
  },
  {
    title: "9. Production is the final exam",
    detail: "Your system works on your machine? Great. Production is where real concurrency, network drops, and unexpected edge cases evaluate your code.",
    annotation: "// local host = optimism",
    highlightColor: "marker-highlight-green",
  },
];

export default function HowIThinkSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-dashed border-[#1e1d1b]">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative shrink-0 border-2 border-[#1e1d1b] rounded bg-white p-1 sketch-border-sm">
            <Image src="/developer_avatar_thinking.png" alt="Architect Vector Avatar" fill sizes="64px" className="object-contain" />
          </div>
          <div>
            <span className="sticker-tag mb-1">ENGINEERING MENTAL MODEL</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
              how I think <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(principles from the trenches)</span>
            </h2>
          </div>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* 9 rules I live by when building backends */
        </p>
      </div>

      {/* Grid of Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {principles.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="sketch-card p-5 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold font-mono text-sm md:text-base text-[#1e1d1b]">
                  {item.title}
                </h3>
                <span className="font-hand text-xs text-[#ff5e5b] font-bold">
                  {item.annotation}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#57534e] leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
            
            <div className="mt-4 pt-2 border-t border-dashed border-[#e8e4d9] flex justify-between items-center text-[10px] font-mono text-[#57534e]">
              <span>RULE #{idx + 1}</span>
              <span className="text-[#2ecc71]">ENFORCED ✅</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
