"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Code2, Globe, Network, ShieldCheck, Zap, RefreshCw, AlertCircle } from "lucide-react";

const PROTOCOLS = [
  {
    name: "REST",
    useCase: "Standard CRUD APIs, public web services, third-party integrations.",
    pros: "Universal browser support, HTTP caching (ETags), simple status codes.",
    cons: "Over-fetching / under-fetching entity graphs.",
    idealWhen: "Building clean resource-oriented endpoints with standard HTTP caching.",
  },
  {
    name: "GraphQL",
    useCase: "Complex mobile dashboards requiring customizable fields in 1 roundtrip.",
    pros: "Client selects exact payload fields, strongly typed schema, single endpoint.",
    cons: "Complex backend caching, query depth abuse risk (N+1 queries).",
    idealWhen: "Multiple client types (iOS, Android, Web) need tailored data representations.",
  },
  {
    name: "gRPC",
    useCase: "High-performance microservice-to-microservice internal RPC communications.",
    pros: "HTTP/2 multiplexing, compact Protocol Buffers binary payload, auto client SDKs.",
    cons: "Browser support requires gRPC-Web proxy, not human readable without proto definitions.",
    idealWhen: "Low-latency internal service communication at scale.",
  },
  {
    name: "WebSockets",
    useCase: "Bi-directional real-time communication (Chat, collaborative editors, live trading).",
    pros: "Full-duplex persistent TCP connection with low framing overhead.",
    cons: "Stateful connections require sticky sessions or Redis pub/sub adapter clusters.",
    idealWhen: "Client and server both push messages continuously over 1 socket.",
  },
  {
    name: "Server-Sent Events (SSE)",
    useCase: "One-way real-time server streaming (LLM token generation, live sports scores).",
    pros: "Built-in browser auto-reconnect, standard HTTP/2 streaming, simple plain text formatting.",
    cons: "Unidirectional only (server to client).",
    idealWhen: "Server needs to stream live updates to browser clients over HTTP.",
  },
  {
    name: "Webhooks",
    useCase: "Asynchronous server-to-server notifications (Stripe payment alerts).",
    pros: "Decouples systems across organization boundaries over standard HTTP POST.",
    cons: "Requires HMAC signature verification, retry policies, and idempotency handling.",
    idealWhen: "Notifying external partner servers when asynchronous events complete.",
  },
];

export default function AdvancedApiAndProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  const currentProto = PROTOCOLS[selectedProtocol];

  return (
    <div className="space-y-6 sm:space-y-8 my-6 sm:my-8">
      {/* 1. Protocol Selection Matrix */}
      <div className="sketch-card p-4 sm:p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">API ARCHITECTURE</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              API Protocols & Communication Styles
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Knowing when to use REST, GraphQL, gRPC, WebSockets, SSE, or Webhooks.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
            // right protocol for the right boundary
          </span>
        </div>

        {/* Protocol Selector Tabs - Touch Scrollable */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-6 -mx-1 px-1">
          {PROTOCOLS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setSelectedProtocol(idx)}
              className={`px-3 py-1.5 font-mono text-xs sketch-button whitespace-nowrap shrink-0 ${
                selectedProtocol === idx ? "bg-[#ff5e5b] text-white font-bold" : "bg-white text-[#1e1d1b]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Selected Protocol Card */}
        <div className="p-4 sm:p-5 sketch-card bg-[#f6f4ee] border-2 border-[#1e1d1b] space-y-4 font-mono text-xs">
          <div className="border-b-2 border-dashed border-[#1e1d1b] pb-2 flex justify-between items-center">
            <h4 className="text-lg font-black text-[#1e1d1b]">{currentProto.name}</h4>
            <span className="sticker-tag text-[10px] uppercase font-bold">DECISION MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#ff5e5b] block mb-1">PROS:</span>
              <p className="font-sans text-xs text-[#1e1d1b]">{currentProto.pros}</p>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="font-bold text-[#e74c3c] block mb-1">CONS & LIMITS:</span>
              <p className="font-sans text-xs text-[#1e1d1b]">{currentProto.cons}</p>
            </div>
          </div>

          <div className="p-3 bg-[#ffe866]/50 border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#1e1d1b] block mb-1">IDEAL WHEN:</span>
            <p className="font-sans text-xs font-medium text-[#1e1d1b]">{currentProto.idealWhen}</p>
          </div>
        </div>
      </div>

      {/* 2. Advanced HTTP Mechanisms */}
      <div className="sketch-card p-4 sm:p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">HTTP MECHANISMS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Advanced HTTP & Resiliency Patterns
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
            // beyond basic GET / POST
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Idempotency & Optimistic Concurrency */}
          <div className="p-3.5 sm:p-4 bg-[#1e1d1b] text-white rounded-lg border-2 border-[#1e1d1b] min-w-0 max-w-full overflow-hidden shadow-md">
            <span className="text-[#ffe866] font-bold text-xs block mb-2 border-b border-[#57534e] pb-1">
              IDEMPOTENCY & OPTIMISTIC LOCKING
            </span>
            <pre className="text-[#2ecc71] text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre p-1">
{`// 1. Idempotent Deduplication (Redis key 24h TTL)
const idempotencyKey = req.headers["x-idempotency-key"];
const cachedResponse = await redis.get(\`idemp:\${idempotencyKey}\`);
if (cachedResponse) return res.json(JSON.parse(cachedResponse));

// 2. Optimistic Concurrency Control (Version Check)
const updatedRows = await db("accounts")
  .where({ id: accountId, version: currentVersion })
  .update({ balance: newBalance, version: currentVersion + 1 });

if (updatedRows === 0) throw new ConcurrentUpdateConflictError();`}
            </pre>
          </div>

          {/* AbortSignal Timeout & ETags */}
          <div className="p-3.5 sm:p-4 bg-[#1e1d1b] text-white rounded-lg border-2 border-[#1e1d1b] min-w-0 max-w-full overflow-hidden shadow-md">
            <span className="text-[#ffe866] font-bold text-xs block mb-2 border-b border-[#57534e] pb-1">
              ABORTSIGNAL TIMEOUTS & ETAG CACHING
            </span>
            <pre className="text-[#2ecc71] text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre p-1">
{`// 1. Timeout external requests after 5000ms
const response = await fetch("https://gateway.payment.com", {
  signal: AbortSignal.timeout(5000)
});

// 2. ETags & Conditional 304 Not Modified
const etag = generateHash(responseData);
if (req.headers["if-none-match"] === etag) {
  return res.status(304).end(); // Zero payload transfer
}
res.setHeader("ETag", etag);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
