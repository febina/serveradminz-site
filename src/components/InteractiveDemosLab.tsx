import React, { useState } from 'react';
import {
  Activity,
  Bot,
  GitBranch,
  ClipboardCheck,
  Calculator,
  CheckCircle2,
  RotateCcw,
  Send,
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export type DemoTabId = 'health' | 'support' | 'workflow' | 'readiness' | 'finops';

interface InteractiveDemosLabProps {
  activeTab: DemoTabId;
  onTabChange: (tab: DemoTabId) => void;
  onRequestProposalWithContext: (ctaLabel: string, useCase: string, challengeSummary: string) => void;
}

interface HealthScenario {
  id: string;
  name: string;
  clusterLabel: string;
  nodesCount: number;
  rawAlertsCount: number;
  correlatedIncidents: number;
  nominalLatencyMs: number;
  anomalyLatencyMs: number;
  nodes: {
    host: string;
    role: string;
    cpu: string;
    mem: string;
    status: 'Nominal' | 'Anomaly Detected' | 'Correlated Root Cause';
    detail: string;
  }[];
  stages: {
    stageName: string;
    observation: string;
    telemetrySnippet: string;
  }[];
  remediationCommand: string;
  rollbackCommand: string;
}

const HEALTH_SCENARIOS: HealthScenario[] = [
  {
    id: 'pg-locks',
    name: 'PostgreSQL Connection Pool Saturation',
    clusterLabel: 'prod-eu-central-db-cluster (Linux / Patroni / PgBouncer)',
    nodesCount: 18,
    rawAlertsCount: 142,
    correlatedIncidents: 1,
    nominalLatencyMs: 34,
    anomalyLatencyMs: 690,
    nodes: [
      {
        host: 'pg-primary-01.eu.internal',
        role: 'Primary DB Node',
        cpu: '94.2%',
        mem: '88.1%',
        status: 'Correlated Root Cause',
        detail: '47 sessions waiting on Relation ExclusiveLock (table: ledger_entries)'
      },
      {
        host: 'pg-replica-02.eu.internal',
        role: 'Read Replica',
        cpu: '41.0%',
        mem: '64.2%',
        status: 'Nominal',
        detail: 'Replication WAL replay nominal (lag: 120ms)'
      },
      {
        host: 'k8s-checkout-api-7d9f',
        role: 'Ingress Microservice Pool',
        cpu: '76.4%',
        mem: '71.0%',
        status: 'Anomaly Detected',
        detail: 'Downstream symptom: PgBouncer cl_waiting queue spike causing HTTP 504s'
      },
      {
        host: 'haproxy-edge-01.eu.internal',
        role: 'Edge Load Balancer',
        cpu: '29.5%',
        mem: '44.8%',
        status: 'Nominal',
        detail: 'TLS 1.3 termination healthy; upstream backend response time elevated'
      }
    ],
    stages: [
      {
        stageName: '1. Infrastructure Monitoring',
        observation: 'Collecting 15-second granularity metrics from node_exporter, postgres_exporter, and haproxy_exporter across 18 production nodes.',
        telemetrySnippet: 'pg_stat_database_xact_commit{datname="prod_ledger"} 4,820 tx/s · baseline p99: 34ms'
      },
      {
        stageName: '2. Unusual Activity Detection',
        observation: 'Time-series forecasting flags a 4.1σ deviation in active lock waits and disk I/O await on pg-primary-01.',
        telemetrySnippet: 'pg_stat_activity_count{state="active",wait_event_type="Lock"} = 47 (threshold baseline <= 3)'
      },
      {
        stageName: '3. Alert Correlation',
        observation: '142 downstream microservice timeout and pool exhaustion alerts are suppressed and linked to single Root Incident #INC-8821.',
        telemetrySnippet: 'correlated_incident_id="INC-8821" · suppressed_child_alerts=141 · topology_root="pg-primary-01"'
      },
      {
        stageName: '4. Potential Root-Cause Identification',
        observation: 'Matched lock contention onset with GitOps migration commit 4c91e0b that added a foreign-key check without a supporting B-Tree index.',
        telemetrySnippet: 'seq_tup_read rate jumped +1,850% on public.ledger_entries following deploy #2026.11.09-rc2'
      },
      {
        stageName: '5. Recommended Remediation',
        observation: 'Staged non-blocking concurrent index creation and temporary termination of idle-in-transaction blocker PID 29410.',
        telemetrySnippet: 'runbook="RB-PG-409" · safety_check="non-blocking DDL verified" · approval_required="L3-DBA"'
      },
      {
        stageName: '6. Engineer Approval & Resolution',
        observation: 'Awaiting or completed L3 engineer sign-off to execute remediation and verify p99 latency recovery.',
        telemetrySnippet: 'gate_status="READY_FOR_SIGN_OFF" · rollback_hook="DROP INDEX CONCURRENTLY idx_ledger_org_id"'
      }
    ],
    remediationCommand: 'SELECT pg_terminate_backend(29410); CREATE INDEX CONCURRENTLY idx_ledger_org_id ON public.ledger_entries (org_id, created_at);',
    rollbackCommand: 'DROP INDEX CONCURRENTLY IF EXISTS public.idx_ledger_org_id;'
  },
  {
    id: 'k8s-memory',
    name: 'Kubernetes Worker Node Memory Leak & Eviction Risk',
    clusterLabel: 'prod-us-east-eks-01 (Kubernetes v1.31 / Karpenter)',
    nodesCount: 24,
    rawAlertsCount: 89,
    correlatedIncidents: 1,
    nominalLatencyMs: 28,
    anomalyLatencyMs: 410,
    nodes: [
      {
        host: 'ip-10-42-18-109.ec2.internal',
        role: 'EKS Worker Node (m6i.2xlarge)',
        cpu: '68.0%',
        mem: '96.4%',
        status: 'Correlated Root Cause',
        detail: 'container_memory_rss climbing +18MB/min on telemetry-ingestor-daemonset'
      },
      {
        host: 'ip-10-42-19-204.ec2.internal',
        role: 'EKS Worker Node (m6i.2xlarge)',
        cpu: '52.1%',
        mem: '94.8%',
        status: 'Anomaly Detected',
        detail: 'Kubelet MemoryPressure condition approaching eviction threshold'
      },
      {
        host: 'billing-processor-deploy-6b8',
        role: 'Critical Payment Workload',
        cpu: '45.2%',
        mem: '58.0%',
        status: 'Nominal',
        detail: 'Co-located on affected nodes; at risk of sudden OOM eviction'
      },
      {
        host: 'karpenter-controller-01',
        role: 'Cluster Autoscaler',
        cpu: '19.4%',
        mem: '32.0%',
        status: 'Nominal',
        detail: 'Warm spare node capacity ready for cordoning workflow'
      }
    ],
    stages: [
      {
        stageName: '1. Infrastructure Monitoring',
        observation: 'Tracking cgroup memory working set, page faults, and kubelet eviction signals across 24 EKS worker nodes.',
        telemetrySnippet: 'container_memory_working_set_bytes{daemonset="telemetry-ingestor"} · trend: +1.08GB/hr'
      },
      {
        stageName: '2. Unusual Activity Detection',
        observation: 'Linear regression model predicts kubelet hard eviction threshold breach in 38 minutes across 2 AZ worker nodes.',
        telemetrySnippet: 'predicted_oom_exhaustion_seconds=2280 · non-reclaimed heap buffers detected'
      },
      {
        stageName: '3. Alert Correlation',
        observation: '89 pod memory warning events and GC pause spikes correlated to a single DaemonSet image update.',
        telemetrySnippet: 'correlated_incident_id="INC-8845" · root_workload="daemonset/telemetry-ingestor:v1.9.3"'
      },
      {
        stageName: '4. Potential Root-Cause Identification',
        observation: 'DaemonSet v1.9.3 introduced unbounded retry buffer when downstream Loki endpoint throttles batch writes.',
        telemetrySnippet: 'diff: helm release telemetry-ingestor rev 41 -> 42 (unbounded_queue_max_samples)'
      },
      {
        stageName: '5. Recommended Remediation',
        observation: 'Stage Helm rollback to v1.9.2 and enforce 512Mi container memory limit with queue backpressure drop policy.',
        telemetrySnippet: 'runbook="RB-K8S-218" · blast_radius="zero customer traffic drop during rolling restart"'
      },
      {
        stageName: '6. Engineer Approval & Resolution',
        observation: 'Engineer approves rolling DaemonSet revert; node memory pressure clears without evicting co-located payment pods.',
        telemetrySnippet: 'gate_status="READY_FOR_SIGN_OFF" · rollback_hook="helm rollback telemetry-ingestor 41"'
      }
    ],
    remediationCommand: 'helm rollback telemetry-ingestor 41 -n observability --wait && kubectl rollout status ds/telemetry-ingestor -n observability',
    rollbackCommand: 'helm upgrade telemetry-ingestor ./charts/ingestor --version 1.9.3 --set queue.maxSamples=10000'
  }
];

interface SupportAssistantResult {
  sourceMode: string;
  apiNotice?: string;
  classification: {
    category: string;
    priority: string;
    slaRisk: string;
    routedQueue: string;
  };
  summary: string;
  knowledgeBaseMatch: {
    runbookId: string;
    title: string;
    similarityScore: string;
    lastVerified: string;
  };
  rootCauseHypothesis: string;
  diagnosticSteps: string[];
  remediationPlan: {
    proposedAction: string;
    approvalGate: string;
    rollbackProcedure: string;
  };
  humanEscalationTrigger: string;
}

const SAMPLE_SUPPORT_QUESTIONS = [
  {
    label: 'PostgreSQL CPU 95% & Idle-in-Transaction Spike',
    question: 'Our primary PostgreSQL 16 server CPU hit 95% after today’s release and PgBouncer shows 60+ waiting client connections. How should we diagnose and mitigate safely?',
    context: 'AWS RDS / Linux EC2 + PgBouncer Pooler (Production)'
  },
  {
    label: 'Kubernetes Pods OOMKilled (Exit Code 137)',
    question: 'Payment worker pods on our EKS cluster keep restarting with OOMKilled Exit Code 137 during peak checkout windows even though node memory is at 60%.',
    context: 'Amazon EKS v1.31 · Node.js 20 Microservices'
  },
  {
    label: 'Nginx / HAProxy Intermittent 502 Bad Gateway',
    question: 'We are seeing intermittent 502 Bad Gateway errors on our HAProxy + Nginx ingress tier during TLS bursts, with upstream prematurely closed connection logs.',
    context: 'Hybrid Linux Debian 12 + HAProxy 2.8 Edge Tier'
  }
];

const WORKFLOW_TEMPLATES = [
  {
    id: 'tls-renewal',
    name: 'Automated SSL/TLS Certificate Renewal & Zero-Downtime Reload',
    trigger: 'Certificate expiry < 14 days OR ACME validation event',
    targetSystem: 'HAProxy / Nginx Ingress Fleet (Multi-Region Linux)',
    estimatedTimeSaved: '45 mins per renewal cycle',
    steps: [
      {
        phase: 'Read-Only Pre-Flight Check',
        action: 'Verify DNS CAA records, inspect current TLS 1.3 cipher suite, and validate staging certificate chain completeness.',
        guardrail: 'Read-Only Service Account (scoped to /etc/ssl/certs inspection)'
      },
      {
        phase: 'Syntax & Staging Verification',
        action: 'Stage new PEM bundle in isolated path and run nginx -t && haproxy -c -f /etc/haproxy/haproxy.cfg.',
        guardrail: 'Halts immediately if config syntax validation returns non-zero exit code'
      },
      {
        phase: 'Human Engineer Approval Gate',
        action: 'Present certificate SHA-256 fingerprint, SAN domains, and blast radius in SRE workbench for 1-click sign-off.',
        guardrail: 'Mandatory L2/L3 Engineer cryptographic approval token required'
      },
      {
        phase: 'Graceful Reload & Post-Probe Rollback Hook',
        action: 'Execute graceful worker reload (systemctl reload haproxy) and verify synthetic TLS handshake latency across 3 regions.',
        guardrail: 'Automatic revert to previous cert symlink if post-probe 5xx rate > 0.1%'
      }
    ]
  },
  {
    id: 'db-replica-scale',
    name: 'High-IOPS Database Read-Replica Scaling & Lag Mitigation',
    trigger: 'Read replica CPU > 82% for 5m OR replication lag > 8 seconds',
    targetSystem: 'PostgreSQL / Aurora / Cloud SQL Read Pool',
    estimatedTimeSaved: '35 mins per traffic surge',
    steps: [
      {
        phase: 'Read-Only Telemetry & Query Audit',
        action: 'Query pg_stat_statements and replica WAL receiver status to confirm read-heavy analytical burst vs. long-running lock.',
        guardrail: 'Scoped pg_monitor read-only database role'
      },
      {
        phase: 'Terraform / Cloud API Capacity Plan',
        action: 'Generate execution plan to provision 1 warm read-replica instance and adjust ProxySQL / PgBouncer read weight.',
        guardrail: 'Quota & hourlyFinOps cost ceiling check ($/hr delta verified)'
      },
      {
        phase: 'Human Engineer Approval Gate',
        action: 'Notify On-Call DBA with projected hourly cost impact and replica warm-up ETA for explicit approval.',
        guardrail: 'Requires DBA or Lead SRE approval in change log'
      },
      {
        phase: 'Weighted Traffic Shift & Auto-Scale Down Timer',
        action: 'Shift 25% -> 50% read traffic after cache warm-up; register 6-hour scale-down review trigger.',
        guardrail: 'Instant weight reset to 0% if replica connection errors occur'
      }
    ]
  },
  {
    id: 'iam-quarantine',
    name: 'Anomalous Cloud IAM Key Quarantine & Rotation Workflow',
    trigger: 'CloudTrail / Activity Log anomaly: unfamiliar ASN + S3 list burst',
    targetSystem: 'AWS IAM / Azure Entra ID / GCP Service Accounts',
    estimatedTimeSaved: '60 mins security triage time',
    steps: [
      {
        phase: 'Automated Blast-Radius & Dependency Map',
        action: 'Identify which CI/CD pipelines or production workloads actively depend on the flagged IAM access key over the last 7 days.',
        guardrail: 'Read-only CloudTrail & IAM Access Advisor query'
      },
      {
        phase: 'Containment Playbook Staging',
        action: 'Prepare temporary deny policy for anomalous source IP block while staging replacement key in AWS Secrets Manager.',
        guardrail: 'Prevents accidental outage of legitimate internal VPC workloads'
      },
      {
        phase: 'Human Security & SRE Approval Gate',
        action: 'Present correlated access timeline and dependency list for Security Lead approval before deactivating key.',
        guardrail: 'Dual-control sign-off logged to immutable SIEM trail'
      },
      {
        phase: 'Key Deactivation & Secret Rotation Verification',
        action: 'Deactivate compromised key ID, rotate secret in Kubernetes ExternalSecrets, and verify workload health.',
        guardrail: 'One-click policy revert if internalVPC health probes fail'
      }
    ]
  }
];

export const InteractiveDemosLab: React.FC<InteractiveDemosLabProps> = ({
  activeTab,
  onTabChange,
  onRequestProposalWithContext
}) => {
  // 1. Infrastructure Health Demo State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(HEALTH_SCENARIOS[0].id);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(3);
  const [remediationState, setRemediationState] = useState<'pending' | 'approved' | 'rolled-back'>('pending');

  const currentScenario =
    HEALTH_SCENARIOS.find((s) => s.id === selectedScenarioId) || HEALTH_SCENARIOS[0];

  // 2. Support Assistant Demo State
  const [supportQuestion, setSupportQuestion] = useState<string>(SAMPLE_SUPPORT_QUESTIONS[0].question);
  const [supportContext, setSupportContext] = useState<string>(SAMPLE_SUPPORT_QUESTIONS[0].context);
  const [supportLoading, setSupportLoading] = useState<boolean>(false);
  const [supportError, setSupportError] = useState<string | null>(null);
  const [supportResult, setSupportResult] = useState<SupportAssistantResult | null>({
    sourceMode: 'verified-runbook-baseline',
    classification: {
      category: 'Database Performance & Connection Pool Exhaustion',
      priority: 'P1 — High Operational Impact',
      slaRisk: 'Elevated (Projected breach in 28 minutes without intervention)',
      routedQueue: 'L3 Database Reliability & AIOps Queue'
    },
    summary: 'High CPU utilization (95%) on primary PostgreSQL node correlated with sudden spike in waiting PgBouncer client connections following deployment.',
    knowledgeBaseMatch: {
      runbookId: 'RB-PG-409',
      title: 'PostgreSQL Connection Saturation & Lock Contention Triage',
      similarityScore: '0.94 Cosine Match',
      lastVerified: 'Verified by Principal DBA Team · Oct 2026'
    },
    rootCauseHypothesis: 'Unindexed foreign key lookup introduced in today’s release is holding row-level locks, causing PgBouncer pool saturation and cascading worker retries.',
    diagnosticSteps: [
      "SELECT pid, usename, state, wait_event_type, query_start, left(query, 80) FROM pg_stat_activity WHERE state != 'idle' ORDER BY query_start ASC LIMIT 15;",
      'pgbouncer -d /etc/pgbouncer/pgbouncer.ini -R (Inspect SHOW POOLS and cl_waiting metrics — read-only)',
      'iostat -xz 1 5 (Verify whether disk IOPS awaiting completion is contributing to lock duration)'
    ],
    remediationPlan: {
      proposedAction: 'Terminate stalled transactions exceeding 180s runtime, throttle offending worker deployment pool limit from 100 to 35 connections, and create concurrent index.',
      approvalGate: 'Requires L3 Database Engineer explicit cryptographic sign-off before executing pg_terminate_backend or CREATE INDEX CONCURRENTLY.',
      rollbackProcedure: 'DROP INDEX CONCURRENTLY idx_orders_customer_org_id; restore previous PgBouncer pool_size configuration from GitOps tag.'
    },
    humanEscalationTrigger: 'Escalate immediately to On-Call Principal DBA if replication lag on read replicas exceeds 15 seconds or WAL disk usage crosses 85%.'
  });

  const handleRunSupportAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportQuestion.trim()) return;
    setSupportLoading(true);
    setSupportError(null);
    try {
      const response = await fetch('/api/support-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: supportQuestion,
          environmentContext: supportContext
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setSupportError(data.error || 'Unable to process support query.');
      } else {
        setSupportResult(data);
      }
    } catch {
      setSupportError('Network error communicating with AI Support Assistant sandbox.');
    } finally {
      setSupportLoading(false);
    }
  };

  // 3. Automation Workflow Builder State
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(WORKFLOW_TEMPLATES[0].id);
  const [requireHumanGate, setRequireHumanGate] = useState<boolean>(true);
  const [enableAutoRollback, setEnableAutoRollback] = useState<boolean>(true);
  const [workflowSimulated, setWorkflowSimulated] = useState<boolean>(false);

  const currentWorkflow =
    WORKFLOW_TEMPLATES.find((w) => w.id === selectedWorkflowId) || WORKFLOW_TEMPLATES[0];

  // 4. AI Readiness Assessment State
  const [readinessScores, setReadinessScores] = useState<{
    telemetry: number;
    runbooks: number;
    iac: number;
    ticketVolume: number;
  }>({
    telemetry: 3,
    runbooks: 2,
    iac: 3,
    ticketVolume: 3
  });

  const totalReadinessPoints =
    readinessScores.telemetry +
    readinessScores.runbooks +
    readinessScores.iac +
    readinessScores.ticketVolume;
  const readinessPercentage = Math.round((totalReadinessPoints / 16) * 100);

  const getReadinessTier = () => {
    if (readinessPercentage >= 75) {
      return {
        tier: 'Stage 3 — Proactive AIOps & Governed Agent Ready',
        summary: 'Your observability and IaC foundations can immediately support automated event correlation, RAG service desk assistants, and human-gated remediation workflows.',
        recommendedPackage: 'Managed AI Operations or AI Automation Projects',
        firstMilestone: 'Deploy single-tenant Runbook RAG + Prometheus/Datadog correlation engine within 30 days.'
      };
    }
    if (readinessPercentage >= 50) {
      return {
        tier: 'Stage 2 — Structured Observability & Assisted Triage Ready',
        summary: 'You have solid core monitoring but fragmented runbooks or manual triage bottlenecks. High ROI awaits in AI ticket classification, alert deduplication, and FinOps baselining.',
        recommendedPackage: 'AI-Enhanced Managed Services',
        firstMilestone: 'Establish 14-day telemetry baseline, centralize SOP runbooks, and enable AI ticket classification.'
      };
    }
    return {
      tier: 'Stage 1 — Foundation Standardization & Telemetry Baselining',
      summary: 'Before deploying autonomous agents, ServerAdminz recommends unifying metric collection (Prometheus/Exporter standardization) and documenting core incident runbooks.',
      recommendedPackage: 'AI-Enhanced Managed Services (Foundation Onboarding)',
      firstMilestone: 'Instrument standardized server/cloud telemetry and deploy read-only cost & anomaly visibility.'
    };
  };

  const readinessEvaluation = getReadinessTier();

  // 5. AI Cloud Cost Assessment State
  const [monthlySpend, setMonthlySpend] = useState<number>(45000);
  const [instanceCount, setInstanceCount] = useState<number>(85);
  const [cloudProvider, setCloudProvider] = useState<'AWS' | 'Azure' | 'Google Cloud' | 'Multi-Cloud'>('AWS');
  const [nonProdRatio, setNonProdRatio] = useState<number>(30); // % of infrastructure in dev/staging
  const [utilizationProfile, setUtilizationProfile] = useState<'variable' | 'steady' | 'overprovisioned'>('overprovisioned');

  // Indicative calculation with explicit assumptions
  const rightSizingFactor =
    utilizationProfile === 'overprovisioned' ? 0.14 : utilizationProfile === 'variable' ? 0.09 : 0.05;
  const nonProdScheduleFactor = (nonProdRatio / 100) * 0.35; // scheduling idle dev/staging hours
  const orphanedStorageFactor = 0.04;

  const lowEstimateRatio = Math.max(0.08, rightSizingFactor + nonProdScheduleFactor * 0.6);
  const highEstimateRatio = Math.min(0.32, rightSizingFactor + nonProdScheduleFactor + orphanedStorageFactor);

  const indicativeLowMonthly = Math.round(monthlySpend * lowEstimateRatio);
  const indicativeHighMonthly = Math.round(monthlySpend * highEstimateRatio);

  const DEMO_TABS: { id: DemoTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'health', label: '1. Infrastructure Health', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'support', label: '2. AI Support Assistant', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'workflow', label: '3. Workflow Builder', icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: 'readiness', label: '4. AI Readiness Assessment', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
    { id: 'finops', label: '5. Cloud Cost Assessment', icon: <Calculator className="w-3.5 h-3.5" /> }
  ];

  return (
    <section id="interactive-lab" className="py-16 lg:py-24 border-b border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header & Mandatory Simulation Safety Notice */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-slate-500 mb-2">
              <span>Interactive AI Demonstrations</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Five Hands-On Engineering Sandboxes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Test ServerAdminz AI Capabilities in Our Interactive Sandbox
            </h2>
          </div>
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 max-w-md">
            <strong className="font-semibold">Simulation &amp; Data Isolation Notice:</strong> All environments below use simulated telemetry and isolated runbook indices. No customer infrastructure data is exposed and no live server commands are executed.
          </div>
        </div>

        {/* 5 Interactive Demo Switcher Buttons */}
        <div
          role="tablist"
          aria-label="Interactive AI Demonstrations"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-xl border border-slate-300/80 mb-8"
        >
          {DEMO_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/70 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* DEMO 1: AI INFRASTRUCTURE HEALTH DEMONSTRATION */}
        {activeTab === 'health' && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">
                  Simulated Telemetry Environment · {currentScenario.clusterLabel}
                </div>
                <h3 className="text-xl font-bold">
                  AI Infrastructure Health &amp; Anomaly Correlation Simulator
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {HEALTH_SCENARIOS.map((scen) => (
                  <button
                    key={scen.id}
                    onClick={() => {
                      setSelectedScenarioId(scen.id);
                      setRemediationState('pending');
                      setActiveStageIdx(3);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                      selectedScenarioId === scen.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    Scenario: {scen.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-b border-slate-200 bg-slate-50">
              <div className="p-4">
                <div className="text-xs text-slate-500">Monitored Cluster Nodes</div>
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                  {currentScenario.nodesCount} Nodes
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500">Alert Noise Reduction</div>
                <div className="text-xl font-bold font-mono tabular-nums text-blue-700 mt-0.5">
                  {currentScenario.rawAlertsCount} Raw → {currentScenario.correlatedIncidents} Incident
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500">Simulated p99 Latency</div>
                <div
                  className={`text-xl font-bold font-mono tabular-nums mt-0.5 ${
                    remediationState === 'approved' ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {remediationState === 'approved'
                    ? `${currentScenario.nominalLatencyMs}ms (Restored)`
                    : `${currentScenario.anomalyLatencyMs}ms (Degraded)`}
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500">Execution Governance State</div>
                <div className="text-sm font-bold font-mono text-slate-900 mt-1">
                  {remediationState === 'pending' && 'Awaiting Engineer Approval'}
                  {remediationState === 'approved' && 'Approved & Resolved'}
                  {remediationState === 'rolled-back' && 'Reverted via Rollback Hook'}
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Simulated Node Telemetry Table */}
              <div className="lg:col-span-7">
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Node Telemetry &amp; Topological Correlation Matrix
                </h4>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-500">
                        <th className="py-2.5 px-3">Host / Pod</th>
                        <th className="py-2.5 px-3 text-right">CPU</th>
                        <th className="py-2.5 px-3 text-right">Mem</th>
                        <th className="py-2.5 px-3">AI Correlation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {currentScenario.nodes.map((n) => (
                        <tr key={n.host} className="hover:bg-slate-50">
                          <td className="py-3 px-3">
                            <div className="font-mono font-semibold text-slate-900">{n.host}</div>
                            <div className="text-[11px] text-slate-500">{n.detail}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                            {remediationState === 'approved' ? '38.2%' : n.cpu}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                            {remediationState === 'approved' ? '61.0%' : n.mem}
                          </td>
                          <td className="py-3 px-3 font-medium">
                            {remediationState === 'approved' ? (
                              <span className="text-emerald-700">Nominal (Verified)</span>
                            ) : (
                              <span
                                className={
                                  n.status === 'Correlated Root Cause'
                                    ? 'text-red-700 font-semibold'
                                    : n.status === 'Anomaly Detected'
                                    ? 'text-amber-700'
                                    : 'text-emerald-700'
                                }
                              >
                                {n.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 6-Stage Step Selector */}
                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    Inspect 6-Stage AIOps Diagnostic Progression:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currentScenario.stages.map((st, idx) => (
                      <button
                        key={st.stageName}
                        onClick={() => setActiveStageIdx(idx)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          activeStageIdx === idx
                            ? 'bg-slate-900 border-slate-900 text-white font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {st.stageName}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 p-4 rounded-lg bg-slate-900 text-slate-100">
                    <div className="text-xs font-semibold text-blue-300 mb-1">
                      {currentScenario.stages[activeStageIdx].stageName}
                    </div>
                    <p className="text-xs text-slate-300 mb-2">
                      {currentScenario.stages[activeStageIdx].observation}
                    </p>
                    <code className="block p-2 rounded bg-slate-950 text-[11px] font-mono text-emerald-300">
                      {currentScenario.stages[activeStageIdx].telemetrySnippet}
                    </code>
                  </div>
                </div>
              </div>

              {/* Right: Human-in-the-Loop Approval & Rollback Console */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-slate-50">
                <div>
                  <div className="text-xs font-mono text-blue-700 mb-1">
                    Stage 05 &amp; 06 · Human-in-the-Loop Execution Gate
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Recommended Remediation &amp; Engineer Sign-Off
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    ServerAdminz AI never executes state-mutating production commands autonomously. Review the staged command and rollback hook below to simulate engineer approval.
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-800 mb-1">
                      Staged Remediation Command:
                    </div>
                    <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      {currentScenario.remediationCommand}
                    </pre>
                  </div>

                  <div className="mb-5">
                    <div className="text-xs font-semibold text-slate-800 mb-1">
                      Pre-Validated Rollback Procedure:
                    </div>
                    <pre className="p-3 rounded-lg bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      {currentScenario.rollbackCommand}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setRemediationState('approved');
                        setActiveStageIdx(5);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve &amp; Execute Remediation</span>
                    </button>
                    <button
                      onClick={() => setRemediationState('rolled-back')}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Test Rollback</span>
                    </button>
                  </div>

                  {remediationState === 'approved' && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <strong>Simulated Resolution Confirmed:</strong> Lock contention cleared; cluster p99 latency returned to {currentScenario.nominalLatencyMs}ms. Audit log recorded.
                    </div>
                  )}
                  {remediationState === 'rolled-back' && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <strong>Rollback Executed:</strong> Reverted change cleanly via pre-staged rollback command.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEMO 2: AI SUPPORT ASSISTANT DEMONSTRATION */}
        {activeTab === 'support' && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
              <div className="text-xs font-mono text-blue-400 mb-1">
                Knowledge-Grounded AI Support Workbench · Powered by ServerAdminz Runbook RAG &amp; Gemini
              </div>
              <h3 className="text-xl font-bold">
                AI Technical Support Assistant Demonstration
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Select a sample infrastructure support ticket or enter your own server question to see how ServerAdminz classifies tickets, retrieves verified runbooks, and enforces human escalation boundaries.
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Question Input & Presets */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    Quick-Load Sample Support Scenarios:
                  </div>
                  <div className="space-y-2">
                    {SAMPLE_SUPPORT_QUESTIONS.map((Preset) => (
                      <button
                        key={Preset.label}
                        type="button"
                        onClick={() => {
                          setSupportQuestion(Preset.question);
                          setSupportContext(Preset.context);
                        }}
                        className="w-full text-left p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs transition-colors cursor-pointer"
                      >
                        <div className="font-semibold text-slate-900">{Preset.label}</div>
                        <div className="text-slate-500 truncate mt-0.5">{Preset.context}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleRunSupportAssistant} className="space-y-4 pt-3 border-t border-slate-200">
                  <div>
                    <label htmlFor="support-context" className="block text-xs font-semibold text-slate-800 mb-1">
                      Simulated Environment Context
                    </label>
                    <input
                      id="support-context"
                      type="text"
                      value={supportContext}
                      onChange={(e) => setSupportContext(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                      placeholder="e.g., Ubuntu 24.04 LTS / PostgreSQL 16 / AWS EKS"
                    />
                  </div>
                  <div>
                    <label htmlFor="support-question" className="block text-xs font-semibold text-slate-800 mb-1">
                      Sample Server or Cloud Support Question
                    </label>
                    <textarea
                      id="support-question"
                      rows={4}
                      value={supportQuestion}
                      onChange={(e) => setSupportQuestion(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                      placeholder="Describe a server, Kubernetes, database, or cloud issue..."
                    />
                  </div>
                  {supportError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                      {supportError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={supportLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {supportLoading
                        ? 'Analyzing Ticket & Grounding Runbook...'
                        : 'Generate Grounded Support Response'}
                    </span>
                  </button>
                </form>
              </div>

              {/* Right: Grounded AI Support Response */}
              <div className="lg:col-span-7">
                {supportResult && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-mono text-blue-700">
                          AI Ticket Classification &amp; Routing
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">
                          {supportResult.classification.category}
                        </h4>
                      </div>
                      <div className="text-xs font-mono text-slate-600">
                        {supportResult.classification.priority} · {supportResult.classification.routedQueue}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[11px] font-mono text-slate-500">Knowledge Base Match</div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">
                          {supportResult.knowledgeBaseMatch.runbookId}: {supportResult.knowledgeBaseMatch.title}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-mono mt-1">
                          {supportResult.knowledgeBaseMatch.similarityScore} · {supportResult.knowledgeBaseMatch.lastVerified}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[11px] font-mono text-slate-500">SLA-Risk Prediction</div>
                        <div className="text-xs font-bold text-amber-800 mt-0.5">
                          {supportResult.classification.slaRisk}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Executive Summary: {supportResult.summary}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-900 mb-1">
                        Root-Cause Hypothesis
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        {supportResult.rootCauseHypothesis}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-900 mb-1.5">
                        Recommended Read-Only Diagnostic Commands
                      </div>
                      <div className="space-y-1.5">
                        {supportResult.diagnosticSteps.map((cmd, idx) => (
                          <pre
                            key={idx}
                            className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap"
                          >
                            {cmd}
                          </pre>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1">
                          Remediation &amp; Approval Gate
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {supportResult.remediationPlan.proposedAction}
                        </p>
                        <p className="text-[11px] font-mono text-blue-800 mt-1">
                          Gate: {supportResult.remediationPlan.approvalGate}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1">
                          Rollback &amp; Escalation Trigger
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Rollback:</strong> {supportResult.remediationPlan.rollbackProcedure}
                        </p>
                        <p className="text-[11px] text-amber-900 mt-1">
                          <strong>Escalation:</strong> {supportResult.humanEscalationTrigger}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DEMO 3: AI AUTOMATION WORKFLOW BUILDER */}
        {activeTab === 'workflow' && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">
                  Operational Agent Pipeline Designer · RBAC + Audit Log + Rollback Enforced
                </div>
                <h3 className="text-xl font-bold">
                  AI Automation Workflow Builder
                </h3>
              </div>
              <div className="text-xs font-mono text-emerald-400">
                Estimated Engineering Time Saved: {currentWorkflow.estimatedTimeSaved}
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-4">
                <div className="text-xs font-semibold text-slate-800">
                  1. Select Operational Task to Automate:
                </div>
                <div className="space-y-2">
                  {WORKFLOW_TEMPLATES.map((wf) => (
                    <button
                      key={wf.id}
                      onClick={() => {
                        setSelectedWorkflowId(wf.id);
                        setWorkflowSimulated(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        selectedWorkflowId === wf.id
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold">{wf.name}</div>
                      <div className={`mt-1 text-[11px] ${selectedWorkflowId === wf.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        Target: {wf.targetSystem}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900">
                    2. Mandatory Governance Controls
                  </div>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                    <span>Enforce Human Approval Gate</span>
                    <input
                      type="checkbox"
                      checked={requireHumanGate}
                      onChange={(e) => setRequireHumanGate(e.target.checked)}
                      className="rounded border-slate-300 text-blue-700"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                    <span>Automated Post-Check Rollback</span>
                    <input
                      type="checkbox"
                      checked={enableAutoRollback}
                      onChange={(e) => setEnableAutoRollback(e.target.checked)}
                      className="rounded border-slate-300 text-blue-700"
                    />
                  </label>
                  {!requireHumanGate && (
                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>ServerAdminz policy requires human approval gates for production state-mutating steps.</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setWorkflowSimulated(true)}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white transition-colors cursor-pointer"
                  >
                    Simulate Workflow Dry-Run
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono text-slate-500">Trigger Condition: </span>
                    <span className="text-xs font-semibold text-slate-900">{currentWorkflow.trigger}</span>
                  </div>
                  <span className="text-xs font-mono text-blue-700">
                    RBAC + Immutable Audit Trail Active
                  </span>
                </div>

                <div className="space-y-3">
                  {currentWorkflow.steps.map((st, idx) => (
                    <div
                      key={st.phase}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs font-mono text-blue-700">
                          Step 0{idx + 1} · {st.phase}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 mt-0.5">
                          {st.action}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Guardrail: {st.guardrail}</span>
                        </div>
                      </div>
                      {workflowSimulated && (
                        <div className="text-xs font-mono text-emerald-700 shrink-0">
                          [Dry-Run Verified]
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {workflowSimulated && (
                  <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-emerald-400 font-semibold">
                        Dry-Run Audit Trace #WF-SIM-2026-09
                      </div>
                      <div className="text-slate-300 mt-0.5">
                        All pre-flight assertions passed · Human approval gate armed · Rollback hook verified ({enableAutoRollback ? 'Active' : 'Manual'}).
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onRequestProposalWithContext(
                          'Automate Your IT Support',
                          'AI Agents & IT Automation',
                          `Interested in implementing automated workflow: ${currentWorkflow.name}`
                        )
                      }
                      className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-sans font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Scope This Workflow with ServerAdminz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DEMO 4: AI READINESS ASSESSMENT */}
        {activeTab === 'readiness' && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
              <div className="text-xs font-mono text-blue-400 mb-1">
                4-Pillar Operational Maturity Diagnostic · Indicative Assessment
              </div>
              <h3 className="text-xl font-bold">
                Enterprise Infrastructure &amp; AI Readiness Assessment
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                {[
                  {
                    key: 'telemetry' as const,
                    title: '1. Infrastructure Telemetry & Observability Maturity',
                    options: [
                      { val: 1, label: 'Basic ping / host up-down checks only' },
                      { val: 2, label: 'Standard CPU/Disk alerts across fragmented tools' },
                      { val: 3, label: 'Centralized Prometheus, Datadog, or CloudWatch metrics' },
                      { val: 4, label: 'Unified metrics, structured logs, and distributed traces' }
                    ]
                  },
                  {
                    key: 'runbooks' as const,
                    title: '2. Operational Runbooks & Knowledge Documentation',
                    options: [
                      { val: 1, label: 'Tribal knowledge; undocumented fixes' },
                      { val: 2, label: 'Scattered wiki pages and ticket notes' },
                      { val: 3, label: 'Standardized SOP runbooks for critical services' },
                      { val: 4, label: 'Version-controlled Markdown runbooks linked to alert IDs' }
                    ]
                  },
                  {
                    key: 'iac' as const,
                    title: '3. Infrastructure-as-Code & Automation Governance',
                    options: [
                      { val: 1, label: 'Manual SSH / Cloud console administration' },
                      { val: 2, label: 'Ad-hoc bash/PowerShell scripts without central review' },
                      { val: 3, label: 'Terraform / Ansible used for core provisioning' },
                      { val: 4, label: 'GitOps pipelines with peer review and automated rollback' }
                    ]
                  },
                  {
                    key: 'ticketVolume' as const,
                    title: '4. Primary AI Adoption Driver & Operational Bottleneck',
                    options: [
                      { val: 1, label: 'Exploring initial AI strategy & security governance' },
                      { val: 2, label: 'Reducing cloud spend waste and capacity guesswork' },
                      { val: 3, label: 'High L1/L2 ticket volume and slow runbook lookup' },
                      { val: 4, label: '24/7 alert fatigue and complex multi-cloud incident correlation' }
                    ]
                  }
                ].map((question) => (
                  <div key={question.key} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-bold text-slate-900 mb-2.5">
                      {question.title}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {question.options.map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() =>
                            setReadinessScores((prev) => ({ ...prev, [question.key]: opt.val }))
                          }
                          className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                            readinessScores[question.key] === opt.val
                              ? 'bg-slate-900 border-slate-900 text-white font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl border border-slate-200 bg-slate-900 text-white">
                <div>
                  <div className="text-xs font-mono text-blue-400">
                    Calculated Readiness Index: {readinessPercentage}% ({totalReadinessPoints}/16 Points)
                  </div>
                  <h4 className="text-xl font-bold mt-1 mb-3">
                    {readinessEvaluation.tier}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {readinessEvaluation.summary}
                  </p>

                  <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
                    <div>
                      <div className="text-slate-400 font-mono">Recommended Commercial Model</div>
                      <div className="font-semibold text-emerald-400 mt-0.5">
                        {readinessEvaluation.recommendedPackage}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-mono">Recommended First 30-Day Milestone</div>
                      <div className="text-slate-200 mt-0.5">
                        {readinessEvaluation.firstMilestone}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onRequestProposalWithContext(
                      'Assess Your AI Readiness',
                      'AI Infrastructure Management & AIOps',
                      `Completed AI Readiness Assessment (${readinessPercentage}% - ${readinessEvaluation.tier}). Seeking roadmap consultation.`
                    )
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  <span>Book Technical Review of This Readiness Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DEMO 5: AI CLOUD COST ASSESSMENT */}
        {activeTab === 'finops' && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">
                  Indicative Multi-Cloud FinOps Estimator · Explicit Baseline Assumptions Stated
                </div>
                <h3 className="text-xl font-bold">
                  AI Cloud Cost &amp; Utilisation Optimisation Assessment
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-300">
                Subject to 14-Day Telemetry Baseline Verification
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                    <span>Approximate Monthly Cloud Spend (USD)</span>
                    <span className="font-mono tabular-nums text-blue-700">
                      ${monthlySpend.toLocaleString()}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={250000}
                    step={5000}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                    <span>Compute Instances / Kubernetes Worker Nodes</span>
                    <span className="font-mono tabular-nums text-blue-700">{instanceCount} Nodes</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={5}
                    value={instanceCount}
                    onChange={(e) => setInstanceCount(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                    <span>Dev / Staging / Non-Production Footprint Share</span>
                    <span className="font-mono tabular-nums text-blue-700">{nonProdRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={nonProdRatio}
                    onChange={(e) => setNonProdRatio(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Primary Cloud Footprint
                    </label>
                    <select
                      value={cloudProvider}
                      onChange={(e) => setCloudProvider(e.target.value as typeof cloudProvider)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900"
                    >
                      <option value="AWS">Amazon Web Services (AWS)</option>
                      <option value="Azure">Microsoft Azure</option>
                      <option value="Google Cloud">Google Cloud Platform</option>
                      <option value="Multi-Cloud">Multi-Cloud + Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Observed Utilization Pattern
                    </label>
                    <select
                      value={utilizationProfile}
                      onChange={(e) => setUtilizationProfile(e.target.value as typeof utilizationProfile)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900"
                    >
                      <option value="overprovisioned">Headroom-Heavy / Overprovisioned</option>
                      <option value="variable">Variable Spiky Traffic</option>
                      <option value="steady">Steady Baseline &amp; Partially Reserved</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-xl border border-slate-200 bg-slate-50">
                <div>
                  <div className="text-xs font-mono text-slate-500">
                    Indicative Monthly Efficiency Opportunity ({cloudProvider})
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    ${indicativeLowMonthly.toLocaleString()} – ${indicativeHighMonthly.toLocaleString()} / month
                  </div>
                  <div className="text-xs text-blue-800 font-mono mt-1">
                    Estimated Range: {Math.round(lowEstimateRatio * 100)}% to {Math.round(highEstimateRatio * 100)}% of current spend
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-xs">
                    <div className="font-bold text-slate-900">
                      Stated Architectural Assumptions (Mandatory Verification):
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      1. <strong>Compute Right-Sizing:</strong> Assumes 99th-percentile CPU/RAM telemetry permits instance family tuning without violating SLO latency headroom.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      2. <strong>Non-Production Scheduling:</strong> Assumes {nonProdRatio}% dev/staging clusters can scale down during off-shift weekend windows.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      3. <strong>No Unverified Guarantees:</strong> Actual commercial savings are only projected after a 14-day read-only billing (CUR) and Prometheus/CloudWatch telemetry audit.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onRequestProposalWithContext(
                      'Book an AIOps Consultation',
                      'AI Cloud Management & FinOps',
                      `Cloud Cost Assessment: ~$${monthlySpend.toLocaleString()}/mo across ${instanceCount} nodes on ${cloudProvider}. Requesting 14-day telemetry baseline.`
                    )
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                >
                  <span>Request Verified 14-Day Cloud FinOps Baseline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
