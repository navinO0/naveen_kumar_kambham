"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Database, Key, Lock, RefreshCw, Search, Server, Zap, AlertTriangle } from "lucide-react";

export default function DatabaseInternalsAndOptimization() {
  // EXPLAIN ANALYZE solver state
  const [isQueryOptimized, setIsQueryOptimized] = useState(false);

  return (
    <div className="space-y-8 my-8">
      {/* 1. Interactive EXPLAIN ANALYZE Bottleneck Visualizer */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">QUERY PERFORMANCE</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Why Is This Query Taking 4.2 Seconds? (EXPLAIN ANALYZE)
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Senior backend engineers profile execution plans with EXPLAIN ANALYZE instead of adding more servers.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0 font-mono text-xs">
            <span>QUERY MODE:</span>
            <button
              onClick={() => setIsQueryOptimized(!isQueryOptimized)}
              className={`px-3 py-1 sketch-button font-bold ${
                isQueryOptimized ? "bg-green-100 text-green-900 border-green-800" : "bg-red-100 text-red-900 border-red-800"
              }`}
            >
              {isQueryOptimized ? "OPTIMIZED (Index Scan) ✅" : "SLOW (Sequential Scan) 🐢"}
            </button>
          </div>
        </div>

        {/* Query & Explain Output Box */}
        <div className="p-4 sm:p-5 sketch-card bg-[#1e1d1b] text-white rounded-lg border-2 border-[#1e1d1b] font-mono text-xs space-y-4 min-w-0 max-w-full overflow-hidden">
          <div className="min-w-0 max-w-full overflow-hidden">
            <span className="text-[#ffe866] font-bold block mb-1">EXECUTED SQL QUERY:</span>
            <code className="text-[#2ecc71] font-mono text-[11px] sm:text-xs break-all block">
              SELECT * FROM orders WHERE customer_id = 'c_8810' AND status = 'PENDING' ORDER BY created_at DESC;
            </code>
          </div>

          <div className="p-3 sm:p-4 bg-[#292524] rounded-lg border border-[#57534e] min-w-0 max-w-full overflow-hidden">
            <span className="text-[#ff5e5b] font-bold block mb-2">
              POSTGRES EXPLAIN ANALYZE OUTPUT:
            </span>
            {!isQueryOptimized ? (
              <pre className="text-red-400 text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre p-1">
{`Seq Scan on orders  (cost=0.00..18450.00 rows=420 width=128) (actual time=12.400..4185.320 ms)
  Filter: ((customer_id = 'c_8810'::uuid) AND ((status)::text = 'PENDING'::text))
  Rows Removed by Filter: 4,999,580
Sort  (cost=18490.12..18491.17 rows=420 width=128) (actual time=4198.100..4202.400 ms)
  Sort Key: created_at DESC
Execution Time: 4205.80 ms   <-- ⚠️ 4.2 SECONDS (Table Scan across 5,000,000 rows!)`}
              </pre>
            ) : (
              <pre className="text-green-400 text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre p-1">
{`Index Scan using idx_orders_customer_status_created on orders  (cost=0.42..8.45 rows=420 width=128) (actual time=0.042..0.820 ms)
  Index Cond: ((customer_id = 'c_8810'::uuid) AND ((status)::text = 'PENDING'::text))
Execution Time: 1.15 ms      <-- ✅ 1.15 MILLISECONDS (Composite B-Tree Index Scan!)`}
              </pre>
            )}
          </div>

          <div className="pt-2 border-t border-[#57534e] text-[11px] font-sans text-gray-300">
            {!isQueryOptimized ? (
              <p className="text-red-300">
                ❌ <strong>Root Cause:</strong> Missing index forces PostgreSQL to read 5 Million disk blocks sequentially into RAM.
              </p>
            ) : (
              <p className="text-green-300 break-words">
                ✅ <strong>Senior Fix:</strong> Added composite index <code className="break-all">CREATE INDEX idx_orders_customer_status_created ON orders (customer_id, status, created_at DESC);</code> reducing execution time by <strong>3,656x</strong>!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Relational Database Concepts Grid */}
      <div className="sketch-card p-4 sm:p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">DATABASE INTERNALS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              PostgreSQL & Relational DB Mechanics
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
            // MVCC, PgBouncer, row locks & isolation levels
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">MVCC (Multi-Version Concurrency)</span>
            <p className="font-sans text-xs text-[#57534e]">
              PostgreSQL writes new tuple versions on UPDATE instead of locking readers, keeping reads non-blocking.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#3498db] block mb-1">ISOLATION LEVELS</span>
            <p className="font-sans text-xs text-[#57534e]">
              Read Committed (default), Repeatable Read (phantom read protection), Serializable (strict serializability).
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#2ecc71] block mb-1">PGBOUNCER POOLING</span>
            <p className="font-sans text-xs text-[#57534e]">
              Transaction-level connection pooling prevents backend process memory exhaustion under 10,000 clients.
            </p>
          </div>
        </div>
      </div>

      {/* 3. NoSQL Placement & Caching Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* NoSQL Matrix */}
        <div className="sketch-card p-4 sm:p-5 bg-white border-2 border-[#1e1d1b]">
          <span className="sticker-tag text-[10px] uppercase font-bold mb-2">NOSQL LANDSCAPE</span>
          <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-3">NoSQL Placement Matrix</h4>
          <div className="space-y-2">
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-[#ff5e5b]">Document (MongoDB)</span>
              <span className="text-[#57534e]">Flexible schema, JSON catalogs</span>
            </div>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-[#3498db]">Key-Value (Redis)</span>
              <span className="text-[#57534e]">Sub-ms caching, rate limits, sessions</span>
            </div>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-[#2ecc71]">Wide-Column (Cassandra)</span>
              <span className="text-[#57534e]">High write throughput, timeseries</span>
            </div>
          </div>
        </div>

        {/* Caching Patterns */}
        <div className="sketch-card p-4 sm:p-5 bg-white border-2 border-[#1e1d1b]">
          <span className="sticker-tag-red text-[10px] uppercase font-bold mb-2">CACHING PATTERNS</span>
          <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-3">Redis Caching & Stampede Defense</h4>
          <div className="space-y-2">
            <div className="p-2.5 bg-white border border-[#1e1d1b]">
              <span className="font-bold text-[#1e1d1b] block">Cache-Aside (Lazy Loading)</span>
              <span className="text-[11px] text-[#57534e]">App checks Redis → DB on miss → Populates Redis</span>
            </div>
            <div className="p-2.5 bg-white border border-[#1e1d1b]">
              <span className="font-bold text-[#1e1d1b] block">Stampede Protection</span>
              <span className="text-[11px] text-[#57534e]">Distributed Mutex Lock / Probabilistic Early Expiration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
