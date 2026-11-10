import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, Users } from 'lucide-react';

interface ConversionFormSectionProps {
  selectedCtaIntent: string;
  presetUseCase: string;
  presetChallenge: string;
  onSelectIntent: (ctaLabel: string, useCase: string) => void;
}

interface RoutedEnquiry {
  id: string;
  submittedAt: string;
  businessName: string;
  businessEmail: string;
  industry: string;
  existingInfrastructure: string;
  cloudPlatform: string;
  aiUseCase: string;
  operationalChallenge: string;
  timeline: string;
  routedTeam: string;
  routingRationale: string;
  recommendedModel: string;
}

const DEDICATED_CTAS = [
  {
    label: 'Explore AI Infrastructure Management',
    useCase: 'AI Infrastructure Management & AIOps',
    targetSquad: 'AIOps & Predictive Infrastructure Engineering Team'
  },
  {
    label: 'Book an AIOps Consultation',
    useCase: 'AI Cloud Management & FinOps',
    targetSquad: 'Cloud FinOps & Capacity Engineering Team'
  },
  {
    label: 'Automate Your IT Support',
    useCase: 'AI-Powered Service Desk & ITSM',
    targetSquad: 'Intelligent Service Desk & ITSM Automation Team'
  },
  {
    label: 'Assess Your AI Readiness',
    useCase: 'AI Infrastructure Readiness & Architecture Review',
    targetSquad: 'Principal Site Reliability & AIOps Architecture Team'
  },
  {
    label: 'Discuss a Custom AI Solution',
    useCase: 'Custom AI Development & RAG Integration',
    targetSquad: 'Enterprise RAG & Custom AI Architecture Team'
  },
  {
    label: 'Request an AI Implementation Proposal',
    useCase: 'AI Agents, SecOps & Enterprise Automation',
    targetSquad: 'AI Security Operations & Governance Team'
  }
];

export const ConversionFormSection: React.FC<ConversionFormSectionProps> = ({
  selectedCtaIntent,
  presetUseCase,
  presetChallenge,
  onSelectIntent
}) => {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [industry, setIndustry] = useState('SaaS & Technology');
  const [existingInfrastructure, setExistingInfrastructure] = useState('Hybrid Linux VMs + Kubernetes Clusters');
  const [cloudPlatform, setCloudPlatform] = useState('Amazon Web Services (AWS)');
  const [aiUseCase, setAiUseCase] = useState(presetUseCase || 'AI Infrastructure Management & AIOps');
  const [operationalChallenge, setOperationalChallenge] = useState(presetChallenge || '');
  const [timeline, setTimeline] = useState('1–3 Months');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [latestConfirmation, setLatestConfirmation] = useState<RoutedEnquiry | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<RoutedEnquiry[]>([]);

  useEffect(() => {
    if (presetUseCase) {
      setAiUseCase(presetUseCase);
    }
  }, [presetUseCase]);

  useEffect(() => {
    if (presetChallenge) {
      setOperationalChallenge(presetChallenge);
    }
  }, [presetChallenge]);

  useEffect(() => {
    fetch('/api/enquiries')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.enquiries)) {
          setRecentEnquiries(data.enquiries);
        }
      })
      .catch(() => {
        // Ignore initial load error
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessEmail,
          industry,
          existingInfrastructure,
          cloudPlatform,
          aiUseCase,
          operationalChallenge,
          timeline
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Please complete all required fields.');
      } else if (data.enquiry) {
        setLatestConfirmation(data.enquiry);
        setRecentEnquiries((prev) => [data.enquiry, ...prev]);
        setBusinessName('');
        setBusinessEmail('');
        setOperationalChallenge('');
      }
    } catch {
      setErrorMsg('Unable to submit enquiry at this time. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-slate-500 mb-2">
            <span>AI Conversion &amp; Engineering Intake</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Automated Specialist Team Routing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Scope Your AI &amp; Intelligent Infrastructure Initiative
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select your primary engagement pathway below or complete the technical requirements intake. Enquiries are automatically routed to the relevant ServerAdminz AI engineering team.
          </p>
        </div>

        {/* 6 Dedicated Conversion CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {DEDICATED_CTAS.map((cta) => {
            const isSelected = selectedCtaIntent === cta.label;
            return (
              <button
                key={cta.label}
                type="button"
                onClick={() => onSelectIntent(cta.label, cta.useCase)}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">{cta.label}</div>
                <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>
                  Routes to: {cta.targetSquad}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 8-Field Technical Requirements Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  AI &amp; Infrastructure Requirements Intake
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selected Pathway: <strong className="text-slate-800">{selectedCtaIntent}</strong>
                </p>
              </div>
              <span className="text-xs font-mono text-blue-700">NDA &amp; Zero-Retention Protected</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-business-name" className="block text-xs font-semibold text-slate-800 mb-1">
                    1. Business Name *
                  </label>
                  <input
                    id="req-business-name"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Apex Cloud Financial Ltd"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label htmlFor="req-business-email" className="block text-xs font-semibold text-slate-800 mb-1">
                    2. Business Email *
                  </label>
                  <input
                    id="req-business-email"
                    type="email"
                    required
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="vp-engineering@company.com"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-industry" className="block text-xs font-semibold text-slate-800 mb-1">
                    3. Industry *
                  </label>
                  <select
                    id="req-industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="SaaS & Technology">SaaS &amp; Technology</option>
                    <option value="Financial Services & FinTech">Financial Services &amp; FinTech</option>
                    <option value="Healthcare & Life Sciences">Healthcare &amp; Life Sciences</option>
                    <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
                    <option value="Supply Chain & Manufacturing">Supply Chain &amp; Manufacturing</option>
                    <option value="Telecommunications & Media">Telecommunications &amp; Media</option>
                    <option value="Enterprise IT & Professional Services">Enterprise IT &amp; Professional Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="req-cloud" className="block text-xs font-semibold text-slate-800 mb-1">
                    5. Cloud Platform *
                  </label>
                  <select
                    id="req-cloud"
                    value={cloudPlatform}
                    onChange={(e) => setCloudPlatform(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                    <option value="Microsoft Azure">Microsoft Azure</option>
                    <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                    <option value="Multi-Cloud (AWS + Azure / GCP)">Multi-Cloud (AWS + Azure / GCP)</option>
                    <option value="Hybrid On-Premises + Private Cloud">Hybrid On-Premises + Private Cloud</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-infra" className="block text-xs font-semibold text-slate-800 mb-1">
                    4. Existing Infrastructure *
                  </label>
                  <input
                    id="req-infra"
                    type="text"
                    required
                    value={existingInfrastructure}
                    onChange={(e) => setExistingInfrastructure(e.target.value)}
                    placeholder="e.g., 120 Linux VMs, 4 EKS clusters, RDS PostgreSQL"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="req-timeline" className="block text-xs font-semibold text-slate-800 mb-1">
                    8. Expected Implementation Timeline *
                  </label>
                  <select
                    id="req-timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                    <option value="1–3 Months">1–3 Months</option>
                    <option value="3–6 Months">3–6 Months</option>
                    <option value="Architecture Discovery / Budgeting">Architecture Discovery / Budgeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="req-usecase" className="block text-xs font-semibold text-slate-800 mb-1">
                  6. Primary AI Use Case *
                </label>
                <select
                  id="req-usecase"
                  value={aiUseCase}
                  onChange={(e) => setAiUseCase(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="AI Infrastructure Management & AIOps">AI Infrastructure Management &amp; AIOps</option>
                  <option value="AI-Powered Service Desk & ITSM">AI-Powered Service Desk &amp; ITSM</option>
                  <option value="AI Cloud Management & FinOps">AI Cloud Management &amp; FinOps</option>
                  <option value="AI Security & Threat Intelligence">AI Security &amp; Threat Intelligence</option>
                  <option value="AI Agents & IT Automation">AI Agents &amp; IT Automation</option>
                  <option value="Custom AI Development & RAG Integration">Custom AI Development &amp; RAG Integration</option>
                </select>
              </div>

              <div>
                <label htmlFor="req-challenge" className="block text-xs font-semibold text-slate-800 mb-1">
                  7. Operational Challenge &amp; Objectives *
                </label>
                <textarea
                  id="req-challenge"
                  rows={3}
                  required
                  value={operationalChallenge}
                  onChange={(e) => setOperationalChallenge(e.target.value)}
                  placeholder="Describe your current alert volume, ticket triage bottleneck, cloud cost challenge, or custom RAG requirement..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitting
                    ? 'Validating & Routing to Engineering Squad...'
                    : `Submit & Route Enquiry (${selectedCtaIntent})`}
                </span>
              </button>
            </form>
          </div>

          {/* Right: Intelligent Routing Confirmation & Dispatch Log */}
          <div className="lg:col-span-5 space-y-6">
            {latestConfirmation ? (
              <div className="p-6 rounded-xl bg-emerald-950 text-white border border-emerald-800">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enquiry Dispatched · Reference #{latestConfirmation.id}</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  Routed to {latestConfirmation.routedTeam}
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                  {latestConfirmation.routingRationale}
                </p>
                <div className="p-3.5 rounded-lg bg-emerald-900/60 border border-emerald-800 text-xs space-y-1 font-mono">
                  <div>Client: {latestConfirmation.businessName} ({latestConfirmation.industry})</div>
                  <div>Stack: {latestConfirmation.existingInfrastructure} · {latestConfirmation.cloudPlatform}</div>
                  <div>Recommended Model: {latestConfirmation.recommendedModel}</div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-900 text-white border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Direct Engineering Squad Dispatch</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  How ServerAdminz Routes Your AI Enquiry
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of generic sales queues, our intake router analyzes your infrastructure stack, cloud provider, and operational bottleneck to assign a Principal SRE, FinOps Architect, or Applied AI Engineer before your first discovery call.
                </p>
              </div>
            )}

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xs font-bold text-slate-900 mb-3">
                Recent Routed Engineering Intakes
              </div>
              <div className="space-y-3">
                {recentEnquiries.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                      <span>{item.id}</span>
                      <span>{item.timeline}</span>
                    </div>
                    <div className="font-bold text-slate-900 mt-1">
                      {item.businessName} · {item.aiUseCase}
                    </div>
                    <div className="text-[11px] text-blue-700 font-mono mt-1">
                      Assigned: {item.routedTeam}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
