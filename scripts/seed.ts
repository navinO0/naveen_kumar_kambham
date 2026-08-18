import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "portfolio.db");
const db = new Database(dbPath);

console.log("🌱 Seeding portfolio.db with complete developer projects, experience, and tools...");

// Clear existing data
db.exec(`
  DELETE FROM projects;
  DELETE FROM tools;
  DELETE FROM learning_topics;
  DELETE FROM trench_notes;
`);

const insertProject = db.prepare(`
  INSERT INTO projects (
    id, name, one_line, year, backend_responsibilities, stack,
    interesting_problem, what_broke, what_i_changed, why_i_chose_it, what_i_learned, github_url, live_url
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const projects = [
  {
    id: "sangamam-backend",
    name: "Sangamam Backend (Core Banking Ecosystem)",
    oneLine: "Cooperative banking platform backend, 45+ REST APIs, multi-branch RBAC, two-phase fund transfers, double-entry General Ledger engine.",
    year: 2025,
    backendResponsibilities: [
      "Architected and shipped customer & agent app backends with Aadhaar/MPIN auth and strict device binding",
      "Engineered intra-bank fund transfer flow utilizing two-phase commit pattern and Redis rate-limiting",
      "Built comprehensive 4,000+ line reporting engine and full double-entry General Ledger (GL) system from scratch",
      "Orchestrated containerized microservices on AWS ECS with S3 compliance document storage"
    ],
    stack: ["Node.js", "Express", "Sequelize", "PostgreSQL", "Redis", "AWS ECS", "S3", "Docker", "TypeScript", "Swagger"],
    interestingProblem: "Concurrent intra-bank wallet fund transfers caused double-debit balance mismatches under simultaneous mobile app requests.",
    whatBroke: "Non-atomic database updates allowed two overlapping debit requests to evaluate balance checks simultaneously.",
    whatIChanged: "Implemented a two-phase commit pattern in PostgreSQL transactions combined with Redis atomic rate-limiting and row-level locking.",
    whyIChoseIt: "Sequelize ORM transactions with PostgreSQL guaranteed ACID compliance, while AWS ECS provided zero-downtime auto-scaling.",
    whatILearned: "Financial transactions require zero trust in timing; every balance mutation must be atomic and audit-logged.",
    githubUrl: "https://github.com/Zeksta-Technology-Pvt-Ltd/sangamam-backend",
    liveUrl: "https://sangamam-api.vance.dev"
  },
  {
    id: "fashion-demostore",
    name: "E-Commerce Platform",
    oneLine: "Modern e-commerce backend platform featuring dynamic multi-variant catalog, inventory reservation locks, persistent cart, and checkout flow.",
    year: 2025,
    backendResponsibilities: [
      "Designed multi-variant product catalog schema (size, color, material, SKU stock mapping)",
      "Built resilient checkout API with session-bound inventory reservation locks",
      "Implemented image URL resolution pipeline for variant thumbnails and cart items",
      "Engineered webhook handlers for Stripe payment status updates and order fulfillment triggers"
    ],
    stack: ["Next.js 16", "Node.js", "PostgreSQL", "Prisma", "Stripe API", "Zod", "Redis"],
    interestingProblem: "Cart items lost image thumbnail URLs during checkout transitions due to mismatched nested product data structures.",
    whatBroke: "Checkout payload omitted variant image associations, causing image fallback failures and broken checkout UI media.",
    whatIChanged: "Created a standardized resolveImageUrl utility and schema validator guaranteeing image fallback resolution across persistent cart and instant 'Buy Now' paths.",
    whyIChoseIt: "Prisma ORM provided strict relational mapping between products, SKUs, and variant assets, while Next.js Server Actions simplified state updates.",
    whatILearned: "Data contract consistency between API responses and frontend components is crucial for flawless checkout experiences.",
    githubUrl: "https://github.com/navinO0/fashion-demostore-platform",
    liveUrl: "https://fashion-demo.vance.dev"
  },
  {
    id: "hrms-lite",
    name: "HRMS Lite (hrms-v1)",
    oneLine: "Lightweight Human Resource Management System, employee attendance tracking, role-based access control, and payroll calculations.",
    year: 2025,
    backendResponsibilities: [
      "Implemented granular RBAC middleware (Admin vs HR Manager vs Employee permission scopes)",
      "Engineered biometric attendance log ingestion API with timestamp deduplication",
      "Designed payroll engine calculating tax deductions, leaves, and net salary payouts",
      "Built JWT session revocation system using Redis blacklists for instant user offboarding"
    ],
    stack: ["Fastify", "TypeScript", "PostgreSQL", "Prisma", "Redis", "JWT"],
    interestingProblem: "Biometric punch-in devices burst 10,000 requests in a 15-minute window every morning at 9:00 AM, causing database locks on the attendance table.",
    whatBroke: "Overlapping INSERT queries for employee attendance logs hit deadlocks and returned 500 server errors under peak morning rush.",
    whatIChanged: "Switched to batching punch-in events in Redis lists and bulk-inserting into PostgreSQL in 5-second transactional batches (INSERT ... ON CONFLICT DO NOTHING).",
    whyIChoseIt: "Fastify provided sub-millisecond route handling, and Redis buffering absorbed high-frequency burst traffic seamlessly.",
    whatILearned: "Burst traffic shouldn't hit relational databases directly; buffer high-frequency writes in memory first.",
    githubUrl: "https://github.com/navinO0/hrms-v1-backend",
    liveUrl: "https://hrms-v1.vance.dev"
  },
  {
    id: "garment-production",
    name: "Garment Production & B2B/B2C Invoice Generator",
    oneLine: "B2B bulk order management, B2C invoice generation engine, automated tax rules, and fabric stock tracking.",
    year: 2025,
    backendResponsibilities: [
      "Engineered multi-currency B2B bulk invoicing engine with automated tax / GST calculation routines",
      "Built transactional garment production workflow tracker (cutting -> stitching -> QC -> packing)",
      "Designed asynchronous PDF rendering worker queue using Redis & BullMQ for high-speed download links",
      "Created audit-logged inventory ledger tracking raw fabric rolls, trim materials, and finished unit counts"
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "Zod", "PDFKit"],
    interestingProblem: "B2B bulk invoices with 50+ line items and custom tax tiers were causing PDF rendering to timeout and block concurrent API requests.",
    whatBroke: "Generating high-resolution 300DPI PDF invoices synchronously in the main HTTP route handler caused event loop lag spikes exceeding 2500ms.",
    whatIChanged: "Offloaded PDF rendering to a background job worker queue using Redis & BullMQ. Invoices generate asynchronously and stream via presigned download URLs.",
    whyIChoseIt: "Redis job queues guaranteed zero HTTP timeouts, and PostgreSQL decimal types ensured cent-exact accounting accuracy.",
    whatILearned: "Never generate binary documents or heavy PDFs synchronously inside an HTTP API request route handler.",
    githubUrl: "https://github.com/navinO0/garment-production-invoice-engine",
    liveUrl: "https://garment-api.vance.dev"
  },
  {
    id: "bloodlink",
    name: "BloodLink (Life-Saving Platform)",
    oneLine: "Real-time blood donation platform connecting donors with seekers, donor 90-day cooling period enforcement, and geo-location search.",
    year: 2024,
    backendResponsibilities: [
      "Built WebSocket real-time notification engine connecting blood seekers with nearby matching donors",
      "Implemented automated 90-day donor cooling period state machine to prevent health risk re-donations",
      "Engineered admin verification dashboard for donation validation and emergency escalation",
      "Integrated GIS geo-radius search for immediate donor proximity lookup"
    ],
    stack: ["Next.js", "Node.js", "Fastify", "Socket.io", "MongoDB", "Redis", "Google Cloud VPS"],
    interestingProblem: "Seekers were receiving duplicate emergency notifications when multiple nearby donors clicked 'Accept' simultaneously.",
    whatBroke: "Lack of atomic locks on donation requests allowed multiple donors to claim a single emergency request.",
    whatIChanged: "Added Redis distributed lock (`SETNX`) on donation request IDs, ensuring only the first accepting donor claims the request.",
    whyIChoseIt: "Fastify + Socket.io provided ultra-low latency push notifications critical for emergency medical requests.",
    whatILearned: "In life-critical applications, push notification delivery speed and concurrency isolation are non-negotiable.",
    githubUrl: "https://github.com/navinO0/blood-app-server",
    liveUrl: "https://bloodlinkhelp.netlify.app/"
  },
  {
    id: "ai-interview-coach",
    name: "AI Interview Coach (LLMs / Antigravity / Ollama)",
    oneLine: "Generative AI technical interview simulator with architect-level feedback, local LLM backup, and real-time streaming analysis.",
    year: 2025,
    backendResponsibilities: [
      "Orchestrated Generative AI agent workflows using Antigravity and Gemini Pro APIs",
      "Integrated local LLM backup fallback via Ollama / LMStudio for offline interview evaluations",
      "Built streaming response parser analyzing candidate communication clarity and technical depth",
      "Designed adaptive difficulty engine scaling question complexity based on real-time candidate answers"
    ],
    stack: ["Next.js 14", "Antigravity", "Ollama", "Gemini Pro", "AWS Lambda", "TypeScript", "PostgreSQL"],
    interestingProblem: "Cloud LLM API rate limits caused interview evaluation drops during peak user practice sessions.",
    whatBroke: "External API quotas were exceeded, returning 429 Too Many Requests to active candidates midway through mock interviews.",
    whatIChanged: "Implemented an automatic fallback pipeline to local Ollama LLM instances running on GPU nodes when cloud API quotas are exhausted.",
    whyIChoseIt: "Antigravity enabled high-level prompt orchestration, while local Ollama guaranteed 100% uptime fallback.",
    whatILearned: "Always build offline fallback pipelines for external AI models; cloud APIs will hit rate limits when you least expect it.",
    githubUrl: "https://github.com/navinO0/ai-interview-coach",
    liveUrl: "https://interviewguideai.netlify.app/"
  },
  {
    id: "collaborative-whiteboard",
    name: "Collaborative Whiteboard",
    oneLine: "Real-time room-based whiteboard, Fastify WebSocket server, Redis room state persistence, and canvas sync.",
    year: 2024,
    backendResponsibilities: [
      "Built room-based WebSocket server handling multi-user canvas drawing sync",
      "Implemented Redis transient caching for instant whiteboard state recovery upon page reload",
      "Engineered room access control using JWT tokens and room-level passcodes",
      "Designed PostgreSQL long-term canvas snapshot archival service"
    ],
    stack: ["Fastify", "Next.js", "WebSockets", "Socket.io", "Redis", "PostgreSQL", "Docker", "PM2"],
    interestingProblem: "Broadcast lag increased linearly as room participant count grew above 50 concurrent drawers.",
    whatBroke: "Broadcasting full canvas history payloads on every mousemove event saturated WebSocket bandwidth.",
    whatIChanged: "Switched to broadcasting delta vector coordinates instead of full canvas snapshots, reducing payload size by 94%.",
    whyIChoseIt: "Fastify WebSockets delivered sub-5ms packet routing, and Redis in-memory storage handled 1,000+ stroke events/sec.",
    whatILearned: "In real-time multiplayer systems, broadcast deltas, not full state frames.",
    githubUrl: "https://github.com/navinO0/cbwb-server",
    liveUrl: "https://cbwb.netlify.app/"
  },
  {
    id: "qr-auth",
    name: "Add Secondary Devices with QR Auth",
    oneLine: "Multi-device authentication system using QR codes, 1-hour session timeout, 3-minute QR validity, and Redis session caching.",
    year: 2024,
    backendResponsibilities: [
      "Designed multi-device linking protocol allowing up to 2 secondary devices per user session",
      "Implemented short-lived 3-minute QR code validity with dynamic Redis TTL keys",
      "Built CryptoJS payload encryption for secure device handshakes over public networks",
      "Engineered JWT session manager enforcing strict 1-hour session expiration"
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "CryptoJS", "JWT", "Redis", "Docker", "PM2"],
    interestingProblem: "Replay attacks were possible if a generated QR code image was photographed and scanned after the primary user logged off.",
    whatBroke: "Static QR tokens didn't invalidate immediately when the primary session ended.",
    whatIChanged: "Added a single-use nonce stored in Redis with 3-minute TTL that auto-destructs upon first scan or session termination.",
    whyIChoseIt: "Redis TTL keys provided automatic memory cleanup of expired QR nonces without background cron overhead.",
    whatILearned: "QR codes for authentication are single-use nonces bound to active sessions, never static strings.",
    githubUrl: "https://github.com/navinO0/qr-login-nextjs",
    liveUrl: "https://qrauthnext.netlify.app/login"
  },
  {
    id: "marriage-registration",
    name: "Marriage Registration Module (Civil Court e-Services)",
    oneLine: "Government civil court e-services module, multi-tier approval workflow (Assistant -> Sub-Registrar -> OSR eKYC), and 30-day objection notice automation.",
    year: 2024,
    backendResponsibilities: [
      "Engineered 4-stage approval workflow: Citizen Application -> Assistant Verification -> SRO Review -> OSR eKYC Biometrics",
      "Built automated 30-day notice period objection scheduler using node-cron",
      "Designed secure eKYC biometric verification payload integration",
      "Created digital marriage certificate generation engine with cryptographic signature verification"
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Knex.js", "Redis", "Cron"],
    interestingProblem: "Applications entering the 30-day objection period required precise automated status transitions without missing notice deadlines.",
    whatBroke: "Manual status updates by registry officers led to missed 30-day objection windows and delayed certificate issuance.",
    whatIChanged: "Automated notice period tracking with a resilient cron scheduler checking daily notice expirations and transitioning un-objected applications to 'Appointment Ready'.",
    whyIChoseIt: "PostgreSQL transaction guarantees ensured legal compliance and tamper-proof civil registry records.",
    whatILearned: "Government legal workflows require strict state machine auditability and automated deadline enforcement.",
    githubUrl: "https://github.com/example/marriage-registration-module",
    liveUrl: "https://enibandan-demo.vance.dev"
  },
  {
    id: "premutation-module",
    name: "Premutation & MP Land Transaction Module (MPWebGIS)",
    oneLine: "MP Government land transaction system, GIS-based land partition selection, real-time double-transaction checks, 48h payment validation cron.",
    year: 2024,
    backendResponsibilities: [
      "Integrated GIS visual land selection interface for parcel partition verification",
      "Designed real-time land availability checker preventing concurrent sale attempts on the same parcel",
      "Implemented automated 48-hour payment deadline reservation release via Redis TTL & Cron",
      "Optimized high-volume land record database queries using Knex.js query builder"
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Knex.js", "Redis", "Cron", "GIS API"],
    interestingProblem: "Users selected land partitions but abandoned payment, locking land parcels indefinitely and preventing legitimate buyers from purchasing.",
    whatBroke: "Land locks persisted without expiration, cluttering active transaction logs.",
    whatIChanged: "Enforced strict 48-hour temporary reservation locks in Redis. If payment is unverified after 48h, cron automatically releases the land back to the public pool.",
    whyIChoseIt: "Redis temporary keys decoupled short-term land reservations from permanent PostgreSQL land ownership records.",
    whatILearned: "High-value physical asset reservations must always have strict automatic expiration timeouts.",
    githubUrl: "https://github.com/example/premutation-land-module",
    liveUrl: "https://mpwebgis-demo.vance.dev"
  }
];

for (const p of projects) {
  insertProject.run(
    p.id, p.name, p.oneLine, p.year,
    JSON.stringify(p.backendResponsibilities),
    JSON.stringify(p.stack),
    p.interestingProblem, p.whatBroke, p.whatIChanged, p.whyIChoseIt, p.whatILearned,
    p.githubUrl, p.liveUrl
  );
}

// Seed Tools
const insertTool = db.prepare(`
  INSERT INTO tools (id, name, category, explanation, human_explanation, sarcastic_joke, why_it_exists, problem_it_solves)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const tools = [
  {
    id: "node",
    name: "Node.js & Event Loop",
    category: "framework",
    explanation: [
      "Asynchronous non-blocking libuv event loop architecture",
      "Single-threaded event-driven non-blocking I/O execution",
      "High-throughput I/O bound REST and WebSocket APIs"
    ],
    humanExplanation: "The workhorse runtime engine powering asynchronous, high-concurrency backend services.",
    sarcasticJoke: "Single-threaded until you realize event-driven non-blocking I/O runs circles around synchronous multi-threading for I/O bound tasks.",
    whyItExists: "High-concurrency event-driven server runtime",
    problemItSolves: "How to process thousands of non-blocking I/O API connections on minimal memory footprint."
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    explanation: [
      "Strict type safety & interface compilation",
      "Zod runtime schema type inference",
      "Shared DTO contracts between backend and client"
    ],
    humanExplanation: "Static type checker ensuring runtime payload shape errors fail during build time instead of 3 AM production calls.",
    sarcasticJoke: "Because 'undefined is not a function' isn't a surprise party you want at 3 AM in production.",
    whyItExists: "Type safety & developer tooling overlay for JavaScript",
    problemItSolves: "Catching contract mismatches and null pointer exceptions before code ever touches staging."
  },
  {
    id: "fastify",
    name: "Fastify",
    category: "framework",
    explanation: [
      "Sub-millisecond HTTP routing overhead with Radix Tree matcher",
      "Ajv JSON schema validation & fast serialization",
      "Plugin encapsulation architecture preventing context leaks"
    ],
    humanExplanation: "Express's faster, schema-driven cousin engineered for raw API throughput and low latency.",
    sarcasticJoke: "Why waste 5ms in routing middleware when Fastify does it in 0.2ms?",
    whyItExists: "Ultra-high performance HTTP web framework",
    problemItSolves: "Eliminating HTTP framework routing latency spikes under high burst traffic."
  },
  {
    id: "express",
    name: "Express.js",
    category: "framework",
    explanation: [
      "Battle-tested REST route middleware pipeline",
      "Flexible request/response transformation handlers",
      "Universal NPM middleware ecosystem"
    ],
    humanExplanation: "The classic, un-opinionated backend web framework for rapid REST API development.",
    sarcasticJoke: "Old faithful: older than most JS frameworks, but still running half the internet.",
    whyItExists: "Standard REST API server framework",
    problemItSolves: "Rapidly bootstrapping HTTP API routing pipelines with zero boilerplate."
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "framework",
    explanation: [
      "Modular architecture with Dependency Injection",
      "Decorators & TypeScript metadata reflection",
      "Automated OpenAPI (Swagger) documentation generation"
    ],
    humanExplanation: "Enterprise TypeScript framework enforcing clean architectural boundaries across large backend engineering teams.",
    sarcasticJoke: "For when your Node project grows so large that it starts craving Angular-style enterprise structure.",
    whyItExists: "Structured enterprise microservice architecture",
    problemItSolves: "Preventing large backend codebases from degrading into unmaintainable spaghetti."
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    explanation: [
      "ACID-compliant multi-version concurrency control (MVCC)",
      "B-Tree, GIN, and Partial indexing strategies",
      "Row-level locks (SELECT FOR UPDATE) and JSONB support"
    ],
    humanExplanation: "The rock-solid relational database of choice for financial ledgers, transactional ledgers, and complex queries.",
    sarcasticJoke: "Because your user's wallet balance shouldn't be an eventually-consistent guess.",
    whyItExists: "Relational data persistence & transactional ACID integrity",
    problemItSolves: "Storing complex financial & relational business data with zero corruption risk."
  },
  {
    id: "sqlite",
    name: "SQLite & Write-Ahead Logging",
    category: "database",
    explanation: [
      "Zero-configuration embedded SQL database",
      "Write-Ahead Logging (WAL) concurrent read performance",
      "Sub-millisecond local disk & memory queries"
    ],
    humanExplanation: "Zero-network overhead embedded database that runs in-process with ultra-fast responses.",
    sarcasticJoke: "No network roundtrip means your database queries run faster than your frontend renders.",
    whyItExists: "Embedded lightweight SQL storage",
    problemItSolves: "Providing zero-latency, file-based relational storage without running a standalone DB server."
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    explanation: [
      "Document-oriented NoSQL storage",
      "Flexible JSON-like schema structures",
      "Aggregation pipeline framework for log data"
    ],
    humanExplanation: "Document database ideal for rapidly changing document schemas and unstructured audit logs.",
    sarcasticJoke: "Schema-less is a dream until your code has to parse 4 different shapes of the same document.",
    whyItExists: "Flexible document storage",
    problemItSolves: "Storing unstructured or dynamically evolving document attributes without running schema migrations."
  },
  {
    id: "redis",
    name: "Redis & BullMQ",
    category: "caching",
    explanation: [
      "In-memory key-value data structures with TTL eviction",
      "Atomic distributed locks (SETNX) for race condition guards",
      "Background worker queue handling with BullMQ"
    ],
    humanExplanation: "Ultra-fast in-memory cache and queue engine that sits in front of databases to handle traffic bursts.",
    sarcasticJoke: "Caching is easy until cache invalidation and distributed race conditions enter the chat.",
    whyItExists: "In-memory high-speed data store & queue buffer",
    problemItSolves: "Buffer high-frequency write traffic and answer repeated queries in under 0.5ms."
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    category: "caching",
    explanation: [
      "Distributed commit log event streaming platform",
      "Partitioned consumer groups for horizontal scaling",
      "High-throughput asynchronous message pub/sub"
    ],
    humanExplanation: "Event streaming backbone for publishing microservice events asynchronously with zero message loss.",
    sarcasticJoke: "When HTTP webhooks just aren't durable enough for your millions of real-time event logs.",
    whyItExists: "Distributed event streaming log",
    problemItSolves: "Decoupling microservices with durable, replayable event queues at massive throughput."
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    category: "database",
    explanation: [
      "Distributed Lucene-based search engine",
      "Inverted index architecture for full-text queries",
      "High-volume log aggregation & analytics"
    ],
    humanExplanation: "Dedicated search engine for instant full-text search across millions of complex records.",
    sarcasticJoke: "Because 'SELECT * FROM table WHERE text LIKE %query%' is a crime against database servers.",
    whyItExists: "Full-text search & log analytics engine",
    problemItSolves: "Executing sub-second searches across millions of un-structured document records."
  },
  {
    id: "aws",
    name: "AWS Cloud (ECS, S3, Lambda)",
    category: "infrastructure",
    explanation: [
      "AWS ECS container orchestration & auto-scaling groups",
      "AWS S3 encrypted document vault & pre-signed URLs",
      "AWS Lambda serverless event handlers"
    ],
    humanExplanation: "Cloud infrastructure platform providing resilient compute, elastic scaling, and compliance storage.",
    sarcasticJoke: "The cloud is just someone else's server, but with auto-scaling and a monthly bill surprise.",
    whyItExists: "Resilient cloud compute & object storage",
    problemItSolves: "Deploying microservices with automated failover, auto-scaling, and secure storage."
  },
  {
    id: "docker",
    name: "Docker & Containers",
    category: "infrastructure",
    explanation: [
      "Multi-stage container builds isolating application runtimes",
      "Docker Compose local stack orchestration",
      "Environment parameter standardization across stages"
    ],
    humanExplanation: "Packages application dependencies into isolated containers so code runs identically anywhere.",
    sarcasticJoke: "'Works on my machine' -> Docker -> 'Now we ship your machine to production'.",
    whyItExists: "Runtime environment containerization",
    problemItSolves: "Eliminating environment drift bugs between development laptops and production servers."
  },
  {
    id: "kubernetes",
    name: "Kubernetes (K8s)",
    category: "infrastructure",
    explanation: [
      "Automated pod deployment & rolling update management",
      "Horizontal Pod Autoscaling (HPA) based on CPU/Memory load",
      "Self-healing container health checks and ingress routing"
    ],
    humanExplanation: "Container orchestration system that keeps microservice clusters healthy and autoscaled.",
    sarcasticJoke: "100 YAML files later, your single container auto-scales like magic.",
    whyItExists: "Production container cluster orchestration",
    problemItSolves: "Automating zero-downtime rolling updates, pod restarts, and load balancing across multi-node clusters."
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "infrastructure",
    explanation: [
      "Declarative Infrastructure as Code (IaC) configuration",
      "State management & plan execution diffs",
      "AWS VPC, RDS, and ECS infrastructure provisioning"
    ],
    humanExplanation: "Defines cloud servers, networks, and databases as version-controlled code rather than manual UI clicks.",
    sarcasticJoke: "Why click buttons in AWS console when you can describe an entire datacenter in code?",
    whyItExists: "Infrastructure as Code (IaC) automation",
    problemItSolves: "Making infrastructure provisioning repeatable, audit-logged, and peer-reviewable."
  },
  {
    id: "ollama",
    name: "Ollama & Local LLMs",
    category: "ai_frontier",
    explanation: [
      "Local open-weight LLM runtime (Llama 3, DeepSeek, Qwen)",
      "GPU node model hosting with GGUF quantization",
      "Zero-cloud dependency offline fallback pipelines"
    ],
    humanExplanation: "Runs AI language models locally on dedicated hardware for private, rate-limit-free AI workflows.",
    sarcasticJoke: "Because third-party cloud AI APIs will return 429 Too Many Requests right when your demo starts.",
    whyItExists: "Local private LLM inference engine",
    problemItSolves: "Integrating generative AI into backend applications without cloud rate limits or privacy leaks."
  },
  {
    id: "antigravity",
    name: "Antigravity & Agentic Frameworks",
    category: "ai_frontier",
    explanation: [
      "Autonomous agentic workflow orchestration & state loops",
      "Structured prompt engineering & multi-step tool execution",
      "Resilient error recovery & agentic decision trees"
    ],
    humanExplanation: "Framework for designing multi-step AI agents that can reason, run commands, and execute code safely.",
    sarcasticJoke: "Bridging the gap between human prompt intent and autonomous machine code execution.",
    whyItExists: "Agentic AI orchestration & tool-calling framework",
    problemItSolves: "Executing complex multi-step reasoning tasks without human intervention loops."
  },
  {
    id: "jmeter",
    name: "Apache JMeter",
    category: "load_testing",
    explanation: [
      "Simulating 5,000+ concurrent user request waves",
      "Measuring p50, p95, p99 latency distributions & error rates",
      "Connection pool saturation & bottleneck discovery"
    ],
    humanExplanation: "Load testing tool used to hammer server APIs with high concurrency before actual users do.",
    sarcasticJoke: "Because production users don't wait politely in line to hit your backend endpoints.",
    whyItExists: "API load & stress testing engine",
    problemItSolves: "Uncovering database deadlocks and memory leaks under simulated extreme traffic."
  },
  {
    id: "postman",
    name: "Postman & Newman",
    category: "api_testing",
    explanation: [
      "REST & GraphQL API endpoint payload verification",
      "Automated collection runner scripting via Newman",
      "Environment variable injection & JWT auth testing"
    ],
    humanExplanation: "The primary environment for crafting, testing, and documenting HTTP requests against raw backend routes.",
    sarcasticJoke: "The backend developer's true frontend interface.",
    whyItExists: "API verification & testing suite",
    problemItSolves: "Verifying backend API responses and error codes independently of UI implementations."
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    category: "security",
    explanation: [
      "Interception proxy for HTTP request/response tampering",
      "Penetration testing payload manipulation",
      "RBAC authorization bypass & security verification"
    ],
    humanExplanation: "Security tool for intercepting and inspecting raw HTTP traffic to catch authorization bypasses.",
    sarcasticJoke: "Proving that client-side validation is just a polite suggestion to an attacker.",
    whyItExists: "Web security & penetration testing proxy",
    problemItSolves: "Identifying RBAC flaws, unparameterized queries, and header vulnerabilities before attackers do."
  },
  {
    id: "zod",
    name: "Zod Schema Validation",
    category: "api_testing",
    explanation: [
      "TypeScript-first static & runtime schema declaration",
      "Strict input parsing & automatic error formatting",
      "Inference of static TypeScript types from validation schemas"
    ],
    humanExplanation: "Validates incoming HTTP request bodies and parameters against strict schemas before executing business logic.",
    sarcasticJoke: "Never trust user input; validate it at the gate before it breaks your DB query.",
    whyItExists: "Runtime data contract & schema validation",
    problemItSolves: "Preventing malformed request payloads from causing silent runtime bugs deep inside business logic."
  },
  {
    id: "websockets",
    name: "WebSockets & Socket.io",
    category: "infrastructure",
    explanation: [
      "Full-duplex real-time TCP socket connections",
      "Room-based event broadcasting with sub-10ms latency",
      "Heartbeat monitoring & automatic connection reconnection handling"
    ],
    humanExplanation: "Real-time bi-directional messaging protocol for live push notifications and multiplayer collaboration.",
    sarcasticJoke: "Polling every second is so 2010; WebSockets keep the connection open with sub-10ms events.",
    whyItExists: "Real-time bi-directional web protocol",
    problemItSolves: "Pushing server events to connected clients instantaneously without polling overhead."
  },
  {
    id: "prisma_sequelize",
    name: "Prisma & Sequelize & Knex",
    category: "database",
    explanation: [
      "Type-safe ORM query generation & schema migrations",
      "Relational mapping across complex foreign key structures",
      "Raw SQL query builder flexibility with Knex.js"
    ],
    humanExplanation: "Database abstraction tools providing type-safe querying and automated database schema migrations.",
    sarcasticJoke: "Hiding raw SQL until you need to optimize a 5-way JOIN query with EXPLAIN ANALYZE.",
    whyItExists: "Type-safe database abstraction & ORM layers",
    problemItSolves: "Bridging TypeScript code models with SQL databases safely and cleanly."
  },
  {
    id: "jwt_crypto",
    name: "JWT & CryptoJS Security",
    category: "security",
    explanation: [
      "Stateless signed JSON Web Tokens for authorization",
      "AES-256 payload encryption & HMAC signature verification",
      "Redis token revocation blacklists for instant logout"
    ],
    humanExplanation: "Cryptographic token system for handling stateless user sessions securely across microservices.",
    sarcasticJoke: "Stateless sessions are great until you need to revoke a compromised token immediately.",
    whyItExists: "Stateless authentication & cryptographic security",
    problemItSolves: "Authenticating user requests across distributed services without database session lookups on every request."
  },
  {
    id: "pm2",
    name: "PM2 & Linux Systemd",
    category: "infrastructure",
    explanation: [
      "Node.js process cluster mode for multi-core scaling",
      "Automatic process restart on uncaught exceptions",
      "Built-in log rotation and memory cap monitoring"
    ],
    humanExplanation: "Process management suite keeping backend server instances alive 24/7 on Linux VPS nodes.",
    sarcasticJoke: "Keeping your Node process running even when an unhandled promise rejection tries to kill it.",
    whyItExists: "Production process management",
    problemItSolves: "Ensuring zero downtime, automatic crash restarts, and full CPU core utilization."
  },
  {
    id: "python",
    name: "Python & Computer Vision",
    category: "languages",
    explanation: [
      "Scripting automation & data parsing pipelines",
      "Pillow (PIL) pixel-level image processing & background removal",
      "AI model embedding script integration"
    ],
    humanExplanation: "Versatile language used for backend automation scripts, computer vision processing, and AI integrations.",
    sarcasticJoke: "When you need a 10-line script to manipulate 1,000 images or process machine learning embeddings.",
    whyItExists: "Scripting, computer vision, and AI processing",
    problemItSolves: "Handling complex image processing, computer vision algorithms, and AI scripting with ease."
  },
  {
    id: "golang",
    name: "Go (Golang)",
    category: "languages",
    explanation: [
      "Lightweight goroutines for concurrency",
      "Statically compiled binaries with sub-millisecond boot times",
      "Low-latency API gateway proxy servers"
    ],
    humanExplanation: "Compiled systems language built for fast, concurrent microservices and high-throughput proxy layers.",
    sarcasticJoke: "No class inheritance, no async/await clutter—just fast goroutines and `if err != nil`.",
    whyItExists: "High-concurrency systems programming language",
    problemItSolves: "Building ultra-low latency proxy gateways and microservices handling 50k+ requests/sec."
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "api_testing",
    explanation: [
      "Declarative field selection query language",
      "Single HTTP endpoint consolidating nested data entities",
      "Strongly-typed schema definition language (SDL)"
    ],
    humanExplanation: "API query interface allowing clients to request exact fields, eliminating REST over-fetching.",
    sarcasticJoke: "Solving REST over-fetching by giving frontend developers full query power over your DB schema.",
    whyItExists: "Declarative API query layer",
    problemItSolves: "Fetching complex nested relational data trees in a single client roundtrip without payload bloat."
  },
  {
    id: "git_github",
    name: "Git & GitHub Actions",
    category: "infrastructure",
    explanation: [
      "Distributed version control & non-linear branching strategy",
      "Automated CI/CD pipelines for linting, testing, and container builds",
      "Pull request status checks & branch protection rules"
    ],
    humanExplanation: "Version control and automated release engine ensuring every code push is tested and deployed safely.",
    sarcasticJoke: "Because `git push --force` to main branch is not a valid continuous deployment strategy.",
    whyItExists: "Version control & continuous integration",
    problemItSolves: "Preventing code conflicts and automating test execution before code reaches production."
  },
  {
    id: "vitest",
    name: "Vitest & Jest",
    category: "api_testing",
    explanation: [
      "High-speed unit and integration test runner",
      "Mocking HTTP routes, database pools, and external APIs",
      "Code coverage reporting & snapshot testing"
    ],
    humanExplanation: "Automated test frameworks verifying backend functions, database queries, and API routes before shipping.",
    sarcasticJoke: "Tests take 10 seconds to run; debugging un-tested production bugs takes 10 hours.",
    whyItExists: "Automated test execution suite",
    problemItSolves: "Guaranteeing legacy code doesn't break when new features or refactors are merged."
  }
];

for (const t of tools) {
  insertTool.run(
    t.id, t.name, t.category,
    JSON.stringify(t.explanation),
    t.humanExplanation, t.sarcasticJoke,
    t.whyItExists, t.problemItSolves
  );
}

// Seed Learning Topics
const insertLearning = db.prepare(`
  INSERT INTO learning_topics (id, topic, order_index, status, what_i_understand, what_i_still_need_to_explore, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const learningTopics = [
  {
    id: "backend-fundamentals",
    topic: "Backend Fundamentals & HTTP Specification",
    orderIndex: 1,
    status: "mastered",
    whatIUnderstand: "HTTP status codes, headers, method semantics (GET vs POST vs PUT vs PATCH vs DELETE), idempotent vs non-idempotent operations, body stream handling.",
    whatIStillNeedToExplore: "HTTP/3 QUIC protocol details & custom HTTP proxying layer tuning.",
    notes: "HTTP specification reading changed my perspective on API contract design."
  },
  {
    id: "api-architecture",
    topic: "API Architecture & Gateway Design",
    orderIndex: 2,
    status: "mastered",
    whatIUnderstand: "REST principles, OpenAPI specs, validation schemas (Zod/TypeBox), routing overhead, middleware chains, error handling standardization.",
    whatIStillNeedToExplore: "gRPC proto contracts and Protobuf serialization speed comparisons against JSON.",
    notes: "Clean route schemas eliminate 90% of invalid runtime payload bugs."
  },
  {
    id: "database-design",
    topic: "Database Design & SQL Performance",
    orderIndex: 3,
    status: "mastered",
    whatIUnderstand: "Relational schema design, 3NF normalization, foreign key constraints, B-Tree index mechanics, EXPLAIN query planner output, connection pooling.",
    whatIStillNeedToExplore: "Sharding algorithms and PostgreSQL multi-region active-active logical replication.",
    notes: "A missing index on a 2-million row table is the fastest way to bring down an API server."
  },
  {
    id: "caching",
    topic: "Caching Patterns & Memory Stores",
    orderIndex: 4,
    status: "mastered",
    whatIUnderstand: "Cache-aside strategy, write-through caching, TTL policy selection, cache stampede prevention, Redis memory data types.",
    whatIStillNeedToExplore: "Memcached vs Redis cluster key distribution hashing under node failures.",
    notes: "Cache invalidation is a business logic problem, not just a key deletion call."
  }
];

for (const l of learningTopics) {
  insertLearning.run(
    l.id, l.topic, l.orderIndex, l.status,
    l.whatIUnderstand, l.whatIStillNeedToExplore, l.notes
  );
}

// Seed Trench Notes
const insertNote = db.prepare(`
  INSERT INTO trench_notes (id, quote, context, category)
  VALUES (?, ?, ?, ?)
`);

const trenchNotes = [
  {
    id: "note-1",
    quote: "Never trust frontend validation.",
    context: "Client-side validation is for UX. Backend validation is for security and data integrity. Anyone can send raw HTTP requests with curl or Postman.",
    category: "security"
  },
  {
    id: "note-2",
    quote: "Indexes exist because databases also get tired.",
    context: "Scanning 1,000,000 unindexed rows for every user search query turns your database server into a space heater.",
    category: "database"
  },
  {
    id: "note-3",
    quote: "Authentication without authorization is just knowing someone's name.",
    context: "Verifying WHO the user is doesn't mean they are allowed to read, edit, or delete the resource they requested.",
    category: "security"
  },
  {
    id: "note-4",
    quote: "Burst traffic shouldn't hit relational databases directly.",
    context: "Buffer high-frequency write traffic in Redis memory queues first, then flush in transactional batches to PostgreSQL.",
    category: "architecture"
  }
];

for (const n of trenchNotes) {
  insertNote.run(n.id, n.quote, n.context, n.category);
}

console.log("✅ Seed completed successfully!");
db.close();
