"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FolderGit2, 
  ArrowUpRight, 
  Wrench,
  Workflow,
  Sparkles,
  Layers,
  GitBranch
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
  color: string;
  badgeColor: string;
  summary: string;
  stats: { label: string; val: string }[];
  projects: ProjectDetail[];
}

const experiencesData: ExperienceCompany[] = [
  // 1. FREELANCE
  {
    id: "freelance",
    company: "Freelance & Independent Client Engineering",
    role: "Full Stack & Backend Specialist",
    period: "March 31, 2026 – Present",
    badge: "PRESENT // INDEPENDENT CONTRACTS",
    color: "border-[#ff5e5b] bg-[#ff5e5b]/5",
    badgeColor: "bg-[#ff5e5b] text-white",
    summary: "Architecting custom, production-grade enterprise backends, real-time collaboration engines, e-commerce platforms, and specialized B2B/B2C workflow systems for tech startups and international clients.",
    stats: [
      { label: "Production Systems", val: "7 Apps" },
      { label: "Ingestion Batch", val: "10k / 5s" },
      { label: "Latency Delta", val: "< 5ms" }
    ],
    projects: [
      {
        id: "freelance-ecommerce",
        title: "🛒 E-Commerce Platform",
        oneLiner: "High-concurrency fashion e-commerce backend with multi-variant catalog, session-bound inventory reservation, and resilient checkout pipelines.",
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
        technicalDetails: "Next.js 16, Node.js, PostgreSQL, Prisma ORM, Stripe API, Zod schema validation, Redis locks.",
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
        technicalDetails: "Next.js, Node.js, Fastify, Socket.io, MongoDB, Redis, Google Cloud VPS.",
        github: "https://github.com/navinO0/blood-app-server",
        liveUrl: "https://bloodlinkhelp.netlify.app/"
      },
      {
        id: "freelance-ai-coach",
        title: "🤖 AI Technical Interview Coach",
        oneLiner: "Generative AI technical interview simulator with architect-level feedback, local LLM GPU fallback, and candidate communication analytics.",
        overview: "An AI-powered interview simulator designed to conduct real-time technical and behavioral interview rounds, providing deep architect-level feedback on clarity, confidence, and system design.",
        categoryTag: "ai_security",
        keyMetric: "Ollama / GPU Node Fallback",
        responsibilities: [
          "Orchestrated Generative AI multi-agent workflows using Antigravity and Gemini Pro APIs for adaptive interview simulation",
          "Integrated local LLM backup fallback via Ollama / LMStudio running on dedicated GPU nodes to ensure 100% operational uptime when cloud quotas exhaust",
          "Built streaming response parser evaluating candidate answer clarity, technical depth, and communication nuances in real-time",
          "Designed adaptive difficulty algorithms scaling question complexity dynamically based on candidate performance"
        ],
        technicalDetails: "Next.js 14, Antigravity, Ollama, Gemini Pro, AWS Lambda, TypeScript, PostgreSQL.",
        github: "https://github.com/navinO0/ai-interview-coach",
        liveUrl: "https://interviewguideai.netlify.app/"
      },
      {
        id: "freelance-whiteboard",
        title: "🎨 Collaborative Real-Time Whiteboard",
        oneLiner: "Real-time room-based whiteboard application with Fastify WebSockets, Redis room state persistence, coordinate delta broadcasting, and canvas archives.",
        overview: "A multiplayer canvas collaboration platform allowing isolated private rooms to draw, erase, chat, and store drawings without latency degradation.",
        categoryTag: "realtime",
        keyMetric: "94% Payload Reduction via Vector Deltas",
        responsibilities: [
          "Built Fastify WebSocket room server handling sub-5ms multi-user canvas drawing synchronization",
          "Reduced WebSocket broadcast payload size by 94% by switching from full canvas frame snapshots to coordinate delta vector streams",
          "Integrated Redis for in-memory room state storage, allowing instant canvas state recovery upon user page reload",
          "Engineered long-term PostgreSQL snapshot archival service for preserving completed whiteboard sessions"
        ],
        technicalDetails: "Fastify, Next.js, WebSockets, Socket.io, Redis, PostgreSQL, Docker, PM2.",
        github: "https://github.com/navinO0/cbwb-server",
        liveUrl: "https://cbwb.netlify.app/"
      },
      {
        id: "freelance-qrauth",
        title: "📱 Secondary Device Linking & QR Auth",
        oneLiner: "Multi-device authentication system using QR codes, 1-hour session timeout, 3-minute single-use Redis nonces, and CryptoJS encryption.",
        overview: "Designed to provide seamless multi-device linking for banking and secure enterprise applications by scanning single-use QR codes from primary mobile sessions.",
        categoryTag: "ai_security",
        keyMetric: "3-Min Single-Use Redis Nonce",
        responsibilities: [
          "Designed multi-device authentication protocol allowing users to securely pair up to 2 secondary devices per active session",
          "Implemented short-lived 3-minute QR code validity powered by dynamic single-use Redis TTL nonces to prevent replay attacks",
          "Built CryptoJS payload encryption for secure device handshake exchanges over public networks",
          "Enforced strict 1-hour session expiration and automatic token revocation"
        ],
        technicalDetails: "Next.js, Node.js, PostgreSQL, CryptoJS, JWT, Redis, Docker, PM2.",
        github: "https://github.com/navinO0/qr-login-nextjs",
        liveUrl: "https://qrauthnext.netlify.app/login"
      }
    ]
  },

  // 2. ZEKSTA TECHNOLOGY
  {
    id: "zeksta",
    company: "Zeksta Technology Pvt Ltd",
    role: "Software Engineer (Fintech Lead)",
    period: "Until March 31, 2026",
    badge: "CORE EMPLOYMENT // FINTECH",
    color: "border-[#1e1d1b] bg-[#ffe866]/20",
    badgeColor: "bg-[#ffe866] text-[#1e1d1b]",
    summary: "Lead Backend Engineer for the Sangamam Cooperative Banking Ecosystem. Single-handedly architected and delivered core financial modules under crushing time constraints with extreme velocity.",
    stats: [
      { label: "Code Delivery", val: "50k+ Lines / 50 Days" },
      { label: "API Modules", val: "4 Core / 45+ REST APIs" },
      { label: "Commit Cadence", val: "173 Commits" }
    ],
    projects: [
      {
        id: "zeksta-sangamam",
        title: "🏦 Sangamam Core Banking Platform",
        titleSub: "Customer & Agent Mobile Backend Ecosystem",
        oneLiner: "Architected and delivered 4 core banking modules from scratch, shipping 20+ major features, 45+ REST APIs, and 50,000+ lines of code within 3 months.",
        overview: "Demonstrated high-velocity execution by maintaining a relentless 173-commit cadence across 50 active engineering days under crushing deadlines. Built the entire backend infrastructure powering mobile customer onboarding, agent collection apps, fund transfers, and administrative reporting.",
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
          "📊 Admin Reporting & Accounting Engine: Built a comprehensive reporting engine from scratch (4,000+ lines of logic) serving as the data backbone for admin dashboards with granular branch-level RBAC.",
          "📒 General Ledger System: Engineered full double-entry General Ledger (GL) voucher accounting system requiring multi-step balancing workflows and document attachments.",
          "☁️ Cloud Infrastructure & AWS ECS: Orchestrated resilient containerized microservices on AWS ECS, utilizing S3 for compliance document storage, behind secure API gateway load balancers.",
          "🛠️ Standards & Documentation: Established baseline database migrations, standardized TypeScript types, and 100% Swagger API documentation adopted across the entire platform scale."
        ],
        workflowStages: [
          "Mobile Onboarding: Aadhaar OTP verification -> account linking -> MPIN setup -> secure session generation with device fingerprinting.",
          "Fund Transfer: Initiate via Redis (payload & OTP TTL validation) -> Confirm (atomic debit + credit in a single two-phase commit transaction).",
          "Wallet Fund Request: Admin initiation -> secure AWS S3 document attachment -> Super Admin atomic approval.",
          "Ledger Voucher Processing: Multi-step balancing workflow requiring document attachments, commission splits, and double-entry GL postings."
        ],
        technicalDetails: "Node.js, Express, Sequelize ORM, PostgreSQL, Redis, AWS ECS, AWS S3, Docker, PM2, TypeScript, Swagger.",
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
    color: "border-[#2563eb] bg-[#2563eb]/5",
    badgeColor: "bg-[#2563eb] text-white",
    summary: "Engineered mission-critical backend modules for major government civil court web applications (eNibandan) and land transaction systems (MPWebGIS).",
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
        overview: "Active lead backend engineer on the second largest civil court module (following land registration), handling complete workflow automation, notice period scheduling, and biometric eKYC verification.",
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
        technicalDetails: "Node.js, Express, PostgreSQL, Knex.js, Cron schedulers, eKYC integration."
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
        technicalDetails: "Node.js, Express.js, Knex.js, PostgreSQL, Redis caching, Cron schedulers, GIS APIs."
      },
      {
        id: "quantela-ai-infra",
        title: "🧠 Enterprise AI Search & IaC Infrastructure",
        oneLiner: "Local LLM integration with Ollama and Terraform cloud automation for enterprise microservices.",
        overview: "Integrated local LLMs (Ollama) into internal developer tools, reducing search time by 60% and automating infrastructure deployment across cloud environments.",
        categoryTag: "ai_security",
        keyMetric: "-60% Search Lead Time / Terraform IaC",
        responsibilities: [
          "Integrated local LLM runtime (Ollama) for internal code and documentation search, speeding up dev search by 60%",
          "Automated infrastructure provisioning across AWS using Terraform, reducing deployment lead time significantly",
          "Optimized PostgreSQL query layer for 40% improvement in AWS cloud resource utilization"
        ],
        technicalDetails: "Node.js, Fastify, Ollama, Terraform, AWS, PostgreSQL."
      }
    ]
  }
];

export default function ExperienceResumeSection() {
  return (
    <section id="experience" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="sticker-tag bg-[#1e1d1b] text-white font-bold">COMPANY-FIRST HIERARCHY</span>
          <span className="sticker-tag bg-[#ffe866] text-[#1e1d1b] font-bold">ALL DELIVERABLES EXPANDED</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1e1d1b] font-mono">
          engineering resume <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(experience & project post-mortems)</span>
        </h2>
        <p className="text-sm font-sans text-[#57534e] mt-1 max-w-3xl font-medium">
          Structured by company experience. Each role details the exact systems architected, production challenges solved, and full code deliverables.
        </p>
      </div>

      {/* COMPANY STACK LIST */}
      <div className="space-y-12">
        {experiencesData.map((exp, expIdx) => (
          <div 
            key={exp.id} 
            className={`sketch-card p-6 md:p-8 bg-white border-2 ${exp.color} relative overflow-hidden`}
          >
            {/* COMPANY HEADER BLOCK */}
            <div className="pb-6 border-b-2 border-dashed border-[#1e1d1b] mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded sketch-border-sm ${exp.badgeColor}`}>
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#57534e] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ff5e5b]" />
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-mono text-[#1e1d1b] flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[#ff5e5b]" />
                    {exp.company}
                  </h3>
                  <p className="text-base font-hand font-bold text-[#ff5e5b] mt-0.5">
                    // {exp.role}
                  </p>
                </div>

                {/* Company Stats Grid */}
                <div className="grid grid-cols-3 gap-2 shrink-0 self-start md:self-auto">
                  {exp.stats.map((st, i) => (
                    <div key={i} className="bg-[#f6f4ee] p-2 border border-[#1e1d1b] text-center sketch-border-sm">
                      <span className="font-mono text-[9px] text-[#57534e] block uppercase font-semibold">{st.label}</span>
                      <span className="font-mono text-xs font-black text-[#1e1d1b]">{st.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Summary Narrative */}
              <p className="text-xs md:text-sm font-sans text-[#1e1d1b] leading-relaxed font-medium bg-[#f6f4ee] p-3.5 border border-[#1e1d1b] sketch-border-sm">
                "{exp.summary}"
              </p>
            </div>

            {/* PROJECTS UNDER THIS COMPANY HEADER */}
            <div>
              <span className="font-mono text-xs font-bold uppercase text-[#57534e] tracking-wider block mb-6 pb-2 border-b border-dashed border-[#1e1d1b]">
                🚀 SYSTEMS ARCHITECTED UNDER {exp.company.toUpperCase()} ({exp.projects.length} PROJECTS):
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exp.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="sketch-card p-5 md:p-6 bg-white border-2 border-[#1e1d1b] flex flex-col justify-between relative"
                  >
                    {/* Metric Badge */}
                    {proj.keyMetric && (
                      <div className="absolute top-0 right-0 bg-[#ffe866] text-[#1e1d1b] text-[10px] font-mono font-bold px-3 py-1 border-b border-l border-[#1e1d1b] sketch-border-sm">
                        ⚡ {proj.keyMetric}
                      </div>
                    )}

                    <div>
                      {/* Project Title & Links */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2 pt-1">
                        <div>
                          <span className="sticker-tag text-[9px] uppercase mb-1 font-bold">
                            {proj.categoryTag.replace("_", " ")}
                          </span>
                          <h4 className="font-mono font-bold text-lg md:text-xl text-[#1e1d1b]">
                            {proj.title}
                          </h4>
                          {proj.titleSub && (
                            <span className="text-xs font-sans font-bold text-[#57534e] block">
                              {proj.titleSub}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noreferrer"
                              className="sketch-button px-2 py-1 text-xs font-mono font-bold bg-[#f6f4ee] flex items-center gap-1 hover:bg-[#1e1d1b] hover:text-white transition-colors"
                            >
                              <FolderGit2 className="w-3.5 h-3.5" />
                              <span>Repo</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="sketch-button px-2 py-1 text-xs font-mono font-bold bg-[#ffe866] flex items-center gap-1 text-[#1e1d1b]"
                            >
                              <span>Live</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* One Liner */}
                      <p className="text-xs font-mono font-bold text-[#ff5e5b] mb-3 bg-[#ff5e5b]/5 p-2.5 border border-[#ff5e5b]/20 sketch-border-sm">
                        /* {proj.oneLiner} */
                      </p>

                      {/* Overview */}
                      <p className="text-xs md:text-sm font-sans text-[#1e1d1b] leading-relaxed mb-4 font-medium">
                        {proj.overview}
                      </p>

                      {/* Visual Architecture Flow Diagram (If available) */}
                      {proj.architectureDiagram && (
                        <div className="my-3 p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                          <span className="font-mono text-[11px] font-bold text-[#1e1d1b] uppercase block mb-1.5">
                            🗺️ VISUAL DATA PIPELINE:
                          </span>
                          <div className="space-y-1 text-xs font-mono text-[#1e1d1b]">
                            {proj.architectureDiagram.map((st, sti) => (
                              <div key={sti} className="flex items-center gap-1.5">
                                <span className="text-[#ff5e5b] font-bold">{sti + 1}.</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Multi-Role Approval Workflow (If available) */}
                      {proj.rolesBreakdown && (
                        <div className="my-3 p-3 bg-[#e0f2fe]/40 border border-[#075985] sketch-border-sm">
                          <span className="font-mono text-[11px] font-bold text-[#075985] uppercase block mb-1.5">
                            👥 MULTI-ROLE APPROVAL WORKFLOW:
                          </span>
                          <ul className="space-y-1 text-xs font-mono text-[#1e1d1b]">
                            {proj.rolesBreakdown.map((rb, rbi) => (
                              <li key={rbi} className="flex items-start gap-1">
                                <span className="text-[#075985] font-bold">›</span>
                                <span>{rb}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* ALL DELIVERABLES FULLY EXPANDED */}
                      <div className="my-3">
                        <span className="font-mono text-[11px] font-bold uppercase text-[#57534e] block mb-2">
                          ⚙️ ARCHITECTURAL RESPONSIBILITIES & CODE DELIVERABLES:
                        </span>
                        <ul className="space-y-2">
                          {proj.responsibilities.map((resp, ri) => (
                            <li key={ri} className="flex items-start space-x-2 text-xs md:text-sm font-sans text-[#1e1d1b]">
                              <CheckCircle2 className="w-4 h-4 text-[#ff5e5b] shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack Footer */}
                    <div className="mt-4 pt-3 border-t border-dashed border-[#1e1d1b]/30 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-[#57534e] gap-1">
                      <div className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-[#ff5e5b]" />
                        <span><strong className="text-[#1e1d1b]">Stack:</strong> {proj.technicalDetails}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
