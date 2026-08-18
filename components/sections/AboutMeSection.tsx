"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Server, 
  Zap, 
  Layers, 
  Bot, 
  X, 
  CheckCircle2, 
  Wrench,
  Code2,
  FileCode,
  Terminal,
  Database,
  Cloud,
  Box,
  Activity,
  GitBranch,
  FileText,
  Globe,
  Sparkles,
  Lock,
  Search,
  Share2,
  Workflow,
  ShieldCheck,
  Building2
} from "lucide-react";

interface TechDetail {
  name: string;
  cat: string;
  tag: string;
  icon: any;
  summary: string;
  useCases: string[];
  whyOnlyThis: string;
}

export default function AboutMeSection() {
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);

  const introPoints = [
    {
      icon: Server,
      title: "Backend Visionary (3+ Years)",
      text: "Building highly-resilient backend ecosystems with 3+ years of high-impact engineering. My code transforms complex requirements into scalable, AI-driven logic.",
      color: "bg-[#ffe866]/30 border-[#1e1d1b]"
    },
    {
      icon: Bot,
      title: "AI Frontier & Agentic LLMs",
      text: "Deep exposure to the AI frontier: Orchestrating LLMs with Ollama, LMStudio, and Antigravity. I bridge the gap between human intent and machine execution.",
      color: "bg-[#ff5e5b]/10 border-[#ff5e5b]"
    },
    {
      icon: Cpu,
      title: "Logical & High-Velocity Execution",
      text: "Logical and results-driven full stack developer dedicated to building and optimizing user-focused applications with a calm and focused demeanor.",
      color: "bg-[#2563eb]/10 border-[#2563eb]"
    },
    {
      icon: Zap,
      title: "Uncompromising Quality",
      text: "Warning: I am the candidate your recruiter warned you about. The good one.",
      color: "bg-[#16a34a]/10 border-[#16a34a]"
    }
  ];

  const techStackList: TechDetail[] = [
    { 
      name: "HTML5", 
      cat: "Frontend Standard", 
      tag: "UI", 
      icon: FileCode,
      summary: "Semantic HTML5 web markup standard providing robust, accessible structure for web applications.",
      useCases: ["SEO-optimized portfolio semantic HTML structure", "Accessible interactive web forms"],
      whyOnlyThis: "Foundational web standard ensuring accessibility, high performance, and search engine indexability."
    },
    { 
      name: "CSS3", 
      cat: "Styling Standard", 
      tag: "UI", 
      icon: Code2,
      summary: "Modern CSS3 styling fundamentals, flexbox, grid, and custom responsive animations.",
      useCases: ["Neo-brutalist paper-grid aesthetic portfolio layout", "Custom CSS micro-animations"],
      whyOnlyThis: "Maximum layout flexibility and direct styling control without heavy framework bloat."
    },
    { 
      name: "JavaScript", 
      cat: "Language", 
      tag: "ES6+", 
      icon: Terminal,
      summary: "Universal execution language powering asynchronous server logic and dynamic client interactions.",
      useCases: ["Node.js server runtime execution", "Custom PIL background removal scripts"],
      whyOnlyThis: "Ubiquitous runtime presence across server and browser environments."
    },
    { 
      name: "TypeScript", 
      cat: "Language", 
      tag: "Strict", 
      icon: Code2,
      summary: "Statically typed superset of JavaScript eliminating runtime payload shape mismatch bugs across layers.",
      useCases: ["Shared DTO interfaces between client and server", "Zod runtime schema inference"],
      whyOnlyThis: "Eliminates 90% of undefined-property runtime crashes before code ever touches production."
    },
    { 
      name: "React", 
      cat: "Frontend Library", 
      tag: "UI", 
      icon: Layers,
      summary: "Component-based UI library powering interactive single-page and server-rendered web applications.",
      useCases: ["Next.js portfolio UI", "Interactive security playgrounds and JMeter simulators"],
      whyOnlyThis: "Declarative component-driven architecture, virtual DOM reconciliation, and rich UI ecosystem."
    },
    { 
      name: "Node.js", 
      cat: "Backend Runtime", 
      tag: "Core", 
      icon: Server,
      summary: "High-throughput non-blocking asynchronous event loop runtime powering all core REST APIs and WebSocket services.",
      useCases: ["Sangamam core banking APIs", "Payment webhook listeners", "WebSocket event streaming"],
      whyOnlyThis: "Event-driven non-blocking I/O allows Node.js to handle thousands of concurrent API connections efficiently."
    },
    { 
      name: "Fastify", 
      cat: "Web Framework", 
      tag: "High Perf", 
      icon: Zap,
      summary: "Sub-millisecond HTTP web framework featuring schema-driven JSON compilation and minimal routing overhead.",
      useCases: ["Biometric attendance API handling 10,000 punch-in bursts", "Real-time WebSocket room server"],
      whyOnlyThis: "Executes routing up to 4x faster than Express with built-in schema validation via Ajv."
    },
    { 
      name: "Express.js", 
      cat: "Web Framework", 
      tag: "REST API", 
      icon: Server,
      summary: "Battle-tested REST API middleware framework ideal for traditional microservices and routing pipelines.",
      useCases: ["Garment production invoicing server", "Premutation land transaction workflow APIs"],
      whyOnlyThis: "Provides massive middleware ecosystem support and instant developer familiarity for rapidly bootstrapping REST services."
    },
    { 
      name: "NestJS", 
      cat: "Enterprise Framework", 
      tag: "Enterprise", 
      icon: Building2,
      summary: "Modular, Angular-inspired TypeScript framework enforcing strict architectural boundaries and dependency injection.",
      useCases: ["Multi-tenant enterprise microservices", "Automated OpenAPI (Swagger) generation from DTOs"],
      whyOnlyThis: "Enforces strict structural consistency and dependency injection across large engineering teams."
    },
    { 
      name: "Python", 
      cat: "Scripting / AI", 
      tag: "AI/Data", 
      icon: Terminal,
      summary: "Scientific and scripting language used for image manipulation algorithms, flood-fill silhouette extraction, and AI scripts.",
      useCases: ["Pillow (PIL) edge-aware avatar flood-fill background removal", "AI embedding vector processing"],
      whyOnlyThis: "Unmatched ecosystem for computer vision (PIL/OpenCV) and machine learning data processing."
    },
    { 
      name: "Go", 
      cat: "Systems Language", 
      tag: "Systems", 
      icon: Cpu,
      summary: "Statically compiled systems language featuring lightweight goroutines and low-latency garbage collection.",
      useCases: ["High-frequency custom API proxy layers", "Lightweight microservices handling 50k+ req/sec"],
      whyOnlyThis: "Near-instant compilation, minimal binary size, and native goroutine channels for multi-core hardware scaling."
    },
    { 
      name: "PostgreSQL", 
      cat: "Relational Database", 
      tag: "ACID SQL", 
      icon: Database,
      summary: "Enterprise-grade relational database guaranteeing strict ACID compliance and double-entry transaction integrity.",
      useCases: ["Sangamam cooperative banking General Ledger", "Civil court marriage registration records"],
      whyOnlyThis: "Offers atomic row-level locking (`SELECT FOR UPDATE`), JSONB document querying, and zero compromise on financial data integrity."
    },
    { 
      name: "MongoDB", 
      cat: "NoSQL Database", 
      tag: "NoSQL", 
      icon: Database,
      summary: "Document-oriented NoSQL database providing schema flexibility for dynamic multi-tenant attributes.",
      useCases: ["BloodLink emergency blood seeker request storage", "Unstructured audit log history"],
      whyOnlyThis: "Ideal for rapidly changing document structures where strict relational schema migrations would slow down early feature iterations."
    },
    { 
      name: "Redis", 
      cat: "In-Memory Store", 
      tag: "In-Memory", 
      icon: Activity,
      summary: "Ultra-fast in-memory key-value store used for sub-millisecond caching, TTL expirations, and distributed locks.",
      useCases: ["Biometric attendance punch-in burst queueing", "Single-use 3-minute QR nonces", "Distributed locks (`SETNX`)"],
      whyOnlyThis: "Atomic in-memory operations execute in under 0.5ms, preventing relational database saturation under burst traffic."
    },
    { 
      name: "Elasticsearch", 
      cat: "Search Engine", 
      tag: "Vector/Log", 
      icon: Search,
      summary: "Distributed Lucene-based search and analytics engine for high-volume text log analysis and vector lookups.",
      useCases: ["Sub-second full-text searches across thousands of land records", "Centralized API error log aggregation"],
      whyOnlyThis: "Inverted index architecture allows instant search lookups across millions of un-structured records."
    },
    { 
      name: "Kafka", 
      cat: "Message Broker", 
      tag: "Pub/Sub", 
      icon: Share2,
      summary: "Distributed event streaming platform handling high-throughput asynchronous message queues across microservices.",
      useCases: ["Transactional outbox event publishing between banking microservices", "High-volume notification dispatching"],
      whyOnlyThis: "Durable multi-partition commit log ensures messages are never lost and allows independent consumer group scaling."
    },
    { 
      name: "GraphQL", 
      cat: "API Query Layer", 
      tag: "Queries", 
      icon: Workflow,
      summary: "Declarative API query language allowing clients to request exact fields in a single HTTP request.",
      useCases: ["Admin reporting dashboards rendering multi-nested relational entity trees", "Unified API facade over microservices"],
      whyOnlyThis: "Eliminates REST over-fetching and reduces mobile data bandwidth by fetching complex nested data trees in a single roundtrip."
    },
    { 
      name: "Core Banking Systems", 
      cat: "Domain Architecture", 
      tag: "Fintech", 
      icon: Building2,
      summary: "Financial domain architecture involving double-entry General Ledger (GL) posting, automated commissions, and audit trails.",
      useCases: ["Sangamam cooperative banking intra-bank fund transfers with two-phase commits", "Multi-branch RBAC balance verification"],
      whyOnlyThis: "Ensures cent-exact accounting compliance, preventing balance discrepancies and unauthorized money creation."
    },
    { 
      name: "AWS (ECS/S3/Lambda)", 
      cat: "Cloud Infrastructure", 
      tag: "DevOps", 
      icon: Cloud,
      summary: "Cloud infrastructure suite providing elastic container orchestration, compliance document storage, and serverless compute.",
      useCases: ["AWS ECS container deployment for auto-scaling banking microservices", "AWS S3 encrypted document vault"],
      whyOnlyThis: "Industry-standard cloud SLA, automated multi-AZ failover, and compliance-ready security certifications."
    },
    { 
      name: "Docker", 
      cat: "Containerization", 
      tag: "Containers", 
      icon: Box,
      summary: "Container isolation platform packaging application runtimes and OS dependencies into reproducible images.",
      useCases: ["Local multi-container stack orchestration (App + PostgreSQL + Redis)", "Production container deployments"],
      whyOnlyThis: "Completely eliminates 'works on my machine' bugs by guaranteeing identical execution environments across all stages."
    },
    { 
      name: "Kubernetes (K8s)", 
      cat: "Orchestration", 
      tag: "Orchestration", 
      icon: Layers,
      summary: "Production container orchestration platform for automated deployments, horizontal autoscaling, and self-healing pods.",
      useCases: ["Horizontal Pod Autoscaling (HPA) during flash-sale traffic spikes", "Automated rolling deployments with zero downtime"],
      whyOnlyThis: "Automates pod health checks, automatic restarts, and traffic ingress routing across large distributed container clusters."
    },
    { 
      name: "Terraform", 
      cat: "Infrastructure as Code", 
      tag: "IaC", 
      icon: Workflow,
      summary: "Declarative Infrastructure as Code (IaC) tool for provisioning cloud resources repeatably across AWS and GCP.",
      useCases: ["Automated provisioning of VPC networks, ECS clusters, and RDS databases", "Environment replication scripts"],
      whyOnlyThis: "Replaces manual cloud console clicking with version-controlled, peer-reviewed infrastructure code."
    },
    { 
      name: "LLMs / Ollama", 
      cat: "AI Runtime", 
      tag: "Local AI", 
      icon: Bot,
      summary: "Local and cloud Large Language Model orchestration for AI agents, mock interview evaluators, and code search.",
      useCases: ["AI Interview Coach local LLM backup on GPU nodes", "Internal developer code search (speeding up dev search by 60%)"],
      whyOnlyThis: "Guarantees 100% operational uptime and zero cloud rate-limit crashes by running open-weight LLMs locally."
    },
    { 
      name: "Antigravity", 
      cat: "Agentic AI Framework", 
      tag: "Agents", 
      icon: Sparkles,
      summary: "Agentic AI framework for multi-step prompt orchestration, tool invocation, and structured agent execution loops.",
      useCases: ["AI technical interview simulator agent workflows", "Automated post-mortem case study analysis"],
      whyOnlyThis: "Provides robust state management for autonomous multi-step agent reasoning loops with native tool-calling capabilities."
    },
    { 
      name: "JMeter", 
      cat: "Load Testing", 
      tag: "Load Test", 
      icon: Activity,
      summary: "High-concurrency load and stress testing suite for simulating thousands of concurrent HTTP user requests against server endpoints.",
      useCases: ["Simulating 5,000 concurrent user request waves against stock reservation endpoints", "Measuring p50, p95, p99 latency spikes"],
      whyOnlyThis: "Reveals exact system bottlenecks (connection pool saturation, event loop lag) before real users hit production."
    },
    { 
      name: "Postman", 
      cat: "API Verification", 
      tag: "API Specs", 
      icon: Terminal,
      summary: "API contract testing, manual payload verification, and automated collection test runner tool.",
      useCases: ["Verifying raw API route handlers without relying on UI code", "Header inspection and JWT injection"],
      whyOnlyThis: "The essential gold standard for verifying API behavior directly against backend server endpoints."
    },
    { 
      name: "PM2", 
      cat: "Process Manager", 
      tag: "Process Mgr", 
      icon: Cpu,
      summary: "Production process manager for Node.js applications with cluster mode load balancing and automatic crash recovery.",
      useCases: ["Managing multi-core Node.js process clusters on Linux VPS servers", "Zero-downtime application reloads"],
      whyOnlyThis: "Keeps Node.js applications alive 24/7 with zero downtime reloads and multi-core CPU utilization."
    },
    { 
      name: "Git", 
      cat: "Version Control", 
      tag: "VCS", 
      icon: GitBranch,
      summary: "Distributed version control system tracking source code history and enabling non-linear branch development.",
      useCases: ["Maintaining a 173-commit cadence across 50 active engineering days", "Branch merge conflict resolution"],
      whyOnlyThis: "Foundational tool for atomic commit history tracking and collaborative software engineering."
    },
    { 
      name: "GitHub", 
      cat: "DevOps & CI/CD", 
      tag: "CI/CD", 
      icon: GitBranch,
      summary: "Cloud repository host and automated CI/CD pipeline engine for automated testing and deployments.",
      useCases: ["GitHub Actions automated test runners", "Pull request code reviews and branch protection rules"],
      whyOnlyThis: "Industry-standard platform for repository hosting, code review workflows, and automated release pipelines."
    },
    { 
      name: "Jira", 
      cat: "Agile Project Mgmt", 
      tag: "Scrum", 
      icon: FileText,
      summary: "Agile sprint management tool for tracking engineering stories, task estimates, and bug workflows.",
      useCases: ["Sprint story tracking and velocity management", "Cross-team issue linking"],
      whyOnlyThis: "Industry standard for structured agile sprint planning and task execution visibility."
    },
    { 
      name: "Confluence", 
      cat: "Technical Specs", 
      tag: "Docs", 
      icon: FileText,
      summary: "Enterprise technical documentation workspace for publishing architecture specs, API contracts, and runbooks.",
      useCases: ["Architecture decision records (ADRs)", "System API integration documentation"],
      whyOnlyThis: "Ensures comprehensive technical knowledge sharing and centralized architectural documentation."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* Header Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">ENGINEER PROFILE</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            about me <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(philosophy, skills & stack)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* tech-agnostic // battle-tested // click any stack item for rationale */
        </p>
      </div>

      {/* Intro Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {introPoints.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className={`sketch-card p-5 border-2 ${item.color} flex flex-col justify-between`}
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#1e1d1b] flex items-center justify-center mb-3 shadow-[2px_2px_0px_#1e1d1b]">
                  <Icon className="w-5 h-5 text-[#1e1d1b]" />
                </div>
                <h3 className="font-mono font-bold text-base text-[#1e1d1b] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-[#57534e] leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-[#1e1d1b]/20 flex items-center justify-between text-[10px] font-mono font-bold text-[#1e1d1b]">
                <span>// MOD0{idx + 1}</span>
                <span className="text-[#ff5e5b]">READY</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Complete Technical Skill Matrix */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-dashed border-[#1e1d1b] gap-2">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#ff5e5b]" />
            <h3 className="font-mono font-bold text-lg text-[#1e1d1b]">
              TECHNICAL TOOLBELT & INFRASTRUCTURE MATRIX
            </h3>
          </div>
          <span className="sticker-tag text-[10px] font-mono font-bold self-start sm:self-auto">
            ⚡ CLICK ANY ITEM FOR USE CASES & RATIONALE ({techStackList.length} ITEMS)
          </span>
        </div>

        {/* Stack Items Badges */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {techStackList.map((skill, idx) => {
            const isSelected = selectedTech?.name === skill.name;
            const Icon = skill.icon;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTech(isSelected ? null : skill)}
                className={`group relative px-3 py-1.5 border border-[#1e1d1b] sketch-border-sm transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected 
                    ? "bg-[#ff5e5b] text-white ring-2 ring-[#ff5e5b]/40 shadow-[2px_2px_0px_#1e1d1b]" 
                    : "bg-[#f8f6f0] hover:bg-[#ffe866] text-[#1e1d1b]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#1e1d1b]"}`} />
                <span className="font-mono font-bold text-xs">
                  {skill.name}
                </span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? "bg-white text-[#1e1d1b]" : "bg-[#1e1d1b] text-white"
                }`}>
                  {skill.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Rationale Modal / Card Panel */}
        <AnimatePresence mode="wait">
          {selectedTech ? (
            <motion.div
              key={selectedTech.name}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 bg-[#fffdfa] border-2 border-[#ff5e5b] sketch-border-sm relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 p-1 rounded border border-[#1e1d1b] bg-white hover:bg-[#fee2e2] text-[#1e1d1b] transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-3">
                {(() => {
                  const Icon = selectedTech.icon;
                  return <Icon className="w-6 h-6 text-[#ff5e5b]" />;
                })()}
                <span className="sticker-tag-red text-xs font-mono font-bold uppercase">
                  {selectedTech.cat}
                </span>
                <h4 className="text-xl font-black font-mono text-[#1e1d1b]">
                  {selectedTech.name}
                </h4>
              </div>

              <p className="text-xs md:text-sm font-sans font-medium text-[#1e1d1b] leading-relaxed mb-4 bg-white p-3 border border-[#1e1d1b] sketch-border-sm">
                💡 <span className="font-bold">Summary:</span> {selectedTech.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Real Production Use Cases */}
                <div className="p-3.5 bg-[#ffe866]/20 border border-[#1e1d1b] sketch-border-sm">
                  <div className="flex items-center space-x-2 font-mono font-bold text-xs text-[#1e1d1b] mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5e5b]" />
                    <span>REAL PRODUCTION USE CASES:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedTech.useCases.map((uc, i) => (
                      <li key={i} className="text-xs font-mono text-[#1e1d1b] flex items-start space-x-2">
                        <span className="text-[#ff5e5b] font-bold">›</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Only This (Engineering Rationale) */}
                <div className="p-3.5 bg-[#e0f2fe]/40 border border-[#075985] sketch-border-sm">
                  <div className="flex items-center space-x-2 font-mono font-bold text-xs text-[#075985] mb-2">
                    <Wrench className="w-4 h-4 text-[#075985]" />
                    <span>WHY ONLY THIS (ENGINEERING RATIONALE):</span>
                  </div>
                  <p className="text-xs font-sans font-medium text-[#1e1d1b] leading-relaxed">
                    "{selectedTech.whyOnlyThis}"
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-4 bg-[#f6f4ee]/70 border border-dashed border-[#1e1d1b] text-center font-mono text-xs text-[#57534e]">
              👈 Click on any tech stack item above (e.g. HTML5, CSS3, JavaScript, TypeScript, React, Node.js, Fastify, PostgreSQL, Redis, Ollama, Kafka, AWS, Docker) to inspect real production use cases & engineering rationale!
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
