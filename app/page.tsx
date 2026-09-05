import Header from "@/components/ui/Header";
import JourneyNav from "@/components/ui/JourneyNav";
import HeroSection from "@/components/sections/HeroSection";
import AboutMeSection from "@/components/sections/AboutMeSection";
import ExperienceResumeSection from "@/components/sections/ExperienceResumeSection";
import HowIThinkSection from "@/components/sections/HowIThinkSection";
import RequirementsToCodeSection from "@/components/sections/requirementsToCode/RequirementsToCodeSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import ToolWallSection from "@/components/sections/ToolWallSection";
import SecurityPlayground from "@/components/sections/SecurityPlayground";
// import GravityPlayground from "@/components/sections/GravityPlayground";
import ArchitecturePlayground from "@/components/sections/ArchitecturePlayground";
import BackendStackSection from "@/components/sections/BackendStackSection";
import ToolComparisonSection from "@/components/sections/ToolComparisonSection";
import LearningTimelineSection from "@/components/sections/LearningTimelineSection";
import TrenchNotesSection from "@/components/sections/TrenchNotesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";

import { getAllProjects } from "@/lib/repositories/projectsRepo";
import { getAllTools } from "@/lib/repositories/toolsRepo";
import { getAllLearningTopics, getAllTrenchNotes } from "@/lib/repositories/learningRepo";

export const revalidate = 0; // Dynamic server rendering with live SQLite query

export default function Home() {
  const projects = getAllProjects();
  const tools = getAllTools();
  const learningTopics = getAllLearningTopics();
  const trenchNotes = getAllTrenchNotes();

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0f172a]">
      {/* Top Header */}
      <Header />

      {/* Interactive Sticky Journey Stepper Navigation */}
      <JourneyNav />

      {/* Main Content Flow organized into 6 Journey Chapters */}
      <main className="flex-1 space-y-6">
        {/* ========================================================
            CHAPTER 01: THE LAUNCHPAD & PHILOSOPHY
           ======================================================== */}
        <div id="about" className="scroll-mt-32">
          {/* Hero Section */}
          <HeroSection />

          {/* About Me & Full-Stack Toolbelt Matrix */}
          <AboutMeSection />
        </div>

        {/* ========================================================
            CHAPTER 02: CAREER & SYSTEMS JOURNEY
           ======================================================== */}
        <div id="experience" className="scroll-mt-32">
          {/* Career Resume & Timeline Experience */}
          <ExperienceResumeSection />

          {/* Selected Work & Technical Post-Mortems */}
          <SelectedWorkSection projects={projects} />
        </div>

        {/* ========================================================
            CHAPTER 03: THE BLUEPRINT & ENGINEERING PIPELINE
           ======================================================== */}
        <div id="engineering" className="scroll-mt-32">
          {/* How I Think Principles */}
          <HowIThinkSection />

          {/* Major Engineering Pipeline: How Requirements Become Code */}
          <RequirementsToCodeSection />
        </div>

        {/* ========================================================
            CHAPTER 04: PRODUCTION PLAYGROUNDS & SIMULATORS
           ======================================================== */}
        <div id="playgrounds" className="scroll-mt-32">
          {/* Interactive 2D Gravity Physics & Mini Games Arcade (Temporarily disabled - code preserved) */}
          {/* <GravityPlayground /> */}

          {/* JMeter Load Simulator & Tool Wall */}
          <ToolWallSection tools={tools} />

          {/* Security RBAC & Rate Limiter Playground */}
          <SecurityPlayground />

          {/* System Architecture Flow Diagram Playground */}
          <ArchitecturePlayground />
        </div>

        {/* ========================================================
            CHAPTER 05: TECH STACK & CONTINUOUS EVOLUTION
           ======================================================== */}
        <div id="stack" className="scroll-mt-32">
          {/* Categorized Tech Stack */}
          <BackendStackSection />

          {/* Tool Comparison Decision Matrix */}
          <ToolComparisonSection tools={tools} />

          {/* Things I'm Currently Learning Timeline */}
          <LearningTimelineSection topics={learningTopics} />

          {/* Trench Notes */}
          <TrenchNotesSection notes={trenchNotes} />
        </div>

        {/* ========================================================
            CHAPTER 06: DISPATCH & DIRECT CONNECT
           ======================================================== */}
        <div id="contact" className="scroll-mt-32">
          {/* Contact Form & Rate-Limited API Tester */}
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
