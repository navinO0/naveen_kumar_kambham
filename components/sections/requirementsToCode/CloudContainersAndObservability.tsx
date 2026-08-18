"use client";

import { ArrowRight, CheckCircle2, Cloud, Cpu, Database, Key, Layers, Lock, ShieldCheck, Terminal, Server, Activity } from "lucide-react";

export default function CloudContainersAndObservability() {
  return (
    <div className="space-y-8 my-8">
      {/* 1. Production Cloud Topology (AWS) */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag mb-1 text-xs font-bold">CLOUD ARCHITECTURE</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              AWS Production Cloud Infrastructure Topology
            </h3>
            <p className="text-xs text-[#57534e] font-sans mt-0.5">
              Secure VPC network segmentation, edge CDN, load balancing, container orchestration, and KMS encryption.
            </p>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // VPC private subnets & zero public DB exposure
          </span>
        </div>

        {/* Topology Diagram */}
        <div className="p-4 bg-[#1e1d1b] text-[#ffe866] font-mono text-xs rounded border border-[#57534e] overflow-x-auto">
          <code>
{`Internet  →  CloudFront CDN  →  AWS WAF  →  Application Load Balancer (ALB)
                                              ↓ (Private Subnet)
                                     [ ECS / EKS Cluster ] (HPA)
                                      ├── ElastiCache (Redis Cluster)
                                      └── Aurora PostgreSQL (Multi-AZ Read Replicas)`}
          </code>
        </div>
      </div>

      {/* 2. Containers & Kubernetes Orchestration */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6">
          <div>
            <span className="sticker-tag-red mb-1 text-xs uppercase font-bold">ORCHESTRATION</span>
            <h3 className="text-xl md:text-2xl font-black font-mono text-[#1e1d1b]">
              Docker & Kubernetes Production Primitives
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold">
            // multi-stage builds & health probes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#ff5e5b] block mb-1">MULTI-STAGE DOCKERFILE</span>
            <span className="text-[10px] text-gray-500 block mb-2">Image Optimization</span>
            <p className="font-sans text-xs text-[#57534e]">
              Compiles TypeScript in build stage and copies only node_modules into dist, reducing image size from 1.2GB to 85MB.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#3498db] block mb-1">PROBES & RESOURCE LIMITS</span>
            <span className="text-[10px] text-gray-500 block mb-2">Liveness & Readiness</span>
            <p className="font-sans text-xs text-[#57534e]">
              Readiness probe `/api/health` ensures traffic is routed only after DB connections are warm.
            </p>
          </div>

          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm">
            <span className="font-bold text-[#2ecc71] block mb-1">HPA AUTO-SCALING</span>
            <span className="text-[10px] text-gray-500 block mb-2">Horizontal Pod Autoscaler</span>
            <p className="font-sans text-xs text-[#57534e]">
              Automatically scales Pod replicas from 3 to 30 when CPU utilization exceeds 70%.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Security Scanning Pipeline & Observability Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Security Pipeline */}
        <div className="sketch-card p-5 bg-white border-2 border-[#1e1d1b]">
          <span className="sticker-tag-red text-[10px] uppercase font-bold mb-2">DEVSECOPS PIPELINE</span>
          <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-3">Automated Security Gates</h4>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            {["Code", "SAST (Snyk)", "Dependency Scan", "Container Scan (Trivy)", "DAST (OWASP ZAP)", "Deploy"].map((s, idx) => (
              <span key={s} className="px-2 py-1 bg-[#f6f4ee] border border-[#1e1d1b]">
                {s} {idx < 5 ? "→" : "🔒"}
              </span>
            ))}
          </div>
        </div>

        {/* Observability Stack */}
        <div className="sketch-card p-5 bg-white border-2 border-[#1e1d1b]">
          <span className="sticker-tag text-[10px] uppercase font-bold mb-2">TELEMETRY STACK</span>
          <h4 className="font-mono font-bold text-base text-[#1e1d1b] mb-3">Logs, Metrics & Distributed Traces</h4>
          <div className="space-y-1.5 text-xs font-sans">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold font-mono text-[#ff5e5b]">Logs:</span>
              <span>OpenSearch / ELK / Loki + Correlation IDs</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold font-mono text-[#3498db]">Metrics:</span>
              <span>Prometheus + Grafana dashboards</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="font-bold font-mono text-[#2ecc71]">Tracing:</span>
              <span>OpenTelemetry + Jaeger distributed context propagation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
