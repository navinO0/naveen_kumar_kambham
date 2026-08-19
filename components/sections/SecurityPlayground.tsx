"use client";

import { useState } from "react";
import { UserRole, Action, Resource, RbacEvaluationResult } from "@/lib/rbac/evaluator";
import { ShieldCheck, ShieldAlert, Lock, Key, AlertOctagon, Terminal, ArrowRight, Check, X } from "lucide-react";

export default function SecurityPlayground() {
  // Interactive RBAC state
  const [role, setRole] = useState<UserRole>("EDITOR");
  const [action, setAction] = useState<Action>("UPDATE");
  const [resource, setResource] = useState<Resource>("Project");
  const [evalResult, setEvalResult] = useState<RbacEvaluationResult | null>({
    allowed: true,
    role: "EDITOR",
    action: "UPDATE",
    resource: "Project",
    decisionReason: "Role 'EDITOR' explicitly grants 'UPDATE' permission on resource 'Project'.",
    statusCode: 200,
    auditMessage: "[SECURITY AUDIT] Timestamp=2026-08-17T14:50:00.000Z Role=EDITOR Action=UPDATE Resource=Project Outcome=ALLOWED_200",
  });
  const [loading, setLoading] = useState(false);

  const roleEmojiMap: Record<UserRole, string> = {
    ADMIN: "👑",
    MANAGER: "💼",
    EDITOR: "✏️",
    VIEWER: "👁️"
  };

  const actionEmojiMap: Record<Action, string> = {
    READ: "📖",
    CREATE: "➕",
    UPDATE: "📝",
    DELETE: "🗑️",
    DROP_TABLE: "💥"
  };

  const resourceEmojiMap: Record<Resource, string> = {
    Project: "📁",
    Database: "🗄️",
    UserAccount: "👤",
    AuditLog: "📋"
  };

  const runEvaluation = async (r: UserRole, a: Action, res: Resource) => {
    setRole(r);
    setAction(a);
    setResource(res);
    setLoading(true);
    try {
      const resVal = await fetch("/api/security-eval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: r, action: a, resource: res }),
      });
      const data = await resVal.json();
      if (data.data) {
        setEvalResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="security" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag-red mb-2 uppercase font-bold">🛡️ DEFENSIVE ARCHITECTURE</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1d1b]">
            things attackers notice before users do <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(security learning 🕵️‍♂️)</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* defensive security principles & interactive RBAC engine */
        </p>
      </div>

      {/* Interactive RBAC Playground Card */}
      <div className="sketch-card p-4 sm:p-6 bg-white border-2 border-[#1e1d1b] mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6 gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#2ecc71] shrink-0" />
            <h3 className="font-bold font-mono text-base sm:text-lg text-[#1e1d1b]">
              🔐 INTERACTIVE RBAC MATRIX EVALUATOR
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // roles are not vibes 🙅‍♂️
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 & 2: Controls */}
          <div className="lg:col-span-2 space-y-4">
            {/* Role Select */}
            <div>
              <span className="font-mono text-xs font-bold text-[#57534e] block mb-2">
                1. SELECT USER ROLE (IDENTITY 👤):
              </span>
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mx-1 px-1">
                {(["ADMIN", "MANAGER", "EDITOR", "VIEWER"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => runEvaluation(r, action, resource)}
                    className={`px-3 py-1.5 font-mono text-xs sketch-button whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      role === r ? "bg-[#ffe866] font-bold" : "bg-white text-[#1e1d1b]"
                    }`}
                  >
                    <span>{roleEmojiMap[r]}</span>
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Select */}
            <div>
              <span className="font-mono text-xs font-bold text-[#57534e] block mb-2">
                2. SELECT ACTION INTENT (PERMISSION ⚡):
              </span>
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mx-1 px-1">
                {(["READ", "CREATE", "UPDATE", "DELETE", "DROP_TABLE"] as Action[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => runEvaluation(role, a, resource)}
                    className={`px-3 py-1.5 font-mono text-xs sketch-button whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      action === a ? "bg-[#ff5e5b] text-white font-bold" : "bg-white text-[#1e1d1b]"
                    }`}
                  >
                    <span>{actionEmojiMap[a]}</span>
                    <span>{a}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Select */}
            <div>
              <span className="font-mono text-xs font-bold text-[#57534e] block mb-2">
                3. SELECT TARGET RESOURCE (DATABASE OBJECT 🗄️):
              </span>
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mx-1 px-1">
                {(["Project", "Database", "UserAccount", "AuditLog"] as Resource[]).map((res) => (
                  <button
                    key={res}
                    onClick={() => runEvaluation(role, action, res)}
                    className={`px-3 py-1.5 font-mono text-xs sketch-button whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      resource === res ? "bg-[#3498db] text-white font-bold" : "bg-white text-[#1e1d1b]"
                    }`}
                  >
                    <span>{resourceEmojiMap[res]}</span>
                    <span>{res}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Live Evaluation Decision Output */}
          <div className="p-4 bg-[#1e1d1b] text-white rounded-lg sketch-border flex flex-col justify-between font-mono text-xs min-w-0 max-w-full overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-[#57534e] pb-2 mb-3">
                <span className="text-[10px] text-[#ffe866] flex items-center gap-1">
                  <span>🛡️</span> BACKEND RBAC EVALUATOR
                </span>
                <span className="text-[10px] text-gray-400">HTTP {evalResult?.statusCode}</span>
              </div>

              <div className="my-3 text-center p-4 rounded bg-[#292524] border border-[#57534e] flex flex-col items-center justify-center">
                {/* Pure EMOJI Outcome Expression (No Avatar Image) */}
                <div className="mb-2">
                  {evalResult?.allowed ? (
                    <span className="text-5xl select-none">🛡️😎</span>
                  ) : (
                    <span className="text-5xl select-none animate-pulse">🚨😱</span>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 block mb-1">EVALUATION OUTCOME</span>
                {evalResult?.allowed ? (
                  <div className="flex items-center justify-center space-x-2 text-[#2ecc71] font-bold text-lg">
                    <span>ALLOWED ✅</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-[#ff5e5b] font-bold text-lg">
                    <span>DENIED ❌</span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-[11px] leading-relaxed my-2">
                {evalResult?.decisionReason}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#57534e] text-[9px] text-gray-400 break-all">
              📜 {evalResult?.auditMessage}
            </div>
          </div>
        </div>
      </div>

      {/* Security Concepts Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SQL Injection */}
        <div className="sketch-card p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#ff5e5b] font-mono font-bold text-sm mb-2">
              <span>💉</span>
              <span>SQL INJECTION (SQLi)</span>
            </div>
            <p className="text-xs text-[#57534e] mb-3">
              Untrusted string concatenation transforms user input into executable SQL code inside the database engine.
            </p>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] font-mono text-[11px] space-y-1">
              <div className="text-red-600">❌ `SELECT * FROM users WHERE name = '` + input + `'`</div>
              <div className="text-green-700">✅ `SELECT * FROM users WHERE name = $1`</div>
            </div>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-4">
            // parameterize everything 🔒
          </span>
        </div>

        {/* Auth vs Authz */}
        <div className="sketch-card p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#3498db] font-mono font-bold text-sm mb-2">
              <span>🔑</span>
              <span>AUTHENTICATION VS AUTHORIZATION</span>
            </div>
            <p className="text-xs text-[#57534e] mb-3">
              Authentication verifies identity. Authorization verifies permissions. Never mix the two.
            </p>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] font-mono text-[11px] space-y-1">
              <div>User authenticated ✅ (JWT signature valid)</div>
              <div className="text-red-600">User authorized for `/admin/delete` ❌</div>
            </div>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-4">
            // knowing who you are != touching everything 🚫
          </span>
        </div>

        {/* Rate Limiting */}
        <div className="sketch-card p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#2ecc71] font-mono font-bold text-sm mb-2">
              <span>🚦</span>
              <span>RATE LIMITING & THROTTLING</span>
            </div>
            <p className="text-xs text-[#57534e] mb-3">
              Protect API infrastructure against credential stuffing, brute force, and runaway scraping bots.
            </p>
            <div className="p-2.5 bg-[#f6f4ee] border border-[#1e1d1b] font-mono text-[11px]">
              <div>Client → API Gateway → Redis Counter</div>
              <div className="text-gray-500 font-bold">Headers: X-RateLimit-Remaining</div>
            </div>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold mt-4">
            // rate limits save servers from bot waves 🤖
          </span>
        </div>
      </div>
    </section>
  );
}
