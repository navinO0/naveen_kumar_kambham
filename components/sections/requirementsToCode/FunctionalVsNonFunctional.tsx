"use client";

import { Zap, CheckCircle2 } from "lucide-react";

const FUNCTIONAL = [
  "Create customer order and record cart items",
  "Update user profile & delivery addresses",
  "Process payment charge via credit card gateway",
  "Generate monthly PDF invoice reports",
];

const NON_FUNCTIONAL = [
  { label: "Response Time", value: "p99 latency < 200ms" },
  { label: "Availability", value: "99.9% uptime SLA" },
  { label: "Security", value: "OWASP Top 10 + RBAC" },
  { label: "Auditability", value: "Immutable audit logs" },
];

const GWT_SCENARIOS = [
  {
    tag: "SCENARIO #1 — HAPPY PATH",
    title: "Valid Reset Request",
    accent: "from-sky-100 to-indigo-50",
    icon: "✓",
    iconBg: "bg-sky-500",
    steps: [
      { key: "G", label: "GIVEN", color: "text-sky-700 bg-sky-50", text: "a registered user email" },
      { key: "W", label: "WHEN", color: "text-amber-700 bg-amber-50", text: "a valid reset request is submitted" },
      { key: "T", label: "THEN", color: "text-emerald-700 bg-emerald-50", text: "generate hashed token with 15m TTL & dispatch email" },
    ],
    footer: "→ Influences API Handler & Redis TTL",
  },
  {
    tag: "SCENARIO #2 — EXPIRED TOKEN",
    title: "Expired Reset Attempt",
    accent: "from-rose-100 to-red-50",
    icon: "×",
    iconBg: "bg-red-500",
    steps: [
      { key: "G", label: "GIVEN", color: "text-sky-700 bg-sky-50", text: "an expired or revoked reset token" },
      { key: "W", label: "WHEN", color: "text-amber-700 bg-amber-50", text: "the user submits new password" },
      { key: "T", label: "THEN", color: "text-red-700 bg-red-50", text: 'reject with 400 Bad Request (`TOKEN_EXPIRED`)' },
    ],
    footer: "→ Influences Zod & DB Token validation",
  },
  {
    tag: "SCENARIO #3 — BOT ATTACK",
    title: "Rate Limit Exceeded",
    accent: "from-violet-100 to-purple-50",
    icon: "!",
    iconBg: "bg-violet-500",
    steps: [
      { key: "G", label: "GIVEN", color: "text-sky-700 bg-sky-50", text: "repeated reset attempts within 60s" },
      { key: "W", label: "WHEN", color: "text-amber-700 bg-amber-50", text: "rate limit threshold is exceeded" },
      { key: "T", label: "THEN", color: "text-violet-700 bg-violet-50", text: "throttle with HTTP 429 Too Many Requests" },
    ],
    footer: "→ Influences Redis Rate Limiter middleware",
  },
];

export default function FunctionalVsNonFunctional() {
  return (
    <div className="space-y-20 my-10">

      {/* ── 1. Functional vs Non-Functional ── */}
      <div>
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="sticker-tag uppercase text-xs font-bold">REQUIREMENT TAXONOMY</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black font-mono text-[#1e1d1b] mb-2">
          Functional vs Non-Functional
        </h3>
        <p className="text-sm text-[#57534e] font-sans mb-10 max-w-lg">
          "The endpoint working" is not the whole requirement. Both dimensions define the contract.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Functional column */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-8 rounded-full bg-sky-500 inline-block shrink-0" />
              <div>
                <p className="font-mono font-black text-sm text-[#1e1d1b] uppercase tracking-wide">WHAT THE SYSTEM DOES</p>
                <p className="font-mono text-[10px] text-sky-600 uppercase font-bold">FUNCTIONAL</p>
              </div>
            </div>
            <div className="space-y-2">
              {FUNCTIONAL.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 px-4 rounded-xl bg-sky-50">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span className="font-mono text-xs text-[#1e1d1b]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Functional column */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-8 rounded-full bg-amber-500 inline-block shrink-0" />
              <div>
                <p className="font-mono font-black text-sm text-[#1e1d1b] uppercase tracking-wide">HOW WELL IT BEHAVES</p>
                <p className="font-mono text-[10px] text-amber-600 uppercase font-bold">NON-FUNCTIONAL</p>
              </div>
            </div>
            <div className="space-y-2">
              {NON_FUNCTIONAL.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#1e1d1b]">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-[#ffe866] shrink-0" />
                    <span className="font-mono text-xs font-bold text-[#ffe866]">{item.label}</span>
                  </div>
                  <span className="font-sans text-xs text-gray-300 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Acceptance Criteria / GWT ── */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="sticker-tag-red uppercase text-xs font-bold">PRECISION SPECIFICATIONS</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black font-mono text-[#1e1d1b] mb-2">
          Acceptance Criteria (Given-When-Then)
        </h3>
        <p className="font-hand text-sm text-[#ff5e5b] font-bold mb-10">
          // vague requirement: "Users should be able to reset password"
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {GWT_SCENARIOS.map((scenario, si) => (
            <div key={si} className={`rounded-2xl bg-gradient-to-br ${scenario.accent} p-5 space-y-3`}>
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-full ${scenario.iconBg} text-white flex items-center justify-center text-xs font-black shrink-0`}>
                  {scenario.icon}
                </span>
                <div>
                  <p className="font-mono text-[9px] font-bold text-[#57534e] uppercase tracking-widest">{scenario.tag}</p>
                  <p className="font-mono font-bold text-sm text-[#1e1d1b]">{scenario.title}</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {scenario.steps.map((step) => (
                  <div key={step.key} className={`flex items-start gap-2.5 rounded-lg px-3 py-2 ${step.color}`}>
                    <span className="font-mono font-black text-[10px] shrink-0 pt-0.5">{step.label}</span>
                    <span className="font-sans text-[11px] leading-relaxed">{step.text}</span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] text-[#57534e] pt-1">{scenario.footer}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
