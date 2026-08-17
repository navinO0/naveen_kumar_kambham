"use client";

import { CheckCircle2, ShieldCheck, Zap, AlertTriangle, FileCode2 } from "lucide-react";

export default function FunctionalVsNonFunctional() {
  return (
    <div className="space-y-8 my-8">
      {/* 1. Functional vs Non-Functional Comparison */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">REQUIREMENT TAXONOMY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Functional vs Non-Functional Requirements
            </h3>
          </div>
          <div className="font-hand text-sm text-[#ff5e5b] font-bold mt-2 md:mt-0">
            "The endpoint working is not the whole requirement."
          </div>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Functional Card */}
          <div className="p-5 sketch-card bg-[#e0f2fe]/40 border-2 border-[#075985]">
            <div className="flex items-center justify-between border-b border-[#075985] pb-2 mb-3">
              <span className="font-mono font-black text-sm text-[#075985] uppercase">
                WHAT THE SYSTEM DOES
              </span>
              <span className="sticker-tag text-[10px] bg-sky-100 text-sky-900 border-sky-800 font-mono">
                FUNCTIONAL
              </span>
            </div>

            <p className="text-xs text-[#57534e] font-sans mb-4">
              Core features, business capabilities, user inputs, and output behaviors.
            </p>

            <ul className="space-y-2 font-mono text-xs text-[#1e1d1b]">
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#075985] sketch-border-sm">
                <span className="text-[#075985] font-bold">›</span>
                <span>Create customer order and record cart items</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#075985] sketch-border-sm">
                <span className="text-[#075985] font-bold">›</span>
                <span>Update user profile & delivery addresses</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#075985] sketch-border-sm">
                <span className="text-[#075985] font-bold">›</span>
                <span>Process payment charge via credit card gateway</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#075985] sketch-border-sm">
                <span className="text-[#075985] font-bold">›</span>
                <span>Generate monthly PDF invoice reports</span>
              </li>
            </ul>
          </div>

          {/* Non-Functional Card */}
          <div className="p-5 sketch-card bg-[#fef9c3]/50 border-2 border-[#854d0e]">
            <div className="flex items-center justify-between border-b border-[#854d0e] pb-2 mb-3">
              <span className="font-mono font-black text-sm text-[#854d0e] uppercase">
                HOW WELL THE SYSTEM BEHAVES
              </span>
              <span className="sticker-tag text-[10px] bg-yellow-100 text-yellow-900 border-yellow-800 font-mono">
                NON-FUNCTIONAL
              </span>
            </div>

            <p className="text-xs text-[#57534e] font-sans mb-4">
              System qualities, performance limits, security boundaries, and operational constraints.
            </p>

            <ul className="space-y-2 font-mono text-xs text-[#1e1d1b]">
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#854d0e] sketch-border-sm">
                <span className="text-[#854d0e] font-bold">›</span>
                <span>Response Time: p99 latency &lt; 200ms</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#854d0e] sketch-border-sm">
                <span className="text-[#854d0e] font-bold">›</span>
                <span>Availability: 99.9% uptime SLA guarantees</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#854d0e] sketch-border-sm">
                <span className="text-[#854d0e] font-bold">›</span>
                <span>Security: OWASP Top 10 + RBAC bitmask enforcement</span>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-white border border-[#854d0e] sketch-border-sm">
                <span className="text-[#854d0e] font-bold">›</span>
                <span>Auditability: Immutable audit logs for state changes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Acceptance Criteria (Given-When-Then Gherkin) */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">PRECISION SPECIFICATIONS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Acceptance Criteria (Given-When-Then)
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Turning vague business requests into testable engineering behavior.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // vague requirement: "Users should be able to reset password"
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-mono text-xs">
          {/* Scenario 1 */}
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#ff5e5b] uppercase block mb-1">SCENARIO #1: HAPPY PATH</span>
              <h4 className="font-bold text-[#1e1d1b] mb-3">Valid Reset Request</h4>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div><span className="text-sky-700 font-bold">GIVEN</span> a registered user email</div>
                <div><span className="text-amber-700 font-bold">WHEN</span> a valid reset request is submitted</div>
                <div><span className="text-green-700 font-bold">THEN</span> generate hashed token with 15m TTL & dispatch email</div>
              </div>
            </div>
            <span className="mt-3 text-[10px] text-[#57534e] pt-2 border-t border-dashed border-[#1e1d1b]">→ Influences API Handler & Redis TTL</span>
          </div>

          {/* Scenario 2 */}
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#ff5e5b] uppercase block mb-1">SCENARIO #2: EXPIRED TOKEN</span>
              <h4 className="font-bold text-[#1e1d1b] mb-3">Expired Reset Attempt</h4>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div><span className="text-sky-700 font-bold">GIVEN</span> an expired or revoked reset token</div>
                <div><span className="text-amber-700 font-bold">WHEN</span> the user submits new password</div>
                <div><span className="text-red-700 font-bold">THEN</span> reject request with 400 Bad Request (`TOKEN_EXPIRED`)</div>
              </div>
            </div>
            <span className="mt-3 text-[10px] text-[#57534e] pt-2 border-t border-dashed border-[#1e1d1b]">→ Influences Zod & DB Token validation</span>
          </div>

          {/* Scenario 3 */}
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#ff5e5b] uppercase block mb-1">SCENARIO #3: BOT ATTACK</span>
              <h4 className="font-bold text-[#1e1d1b] mb-3">Rate Limit Exceeded</h4>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div><span className="text-sky-700 font-bold">GIVEN</span> repeated reset attempts within 60s</div>
                <div><span className="text-amber-700 font-bold">WHEN</span> rate limit threshold is exceeded</div>
                <div><span className="text-red-700 font-bold">THEN</span> throttle further attempts with HTTP 429 Too Many Requests</div>
              </div>
            </div>
            <span className="mt-3 text-[10px] text-[#57534e] pt-2 border-t border-dashed border-[#1e1d1b]">→ Influences Redis Rate Limiter middleware</span>
          </div>
        </div>
      </div>
    </div>
  );
}
