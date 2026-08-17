"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ShieldAlert } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#f6f4ee]/90 backdrop-blur-md border-b-2 border-[#1e1d1b] px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-baseline space-x-2">
          <Link
            href="/"
            className="flex items-center space-x-2 font-mono font-bold text-base md:text-lg text-[#1e1d1b] hover:opacity-80 transition-opacity"
          >
            <Terminal className="w-5 h-5 text-[#ff5e5b]" />
            <span>alex_vance // backend engineer</span>
          </Link>

          {/* Graffiti annotation beside brand */}
          <span className="hidden lg:inline-block font-hand text-xs text-[#ff5e5b] transform -rotate-2 ml-2">
            (yes, the API is probably broken somewhere)
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 font-mono text-xs md:text-sm font-medium">
          <a href="#work" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            work
          </a>
          <a href="#stack" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            stack
          </a>
          <a href="#toolbox" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            toolbox
          </a>
          <a href="#security" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            security
          </a>
          <a href="#architecture" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            architecture
          </a>
          <a href="#learning" className="hover:bg-[#ffe866] px-2 py-1 rounded transition-colors">
            learning
          </a>
          <a
            href="#contact"
            className="sketch-button text-xs px-3 py-1.5 font-bold uppercase tracking-wider flex items-center gap-1"
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
