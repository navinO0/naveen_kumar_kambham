"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Terminal,
  Zap,
  Code2,
  Lock,
  Cpu,
  Layers,
  FileText,
  Clock,
  ArrowRight,
  Database,
  Server,
  Wrench,
  LayoutGrid,
  ListFilter,
  Workflow,
  GitBranch,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  FolderGit2
} from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  titleSub?: string;
  oneLiner: string;
  overview: string;
  categoryTag: "fintech" | "concurrency" | "realtime" | "ai_security" | "govt";
  responsibilities?: string[];
  rolesBreakdown?: string[];
  workflowStages?: string[];
  technicalDetails: string;
  github?: string;
  liveUrl?: string;
  keyMetric?: string;
}

interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  badge: string;
  color: string;
  activeBg: string;
  tagColor: string;
  summary: string;
  stats: { label: string; val: string }[];
  projectsDetailed: ProjectDetail[];
}

export default function ExperienceResumeSection() {
  const [activeEraId, setActiveEraId] = useState<string>("freelance");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"dossier" | "timeline">("dossier");

  const experiences: ExperienceRole[] = [
    {
      id: "freelance",
      company: "Freelance & Independent Client Engineering",
      role: "Full Stack & Backend Specialist",
      period: "March 31, 2026 – Present",
      badge: "PRESENT // INDEPENDENT CONTRACTS",
      color: "bg-[#ff5e5b]/10 border-[#ff5e5b]",
      activeBg: "bg-[#ff5e5b] text-white",
      tagColor: "bg-[#ff5e5b] text-white",
      summary: "Architecting custom, production-grade enterprise backends, real-time collaboration engines, e-commerce platforms, and specialized B2B/B2C workflow systems for tech startups and international clients.",
      stats: [
        { label: "Production Apps", val: "7 Systems" },
        { label: "Ingestion Speed", val: "10k/5s Batch" },
        { label: "Latency Target", val: "<5ms Delta" }
      ],
      projectsDetailed: [
        {
          id: "freelance-ecommerce",
          title: "🛒 E-Commerce Platform",
          oneLiner: "High-concurrency fashion e-commerce backend with multi-variant catalog, session-bound inventory reservation, and resilient checkout pipelines.",
          overview: "Engineered a robust e-commerce engine designed to prevent race conditions during high-concurrency checkout waves while ensuring flawless media payload consistency across cart and payment steps.",
          categoryTag: "concurrency",
          keyMetric: "Redis Distributed Lock (30s TTL)",
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
    {
      id: "zeksta",
      company: "Zeksta Technology Pvt Ltd",
      role: "Software Engineer (Fintech Lead)",
      period: "Until March 31, 2026",
      badge: "CORE EMPLOYMENT // FINTECH",
      color: "bg-[#ffe866]/30 border-[#1e1d1b]",
      activeBg: "bg-[#ffe866] text-[#1e1d1b]",
      tagColor: "bg-[#ffe866] text-[#1e1d1b]",
      summary: "Lead Backend Engineer for the Sangamam Cooperative Banking Ecosystem. Single-handedly architected and delivered core financial modules under crushing time constraints with extreme velocity.",
      stats: [
        { label: "Code Delivery", val: "50k+ Lines / 50 Days" },
        { label: "API Modules", val: "4 Core / 45+ REST APIs" },
        { label: "Commit Cadence", val: "173 Commits" }
      ],
      projectsDetailed: [
        {
          id: "zeksta-sangamam",
          title: "🏦 Sangamam Core Banking Platform",
          titleSub: "Customer & Agent Mobile Backend Ecosystem",
          oneLiner: "Architected and delivered 4 core banking modules from scratch, shipping 20+ major features, 45+ REST APIs, and 50,000+ lines of code within 3 months.",
          overview: "Demonstrated high-velocity execution by maintaining a relentless 173-commit cadence across 50 active engineering days under crushing deadlines. Built the entire backend infrastructure powering mobile customer onboarding, agent collection apps, fund transfers, and administrative reporting.",
          categoryTag: "fintech",
          keyMetric: "Two-Phase Commit ACID Integrity",
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
    {
      id: "quantela",
      company: "Quantela & Innovation Lab",
      role: "Associate Software Engineer",
      period: "Previous Role",
      badge: "ENTERPRISE & GOVT E-SERVICES",
      color: "bg-[#2563eb]/10 border-[#2563eb]",
      activeBg: "bg-[#2563eb] text-white",
      tagColor: "bg-[#2563eb] text-white",
      summary: "Engineered mission-critical backend modules for major government civil court web applications (eNibandan) and land transaction systems (MPWebGIS).",
      stats: [
        { label: "Govt Modules", val: "Civil Court & Land" },
        { label: "Record Scale", val: "1M+ Active Records" },
        { label: "Dev Search AI", val: "+60% Speedup" }
      ],
      projectsDetailed: [
        {
          id: "quantela-marriage",
          title: "📜 Civil Court Marriage Registration Engine",
          titleSub: "eNibandan Govt Civil Court Web Module",
          oneLiner: "Government civil court web application module handling the full lifecycle of legal marriage applications, multi-tier officer approvals, and automated 30-day notice objection periods.",
          overview: "Active lead backend engineer on the second largest civil court module (following land registration), handling complete workflow automation, notice period scheduling, and biometric eKYC verification.",
          categoryTag: "govt",
          keyMetric: "Automated 30-Day Objection Scheduler",
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
          title: "🗺️ MP Land Transaction Premutation System",
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

  const currentEra = experiences.find((e) => e.id === activeEraId) || experiences[0];

  const filterOptions = [
    { id: "all", label: "All Systems" },
    { id: "fintech", label: "Fintech & Banking" },
    { id: "concurrency", label: "High-Concurrency & Queues" },
    { id: "realtime", label: "Real-Time WebSockets" },
    { id: "ai_security", label: "AI & Security Auth" },
    { id: "govt", label: "Govt E-Services & GIS" }
  ];

  const filteredProjects = currentEra.projectsDetailed.filter(
    (p) => selectedFilter === "all" || p.categoryTag === selectedFilter
  );

  return (
    <section id="experience" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sticker-tag">CAREER & DEEP WORK HISTORY</span>
            <span className="sticker-tag bg-[#1e1d1b] text-white">INTERACTIVE RESUME DOSSIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            engineering resume <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(architectural impact & post-mortems)</span>
          </h2>
        </div>

        {/* Layout Mode Selector (Creative Dossier vs Master Timeline) */}
        <div className="flex items-center gap-2 bg-[#f6f4ee] p-1.5 border-2 border-[#1e1d1b] sketch-border-sm self-start lg:self-auto">
          <span className="text-[11px] font-mono font-bold text-[#57534e] px-2 uppercase">View Mode:</span>
          <button
            onClick={() => setLayoutMode("dossier")}
            className={`px-3 py-1 text-xs font-mono font-bold sketch-button flex items-center gap-1.5 transition-all ${
              layoutMode === "dossier" ? "bg-[#1e1d1b] text-white" : "bg-white text-[#1e1d1b]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Interactive Dossier</span>
          </button>
          <button
            onClick={() => setLayoutMode("timeline")}
            className={`px-3 py-1 text-xs font-mono font-bold sketch-button flex items-center gap-1.5 transition-all ${
              layoutMode === "timeline" ? "bg-[#1e1d1b] text-white" : "bg-white text-[#1e1d1b]"
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Master Timeline</span>
          </button>
        </div>
      </div>

      {layoutMode === "dossier" ? (
        /* ==================== CREATIVE DOSSIER DASHBOARD LAYOUT ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR: Era Navigation & Key Metrics (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#f6f4ee] p-4 border-2 border-[#1e1d1b] sketch-card">
              <span className="font-mono text-xs font-bold text-[#57534e] uppercase tracking-wider block mb-3 pb-2 border-b border-dashed border-[#1e1d1b]">
                ⚡ SELECT ENGINEERING CHAPTER:
              </span>

              <div className="space-y-3">
                {experiences.map((exp) => {
                  const isActive = exp.id === activeEraId;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => {
                        setActiveEraId(exp.id);
                        setSelectedFilter("all");
                      }}
                      className={`w-full text-left p-4 sketch-button border-2 transition-all relative ${
                        isActive
                          ? `${exp.color} border-[#1e1d1b] shadow-[4px_4px_0px_0px_#1e1d1b]`
                          : "bg-white border-[#e8e4d9] hover:border-[#1e1d1b]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded ${exp.tagColor}`}>
                          {exp.badge}
                        </span>
                        {isActive && (
                          <span className="font-mono text-[10px] font-bold text-[#ff5e5b] flex items-center gap-1">
                            ACTIVE <ChevronRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <h3 className="font-mono font-black text-base md:text-lg text-[#1e1d1b] leading-tight">
                        {exp.company}
                      </h3>
                      <p className="text-xs font-hand font-bold text-[#ff5e5b] mt-0.5">
                        // {exp.role}
                      </p>
                      <div className="text-[11px] font-mono text-[#57534e] mt-2 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#ff5e5b]" />
                        <span>{exp.period}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Era Summary & Dynamic Stats Box */}
            <div className={`p-5 sketch-card border-2 ${currentEra.color} bg-white`}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[#1e1d1b]">
                <Briefcase className="w-4 h-4 text-[#ff5e5b]" />
                <span className="font-mono text-xs font-bold uppercase text-[#1e1d1b]">
                  CHAPTER SUMMARY METRICS
                </span>
              </div>

              <p className="text-xs font-sans text-[#1e1d1b] leading-relaxed font-medium mb-4 p-3 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                "{currentEra.summary}"
              </p>

              <div className="grid grid-cols-3 gap-2">
                {currentEra.stats.map((st, i) => (
                  <div key={i} className="bg-white p-2.5 border border-[#1e1d1b] text-center sketch-border-sm">
                    <span className="font-mono text-[10px] text-[#57534e] block uppercase font-semibold">
                      {st.label}
                    </span>
                    <span className="font-mono text-xs font-black text-[#ff5e5b]">
                      {st.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT PANEL: Interactive Project Dossiers (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Filter Pills Bar */}
            <div className="sketch-card p-4 bg-white border-2 border-[#1e1d1b] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-[#ff5e5b]" />
                <span className="font-mono text-xs font-bold text-[#1e1d1b] uppercase">
                  FILTER SYSTEMS ({filteredProjects.length} / {currentEra.projectsDetailed.length}):
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {filterOptions.map((fo) => (
                  <button
                    key={fo.id}
                    onClick={() => setSelectedFilter(fo.id)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold sketch-button ${
                      selectedFilter === fo.id ? "bg-[#ff5e5b] text-white" : "bg-[#f6f4ee] text-[#1e1d1b]"
                    }`}
                  >
                    {fo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of System Dossiers */}
            <div className="space-y-6">
              {filteredProjects.map((proj) => {
                const isExpanded = expandedProjectId === proj.id;
                return (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] relative overflow-hidden"
                  >
                    {/* Key Metric Sticker */}
                    {proj.keyMetric && (
                      <div className="absolute top-0 right-0 bg-[#ffe866] text-[#1e1d1b] text-[10px] font-mono font-bold px-3 py-1 border-b border-l border-[#1e1d1b] sketch-border-sm">
                        ⚡ {proj.keyMetric}
                      </div>
                    )}

                    {/* Card Title & Link Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-[#1e1d1b] mb-4 gap-3">
                      <div>
                        <span className="sticker-tag text-[9px] uppercase mb-1 font-bold">
                          {proj.categoryTag.replace("_", " ")}
                        </span>
                        <h3 className="font-mono font-bold text-xl md:text-2xl text-[#1e1d1b]">
                          {proj.title}
                        </h3>
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
                            className="sketch-button px-3 py-1.5 text-xs font-mono font-bold bg-[#f6f4ee] flex items-center gap-1.5 hover:bg-[#1e1d1b] hover:text-white transition-colors"
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
                            className="sketch-button px-3 py-1.5 text-xs font-mono font-bold bg-[#ffe866] flex items-center gap-1.5 text-[#1e1d1b]"
                          >
                            <span>Live System</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* One-Liner Blueprint */}
                    <p className="text-xs md:text-sm font-mono font-bold text-[#ff5e5b] mb-3 bg-[#ff5e5b]/5 p-2.5 border border-[#ff5e5b]/20 sketch-border-sm">
                      /* {proj.oneLiner} */
                    </p>

                    {/* Overview */}
                    <p className="text-xs md:text-sm font-sans text-[#1e1d1b] leading-relaxed mb-4 font-medium">
                      {proj.overview}
                    </p>

                    {/* Multi-Role Approval Workflow Diagram (For Govt e-Services) */}
                    {proj.rolesBreakdown && (
                      <div className="my-4 p-4 bg-[#e0f2fe]/40 border-2 border-[#075985] sketch-card">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[#075985]">
                          <Workflow className="w-4 h-4 text-[#075985]" />
                          <span className="font-mono text-xs font-bold text-[#075985] uppercase">
                            MULTI-ROLE APPROVAL STATE MACHINE:
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#1e1d1b]">
                          {proj.rolesBreakdown.map((rb, rbi) => (
                            <div key={rbi} className="p-2 bg-white border border-[#075985] sketch-border-sm flex items-start space-x-2">
                              <span className="text-[#075985] font-bold">›</span>
                              <span>{rb}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Workflow Stages Pipeline (For Banking) */}
                    {proj.workflowStages && (
                      <div className="my-4 p-4 bg-[#ffe866]/30 border-2 border-[#1e1d1b] sketch-card">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[#1e1d1b]">
                          <Zap className="w-4 h-4 text-[#1e1d1b]" />
                          <span className="font-mono text-xs font-bold text-[#1e1d1b] uppercase">
                            TRANSACTIONAL WORKFLOW STAGES:
                          </span>
                        </div>
                        <div className="space-y-2">
                          {proj.workflowStages.map((ws, wsi) => (
                            <div key={wsi} className="p-2.5 bg-white border border-[#1e1d1b] sketch-border-sm flex items-start space-x-2 text-xs font-mono">
                              <span className="text-[#ff5e5b] font-bold font-sans">0{wsi + 1}.</span>
                              <span className="text-[#1e1d1b]">{ws}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Architectural Responsibilities Bullet Points */}
                    {proj.responsibilities && (
                      <div className="my-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold uppercase text-[#57534e] tracking-wider">
                            ⚙️ ARCHITECTURAL RESPONSIBILITIES & CODE DELIVERABLES:
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {(isExpanded ? proj.responsibilities : proj.responsibilities.slice(0, 2)).map((resp, ri) => (
                            <li key={ri} className="flex items-start space-x-2 text-xs md:text-sm font-sans text-[#1e1d1b]">
                              <CheckCircle2 className="w-4 h-4 text-[#ff5e5b] shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>

                        {proj.responsibilities.length > 2 && (
                          <button
                            onClick={() => setExpandedProjectId(isExpanded ? null : proj.id)}
                            className="mt-3 text-xs font-mono font-bold text-[#ff5e5b] hover:underline flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show Less Deliverables</span>
                                <Minimize2 className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>+ View All {proj.responsibilities.length} Deliverables</span>
                                <Maximize2 className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Footer Tech Stack */}
                    <div className="mt-4 pt-3 border-t border-dashed border-[#1e1d1b]/30 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-[#57534e] gap-2">
                      <div className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-[#ff5e5b]" />
                        <span><strong className="text-[#1e1d1b]">Tech Stack:</strong> {proj.technicalDetails}</span>
                      </div>
                      <span className="text-[10px] text-[#ff5e5b] font-bold">STATUS: PRODUCTION READY</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ==================== CHRONOLOGICAL MASTER TIMELINE LAYOUT ==================== */
        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-4 before:bottom-4 before:w-1 before:bg-[#1e1d1b]/20 before:border-r-2 before:border-dashed before:border-[#1e1d1b]">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`sketch-card p-6 md:p-8 ${exp.color} border-2 relative overflow-hidden`}
            >
              {/* Top Row Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-1.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded ${exp.tagColor}`}>
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#57534e]">
                      📅 {exp.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-mono text-[#1e1d1b]">
                    {exp.company}
                  </h3>
                  <p className="text-sm font-hand font-bold text-[#ff5e5b] mt-0.5">
                    // {exp.role}
                  </p>
                </div>
              </div>

              {/* Role Summary */}
              <p className="text-sm font-sans text-[#1e1d1b] leading-relaxed font-medium mb-8 bg-white/90 p-4 border border-[#1e1d1b] sketch-border-sm">
                {exp.summary}
              </p>

              {/* All Projects Detailed */}
              <div className="space-y-8">
                <span className="font-mono text-xs font-bold uppercase text-[#57534e] tracking-wider block border-b border-dashed border-[#1e1d1b]/30 pb-2">
                  🚀 PRODUCTION POST-MORTEMS & SYSTEM DELIVERABLES:
                </span>

                {exp.projectsDetailed.map((proj, pi) => (
                  <div 
                    key={pi}
                    className="sketch-card p-5 md:p-6 bg-white border-2 border-[#1e1d1b] relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-dashed border-[#1e1d1b] mb-4 gap-2">
                      <div>
                        <h4 className="font-mono font-bold text-lg md:text-xl text-[#1e1d1b]">
                          {proj.title}
                        </h4>
                        {proj.titleSub && (
                          <span className="text-xs font-sans font-bold text-[#57534e] block">
                            {proj.titleSub}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="sketch-button px-3 py-1 text-xs font-mono font-bold bg-[#f6f4ee] flex items-center gap-1"
                          >
                            <span>Repository</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="sketch-button px-3 py-1 text-xs font-mono font-bold bg-[#ffe866] flex items-center gap-1 text-[#1e1d1b]"
                          >
                            <span>Live System</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-mono font-bold text-[#ff5e5b] mb-3">
                      /* {proj.oneLiner} */
                    </p>

                    <p className="text-xs md:text-sm font-sans text-[#1e1d1b] leading-relaxed mb-4 font-medium">
                      {proj.overview}
                    </p>

                    {proj.rolesBreakdown && (
                      <div className="my-4 p-3 bg-[#e0f2fe]/40 border border-[#075985] sketch-border-sm">
                        <span className="font-mono text-xs font-bold text-[#075985] block mb-2">
                          👥 MULTI-ROLE APPROVAL WORKFLOW BREAKDOWN:
                        </span>
                        <ul className="space-y-1.5 text-xs font-mono text-[#1e1d1b]">
                          {proj.rolesBreakdown.map((rb, rbi) => (
                            <li key={rbi} className="flex items-start space-x-2">
                              <span className="text-[#075985] font-bold">›</span>
                              <span>{rb}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {proj.workflowStages && (
                      <div className="my-4 p-3 bg-[#ffe866]/30 border border-[#1e1d1b] sketch-border-sm">
                        <span className="font-mono text-xs font-bold text-[#1e1d1b] block mb-2">
                          ⚡ TRANSACTIONAL WORKFLOW STAGES:
                        </span>
                        <ul className="space-y-1.5 text-xs font-mono text-[#1e1d1b]">
                          {proj.workflowStages.map((ws, wsi) => (
                            <li key={wsi} className="flex items-start space-x-2">
                              <span className="text-[#ff5e5b] font-bold">›</span>
                              <span>{ws}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {proj.responsibilities && (
                      <div className="my-4">
                        <span className="font-mono text-xs font-bold uppercase text-[#57534e] block mb-2">
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
                    )}

                    <div className="mt-4 pt-3 border-t border-dashed border-[#1e1d1b]/30 flex items-center justify-between text-[11px] font-mono text-[#57534e]">
                      <span>🛠️ <strong className="text-[#1e1d1b]">Stack:</strong> {proj.technicalDetails}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
