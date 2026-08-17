import Header from "@/components/ui/Header";
import HeroSection from "@/components/sections/HeroSection";
import HowIThinkSection from "@/components/sections/HowIThinkSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import ToolWallSection from "@/components/sections/ToolWallSection";
import SecurityPlayground from "@/components/sections/SecurityPlayground";
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
    <div className="min-h-screen flex flex-col bg-paper-grid text-[#1e1d1b]">
      {/* Top Header */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1 space-y-4">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. How I Think Principles */}
        <HowIThinkSection />

        {/* 3. Selected Work & Technical Post-Mortems */}
        <SelectedWorkSection projects={projects} />

        {/* 4. Tool Wall & JMeter Load Simulator */}
        <ToolWallSection tools={tools} />

        {/* 5. Security & Defensive RBAC Playground */}
        <SecurityPlayground />

        {/* 6. Architecture & System Flow Diagrams */}
        <ArchitecturePlayground />

        {/* 7. Categorized Backend Stack */}
        <BackendStackSection />

        {/* 8. What I Use vs Why I Use It Decision Matrix */}
        <ToolComparisonSection tools={tools} />

        {/* 9. Things I'm Currently Learning Timeline */}
        <LearningTimelineSection topics={learningTopics} />

        {/* 10. Notes from the Backend Trenches */}
        <TrenchNotesSection notes={trenchNotes} />

        {/* 11. Contact & Rate-Limit Tester */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
