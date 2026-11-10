/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ServiceVertical } from './data/verticalData';
import { ServiceVerticalsSection } from './components/ServiceVerticalsSection';
import { InteractiveDemosLab, DemoTabId } from './components/InteractiveDemosLab';
import { EcosystemGovernanceSection } from './components/EcosystemGovernanceSection';
import { SeoLandingDirectory } from './components/SeoLandingDirectory';
import { ConversionFormSection } from './components/ConversionFormSection';
import { ResilientImage } from './components/ResilientImage';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [activeVerticalId, setActiveVerticalId] = useState<ServiceVertical['id']>('aiops');
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTabId>('health');
  const [selectedCtaIntent, setSelectedCtaIntent] = useState<string>(
    'Request an AI Implementation Proposal'
  );
  const [presetUseCase, setPresetUseCase] = useState<string>(
    'AI Infrastructure Management & AIOps'
  );
  const [presetChallenge, setPresetChallenge] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLaunchDemo = (demoTab: DemoTabId) => {
    setActiveDemoTab(demoTab);
    scrollToSection('interactive-lab');
  };

  const handleSelectCtaPreset = (ctaLabel: string, useCase: string, challenge = '') => {
    setSelectedCtaIntent(ctaLabel);
    setPresetUseCase(useCase);
    if (challenge) {
      setPresetChallenge(challenge);
    }
    scrollToSection('consultation');
  };

  const handleNavigateVertical = (verticalId: ServiceVertical['id']) => {
    setActiveVerticalId(verticalId);
    scrollToSection('verticals');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            ServerAdminz
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#verticals"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Service Verticals
            </a>
            <a
              href="#interactive-lab"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Interactive Lab
            </a>
            <a
              href="#ecosystem-governance"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ecosystem &amp; Governance
            </a>
            <a
              href="#solution-directory"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Solution Directory
            </a>
            <a
              href="#consultation"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Consultation
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                handleSelectCtaPreset(
                  'Request an AI Implementation Proposal',
                  'AI Infrastructure Management & AIOps'
                )
              }
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request AI Proposal
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION */}
        <section className="py-12 lg:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Value Proposition & Positioning */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>AI Services &amp; Intelligent Infrastructure Vertical</span>
                    <span aria-hidden="true">·</span>
                    <span>ISO 27001 &amp; SOC2 Aligned Operations</span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
                    We don&apos;t just manage infrastructure. We help businesses operate smarter through AI, automation and engineering expertise.
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    ServerAdminz unites 24/7 systems reliability engineering with predictive AIOps, knowledge-grounded service desk automation, verified multi-cloud FinOps, and private enterprise RAG architectures.
                  </p>

                  {/* 6 Core Competencies Unboxed Metadata Row */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="text-xs font-semibold text-slate-900 mb-2">
                      Six Integrated Engineering Disciplines:
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 text-xs text-slate-600">
                      <span>Infrastructure Expertise</span>
                      <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                      <span>Cloud Engineering</span>
                      <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                      <span>AI &amp; Machine Learning</span>
                      <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                      <span>Intelligent Automation</span>
                      <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                      <span>DevOps</span>
                      <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                      <span>Technical Support Operations</span>
                    </div>
                  </div>
                </div>

                {/* Primary Hero CTA & Quick Jump Links */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() =>
                      handleSelectCtaPreset(
                        'Explore AI Infrastructure Management',
                        'AI Infrastructure Management & AIOps'
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore AI Infrastructure Management</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleLaunchDemo('health')}
                    className="px-4 py-3 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Launch Interactive AIOps Sandbox
                  </button>
                </div>
              </div>

              {/* Right Column: High-Impact Architectural Visual */}
              <div className="lg:col-span-5 flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <div className="relative flex-1 min-h-[300px] lg:h-full">
                  <ResilientImage
                    src="/src/assets/images/hero_ai_infrastructure_1794344456469.jpg"
                    alt="ServerAdminz Network and AI Infrastructure Operations Center"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-xs font-mono text-blue-300">
                      Human-in-the-Loop Engineering Governance
                    </div>
                    <p className="text-sm font-semibold mt-1 leading-snug">
                      Every infrastructure-changing AI recommendation is permission-scoped, logged, and gated by certified L2/L3 systems engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Operational Proof Strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  80–90%
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">
                  Alert Noise Compression
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Across multi-source Prometheus, Datadog &amp; CloudWatch streams within 30 days.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  &lt; 120s
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">
                  Automated Ticket Triage &amp; RAG Match
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Classifies support requests and attaches verified SOP runbooks before L2 pickup.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  14-Day
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">
                  Verified FinOps Telemetry Baseline
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Required before projecting cloud right-sizing or commitment savings ranges.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">
                  Engineer-Gated Production Mutations
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Mandatory RBAC, audit logging, and rollback verification on all workflows.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIONS A - F: CORE AI SERVICE VERTICALS */}
        <ServiceVerticalsSection
          activeVerticalId={activeVerticalId}
          onSelectVertical={setActiveVerticalId}
          onLaunchDemo={handleLaunchDemo}
          onSelectCtaPreset={handleSelectCtaPreset}
        />

        {/* SECTION H: 5 INTERACTIVE AI DEMONSTRATIONS */}
        <InteractiveDemosLab
          activeTab={activeDemoTab}
          onTabChange={setActiveDemoTab}
          onRequestProposalWithContext={handleSelectCtaPreset}
        />

        {/* SECTIONS G, K, L: AI ECOSYSTEM, RESPONSIBLE AI & COMMERCIAL PACKAGING */}
        <EcosystemGovernanceSection onSelectCtaPreset={handleSelectCtaPreset} />

        {/* SECTION J: 13 DEDICATED SEO LANDING PAGES */}
        <SeoLandingDirectory onSelectCtaPreset={handleSelectCtaPreset} />

        {/* SECTION I: AI CONVERSION STRATEGY & REQUIREMENTS FORM */}
        <ConversionFormSection
          selectedCtaIntent={selectedCtaIntent}
          presetUseCase={presetUseCase}
          presetChallenge={presetChallenge}
          onSelectIntent={(ctaLabel, useCase) => handleSelectCtaPreset(ctaLabel, useCase)}
        />
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-5">
              <div className="font-display text-base font-bold text-white">
                ServerAdminz
              </div>
              <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed">
                &ldquo;We don&apos;t just manage infrastructure. We help businesses operate smarter through AI, automation and engineering expertise.&rdquo;
              </p>
              <div className="mt-3 text-xs text-slate-500">
                24/7 Infrastructure Operations · Cloud Engineering · AIOps · Enterprise RAG
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-semibold text-white mb-2.5">
                AI Service Practice Areas
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => handleNavigateVertical('aiops')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Infrastructure Management &amp; AIOps
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateVertical('servicedesk')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI-Powered Service Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateVertical('finops')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Cloud Management &amp; FinOps
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateVertical('security')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Security &amp; Threat Intelligence
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateVertical('agents')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Agents &amp; IT Automation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateVertical('custom-ai')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Custom AI Development &amp; Integration
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-semibold text-white mb-2.5">
                Interactive Engineering Sandboxes
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => handleLaunchDemo('health')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Infrastructure Health Demo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLaunchDemo('support')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Support Assistant Demo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLaunchDemo('workflow')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Automation Workflow Builder
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLaunchDemo('readiness')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Readiness Assessment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLaunchDemo('finops')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Cloud Cost Assessment
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} ServerAdminz. All rights reserved.
            </div>
            <div>
              Responsible AI Policy: Zero unauthorized transmission of customer logs, credentials, or PII.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
