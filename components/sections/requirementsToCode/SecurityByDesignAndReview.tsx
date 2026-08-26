"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, ShieldCheck, Terminal, HelpCircle } from "lucide-react";

export default function SecurityByDesignAndReview() {
  return (
    <div className="space-y-8 my-8">
      {/* 1. Security by Design & Threat Modeling */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">DEFENSIVE SECURITY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Security by Design & Threat Modeling
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // security is an architectural constraint, not a patch
          </span>
        </div>

        {/* Security Transformation Flow */}
        <div className="p-4 bg-[#fee2e2]/40 border border-[#991b1b] sketch-border-sm mb-6">
          <span className="font-mono text-xs font-bold text-[#991b1b] block mb-2">
            EXAMPLE REQUIREMENT: "Only account owners can edit their profile."
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-[#1e1d1b]">
            <span className="p-2 bg-white border border-[#991b1b]">Requirement</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#991b1b]" />
            <span className="p-2 bg-white border border-[#991b1b]">Authorization Rule</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#991b1b]" />
            <span className="p-2 bg-white border border-[#991b1b] font-bold">RBAC Ownership Check</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#991b1b]" />
            <span className="p-2 bg-white border border-[#991b1b]">Service Validation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#991b1b]" />
            <span className="p-2 bg-white border border-[#991b1b] bg-[#ffe866]">Security Test</span>
          </div>
        </div>

        {/* Threat Modeling Framework */}
        <div className="p-4 gradient-card font-mono text-xs">
          <span className="font-bold text-[#ff5e5b] block mb-3 text-[10px] uppercase tracking-wider">THREAT MODELING PIPELINE</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            {[
              { label: "1. ASSET", cls: "stripe-card-blue" },
              { label: "2. THREAT", cls: "stripe-card" },
              { label: "3. RISK", cls: "stripe-card-amber" },
              { label: "4. CONTROL", cls: "stripe-card-green" },
              { label: "5. TEST", cls: "stripe-card-purple" },
            ].map((s) => (
              <div key={s.label} className={`stripe-card ${s.cls} p-2 text-center font-bold`}>{s.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Code Review ("What I look for in a PR") */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">PULL REQUEST AUDIT</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              What I Look For in a PR
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Experienced backend questions asked during code review before approving merge requests.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // reviewing for edge cases & failure modes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {[
            "What happens when this request runs twice?",
            "Can another user access this resource?",
            "What happens when the database is down?",
            "Why does this query need to run inside a loop?",
            "What happens under 10,000 records?",
            "Are sensitive fields masked in logs?",
            "Is the transaction boundary tight enough?",
            "Is there an index supporting this WHERE query?",
            "Will this payload pass schema validation?",
          ].map((q, idx) => {
            const stripes = ["stripe-card", "stripe-card-blue", "stripe-card-green", "stripe-card-amber", "stripe-card-purple", "stripe-card", "stripe-card-blue", "stripe-card-green", "stripe-card-amber"];
            const pills = ["index-pill", "index-pill-blue", "index-pill-green", "index-pill-yellow", "index-pill-dark", "index-pill", "index-pill-blue", "index-pill-green", "index-pill-yellow"];
            return (
              <div key={idx} className={`stripe-card ${stripes[idx]} p-3 flex items-start gap-2.5`}>
                <span className={`index-pill ${pills[idx]} shrink-0 mt-0.5`}>{idx + 1}</span>
                <span className="font-bold text-[#1e1d1b] text-[11px] leading-relaxed">"{q}"</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Engineering Trade-offs Matrix */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">DECISION MATRIX</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              There Is No Perfect Architecture
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // engineering means choosing trade-offs, not collecting tech
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="stripe-card p-4">
            <span className="font-bold text-[#ff5e5b] block mb-2">SQLITE (WAL)</span>
            <span className="text-green-700 block text-xs font-sans">+ Zero config, sub-ms local reads</span>
            <span className="text-red-600 block text-xs font-sans">- Limited multi-node concurrent writes</span>
          </div>

          <div className="stripe-card stripe-card-blue p-4">
            <span className="font-bold text-[#3498db] block mb-2">POSTGRESQL</span>
            <span className="text-green-700 block text-xs font-sans">+ ACID transactions, JSONB, concurrency</span>
            <span className="text-red-600 block text-xs font-sans">- Requires connection pool infra</span>
          </div>

          <div className="stripe-card stripe-card-green p-4">
            <span className="font-bold text-[#2ecc71] block mb-2">REDIS CACHING</span>
            <span className="text-green-700 block text-xs font-sans">+ In-memory speed, sub-ms responses</span>
            <span className="text-red-600 block text-xs font-sans">- Cache invalidation complexity</span>
          </div>
        </div>
      </div>

      {/* 4. Final Statement Banner */}
      <div className="sketch-card p-8 bg-[#1e1d1b] text-white text-center relative overflow-hidden">
        <span className="sticker-tag-red text-xs uppercase font-bold mb-3 inline-block">
          THE ENGINEERING SUMMARY
        </span>
        <h3 className="text-2xl md:text-3xl font-black font-mono text-[#ffe866] mb-3">
          "Before I write code, I ask better questions."
        </h3>

        <div className="max-w-2xl mx-auto my-4 p-4 bg-[#292524] rounded border border-[#57534e]">
          <p className="font-hand text-xl md:text-2xl text-[#ff5e5b] font-bold">
            “Good code starts before the first line of code.”
          </p>
          <p className="font-hand text-sm text-gray-300 mt-2 font-normal">
            "The hardest part isn't writing the endpoint. It's deciding what the endpoint is actually allowed to do."
          </p>
        </div>
      </div>
    </div>
  );
}
