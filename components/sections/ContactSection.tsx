"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, FileText, Send, AlertTriangle, CheckCircle2, ShieldAlert, Zap, Code, Globe } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ senderName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: "success" | "error" | "ratelimit"; text: string; details?: any } | null>(null);
  const [rateLimitStatus, setRateLimitStatus] = useState<{ limit: number; remaining: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponseMsg({ type: "success", text: data.message });
        setFormData({ senderName: "", email: "", message: "" });
      } else if (res.status === 429) {
        setResponseMsg({ type: "ratelimit", text: data.message || "Rate limit exceeded (HTTP 429)!" });
      } else {
        setResponseMsg({ type: "error", text: data.error || "Validation failed", details: data.details });
      }

      if (data.rateLimit) {
        setRateLimitStatus(data.rateLimit);
      }
    } catch (err: any) {
      setResponseMsg({ type: "error", text: "Network error sending payload." });
    } finally {
      setLoading(false);
    }
  };

  // Test rate limiting by sending fast rapid fire requests
  const triggerRateLimitTest = async () => {
    setLoading(true);
    setResponseMsg({ type: "success", text: "Sending 4 rapid fire API requests to test rate limit..." });
    for (let i = 0; i < 4; i++) {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderName: "Bot Tester", email: "tester@example.com", message: "Testing rate limit security..." }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setResponseMsg({
          type: "ratelimit",
          text: `HTTP 429 TRIGGERED ON REQUEST #${i + 1}: ${data.message}`,
        });
        if (data.rateLimit) setRateLimitStatus(data.rateLimit);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      <div className="sketch-card p-6 md:p-8 bg-white border-2 border-[#1e1d1b] relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-2 font-bold uppercase">SECURE DISPATCH GATEWAY</span>
            <h2 className="text-3xl md:text-4xl font-black font-mono text-[#1e1d1b]">
              got a backend problem?
            </h2>
            <p className="text-sm font-sans text-[#57534e] mt-1 font-medium">
              Tell me what is broken. I promise not to immediately blame DNS.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
            <span className="sticker-tag">RATE LIMIT: 3 REQ/MIN</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Col (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold text-[#1e1d1b] mb-1">
                  YOUR NAME / ALIAS:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Frontend Dev"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full p-2.5 bg-[#f6f4ee] border-1.5 border-[#1e1d1b] sketch-border-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1e1d1b] mb-1">
                  EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  required
                  placeholder="dev@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#f6f4ee] border-1.5 border-[#1e1d1b] sketch-border-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1e1d1b] mb-1">
                  WHAT IS BROKEN? (DETAILS):
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your API latency, database lock, authentication, or architecture challenge..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-[#f6f4ee] border-1.5 border-[#1e1d1b] sketch-border-sm focus:outline-none focus:bg-white"
                />
              </div>

              {/* Status / Response Banner */}
              {responseMsg && (
                <div
                  className={`p-3 sketch-border-sm font-mono text-xs ${
                    responseMsg.type === "success"
                      ? "bg-green-100 border-green-800 text-green-900"
                      : responseMsg.type === "ratelimit"
                      ? "bg-red-100 border-red-800 text-red-900 font-bold"
                      : "bg-red-50 border-red-700 text-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    {responseMsg.type === "success" && <CheckCircle2 className="w-4 h-4 text-green-700" />}
                    {responseMsg.type === "ratelimit" && <ShieldAlert className="w-4 h-4 text-red-700" />}
                    {responseMsg.type === "error" && <AlertTriangle className="w-4 h-4 text-red-700" />}
                    <span>{responseMsg.type.toUpperCase()} RESPONSE</span>
                  </div>
                  <p>{responseMsg.text}</p>
                  {responseMsg.details && (
                    <pre className="mt-2 p-2 bg-white/80 border text-[10px] overflow-x-auto">
                      {JSON.stringify(responseMsg.details, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              {/* Submit & Rate Limit Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="sketch-button px-5 py-2.5 text-xs font-bold uppercase flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "TRANSMITTING..." : "POST MESSAGE"}</span>
                </button>

                <button
                  type="button"
                  onClick={triggerRateLimitTest}
                  disabled={loading}
                  className="sketch-button px-3 py-2 bg-white text-[11px] font-mono flex items-center gap-1.5 border-[#ff5e5b]"
                >
                  <Zap className="w-3.5 h-3.5 text-[#ff5e5b]" />
                  <span>TEST RATE LIMITER (4 FAST REQS)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Social / Direct Contacts Col (2 cols) */}
          <div className="lg:col-span-2 p-5 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase text-[#57534e] block border-b border-[#1e1d1b] pb-2">
                DIRECT CONNECT CHANNELS:
              </span>

              <a
                href="mailto:alex@vance.dev"
                className="sketch-card p-3 bg-white flex items-center space-x-3 hover:bg-[#ffe866] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#ff5e5b]" />
                <div>
                  <span className="font-mono text-xs font-bold block text-[#1e1d1b]">Email</span>
                  <span className="font-mono text-[11px] text-[#57534e]">alex@vance.dev</span>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="sketch-card p-3 bg-white flex items-center space-x-3 hover:bg-[#ffe866] transition-colors"
              >
                <Code className="w-5 h-5 text-[#1e1d1b]" />
                <div>
                  <span className="font-mono text-xs font-bold block text-[#1e1d1b]">GitHub</span>
                  <span className="font-mono text-[11px] text-[#57534e]">github.com/vance-backend</span>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="sketch-card p-3 bg-white flex items-center space-x-3 hover:bg-[#ffe866] transition-colors"
              >
                <Globe className="w-5 h-5 text-[#3498db]" />
                <div>
                  <span className="font-mono text-xs font-bold block text-[#1e1d1b]">LinkedIn</span>
                  <span className="font-mono text-[11px] text-[#57534e]">linkedin.com/in/vance-backend</span>
                </div>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                className="sketch-card p-3 bg-white flex items-center space-x-3 hover:bg-[#ffe866] transition-colors"
              >
                <FileText className="w-5 h-5 text-[#2ecc71]" />
                <div>
                  <span className="font-mono text-xs font-bold block text-[#1e1d1b]">Resume PDF</span>
                  <span className="font-mono text-[11px] text-[#57534e]">Download 1-page spec</span>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-3 border-t border-dashed border-[#1e1d1b] flex items-center gap-3">
              <div className="w-14 h-14 relative shrink-0">
                <Image src="/developer_avatar_success.png" alt="Contact Vector Avatar" fill sizes="56px" className="object-contain drop-shadow" />
              </div>
              <span className="font-hand text-xs text-[#ff5e5b] font-bold block">
                "I respond faster to detailed stack logs than vague hellos."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
