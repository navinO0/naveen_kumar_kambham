"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FolderGit2, 
  ArrowUpRight, 
  Wrench,
  Sparkles,
  Layers
} from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  titleSub?: string;
  oneLiner: string;
  overview: string;
  categoryTag: "fintech" | "concurrency" | "realtime" | "ai_security" | "govt";
  responsibilities: string[];
  rolesBreakdown?: string[];
  workflowStages?: string[];
  architectureDiagram?: string[];
  technicalDetails: string;
  github?: string;
  liveUrl?: string;
  keyMetric?: string;
}

interface ExperienceCompany {
  id: string;
  company: string;
  role: string;
  period: string;
  badge: string;
  phaseLabel: string;
  accentGradient: string;
  nodeBg: string;
  summary: string;
  stats: { label: string; val: string }[];
  projects: ProjectDetail[];
}

const experiencesData: ExperienceCompany[] = [
  // 1. FREELANCE & INDEPENDENT
  {
    id: "freelance",
    company: "Freelance & Independent Client Engineering",
    role: "Full-Stack & Systems Specialist",
    period: "March 31, 2026 – Present",
    badge: "PRESENT // INDEPENDENT CONTRACTS",
    phaseLabel: "PHASE 03 // FULL-STACK ERA",
    accentGradient: "from-sky-500 to-indigo-600",
    nodeBg: "bg-sky-600 text-white ring-4 ring-sky-100",
    summary: "Architecting custom, production-grade enterprise backends, React/Next.js frontend UIs, real-time collaboration engines, e-commerce platforms, and specialized B2B/B2C workflow systems for tech startups and international clients.",
    stats: [
      { label: "Production Systems", val: "7 Apps" },
      { label: "Ingestion Batch", val: "10k / 5s" },
      { label: "Latency Delta", val: "< 5ms" }
    ],
    projects: [
      {
        id: "freelance-ecommerce",
        title: "🛒 E-Commerce Platform",
        oneLiner: "High-concurrency fashion e-commerce full-stack app with multi-variant catalog, session-bound inventory reservation, and resilient checkout pipelines.",
        overview: "Engineered a robust e-commerce engine designed to prevent race conditions during high-concurrency checkout waves while ensuring flawless media payload consistency across cart and payment steps.",
        categoryTag: "concurrency",
        keyMetric: "Redis Distributed Lock (30s TTL)",
        architectureDiagram: [
          "HTTP Checkout Request",
          "Zod Schema Validation",
          "Redis SETNX Inventory Lock (30s TTL)",
          "PostgreSQL Stock Reservation Tx",
          "Stripe Webhook Event Idempotency"
        ],
        responsibilities: [
          "Designed a multi-variant product catalog schema mapping complex SKU attributes (size, color, material, stock counts)",
          "Implemented session-bound inventory reservation locks in Redis (`SETNX` with 30s TTL) to eliminate stock overselling during flash checkout rushes",
          "Created a standardized `resolveImageUrl` media fallback utility ensuring nested variant thumbnails are cleanly resolved across instant 'Buy Now' and persistent cart flows",
          "Engineered idempotent Stripe webhook handlers with event log tracking for automatic order fulfillment and automated inventory reconciliation"
        ],
        technicalDetails: "Next.js 16, React, Node.js, PostgreSQL, Prisma ORM, Stripe API, Zod schema validation, Redis locks.",
        github: "https://github.com/navinO0/fashion-demostore-platform"
      },
      {
        id: "freelance-hrms",
        title: "🏢 HRMS Lite (hrms-v1)",
        titleSub: "Human Resource Management System",
        oneLiner: "Lightweight HRMS backend with biometric attendance ingestion, granular RBAC, automated payroll calculation, and instant JWT session revocation.",
        overview: "Built to solve high-frequency morning rush bottlenecks when thousands of employees check in simultaneously via biometric devices, preventing database deadlock crashes while keeping employee data strictly governed.",
        categoryTag: "concurrency",
        keyMetric: "10,000 Punch-ins -> 5s Batch Insert",
        architectureDiagram: [
          "10,000+ Biometric Devices",
          "Redis Ingestion List Queue",
          "5-Second Cron Ingestion Worker",
          "PostgreSQL Batch Insert (ON CONFLICT DO NOTHING)",
          "Automated Payroll Ledger Update"
        ],
        responsibilities: [
          "Engineered a biometric punch-in ingestion queue using Redis lists, buffering 10,000+ morning 9:00 AM check-in events into 5-second transactional PostgreSQL batch inserts (`INSERT ... ON CONFLICT DO NOTHING`)",
          "Implemented granular Role-Based Access Control (RBAC) middleware enforcing strict permission boundaries across Admin, HR Manager, and Employee roles",
          "Designed automated payroll calculation engine evaluating tax deductions, leaves, unpaid mark-offs, and net monthly payouts",
          "Built a JWT session revocation blacklist in Redis for instant employee offboarding and immediate credential invalidation"
        ],
        technicalDetails: "Fastify, TypeScript, PostgreSQL, Prisma, Redis in-memory queues, JWT authentication.",
        github: "https://github.com/navinO0/hrms-v1-backend"
      },
      {
        id: "freelance-garment",
        title: "🧵 Garment Production & Invoicing Engine",
        oneLiner: "Multi-currency B2B bulk invoicing engine, automated tax/GST routines, transactional garment production workflow tracker, and asynchronous PDF rendering workers.",
        overview: "Designed for garment manufacturing factories to manage complex production cycles (cutting -> stitching -> QC -> packing) and generate multi-tier tax invoices without blocking server HTTP threads.",
        categoryTag: "concurrency",
        keyMetric: "Async PDF Worker via BullMQ",
        responsibilities: [
          "Engineered multi-currency B2B bulk invoicing engine with automated GST, regional tax, and volume discount calculation routines",
          "Built transactional garment production workflow tracker tracing raw fabric rolls and trim materials through to finished unit inventory ledgers",
          "Decoupled heavy 300DPI PDF document rendering from HTTP request handlers using Redis & BullMQ background job queues, streaming completed invoices via presigned download URLs",
          "Created audit-logged inventory ledger maintaining historical cost snapshots for every fabric batch"
        ],
        technicalDetails: "Node.js, Express, PostgreSQL, Redis, BullMQ, PDFKit, Zod schemas.",
        github: "https://github.com/navinO0/garment-production-invoice-engine"
      },
      {
        id: "freelance-bloodlink",
        title: "🩸 BloodLink Emergency Matching Platform",
        oneLiner: "Real-time emergency blood donation matching platform connecting seekers with nearby verified donors, donor health cooling state machine, and GIS radius search.",
        overview: "A mission-critical life-saving application built for rapid emergency response, enforcing donor health safety while guaranteeing zero duplicate claims when emergency notifications trigger.",
        categoryTag: "realtime",
        keyMetric: "Sub-Second Emergency Notification Push",
        responsibilities: [
          "Built WebSocket real-time push notification service dispatching immediate emergency alerts to matching blood donors within a specified geographic radius",
          "Implemented an automated 90-day donor cooling period state machine to enforce health safety and restrict re-donations before eligibility",
          "Engineered Redis atomic locks (`SETNX`) on emergency donation requests to prevent duplicate acceptances when multiple donors respond simultaneously",
          "Built an administrative verification dashboard for authenticating medical requests and managing user access"
        ],
        technicalDetails: "Next.js, React, Node.js, Fastify, Socket.io, MongoDB, Redis, Google Cloud VPS.",
        github: "https://github.com/navinO0/blood-app-server",
        liveUrl: "https://bloodlinkhelp.netlify.app/"
      },
      {
        id: "freelance-smart-kitchen",
        title: "🍳 Smart Kitchen Ordering System & Live Order Tracking",
        oneLiner: "Real-time restaurant kitchen display system (KDS) & live order tracking pipeline with WebSockets, order state transition engine, and queue prioritization.",
        overview: "A high-concurrency real-time restaurant ordering and kitchen display management platform designed for multi-station kitchen operations with instant status synchronization across customer devices, POS terminals, and kitchen displays.",
        categoryTag: "realtime",
        keyMetric: "Sub-50ms WebSocket Order Dispatch",
        responsibilities: [
          "Engineered full-duplex WebSocket event pipeline (Socket.io / Fastify) broadcasting real-time order updates (Received → Preparing → Cooking → Ready → Delivered) across customer UI and Kitchen Display System (KDS)",
          "Built a Redis-backed priority queue engine handling peak restaurant rush ordering, isolating concurrent payment Webhooks and kitchen ticket updates",
          "Implemented state machine validation ensuring strict sequential order progression and preventing illegal status leaps",
          "Designed order history analytics & ticket completion time tracking metrics stored in PostgreSQL for kitchen performance optimization"
        ],
        technicalDetails: "Next.js, React, Fastify, WebSockets, Socket.io, Node.js, PostgreSQL, Redis, TailwindCSS.",
        github: "https://github.com/navinO0/smart-kitchen-ordering",
        liveUrl: "https://smartkitchenorder.netlify.app/"
      }
    ]
  },

  // 2. ZEKSTA TECHNOLOGY
  {
    id: "zeksta",
    company: "Zeksta Technology Pvt Ltd",
    role: "Full-Stack & Fintech Lead Engineer",
    period: "Until March 31, 2026",
    badge: "CORE EMPLOYMENT // FINTECH LEAD",
    phaseLabel: "PHASE 02 // FINTECH CORE ERA",
    accentGradient: "from-blue-600 to-cyan-600",
    nodeBg: "bg-blue-600 text-white ring-4 ring-blue-100",
    summary: "Lead Full-Stack Engineer for the Sangamam Cooperative Banking Ecosystem. Single-handedly architected and delivered core financial modules, mobile API endpoints, and React admin dashboards under crushing time constraints.",
    stats: [
      { label: "Code Delivery", val: "50k+ Lines / 50 Days" },
      { label: "API Modules", val: "4 Core / 45+ REST APIs" },
      { label: "Commit Cadence", val: "173 Commits" }
    ],
    projects: [
      {
        id: "zeksta-sangamam",
        title: "🏦 Sangamam Core Banking Platform",
        titleSub: "Customer & Agent Mobile Backend & Admin Portal",
        oneLiner: "Architected and delivered 4 core banking modules from scratch, shipping 20+ major features, 45+ REST APIs, and 50,000+ lines of code within 3 months.",
        overview: "Demonstrated high-velocity execution by maintaining a relentless 173-commit cadence across 50 active engineering days under crushing deadlines. Built the entire backend infrastructure and React admin dashboards powering customer onboarding, agent collection apps, fund transfers, and reporting.",
        categoryTag: "fintech",
        keyMetric: "Two-Phase Commit ACID Integrity",
        architectureDiagram: [
          "Mobile App MPIN & Device Binding",
          "Redis Rate-Limit & OTP Nonce Check",
          "PostgreSQL Two-Phase Commit Transaction",
          "Atomic Debit + Credit Balance Execution",
          "Double-Entry General Ledger Posting"
        ],
        responsibilities: [
          "⚙️ Mobile Onboarding & Device Security: Designed and shipped customer and agent mobile app backends with Aadhaar OTP verification, MPIN setup, account linking, and strict device binding for maximum security.",
          "💸 Fund Transfer Engine: Built intra-bank transfer flow utilizing a two-phase commit pattern in PostgreSQL transactions, atomic debit+credit execution, Redis rate-limiting, counterparty visibility, and automated commission calculations.",
          "📊 Admin Reporting & Accounting Engine: Built a comprehensive reporting engine from scratch (4,000+ lines of logic) serving as the data backbone for React admin dashboards with granular branch-level RBAC.",
          "📒 General Ledger System: Engineered full double-entry General Ledger (GL) voucher accounting system requiring multi-step balancing workflows and document attachments.",
          "☁️ Cloud Infrastructure & AWS ECS: Orchestrated resilient containerized microservices on AWS ECS, utilizing S3 for compliance document storage, behind secure API gateway load balancers.",
          "🛠️ Standards & Documentation: Established baseline database migrations, standardized TypeScript types, and 100% Swagger API documentation adopted across the entire platform scale."
        ],
        technicalDetails: "Next.js, React, Node.js, Express, Sequelize ORM, PostgreSQL, Redis, AWS ECS, AWS S3, Docker, PM2, TypeScript, Swagger.",
        github: "https://github.com/Zeksta-Technology-Pvt-Ltd/sangamam-backend"
      }
    ]
  },

  // 3. QUANTELA & INNOVATION LAB
  {
    id: "quantela",
    company: "Quantela & Innovation Lab",
    role: "Associate Software Engineer",
    period: "Previous Role",
    badge: "ENTERPRISE & GOVT E-SERVICES",
    phaseLabel: "PHASE 01 // ENTERPRISE & GOVT ERA",
    accentGradient: "from-emerald-600 to-teal-600",
    nodeBg: "bg-emerald-600 text-white ring-4 ring-emerald-100",
    summary: "Engineered mission-critical full-stack modules for major government civil court web applications (eNibandan) and land transaction systems (MPWebGIS).",
    stats: [
      { label: "Govt Modules", val: "Civil Court & Land" },
      { label: "Record Scale", val: "1M+ Active Records" },
      { label: "Dev Search AI", val: "+60% Speedup" }
    ],
    projects: [
      {
        id: "quantela-marriage",
        title: "📜 Civil Court Marriage Registration Engine",
        titleSub: "eNibandan Govt Civil Court Web Module",
        oneLiner: "Government civil court web application module handling the full lifecycle of legal marriage applications, multi-tier officer approvals, and automated 30-day notice objection periods.",
        overview: "Active lead backend & web engineer on the second largest civil court module (following land registration), handling complete workflow automation, notice period scheduling, and biometric eKYC verification.",
        categoryTag: "govt",
        keyMetric: "Automated 30-Day Objection Scheduler",
        architectureDiagram: [
          "Citizen Online Form Submission",
          "Assistant Officer Document Verification",
          "Sub-Registrar (SRO) Approval",
          "Automated 30-Day Objection Cron Scheduler",
          "OSR Biometric eKYC Certificate Release"
        ],
        rolesBreakdown: [
          "Citizen Role: Bride and bridegroom details registration, secure application payment processing.",
          "Assistant to Sub-Registrar: Document verification, authority to approve or send back for corrections.",
          "Sub-Registrar (SRO): Comprehensive review, approval/rejection authority, entering approved applications into mandatory 30-day notice objection period.",
          "Operator to Sub-Registrar (OSR): Biometric verification (eKYC) and final marriage certificate record issuance."
        ],
        responsibilities: [
          "Engineered complete 4-role state machine managing transitions between Citizen -> Assistant -> Sub-Registrar -> OSR eKYC",
          "Automated 30-day objection notice tracking using node-cron schedulers, automatically transitioning un-objected applications to appointment-ready status",
          "Integrated secure biometric eKYC verification data handling and digital certificate record generation",
          "Optimized PostgreSQL database schemas for legal compliance and auditability"
        ],
        technicalDetails: "JavaScript, React, Node.js, Express, PostgreSQL, Knex.js, Cron schedulers, eKYC integration."
      },
      {
        id: "quantela-premutation",
        title: "MAP MP Land Transaction Premutation System",
        titleSub: "MPWebGIS / IGRS Department Module",
        oneLiner: "MP Government land transaction system facilitating land partition sales, GIS visual selection, real-time availability validation, and automated payment deadline releases.",
        overview: "Facilitates seller and buyer land partition transactions by integrating GIS visual land sketch selection with real-time double-transaction prevention.",
        categoryTag: "govt",
        keyMetric: "48h Auto-Release & GIS Partition Logic",
        responsibilities: [
          "Developed and maintained the Premutation Module verifying land sketch transactions submitted to the IGRS department",
          "Integrated GIS-based visual land selection enabling users to select partition boundaries directly via GIS interfaces",
          "Integrated real-time availability checks preventing concurrent transaction attempts on the same land partition",
          "Enforced 48-hour payment validation rules: if payment is incomplete after 48h, cron automatically releases the land back to the public pool; if left un-submitted for 72h, it is auto-rejected",
          "Optimized high-volume land record database queries using Knex.js and Redis temporary caching, handling peak loads of 1M+ active records"
        ],
        technicalDetails: "JavaScript, Node.js, Express.js, Knex.js, PostgreSQL, Redis caching, Cron schedulers, GIS APIs."
      }
    ]
  }
];

export default function ExperienceResumeSection() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto bg-white">
      {/* Minimalist Section Header */}
      <div className="mb-14 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            JOURNEY & CAREER TIMELINE
          </span>
          <span className="font-mono text-[11px] font-medium text-slate-400">
            // MINIMALIST NARRATIVE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-mono tracking-tight">
          engineering resume <span className="text-xl md:text-2xl text-sky-600 font-normal ml-2 font-sans">(full-stack journey)</span>
        </h2>
        <p className="text-base text-slate-500 font-sans mt-3 font-normal leading-relaxed">
          A continuous, chronological progression of engineering milestones, systems architected, and real-world code deliverables.
        </p>
      </div>

      {/* MINIMALIST VERTICAL TIMELINE TRACK */}
      <div className="relative pl-6 sm:pl-10 space-y-16">
        {/* Sleek Vertical Connecting Line */}
        <div className="absolute left-2 sm:left-4 top-4 bottom-4 w-[2px] bg-slate-200 rounded-full" />

        {experiencesData.map((exp, expIdx) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Pulsing Node */}
            <div className={`absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-110 z-10 ${exp.nodeBg}`}>
              0{expIdx + 1}
            </div>

            {/* MINIMALIST WHITE CARD SURFACE */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              
              {/* ERA HEADER */}
              <div className="pb-6 border-b border-slate-100 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-3 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-gradient-to-r ${exp.accentGradient} text-white`}>
                        {exp.phaseLabel}
                      </span>
                      <span className="font-mono text-xs font-medium text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-0.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 flex items-center gap-2.5">
                      <Building2 className="w-6 h-6 text-sky-600 shrink-0" />
                      <span>{exp.company}</span>
                    </h3>
                    <p className="text-base font-mono font-medium text-sky-600 mt-1">
                      // {exp.role}
                    </p>
                  </div>

                  {/* Minimal Stat Pills */}
                  <div className="flex flex-wrap gap-2 shrink-0 self-start md:self-auto">
                    {exp.stats.map((st, i) => (
                      <div key={i} className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 text-center">
                        <span className="font-mono text-[9px] text-slate-400 block uppercase font-medium">{st.label}</span>
                        <span className="font-mono text-xs font-bold text-slate-900">{st.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary narrative */}
                <p className="text-sm font-sans text-slate-600 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  "{exp.summary}"
                </p>
              </div>

              {/* PROJECTS DELIVERED IN THIS ERA */}
              <div className="space-y-6">
                <span className="font-mono text-xs font-semibold uppercase text-slate-400 tracking-wider block">
                  SYSTEMS & APPS DELIVERED ({exp.projects.length}):
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {exp.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-50/50 hover:bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Category & Metric */}
                        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                            {proj.categoryTag.replace("_", " ")}
                          </span>
                          {proj.keyMetric && (
                            <span className="font-mono text-[10px] font-semibold text-slate-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                              ⚡ {proj.keyMetric}
                            </span>
                          )}
                        </div>

                        {/* Title & Links */}
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div>
                            <h4 className="font-mono font-bold text-lg md:text-xl text-slate-900">
                              {proj.title}
                            </h4>
                            {proj.titleSub && (
                              <span className="text-xs font-sans text-slate-500 font-medium block">
                                {proj.titleSub}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {proj.github && (
                              <a
                                href={proj.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
                                title="View Repository"
                              >
                                <FolderGit2 className="w-4 h-4" />
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-slate-900 text-white hover:bg-sky-600 transition-colors"
                                title="Live Demo"
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* One Liner */}
                        <p className="text-xs font-mono text-slate-600 font-medium mb-3 bg-white p-3 rounded-xl border border-slate-100">
                          /* {proj.oneLiner} */
                        </p>

                        {/* Overview */}
                        <p className="text-xs md:text-sm font-sans text-slate-600 leading-relaxed mb-4 font-normal">
                          {proj.overview}
                        </p>

                        {/* Visual Data Pipeline */}
                        {proj.architectureDiagram && (
                          <div className="my-3 p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-1">
                            <span className="text-[10px] text-sky-400 font-semibold uppercase block mb-1">
                              🗺️ DATA PIPELINE:
                            </span>
                            {proj.architectureDiagram.map((st, sti) => (
                              <div key={sti} className="flex items-center gap-2 text-[11px]">
                                <span className="text-sky-400 font-bold">{sti + 1}.</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Deliverables Checklist */}
                        <div className="my-3 space-y-2">
                          <span className="font-mono text-[11px] font-semibold uppercase text-slate-400 block">
                            ARCHITECTURAL RESPONSIBILITIES & DELIVERABLES:
                          </span>
                          <ul className="space-y-2">
                            {proj.responsibilities.map((resp, ri) => (
                              <li key={ri} className="flex items-start gap-2.5 text-xs font-sans text-slate-700 leading-relaxed font-normal">
                                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Details Footer */}
                      <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span><strong className="text-slate-800">Stack:</strong> {proj.technicalDetails}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
