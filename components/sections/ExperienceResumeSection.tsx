"use client";

import { motion } from "framer-motion";
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
  Wrench
} from "lucide-react";

interface ProjectDetail {
  title: string;
  titleSub?: string;
  oneLiner: string;
  overview: string;
  responsibilities?: string[];
  rolesBreakdown?: string[];
  workflowStages?: string[];
  technicalDetails: string;
  github?: string;
  liveUrl?: string;
}

interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  badge: string;
  color: string;
  tagColor: string;
  summary: string;
  projectsDetailed: ProjectDetail[];
}

export default function ExperienceResumeSection() {
  const experiences: ExperienceRole[] = [
    {
      company: "Freelance & Independent Client Engineering",
      role: "Full Stack & Backend Specialist",
      period: "March 31, 2026 – Present",
      badge: "PRESENT // INDEPENDENT CONTRACTS",
      color: "bg-[#ff5e5b]/10 border-[#ff5e5b]",
      tagColor: "bg-[#ff5e5b] text-white",
      summary: "Architecting custom, production-grade enterprise backends, real-time collaboration engines, e-commerce platforms, and specialized B2B/B2C workflow systems for tech startups and international clients.",
      projectsDetailed: [
        {
          title: "🛒 E-Commerce Platform",
          oneLiner: "High-concurrency fashion e-commerce backend with multi-variant catalog, session-bound inventory reservation, and resilient checkout pipelines.",
          overview: "Engineered a robust e-commerce engine designed to prevent race conditions during high-concurrency checkout waves while ensuring flawless media payload consistency across cart and payment steps.",
          responsibilities: [
            "Designed a multi-variant product catalog schema mapping complex SKU attributes (size, color, material, stock counts)",
            "Implemented session-bound inventory reservation locks in Redis (`SETNX` with 30s TTL) to eliminate stock overselling during flash checkout rushes",
            "Created a standardized `resolveImageUrl` media fallback utility ensuring nested variant thumbnails are cleanly resolved across instant 'Buy Now' and persistent cart flows",
            "Engineered idempotent Stripe webhook handlers with event log tracking for automatic order fulfillment and automated inventory reconciliation"
          ],
          technicalDetails: "Built with Next.js 16, Node.js, PostgreSQL, Prisma ORM, Stripe API, Zod schema validation, and Redis distributed locks.",
          github: "https://github.com/navinO0/fashion-demostore-platform"
        },
        {
          title: "🏢 HRMS Lite (hrms-v1)",
          titleSub: "Human Resource Management System",
          oneLiner: "Lightweight HRMS backend with biometric attendance ingestion, granular RBAC, automated payroll calculation, and instant JWT session revocation.",
          overview: "Built to solve high-frequency morning rush bottlenecks when thousands of employees check in simultaneously via biometric devices, preventing database deadlock crashes while keeping employee data strictly governed.",
          responsibilities: [
            "Engineered a biometric punch-in ingestion queue using Redis lists, buffering 10,000+ morning 9:00 AM check-in events into 5-second transactional PostgreSQL batch inserts (`INSERT ... ON CONFLICT DO NOTHING`)",
            "Implemented granular Role-Based Access Control (RBAC) middleware enforcing strict permission boundaries across Admin, HR Manager, and Employee roles",
            "Designed automated payroll calculation engine evaluating tax deductions, leaves, unpaid mark-offs, and net monthly payouts",
            "Built a JWT session revocation blacklist in Redis for instant employee offboarding and immediate credential invalidation"
          ],
          technicalDetails: "Built with Fastify, TypeScript, PostgreSQL, Prisma, Redis in-memory queues, and JWT authentication.",
          github: "https://github.com/navinO0/hrms-v1-backend"
        },
        {
          title: "🧵 Garment Production & B2B/B2C Invoice Generator",
          oneLiner: "Multi-currency B2B bulk invoicing engine, automated tax/GST routines, transactional garment production workflow tracker, and asynchronous PDF rendering workers.",
          overview: "Designed for garment manufacturing factories to manage complex production cycles (cutting -> stitching -> QC -> packing) and generate multi-tier tax invoices without blocking server HTTP threads.",
          responsibilities: [
            "Engineered multi-currency B2B bulk invoicing engine with automated GST, regional tax, and volume discount calculation routines",
            "Built transactional garment production workflow tracker tracing raw fabric rolls and trim materials through to finished unit inventory ledgers",
            "Decoupled heavy 300DPI PDF document rendering from HTTP request handlers using Redis & BullMQ background job queues, streaming completed invoices via presigned download URLs",
            "Created audit-logged inventory ledger maintaining historical cost snapshots for every fabric batch"
          ],
          technicalDetails: "Built with Node.js, Express, PostgreSQL, Redis, BullMQ, PDFKit, and Zod type schemas.",
          github: "https://github.com/navinO0/garment-production-invoice-engine"
        },
        {
          title: "🩸 BloodLink (Life-Saving Emergency Platform)",
          oneLiner: "Real-time emergency blood donation matching platform connecting seekers with nearby verified donors, donor health cooling state machine, and GIS radius search.",
          overview: "A mission-critical life-saving application built for rapid emergency response, enforcing donor health safety while guaranteeing zero duplicate claims when emergency notifications trigger.",
          responsibilities: [
            "Built WebSocket real-time push notification service dispatching immediate emergency alerts to matching blood donors within a specified geographic radius",
            "Implemented an automated 90-day donor cooling period state machine to enforce health safety and restrict re-donations before eligibility",
            "Engineered Redis atomic locks (`SETNX`) on emergency donation requests to prevent duplicate acceptances when multiple donors respond simultaneously",
            "Built an administrative verification dashboard for authenticating medical requests and managing user access"
          ],
          technicalDetails: "Built with Next.js, Node.js, Fastify, Socket.io, MongoDB, Redis, and Google Cloud VPS.",
          github: "https://github.com/navinO0/blood-app-server",
          liveUrl: "https://bloodlinkhelp.netlify.app/"
        },
        {
          title: "🤖 AI Interview Coach",
          oneLiner: "Generative AI technical interview simulator with architect-level feedback, local LLM GPU fallback, and candidate communication analytics.",
          overview: "An AI-powered interview simulator designed to conduct real-time technical and behavioral interview rounds, providing deep architect-level feedback on clarity, confidence, and system design.",
          responsibilities: [
            "Orchestrated Generative AI multi-agent workflows using Antigravity and Gemini Pro APIs for adaptive interview simulation",
            "Integrated local LLM backup fallback via Ollama / LMStudio running on dedicated GPU nodes to ensure 100% operational uptime when cloud quotas exhaust",
            "Built streaming response parser evaluating candidate answer clarity, technical depth, and communication nuances in real-time",
            "Designed adaptive difficulty algorithms scaling question complexity dynamically based on candidate performance"
          ],
          technicalDetails: "Built with Next.js 14, Antigravity, Ollama, Gemini Pro, AWS Lambda, TypeScript, and PostgreSQL.",
          github: "https://github.com/navinO0/ai-interview-coach",
          liveUrl: "https://interviewguideai.netlify.app/"
        },
        {
          title: "🎨 Collaborative Whiteboard",
          oneLiner: "Real-time room-based whiteboard application with Fastify WebSockets, Redis room state persistence, coordinate delta broadcasting, and canvas archives.",
          overview: "A multiplayer canvas collaboration platform allowing isolated private rooms to draw, erase, chat, and store drawings without latency degradation.",
          responsibilities: [
            "Built Fastify WebSocket room server handling sub-5ms multi-user canvas drawing synchronization",
            "Reduced WebSocket broadcast payload size by 94% by switching from full canvas frame snapshots to coordinate delta vector streams",
            "Integrated Redis for in-memory room state storage, allowing instant canvas state recovery upon user page reload",
            "Engineered long-term PostgreSQL snapshot archival service for preserving completed whiteboard sessions"
          ],
          technicalDetails: "Built with Fastify, Next.js, WebSockets, Socket.io, Redis, PostgreSQL, Docker, and PM2.",
          github: "https://github.com/navinO0/cbwb-server",
          liveUrl: "https://cbwb.netlify.app/"
        },
        {
          title: "📱 Add Secondary Devices with QR Auth",
          oneLiner: "Multi-device authentication system using QR codes, 1-hour session timeout, 3-minute single-use Redis nonces, and CryptoJS encryption.",
          overview: "Designed to provide seamless multi-device linking for banking and secure enterprise applications by scanning single-use QR codes from primary mobile sessions.",
          responsibilities: [
            "Designed multi-device authentication protocol allowing users to securely pair up to 2 secondary devices per active session",
            "Implemented short-lived 3-minute QR code validity powered by dynamic single-use Redis TTL nonces to prevent replay attacks",
            "Built CryptoJS payload encryption for secure device handshake exchanges over public networks",
            "Enforced strict 1-hour session expiration and automatic token revocation"
          ],
          technicalDetails: "Built with Next.js, Node.js, PostgreSQL, CryptoJS, JWT, Redis, Docker, and PM2.",
          github: "https://github.com/navinO0/qr-login-nextjs",
          liveUrl: "https://qrauthnext.netlify.app/login"
        }
      ]
    },
    {
      company: "Zeksta Technology Pvt Ltd",
      role: "Software Engineer",
      period: "Until March 31, 2026",
      badge: "CORE EMPLOYMENT // FINTECH",
      color: "bg-[#ffe866]/30 border-[#1e1d1b]",
      tagColor: "bg-[#ffe866] text-[#1e1d1b]",
      summary: "Lead Backend Engineer for the Sangamam Cooperative Banking Ecosystem. Single-handedly architected and delivered core financial modules under crushing time constraints with extreme velocity.",
      projectsDetailed: [
        {
          title: "🏦 Sangamam Core Banking Platform (Customer & Agent Mobile Backend)",
          oneLiner: "Architected and delivered 4 core banking modules from scratch, shipping 20+ major features, 45+ REST APIs, and 50,000+ lines of code within 3 months.",
          overview: "Demonstrated high-velocity execution by maintaining a relentless 173-commit cadence across 50 active engineering days under crushing deadlines. Built the entire backend infrastructure powering mobile customer onboarding, agent collection apps, fund transfers, and administrative reporting.",
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
      company: "Quantela & Innovation Lab",
      role: "Associate Software Engineer",
      period: "Previous Role",
      badge: "ENTERPRISE & GOVT E-SERVICES",
      color: "bg-[#2563eb]/10 border-[#2563eb]",
      tagColor: "bg-[#2563eb] text-white",
      summary: "Engineered mission-critical backend modules for major government civil court web applications (eNibandan) and land transaction systems (MPWebGIS).",
      projectsDetailed: [
        {
          title: "📜 Marriage Registration Module (Civil Court e-Services)",
          oneLiner: "Government civil court web application module handling the full lifecycle of legal marriage applications, multi-tier officer approvals, and automated 30-day notice objection periods.",
          overview: "Active lead backend engineer on the second largest civil court module (following land registration), handling complete workflow automation, notice period scheduling, and biometric eKYC verification.",
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
          title: "🗺️ Premutation Module (MP Land Transaction Project / MPWebGIS)",
          oneLiner: "MP Government land transaction system facilitating land partition sales, GIS visual selection, real-time availability validation, and automated payment deadline releases.",
          overview: "Facilitates seller and buyer land partition transactions by integrating GIS visual land sketch selection with real-time double-transaction prevention.",
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
          title: "🧠 Internal AI Tooling & Cloud Infrastructure",
          oneLiner: "Local LLM integration with Ollama and Terraform cloud automation for enterprise microservices.",
          overview: "Integrated local LLMs (Ollama) into internal developer tools, reducing search time by 60% and automating infrastructure deployment across cloud environments.",
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

  return (
    <section id="experience" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">CAREER & DEEP WORK HISTORY</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            engineering resume <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(detailed post-mortems & architectural impact)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* Freelance // Zeksta // Quantela & Govt Labs */
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`sketch-card p-6 md:p-8 ${exp.color} border-2 relative overflow-hidden`}
          >
            {/* Top Row: Company & Badge */}
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

            {/* Role High-Level Summary */}
            <p className="text-sm font-sans text-[#1e1d1b] leading-relaxed font-medium mb-8 bg-white/90 p-4 border border-[#1e1d1b] sketch-border-sm">
              {exp.summary}
            </p>

            {/* Elaborated Projects & Systems Breakdown */}
            <div className="space-y-8">
              <span className="font-mono text-xs font-bold uppercase text-[#57534e] tracking-wider block border-b border-dashed border-[#1e1d1b]/30 pb-2">
                🚀 ELABORATED SYSTEMS, WORKFLOWS & PRODUCTION POST-MORTEMS:
              </span>

              {exp.projectsDetailed.map((proj, pi) => (
                <div 
                  key={pi}
                  className="sketch-card p-5 md:p-6 bg-white border-2 border-[#1e1d1b] relative"
                >
                  {/* Title & Link */}
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
                          className="sketch-button px-3 py-1 text-xs font-mono font-bold bg-[#ffe866] flex items-center gap-1"
                        >
                          <span>Live System</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* One Liner */}
                  <p className="text-xs font-mono font-bold text-[#ff5e5b] mb-3">
                    /* {proj.oneLiner} */
                  </p>

                  {/* Deep Overview */}
                  <p className="text-xs md:text-sm font-sans text-[#1e1d1b] leading-relaxed mb-4 font-medium">
                    {proj.overview}
                  </p>

                  {/* Multi-Role Breakdown (If civil court project) */}
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

                  {/* Workflow Stages Breakdown (If Banking) */}
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

                  {/* Key Architectural Responsibilities */}
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

                  {/* Tech Details Footer */}
                  <div className="mt-4 pt-3 border-t border-dashed border-[#1e1d1b]/30 flex items-center justify-between text-[11px] font-mono text-[#57534e]">
                    <span>🛠️ <span className="font-bold text-[#1e1d1b]">Stack:</span> {proj.technicalDetails}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
