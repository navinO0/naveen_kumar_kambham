"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Database, Key, Lock, RefreshCw, Server, XCircle } from "lucide-react";

export default function ApiAndDatabaseEngineering() {
  // Transaction failure simulation state
  const [paymentStatus, setPaymentStatus] = useState<"SUCCESS" | "FAILED">("FAILED");

  return (
    <div className="space-y-8 my-8">
      {/* 1. API Design Practices ("An API is a contract") */}
      <div className="sketch-card p-4 sm:p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">API DESIGN & CONTRACTS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              An API is a Contract
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Predictable REST resource endpoints & uniform error payloads.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-2 md:mt-0">
            // predictable JSON schemas for client stability
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* REST Routes */}
          <div className="p-3.5 sm:p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-2">RESOURCE-ORIENTED ROUTES</span>
            <div className="space-y-2">
              <div className="p-2 bg-white border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-green-700 font-bold">POST /orders</span>
                <span className="text-gray-500">Create new order (201)</span>
              </div>
              <div className="p-2 bg-white border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-blue-700 font-bold">GET /orders/:id</span>
                <span className="text-gray-500">Retrieve order spec (200)</span>
              </div>
              <div className="p-2 bg-white border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-amber-700 font-bold">PATCH /orders/:id</span>
                <span className="text-gray-500">Update status / address</span>
              </div>
              <div className="p-2 bg-white border border-[#1e1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-red-700 font-bold">DELETE /orders/:id</span>
                <span className="text-gray-500">Cancel pending order</span>
              </div>
            </div>
          </div>

          {/* Consistent JSON Error Payload */}
          <div className="p-3.5 sm:p-4 bg-[#1e1d1b] text-white rounded-lg sketch-border min-w-0 max-w-full overflow-hidden">
            <span className="text-[#ffe866] font-bold text-xs block mb-2 border-b border-[#57534e] pb-1">
              PREDICTABLE ERROR FORMAT CONTRACT
            </span>
            <pre className="text-[#2ecc71] text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:whitespace-pre p-1">
{`{
  "code": "ORDER_NOT_FOUND",
  "message": "Order does not exist or has been deleted.",
  "requestId": "req_99182374",
  "timestamp": "2026-08-17T14:50:00Z"
}`}
            </pre>
            <p className="text-[10px] text-gray-400 mt-3 pt-2 border-t border-[#57534e]">
              Includes request correlation IDs for instant distributed log tracing without leaking stack traces.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Database Engineering & Layered Constraints */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">DATA INTEGRITY</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Database Engineering & Layered Rules
            </h3>
          </div>
          <span className="font-hand text-base text-[#ff5e5b] font-bold">
            "If the rule matters, don't rely on one layer to remember it."
          </span>
        </div>

        {/* Rule Progression Flow */}
        <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm mb-6">
          <span className="font-mono text-xs font-bold text-[#1e1d1b] block mb-3">
            EXAMPLE REQUIREMENT: "An order should never have a negative total."
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <div className="p-3 bg-white border border-[#1e1d1b] text-center">
              <span className="text-[#ff5e5b] font-bold block text-[10px]">LAYER 1</span>
              <span>Business Rule</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#ff5e5b]" />
            <div className="p-3 bg-white border border-[#1e1d1b] text-center">
              <span className="text-[#ff5e5b] font-bold block text-[10px]">LAYER 2</span>
              <span>Zod Validation</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#ff5e5b]" />
            <div className="p-3 bg-white border border-[#1e1d1b] text-center bg-[#ffe866]">
              <span className="text-[#1e1d1b] font-bold block text-[10px]">LAYER 3</span>
              <span>SQL CHECK (total &gt;= 0)</span>
            </div>
          </div>
        </div>

        {/* DB Engineering Topics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">INDEXING</span>
            <span className="text-[11px] text-[#57534e]">B-Tree indexes on FKs & query predicates</span>
          </div>
          <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">LOCKING</span>
            <span className="text-[11px] text-[#57534e]">SELECT FOR UPDATE row-level locks</span>
          </div>
          <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">TRANSACTIONS</span>
            <span className="text-[11px] text-[#57534e]">ACID guarantees across multi-row mutations</span>
          </div>
          <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">CONSTRAINTS</span>
            <span className="text-[11px] text-[#57534e]">Foreign keys & unique indexes</span>
          </div>
        </div>
      </div>

      {/* 3. Transaction Thinking & Interactive Failure Scenario */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">TRANSACTION THINKING</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              What Happens When Step 3 Fails?
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Backend engineering involves handling failure scenarios, not just happy paths.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0 font-mono text-xs">
            <span>TOGGLE SIMULATED GATEWAY:</span>
            <button
              onClick={() => setPaymentStatus(paymentStatus === "SUCCESS" ? "FAILED" : "SUCCESS")}
              className={`px-3 py-1 sketch-button font-bold ${
                paymentStatus === "SUCCESS" ? "bg-green-100 text-green-900 border-green-800" : "bg-red-100 text-red-900 border-red-800"
              }`}
            >
              {paymentStatus === "SUCCESS" ? "PAYMENT SUCCESS ✅" : "PAYMENT FAILED ❌"}
            </button>
          </div>
        </div>

        {/* Transaction Flow Diagram */}
        <div className="p-5 sketch-card bg-[#f6f4ee] border-2 border-[#1e1d1b]">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-white border border-[#1e1d1b]">
              <span className="text-[10px] text-gray-500 font-bold block">STEP 1</span>
              <span className="font-bold text-[#1e1d1b]">1. Create Order</span>
              <span className="text-[10px] text-green-700 block mt-1">Status: PENDING</span>
            </div>

            <div className="p-3 bg-white border border-[#1e1d1b]">
              <span className="text-[10px] text-gray-500 font-bold block">STEP 2</span>
              <span className="font-bold text-[#1e1d1b]">2. Reserve Stock</span>
              <span className="text-[10px] text-green-700 block mt-1">Stock -1 (Locked)</span>
            </div>

            <div className={`p-3 border ${paymentStatus === "SUCCESS" ? "bg-green-100 border-green-800" : "bg-red-100 border-red-800"}`}>
              <span className="text-[10px] font-bold block">STEP 3</span>
              <span className="font-bold">3. Charge Payment</span>
              <span className="text-[10px] block mt-1 font-bold">
                {paymentStatus === "SUCCESS" ? "200 Charged" : "402 Declined!"}
              </span>
            </div>

            <div className="p-3 bg-white border border-[#1e1d1b]">
              <span className="text-[10px] text-gray-500 font-bold block">STEP 4 (RECOVERY)</span>
              <span className="font-bold text-[#1e1d1b]">4. State Resolution</span>
              <span className="text-[10px] block mt-1 font-bold text-[#ff5e5b]">
                {paymentStatus === "SUCCESS" ? "Commit Transaction ✅" : "ROLLBACK & Release Stock 🔄"}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white border border-[#1e1d1b] font-mono text-xs">
            <span className="font-bold text-[#ff5e5b] block mb-1">FAILURE HANDLING POLICY:</span>
            {paymentStatus === "FAILED" ? (
              <p className="text-[#991b1b] font-sans text-xs">
                ❌ Transaction automatically aborts. Inventory reservation is released, order state is marked `PAYMENT_FAILED`, and no partial orphan records remain in PostgreSQL.
              </p>
            ) : (
              <p className="text-[#166534] font-sans text-xs">
                ✅ Transaction commits atomically. Stock deduction is finalized, payment ID is logged, and background order fulfillment job is dispatched to BullMQ.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Error Handling Status Matrix */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">HTTP SEMANTICS</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Errors Are Part of the Design
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // precise HTTP status codes &gt; generic 500 errors
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-xs">
          <div className="p-2.5 bg-amber-50 border border-amber-800 text-center">
            <span className="font-bold text-amber-900 block">400</span>
            <span className="text-[10px]">Validation</span>
          </div>
          <div className="p-2.5 bg-red-50 border border-red-800 text-center">
            <span className="font-bold text-red-900 block">401</span>
            <span className="text-[10px]">Unauthenticated</span>
          </div>
          <div className="p-2.5 bg-purple-50 border border-purple-800 text-center">
            <span className="font-bold text-purple-900 block">403</span>
            <span className="text-[10px]">Unauthorized</span>
          </div>
          <div className="p-2.5 bg-gray-100 border border-gray-800 text-center">
            <span className="font-bold text-gray-900 block">404</span>
            <span className="text-[10px]">Not Found</span>
          </div>
          <div className="p-2.5 bg-orange-50 border border-orange-800 text-center">
            <span className="font-bold text-orange-900 block">409</span>
            <span className="text-[10px]">Conflict</span>
          </div>
          <div className="p-2.5 bg-rose-50 border border-rose-800 text-center">
            <span className="font-bold text-rose-900 block">429</span>
            <span className="text-[10px]">Rate Limited</span>
          </div>
          <div className="p-2.5 bg-[#1e1d1b] text-white text-center">
            <span className="font-bold text-[#ff5e5b] block">500</span>
            <span className="text-[10px]">Server Error</span>
          </div>
        </div>
      </div>
    </div>
  );
}
