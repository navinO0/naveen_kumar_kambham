import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "portfolio.db");
const db = new Database(dbPath);

console.log("🌱 Seeding portfolio.db with developer content...");

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
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "Zod"],
    interestingProblem: "B2B bulk invoices with 50+ line items and custom tax tiers were causing PDF rendering to timeout and block concurrent API requests.",
    whatBroke: "Generating high-resolution 300DPI PDF invoices synchronously in the main HTTP route handler caused event loop lag spikes exceeding 2500ms.",
    whatIChanged: "Offloaded PDF rendering to a background job worker queue using Redis & BullMQ. Invoices generate asynchronously and stream via presigned download URLs.",
    whyIChoseIt: "Redis job queues guaranteed zero HTTP timeouts, and PostgreSQL decimal types ensured cent-exact accounting accuracy.",
    whatILearned: "Never generate binary documents or heavy PDFs synchronously inside an HTTP API request route handler.",
    githubUrl: "https://github.com/example/garment-production-invoice-engine",
    liveUrl: "https://garment-api.vance.dev"
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
    githubUrl: "https://github.com/example/hrms-v1-backend",
    liveUrl: "https://hrms-v1.vance.dev"
  },
  {
    id: "fashion-demostore",
    name: "Fashion Demo Store (E-Commerce Platform)",
    oneLine: "Modern fashion e-commerce backend platform featuring dynamic product catalog, multi-variant inventory, persistent cart, and checkout flow.",
    year: 2025,
    backendResponsibilities: [
      "Designed multi-variant product catalog schema (size, color, material, SKU stock mapping)",
      "Built resilient checkout API with session-bound inventory reservation locks",
      "Implemented image URL resolution pipeline for variant thumbnails and cart items",
      "Engineered webhook handlers for Stripe payment status updates and order fulfillment triggers"
    ],
    stack: ["Next.js 16", "Node.js", "PostgreSQL", "Prisma", "Stripe API", "Zod"],
    interestingProblem: "Cart items lost image thumbnail URLs during checkout transitions due to mismatched nested product data structures.",
    whatBroke: "Checkout payload omitted variant image associations, causing image fallback failures and broken checkout UI media.",
    whatIChanged: "Created a standardized resolveImageUrl utility and schema validator guaranteeing image fallback resolution across persistent cart and instant 'Buy Now' paths.",
    whyIChoseIt: "Prisma ORM provided strict relational mapping between products, SKUs, and variant assets, while Next.js Server Actions simplified state updates.",
    whatILearned: "Data contract consistency between API responses and frontend components is crucial for flawless checkout experiences.",
    githubUrl: "https://github.com/example/fashion-demostore-platform",
    liveUrl: "https://fashion-demo.vance.dev"
  },
  {
    id: "restaurant-ordering",
    name: "Restaurant Ordering & Kitchen Engine",
    oneLine: "QR ordering, live kitchen workflow state machine, payment webhooks, and transactional API gateway.",
    year: 2024,
    backendResponsibilities: [
      "Designed order state machine (pending -> paid -> kitchen -> ready -> fulfilled)",
      "Built idempotent payment webhook handler with HMAC validation",
      "Created WebSocket stream for live kitchen display synchronization",
      "Engineered PostgreSQL database schema with price snapshots to prevent menu change bugs"
    ],
    stack: ["Node.js", "Fastify", "PostgreSQL", "Redis", "WebSockets", "Zod"],
    interestingProblem: "Clients were submitting price totals directly from frontend local storage, allowing malicious users to modify menu prices before payment link creation.",
    whatBroke: "A test client modified item price from $18.50 to $0.01 in browser dev tools during checkout.",
    whatIChanged: "Removed client-side pricing entirely. The frontend now sends item IDs + options; backend queries database prices in a isolated transaction and calculates immutable totals.",
    whyIChoseIt: "Fastify provided sub-millisecond route execution overhead, and PostgreSQL guaranteed ACID compliance for live order updates.",
    whatILearned: "Never trust total price values from a browser. The client is an untrusted remote CLI.",
    githubUrl: "https://github.com/example/restaurant-ordering-api",
    liveUrl: "https://demo-restaurant-api.vance.dev"
  },
  {
    id: "ecommerce-backend",
    name: "High-Concurrency Ecommerce Engine",
    oneLine: "Flash sale stock reservations, payment processing, transactional inventory locking, and admin permissions.",
    year: 2024,
    backendResponsibilities: [
      "Implemented concurrency-safe inventory deduction using atomic SQL queries",
      "Created Redis distributed locks for cart item checkout isolation",
      "Integrated Stripe webhook retries with idempotent event log tracking",
      "Built RBAC permission matrix for Store Manager vs Inventory Admin"
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "Stripe API"],
    interestingProblem: "200 concurrent users clicked 'Buy Now' during a flash sale for 15 remaining items, resulting in a race condition that drove stock to -14.",
    whatBroke: "Standard UPDATE inventory SET count = count - 1 without lock guards allowed overlapping SELECT queries to pass validation simultaneously.",
    whatIChanged: "Switched to atomic SQL UPDATE inventory SET count = count - 1 WHERE id = $1 AND count >= 1 RETURNING count combined with a Redis 30-second TTL lock queue.",
    whyIChoseIt: "Redis atomic primitives allowed sub-millisecond stock reservations before hitting the relational database.",
    whatILearned: "Inventory isn't a static integer in a row; it's a concurrent queue of reservation intents under high traffic.",
    githubUrl: "https://github.com/example/ecommerce-core-engine",
    liveUrl: "https://ecommerce-api.vance.dev"
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
    id: "postman",
    name: "Postman & Insomnia",
    category: "api_testing",
    explanation: [
      "API route exploration & manual payload verification",
      "Environment variables management (Local / Staging / Production)",
      "Automated test runner collections & regression suites",
      "Header inspection, JWT authorization token passing, and raw payload manipulation"
    ],
    humanExplanation: "Postman is where I check whether my API works before blaming the frontend.",
    sarcasticJoke: "The frontend says it's the backend. The backend says it's the frontend. Postman gets dragged into the relationship.",
    whyItExists: "API contract testing & payload validation",
    problemItSolves: "Does this endpoint actually behave when stripped of UI assumptions?"
  },
  {
    id: "burp-suite",
    name: "Burp Suite & OWASP ZAP",
    category: "security",
    explanation: [
      "Intercepting and inspecting live HTTP request/response traffic",
      "Modifying headers, payloads, and parameter values on the fly",
      "Authentication & authorization boundary testing",
      "Testing session replay attacks and rate limiting defenses"
    ],
    humanExplanation: "Burp lets you stop pretending the client will behave nicely.",
    sarcasticJoke: "Your frontend said `role=user`. Burp said `role=admin`. Now we have a meeting.",
    whyItExists: "Security testing & request inspection",
    problemItSolves: "What happens if the client lies to your server?"
  },
  {
    id: "jmeter",
    name: "Apache JMeter & k6",
    category: "load_testing",
    explanation: [
      "High-concurrency load & stress testing execution",
      "Latency, throughput, and error rate measurement under load",
      "Database connection pool saturation and CPU bottleneck discovery",
      "Simulating 100 to 5,000 concurrent user request waves"
    ],
    humanExplanation: "JMeter answers the question every backend developer eventually gets asked: 'It works perfectly for me. What happens when 5,000 people do it at the same time?'",
    sarcasticJoke: "Because production users don't politely take turns.",
    whyItExists: "Load & concurrency testing",
    problemItSolves: "What happens when everyone arrives at the exact same second?"
  },
  {
    id: "sql",
    name: "PostgreSQL & MySQL",
    category: "database",
    explanation: [
      "Index strategies (B-Tree, GIN, Partial indexes) for fast lookups",
      "Complex JOINs, aggregation pipelines, and query execution plan analysis (`EXPLAIN ANALYZE`)",
      "ACID transaction guarantees and row-level locking (`SELECT FOR UPDATE`)",
      "Normalization, foreign key constraints, and cursor pagination"
    ],
    humanExplanation: "SQL looks harmless until somebody removes the WHERE clause.",
    sarcasticJoke: "Indexes exist because databases also get tired.",
    whyItExists: "Relational data persistence & transactional integrity",
    problemItSolves: "Storing and fetching structured business data reliably without corruption."
  },
  {
    id: "redis",
    name: "Redis",
    category: "caching",
    explanation: [
      "In-memory key-value caching layer with TTL expiration",
      "Session state management & token revocation lists",
      "Sliding window rate-limiting counters",
      "Distributed locks (`SETNX`) and lightweight Pub/Sub message queues"
    ],
    humanExplanation: "Redis is the thing you add after the database starts wondering why you're asking it the same question 400 times.",
    sarcasticJoke: "Caching is easy until invalidation enters the room.",
    whyItExists: "In-memory high-speed data store & temporary cache",
    problemItSolves: "Why are we asking PostgreSQL the exact same query 900 times per minute?"
  },
  {
    id: "kafka",
    name: "Apache Kafka & RabbitMQ",
    category: "messaging",
    explanation: [
      "Asynchronous event streaming and message queue decoupling",
      "Topic partitioning, offsets, and consumer group scaling",
      "Dead-letter queue isolation for poison pill payloads",
      "Transactional outbox pattern implementation"
    ],
    humanExplanation: "Message queues let backend systems do heavy work in the background without making the HTTP request hang.",
    sarcasticJoke: "Synchronous HTTP calls across 8 microservices is just a monolith connected by hope.",
    whyItExists: "Asynchronous event streaming & queue decoupling",
    problemItSolves: "Why should the user wait 4 seconds for slow email & PDF workers during checkout?"
  },
  {
    id: "docker",
    name: "Docker & Kubernetes",
    category: "infrastructure",
    explanation: [
      "Containerizing application runtimes with precise node/OS dependencies",
      "Reproducible dev environments avoiding host configuration drift",
      "Local multi-container stack orchestration (App + PG + Redis) via Docker Compose",
      "Kubernetes pod deployment, HPA autoscaling, and readiness/liveness probes"
    ],
    humanExplanation: "'Works on my machine' -> Docker -> 'your machine' -> 'server'... okay, now we all have the exact same problem.",
    sarcasticJoke: "Putting 'works on my machine' inside a Linux container.",
    whyItExists: "Environment consistency & container isolation",
    problemItSolves: "Why does it only run on your laptop?"
  },
  {
    id: "aws",
    name: "AWS Cloud (EC2, ECS, S3, RDS)",
    category: "infrastructure",
    explanation: [
      "Scalable cloud infrastructure hosting and VPC network isolation",
      "Managed databases with automated multi-AZ failover and backups",
      "Object storage (S3) and CloudFront CDN distribution",
      "IAM access control and KMS encryption key management"
    ],
    humanExplanation: "Cloud hosting lets us run resilient distributed applications without buying physical server racks.",
    sarcasticJoke: "The cloud is just someone else's computer, but with hourly billing.",
    whyItExists: "Scalable cloud hosting & infrastructure resilience",
    problemItSolves: "How do we host elastic microservices with high availability and automated failover?"
  },
  {
    id: "opentelemetry",
    name: "OpenTelemetry & Jaeger",
    category: "observability",
    explanation: [
      "Distributed request context propagation across microservice boundaries",
      "End-to-end trace span collection and bottleneck detection",
      "Correlation ID tracking from HTTP gateway to database queries"
    ],
    humanExplanation: "Distributed tracing gives you a X-ray scanner into multi-service request flows.",
    sarcasticJoke: "Without distributed tracing, microservice debugging is just finger-pointing in Slack.",
    whyItExists: "Distributed request tracing & telemetry",
    problemItSolves: "Which microservice step failed when a payment request timed out midway?"
  },
  {
    id: "prometheus",
    name: "Prometheus & Grafana",
    category: "observability",
    explanation: [
      "Time-series metric collection (request rate, p99 latency, error rate)",
      "Real-time dashboard visualization and threshold alerting",
      "Monitoring CPU utilization, memory pressure, and DB connection pools"
    ],
    humanExplanation: "Metrics show you system health before production users start filing bug reports.",
    sarcasticJoke: "If you don't monitor p99 latency, your users will do it for you.",
    whyItExists: "Metrics collection & latency dashboards",
    problemItSolves: "How do we detect latency spikes before users start reporting crashes?"
  },
  {
    id: "sqlite",
    name: "SQLite (WAL Mode)",
    category: "database",
    explanation: [
      "Zero-config embedded relational database engine",
      "Write-Ahead Logging (WAL) for concurrent read performance",
      "Single-file database storage for local applications & lightweight tools"
    ],
    humanExplanation: "SQLite is the fastest database because it lives in the same process memory space.",
    sarcasticJoke: "Sometimes a single file is better than a 4-node database cluster.",
    whyItExists: "Simple zero-config embedded data storage",
    problemItSolves: "Do we really need a database cluster for lightweight local storage?"
  },
  {
    id: "zod",
    name: "Zod & OpenAPI",
    category: "api_testing",
    explanation: [
      "Runtime schema validation for untrusted HTTP request payloads",
      "Automated TypeScript type inference from validation schemas",
      "Standardized OpenAPI/Swagger specification generation"
    ],
    humanExplanation: "Zod guarantees that untrusted input conforms to strict types before your backend touches it.",
    sarcasticJoke: "Zod is the bouncer at the door of your HTTP request handler.",
    whyItExists: "Boundary type-safety & contract validation",
    problemItSolves: "How do we block invalid payloads before they hit our business logic?"
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
  },
  {
    id: "performance-load",
    topic: "Performance Tuning & Load Testing",
    orderIndex: 5,
    status: "building",
    whatIUnderstand: "Load test scripting (JMeter, k6), measuring p50, p95, p99 latencies, socket exhaustion, event loop lag, connection pool tuning.",
    whatIStillNeedToExplore: "Linux kernel networking sysctl tuning (`tcp_tw_reuse`, `somaxconn`) for 50k req/sec servers.",
    notes: "p99 latency matters infinitely more than average response time under heavy load."
  },
  {
    id: "security-rbac",
    topic: "API Security & Defensive Architecture",
    orderIndex: 6,
    status: "building",
    whatIUnderstand: "OWASP Top 10 defenses, SQL injection prevention via parameterized queries, authentication (JWT/Sessions) vs authorization (RBAC/ABAC), rate limiting headers, CORS policies.",
    whatIStillNeedToExplore: "OAuth2 / OIDC PKCE flow internals & Mutual TLS (mTLS) microservice identity verification.",
    notes: "Security is a system architecture constraint, not an afterthought middleware check."
  },
  {
    id: "distributed-systems",
    topic: "Distributed Systems & Message Queues",
    orderIndex: 7,
    status: "exploring",
    whatIUnderstand: "Publisher/Subscriber pattern, RabbitMQ/Redis queues, asynchronous job processing, dead-letter queues, event-driven decoupling.",
    whatIStillNeedToExplore: "Kafka partition rebalancing, Raft consensus algorithm details, and Saga pattern distributed transaction rollbacks.",
    notes: "When services talk asynchronously, error handling requires idempotency keys."
  },
  {
    id: "devops-infra",
    topic: "DevOps & Infrastructure",
    orderIndex: 8,
    status: "exploring",
    whatIUnderstand: "Docker multi-stage builds, environment variables injection, Nginx reverse proxy configuration, systemd service setup, basic CI/CD GitHub Actions.",
    whatIStillNeedToExplore: "Kubernetes ingress controllers, Helm charts, and automated zero-downtime rolling deployment strategies.",
    notes: "Reproducible builds in Docker prevent 99% of 'works on my machine' deployment fires."
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
    quote: "Logging the error is nice. Logging enough context to actually debug it is nicer.",
    context: "An error log saying `Error: failed to update` is useless. Log the user ID, resource ID, query params, and stack trace.",
    category: "debugging"
  },
  {
    id: "note-5",
    quote: "Caching is easy until invalidation enters the room.",
    context: "Serving cached stale data to a user who just changed their password or updated their order status is worse than no cache at all.",
    category: "architecture"
  },
  {
    id: "note-6",
    quote: "Every distributed system eventually becomes a meeting about consistency.",
    context: "CAP theorem isn't a theoretical paper; it's the exact reason why your secondary database read replica showed stale data for 300ms.",
    category: "architecture"
  },
  {
    id: "note-7",
    quote: "Production is where every assumption becomes evidence.",
    context: "You think your database query is fast until 500 users execute it simultaneously in production.",
    category: "performance"
  }
];

for (const n of trenchNotes) {
  insertNote.run(n.id, n.quote, n.context, n.category);
}

console.log("✅ Seed completed successfully!");
db.close();
