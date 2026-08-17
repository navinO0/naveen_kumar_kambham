"use client";

import { HelpCircle, AlertCircle, ShieldAlert, CheckSquare } from "lucide-react";

const QUESTIONS = [
  { q: "Who is the user?", cat: "Identity", desc: "Customer, Admin, Partner API client, or internal background job?" },
  { q: "What problem are we solving?", cat: "Scope", desc: "Are we solving a real operational pain point or building an unnecessary abstraction?" },
  { q: "What is the expected behavior?", cat: "Happy Path", desc: "What does success look like, and what data payload should be returned?" },
  { q: "What happens when it fails?", cat: "Failure", desc: "Do we return 4xx/5xx errors, trigger retries, or fail gracefully with fallbacks?" },
  { q: "What happens when the same request arrives twice?", cat: "Idempotency", desc: "Will duplicate POST requests create duplicate orders or be safely deduplicated via Idempotency-Key?" },
  { q: "Who is allowed to perform the action?", cat: "RBAC", desc: "What role bitmask or policy is required to access this endpoint?" },
  { q: "What data is required?", cat: "Validation", desc: "What fields are required in the payload, and what are their strict Zod constraints?" },
  { q: "What data should never be collected?", cat: "Privacy", desc: "Are we accidentally storing raw credit cards, unhashed passwords, or PII?" },
  { q: "What are the expected traffic levels?", cat: "Scale", desc: "Is this 10 requests per hour or a 5,000 req/sec flash sale?" },
  { q: "What happens under concurrency?", cat: "Threading", desc: "Will simultaneous requests cause SQL race conditions on stock or account balances?" },
  { q: "What must be audited?", cat: "Compliance", desc: "Do financial, security, or data mutations need immutable audit log records?" },
  { q: "What must be reversible?", cat: "Transactions", desc: "Can orders be canceled, payments refunded, or inventory reservations released?" },
  { q: "What are the external dependencies?", cat: "Integrations", desc: "Are we relying on Stripe, Twilio, SendGrid, or third-party webhooks?" },
  { q: "What are the regulatory constraints?", cat: "Legal", desc: "Does GDPR, PCI-DSS, or SOC2 compliance dictate data retention policies?" },
  { q: "What happens if a third-party service is unavailable?", cat: "Resilience", desc: "Do we have circuit breakers, fallback queues, or timeouts in place?" },
];

export default function RequirementAnalysis() {
  return (
    <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
        <div>
          <span className="sticker-tag mb-1 uppercase text-xs font-bold">PRE-IMPLEMENTATION ANALYSIS</span>
          <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
            Before I Touch the Keyboard
          </h3>
          <p className="text-xs text-[#57534e] font-sans mt-0.5">
            Essential questions clarified before writing a single line of API code.
          </p>
        </div>
        <div className="font-hand text-base text-[#ff5e5b] font-bold mt-2 md:mt-0">
          "Most bugs are born before the code exists."
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUESTIONS.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sketch-card bg-[#f6f4ee] border border-[#1e1d1b] hover:bg-[#ffe866]/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-[#ff5e5b]">
                  QUESTION #{idx + 1}
                </span>
                <span className="sticker-tag text-[9px] uppercase font-mono">{item.cat}</span>
              </div>
              <h4 className="font-bold font-mono text-xs text-[#1e1d1b] leading-tight mb-2">
                "{item.q}"
              </h4>
              <p className="text-[11px] font-sans text-[#57534e] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
