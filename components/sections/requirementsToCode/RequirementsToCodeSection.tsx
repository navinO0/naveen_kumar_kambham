"use client";

import RequirementTransformation from "./RequirementTransformation";
import MoneyTransferCaseStudy from "./MoneyTransferCaseStudy";
import RequirementAnalysis from "./RequirementAnalysis";
import FunctionalVsNonFunctional from "./FunctionalVsNonFunctional";
import DomainAndArchitecture from "./DomainAndArchitecture";
import AdrAndCodingPrinciples from "./AdrAndCodingPrinciples";
import AdvancedApiAndProtocols from "./AdvancedApiAndProtocols";
import DatabaseInternalsAndOptimization from "./DatabaseInternalsAndOptimization";
import ApiAndDatabaseEngineering from "./ApiAndDatabaseEngineering";
import EventDrivenAndDistributedSystems from "./EventDrivenAndDistributedSystems";
import CloudContainersAndObservability from "./CloudContainersAndObservability";
import TestingAndObservability from "./TestingAndObservability";
import SecurityByDesignAndReview from "./SecurityByDesignAndReview";
import { ArrowDown, Code2, Cpu, GitBranch, Layers, ShieldCheck, Terminal, Workflow } from "lucide-react";

export default function RequirementsToCodeSection() {
  const PIPELINE_STAGES = [
    "Business Requirement",
    "Clarify Requirement",
    "Functional Requirements",
    "Non-Functional Requirements",
    "Constraints",
    "Domain Model",
    "Architecture",
    "API Contract",
    "Database Design",
    "Security Rules",
    "Implementation",
    "Testing",
    "Observability",
    "Deployment",
    "Feedback",
    "Iteration",
  ];

  return (
    <section id="engineering" className="py-12 md:py-16 px-4 sm:px-6 lg:px-10 w-full max-w-[1700px] mx-auto border-b-2 border-dashed border-[#1e1d1b]">
      {/* 1. Main Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="sticker-tag-red mb-2 uppercase font-bold text-xs">MAJOR ENGINEERING SECTION</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e1d1b]">
            How Requirements Become Code <span className="font-hand text-xl text-[#ff5e5b] font-normal ml-2">(the engineering pipeline)</span>
          </h2>
          <p className="text-sm font-sans text-[#57534e] mt-1 font-medium max-w-3xl">
            Good developers do not immediately start writing controllers. Here is how feature requests are analyzed, modeled, secured, and implemented for production systems.
          </p>
        </div>
        <p className="text-xs font-mono text-[#57534e] mt-2 md:mt-0">
          /* requirements → architecture → code */
        </p>
      </div>

      {/* 2. Visual Pipeline Flow Chart */}
      <div className="sketch-card p-6 bg-white border-2 border-[#1e1d1b] mb-8">
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1e1d1b] mb-4">
          <div className="flex items-center space-x-2">
            <Workflow className="w-5 h-5 text-[#ff5e5b]" />
            <h3 className="font-bold font-mono text-base text-[#1e1d1b]">
              END-TO-END ENGINEERING PIPELINE
            </h3>
          </div>
          <span className="font-hand text-xs text-[#ff5e5b] font-bold hidden sm:inline">
            // from requirement to production iteration
          </span>
        </div>

        {/* Pipeline Horizontal / Responsive Flow */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] py-2">
          {PIPELINE_STAGES.map((st, idx) => (
            <div key={st} className="flex items-center">
              <span className={`px-2.5 py-1 border border-[#1e1d1b] sketch-border-sm ${
                idx === 0 || idx === 10 || idx === 13 ? "bg-[#ffe866] font-bold" : "bg-[#f6f4ee]"
              }`}>
                {idx + 1}. {st}
              </span>
              {idx < PIPELINE_STAGES.length - 1 && (
                <span className="text-[#ff5e5b] mx-1 font-bold">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Handwritten Annotation Quote */}
        <div className="mt-4 pt-3 border-t border-dashed border-[#1e1d1b] text-center">
          <span className="font-hand text-sm md:text-base text-[#ff5e5b] font-bold">
            "The requirement said ‘add a button’. Somehow we ended up discussing transactions, RBAC and database indexes."
          </span>
        </div>
      </div>

      {/* Subsections Flow */}
      <div className="space-y-6">
        {/* Money Transfer ₹10,000 Case Study */}
        <MoneyTransferCaseStudy />

        {/* Real Requirement Transformation Stepper */}
        <RequirementTransformation />

        {/* Pre-Keyboard Requirement Analysis */}
        <RequirementAnalysis />

        {/* Functional vs Non-Functional & Acceptance Criteria */}
        <FunctionalVsNonFunctional />

        {/* Advanced APIs & Protocol Matrix */}
        <AdvancedApiAndProtocols />

        {/* Domain Modeling & Architecture Patterns */}
        <DomainAndArchitecture />

        {/* ADRs & Coding Principles */}
        <AdrAndCodingPrinciples />

        {/* Database Internals & EXPLAIN ANALYZE */}
        <DatabaseInternalsAndOptimization />

        {/* API Contracts & Transaction Failure Simulator */}
        <ApiAndDatabaseEngineering />

        {/* Messaging Systems & Event Driven Architecture */}
        <EventDrivenAndDistributedSystems />

        {/* Cloud Topology, Docker/K8s & Security Pipeline */}
        <CloudContainersAndObservability />

        {/* Testing Pyramid, DoD & Telemetry */}
        <TestingAndObservability />

        {/* Security by Design, Review & Final Statement */}
        <SecurityByDesignAndReview />
      </div>
    </section>
  );
}
