import React, { useState } from 'react';
import {
  ECOSYSTEM_TECHNOLOGIES,
  RESPONSIBLE_AI_PILLARS,
  COMMERCIAL_MODELS,
  EcosystemTech
} from '../data/verticalData';
import { Shield, Lock, Check, ArrowRight } from 'lucide-react';

interface EcosystemGovernanceSectionProps {
  onSelectCtaPreset: (ctaLabel: string, useCase: string) => void;
}

const CATEGORIES: ('All' | EcosystemTech['category'])[] = [
  'All',
  'Foundation Models & APIs',
  'AI Orchestration & Data',
  'Cloud AI & Runtime',
  'Observability & IaC'
];

export const EcosystemGovernanceSection: React.FC<EcosystemGovernanceSectionProps> = ({
  onSelectCtaPreset
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | EcosystemTech['category']>('All');

  const filteredTech =
    selectedCategory === 'All'
      ? ECOSYSTEM_TECHNOLOGIES
      : ECOSYSTEM_TECHNOLOGIES.filter((t) => t.category === selectedCategory);

  return (
    <div id="ecosystem-governance">
      {/* SECTION G: AI TECHNOLOGY ECOSYSTEM */}
      <section className="py-16 lg:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="text-xs font-medium text-slate-500 mb-2">
                <span>AI Technology Ecosystem</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>17 Production-Supported Platforms &amp; Toolchains</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                Supported AI, Cloud &amp; Observability Stack
              </h2>
              <p className="mt-3 text-base text-slate-600">
                ServerAdminz only lists platforms and technologies that our engineering teams genuinely deploy, integrate, monitor, and support in production environments.
              </p>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTech.map((tech) => (
              <div
                key={tech.name}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span>{tech.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {tech.productionRole}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                  <div className="text-[11px] text-slate-700">
                    <strong className="font-semibold text-slate-900">ServerAdminz Capability:</strong>{' '}
                    {tech.serverAdminzCapability}
                  </div>
                  <div className="text-[11px] font-mono text-blue-700">
                    Pattern: {tech.deploymentPattern}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION K: RESPONSIBLE AI & SECURITY */}
      <section className="py-16 lg:py-24 border-b border-slate-200 bg-slate-900 text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                <Shield className="w-4 h-4" />
                <span>Responsible AI &amp; Infrastructure Security Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Engineered for Strict Data Privacy, Isolation &amp; Human Control
              </h2>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                Enterprise infrastructure teams cannot afford uncontrolled AI models accessing sensitive production assets. ServerAdminz makes Responsible AI an architectural guarantee across every engagement.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <Lock className="w-4 h-4" />
                <span>Zero Unauthorized Log &amp; Credential Transmission Policy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                ServerAdminz never transmits confidential server logs, SSH private keys, IAM credentials, or customer PII to third-party AI models without explicit customer authorization, deterministic pre-inference redaction controls, and enterprise zero-data-retention agreements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {RESPONSIBLE_AI_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-slate-800/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-blue-400 mb-1.5">
                    Control 0{idx + 1 < 10 ? idx + 1 : ''}{idx + 1 === 10 ? '10' : ''}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {pillar.controlMechanism}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/80 text-[11px] font-mono text-emerald-400">
                  {pillar.verificationStandard}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION L: COMMERCIAL PACKAGING */}
      <section className="py-16 lg:py-24 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-medium text-slate-500 mb-2">
              <span>Commercial Packaging &amp; Delivery Governance</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Three Structured Engagement Models</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Transparent Commercial Models Validated Before Scoping
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Whether enhancing an existing managed infrastructure agreement, executing a fixed-scope automation build, or operating production AI workloads 24/7, every package is scoped only after validating delivery costs, staffing requirements, platform licensing, and operational capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COMMERCIAL_MODELS.map((model) => (
              <div
                key={model.id}
                className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-blue-700 mb-1">
                    {model.index}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {model.targetFit}
                  </p>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 mb-5">
                    <strong>Commercial Structure:</strong> {model.structure}
                  </div>

                  <div className="mb-5">
                    <div className="text-xs font-bold text-slate-900 mb-2">
                      Included Deliverables &amp; Operations:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {model.includedCapabilities.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200 mb-6">
                    <div className="text-xs font-bold text-slate-900 mb-2">
                      Pre-Scoping Validation Gate:
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-500">
                      {model.validationRequirements.map((req) => (
                        <li key={req}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCtaPreset(model.ctaText, model.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{model.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
