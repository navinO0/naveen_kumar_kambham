"use client";

const QUESTIONS = [
  { q: "Who is the user?", cat: "Identity", desc: "Customer, Admin, Partner API client, or internal background job?", accent: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  { q: "What problem are we solving?", cat: "Scope", desc: "Are we solving a real operational pain point or building an unnecessary abstraction?", accent: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { q: "What is the expected behavior?", cat: "Happy Path", desc: "What does success look like, and what data payload should be returned?", accent: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  { q: "What happens when it fails?", cat: "Failure", desc: "Do we return 4xx/5xx errors, trigger retries, or fail gracefully with fallbacks?", accent: "bg-red-100 text-red-700", dot: "bg-red-500" },
  { q: "What happens when the same request arrives twice?", cat: "Idempotency", desc: "Will duplicate POST requests create duplicate orders or be safely deduplicated via Idempotency-Key?", accent: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  { q: "Who is allowed to perform the action?", cat: "RBAC", desc: "What role bitmask or policy is required to access this endpoint?", accent: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  { q: "What data is required?", cat: "Validation", desc: "What fields are required in the payload, and what are their strict Zod constraints?", accent: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  { q: "What data should never be collected?", cat: "Privacy", desc: "Are we accidentally storing raw credit cards, unhashed passwords, or PII?", accent: "bg-pink-100 text-pink-700", dot: "bg-pink-500" },
  { q: "What are the expected traffic levels?", cat: "Scale", desc: "Is this 10 requests per hour or a 5,000 req/sec flash sale?", accent: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
  { q: "What happens under concurrency?", cat: "Threading", desc: "Will simultaneous requests cause SQL race conditions on stock or account balances?", accent: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { q: "What must be audited?", cat: "Compliance", desc: "Do financial, security, or data mutations need immutable audit log records?", accent: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  { q: "What must be reversible?", cat: "Transactions", desc: "Can orders be canceled, payments refunded, or inventory reservations released?", accent: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  { q: "What are the external dependencies?", cat: "Integrations", desc: "Are we relying on Stripe, Twilio, SendGrid, or third-party webhooks?", accent: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  { q: "What are the regulatory constraints?", cat: "Legal", desc: "Does GDPR, PCI-DSS, or SOC2 compliance dictate data retention policies?", accent: "bg-red-100 text-red-700", dot: "bg-red-500" },
  { q: "What happens if a third-party service is unavailable?", cat: "Resilience", desc: "Do we have circuit breakers, fallback queues, or timeouts in place?", accent: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
];

export default function RequirementAnalysis() {
  return (
    <div className="my-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="sticker-tag uppercase text-xs font-bold">PRE-IMPLEMENTATION ANALYSIS</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
        <div>
          <h3 className="text-2xl md:text-3xl font-black font-mono text-[#1e1d1b]">
            Before I Touch the Keyboard
          </h3>
          <p className="text-sm text-[#57534e] font-sans mt-1 max-w-md">
            15 questions I answer before writing a single line of API code.
          </p>
        </div>
        <p className="font-hand text-base text-[#ff5e5b] font-bold shrink-0">
          "Most bugs are born before the code exists."
        </p>
      </div>

      {/* Creative masonry-style staggered grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUESTIONS.map((item, idx) => (
          <div key={idx} className={`group flex gap-3 p-4 rounded-2xl bg-white hover:shadow-md transition-shadow duration-200 ${idx % 5 === 2 ? "lg:col-span-1" : ""}`}>
            {/* Number + dot accent */}
            <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
              <span className={`w-6 h-6 rounded-full ${item.dot} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>
                {idx + 1}
              </span>
              <span className="w-0.5 flex-1 rounded-full bg-gray-100 min-h-[16px]" />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <span className={`inline-block text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full mb-2 ${item.accent}`}>
                {item.cat}
              </span>
              <h4 className="font-bold font-mono text-xs text-[#1e1d1b] leading-snug mb-1.5">
                "{item.q}"
              </h4>
              <p className="text-[11px] font-sans text-[#78716c] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
