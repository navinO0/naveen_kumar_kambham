"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Boxes, GitBranch, Layers, Network, Server, Database } from "lucide-react";

const ARCH_PATTERNS = [
  {
    id: "layered",
    title: "1. Layered Architecture",
    tagline: "Strict separation of HTTP, business logic, and database access",
    diagram: "Controller  →  Service  →  Repository  →  Database",
    quote: "// simple, understandable, perfect default for standard business applications",
    details: {
      whenToUse: "Monolithic applications, REST APIs, domain-driven CRUD apps.",
      benefits: "Easy to reason about, low overhead, clear code organization.",
      tradeoff: "Can encourage heavy database reliance if service logic spills into SQL.",
    },
  },
  {
    id: "modular-monolith",
    title: "2. Modular Monolith",
    tagline: "Single deployment unit with strict internal module boundaries",
    diagram: "Application Gateway → [ Users Module | Orders Module | Payments Module ] → Shared Database",
    quote: '"Microservices are not a personality trait."',
    details: {
      whenToUse: "Growing startups and medium-scale systems wanting clean code isolation.",
      benefits: "Zero network latency between modules, single deployment pipeline, simplified operations.",
      tradeoff: "Requires discipline to prevent modules from importing internal files directly.",
    },
  },
  {
    id: "clean-hexagonal",
    title: "3. Clean / Hexagonal Architecture",
    tagline: "Core domain logic isolated from external frameworks & databases",
    diagram: "Domain (Entities) ← Application (Use Cases) ← Adapters (Controllers) ← Infrastructure (Postgres/Redis)",
    quote: "// core business logic never imports database or web framework packages",
    details: {
      whenToUse: "Complex domain logic where underlying database or cloud provider may change.",
      benefits: "High testability; unit test domain rules without spinning up mock databases.",
      tradeoff: "Higher boilerplate; mapping DTOs between layers requires extra code.",
    },
  },
  {
    id: "event-driven",
    title: "4. Event-Driven Architecture",
    tagline: "Asynchronous processing decoupled via message brokers",
    diagram: "Order API  →  [ ORDER_CREATED Event ]  →  ( Email Worker | Analytics | Inventory Service )",
    quote: "// decoupling heavy jobs so HTTP response stays under 50ms",
    details: {
      whenToUse: "Systems with heavy background jobs (notifications, PDF generation, data sync).",
      benefits: "High elasticity, non-blocking HTTP threads, fault isolation.",
      tradeoff: "Eventual consistency; tracking distributed errors requires correlation IDs.",
    },
  },
  {
    id: "microservices",
    title: "5. Microservices Architecture",
    tagline: "Independently deployable services owned by separate engineering teams",
    diagram: "API Gateway  →  User Service (DB) | Order Service (DB) | Payment Service (DB)",
    quote: '"Splitting one application into 7 services doesn\'t make it enterprise. Sometimes it makes it 7 places to debug."',
    details: {
      whenToUse: "Large engineering organizations (> 50 devs) with autonomous feature teams.",
      benefits: "Independent deployments, technology flexibility per service, targeted scaling.",
      tradeoff: "Extreme operational complexity, network failure modes, distributed tracing overhead.",
    },
  },
];

export default function DomainAndArchitecture() {
  const [activePatternId, setActivePatternId] = useState("layered");

  const activePattern = ARCH_PATTERNS.find((p) => p.id === activePatternId) || ARCH_PATTERNS[0];

  return (
    <div className="space-y-8 my-8">
      {/* 1. Domain Modeling */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">DOMAIN MODELING</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Turn Nouns into Data. Turn Verbs into Behavior.
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Extracting domain entities and relationships from real-world business requirements.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // requirement: "Customer places an order"
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Noun vs Verb Extraction */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#fffef5] to-[#fff8e6]">
            <span className="font-mono text-xs font-bold text-[#ff5e5b] block mb-3 uppercase tracking-wider">
              1. NOUN & VERB EXTRACTION
            </span>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 raised-card">
                <span className="text-[#3498db] font-bold block mb-2 text-[10px] uppercase">NOUNS (Data Entities):</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Customer", "Order", "Product", "OrderItem", "Payment"].map((n) => (
                    <span key={n} className="px-2.5 py-1 bg-[#ffe866] font-bold text-xs rounded-md">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 raised-card">
                <span className="text-[#2ecc71] font-bold block mb-2 text-[10px] uppercase">VERBS (Business Behaviors):</span>
                <div className="flex flex-wrap gap-1.5">
                  {["places", "calculates total", "deducts stock", "verifies payment"].map((v) => (
                    <span key={v} className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-md">
                      {v}()
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Relationship Tree */}
          <div className="p-4 terminal-card flex flex-col justify-between font-mono text-xs">
            <div className="pt-6">
              <span className="text-[#ffe866] font-bold text-xs block mb-3 border-b border-[#2a2f3e] pb-1">
                2. ENTITY RELATIONSHIP & OWNERSHIP GRAPH
              </span>
              <pre className="text-[#2ecc71] text-xs leading-relaxed">
{`Customer (1)
   └── Order (1..N)
        ├── OrderItem (1..N)
        │      └── Product (1)
        └── Payment (1)`}
              </pre>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 border-t border-[#2a2f3e] pt-2">
              Domain modeling dictates table foreign keys, invariant rules, and cascade deletes.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Industry Architecture Patterns */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">SYSTEM ARCHITECTURE</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Architecture Is a Decision, Not a Buzzword
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
            // picking the right pattern for team scale & constraints
          </span>
        </div>

        {/* Pattern Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-6 -mx-1 px-1">
          {ARCH_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePatternId(p.id)}
              className={`px-3 py-1.5 font-mono text-xs sketch-button whitespace-nowrap shrink-0 ${
                activePatternId === p.id ? "bg-[#ff5e5b] text-white font-bold" : "bg-white text-[#1e1d1b]"
              }`}
            >
              {p.title.split(". ")[1]}
            </button>
          ))}
        </div>

        {/* Active Pattern Card */}
        <motion.div
          key={activePattern.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-5 sketch-card bg-[#f6f4ee] min-w-0 max-w-full overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h4 className="font-mono font-black text-lg text-[#1e1d1b]">
                {activePattern.title}
              </h4>
              <p className="text-xs font-sans text-[#57534e] mt-0.5">
                {activePattern.tagline}
              </p>
            </div>
            <span className="font-hand text-sm text-[#ff5e5b] font-bold mt-2 md:mt-0">
              {activePattern.quote}
            </span>
          </div>

          {/* Diagram Box */}
          <div className="p-3.5 bg-[#1e1d1b] text-[#ffe866] font-mono text-xs rounded-lg border border-[#57534e] mb-4 overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre">
            <code>{activePattern.diagram}</code>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
            <div className="stripe-card stripe-card-blue p-3">
              <span className="font-mono font-bold text-[10px] text-[#3498db] block mb-1">WHEN TO USE</span>
              <p className="text-[#1e1d1b]">{activePattern.details.whenToUse}</p>
            </div>

            <div className="stripe-card stripe-card-green p-3">
              <span className="font-mono font-bold text-[10px] text-[#2ecc71] block mb-1">BENEFITS</span>
              <p className="text-[#1e1d1b]">{activePattern.details.benefits}</p>
            </div>

            <div className="stripe-card stripe-card-amber p-3">
              <span className="font-mono font-bold text-[10px] text-[#f59e0b] block mb-1">TRADE-OFFS</span>
              <p className="text-[#1e1d1b]">{activePattern.details.tradeoff}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
