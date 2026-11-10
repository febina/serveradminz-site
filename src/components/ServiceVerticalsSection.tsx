import React, { useState } from 'react';
import { SERVICE_VERTICALS, ServiceVertical } from '../data/verticalData';
import { ResilientImage } from './ResilientImage';
import { ArrowRight, CheckCircle2, ShieldAlert, Terminal, Layers } from 'lucide-react';

interface ServiceVerticalsSectionProps {
  activeVerticalId: ServiceVertical['id'];
  onSelectVertical: (id: ServiceVertical['id']) => void;
  onLaunchDemo: (demoTab: 'health' | 'support' | 'workflow' | 'readiness' | 'finops') => void;
  onSelectCtaPreset: (ctaLabel: string, useCase: string) => void;
}

const AIOPS_STAGES = [
  {
    step: '01',
    title: 'Infrastructure Monitoring',
    metric: '18,400 metrics/sec ingested',
    detail: 'Continuous collection of node exporter, cgroup, PostgreSQL pg_stat, and ingress telemetry across hybrid Linux & Kubernetes clusters.',
    logOutput: 'promql: rate(node_cpu_seconds_total{mode="iowait"}[2m]) · p99 ingress latency: 42ms (nominal)'
  },
  {
    step: '02',
    title: 'Unusual Activity Detection',
    metric: '3.8σ deviation detected',
    detail: 'Seasonal baseline model detects abnormal rise in PostgreSQL active lock waits and disk write latency on prod-db-primary-01 40 minutes before pool saturation.',
    logOutput: 'anomaly_engine: pg_stat_activity{wait_event_type="Lock"} jumped from baseline 2 -> 39 concurrent sessions'
  },
  {
    step: '03',
    title: 'Alert Correlation',
    metric: '127 raw alerts → 1 incident',
    detail: 'Suppresses downstream HTTP 504 gateway alerts across 14 microservice pods and groups them under a single topology-correlated root incident.',
    logOutput: 'correlator: grouped 127 symptom alerts into Incident #INC-4092 (Root Node: prod-db-primary-01)'
  },
  {
    step: '04',
    title: 'Potential Root-Cause Identification',
    metric: '94% confidence match',
    detail: 'Correlates lock spike timestamp with GitOps release v2.18.4 deployed 6 minutes prior, pinpointing an unindexed foreign-key scan on invoice_items.',
    logOutput: 'rca_engine: matched commit 8f3a91c (migration_add_invoice_lookup) + sequential scan on 42M rows'
  },
  {
    step: '05',
    title: 'Recommended Remediation',
    metric: 'Runbook RB-PG-409 staged',
    detail: 'Prepares non-blocking CREATE INDEX CONCURRENTLY statement and temporary PgBouncer pool throttle for engineer verification.',
    logOutput: 'staged_plan: CREATE INDEX CONCURRENTLY idx_invoice_items_org_id ON invoice_items(org_id);'
  },
  {
    step: '06',
    title: 'Engineer Approval & Resolution',
    metric: 'MTTR: 4m 12s (Verified)',
    detail: 'On-call L3 DBA reviews blast radius, approves execution gate, verifies lock clearance, and auto-generates post-incident documentation.',
    logOutput: 'audit_log: Approved by Lead SRE (A. Nair) · Post-check p99 latency restored to 38ms · Rollback standby cleared'
  }
];

const SERVICE_DESK_TICKET_FLOW = [
  {
    stage: '01. Ticket Ingestion & Redaction',
    timestamp: '00:00.4s',
    actor: 'DLP Gateway',
    summary: 'Customer submits ticket: "Production checkout API throwing intermittent 502s after TLS cert update on eu-westhaproxy-02." Gateway masks internal IP/tokens.',
    artifact: 'Ticket #SA-98412 · Redacted 2 sensitive header tokens prior to AI processing'
  },
  {
    stage: '02. AI Ticket Classification & SLA Risk',
    timestamp: '00:01.8s',
    actor: 'Classifier Model',
    summary: 'Categorized as Ingress / HAProxy TLS Termination · Priority: P1 High · SLA Breach Risk: High (15m response target).',
    artifact: 'Confidence: 0.96 · Assigned SLA Watchdog Timer'
  },
  {
    stage: '03. Intelligent Queue Routing',
    timestamp: '00:02.1s',
    actor: 'Routing Engine',
    summary: 'Bypassed L1 general queue; routed directly to L3 Linux & Edge Networking Squad based on HAProxy/TLS ownership.',
    artifact: 'Target Queue: Edge-Networking-L3 · On-Call Engineer: M. Kowalski'
  },
  {
    stage: '04. Automated Ticket Summarisation & RAG Lookup',
    timestamp: '00:03.9s',
    actor: 'Runbook RAG Assistant',
    summary: 'Retrieved Runbook RB-HAP-112 (HAProxy OCSP Stapling & Intermediate Chain Mismatch) and attached last 10m ingress error rates.',
    artifact: 'Matched Runbook RB-HAP-112 · Similarity: 0.93'
  },
  {
    stage: '05. AI Troubleshooting Recommendation & Human Resolution',
    timestamp: '02:40.0s',
    actor: 'L3 Engineer + AI Workbench',
    summary: 'Engineer runs suggested read-only openssl s_client verification, confirms missing intermediate CA bundle, approves staged reload, and auto-generates PIR.',
    artifact: 'Status: Resolved in 3m 18s · Post-Incident Summary attached to customer portal'
  }
];

export const ServiceVerticalsSection: React.FC<ServiceVerticalsSectionProps> = ({
  activeVerticalId,
  onSelectVertical,
  onLaunchDemo,
  onSelectCtaPreset
}) => {
  const [activeAIOpsStep, setActiveAIOpsStep] = useState<number>(0);
  const [activeTicketStep, setActiveTicketStep] = useState<number>(0);

  const currentVertical =
    SERVICE_VERTICALS.find((v) => v.id === activeVerticalId) || SERVICE_VERTICALS[0];

  const getVerticalImage = (id: ServiceVertical['id']) => {
    switch (id) {
      case 'aiops':
      case 'servicedesk':
        return {
          src: '/src/assets/images/service_aiops_command_1794344457911.jpg',
          alt: 'ServerAdminz site reliability engineering workstation and AIOps telemetry center'
        };
      case 'finops':
      case 'custom-ai':
        return {
          src: '/src/assets/images/service_cloud_finops_1794344458617.jpg',
          alt: 'Interconnected cloud server clusters and multi-cloud infrastructure architecture'
        };
      case 'security':
      case 'agents':
        return {
          src: '/src/assets/images/service_security_governance_1794344460417.jpg',
          alt: 'Isolated enterprise hardware security module and private AI server vault'
        };
    }
  };

  const visualAsset = getVerticalImage(currentVertical.id);

  return (
    <section id="verticals" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-slate-500 mb-2">
            <span>Dedicated Service Architecture</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Six Specialized Engineering Practice Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Practical AI &amp; Automation Built into Real Infrastructure Operations
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We do not position AI as a generic bolt-on widget. Select a practice area below to inspect the concrete operational problem, technical capabilities, governance boundaries, and commercial outcomes.
          </p>
        </div>

        {/* Interactive Vertical Selector Tabs */}
        <div
          role="tablist"
          aria-label="ServerAdminz AI Service Verticals"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 mb-10"
        >
          {SERVICE_VERTICALS.map((v) => {
            const isSelected = v.id === currentVertical.id;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectVertical(v.id)}
                className={`px-3 py-2.5 rounded-lg text-left transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <div className={`text-[11px] font-mono ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>
                  {v.index}. Practice
                </div>
                <div className="text-xs font-semibold tracking-tight truncate mt-0.5">
                  {v.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Vertical Main Split Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50/60">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                <span>Practice {currentVertical.index}</span>
                <span aria-hidden="true">·</span>
                <span>ServerAdminz Enterprise Vertical</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                {currentVertical.title}
              </h3>
              <p className="mt-2 text-base text-slate-600">
                {currentVertical.subtitle}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 mb-1.5">
                    Operational Bottleneck Addressed
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentVertical.businessProblem}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-blue-800 mb-1.5">
                    ServerAdminz Proactive Shift
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentVertical.proactiveShift}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-600 max-w-md">
                <strong className="font-semibold text-slate-900">Governance Policy:</strong> {currentVertical.governanceNote}
              </p>
              <button
                onClick={() => onSelectCtaPreset(currentVertical.ctaLabel, currentVertical.ctaPresetUseCase)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{currentVertical.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col rounded-xl border border-slate-200 overflow-hidden bg-slate-900">
            <div className="relative h-64 lg:h-72 w-full overflow-hidden">
              <ResilientImage
                src={visualAsset.src}
                alt={visualAsset.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs text-slate-300 font-mono">
                  Production Engineering Outcomes
                </div>
                <div className="text-sm font-semibold mt-0.5">
                  Verified Implementation Scenarios
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 divide-y divide-slate-800">
              {currentVertical.useCases.map((uc, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-4 mt-4' : ''}>
                  <div className="text-xs font-mono text-blue-400 mb-1">
                    Use Case 0{idx + 1} · {uc.scenario}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {uc.implementation}
                  </p>
                  <p className="text-xs font-medium text-emerald-400 mt-1.5">
                    Outcome: {uc.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-slate-900">
              Core Engineering Capabilities ({currentVertical.capabilities.length} Modules)
            </h4>
            <span className="text-xs text-slate-500">
              Delivered via AWS · Azure · Google Cloud · Hybrid Linux/K8s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentVertical.capabilities.map((cap, idx) => (
              <div
                key={cap.name}
                className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-1.5">
                    {currentVertical.index}.0{idx + 1}
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 mb-1.5">
                    {cap.name}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical-Specific Deep-Dive Modules (Sections A, B, C, D, E, F) */}
        {currentVertical.id === 'aiops' && (
          <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">
                  Interactive 6-Stage AIOps Pipeline Walkthrough · Illustrative Simulation
                </div>
                <h4 className="text-xl font-bold tracking-tight">
                  How ServerAdminz Moves Infrastructure from Reactive to Proactive Operations
                </h4>
              </div>
              <button
                onClick={() => onLaunchDemo('health')}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open Full Infrastructure Health Simulator
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-6">
              {AIOPS_STAGES.map((stage, i) => (
                <button
                  key={stage.step}
                  onClick={() => setActiveAIOpsStep(i)}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    activeAIOpsStep === i
                      ? 'bg-blue-950/80 border-blue-500 text-white'
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-mono text-blue-400">Stage {stage.step}</div>
                  <div className="text-xs font-semibold mt-1 line-clamp-2">{stage.title}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-950 p-5 rounded-lg border border-slate-800">
              <div className="lg:col-span-7">
                <div className="text-xs font-mono text-emerald-400 mb-1">
                  Stage {AIOPS_STAGES[activeAIOpsStep].step} of 06 · {AIOPS_STAGES[activeAIOpsStep].metric}
                </div>
                <h5 className="text-lg font-bold text-white mb-2">
                  {AIOPS_STAGES[activeAIOpsStep].title}
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {AIOPS_STAGES[activeAIOpsStep].detail}
                </p>
              </div>
              <div className="lg:col-span-5 bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-[11px] text-slate-400 mb-1.5">
                  Telemetry &amp; Audit Trace (Simulated)
                </div>
                <code className="block text-blue-300 break-words">
                  {AIOPS_STAGES[activeAIOpsStep].logOutput}
                </code>
              </div>
            </div>
          </div>
        )}

        {currentVertical.id === 'servicedesk' && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono text-blue-700 mb-1">
                  End-to-End Ticket Lifecycle Trace · Illustrative Walkthrough
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  How a Customer Support Ticket Moves Through an AI-Assisted Workflow
                </h4>
              </div>
              <button
                onClick={() => onLaunchDemo('support')}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Try Live AI Support Assistant Demo
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-5 space-y-2">
                {SERVICE_DESK_TICKET_FLOW.map((item, idx) => (
                  <button
                    key={item.stage}
                    onClick={() => setActiveTicketStep(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                      activeTicketStep === idx
                        ? 'bg-white border-blue-600 shadow-xs'
                        : 'bg-slate-100/80 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>{item.stage}</span>
                      <span>+{item.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-700 mb-2">
                    <span>{SERVICE_DESK_TICKET_FLOW[activeTicketStep].actor}</span>
                    <span>Elapsed: {SERVICE_DESK_TICKET_FLOW[activeTicketStep].timestamp}</span>
                  </div>
                  <h5 className="text-lg font-bold text-slate-900 mb-3">
                    {SERVICE_DESK_TICKET_FLOW[activeTicketStep].stage}
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {SERVICE_DESK_TICKET_FLOW[activeTicketStep].summary}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs">
                  {SERVICE_DESK_TICKET_FLOW[activeTicketStep].artifact}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentVertical.id === 'finops' && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-amber-800 mb-1">
                Commercial Integrity &amp; Engineering Baseline Policy
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Verified Telemetry Before Optimization Claims
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                ServerAdminz never promises arbitrary cloud cost savings without first conducting a 14-day read-only telemetry baseline and documenting explicit workload, commitment, and availability assumptions. Test our indicative model in the interactive calculator.
              </p>
            </div>
            <button
              onClick={() => onLaunchDemo('finops')}
              className="px-5 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Launch Interactive Cloud Cost Assessment
            </button>
          </div>
        )}

        {currentVertical.id === 'security' && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 mb-2">
              <ShieldAlert className="w-4 h-4 text-blue-700" />
              <span>Service Scope Boundary &amp; Operational Transparency</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">
              AI-Assisted Security Operations vs. Fully Managed SOC / MDR
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-lg border border-slate-200">
                <h5 className="text-sm font-bold text-slate-900 mb-2">
                  Included: ServerAdminz AI-Assisted Security Operations
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Automated syslog, Linux auditd, WAF, and CloudTrail anomaly triage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Runtime-reachable CVE vulnerability prioritization and OS/container patching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Security incident summarization and engineer-approved firewall/IAM containment</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-white rounded-lg border border-slate-200">
                <h5 className="text-sm font-bold text-slate-900 mb-2">
                  Distinct From: Dedicated 24/7 Managed SOC / MDR Retainer
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Unless scoped via a certified MDR partner integration, AI-Assisted Security Operations does not replace a licensed 24/7 Security Operations Center (SOC) for endpoint EDR forensics, legal breach notification, or dark-web threat hunting.
                </p>
                <div className="text-xs font-mono text-slate-500">
                  Can integrate directly with your existing CrowdStrike, Sentinel, or Splunk SIEM teams.
                </div>
              </div>
            </div>
          </div>
        )}

        {currentVertical.id === 'agents' && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-700 mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>Architectural Distinction &amp; Execution Guardrails</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Conversational AI Chatbot vs. Governed Workflow-Executing Agent
                </h4>
              </div>
              <button
                onClick={() => onLaunchDemo('workflow')}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open AI Automation Workflow Builder
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-5 bg-white rounded-lg border border-slate-200">
                <div className="text-xs font-mono text-slate-500 mb-1">Passive Interface</div>
                <h5 className="text-sm font-bold text-slate-900 mb-2">
                  Standard Conversational AI Chatbot
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates text answers based on prompt input. Cannot inspect live server socket states, cannot verify Terraform drift, and leaves human engineers to manually copy, validate, and run commands.
                </p>
              </div>
              <div className="p-5 bg-white rounded-lg border border-blue-200">
                <div className="text-xs font-mono text-blue-700 mb-1">Governed Execution Engine</div>
                <h5 className="text-sm font-bold text-slate-900 mb-2">
                  ServerAdminz Operational Workflow Agent
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Executes scoped read-only diagnostics automatically, prepares deterministic Ansible/Terraform/K8s remediation plans, pauses at a mandatory human engineer approval gate, logs every action to an immutable audit trail, and runs automated rollback if post-checks fail.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentVertical.id === 'custom-ai' && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 mb-1">
              <Layers className="w-4 h-4" />
              <span>Multi-Cloud &amp; Open-Source Deployment Topologies</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">
              Private Enterprise AI Deployment Across Your Preferred Cloud Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">Amazon Web Services (AWS)</div>
                <p className="text-xs text-slate-600">Amazon Bedrock via PrivateLink, EKS GPU node groups, RDS pgvector / OpenSearch Serverless, KMS encryption.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">Microsoft Azure</div>
                <p className="text-xs text-slate-600">Azure OpenAI with Private Endpoints, AKS clusters, Azure AI Search hybrid indexing, Entra ID RBAC enforcement.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">Google Cloud Platform</div>
                <p className="text-xs text-slate-600">Vertex AI &amp; Gemini models under VPC Service Controls, GKE standard/autopilot, Cloud SQL pgvector &amp; BigQuery.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">Open-Source &amp; On-Premises</div>
                <p className="text-xs text-slate-600">vLLM / TGI self-hosted inference, Qdrant / Milvus vector clusters, LangChain / LlamaIndex Python microservices.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
