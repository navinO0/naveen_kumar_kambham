"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Menu, X, ShieldAlert, Gamepad2 } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2.5 font-mono font-bold text-base md:text-lg text-[#0f172a] hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 relative rounded-full bg-slate-900 text-white p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
              <Image src="/favicon.png" alt="Vector Avatar Favicon" fill sizes="32px" className="object-contain p-0.5" />
            </div>
            <span className="font-mono tracking-tight font-black">navin <span className="text-slate-400 font-normal">//</span> full-stack engineer</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5 font-mono text-xs md:text-sm font-medium text-slate-600">
          <a href="#engineering" className="hover:text-[#0f172a] transition-colors font-semibold">
            engineering
          </a>
          <a href="#work" className="hover:text-[#0f172a] transition-colors">
            work
          </a>
          <a href="#gravity" className="text-sky-600 hover:text-sky-700 bg-sky-50/80 hover:bg-sky-100 px-2.5 py-1 rounded-full font-bold border border-sky-200/60 flex items-center gap-1 transition-all">
            <Gamepad2 className="w-3.5 h-3.5 text-sky-600" />
            <span>playground</span>
          </a>
          <a href="#stack" className="hover:text-[#0f172a] transition-colors">
            stack
          </a>
          <a href="#toolbox" className="hover:text-[#0f172a] transition-colors">
            toolbox
          </a>
          <a href="#security" className="hover:text-[#0f172a] transition-colors">
            security
          </a>
          <a href="#architecture" className="hover:text-[#0f172a] transition-colors">
            architecture
          </a>
          <a href="#learning" className="hover:text-[#0f172a] transition-colors">
            learning
          </a>
          <a
            href="#contact"
            className="bg-[#0f172a] text-white hover:bg-[#1e293b] px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider shadow-sm transition-all"
          >
            contact
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-[#1e1d1b] border-1.5 border-[#1e1d1b] rounded sketch-border-sm bg-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t-2 border-dashed border-[#1e1d1b] flex flex-col space-y-3 font-mono text-sm">
          <div className="font-hand text-xs text-[#ff5e5b] mb-1">
            /* yes, the API is probably broken somewhere */
          </div>
          <a
            href="#engineering"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded text-[#ff5e5b] font-bold"
          >
            [0] engineering pipeline
          </a>
          <a
            href="#gravity"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-sky-50 text-sky-700 font-bold px-2 py-1.5 rounded flex items-center gap-1.5 border border-sky-200"
          >
            <Gamepad2 className="w-4 h-4 text-sky-600" />
            <span>[+] arcade playground & whiteboard</span>
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [1] work
          </a>
          <a
            href="#stack"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [2] stack
          </a>
          <a
            href="#toolbox"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [3] toolbox
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [4] security
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [5] architecture
          </a>
          <a
            href="#learning"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#ffe866] px-2 py-1 rounded"
          >
            [6] learning
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="sketch-button py-2 text-center text-xs uppercase font-bold"
          >
            [7] got a backend problem?
          </a>
        </div>
      )}
    </header>
  );
}
