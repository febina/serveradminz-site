export interface ServiceVertical {
  id: 'aiops' | 'servicedesk' | 'finops' | 'security' | 'agents' | 'custom-ai';
  index: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaPresetUseCase: string;
  businessProblem: string;
  proactiveShift: string;
  capabilities: {
    name: string;
    description: string;
  }[];
  useCases: {
    scenario: string;
    implementation: string;
    outcome: string;
  }[];
  governanceNote: string;
}

export const SERVICE_VERTICALS: ServiceVertical[] = [
  {
    id: 'aiops',
    index: '01',
    shortTitle: 'AIOps & Infrastructure',
    title: 'AI Infrastructure Management & AIOps',
    subtitle: 'Transition from noisy, reactive alert firefighting to predictive telemetry correlation and engineer-approved remediation.',
    ctaLabel: 'Explore AI Infrastructure Management',
    ctaPresetUseCase: 'AI Infrastructure Management & AIOps',
    businessProblem: 'Traditional threshold-based server monitoring floods operations teams with hundreds of disconnected alerts during cascading failures, delaying root-cause identification while SLA clocks burn.',
    proactiveShift: 'By continuously modeling seasonal baseline metrics across Linux nodes, Kubernetes clusters, and database engines, ServerAdminz detects subtle saturation anomalies 30–90 minutes before service degradation occurs.',
    capabilities: [
      {
        name: 'AI-Powered Server Monitoring',
        description: 'Dynamic seasonal baselining across CPU steal, disk I/O latency, memory page faults, and network retransmits.'
      },
      {
        name: 'Predictive Infrastructure Analytics',
        description: 'Time-series forecasting for storage exhaustion, connection pool saturation, and memory leak trajectories.'
      },
      {
        name: 'Anomaly Detection',
        description: 'Unsupervised deviation detection that identifies abnormal latency and throughput ratios outside static thresholds.'
      },
      {
        name: 'Intelligent Event Correlation',
        description: 'Groups hundreds of downstream symptom alerts from Prometheus, Datadog, and CloudWatch into a single incident.'
      },
      {
        name: 'Root-Cause Analysis Assistance',
        description: 'Correlates recent GitOps deployments, config changes, and kernel events to rank probable root causes.'
      },
      {
        name: 'Automated Incident Prioritisation',
        description: 'Scores incidents by blast radius, revenue-critical service dependency, and real-time SLO error-budget burn rate.'
      },
      {
        name: 'Infrastructure Performance Optimisation',
        description: 'Identifies kernel sysctl bottlenecks, database query lock contention, and container CPU throttling.'
      },
      {
        name: 'Predictive Capacity Planning',
        description: 'Models infrastructure scaling requirements ahead of seasonal traffic peaks or enterprise tenant onboarding.'
      }
    ],
    useCases: [
      {
        scenario: 'Cascading Microservice Latency After Deployment',
        implementation: 'Correlates 140+ HTTP 502/504 ingress alerts with a single PostgreSQL lock wait spike introduced by an unindexed migration.',
        outcome: 'Reduces Mean Time to Detect (MTTD) from 28 minutes to under 90 seconds across hybrid Linux fleets.'
      },
      {
        scenario: 'Silent Storage IOPS Degradation on Production NVMe Volumes',
        implementation: 'Detects gradual read/write queue depth drift 4 hours before filesystem latency triggers application timeouts.',
        outcome: 'Enables scheduled workload evacuation and zero-downtime volume rebalancing during maintenance windows.'
      }
    ],
    governanceNote: 'All remediation playbooks require explicit L2/L3 SRE cryptographic sign-off before mutating production state.'
  },
  {
    id: 'servicedesk',
    index: '02',
    shortTitle: 'AI Service Desk',
    title: 'AI-Powered Service Desk',
    subtitle: 'Accelerate technical support triage, runbook retrieval, and incident documentation while keeping senior engineers in command.',
    ctaLabel: 'Automate Your IT Support',
    ctaPresetUseCase: 'AI-Powered Service Desk & ITSM',
    businessProblem: 'Support engineers spend up to 45% of incident handling time manually categorizing tickets, searching fragmented wiki pages, and writing post-incident handoff summaries.',
    proactiveShift: 'Every incoming support ticket is automatically classified, enriched with historical telemetry context, matched against verified ServerAdminz runbooks, and routed to the exact specialist queue.',
    capabilities: [
      {
        name: 'AI Ticket Classification',
        description: 'Automatically tags incoming requests by infrastructure layer (OS, DB, K8s, Network, IAM), severity, and environment.'
      },
      {
        name: 'Intelligent Ticket Routing',
        description: 'Assigns tickets directly to the right engineering squad based on component ownership, shift roster, and skill match.'
      },
      {
        name: 'Automated Ticket Summarisation',
        description: 'Condenses long multi-shift email threads and diagnostic log outputs into structured executive and engineer handoffs.'
      },
      {
        name: 'Knowledge-Base-Powered Support Assistant',
        description: 'Retrieval-Augmented Generation (RAG) grounded strictly in verified ServerAdminz SOPs and customer architecture docs.'
      },
      {
        name: 'AI Troubleshooting Recommendations',
        description: 'Surfaces read-only verification commands and historical fixes from similar resolved incidents.'
      },
      {
        name: 'SLA-Risk Prediction',
        description: 'Flags tickets at risk of breaching response or resolution SLAs based on ticket complexity and queue velocity.'
      },
      {
        name: 'Automated Documentation',
        description: 'Drafts structured Post-Incident Reviews (PIR) and updates runbook entries immediately after resolution.'
      },
      {
        name: 'Human Escalation',
        description: 'Seamless one-click escalation to Senior L3 Systems Engineers with full diagnostic context preserved.'
      }
    ],
    useCases: [
      {
        scenario: 'Multi-Shift P1 Incident Handoff',
        implementation: 'Synthesizes 60+ Slack/ticket updates and terminal outputs into a 5-bullet chronological timeline for oncoming SREs.',
        outcome: 'Cuts shift handoff ramp-up time by 65% and eliminates repeated diagnostic commands.'
      },
      {
        scenario: 'Recurring SSL/TLS & DNS Configuration Requests',
        implementation: 'Classifies request, validates domain ownership records automatically, and prepares pre-filled change plan for engineer review.',
        outcome: 'Improves First-Contact Resolution (FCR) rate while maintaining full change-control compliance.'
      }
    ],
    governanceNote: 'Customer ticket payloads are processed through PII/credential redaction filters prior to embedding or model inference.'
  },
  {
    id: 'finops',
    index: '03',
    shortTitle: 'Cloud & FinOps',
    title: 'AI Cloud Management & FinOps',
    subtitle: 'Data-driven multi-cloud resource optimization, anomaly detection, and capacity forecasting backed by verified baselines.',
    ctaLabel: 'Book an AIOps Consultation',
    ctaPresetUseCase: 'AI Cloud Management & FinOps',
    businessProblem: 'Organizations over-provision cloud compute and block storage to avoid performance incidents, resulting in orphaned volumes, idle staging clusters, and unexpected billing spikes.',
    proactiveShift: 'Continuous telemetry analysis aligns instance families, Kubernetes node pools, and commitment plans with actual 99th-percentile workload demand across AWS, Azure, and Google Cloud.',
    capabilities: [
      {
        name: 'Cloud Resource Utilisation Analysis',
        description: 'Granular profiling of vCPU, memory, network egress, and GPU utilization across production and non-production accounts.'
      },
      {
        name: 'Cost Anomaly Detection',
        description: 'Real-time detection of abnormal hourly spend spikes caused by runaway autoscaling, NAT gateway loops, or unindexed queries.'
      },
      {
        name: 'Idle Resource Identification',
        description: 'Locates unattached EBS/Managed Disks, obsolete snapshots, idle load balancers, and underutilized RDS/Cloud SQL instances.'
      },
      {
        name: 'Capacity Forecasting',
        description: 'Projects 3-, 6-, and 12-month compute and storage requirements using historical growth and business seasonal curves.'
      },
      {
        name: 'Intelligent Scaling Recommendations',
        description: 'Tunes Horizontal Pod Autoscalers (HPA), Karpenter node provisioners, and scheduled non-prod scale-down policies.'
      },
      {
        name: 'Cloud Performance Optimisation',
        description: 'Matches workload I/O and CPU architecture profiles (e.g., Graviton/ARM64 migration candidates) for superior price-performance.'
      },
      {
        name: 'Multi-Cloud Visibility',
        description: 'Unified cost and utilization normalization across AWS, Microsoft Azure, Google Cloud, and hybrid Kubernetes clusters.'
      }
    ],
    useCases: [
      {
        scenario: 'Runaway Data Transfer & NAT Gateway Spend Spike',
        implementation: 'Detects cross-AZ container image pulls within 2 hours of deployment and recommends VPC endpoint routing.',
        outcome: 'Prevents end-of-month billing surprises and restores predictable unit economics.'
      },
      {
        scenario: 'Over-Provisioned Kubernetes Worker Nodes',
        implementation: 'Analyzes 30-day pod request-vs-actual utilization and right-sizes container requests alongside Savings Plan commitments.',
        outcome: 'Delivers verified infrastructure efficiency only after establishing a 14-day telemetry baseline.'
      }
    ],
    governanceNote: 'Baseline Commitment Policy: ServerAdminz never promises cost savings without a verified telemetry baseline and clearly stated architectural assumptions.'
  },
  {
    id: 'security',
    index: '04',
    shortTitle: 'AI Security Ops',
    title: 'AI Security & Threat Intelligence',
    subtitle: 'AI-assisted log analysis, vulnerability prioritization, and security workflow automation for infrastructure teams.',
    ctaLabel: 'Request an AI Implementation Proposal',
    ctaPresetUseCase: 'AI Security & Threat Intelligence',
    businessProblem: 'Infrastructure teams face thousands of daily SSH auth logs, WAF blocks, container CVE scan results, and cloud audit trail events without context on which vulnerabilities are actively exploitable.',
    proactiveShift: 'AI-assisted log correlation and reachability analysis filter false positives, summarize suspicious access patterns, and prioritize patching based on actual production exposure.',
    capabilities: [
      {
        name: 'AI-Assisted Security Event Analysis',
        description: 'Correlates CloudTrail, Azure Activity Logs, and Linux auditd events to surface unusual privilege escalation or lateral movement.'
      },
      {
        name: 'Suspicious Activity Detection',
        description: 'Identifies anomalous SSH login geographies, unusual service-account API calls, and unexpected outbound egress connections.'
      },
      {
        name: 'Log Analysis',
        description: 'Parses high-volume nginx, WAF, syslog, and Kubernetes audit streams to isolate abnormal request signatures.'
      },
      {
        name: 'Vulnerability Prioritisation',
        description: 'Ranks CVEs by combining EPSS exploitability scores with live runtime context (internet-facing ingress vs. isolated internal batch).'
      },
      {
        name: 'Security Incident Summarisation',
        description: 'Generates structured incident briefs detailing affected hosts, IOC timelines, blast radius, and containment options.'
      },
      {
        name: 'Threat Intelligence Integration',
        description: 'Enriches firewall and ingress telemetry with curated threat feeds, known malicious IP blocks, and CVE advisories.'
      },
      {
        name: 'Security Workflow Automation',
        description: 'Prepares pre-validated quarantine rules, IAM key rotation playbooks, and patching schedules for engineer approval.'
      }
    ],
    useCases: [
      {
        scenario: 'Container Registry CVE Backlog Triage',
        implementation: 'Filters 800+ reported image vulnerabilities down to the 12 packages actually loaded in memory on internet-reachable pods.',
        outcome: 'Focuses engineering patching sprints on genuine risk exposure rather than theoretical alerts.'
      },
      {
        scenario: 'Anomalous IAM Role Assumption at Off-Peak Hours',
        implementation: 'Correlates unusual S3 bucket enumeration calls with recent CI/CD token usage and prepares an immediate token revocation playbook.',
        outcome: 'Compresses security investigation and containment preparation from hours to minutes.'
      }
    ],
    governanceNote: 'Service Scope Transparency: ServerAdminz provides AI-Assisted Infrastructure Security Operations and hardening—distinct from a licensed 24/7 Managed SOC or MDR legal incident-response retainer.'
  },
  {
    id: 'agents',
    index: '05',
    shortTitle: 'AI Agents & Automation',
    title: 'AI Agents & IT Automation',
    subtitle: 'Purpose-built operational agents that execute approved infrastructure workflows with RBAC, audit logs, and instant rollback.',
    ctaLabel: 'Discuss a Custom AI Solution',
    ctaPresetUseCase: 'AI Agents & IT Automation',
    businessProblem: 'Standard conversational chatbots can only answer questions—leaving engineers to manually copy-paste commands, verify prerequisites, and update change tickets across multiple consoles.',
    proactiveShift: 'ServerAdminz engineers controlled operational agents connected to read-only observability tools and gated execution pipelines, turning multi-step routine administration into single-approval workflows.',
    capabilities: [
      {
        name: 'Infrastructure Support Agents',
        description: 'Executes read-only health checks across Linux, DNS, SSL, and storage subsystems before presenting findings to engineers.'
      },
      {
        name: 'Technical Documentation Assistants',
        description: 'Inspects Terraform state, Ansible playbooks, and Kubernetes manifests to keep architecture diagrams and runbooks synchronized.'
      },
      {
        name: 'IT Service Desk Agents',
        description: 'Collects missing diagnostic details from users, verifies service status, and prepares structured change requests.'
      },
      {
        name: 'Cloud Operations Assistants',
        description: 'Audits resource tagging compliance, validates backup snapshot integrity, and drafts Terraform drift remediation PRs.'
      },
      {
        name: 'Incident Response Workflow Agents',
        description: 'Assembles incident channels, attaches correlated Grafana snapshots, and stages pre-approved mitigation runbooks.'
      },
      {
        name: 'Automated Routine Administration',
        description: 'Handles log rotation verification, certificate renewal staging, and non-production environment scheduling under policy guardrails.'
      },
      {
        name: 'Knowledge Management Agents',
        description: 'Continuously indexes resolved tickets and post-mortems into vector knowledge stores with strict access-control tags.'
      }
    ],
    useCases: [
      {
        scenario: 'Zero-Downtime Certificate & Ingress Config Renewal',
        implementation: 'Agent validates new certificate chain in staging, checks load balancer health, requests SRE approval, and verifies TLS 1.3 handshake post-reload.',
        outcome: 'Eliminates manual syntax errors and guarantees an automatic rollback if post-check probes fail.'
      },
      {
        scenario: 'Automated Drift Detection & GitOps Pull Request Generation',
        implementation: 'Detects manual console security-group edits, compares against Terraform main branch, and opens a reconciled PR for review.',
        outcome: 'Maintains 100% Infrastructure-as-Code compliance without manual audit spreadsheets.'
      }
    ],
    governanceNote: 'Every infrastructure-changing action enforces scoped RBAC permissions, immutable audit logging, human approval gates, and verified rollback procedures.'
  },
  {
    id: 'custom-ai',
    index: '06',
    shortTitle: 'Custom AI & RAG',
    title: 'Custom AI Development & Integration',
    subtitle: 'Private enterprise AI assistants, RAG pipelines, and production LLM infrastructure deployed across AWS, Azure, GCP, and open-source stacks.',
    ctaLabel: 'Discuss a Custom AI Solution',
    ctaPresetUseCase: 'Custom AI Development & RAG Integration',
    businessProblem: 'Enterprises want to adopt generative AI and internal knowledge assistants without exposing proprietary data to public consumer tools or struggling with fragile prototype deployments.',
    proactiveShift: 'ServerAdminz architects, deploys, and operates production-grade RAG pipelines, private model endpoints, and containerized AI workloads inside your own cloud VPC or on-premises hardware.',
    capabilities: [
      {
        name: 'Generative AI Applications',
        description: 'Production web and internal enterprise applications built with structured outputs, streaming interfaces, and latency caching.'
      },
      {
        name: 'Private Enterprise AI Assistants',
        description: 'VPC-isolated assistants deployed via AWS Bedrock, Azure OpenAI, Google Vertex AI, or self-hosted open-weight models.'
      },
      {
        name: 'Retrieval-Augmented Generation (RAG)',
        description: 'End-to-end document ingestion, semantic chunking, hybrid lexical/vector search, reranking, and citation verification.'
      },
      {
        name: 'LLM Integration',
        description: 'Multi-model routing and fallback architectures integrating OpenAI, Anthropic Claude, Google Gemini, and Llama models.'
      },
      {
        name: 'AI API Integration',
        description: 'Secure API gateways connecting enterprise ERPs, ITSM platforms (Jira, ServiceNow), and internal databases to AI services.'
      },
      {
        name: 'AI Workflow Automation',
        description: 'Event-driven orchestration pipelines using Python, LangChain, LlamaIndex, and containerized worker queues.'
      },
      {
        name: 'Enterprise Knowledge Systems',
        description: 'Document-level ACL enforcement ensuring users only retrieve answers from documents their IAM role permits.'
      },
      {
        name: 'AI Application Deployment',
        description: 'CI/CD pipelines, Docker containerization, and Helm/Kubernetes deployment with automated evaluation gates.'
      },
      {
        name: 'AI Cloud Infrastructure',
        description: 'Terraform-provisioned GPU node pools, vector databases, private VPC endpoints, and KMS encryption.'
      },
      {
        name: 'AI Model Deployment & Monitoring',
        description: 'Continuous observability for token throughput, latency percentiles, prompt injection attempts, and answer hallucination drift.'
      }
    ],
    useCases: [
      {
        scenario: 'Private Engineering & Compliance Knowledge Assistant',
        implementation: 'Indexes 45,000+ internal SOPs, architecture PDFs, and compliance policies into a private vector database with role-based access filtering.',
        outcome: 'Delivers cited, auditable answers in under 2.2 seconds with zero data leaving the customer cloud tenant.'
      },
      {
        scenario: 'High-Availability Multi-Model Inference Gateway',
        implementation: 'Deploys an enterprise API proxy on Kubernetes with automatic failover between primary and secondary cloud LLM endpoints.',
        outcome: 'Ensures 99.95% application availability and centralized token budget governance per business unit.'
      }
    ],
    governanceNote: 'Full support for AWS, Microsoft Azure, Google Cloud, and self-hosted open-source AI ecosystems with zero vendor lock-in.'
  }
];

export interface EcosystemTech {
  name: string;
  category: 'Foundation Models & APIs' | 'AI Orchestration & Data' | 'Cloud AI & Runtime' | 'Observability & IaC';
  productionRole: string;
  serverAdminzCapability: string;
  deploymentPattern: string;
}

export const ECOSYSTEM_TECHNOLOGIES: EcosystemTech[] = [
  {
    name: 'OpenAI APIs',
    category: 'Foundation Models & APIs',
    productionRole: 'Structured reasoning, function calling, and embeddings for enterprise workflows.',
    serverAdminzCapability: 'Enterprise API gateway integration, rate-limit backoff, token cost attribution, and zero-data-retention configuration.',
    deploymentPattern: 'REST / Private Azure OpenAI or Enterprise API Endpoint'
  },
  {
    name: 'Anthropic Claude',
    category: 'Foundation Models & APIs',
    productionRole: 'Long-context technical document synthesis, code auditing, and complex runbook analysis.',
    serverAdminzCapability: 'Prompt caching optimization, AWS Bedrock / Vertex AI private deployment, and tool-use guardrail enforcement.',
    deploymentPattern: 'Direct Enterprise API / AWS Bedrock / GCP Vertex AI'
  },
  {
    name: 'Google Gemini',
    category: 'Foundation Models & APIs',
    productionRole: 'High-speed multimodal reasoning, long-context log correlation, and low-latency support triage.',
    serverAdminzCapability: 'Structured JSON schema enforcement, Google Cloud Vertex AI VPC Service Controls, and real-time support assistant grounding.',
    deploymentPattern: '@google/genai SDK / Vertex AI Private Endpoint'
  },
  {
    name: 'LangChain',
    category: 'AI Orchestration & Data',
    productionRole: 'Composable multi-step chains, tool-calling agents, and stateful workflow orchestration.',
    serverAdminzCapability: 'Production hardening of agent graphs, deterministic timeout controls, and observability trace instrumentation.',
    deploymentPattern: 'Python Microservices on Docker / Kubernetes'
  },
  {
    name: 'LlamaIndex',
    category: 'AI Orchestration & Data',
    productionRole: 'Enterprise data connectors, hierarchical document indexing, and hybrid RAG retrieval pipelines.',
    serverAdminzCapability: 'Custom ingestion pipelines for Confluence, Git, PDFs, and ticket archives with ACL metadata filtering.',
    deploymentPattern: 'Containerized Ingestion Workers & Query Engines'
  },
  {
    name: 'Vector Databases',
    category: 'AI Orchestration & Data',
    productionRole: 'High-dimensional semantic similarity search and metadata-filtered retrieval (pgvector, Qdrant, Milvus, Pinecone).',
    serverAdminzCapability: 'Index tuning (HNSW/IVFFlat), high-availability replication, backup automation, and hybrid keyword-vector scoring.',
    deploymentPattern: 'Managed Cloud or Self-Hosted Kubernetes StatefulSets'
  },
  {
    name: 'Python',
    category: 'AI Orchestration & Data',
    productionRole: 'Core runtime for AI microservices, FastAPI inference gateways, anomaly detection, and data pipelines.',
    serverAdminzCapability: 'Async FastAPI service architecture, dependency locking, memory profiling, and production WSGI/ASGI tuning.',
    deploymentPattern: 'Python 3.11+ / FastAPI / Async Worker Queues'
  },
  {
    name: 'Docker',
    category: 'Cloud AI & Runtime',
    productionRole: 'Immutable packaging for AI inference services, RAG workers, and automation runners.',
    serverAdminzCapability: 'Multi-stage minimal image builds, non-root container hardening, and automated vulnerability scanning.',
    deploymentPattern: 'Distroless / Alpine / CUDA Runtime Containers'
  },
  {
    name: 'Kubernetes',
    category: 'Cloud AI & Runtime',
    productionRole: 'Container orchestration, GPU node pool scheduling, autoscaling, and zero-downtime rollouts.',
    serverAdminzCapability: 'EKS, AKS, GKE, and bare-metal cluster management, Karpenter/HPA scaling, and network policy isolation.',
    deploymentPattern: 'Managed K8s & On-Premises Production Clusters'
  },
  {
    name: 'AWS AI Services',
    category: 'Cloud AI & Runtime',
    productionRole: 'Amazon Bedrock, SageMaker endpoints, AWS PrivateLink, and IAM-scoped model access.',
    serverAdminzCapability: 'VPC-isolated Bedrock integration, KMS encryption, CloudWatch token telemetry, and IAM least-privilege roles.',
    deploymentPattern: 'AWS VPC Private Endpoints & Terraform Modules'
  },
  {
    name: 'Azure AI Services',
    category: 'Cloud AI & Runtime',
    productionRole: 'Azure OpenAI Service, Azure AI Search, and Entra ID enterprise authentication.',
    serverAdminzCapability: 'Private VNet deployment, Provisioned Throughput Unit (PTU) capacity sizing, and content filter configuration.',
    deploymentPattern: 'Azure Private Link & Managed Identity'
  },
  {
    name: 'Google Cloud AI Services',
    category: 'Cloud AI & Runtime',
    productionRole: 'Vertex AI platform, Gemini models, GKE AI infrastructure, and BigQuery telemetry analytics.',
    serverAdminzCapability: 'VPC Service Controls perimeter setup, workload identity federation, and Vertex AI endpoint monitoring.',
    deploymentPattern: 'Google Cloud VPC & GKE Autopilot/Standard'
  },
  {
    name: 'Prometheus',
    category: 'Observability & IaC',
    productionRole: 'High-resolution time-series metrics collection across servers, Kubernetes, and AI model gateways.',
    serverAdminzCapability: 'Custom exporter engineering, PromQL anomaly rule design, Thanos/Mimir long-term federated storage.',
    deploymentPattern: 'Kube-Prometheus-Stack & Federated Collectors'
  },
  {
    name: 'Grafana',
    category: 'Observability & IaC',
    productionRole: 'Unified operational dashboards for infrastructure health, SLO burn rates, and LLM latency/cost metrics.',
    serverAdminzCapability: 'Executive and SRE dashboard engineering, alert routing correlation, and Loki/Tempo trace linking.',
    deploymentPattern: 'Grafana Enterprise / OSS Observability Stack'
  },
  {
    name: 'Datadog',
    category: 'Observability & IaC',
    productionRole: 'Full-stack APM, infrastructure monitoring, log management, and LLM observability.',
    serverAdminzCapability: 'Agent fleet deployment, custom metric cardinality optimization (reducing Datadog bill bloat), and composite monitors.',
    deploymentPattern: 'Unified APM + Infrastructure + LLM Monitoring'
  },
  {
    name: 'Elastic',
    category: 'Observability & IaC',
    productionRole: 'Centralized log aggregation, SIEM security event analytics, and hybrid vector/BM25 search.',
    serverAdminzCapability: 'Elasticsearch cluster sizing, index lifecycle management (ILM), Logstash/FluentBit pipelines, and security rules.',
    deploymentPattern: 'Elastic Cloud / Self-Managed Hot-Warm-Cold Clusters'
  },
  {
    name: 'Terraform',
    category: 'Observability & IaC',
    productionRole: 'Declarative Infrastructure-as-Code for repeatable cloud, Kubernetes, and AI platform provisioning.',
    serverAdminzCapability: 'Modular Terraform state management, drift detection pipelines, policy-as-code checks, and GitOps automation.',
    deploymentPattern: 'GitOps CI/CD Pipelines with Remote State Locking'
  }
];

export interface GovernancePillar {
  title: string;
  controlMechanism: string;
  verificationStandard: string;
}

export const RESPONSIBLE_AI_PILLARS: GovernancePillar[] = [
  {
    title: 'Data Privacy & PII Redaction',
    controlMechanism: 'Automated pre-inference sanitization strips IPv4/IPv6 addresses, customer emails, SSH keys, JWTs, and database connection strings before any prompt leaves the boundary.',
    verificationStandard: 'Deterministic regex + NER scrubbing layer enforced at the API gateway.'
  },
  {
    title: 'Customer Data Isolation',
    controlMechanism: 'Strict single-tenant vector namespaces, dedicated VPC endpoints, and isolated encryption keys (CMEK) prevent cross-customer knowledge bleed.',
    verificationStandard: 'Zero shared vector indices or multi-tenant prompt caches across client accounts.'
  },
  {
    title: 'Granular Access Control (RBAC)',
    controlMechanism: 'RAG retrieval queries inherit the authenticated engineer or user IAM role, filtering out restricted architecture docs or executive records at query time.',
    verificationStandard: 'Document-level ACL verification prior to context injection.'
  },
  {
    title: 'Secure API Integration',
    controlMechanism: 'All model traffic traverses private cloud backbones (AWS PrivateLink, Azure Private Link, GCP Private Service Connect) with mutual TLS.',
    verificationStandard: 'TLS 1.3 encryption in transit; short-lived workload identity tokens instead of static API keys.'
  },
  {
    title: 'Human-in-the-Loop Operations',
    controlMechanism: 'AI agents can diagnose, correlate, and stage remediation scripts, but state-mutating production commands require explicit engineer approval.',
    verificationStandard: 'Mandatory cryptographic approval gate for all write/execute actions.'
  },
  {
    title: 'End-to-End Auditability',
    controlMechanism: 'Every AI prompt, retrieved knowledge chunk, model response, and human approval decision is logged to an immutable append-only audit trail.',
    verificationStandard: 'Tamper-evident JSON audit logs exported to customer SIEM.'
  },
  {
    title: 'AI Model Governance',
    controlMechanism: 'Models are pinned to validated versions, evaluated against golden infrastructure Q&A benchmarks, and monitored for output drift.',
    verificationStandard: 'Automated regression test suite prior to any model version upgrade.'
  },
  {
    title: 'Zero-Training Data Retention Policies',
    controlMechanism: 'We exclusively use enterprise model agreements where customer prompts and outputs are never retained to train foundation models.',
    verificationStandard: 'Contractual zero-data-retention (ZDR) endpoints verified per cloud provider.'
  },
  {
    title: 'Adversarial & Security Testing',
    controlMechanism: 'Continuous testing against prompt injection, indirect log-poisoning attacks, and unauthorized tool invocation.',
    verificationStandard: 'Input/output guardrail filters and strict JSON schema validation.'
  },
  {
    title: 'Operational Approvals & Rollback',
    controlMechanism: 'Every automated workflow includes pre-flight health checks, blast-radius limits, and a tested one-click rollback procedure.',
    verificationStandard: 'Automated post-change verification probes with instant revert on SLO deviation.'
  }
];

export interface CommercialModel {
  id: string;
  index: string;
  name: string;
  targetFit: string;
  structure: string;
  includedCapabilities: string[];
  validationRequirements: string[];
  ctaText: string;
}

export const COMMERCIAL_MODELS: CommercialModel[] = [
  {
    id: 'ai-managed-services',
    index: 'Model 01',
    name: 'AI-Enhanced Managed Services',
    targetFit: 'For organizations upgrading existing 24/7 server, cloud, and Kubernetes management with proactive AIOps and FinOps.',
    structure: 'Monthly recurring managed service retainer scaled by monitored node/cluster footprint.',
    includedCapabilities: [
      '24/7 AI-powered anomaly detection & multi-source alert correlation',
      'Root-cause analysis assistance & engineer-approved remediation execution',
      'AI-assisted ticket triage, runbook matching & post-incident documentation',
      'Continuous cloud utilization baselining, idle resource detection & FinOps reporting'
    ],
    validationRequirements: [
      '14-day read-only telemetry baseline to validate alert volume and metric cardinality',
      'Observability stack audit (Prometheus, Datadog, CloudWatch, or Elastic compatibility)',
      'Joint escalation matrix and human-in-the-loop approval threshold sign-off'
    ],
    ctaText: 'Explore AI Infrastructure Management'
  },
  {
    id: 'ai-automation-projects',
    index: 'Model 02',
    name: 'AI Automation Projects',
    targetFit: 'For engineering and IT teams needing a fixed-scope implementation of custom RAG systems, service desk automation, or operational agents.',
    structure: 'Milestone-based fixed-scope engineering engagement (typically 4 to 12 weeks) with full codebase & IaC handover.',
    includedCapabilities: [
      'Private enterprise RAG assistant grounded in internal SOPs, wikis & ticket history',
      'Custom IT service desk classification, routing & SLA-risk prediction integration',
      'Gated operational workflow agents with RBAC, audit logging & rollback pipelines',
      'Full Terraform / Docker / Kubernetes deployment inside your AWS, Azure, or GCP tenant'
    ],
    validationRequirements: [
      'Technical discovery workshop to scope data sources, APIs, and security boundaries',
      'Cloud licensing & token consumption unit-cost modeling before build sign-off',
      'User Acceptance Testing (UAT) against golden operational test cases'
    ],
    ctaText: 'Request an AI Implementation Proposal'
  },
  {
    id: 'managed-ai-operations',
    index: 'Model 03',
    name: 'Managed AI Operations (AIOps & MLOps)',
    targetFit: 'For businesses running custom AI applications, private LLMs, and vector databases that require ongoing reliability, security, and cost governance.',
    structure: 'Ongoing operational SLA covering AI application uptime, vector pipeline health, model governance, and token FinOps.',
    includedCapabilities: [
      '24/7 monitoring of LLM gateways, GPU node pools, and vector database clusters',
      'Continuous RAG retrieval quality auditing, re-indexing & embedding drift management',
      'Token spend governance, semantic caching optimization & multi-model failover routing',
      'Ongoing prompt-injection hardening, access-control audits & compliance reporting'
    ],
    validationRequirements: [
      'Architecture readiness review of existing AI workloads and container runtime',
      'Staffing & L3 AI/SRE on-call coverage validation aligned to required SLA tier',
      'Data retention, PII scrubbing, and model provider SLA verification'
    ],
    ctaText: 'Discuss a Custom AI Solution'
  }
];
