"use client";

import { useState } from "react";
import { FileText, CheckCircle2, AlertOctagon, HelpCircle, Code } from "lucide-react";

const ADRS = [
  {
    id: "adr-1",
    title: "ADR-001: SQLite (WAL Mode) vs PostgreSQL for Local Portfolio Storage",
    decision: "Use SQLite with Write-Ahead Logging (WAL) via `better-sqlite3`.",
    context: "Portfolio site needs lightning-fast reads without heavy external database server overhead.",
    alternatives: ["PostgreSQL cluster", "Dockerized MySQL", "Static JSON files"],
    reason: "Zero operational configuration, single-file deployment, sub-millisecond local reads, full SQL query support.",
    tradeoff: "Limited concurrent write throughput (not an issue for portfolio read workloads).",
  },
  {
    id: "adr-2",
    title: "ADR-002: REST API Contracts vs GraphQL",
    decision: "Use REST APIs with Next.js Route Handlers and Zod validation.",
    context: "Exposing clean HTTP endpoints with standard status codes, caching, and rate limiting.",
    alternatives: ["GraphQL (Apollo/Relay)", "gRPC over HTTP/2", "tRPC"],
    reason: "Standard HTTP semantics (200, 400, 401, 403, 429), straightforward client fetching, easy cURL testing.",
    tradeoff: "Multiple requests needed if fetching unrelated complex entity trees.",
  },
  {
    id: "adr-3",
    title: "ADR-003: Modular Monolith vs Microservices",
    decision: "Build as a Modular Monolith with clear repository and service layers.",
    context: "Maintaining low operational complexity while ensuring code modules can be split in the future.",
    alternatives: ["7 Independent Microservices", "Serverless Lambdas"],
    reason: "Single deployment unit, zero inter-service network latency, simplified local debugging.",
    tradeoff: "Modules share the same Node.js process runtime.",
  },
  {
    id: "adr-4",
    title: "ADR-004: Synchronous vs Asynchronous Background Processing",
    decision: "Offload long-running heavy tasks (PDF generation, webhooks) to asynchronous queues.",
    context: "HTTP request handlers must return in < 100ms to keep Node.js event loop responsive.",
    alternatives: ["Synchronous processing inside HTTP handler", "Blocking sub-process spawn"],
    reason: "Prevents API socket starvation and latency spikes for concurrent users.",
    tradeoff: "Requires background worker process monitoring.",
  },
  {
    id: "adr-5",
    title: "ADR-005: Redis Cache-Aside vs Direct Database Queries",
    decision: "Implement Redis cache-aside for high-read catalog queries.",
    context: "90% of traffic hits product catalog reads during flash sales.",
    alternatives: ["Direct PostgreSQL query on every request", "In-memory JS object map"],
    reason: "Bypasses database CPU and connection pool saturation under traffic spikes.",
    tradeoff: "Cache invalidation must be handled on entity mutation.",
  },
];

const PRINCIPLES = [
  { name: "Single Responsibility (SRP)", quote: "A module should have one clear reason to change.", desc: "Keep HTTP routing, business calculations, and SQL queries in separate files." },
  { name: "Separation of Concerns", quote: "HTTP → Business Logic → Data Access.", desc: "Never write raw database SQL directly inside API request handlers." },
  { name: "Dependency Inversion", quote: "High-level policy should not depend on low-level details.", desc: "Core business logic imports interfaces, not specific cloud SDK packages." },
  { name: "DRY (Don't Repeat Yourself)", quote: '"DRY doesn\'t mean turning 2 lines of code into a 400-line generic framework."', desc: "Avoid duplication, but prefer duplicate code over the wrong abstraction." },
  { name: "KISS (Keep It Simple, Stupid)", quote: "Prefer the simplest design that satisfies requirements.", desc: "Don't build complex Kubernetes cluster configs when a single VM works." },
  { name: "YAGNI (You Aren't Gonna Need It)", quote: '"Future scale is not a feature request."', desc: "Don't write infrastructure for hypothetical features that don't exist yet." },
  { name: "Composition Over Inheritance", quote: "Compose small reusable functions.", desc: "Chain focused middleware instead of inheriting deep class hierarchies." },
  { name: "Explicit Over Clever", quote: '"If I need a decoder ring to review your function, something went wrong."', desc: "Readable, obvious code wins over hyper-clever one-liners every time." },
];

export default function AdrAndCodingPrinciples() {
  const [activeAdrId, setActiveAdrId] = useState("adr-1");

  const activeAdr = ADRS.find((a) => a.id === activeAdrId) || ADRS[0];

  return (
    <div className="space-y-8 my-8">
      {/* 1. ADR Section */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">ARCHITECTURE DECISION RECORDS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Why Did I Choose This Architecture? (ADRs)
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Engineering means choosing trade-offs, not collecting buzzwords.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // documented rationale & trade-offs
          </span>
        </div>

        {/* ADR Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ADRS.map((adr, idx) => (
            <button
              key={adr.id}
              onClick={() => setActiveAdrId(adr.id)}
              className={`px-3 py-1.5 font-mono text-xs sketch-button ${
                activeAdrId === adr.id ? "bg-[#ffe866] font-bold" : "bg-white text-[#1e1d1b]"
              }`}
            >
              ADR-00{idx + 1}
            </button>
          ))}
        </div>

        {/* Active ADR Box */}
        <div className="p-5 sketch-card bg-white border-2 border-[#1e1d1b] space-y-4">
          <div className="border-b-2 border-dashed border-[#1e1d1b] pb-3">
            <span className="sticker-tag-red text-[10px] uppercase font-bold mb-1">DECISION RECORD</span>
            <h4 className="font-mono font-black text-lg text-[#1e1d1b]">{activeAdr.title}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#ff5e5b] block mb-1">DECISION MADE:</span>
              <p className="text-[#1e1d1b] font-bold">{activeAdr.decision}</p>
            </div>

            <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#3498db] block mb-1">CONTEXT & NEED:</span>
              <p className="text-[#57534e] font-sans text-xs">{activeAdr.context}</p>
            </div>

            <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#2ecc71] block mb-1">PRIMARY REASON:</span>
              <p className="text-[#57534e] font-sans text-xs">{activeAdr.reason}</p>
            </div>

            <div className="p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#e74c3c] block mb-1">ACCEPTED TRADE-OFF:</span>
              <p className="text-[#57534e] font-sans text-xs">{activeAdr.tradeoff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Coding Principles */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">ENGINEERING RULES</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Coding Principles (Rules I Follow)
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // pragmatism &gt; dogma
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, idx) => (
            <div key={idx} className="p-4 sketch-card bg-white border border-[#1e1d1b] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#1e1d1b] block mb-1">
                  #{idx + 1} {p.name}
                </span>
                <p className="font-hand text-sm text-[#ff5e5b] font-bold mb-2">
                  {p.quote}
                </p>
                <p className="text-xs text-[#57534e] font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
