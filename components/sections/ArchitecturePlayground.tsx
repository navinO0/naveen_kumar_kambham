"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Database, Server, ShieldCheck, Zap, RefreshCw, Cpu } from "lucide-react";

interface Step {
  id: string;
  name: string;
  type: "client" | "api" | "validation" | "auth" | "db" | "cache" | "queue";
  description: string;
  payloadState: string;
}

interface ArchitectureFlow {
  id: string;
  title: string;
  tagline: string;
  steps: Step[];
}

const FLOWS: ArchitectureFlow[] = [
  {
    id: "request-lifecycle",
    title: "1. Request Lifecycle",
    tagline: "From HTTP payload to SQL row query and JSON response",
    steps: [
      { id: "1", name: "Client Browser / Curl", type: "client", description: "Sends HTTP POST /api/orders with JSON payload.", payloadState: '{ "item": "Coffee", "qty": 2 }' },
      { id: "2", name: "API Gateway", type: "api", description: "Receives raw socket, parses body, assigns Request ID.", payloadState: 'Headers: { x-request-id: "req_9921" }' },
      { id: "3", name: "Zod Schema Validation", type: "validation", description: "Verifies payload types and sanitized constraints.", payloadState: "Schema: Validated ✅" },
      { id: "4", name: "JWT Auth & RBAC Check", type: "auth", description: "Verifies bearer token signature and role bitmask.", payloadState: 'Role: "CUSTOMER" ✅' },
      { id: "5", name: "Service & PostgreSQL", type: "db", description: "Executes atomic SQL transaction with row lock.", payloadState: 'SQL: BEGIN; UPDATE stock... COMMIT;' },
      { id: "6", name: "HTTP 201 Created Response", type: "api", description: "Formats response payload and returns JSON to client.", payloadState: '{ "status": "order_placed", "id": 102 }' },
    ],
  },
  {
    id: "caching-flow",
    title: "2. Redis Cache-Aside Pattern",
    tagline: "Preventing 900 repetitive database queries under high read load",
    steps: [
      { id: "1", name: "Client Request", type: "client", description: "GET /api/products/402", payloadState: "Fetch product details" },
      { id: "2", name: "API Service Layer", type: "api", description: "Checks Redis key `product:402`", payloadState: "Querying cache..." },
      { id: "3", name: "Redis Cache Lookup", type: "cache", description: "CACHE HIT! Returns cached JSON string in 0.4ms.", payloadState: "Redis TTL: 300s (HIT ✅)" },
      { id: "4", name: "Fast Response", type: "api", description: "Bypasses PostgreSQL completely. Saves DB CPU.", payloadState: "Response returned in < 2ms" },
    ],
  },
  {
    id: "event-driven",
    title: "3. Asynchronous Event-Driven Queue",
    tagline: "Decoupling long-running tasks from the main HTTP thread",
    steps: [
      { id: "1", name: "Order API", type: "api", description: "Receives new order request and updates main DB.", payloadState: "Order #492 persisted" },
      { id: "2", name: "Event Publisher", type: "queue", description: "Emits `ORDER_CREATED` payload to Redis BullMQ queue.", payloadState: 'Job: { orderId: 492, email: "user@..." }' },
      { id: "3", name: "Background Worker", type: "queue", description: "Worker thread pulls job, generates PDF invoice, sends email.", payloadState: "Worker executing asynchronously..." },
      { id: "4", name: "Notification Complete", type: "client", description: "Webhook sent to customer. Main API thread never blocked.", payloadState: "Email delivered ✅" },
    ],
  },
];

export default function ArchitecturePlayground() {
  const [selectedFlowId, setSelectedFlowId] = useState<string>("request-lifecycle");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeFlow = FLOWS.find((f) => f.id === selectedFlowId) || FLOWS[0];
  const activeStep = activeFlow.steps[activeStepIndex] || activeFlow.steps[0];

  return (
    <section id="architecture" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">SYSTEM DESIGN & FLOWS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            how the backend actually talks to itself <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(architecture playground)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* click any step to trace data payload execution */
        </p>
      </div>

      {/* Flow Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedFlowId(f.id);
              setActiveStepIndex(0);
            }}
            className={`px-3 py-1.5 font-mono text-xs sketch-button ${
              selectedFlowId === f.id ? "bg-[#ffe866] font-bold" : "bg-white text-[#1e1d1b]"
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

      {/* Diagram Container */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] mb-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <h3 className="font-bold font-mono text-lg text-[#1e1d1b]">{activeFlow.title}</h3>
            <p className="text-xs text-[#57534e] font-sans">{activeFlow.tagline}</p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // step-by-step execution tracer
          </span>
        </div>

        {/* Hand-Drawn Flow Diagram Nodes */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-6">
          {activeFlow.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <div key={step.id} className="flex items-center">
                <div
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 sketch-card cursor-pointer text-center min-w-[120px] max-w-[150px] transition-all ${
                    isActive
                      ? "border-[#ff5e5b] bg-[#ffe866]/40 transform -translate-y-1 shadow-md"
                      : "bg-[#f6f4ee] hover:bg-white"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-[#57534e] block">
                    STEP #{idx + 1}
                  </span>
                  <span className="font-bold font-mono text-xs text-[#1e1d1b] block mt-1">
                    {step.name}
                  </span>
                </div>

                {idx < activeFlow.steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-[#ff5e5b] mx-1 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Step Details Box */}
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 p-4 bg-[#1e1d1b] text-white rounded sketch-border grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs"
        >
          <div>
            <div className="flex items-center space-x-2 text-[#ffe866] font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>STEP {activeStepIndex + 1}: {activeStep.name.toUpperCase()}</span>
            </div>
            <p className="text-gray-300 font-sans text-xs leading-relaxed mt-2">
              {activeStep.description}
            </p>
          </div>

          <div className="p-3 bg-[#292524] rounded border border-[#57534e] text-gray-200">
            <span className="text-[10px] text-gray-400 block mb-1">DATA PAYLOAD / STATE:</span>
            <code className="text-[#2ecc71] font-mono text-xs block font-bold">
              {activeStep.payloadState}
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
