"use client";

import { useState } from "react";
import { CheckSquare, Activity, ArrowRight, ShieldCheck, Terminal, Server, Check } from "lucide-react";

export default function TestingAndObservability() {
  // Definition of Done interactive checklist state
  const [doneItems, setDoneItems] = useState<Record<string, boolean>>({
    code: true,
    validation: true,
    authz: true,
    tests: true,
    errors: true,
    logging: true,
    metrics: true,
    docs: false,
    migration: true,
    security: true,
    perf: true,
    deploy: false,
  });

  const toggleItem = (key: string) => {
    setDoneItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalDone = Object.values(doneItems).filter(Boolean).length;

  return (
    <div className="space-y-8 my-8">
      {/* 1. Testing Pyramid */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">VERIFICATION STRATEGY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              The Backend Testing Pyramid
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Multi-tiered test coverage from isolated unit functions to 5,000 user JMeter load tests.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // requirement → implementation → test → evidence
          </span>
        </div>

        {/* Visual Testing Pyramid */}
        <div className="flex flex-col items-center justify-center space-y-2 py-4 font-mono text-xs max-w-xl mx-auto">
          {/* E2E */}
          <div className="w-1/3 p-2 bg-[#fee2e2] border-1.5 border-[#1e1d1b] text-center sketch-border-sm font-bold text-[#991b1b]">
            E2E (User Journeys)
          </div>
          {/* API / Integration */}
          <div className="w-2/3 p-2.5 bg-[#e0f2fe] border-1.5 border-[#1e1d1b] text-center sketch-border-sm font-bold text-[#075985]">
            API & Integration Tests (DB / Redis / Gateways)
          </div>
          {/* Unit */}
          <div className="w-full p-3 bg-[#dcfce7] border-1.5 border-[#1e1d1b] text-center sketch-border-sm font-bold text-[#166534]">
            Unit Tests (Business Logic & Schema Validation Rules)
          </div>
        </div>
      </div>

      {/* 2. Definition of Done */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">QUALITY GATES</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              When Is a Feature Actually Finished?
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Not just "the API works on localhost".
            </p>
          </div>
          <div className="font-hand text-base text-[#ff5e5b] font-bold mt-2 md:mt-0">
            "Merged != finished."
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between font-mono text-xs font-bold mb-1">
            <span>DEFINITION OF DONE PROGRESS:</span>
            <span className="text-[#ff5e5b]">{totalDone} / 12 COMPLETED</span>
          </div>
          <div className="w-full bg-[#e8e4d9] h-3 rounded-full overflow-hidden border border-[#1e1d1b]">
            <div
              className="bg-[#ff5e5b] h-full transition-all duration-300"
              style={{ width: `${(totalDone / 12) * 100}%` }}
            />
          </div>
        </div>

        {/* Interactive DoD Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 font-mono text-xs">
          {[
            { key: "code", label: "Clean Code & Types" },
            { key: "validation", label: "Zod Input Validation" },
            { key: "authz", label: "RBAC Authorization" },
            { key: "tests", label: "Unit & Integration Tests" },
            { key: "errors", label: "Predictable Errors" },
            { key: "logging", label: "Structured Logs" },
            { key: "metrics", label: "Telemetry Metrics" },
            { key: "docs", label: "OpenAPI Spec / Docs" },
            { key: "migration", label: "Safe DB Migration" },
            { key: "security", label: "Security Review" },
            { key: "perf", label: "Load Consideration" },
            { key: "deploy", label: "CI/CD Deployment" },
          ].map((item) => {
            const isChecked = doneItems[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleItem(item.key)}
                className={`p-2.5 sketch-card cursor-pointer flex items-center space-x-2 transition-all ${
                  isChecked ? "bg-[#ffe866]/40 border-[#1e1d1b]" : "bg-[#f6f4ee] opacity-70"
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border border-[#1e1d1b] ${isChecked ? "bg-[#ff5e5b] text-white" : "bg-white"}`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="font-bold text-[11px] text-[#1e1d1b]">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Observability 4 Pillars */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">TELEMETRY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              The 4 Pillars of Observability
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // know what is happening before users report outages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="text-[#3498db] font-bold text-sm block mb-1">LOGS</span>
            <span className="text-[10px] text-gray-500 font-bold block mb-2">"WHAT HAPPENED?"</span>
            <p className="text-xs text-[#57534e] font-sans">
              Structured JSON events with request IDs and timestamps.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="text-[#2ecc71] font-bold text-sm block mb-1">METRICS</span>
            <span className="text-[10px] text-gray-500 font-bold block mb-2">"HOW MUCH / OFTEN?"</span>
            <p className="text-xs text-[#57534e] font-sans">
              Counters, histograms, and p99 latency distributions.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="text-[#ff9f43] font-bold text-sm block mb-1">TRACES</span>
            <span className="text-[10px] text-gray-500 font-bold block mb-2">"WHERE DID IT HAPPEN?"</span>
            <p className="text-xs text-[#57534e] font-sans">
              Distributed span propagation across microservices.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="text-[#e74c3c] font-bold text-sm block mb-1">AUDIT EVENTS</span>
            <span className="text-[10px] text-gray-500 font-bold block mb-2">"WHO PERFORMED IT?"</span>
            <p className="text-xs text-[#57534e] font-sans">
              Immutable security record of data mutations.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CI/CD & Environment Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CI/CD Flow */}
        <div className="sketch-card p-5 bg-white border-2 border-[#1e1d1b]">
          <span className="sticker-tag text-[10px] font-bold uppercase mb-2">AUTOMATION</span>
          <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-3">CI/CD Pipeline Flow</h4>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            {["Git Push", "Lint", "Type Check", "Unit Tests", "Integration Tests", "Security Scan", "Build", "Deploy", "Health Check"].map((step, idx) => (
              <span key={step} className="px-2 py-1 bg-[#f6f4ee] border border-[#1e1d1b]">
                {step} {idx < 8 ? "→" : "✅"}
              </span>
            ))}
          </div>
        </div>

        {/* Environment Management */}
        <div className="sketch-card p-5 bg-white border-2 border-[#1e1d1b] flex flex-col justify-between">
          <div>
            <span className="sticker-tag-red text-[10px] font-bold uppercase mb-2">SECRETS & ENVS</span>
            <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-2">Environment Isolation</h4>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] font-mono text-xs space-y-1">
              <div>Dev → Staging → Production</div>
              <div className="text-gray-500 font-bold">Secrets in Vault / Cloud KMS (Never in Git)</div>
            </div>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-3">
            "`.env` is not a password manager."
          </span>
        </div>
      </div>
    </div>
  );
}
