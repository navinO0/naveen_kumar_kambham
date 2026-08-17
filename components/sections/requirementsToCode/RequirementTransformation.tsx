"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface GridItem {
  label: string;
  val: string;
}

interface StageContent {
  type: "quote" | "list" | "grid" | "tags" | "code" | "flow";
  text?: string;
  code?: string;
  items?: string[];
  gridItems?: GridItem[];
  steps?: string[];
  note: string;
}

interface Stage {
  step: string;
  title: string;
  subtitle: string;
  color: string;
  textColor?: string;
  badge: string;
  content: StageContent;
}

const STAGES: Stage[] = [
  {
    step: "01",
    title: "Business Requirement",
    subtitle: "What the stakeholder said",
    color: "bg-[#ffe866]",
    badge: "INPUT",
    content: {
      type: "quote",
      text: '"Customers should be able to place an order online."',
      note: "// simple business sentence. zero technical details yet.",
    },
  },
  {
    step: "02",
    title: "Functional Requirements",
    subtitle: "Deconstructing capabilities",
    color: "bg-white",
    badge: "SCOPE",
    content: {
      type: "list",
      items: [
        "Customer can browse products and check live inventory",
        "Customer can add products to cart and update quantities",
        "Customer can create order intent with delivery address",
        "Customer can select delivery method & shipping rate",
        "Customer can process payment via payment gateway",
        "Customer can view real-time order fulfillment status",
      ],
      note: "// defining precise functional boundaries",
    },
  },
  {
    step: "03",
    title: "Non-Functional Requirements",
    subtitle: "Defining quality attributes",
    color: "bg-white",
    badge: "QUALITY",
    content: {
      type: "grid",
      gridItems: [
        { label: "SECURE", val: "Server-side price check & encrypted sessions" },
        { label: "RESPONSIVE", val: "Checkout API p99 latency < 250ms" },
        { label: "RELIABLE", val: "ACID database transaction guarantees" },
        { label: "AUDITABLE", val: "Immutable order audit state log" },
        { label: "SCALABLE", val: "Decoupled asynchronous worker queue" },
        { label: "FAST", val: "Redis cache-aside for product catalog" },
      ],
      note: "// 'working' is not enough; how well it works matters",
    },
  },
  {
    step: "04",
    title: "Security Requirements",
    subtitle: "Defensive constraints",
    color: "bg-[#fee2e2]/60",
    badge: "SECURITY",
    content: {
      type: "list",
      items: [
        "Authenticated customer via verified Bearer JWT / session",
        "Server-side price recalculation (Never trust prices from browser!)",
        "Strict ownership authorization (User A cannot view User B's order)",
        "Rate limiting: max 5 order checkout attempts per minute per IP",
        "Zod payload schema validation for cart items and address strings",
        "Idempotency Key headers on payment requests (X-Idempotency-Key)",
      ],
      note: "// client data is untrusted input from a remote terminal",
    },
  },
  {
    step: "05",
    title: "Data Requirements",
    subtitle: "Domain entities",
    color: "bg-white",
    badge: "DATA MODEL",
    content: {
      type: "tags",
      items: ["Customer", "Product", "Cart", "Order", "OrderItem", "Payment", "Shipment"],
      note: "// mapping real-world business nouns into domain entities",
    },
  },
  {
    step: "06",
    title: "API Design",
    subtitle: "REST API Contract",
    color: "bg-[#1e1d1b]",
    textColor: "text-white",
    badge: "CONTRACT",
    content: {
      type: "code",
      code: `POST   /api/v1/orders               -> Create order & lock inventory
GET    /api/v1/orders/:id           -> Retrieve order details & status
POST   /api/v1/orders/:id/payment   -> Process payment with Idempotency Key
GET    /api/v1/orders/:id/status    -> Stream live order state updates`,
      note: "// predictable HTTP endpoints with strict status codes",
    },
  },
  {
    step: "07",
    title: "Architecture Flow",
    subtitle: "System boundary pipeline",
    color: "bg-white",
    badge: "SYSTEM",
    content: {
      type: "flow",
      steps: ["Client", "API Gateway", "Zod Validation", "RBAC Auth", "Order Service", "SQL Repository", "PostgreSQL"],
      note: "// requests pass through strict defensive layers before touching DB",
    },
  },
  {
    step: "08",
    title: "Implementation",
    subtitle: "Core service snippet",
    color: "bg-[#1e1d1b]",
    textColor: "text-white",
    badge: "CODE",
    content: {
      type: "code",
      code: `// Order Service - Server-side atomic transaction
async function placeOrder(userId: string, items: CartItem[]) {
  return await db.transaction(async (tx) => {
    // 1. Recalculate prices from DB (Do NOT trust client price)
    const verifiedTotal = await tx.calculateTotal(items);
    // 2. Atomic stock deduction
    const stockOk = await tx.deductInventory(items);
    if (!stockOk) throw new Error("INSUFFICIENT_STOCK");
    // 3. Create immutable order row
    return await tx.orders.create({ userId, total: verifiedTotal, status: "PENDING" });
  });
}`,
      note: "// clean service layer isolating business logic from HTTP parsing",
    },
  },
  {
    step: "09",
    title: "Testing Strategy",
    subtitle: "Automated verification",
    color: "bg-white",
    badge: "VERIFICATION",
    content: {
      type: "list",
      items: [
        "Unit Test: Service total calculation with discount rules",
        "Integration Test: Transaction rollback on payment failure",
        "API Test: 400 Bad Request on invalid item ID schema",
        "Security Test: Attempting order creation with expired JWT -> 401",
        "Load Test: 2,000 concurrent checkout requests via Apache JMeter",
      ],
      note: "// test evidence guarantees code correctness under stress",
    },
  },
  {
    step: "10",
    title: "Observability & Ops",
    subtitle: "Production telemetry",
    color: "bg-[#dcfce7]/60",
    badge: "PRODUCTION",
    content: {
      type: "list",
      items: [
        "Structured Logs: logger.info('order_created', { orderId, userId, amount })",
        "Metrics: Histogram tracking order checkout p95 and p99 latency",
        "Audit Trail: Immutable log entry for compliance & financial auditing",
        "Alerting: PagerAlert when order failure rate exceeds 1% in 5 min window",
      ],
      note: "// telemetry provides instant visibility into live production health",
    },
  },
];

export default function RequirementTransformation() {
  const [activeStep, setActiveStep] = useState(0);

  const current = STAGES[activeStep];

  return (
    <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
        <div>
          <span className="sticker-tag-red text-xs uppercase font-bold mb-1">INTERACTIVE STEPPER</span>
          <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
            Real Requirement Transformation
          </h3>
          <p className="text-xs text-[#57534e] font-sans mt-0.5">
            Tracing a simple business sentence through all 10 engineering stages.
          </p>
        </div>
        <div className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
          // requirement → engineering decision → code
        </div>
      </div>

      {/* Stepper Buttons Bar */}
      <div className="flex overflow-x-auto gap-1.5 pb-3 mb-6 scrollbar-thin">
        {STAGES.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(idx)}
            className={`px-3 py-1.5 text-xs font-mono sketch-button whitespace-nowrap flex items-center gap-1.5 ${
              activeStep === idx
                ? "bg-[#ff5e5b] text-white font-bold"
                : idx < activeStep
                ? "bg-[#ffe866]/50 text-[#1e1d1b]"
                : "bg-white text-[#1e1d1b]"
            }`}
          >
            <span>{s.step}</span>
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Stepper Card */}
      <motion.div
        key={current.step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`p-6 sketch-card border-2 border-[#1e1d1b] ${current.color}`}
      >
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#1e1d1b] pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black font-mono text-[#ff5e5b]">
              #{current.step}
            </span>
            <div>
              <h4 className="text-lg font-bold font-mono text-[#1e1d1b]">
                {current.title}
              </h4>
              <span className="text-xs font-sans text-[#57534e]">
                {current.subtitle}
              </span>
            </div>
          </div>
          <span className="sticker-tag text-[10px] uppercase font-mono">{current.badge}</span>
        </div>

        {/* Content Renderers */}
        <div className="my-4 font-mono text-xs text-[#1e1d1b]">
          {current.content.type === "quote" && (
            <div className="p-4 bg-white border border-[#1e1d1b] sketch-border-sm font-hand text-lg md:text-xl font-bold text-[#1e1d1b]">
              {current.content.text}
            </div>
          )}

          {current.content.type === "list" && (
            <ul className="space-y-2">
              {current.content.items?.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 bg-white/80 p-2.5 border border-[#1e1d1b] sketch-border-sm font-sans font-medium text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#2ecc71] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {current.content.type === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {current.content.gridItems?.map((g, i) => (
                <div key={i} className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
                  <span className="font-bold text-[#ff5e5b] text-[10px] block mb-1">{g.label}</span>
                  <span className="font-sans text-xs font-medium text-[#1e1d1b]">{g.val}</span>
                </div>
              ))}
            </div>
          )}

          {current.content.type === "tags" && (
            <div className="flex flex-wrap gap-2 py-2">
              {current.content.items?.map((t, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#ffe866] border border-[#1e1d1b] sketch-border-sm font-bold font-mono text-sm">
                  Entity: {t}
                </span>
              ))}
            </div>
          )}

          {current.content.type === "code" && (
            <pre className="p-4 bg-[#1e1d1b] text-[#ffe866] font-mono text-xs rounded border border-[#57534e] overflow-x-auto">
              {current.content.code}
            </pre>
          )}

          {current.content.type === "flow" && (
            <div className="flex flex-wrap items-center gap-2 justify-center py-4">
              {current.content.steps?.map((step, i) => (
                <div key={i} className="flex items-center">
                  <span className="px-3 py-1.5 bg-white border border-[#1e1d1b] sketch-border-sm font-bold font-mono text-xs">
                    {step}
                  </span>
                  {i < (current.content.steps?.length || 0) - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#ff5e5b] mx-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-dashed border-[#1e1d1b] flex items-center justify-between text-xs">
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            {current.content.note}
          </span>
          <div className="flex items-center space-x-2">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(activeStep - 1)}
              className="px-2.5 py-1 sketch-button text-[11px] disabled:opacity-40"
            >
              ← Prev Stage
            </button>
            <button
              disabled={activeStep === STAGES.length - 1}
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-2.5 py-1 sketch-button text-[11px] bg-[#ffe866] disabled:opacity-40 font-bold"
            >
              Next Stage →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
