"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FolderGit2, 
  ArrowUpRight, 
  Wrench,
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
      { label: "Production Systems", val: "7 Systems" },
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
        title: "🏢 Atelier HRMS & Piece-Rate Payroll System (hrms-v1)",
        titleSub: "Manufacturing Workforce Management & Shift Regularization Platform",
        oneLiner: "Enterprise manufacturing workforce management engine with shift clocking, auto-checkout regularization, piece-rate wage calculation, and automated payroll ledgers.",
        overview: "Architected and delivered a full-stack workforce and payroll management system for garment ateliers and manufacturing facilities. Combines biometric-style shift tracking with dual compensation models (salaried hours + craft piece-rate output), automated checkout regularization workflows, and instant multi-tier payroll ledger generation.",
        categoryTag: "fintech",
        keyMetric: "Piece-Rate + Shift Wage Engine | Auto-Regularization",
        architectureDiagram: [
          "Employee Shift Punch / Auto-Checkout Trigger",
          "Zod Schema Validation & Session Cookie Auth",
          "Attendance Regularization & Overtime Calculation",
          "Piece-Rate (Units × Price) + Hours Wage Aggregation",
          "PostgreSQL Ledger Commit via Sequelize Transactions"
        ],
        responsibilities: [
          "Architected Next.js 16 Server Actions backend handling employee shift clock-ins/outs with automatic checkout detection and overtime hour overrides (`overrideOtHours`)",
          "Engineered attendance regularization workflow allowing employees to submit checkout dispute requests with reasons, approved or rejected via administrative audit controls",
          "Implemented dual compensation payroll calculator supporting both fixed hourly/salaried tiers and craft piece-rate earnings (`pieceCount × unitPrice`) directly coupled to daily shifts",
          "Built production order assignment system (`Order` & `Assignment` models) linking factory technicians to work orders with timesheet entries, task notes, and photo evidence",
          "Constructed organizational hierarchy models (Departments, Custom Employment Types, and Pay Structures) backed by PostgreSQL connection pooling and Sequelize ORM migrations",
          "Secured administrative operations with HTTP-only cookie sessions, Zod runtime schema validation across 15+ server actions, and instant manual punch editing with audit tracking"
        ],
        technicalDetails: "Next.js 16, React 19, TypeScript, PostgreSQL, Sequelize ORM, Zod schemas, Server Actions, Tailwind CSS v4, Sonner.",
        github: "https://github.com/navinO0/hrms-atlier"
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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto bg-slate-50/80 border-y border-slate-200/90 rounded-3xl my-8">
      {/* Section Header */}
      <div className="mb-14 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-700 bg-sky-100 border border-sky-300/80 px-3 py-1 rounded-full">
            JOURNEY & CAREER TIMELINE
          </span>
          <span className="font-mono text-[11px] font-medium text-slate-500">
            // FULL-STACK ENGINEERING NARRATIVE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-mono tracking-tight">
          engineering resume <span className="text-xl md:text-2xl text-sky-600 font-normal ml-2 font-sans">(full-stack journey)</span>
        </h2>
        <p className="text-base text-slate-600 font-sans mt-3 font-normal leading-relaxed">
          A continuous, chronological progression of production milestones, high-concurrency systems architected, and verified engineering deliverables.
        </p>
      </div>

      {/* VERTICAL TIMELINE TRACK */}
      <div className="relative pl-6 sm:pl-10 space-y-16">
        {/* Sleek Vertical Connecting Line with high contrast */}
        <div className="absolute left-2 sm:left-4 top-4 bottom-4 w-[3px] bg-slate-300 rounded-full" />

        {experiencesData.map((exp, expIdx) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Pulsing Node */}
            <div className={`absolute -left-[29px] sm:-left-[39px] top-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold border-2 border-white shadow-md transition-transform group-hover:scale-110 z-10 ${exp.nodeBg}`}>
              0{expIdx + 1}
            </div>

            {/* HIGH-CONTRAST WHITE CARD SURFACE */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-slate-200/90 shadow-md shadow-slate-200/50 hover:shadow-lg transition-all duration-300">
              
              {/* ERA HEADER */}
              <div className="pb-6 border-b-2 border-slate-100 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-gradient-to-r ${exp.accentGradient} text-white shadow-xs`}>
                        {exp.phaseLabel}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-700 flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-mono text-slate-900 flex items-center gap-2.5">
                      <Building2 className="w-6 h-6 text-sky-600 shrink-0" />
                      <span>{exp.company}</span>
                    </h3>
                    <p className="text-base font-mono font-bold text-sky-600 mt-1">
                      // {exp.role}
                    </p>
                  </div>

                  {/* High-Contrast Stat Pills */}
                  <div className="flex flex-wrap gap-2.5 shrink-0 self-start md:self-auto">
                    {exp.stats.map((st, i) => (
                      <div key={i} className="bg-slate-50 border-2 border-slate-200/90 px-4 py-2.5 rounded-xl text-center shadow-2xs">
                        <span className="font-mono text-[10px] text-slate-500 block uppercase font-bold tracking-wider">{st.label}</span>
                        <span className="font-mono text-sm font-black text-slate-900">{st.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary narrative */}
                <p className="text-sm font-sans text-slate-700 leading-relaxed font-normal bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  "{exp.summary}"
                </p>
              </div>

              {/* PROJECTS DELIVERED IN THIS ERA (ONE PER ROW) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-slate-900 tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-600" />
                    SYSTEMS & APPS DELIVERED ({exp.projects.length}) — FULL-WIDTH DETAILED BREAKDOWN:
                  </span>
                </div>

                {/* Single Column Stack: ONE PROJECT PER ROW */}
                <div className="flex flex-col space-y-8">
                  {exp.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#fcfdfe] hover:bg-white rounded-2xl border-2 border-slate-200 hover:border-sky-500/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                    >
                      {/* Project Header Bar with distinct surface */}
                      <div className="bg-slate-100/80 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">
                            {proj.categoryTag.replace("_", " ")}
                          </span>
                          {proj.keyMetric && (
                            <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                              ⚡ {proj.keyMetric}
                            </span>
                          )}
                        </div>

                        {/* Direct Action Links */}
                        <div className="flex items-center gap-2 shrink-0">
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                              title="View GitHub Repository"
                            >
                              <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                              <span>Repository</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-sky-600 text-white border border-sky-600 hover:bg-sky-500 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                              title="View Live App"
                            >
                              <span>Live Platform</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Main Project Card Content */}
                      <div className="p-6 sm:p-8">
                        {/* Title & Subtitle */}
                        <div className="mb-4">
                          <h4 className="font-mono font-black text-xl sm:text-2xl text-slate-900">
                            {proj.title}
                          </h4>
                          {proj.titleSub && (
                            <span className="text-sm font-sans text-slate-600 font-semibold block mt-1">
                              {proj.titleSub}
                            </span>
                          )}
                        </div>

                        {/* High-Contrast One-Liner Box */}
                        <div className="bg-slate-100/90 border border-slate-300 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 font-medium mb-6 leading-relaxed">
                          <span className="text-sky-600 font-bold mr-1.5">/*</span>
                          {proj.oneLiner}
                          <span className="text-sky-600 font-bold ml-1.5">*/</span>
                        </div>

                        {/* 2-Column Responsive Body: Left Narrative & Deliverables | Right Architecture & Pipeline */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                          {/* Left Column: Overview & Responsibilities (7 cols) */}
                          <div className={proj.architectureDiagram ? "lg:col-span-7 space-y-5" : "lg:col-span-12 space-y-5"}>
                            <div>
                              <span className="font-mono text-[11px] font-bold uppercase text-slate-500 tracking-wider block mb-2">
                                SYSTEM OVERVIEW:
                              </span>
                              <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
                                {proj.overview}
                              </p>
                            </div>

                            {/* Architectural Responsibilities & Deliverables */}
                            <div className="pt-2">
                              <span className="font-mono text-[11px] font-bold uppercase text-slate-900 tracking-wider block mb-3">
                                ARCHITECTURAL RESPONSIBILITIES & CODE DELIVERABLES:
                              </span>
                              <ul className="space-y-2.5">
                                {proj.responsibilities.map((resp, ri) => (
                                  <li key={ri} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-800 leading-relaxed font-normal">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Roles Breakdown if present (e.g. Govt eNibandan) */}
                            {proj.rolesBreakdown && proj.rolesBreakdown.length > 0 && (
                              <div className="mt-4 p-4 bg-slate-100/80 border border-slate-200 rounded-xl space-y-2">
                                <span className="font-mono text-[11px] font-bold uppercase text-slate-900 block">
                                  MULTI-ROLE PERMISSION & WORKFLOW BREAKDOWN:
                                </span>
                                <ul className="space-y-1.5">
                                  {proj.rolesBreakdown.map((role, rbi) => (
                                    <li key={rbi} className="text-xs font-sans text-slate-700 flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                                      <span>{role}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Right Column: High-Contrast Visual Data Pipeline (5 cols) */}
                          {proj.architectureDiagram && (
                            <div className="lg:col-span-5 flex flex-col justify-between">
                              <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-2xl p-5 shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                                  <span className="text-xs text-sky-400 font-mono font-bold uppercase flex items-center gap-1.5">
                                    <span>🗺️</span>
                                    <span>DATA PIPELINE & TRANSACTION FLOW</span>
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                                    {proj.architectureDiagram.length} STAGES
                                  </span>
                                </div>

                                <div className="space-y-2.5 font-mono text-xs">
                                  {proj.architectureDiagram.map((st, sti) => (
                                    <div key={sti} className="relative">
                                      <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl hover:border-sky-500/50 transition-colors">
                                        <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 border border-sky-600/40 text-[10px] font-bold flex items-center justify-center shrink-0">
                                          {sti + 1}
                                        </span>
                                        <span className="text-slate-200 text-xs font-medium">{st}</span>
                                      </div>
                                      {sti < proj.architectureDiagram!.length - 1 && (
                                        <div className="w-[2px] h-2.5 bg-sky-500/30 ml-4.5 my-0.5" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Tech Stack Bar */}
                      <div className="bg-slate-100/90 border-t border-slate-200 px-6 sm:px-8 py-3.5 font-mono text-xs text-slate-800 flex flex-wrap items-center gap-2">
                        <Wrench className="w-4 h-4 text-sky-600 shrink-0" />
                        <strong className="text-slate-900 font-bold uppercase text-[11px] tracking-wider">Tech Stack:</strong>
                        <span className="text-slate-700 font-medium">{proj.technicalDetails}</span>
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
