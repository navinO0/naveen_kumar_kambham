"use client";

import { Code2, Database, Shield, Terminal, Cpu, Server, Cloud, GitBranch, Zap, Triangle, Layers } from "lucide-react";

// Tech companies are actively hiring for these right now (2024-2025)
const STACK_GROUPS = [
  {
    category: "T3 Stack (Full-Stack TS)",
    icon: Triangle,
    accent: "bg-violet-600",
    label: "ECOSYSTEM",
    demand: "🔥 HIGHEST",
    demandColor: "text-violet-700 bg-violet-50",
    featured: true,
    items: [
      { name: "TypeScript", badge: "End-to-End Typesafe", desc: "Strict types from DB schema → API layer → frontend component. No `any`. No guessing." },
      { name: "tRPC", badge: "📈 Rising Fast", desc: "Fully typesafe APIs with zero code generation — client knows the exact shape of every response." },
      { name: "Next.js 15 App Router", badge: "🔥 Top Demand", desc: "Server Components, Server Actions, Route Handlers, Streaming — backend logic in the same codebase." },
      { name: "Prisma ORM", badge: "Most Adopted", desc: "Type-safe DB client with auto-generated types from schema — migrations, relation queries, transactions." },
      { name: "NextAuth.js / Auth.js", badge: "Standard", desc: "JWT + session providers, OAuth 2.0 flows, database adapters — auth that doesn't leak credentials." },
      { name: "Tailwind CSS", badge: "Industry Standard", desc: "Utility-first CSS with zero dead styles in prod — collocated with component logic." },
    ],
  },
  {
    category: "Frontend & UI Engineering",
    icon: Layers,
    accent: "bg-cyan-500",
    label: "Frontend",
    demand: "🔥 HIGH",
    demandColor: "text-cyan-700 bg-cyan-50",
    items: [
      { name: "React 19 / 18", badge: "🔥 #1 Frontend", desc: "Hooks, Server Components, Suspense, Concurrent Rendering, custom hooks, virtual DOM optimization." },
      { name: "Next.js App Router", badge: "🔥 Full-Stack Standard", desc: "SSR, SSG, ISR, Server Actions, Route Handlers, Streaming UI, SEO optimization." },
      { name: "Tailwind CSS", badge: "🔥 Design System", desc: "Utility-first CSS, custom design tokens, responsive breakpoints, zero dead styles in production." },
      { name: "HTML5 & Modern CSS3", badge: "Core", desc: "Semantic HTML5, Flexbox, CSS Grid, custom properties, responsive fluid typography, a11y." },
      { name: "State & Data Fetching", badge: "Essential", desc: "Zustand, TanStack Query (React Query), Context API, optimistic UI updates." },
      { name: "Framer Motion", badge: "Animations", desc: "Smooth layout transitions, micro-interactions, spring physics, gesture-driven UI." },
    ],
  },
  {
    category: "Runtime & Language",
    icon: Code2,
    accent: "bg-sky-500",
    label: "Core",
    demand: "HIGH",
    demandColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "TypeScript", badge: "🔥 Top 3 Skill", desc: "Strict type safety, generics, discriminated unions — catching runtime bugs at compile time." },
      { name: "Node.js (v20+)", badge: "In Demand", desc: "Non-blocking I/O runtime, streams, Worker Threads for CPU-intensive jobs." },
      { name: "SQL (Advanced)", badge: "Core", desc: "Window functions, CTEs, EXPLAIN ANALYZE, partitioning, and query optimization." },
    ],
  },
  {
    category: "Backend Frameworks",
    icon: Server,
    accent: "bg-emerald-500",
    label: "APIs",
    demand: "HIGH",
    demandColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "Fastify", badge: "📈 Rising", desc: "Schema-based validation, plugin lifecycle, JSON serialize hooks — 2× faster than Express." },
      { name: "Next.js App Router", badge: "🔥 Hot", desc: "Server Components, Route Handlers, middleware, ISR — full-stack TypeScript." },
      { name: "REST + OpenAPI", badge: "Core", desc: "Resource-oriented routes, predictable error payloads, spec-first development." },
      { name: "gRPC / GraphQL", badge: "Growing", desc: "Protobuf contracts for internal services; GraphQL for flexible client-driven queries." },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    accent: "bg-amber-500",
    label: "Data",
    demand: "HIGH",
    demandColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "PostgreSQL", badge: "🔥 #1 DB", desc: "ACID transactions, JSONB, MVCC, pg_stat, row-level security, read replicas." },
      { name: "Redis", badge: "In Demand", desc: "Sub-ms caching, sorted sets, Lua scripting, Pub/Sub, Streams — not just a cache." },
      { name: "Prisma / Drizzle", badge: "Trending", desc: "Type-safe ORM with migrations, relation queries, and transaction wrappers." },
      { name: "SQLite (WAL mode)", badge: "Edge", desc: "Embedded DB for edge deployments, local-first apps — zero config, zero latency." },
    ],
  },
  {
    category: "Messaging & Events",
    icon: Zap,
    accent: "bg-violet-500",
    label: "Async",
    demand: "GROWING",
    demandColor: "text-sky-600 bg-sky-50",
    items: [
      { name: "Apache Kafka", badge: "📈 Senior Signal", desc: "Partitions, consumer groups, log compaction, exactly-once semantics — event backbone." },
      { name: "BullMQ / RabbitMQ", badge: "Common", desc: "Priority queues, delayed jobs, DLQ, worker concurrency control for background processing." },
      { name: "AWS SQS + SNS", badge: "Cloud Native", desc: "Managed queues, fan-out patterns, dead-letter queues with redrive policies." },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    accent: "bg-orange-500",
    label: "DevOps",
    demand: "HIGH",
    demandColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "AWS (ECS / RDS / ElastiCache)", badge: "🔥 Required", desc: "VPC segmentation, IAM least privilege, ALB, CloudFront CDN, S3 lifecycle policies." },
      { name: "Docker + Kubernetes", badge: "In Demand", desc: "Multi-stage Dockerfiles (1.2GB → 85MB), HPA autoscaling, liveness + readiness probes." },
      { name: "GitHub Actions CI/CD", badge: "Standard", desc: "Lint → type-check → test → SAST scan → build → deploy pipeline on every PR merge." },
      { name: "Terraform (IaC)", badge: "Growing", desc: "Declarative infra — VPCs, security groups, RDS instances version-controlled in git." },
    ],
  },
  {
    category: "Observability",
    icon: Cpu,
    accent: "bg-teal-500",
    label: "Ops",
    demand: "GROWING",
    demandColor: "text-sky-600 bg-sky-50",
    items: [
      { name: "OpenTelemetry", badge: "📈 Rising Fast", desc: "Distributed tracing, span propagation across microservices, vendor-neutral instrumentation." },
      { name: "Prometheus + Grafana", badge: "Standard", desc: "p99 latency dashboards, alerting rules, red/black deployment monitoring." },
      { name: "Structured Logging (Pino)", badge: "Core", desc: "JSON log events with correlation IDs, log levels, redacted PII fields." },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    accent: "bg-red-500",
    label: "Security",
    demand: "ALWAYS",
    demandColor: "text-red-600 bg-red-50",
    items: [
      { name: "JWT + OAuth 2.0", badge: "🔥 Core", desc: "Access/refresh token rotation, PKCE flows, token introspection, revocation lists." },
      { name: "RBAC + OWASP Top 10", badge: "Required", desc: "Permission bitmasks, parameterized queries, rate limiting, security headers (CORS, CSP, HSTS)." },
      { name: "Burp Suite + Snyk", badge: "DevSecOps", desc: "Active DAST scanning of endpoints, SCA for dependency CVEs, SAST in CI pipeline." },
    ],
  },
  {
    category: "Testing",
    icon: GitBranch,
    accent: "bg-pink-500",
    label: "QA",
    demand: "GROWING",
    demandColor: "text-sky-600 bg-sky-50",
    items: [
      { name: "Vitest / Jest", badge: "Standard", desc: "Unit tests, integration route tests with in-memory SQLite, mocked external services." },
      { name: "Supertest / Playwright", badge: "Common", desc: "E2E API testing, headless browser flows, contract testing between services." },
      { name: "Apache JMeter", badge: "Load Testing", desc: "5,000 concurrent user simulations, identifying p99 bottlenecks before launch day." },
    ],
  },
];

const DEMAND_STATS = [
  { label: "React / Next.js", pct: 96, color: "bg-cyan-500" },
  { label: "TypeScript", pct: 94, color: "bg-sky-500" },
  { label: "T3 / Full-Stack TS", pct: 91, color: "bg-violet-600" },
  { label: "Tailwind CSS", pct: 90, color: "bg-teal-500" },
  { label: "PostgreSQL", pct: 88, color: "bg-amber-500" },
  { label: "Docker / K8s", pct: 85, color: "bg-orange-500" },
  { label: "AWS Cloud", pct: 82, color: "bg-orange-400" },
  { label: "Node.js Backend", pct: 80, color: "bg-emerald-500" },
  { label: "Redis Caching", pct: 72, color: "bg-red-400" },
];

export default function BackendStackSection() {
  return (
    <section id="stack" className="py-16 md:py-24 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="sticker-tag mb-3 inline-block">FULL-STACK TECH & RUNTIME</span>
          <h2 className="text-3xl sm:text-4xl font-black font-mono text-[#1e1d1b]">
            Full-Stack Tech I Use
          </h2>
          <p className="text-sm text-[#57534e] font-sans mt-2 max-w-lg">
            End-to-end capabilities spanning frontend UIs (React, Next.js, Tailwind) to backend systems (Node.js, PostgreSQL, Docker, AWS). Real production depth.
          </p>
        </div>
        <p className="font-hand text-sm text-[#ff5e5b] font-bold shrink-0">
          "From Pixel-perfect UI to Database Query Plans —<br />One cohesive engineering mindset."
        </p>
      </div>

      {/* Market Demand Bar Chart */}
      <div className="mb-14 rounded-2xl bg-[#0f1117] p-6 sm:p-8">
        <p className="font-mono text-[10px] text-[#ffe866] uppercase tracking-widest mb-6 font-bold">
          // market demand index — % of backend job postings mentioning this skill (2024–2025)
        </p>
        <div className="space-y-3">
          {DEMAND_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-300 w-36 shrink-0">{stat.label}</span>
              <div className="flex-1 h-2 rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${stat.color} transition-all duration-700`}
                  style={{ width: `${stat.pct}%` }}
                />
              </div>
              <span className="font-mono text-xs text-gray-400 w-8 text-right shrink-0">{stat.pct}%</span>
            </div>
          ))}
        </div>
        <p className="font-sans text-[10px] text-gray-600 mt-4">Source: LinkedIn, Indeed, Glassdoor job posting analysis</p>
      </div>

      {/* Featured T3 Stack Banner */}
      {STACK_GROUPS.filter((g) => g.featured).map((group) => {
        const IconComp = group.icon;
        return (
          <div key={group.category} className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-violet-900/90 to-[#0f1117] text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-violet-700/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5 text-white" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono font-black text-lg text-white">{group.category}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-500 text-white">
                      {group.label}
                    </span>
                  </div>
                  <p className="text-xs text-violet-200 font-sans mt-0.5">End-to-end type safety from database to UI</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                MARKET DEMAND: {group.demand}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => (
                <div key={item.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono font-bold text-sm text-violet-200">{item.name}</span>
                    <span className="text-[9px] font-bold text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Remaining Stack Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STACK_GROUPS.filter((g) => !g.featured).map((group) => {
          const IconComp = group.icon;
          return (
            <div key={group.category} className="space-y-3">
              {/* Group Header */}
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-xl ${group.accent} flex items-center justify-center shrink-0`}>
                  <IconComp className="w-4 h-4 text-white" />
                </span>
                <div>
                  <h3 className="font-mono font-black text-sm text-[#1e1d1b]">{group.category}</h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${group.demandColor}`}>
                    DEMAND: {group.demand}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 pl-1">
                {group.items.map((item) => (
                  <div key={item.name} className="group flex gap-3 p-3 rounded-xl bg-white hover:shadow-md transition-shadow duration-200">
                    <div className={`w-1 rounded-full ${group.accent} shrink-0`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono font-bold text-xs text-[#1e1d1b]">{item.name}</span>
                        <span className="text-[9px] font-bold text-[#57534e] bg-gray-100 px-1.5 py-0.5 rounded-full font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716c] font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
