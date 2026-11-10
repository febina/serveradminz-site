import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const PORT = 3000;

interface EnquiryRecord {
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

const enquiriesStore: EnquiryRecord[] = [
  {
    id: 'SA-AI-2026-841',
    submittedAt: '2026-11-10T09:15:00Z',
    businessName: 'Meridian Logistics Group',
    businessEmail: 'infra-ops@meridianlogistics.example.com',
    industry: 'Supply Chain & Freight',
    existingInfrastructure: 'Hybrid: 65 Linux VMs + 3 EKS Clusters',
    cloudPlatform: 'AWS & On-Premises KVM',
    aiUseCase: 'AI Infrastructure Management & AIOps',
    operationalChallenge: 'High alert fatigue across Prometheus and Datadog during peak customs processing windows.',
    timeline: '1–3 Months',
    routedTeam: 'AIOps & Predictive Infrastructure Engineering Team',
    routingRationale: 'Requires multi-source metric correlation, anomaly baselining, and runbook-assisted root-cause triage.',
    recommendedModel: 'AI-Enhanced Managed Services'
  }
];

function determineTeamRouting(aiUseCase: string, challenge: string): {
  routedTeam: string;
  routingRationale: string;
  recommendedModel: string;
} {
  const combined = `${aiUseCase} ${challenge}`.toLowerCase();
  if (combined.includes('finops') || combined.includes('cost') || combined.includes('cloud') || combined.includes('scaling')) {
    return {
      routedTeam: 'Cloud FinOps & Capacity Engineering Team',
      routingRationale: 'Routed to Cloud Economics & Multi-Cloud Optimization architects for telemetry baselining and commitment modeling.',
      recommendedModel: 'AI-Enhanced Managed Services'
    };
  }
  if (combined.includes('service desk') || combined.includes('ticket') || combined.includes('support') || combined.includes('sla')) {
    return {
      routedTeam: 'Intelligent Service Desk & ITSM Automation Team',
      routingRationale: 'Routed to ITSM Workflow & Runbook RAG specialists for ticket classification, triage, and SLA risk prediction.',
      recommendedModel: 'AI Automation Projects'
    };
  }
  if (combined.includes('security') || combined.includes('threat') || combined.includes('log') || combined.includes('vulnerability')) {
    return {
      routedTeam: 'AI Security Operations & Governance Team',
      routingRationale: 'Routed to SecOps Telemetry & Compliance engineers for isolated log analysis and CVE prioritization workflows.',
      recommendedModel: 'AI-Enhanced Managed Services'
    };
  }
  if (combined.includes('rag') || combined.includes('custom') || combined.includes('agent') || combined.includes('llm')) {
    return {
      routedTeam: 'Enterprise RAG & Custom AI Architecture Team',
      routingRationale: 'Routed to Applied AI & Vector Infrastructure engineers for private LLM integration, guardrails, and MLOps.',
      recommendedModel: 'Managed AI Operations'
    };
  }
  return {
    routedTeam: 'AIOps & Predictive Infrastructure Engineering Team',
    routingRationale: 'Routed to Principal Site Reliability & AIOps engineers for anomaly detection, event correlation, and proactive remediation.',
    recommendedModel: 'AI-Enhanced Managed Services'
  };
}

function buildFallbackSupportResponse(question: string, environmentContext: string) {
  const q = question.toLowerCase();
  if (q.includes('postgres') || q.includes('database') || q.includes('connection') || q.includes('cpu')) {
    return {
      sourceMode: 'knowledge-base-simulation',
      classification: {
        category: 'Database Performance & Connection Pool Exhaustion',
        priority: 'P1 — High Operational Impact',
        slaRisk: 'Elevated (Projected breach in 28 minutes without intervention)',
        routedQueue: 'L3 Database Reliability & AIOps Queue'
      },
      summary: 'High CPU utilization (94%+) on primary PostgreSQL node correlated with sudden spike in idle-in-transaction connections following deployment.',
      knowledgeBaseMatch: {
        runbookId: 'RB-PG-409',
        title: 'PostgreSQL Connection Saturation & Lock Contention Triage',
        similarityScore: '0.94 Cosine Match',
        lastVerified: 'Verified by Principal DBA Team · Oct 2026'
      },
      rootCauseHypothesis: 'Unindexed foreign key lookup introduced in recent microservice release is holding row-level locks, causing PgBouncer pool saturation and cascading worker retries.',
      diagnosticSteps: [
        'SELECT pid, usename, state, wait_event_type, query_start, left(query, 80) FROM pg_stat_activity WHERE state != \'idle\' ORDER BY query_start ASC LIMIT 15;',
        'pgbouncer -d /etc/pgbouncer/pgbouncer.ini -R (Inspect SHOW POOLS and cl_waiting metrics — read-only)',
        'iostat -xz 1 5 (Verify whether disk IOPS awaiting completion is contributing to lock duration)'
      ],
      remediationPlan: {
        proposedAction: 'Terminate stalled transactions exceeding 180s runtime, throttle offending worker deployment pool limit from 100 to 35 connections, and create concurrent index on orders(customer_org_id).',
        approvalGate: 'Requires L3 Database Engineer explicit cryptographic sign-off before executing pg_terminate_backend or CREATE INDEX CONCURRENTLY.',
        rollbackProcedure: 'DROP INDEX CONCURRENTLY idx_orders_customer_org_id; restore previous PgBouncer pool_size configuration from GitOps tag v2.14.2.'
      },
      humanEscalationTrigger: 'Escalate immediately to On-Call Principal DBA if replication lag on read replicas exceeds 15 seconds or WAL disk usage crosses 85%.'
    };
  }

  if (q.includes('kubernetes') || q.includes('oom') || q.includes('pod') || q.includes('memory') || q.includes('eks')) {
    return {
      sourceMode: 'knowledge-base-simulation',
      classification: {
        category: 'Kubernetes Workload Stability & Memory Pressure',
        priority: 'P2 — Degraded Cluster Capacity',
        slaRisk: 'Moderate (Redundant pods absorbing traffic; node eviction risk in 45m)',
        routedQueue: 'Cloud Native & Kubernetes Platform Queue'
      },
      summary: 'Recurring OOMKilled (Exit Code 137) events across payment-worker pods on EKS worker group following traffic surge.',
      knowledgeBaseMatch: {
        runbookId: 'RB-K8S-218',
        title: 'Container Exit Code 137 (OOMKilled) & JVM/NodeJS Heap Ceiling Alignment',
        similarityScore: '0.92 Cosine Match',
        lastVerified: 'Verified by Cloud Platform SRE · Nov 2026'
      },
      rootCauseHypothesis: 'Container memory limit (1024Mi) matches runtime heap allocation without headroom for native off-heap buffers during burst payload serialization.',
      diagnosticSteps: [
        'kubectl top pods -n prod-payments --containers --sort-by=memory',
        'kubectl get events -n prod-payments --field-selector reason=OOMKilling --sort-by=.lastTimestamp',
        'promql: container_memory_working_set_bytes{namespace="prod-payments"} / container_spec_memory_limit_bytes{namespace="prod-payments"} > 0.85'
      ],
      remediationPlan: {
        proposedAction: 'Patch Deployment memory requests/limits to 1024Mi/1536Mi while pinning NODE_OPTIONS="--max-old-space-size=1024" via GitOps PR.',
        approvalGate: 'Requires Platform Engineer approval in ArgoCD / GitHub Actions change gate.',
        rollbackProcedure: 'kubectl rollout undo deployment/payment-worker -n prod-payments (Instant replica set revision revert).'
      },
      humanEscalationTrigger: 'Escalate to Senior Kubernetes SRE if kubelet reports MemoryPressure=True on more than 2 nodes in the availability zone.'
    };
  }

  return {
    sourceMode: 'knowledge-base-simulation',
    classification: {
      category: 'Linux Infrastructure & Ingress Telemetry Triage',
      priority: 'P2 — Service Performance Degradation',
      slaRisk: 'Moderate (99.95% SLO burn rate currently at 2.4x baseline)',
      routedQueue: 'L2/L3 Infrastructure Operations Queue'
    },
    summary: `AI-assisted diagnostic synthesis for: "${question.slice(0, 110)}" within ${environmentContext || 'Production Hybrid Linux/Cloud Environment'}.`,
    knowledgeBaseMatch: {
      runbookId: 'RB-INF-104',
      title: 'Standard Production Latency, TLS Handshake & Upstream Saturation Triage',
      similarityScore: '0.89 Cosine Match',
      lastVerified: 'Verified by Infrastructure Engineering · Oct 2026'
    },
    rootCauseHypothesis: 'Upstream worker keepalive exhaustion or ephemeral port depletion between reverse proxy ingress and backend application pool.',
    diagnosticSteps: [
      'ss -s && ss -tan state time-wait | wc -l (Inspect socket states and ephemeral port utilization)',
      'journalctl -u nginx -u haproxy --since "15 minutes ago" --no-pager | grep -E "upstream|timeout|reset"',
      'sar -n DEV -n EDEV 1 5 (Verify network interface packet drops or saturation)'
    ],
    remediationPlan: {
      proposedAction: 'Enable upstream keepalive connection pooling (keepalive 64) and drain degraded backend worker node from load balancer pool for isolated inspection.',
      approvalGate: 'Requires Operations Engineer approval in maintenance console before draining active production node.',
      rollbackProcedure: 'Re-enable backend node weight in HAProxy/ALB target group and reload previous validated ingress config.'
    },
    humanEscalationTrigger: 'Escalate to Lead Systems Architect if 5xx error ratio exceeds 1.5% for more than 3 consecutive minutes.'
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/enquiries', (_req, res) => {
    res.json({ enquiries: enquiriesStore });
  });

  app.post('/api/enquiries', (req, res) => {
    const {
      businessName,
      businessEmail,
      industry,
      existingInfrastructure,
      cloudPlatform,
      aiUseCase,
      operationalChallenge,
      timeline
    } = req.body || {};

    if (!businessName || !businessEmail || !existingInfrastructure || !cloudPlatform || !aiUseCase || !operationalChallenge) {
      res.status(400).json({
        error: 'Please complete all required infrastructure and business fields before submitting.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(businessEmail))) {
      res.status(400).json({
        error: 'Please provide a valid business email address.'
      });
      return;
    }

    const routing = determineTeamRouting(String(aiUseCase), String(operationalChallenge));
    const newRecord: EnquiryRecord = {
      id: `SA-AI-2026-${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: new Date().toISOString(),
      businessName: String(businessName).trim(),
      businessEmail: String(businessEmail).trim(),
      industry: String(industry || 'Enterprise IT').trim(),
      existingInfrastructure: String(existingInfrastructure).trim(),
      cloudPlatform: String(cloudPlatform).trim(),
      aiUseCase: String(aiUseCase).trim(),
      operationalChallenge: String(operationalChallenge).trim(),
      timeline: String(timeline || '1–3 Months').trim(),
      ...routing
    };

    enquiriesStore.unshift(newRecord);
    res.status(201).json({ enquiry: newRecord });
  });

  app.post('/api/support-assistant', async (req, res) => {
    const { question, environmentContext } = req.body || {};
    if (!question || typeof question !== 'string' || question.trim().length < 5) {
      res.status(400).json({ error: 'Please enter a specific server or infrastructure support question.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      res.json(buildFallbackSupportResponse(question, environmentContext));
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Server Support Question: "${question.trim()}"\nReported Environment Context: "${environmentContext || 'Linux / Kubernetes / Hybrid Cloud Production'}"`,
        config: {
          systemInstruction: `You are the ServerAdminz Knowledge-Grounded AI Support Assistant operating in a public simulation sandbox.
Your role is to demonstrate how ServerAdminz combines infrastructure engineering, AIOps, and human-in-the-loop governance.
Rules:
1. Never claim to execute live commands on customer infrastructure.
2. Provide safe, read-only diagnostic commands (Linux, PostgreSQL, Kubernetes, Prometheus, AWS/Azure/GCP CLI).
3. Include an explicit human engineer approval gate and rollback procedure for any remediation.
4. Mask or refuse any raw credentials/secrets if present.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              classification: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  priority: { type: Type.STRING },
                  slaRisk: { type: Type.STRING },
                  routedQueue: { type: Type.STRING }
                },
                required: ['category', 'priority', 'slaRisk', 'routedQueue']
              },
              summary: { type: Type.STRING },
              knowledgeBaseMatch: {
                type: Type.OBJECT,
                properties: {
                  runbookId: { type: Type.STRING },
                  title: { type: Type.STRING },
                  similarityScore: { type: Type.STRING },
                  lastVerified: { type: Type.STRING }
                },
                required: ['runbookId', 'title', 'similarityScore', 'lastVerified']
              },
              rootCauseHypothesis: { type: Type.STRING },
              diagnosticSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              remediationPlan: {
                type: Type.OBJECT,
                properties: {
                  proposedAction: { type: Type.STRING },
                  approvalGate: { type: Type.STRING },
                  rollbackProcedure: { type: Type.STRING }
                },
                required: ['proposedAction', 'approvalGate', 'rollbackProcedure']
              },
              humanEscalationTrigger: { type: Type.STRING }
            },
            required: [
              'classification',
              'summary',
              'knowledgeBaseMatch',
              'rootCauseHypothesis',
              'diagnosticSteps',
              'remediationPlan',
              'humanEscalationTrigger'
            ]
          }
        }
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.json(buildFallbackSupportResponse(question, environmentContext));
        return;
      }

      const parsed = JSON.parse(rawText);
      res.json({
        sourceMode: 'gemini-live-rag',
        ...parsed
      });
    } catch (error: unknown) {
      const fallback = buildFallbackSupportResponse(question, environmentContext);
      res.json({
        ...fallback,
        apiNotice: error instanceof Error ? error.message : 'Used verified ServerAdminz runbook simulation.'
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ServerAdminz AI Vertical running on http://localhost:${PORT}`);
  });
}

startServer();
