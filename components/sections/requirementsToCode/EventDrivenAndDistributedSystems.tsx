"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Cpu, GitBranch, Layers, Network, RefreshCw, Server, AlertTriangle, ShieldAlert } from "lucide-react";

export default function EventDrivenAndDistributedSystems() {
  const [activePattern, setActivePattern] = useState<"outbox" | "saga">("outbox");

  return (
    <div className="space-y-8 my-8">
      {/* 1. Messaging Systems & Event Bus */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">MESSAGING & EVENT-DRIVEN</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Messaging Platforms & Event Streams
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Decoupling synchronous operations into scalable background streams.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // Kafka, RabbitMQ, SQS & Dead-Letter Queues
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="metric-tile p-4">
            <span className="font-bold text-[#ff5e5b] block mb-1 text-[10px] uppercase tracking-wider">APACHE KAFKA</span>
            <span className="text-[10px] text-gray-500 block mb-2">High-throughput log replay</span>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Partitions, offsets, consumer groups, immutable log retention for event streaming.
            </p>
          </div>

          <div className="metric-tile p-4">
            <span className="font-bold text-[#3498db] block mb-1 text-[10px] uppercase tracking-wider">RABBITMQ</span>
            <span className="text-[10px] text-gray-500 block mb-2">Complex message routing</span>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              AMQP exchanges, topics, headers, acknowledgment, dead-letter exchanges (DLX).
            </p>
          </div>

          <div className="metric-tile p-4">
            <span className="font-bold text-[#2ecc71] block mb-1 text-[10px] uppercase tracking-wider">AWS SQS / SNS</span>
            <span className="text-[10px] text-gray-500 block mb-2">Cloud managed queues</span>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Pub/Sub fanout (SNS) to isolated worker queues (SQS) with redrive policies.
            </p>
          </div>

          <div className="metric-tile p-4">
            <span className="font-bold text-amber-400 block mb-1 text-[10px] uppercase tracking-wider">DEAD-LETTER QUEUES (DLQ)</span>
            <span className="text-[10px] text-gray-500 block mb-2">Poison pill isolation</span>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Failed messages isolated after 3 retries for developer inspection without blocking pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Distributed Transactions: Outbox vs Saga Pattern */}
      <div className="sketch-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">DISTRIBUTED CONSISTENCY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              What Happens If Service A Succeeds but Service B Fails?
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Handling distributed transactions across microservice boundaries without 2PC locking.
            </p>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActivePattern("outbox")}
              className={`px-3 py-1 sketch-button ${activePattern === "outbox" ? "bg-[#ffe866] font-bold" : "bg-white"}`}
            >
              Transactional Outbox
            </button>
            <button
              onClick={() => setActivePattern("saga")}
              className={`px-3 py-1 sketch-button ${activePattern === "saga" ? "bg-[#ffe866] font-bold" : "bg-white"}`}
            >
              Saga Pattern (Compensating)
            </button>
          </div>
        </div>

        {/* Pattern Content */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#fffef5] to-[#fff8e6] font-mono text-xs space-y-3">
          {activePattern === "outbox" ? (
            <div>
              <div className="border-b border-amber-200 pb-2 mb-3">
                <span className="font-bold text-[#ff5e5b] text-sm block">TRANSACTIONAL OUTBOX PATTERN</span>
                <p className="font-sans text-xs text-[#57534e] mt-0.5">
                  Guarantees that database state changes and message publishing succeed atomically in 1 transaction.
                </p>
              </div>
              <div className="terminal-card p-3 pt-8">
                <code className="text-[#ffe866] text-xs">
                  BEGIN TX → Update Order State → Insert Event to Outbox Table → COMMIT TX → Worker Relays Outbox to Kafka
                </code>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-amber-200 pb-2 mb-3">
                <span className="font-bold text-[#3498db] text-sm block">SAGA PATTERN (COMPENSATING TRANSACTIONS)</span>
                <p className="font-sans text-xs text-[#57534e] mt-0.5">
                  Executes a sequence of local transactions. If a step fails, Saga executes compensating rollback transactions backward.
                </p>
              </div>
              <div className="terminal-card p-3 pt-8">
                <code className="text-[#ffe866] text-xs">
                  Step 1: Create Pending Order → Step 2: Charge Payment (FAILS ❌) → Step 3 (Compensate): Cancel Order & Release Stock
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
