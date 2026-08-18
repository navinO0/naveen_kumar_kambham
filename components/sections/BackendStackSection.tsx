"use client";

import { Code2, Database, Shield, Terminal, Cpu, Server } from "lucide-react";

const stackGroups = [
  {
    category: "Languages",
    icon: Code2,
    color: "text-[#3498db]",
    items: [
      { name: "TypeScript", desc: "strict types so runtime bugs hit the compiler, not production users." },
      { name: "SQL", desc: "relational queries, indexing strategies, and transactional locks." },
      { name: "JavaScript / ESNext", desc: "async/await, promises, and Node.js event loop mechanics." },
    ],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    color: "text-[#2ecc71]",
    items: [
      { name: "Node.js", desc: "non-blocking I/O runtime powering fast API gateways." },
      { name: "Fastify", desc: "fast API framework without turning everything into middleware soup." },
      { name: "Next.js 16 App Router", desc: "Server Components, Route Handlers, and backend-for-frontend APIs." },
      { name: "REST APIs", desc: "clean OpenAPI specs, strict payload validation, and HTTP status codes." },
    ],
  },
  {
    category: "Databases & Caching",
    icon: Database,
    color: "text-[#ff9f43]",
    items: [
      { name: "PostgreSQL", desc: "the gold standard relational DB with ACID guarantees and JSONB support." },
      { name: "SQLite (WAL)", desc: "lightning-fast local embedded DB for zero-latency local state." },
      { name: "Redis", desc: "in-memory caching, sliding window rate limits, and Pub/Sub queues." },
    ],
  },
  {
    category: "Testing & Performance",
    icon: Cpu,
    color: "text-[#ff5e5b]",
    items: [
      { name: "Apache JMeter", desc: "stressing APIs with 5,000 concurrent requests before launch." },
      { name: "Postman", desc: "API payload exploration, header testing, and collection suites." },
      { name: "Vitest / Jest", desc: "unit tests and integration route testing with mock databases." },
    ],
  },
  {
    category: "Defensive Security",
    icon: Shield,
    color: "text-[#e74c3c]",
    items: [
      { name: "Burp Suite", desc: "intercepting HTTP requests to test client-side security assumptions." },
      { name: "RBAC & OWASP", desc: "role permission bitmasks, SQLi parameterized queries, and CORS." },
      { name: "Rate Limiting", desc: "protecting endpoints from brute-force & denial-of-service bot waves." },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    icon: Terminal,
    color: "text-[#9b59b6]",
    items: [
      { name: "Docker", desc: "reproducible Linux containers so 'works on my machine' works everywhere." },
      { name: "Linux / Bash", desc: "grep, tailing logs, systemd service units, and SSH remote administration." },
      { name: "Git & CI/CD", desc: "clean commits, GitHub Actions automated build and test pipelines." },
    ],
  },
];

export default function BackendStackSection() {
  return (
    <section id="stack" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag mb-2">TECH & RUNTIME</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            backend stack <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(human descriptions, no logo wall)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* grouped by architectural purpose */
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackGroups.map((group) => {
          const IconComp = group.icon;
          return (
            <div key={group.category} className="sketch-card p-5 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 border-b-2 border-dashed border-[#e8e4d9] pb-3 mb-4">
                  <IconComp className={`w-5 h-5 ${group.color}`} />
                  <h3 className="font-bold font-mono text-base text-[#1e1d1b]">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name} className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
                      <span className="font-bold font-mono text-xs text-[#1e1d1b] block">
                        `{item.name}`
                      </span>
                      <p className="text-xs text-[#57534e] mt-1 font-sans">
                        "{item.desc}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
