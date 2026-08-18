"use client";

import { useEffect, useState } from "react";
import { Activity, Coffee, Terminal } from "lucide-react";

export default function Footer() {
  const [health, setHealth] = useState<{ status: string; latencyMs: number } | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setHealth({ status: data.status, latencyMs: data.latencyMs });
        }
      })
      .catch(() => setHealth({ status: "DEGRADED", latencyMs: 999 }));
  }, []);

  return (
    <footer className="mt-auto py-10 px-4 bg-[#f6f4ee] border-t-2 border-[#1e1d1b]">
      <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#57534e]">
        {/* Left Copy */}
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-[#ff5e5b]" />
          <span>
            made with TypeScript, questionable debugging decisions and too much coffee.
          </span>
        </div>

        {/* Live Health Ping Indicator */}
        <div className="flex items-center space-x-3 bg-white px-3 py-1.5 border border-[#1e1d1b] sketch-border-sm">
          <div className="flex items-center space-x-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${health?.status === "OK" ? "bg-[#2ecc71] animate-pulse" : "bg-[#ff5e5b]"}`} />
            <span className="font-bold text-[#1e1d1b]">
              API STATUS: {health?.status || "CHECKING..."}
            </span>
          </div>
          {health && (
            <span className="text-[10px] text-gray-500">
              ({health.latencyMs}ms ping)
            </span>
          )}
        </div>

        {/* Right Graffiti Signature */}
        <div className="font-hand text-sm text-[#ff5e5b] font-bold transform -rotate-1">
          ~ navin (2026)
        </div>
      </div>
    </footer>
  );
}
