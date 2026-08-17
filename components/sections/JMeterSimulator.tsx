"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Flame, Gauge, Zap } from "lucide-react";

export default function JMeterSimulator() {
  const [concurrency, setConcurrency] = useState<number>(1000);
  const [metrics, setMetrics] = useState({
    avgLatencyMs: 32,
    p99LatencyMs: 85,
    cpuLoadPercent: 32,
    dbPoolUtilization: 28,
    errorRatePercent: 0,
    serverState: "WARMING" as "CHILLING" | "WARMING" | "SWEATING" | "MELTDOWN",
    statusNote: "Thread pool active. Database indexes doing heavy lifting cleanly.",
  });

  const [loading, setLoading] = useState(false);

  // Recalculate metrics on concurrency slider change
  useEffect(() => {
    let avg = Math.round(15 + Math.pow(concurrency / 500, 2.1) * 65);
    let p99 = Math.round(avg * (1.8 + concurrency / 2200));
    let cpu = Math.min(100, Math.round(12 + (concurrency / 5000) * 85));
    let db = Math.min(100, Math.round(8 + (concurrency / 5000) * 90));
    let err = concurrency > 3500 ? Number(((concurrency - 3500) / 120).toFixed(1)) : 0;

    let state: "CHILLING" | "WARMING" | "SWEATING" | "MELTDOWN" = "CHILLING";
    let note = "";

    if (concurrency < 500) {
      state = "CHILLING";
      note = "Server is sipping iced coffee. Socket pool happy.";
    } else if (concurrency < 1500) {
      state = "WARMING";
      note = "Thread pool active. DB indexes operating smoothly.";
    } else if (concurrency < 3500) {
      state = "SWEATING";
      note = "CPU fan spinning fast! DB connection pool saturating. CPU: 'Please stop.'";
    } else {
      state = "MELTDOWN";
      note = "Socket exhaustion! p99 latency spiking. Production users don't politely take turns!";
    }

    setMetrics({
      avgLatencyMs: avg,
      p99LatencyMs: p99,
      cpuLoadPercent: cpu,
      dbPoolUtilization: db,
      errorRatePercent: err,
      serverState: state,
      statusNote: note,
    });
  }, [concurrency]);

  return (
    <div className="sketch-card p-6 bg-[#fffefc] border-2 border-[#1e1d1b] my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="sticker-tag-red text-xs uppercase font-bold">INTERACTIVE SIMULATOR</span>
            <span className="font-mono text-xs font-bold text-[#ff5e5b]">APACHE JMETER LOAD SUITE</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b] mt-1">
            "What happens when 5,000 people hit the API at once?"
          </h3>
        </div>
        <div className="font-hand text-sm text-[#ff5e5b] font-bold mt-2 md:mt-0">
          // because production users don't politely take turns
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left 2 Cols: Slider & Metrics */}
        <div className="lg:col-span-2 space-y-5">
          {/* Slider Control */}
          <div className="p-4 bg-[#f6f4ee] border-1.5 border-[#1e1d1b] sketch-border-sm">
            <div className="flex items-center justify-between mb-2 font-mono text-xs md:text-sm font-bold">
              <span>CONCURRENT USERS WAVE:</span>
              <span className="text-[#ff5e5b] text-base">{concurrency.toLocaleString()} req/sec</span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="w-full h-3 bg-[#e8e4d9] rounded-lg appearance-none cursor-pointer accent-[#ff5e5b]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#57534e] mt-1">
              <span>100 users (quiet)</span>
              <span>1,500 users (busy)</span>
              <span>3,500 users (heavy)</span>
              <span>5,000 users (STRESS TEST)</span>
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">AVG LATENCY</span>
              <span className="text-lg font-black text-[#1e1d1b]">{metrics.avgLatencyMs} ms</span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">p99 LATENCY</span>
              <span className={`text-lg font-black ${metrics.p99LatencyMs > 300 ? "text-[#ff5e5b]" : "text-[#1e1d1b]"}`}>
                {metrics.p99LatencyMs} ms
              </span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">CPU LOAD</span>
              <span className="text-lg font-black text-[#1e1d1b]">{metrics.cpuLoadPercent}%</span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">ERRORS</span>
              <span className={`text-lg font-black ${metrics.errorRatePercent > 0 ? "text-[#ff5e5b]" : "text-[#2ecc71]"}`}>
                {metrics.errorRatePercent}%
              </span>
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-2 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>CPU Core Stress:</span>
                <span>{metrics.cpuLoadPercent}%</span>
              </div>
              <div className="w-full bg-[#e8e4d9] h-2.5 rounded-full overflow-hidden border border-[#1e1d1b]">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.cpuLoadPercent > 80 ? "bg-[#ff5e5b]" : metrics.cpuLoadPercent > 50 ? "bg-[#ff9f43]" : "bg-[#2ecc71]"
                  }`}
                  style={{ width: `${metrics.cpuLoadPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>DB Connection Pool (Max 100):</span>
                <span>{metrics.dbPoolUtilization}%</span>
              </div>
              <div className="w-full bg-[#e8e4d9] h-2.5 rounded-full overflow-hidden border border-[#1e1d1b]">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.dbPoolUtilization > 85 ? "bg-[#ff5e5b]" : metrics.dbPoolUtilization > 60 ? "bg-[#ff9f43]" : "bg-[#3498db]"
                  }`}
                  style={{ width: `${metrics.dbPoolUtilization}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Sweating Server Cartoony SVG */}
        <div className="flex flex-col items-center justify-center p-5 bg-[#f6f4ee] border-2 border-[#1e1d1b] sketch-border relative overflow-hidden">
          {/* Animated Sweating Server Box */}
          <motion.div
            animate={
              metrics.serverState === "MELTDOWN"
                ? { x: [-3, 3, -3, 3, 0], y: [-2, 2, -2, 2, 0] }
                : metrics.serverState === "SWEATING"
                ? { x: [-1.5, 1.5, -1.5, 0] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="w-32 h-36 bg-[#1e1d1b] rounded-lg p-3 relative flex flex-col justify-between shadow-lg"
          >
            {/* Server Rack Status Lights */}
            <div className="flex justify-between items-center border-b border-[#57534e] pb-2">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ecc71]" />
                <span className={`w-2.5 h-2.5 rounded-full ${metrics.serverState !== "CHILLING" ? "bg-[#ff9f43]" : "bg-gray-700"}`} />
                <span className={`w-2.5 h-2.5 rounded-full ${metrics.serverState === "MELTDOWN" ? "bg-[#ff5e5b] animate-ping" : "bg-gray-700"}`} />
              </div>
              <span className="text-[9px] font-mono text-[#ffe866]">NODE_01</span>
            </div>

            {/* Cartoony Server Face */}
            <div className="flex flex-col items-center justify-center my-auto">
              {metrics.serverState === "CHILLING" && (
                <div className="text-center text-white">
                  <div className="text-xl">😎</div>
                  <span className="text-[10px] font-mono text-green-400">CHILLING</span>
                </div>
              )}
              {metrics.serverState === "WARMING" && (
                <div className="text-center text-white">
                  <div className="text-xl">😐</div>
                  <span className="text-[10px] font-mono text-yellow-400">WARMING UP</span>
                </div>
              )}
              {metrics.serverState === "SWEATING" && (
                <div className="text-center text-white">
                  <div className="text-2xl animate-bounce">😰</div>
                  <span className="text-[10px] font-mono text-orange-400 font-bold">SWEATING</span>
                </div>
              )}
              {metrics.serverState === "MELTDOWN" && (
                <div className="text-center text-white">
                  <div className="text-3xl animate-spin">😱</div>
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase animate-pulse">MELTDOWN</span>
                </div>
              )}
            </div>

            {/* Sweat Drop or Flame annotation */}
            {metrics.serverState === "SWEATING" && (
              <span className="absolute -top-2 -right-2 text-lg">💦</span>
            )}
            {metrics.serverState === "MELTDOWN" && (
              <span className="absolute -top-3 -right-3 text-xl">🔥</span>
            )}
          </motion.div>

          {/* Speech bubble */}
          <div className="mt-3 p-2 bg-white border border-[#1e1d1b] sketch-border-sm text-center">
            <span className="font-hand text-xs text-[#1e1d1b] font-bold block">
              "{metrics.statusNote}"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
