"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Lock, AlertTriangle, Key, Terminal, Server, RefreshCw, Cpu } from "lucide-react";

interface CaseStep {
  id: number;
  phase: string;
  title: string;
  badge: string;
  badgeColor: string;
  codeSnippet?: string;
  details: string[];
  quote: string;
}

const CASE_STEPS: CaseStep[] = [
  {
    id: 1,
    phase: "01. REQUIREMENT & BUSINESS RULES",
    title: 'Business Statement: "Customer transfers ₹10,000 to Beneficiary"',
    badge: "RULES",
    badgeColor: "bg-[#ffe866] text-[#1e1d1b]",
    details: [
      "Rule 1: Source account status must be ACTIVE & verified via MFA session token",
      "Rule 2: Available account balance >= ₹10,000 (after reserving pending holds)",
      "Rule 3: Daily transaction limit check (₹10,000 + today's total <= ₹50,000 limit)",
      "Rule 4: Beneficiary account must exist, be ACTIVE, and be unblocked",
      "Rule 5: Request must be authenticated with customer JWT and signed payload",
    ],
    quote: "// business rules must be validated before touching money balances",
  },
  {
    id: 2,
    phase: "02. API CONTRACT & IDEMPOTENCY",
    title: "POST /api/v1/transfers with X-Idempotency-Key",
    badge: "API CONTRACT",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-800",
    codeSnippet: `POST /api/v1/transfers HTTP/1.1
Host: api.bank.com
Authorization: Bearer eyJhbGciOi...
X-Idempotency-Key: 8c1a-991f-4b92-823a
Content-Type: application/json

{
  "sourceAccountId": "acc_user_991",
  "destinationAccountId": "acc_user_404",
  "amount": 10000.00,
  "currency": "INR",
  "remark": "Rent payment"
}`,
    details: [
      "Strict Zod schema validation for positive numeric amount and UUID account formats",
      "X-Idempotency-Key prevents accidental double-debiting on network retries",
      "If client retries with same key within 24h, Redis returns cached result immediately",
    ],
    quote: "// retryable APIs must be idempotent to prevent double transfers",
  },
  {
    id: 3,
    phase: "03. DATABASE SCHEMA MODEL",
    title: "Relational Schema: Accounts, Limits, Transactions & Audits",
    badge: "DATA MODEL",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-800",
    codeSnippet: `-- Schema Tables with Strict Constraints
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  balance NUMERIC(15,2) NOT NULL CHECK (balance >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  version INT NOT NULL DEFAULT 1 -- Optimistic Concurrency
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  idempotency_key VARCHAR(64) UNIQUE NOT NULL,
  source_acc_id UUID REFERENCES accounts(id),
  dest_acc_id UUID REFERENCES accounts(id),
  amount NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    details: [
      "Numeric(15,2) for exact currency precision (never use floating-point floats!)",
      "Database CHECK (balance >= 0) constraint guarantees balance never drops below zero",
      "Idempotency Key unique index prevents duplicate row insertions at DB level",
    ],
    quote: "// database constraints enforce financial rules even if app code bugs occur",
  },
  {
    id: 4,
    phase: "04. PESSIMISTIC LOCKING & TRANSACTION BOUNDARY",
    title: "ACID Transaction with SELECT FOR UPDATE Row Locking",
    badge: "TRANSACTION",
    badgeColor: "bg-[#1e1d1b] text-[#ffe866]",
    codeSnippet: `// Execute inside a single SQL database transaction
await db.transaction(async (tx) => {
  // 1. Lock source account row to prevent concurrent race conditions
  const source = await tx.raw(
    "SELECT balance, status FROM accounts WHERE id = ? FOR UPDATE", 
    [sourceAccId]
  );
  if (source.balance < 10000) throw new InsufficientBalanceError();

  // 2. Lock destination account row (in deterministic ID order to prevent Deadlocks!)
  const dest = await tx.raw(
    "SELECT id FROM accounts WHERE id = ? FOR UPDATE", 
    [destAccId]
  );

  // 3. Atomic Debit & Credit
  await tx("accounts").where({ id: sourceAccId }).decrement("balance", 10000);
  await tx("accounts").where({ id: destAccId }).increment("balance", 10000);

  // 4. Record transaction entry
  await tx("transactions").insert({
    id: txnId,
    idempotency_key: idempotencyKey,
    source_acc_id: sourceAccId,
    dest_acc_id: destAccId,
    amount: 10000,
    status: "COMPLETED"
  });
});`,
    details: [
      "SELECT FOR UPDATE locks the specific rows so concurrent transfers wait safely",
      "Deterministic lock ordering (e.g. sorting account UUIDs before locking) prevents Deadlocks",
      "Atomicity: If anything fails midway, SQL engine issues ROLLBACK automatically",
    ],
    quote: "// ACID transactions ensure zero lost updates under concurrent load",
  },
  {
    id: 5,
    phase: "05. FINANCIAL AUDIT & DATA MASKING",
    title: "Immutable Audit Log & Masked Telemetry",
    badge: "SECURITY & AUDIT",
    badgeColor: "bg-red-100 text-red-900 border-red-800",
    codeSnippet: `// Immutable Audit Trail Entry (Masked PII)
auditLogger.info({
  event: "MONEY_TRANSFER_EXECUTED",
  transactionId: "txn_88192304",
  requestId: "req_99182374",
  userId: "usr_5501",
  sourceAccount: "acc_****991",
  destAccount: "acc_****404",
  amount: 10000.00,
  currency: "INR",
  clientIp: "203.0.113.195",
  timestamp: new Date().toISOString()
});`,
    details: [
      "Account numbers and customer details are masked in audit logs (GDPR & PCI-DSS)",
      "Audit trail written to append-only immutable storage for financial compliance",
      "Never log authentication tokens, PINs, CVVs, or unmasked credentials",
    ],
    quote: "// banking systems require immutable audit records for regulatory compliance",
  },
  {
    id: 6,
    phase: "06. EVENT-DRIVEN OUTBOX PATTERN",
    title: "Transactional Outbox & Kafka Event Bus Dispatch",
    badge: "EVENT BUS",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-800",
    codeSnippet: `// Step A: Write event into outbox table inside SAME SQL transaction
await tx("outbox_events").insert({
  id: uuidv4(),
  aggregate_type: "TRANSFER",
  aggregate_id: txnId,
  event_type: "TRANSFER_COMPLETED",
  payload: JSON.stringify({ txnId, sourceAccId, destAccId, amount: 10000 }),
  status: "PENDING"
});

// Step B: Outbox Relay Worker publishes to Apache Kafka asynchronously
// Kafka Topic: "financial.transfers.completed"
// Consumer 1 -> Email / SMS Notification Service
// Consumer 2 -> Analytics / Fraud Monitoring Engine`,
    details: [
      "Transactional Outbox pattern prevents dual-write failures (DB commit succeeds but Kafka down)",
      "Event relay worker polls outbox table with backoff and publishes to Kafka with At-Least-Once delivery",
      "Decouples heavy notification & analytics jobs from synchronous HTTP request flow",
    ],
    quote: "// outbox pattern guarantees eventual consistency without blocking client HTTP responses",
  },
  {
    id: 7,
    phase: "07. DISTRIBUTED FAILURE RECOVERY & RECONCILIATION",
    title: "Handling Third-Party Gateway Failures & Dead-Letter Queues",
    badge: "RESILIENCE",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-800",
    details: [
      "Timeout Policy: External bank gateway API fetch set to AbortSignal.timeout(3000ms)",
      "If gateway times out, transaction status set to `PENDING_RECONCILIATION` (Not 500 Error)",
      "Background reconciliation worker queries gateway status via polling worker every 60 seconds",
      "Unresolvable failures pushed to Dead-Letter Queue (DLQ) for manual financial operations audit",
    ],
    quote: "// a financial system is reliable because third-party failure was designed for",
  },
];

export default function MoneyTransferCaseStudy() {
  const [activeStepId, setActiveStepId] = useState(1);

  const currentStep = CASE_STEPS.find((s) => s.id === activeStepId) || CASE_STEPS[0];

  return (
    <div className="sketch-card p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <span className="sticker-tag-red text-xs uppercase font-bold mb-1">
            END-TO-END CASE STUDY
          </span>
          <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
            Money Transfer Architecture (₹10,000 Case Study)
          </h3>
          <p className="text-xs text-[#57534e] font-sans mt-0.5">
            Tracing a real financial transaction through business rules, DB row locks, idempotency, security, outbox events & observability.
          </p>
        </div>
        <span className="font-hand text-sm text-[#ff5e5b] font-bold mt-2 md:mt-0">
          "Customer transfers ₹10,000" → Banking Grade Pipeline
        </span>
      </div>

      {/* Stepper Stage Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-3 mb-6 -mx-1 px-1">
        {CASE_STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStepId(s.id)}
            className={`px-3 py-1.5 text-xs font-mono sketch-button whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeStepId === s.id
                ? "bg-[#ff5e5b] text-white font-bold"
                : s.id < activeStepId
                ? "bg-[#ffe866]/50 text-[#1e1d1b]"
                : "bg-white text-[#1e1d1b]"
            }`}
          >
            <span>STEP {s.id}</span>
          </button>
        ))}
      </div>

      {/* Active Step Panel */}
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-4 sm:p-6 sketch-card bg-[#f6f4ee] min-w-0 max-w-full overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between  pb-3 mb-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#ff5e5b] block mb-1">
              {currentStep.phase}
            </span>
            <h4 className="text-lg font-mono font-black text-[#1e1d1b] break-words">
              {currentStep.title}
            </h4>
          </div>
          <span className={`sticker-tag text-[10px] font-mono uppercase mt-2 md:mt-0 self-start md:self-auto ${currentStep.badgeColor}`}>
            {currentStep.badge}
          </span>
        </div>

        {/* Code Snippet if present */}
        {currentStep.codeSnippet && (
          <div className="mb-4 min-w-0 max-w-full overflow-hidden">
            <pre className="p-3 sm:p-4 bg-[#1e1d1b] text-[#ffe866] font-mono text-[11px] sm:text-xs leading-relaxed rounded border border-[#57534e] overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre">
              {currentStep.codeSnippet}
            </pre>
          </div>
        )}

        {/* Details list */}
        <div className="space-y-2 mb-4 font-mono text-xs">
          {currentStep.details.map((detail, idx) => (
            <div key={idx} className="flex items-start space-x-2 p-2.5 bg-white sketch-border-sm">
              <CheckCircle2 className="w-4 h-4 text-[#2ecc71] shrink-0 mt-0.5" />
              <span className="font-sans text-xs font-medium text-[#1e1d1b]">{detail}</span>
            </div>
          ))}
        </div>

        {/* Footer quote & navigation */}
        <div className="pt-3 border-t border-dashed border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            {currentStep.quote}
          </span>
          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
            <button
              disabled={activeStepId === 1}
              onClick={() => setActiveStepId(activeStepId - 1)}
              className="px-3 py-1 sketch-button text-xs disabled:opacity-40"
            >
              ← Prev Step
            </button>
            <button
              disabled={activeStepId === CASE_STEPS.length}
              onClick={() => setActiveStepId(activeStepId + 1)}
              className="px-3 py-1 sketch-button text-xs bg-[#ffe866] font-bold disabled:opacity-40"
            >
              Next Step →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
