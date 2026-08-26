import { Suspense } from "react";
import Link from "next/link";
import GravityPlayground from "@/components/sections/GravityPlayground";
import { ArrowLeft, Sparkles, Gamepad2, PenTool } from "lucide-react";

export const metadata = {
  title: "Gravity Arcade & Real-Time Whiteboard | Collaborative Playground",
  description: "High-performance collaborative arcade & real-time whiteboard with WebSocket synchronization, retro games, and room chat.",
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 pl-3 border-l border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>FULLSCREEN COLLABORATIVE SUITE</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden sm:inline">REAL-TIME SYNC ACTIVE</span>
            <span className="sm:hidden">LIVE</span>
          </div>
        </div>
      </header>

      {/* Main Full Page Playground Area */}
      <main className="flex-1 p-2 sm:p-6 max-w-7xl w-full mx-auto flex flex-col justify-center">
        <Suspense fallback={
          <div className="w-full h-[600px] bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span>LOADING GRAVITY PLAYGROUND...</span>
          </div>
        }>
          <GravityPlayground />
        </Suspense>
      </main>

      {/* Footer info bar */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-3 text-center text-slate-500 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PenTool className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-User Whiteboard</span>
          <span>•</span>
          <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Gravity Arcade & Physics Engine</span>
        </div>
        <div>
          Share Room Link for instant cross-device live collaboration.
        </div>
      </footer>
    </div>
  );
}
