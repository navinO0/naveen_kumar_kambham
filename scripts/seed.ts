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
    whatBroke: "Standard `UPDATE inventory SET count = count - 1` without lock guards allowed overlapping SELECT queries to pass validation simultaneously.",
    whatIChanged: "Switched to atomic SQL `UPDATE inventory SET count = count - 1 WHERE id = $1 AND count >= 1 RETURNING count` combined with a Redis 30-second TTL lock queue.",
    whyIChoseIt: "Redis atomic primitives allowed sub-millisecond stock reservations before hitting the relational database.",
    whatILearned: "Inventory isn't a static integer in a row; it's a concurrent queue of reservation intents under high traffic.",
    githubUrl: "https://github.com/example/ecommerce-core-engine",
    liveUrl: "https://ecommerce-api.vance.dev"
  },
  {
    id: "insurance-policy-advisor",
    name: "Document Vector Search & Ingestion Pipeline",
    oneLine: "Asynchronous PDF ingestion, embedding generation, vector similarity search, and AI orchestration API.",
    year: 2025,
    backendResponsibilities: [
      "Engineered asynchronous job pipeline using BullMQ and Redis",
      "Built chunks & vector storage layer in PGVector",
      "Designed streaming response handlers for chunked search queries",
      "Created rate limiting abstraction per API key layer"
    ],
    stack: ["Fastify", "TypeScript", "PostgreSQL", "PGVector", "Redis", "BullMQ"],
    interestingProblem: "Heavy PDF parsing and text chunking blocked the main Node.js event loop for 4 seconds during document uploads, dropping active HTTP connections.",
    whatBroke: "Synchronous file extraction in the API handler caused high latency spikes (p99 > 4200ms) for all other users.",
    whatIChanged: "Decoupled file ingestion from the web thread. Uploads immediately return a `202 Accepted` job ID, and worker processes handle parsing asynchronously.",
    whyIChoseIt: "BullMQ + Redis provided persistent job retries, dead-letter queues, and concurrency throttling.",
    whatILearned: "CPU-heavy processing tasks do not belong inside an HTTP request handler thread.",
    githubUrl: "https://github.com/example/policy-ingestion-service",
    liveUrl: "https://vector-advisor-api.vance.dev"
  },
  {
    id: "cms-auth-platform",
    name: "RBAC & Developer Content CMS Engine",
    oneLine: "Role-based authorization platform, JWT session revocation, audit logging, and dynamic API key management.",
    year: 2025,
    backendResponsibilities: [
      "Built custom RBAC middleware evaluating permissions per resource action",
      "Engineered SQLite WAL database driver with migration management",
      "Created audit trail logger recording administrative mutations",
      "Designed secure session store using HTTP-only cookies with sliding refresh token rotation"
    ],
    stack: ["Next.js 16", "SQLite", "better-sqlite3", "TypeScript", "Zod", "Redis"],
    interestingProblem: "Database query overhead grew exponentially as every API request triggered 3 SQL joins to verify user role and granular permission strings.",
    whatBroke: "Database connection pool saturated under 500 req/sec during permission check loops.",
    whatIChanged: "Implemented an in-memory bitmask permission cache in Redis with instant cache invalidation upon role updates.",
    whyIChoseIt: "SQLite WAL mode provided ultra-fast zero-latency local disk reads for portfolio data while keeping server footprint light.",
    whatILearned: "Auth checks run on 100% of routes. If your permission check takes 20ms, your entire API is capped at 50 req/sec per thread.",
    githubUrl: "https://github.com/example/cms-backend-engine",
    liveUrl: "https://vance.dev"
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
    name: "Postman",
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
    name: "Burp Suite",
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
    name: "Apache JMeter",
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
    name: "SQL & PostgreSQL",
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
    id: "docker",
    name: "Docker",
    category: "infrastructure",
    explanation: [
      "Containerizing application runtimes with precise node/OS dependencies",
      "Reproducible dev environments avoiding host configuration drift",
      "Local multi-container stack orchestration (App + PG + Redis) via Docker Compose",
      "Service isolation & environment parity between local laptop and production"
    ],
    humanExplanation: "'Works on my machine' -> Docker -> 'your machine' -> 'server'... okay, now we all have the exact same problem.",
    sarcasticJoke: "Putting 'works on my machine' inside a Linux container.",
    whyItExists: "Environment consistency & container isolation",
    problemItSolves: "Why does it only run on your laptop?"
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
