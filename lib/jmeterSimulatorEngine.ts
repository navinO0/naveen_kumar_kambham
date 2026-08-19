export type NodeTier = "Small" | "Medium" | "Large";
export type NodeState = "ACTIVE" | "SPINNING_UP" | "STATIC_IDLE";
export type ScalingStrategy = "horizontal" | "vertical" | "threshold" | "predictive" | "reactive";
export type TrafficScenarioId = "normal" | "gradual" | "spike" | "flash_sale" | "drop" | "custom";

export interface NodeModel {
  id: string;
  name: string;
  status: NodeState;
  cpu: number; // 0-100%
  memory: number; // 0-100%
  rps: number;
  spinUpProgress: number; // 0-100%
  tier: NodeTier;
}

export interface MetricsSnapshot {
  totalRps: number;
  activeNodesCount: number;
  staticNodesCount: number;
  totalCapacityRps: number;
  clusterCpuPercent: number;
  clusterMemoryPercent: number;
  avgLatencyMs: number;
  p99LatencyMs: number;
  errorRatePercent: number;
  serverState: "CHILLING" | "OPTIMAL" | "SWEATING" | "MELTDOWN";
  statusNote: string;
  scalingRecommendation: string;
  scalingStatus: "OK" | "SCALE_OUT_NEEDED" | "SCALE_IN_RECOMMENDED";
  emotionEmoji: string;
}

export interface ScalingComparisonSnapshot {
  before: {
    activeNodes: number;
    clusterCpu: number;
    p99Latency: number;
    errorRate: number;
    capacity: number;
  };
  after: {
    activeNodes: number;
    clusterCpu: number;
    p99Latency: number;
    errorRate: number;
    capacity: number;
  };
  action: string;
  timestamp: string;
}

export interface ScalingLogEvent {
  id: string;
  timestamp: string;
  type: "SCALE_OUT" | "SCALE_IN" | "VERTICAL_SCALE" | "WARN" | "INFO";
  message: string;
  strategy: ScalingStrategy;
}

export interface StrategyBenchmark {
  strategy: ScalingStrategy;
  name: string;
  icon: string;
  description: string;
  resourceUtilizationScore: number; // 0 - 100%
  slaAdherence: "EXCELLENT" | "GOOD" | "MODERATE" | "POOR";
  costEfficiency: "VERY HIGH" | "HIGH" | "MEDIUM" | "LOW";
  reactionTime: string;
  bestTrafficPattern: string;
  whyItWins: string;
  tradeoffs: string;
}

export const TIER_CAPACITY: Record<NodeTier, number> = {
  Small: 10000, // 2 vCPU / 4GB RAM (10,000 RPS)
  Medium: 25000, // 4 vCPU / 8GB RAM (25,000 RPS)
  Large: 75000, // 8 vCPU / 16GB RAM (75,000 RPS)
};

export const TIER_RAM: Record<NodeTier, string> = {
  Small: "2 vCPU / 4GB RAM (10k RPS)",
  Medium: "4 vCPU / 8GB RAM (25k RPS)",
  Large: "8 vCPU / 16GB RAM (75k RPS)",
};

export const STRATEGY_BENCHMARKS: StrategyBenchmark[] = [
  {
    strategy: "horizontal",
    name: "Horizontal Scaling (HPA)",
    icon: "↔️",
    description: "Dynamically provisions/deprovisions pod instances to match fluctuating high-throughput traffic load while keeping base specs lightweight.",
    resourceUtilizationScore: 92,
    slaAdherence: "EXCELLENT",
    costEfficiency: "VERY HIGH",
    reactionTime: "Fast (1-2s)",
    bestTrafficPattern: "Gradual Ramp Up & Variable High-Volume Traffic",
    whyItWins: "Provides fine-grained elasticity without paying for oversized idle VMs. Scale-in reclaims memory immediately when load drops.",
    tradeoffs: "Requires fast application bootstrap times and dynamic load balancer health checks.",
  },
  {
    strategy: "predictive",
    name: "Predictive AI Scaling",
    icon: "🔮",
    description: "Uses machine learning traffic forecasting to pre-warm server capacity 3-5 seconds ahead of anticipated hyper-scale load surges.",
    resourceUtilizationScore: 96,
    slaAdherence: "EXCELLENT",
    costEfficiency: "HIGH",
    reactionTime: "Instant (Pre-allocation)",
    bestTrafficPattern: "Flash Sales, Scheduled Marketing Waves, E-Commerce Drop Events",
    whyItWins: "Completely eliminates container cold-start delay and transient latency/error spikes during extreme load surges up to 350k+ req/sec.",
    tradeoffs: "Relies on accurate historical telemetry data; unpredicted sudden anomalies may still fall back to reactive triggers.",
  },
  {
    strategy: "threshold",
    name: "Threshold-Based Rule Scaling",
    icon: "⚖️",
    description: "Evaluates metrics against hard thresholds (e.g. CPU > 75% for 3s). Simple, deterministic, and cloud-standard.",
    resourceUtilizationScore: 84,
    slaAdherence: "GOOD",
    costEfficiency: "HIGH",
    reactionTime: "Moderate (3-5s evaluation window)",
    bestTrafficPattern: "Steady & Moderate Linear Load Growth",
    whyItWins: "Simple to configure and debug with no complex ML models or state dependencies.",
    tradeoffs: "Can suffer threshold flapping if cooldown periods aren't tuned properly; slow to react to instant massive spikes.",
  },
  {
    strategy: "reactive",
    name: "Reactive Post-Breach Scaling",
    icon: "⚡",
    description: "Triggers scale-out only AFTER an SLA breach or severe CPU overload is detected.",
    resourceUtilizationScore: 70,
    slaAdherence: "MODERATE",
    costEfficiency: "MEDIUM",
    reactionTime: "Slow (Lag during container spin-up)",
    bestTrafficPattern: "Slowly Growing Baseline Traffic",
    whyItWins: "Ensures resources are only spent when servers are proven to be saturated.",
    tradeoffs: "Causes transient p99 latency spikes and error rate jumps during cold-start provisioning.",
  },
  {
    strategy: "vertical",
    name: "Vertical Scaling (VPA / Resize)",
    icon: "↕️",
    description: "Upgrades compute tier (vCPU & RAM) per node while keeping active instance count fixed.",
    resourceUtilizationScore: 65,
    slaAdherence: "MODERATE",
    costEfficiency: "MEDIUM",
    reactionTime: "Requires Node Restart / Warm-swap",
    bestTrafficPattern: "Monolithic Workloads, Single-threaded DBs, Legacy Apps",
    whyItWins: "Ideal for applications that cannot easily scale horizontally across multiple instances due to stateful constraints.",
    tradeoffs: "Hard upper hardware ceiling; vertical resize can be costly and requires larger instances with higher idle cost.",
  },
];

export const TRAFFIC_SCENARIOS = [
  {
    id: "normal" as TrafficScenarioId,
    name: "Normal Traffic",
    icon: "☕",
    targetRps: 15000,
    description: "Steady state daytime traffic (15,000 req/sec)",
  },
  {
    id: "gradual" as TrafficScenarioId,
    name: "Gradual Ramp Up",
    icon: "📈",
    targetRps: 85000,
    description: "Linear increase over 10 seconds (15,000 -> 85,000 req/sec)",
  },
  {
    id: "spike" as TrafficScenarioId,
    name: "Sudden Traffic Spike",
    icon: "⚡",
    targetRps: 150000,
    description: "Instantaneous spike from 15,000 -> 150,000 req/sec",
  },
  {
    id: "flash_sale" as TrafficScenarioId,
    name: "Flash Sale Surge",
    icon: "🔥",
    targetRps: 350000,
    description: "Extreme hyper-scale surge (15,000 -> 350,000 req/sec)",
  },
  {
    id: "drop" as TrafficScenarioId,
    name: "Traffic Drop",
    icon: "📉",
    targetRps: 2500,
    description: "Rapid plunge down to 2,500 req/sec idle state",
  },
];

/**
 * Calculates real-time cluster metrics given total incoming RPS and node cluster state.
 */
export function calculateClusterMetrics(
  totalRps: number,
  nodes: NodeModel[]
): MetricsSnapshot {
  const activeNodes = nodes.filter((n) => n.status === "ACTIVE");
  const spinningUpNodes = nodes.filter((n) => n.status === "SPINNING_UP");
  const staticNodes = nodes.filter((n) => n.status === "STATIC_IDLE");

  const activeCount = activeNodes.length;
  const staticCount = staticNodes.length;

  if (activeCount === 0) {
    return {
      totalRps,
      activeNodesCount: 0,
      staticNodesCount: staticCount,
      totalCapacityRps: 0,
      clusterCpuPercent: 0,
      clusterMemoryPercent: 0,
      avgLatencyMs: 999,
      p99LatencyMs: 9999,
      errorRatePercent: 100,
      serverState: "MELTDOWN",
      statusNote: "No active nodes available to handle traffic! 100% requests dropped.",
      scalingRecommendation: "⚠️ Immediate Scale Out required! Zero active nodes online.",
      scalingStatus: "SCALE_OUT_NEEDED",
      emotionEmoji: "😱",
    };
  }

  // Calculate total cluster capacity from active nodes
  const totalCapacityRps = activeNodes.reduce(
    (sum, n) => sum + TIER_CAPACITY[n.tier],
    0
  );

  // Load ratio relative to active cluster capacity
  const loadRatio = totalRps / Math.max(1, totalCapacityRps);

  // Distribute RPS to active nodes proportionally
  const rpsPerNode = totalRps / activeCount;

  // Base metrics calculations
  let avgCpu = Math.min(100, Math.round(10 + Math.pow(loadRatio, 1.7) * 80));
  let avgMem = Math.min(100, Math.round(15 + loadRatio * 70));

  // Latency non-linear stress curve
  let avgLatencyMs = Math.round(14 + Math.pow(loadRatio, 2.2) * 95);
  // Add temporary latency penalty if nodes are spinning up (cold-start overhead)
  if (spinningUpNodes.length > 0) {
    avgLatencyMs += spinningUpNodes.length * 35;
  }

  let p99LatencyMs = Math.round(
    avgLatencyMs * (1.6 + loadRatio * 1.4)
  );

  // Error rate calculation
  let errorRatePercent = 0;
  if (loadRatio > 1.0) {
    errorRatePercent = Number(((loadRatio - 1.0) * 32).toFixed(1));
    errorRatePercent = Math.min(98.5, errorRatePercent);
  } else if (loadRatio > 0.88) {
    errorRatePercent = Number(((loadRatio - 0.88) * 8).toFixed(1));
  }

  // Server state determination
  let serverState: "CHILLING" | "OPTIMAL" | "SWEATING" | "MELTDOWN" = "CHILLING";
  let statusNote = "";
  let emotionEmoji = "😎";
  let scalingRecommendation = "";
  let scalingStatus: "OK" | "SCALE_OUT_NEEDED" | "SCALE_IN_RECOMMENDED" = "OK";

  const nodeTierCap = TIER_CAPACITY[activeNodes[0]?.tier || "Small"];

  if (loadRatio > 1.1 || avgCpu > 88 || errorRatePercent > 3) {
    serverState = "MELTDOWN";
    emotionEmoji = "😱 🔥";
    statusNote = `Cluster Overloaded! Capacity exceeded by ${Math.round((loadRatio - 1) * 100)}%. Sockets saturating.`;
    scalingStatus = "SCALE_OUT_NEEDED";
    scalingRecommendation = `⚠️ CRITICAL: CPU at ${avgCpu}% and Load Ratio ${Math.round(loadRatio * 100)}%. Scale Out +${Math.max(1, Math.ceil((totalRps - totalCapacityRps) / nodeTierCap))} nodes immediately!`;
  } else if (loadRatio > 0.75 || avgCpu > 75 || p99LatencyMs > 220) {
    serverState = "SWEATING";
    emotionEmoji = "😅 💦";
    statusNote = `High stress! CPU at ${avgCpu}%. Latency rising (${p99LatencyMs}ms p99).`;
    scalingStatus = "SCALE_OUT_NEEDED";
    scalingRecommendation = `⚠️ WARNING: Active node CPU at ${avgCpu}% > target 75%. Provisioning additional node recommended.`;
  } else if (loadRatio > 0.35 || avgCpu > 35) {
    serverState = "OPTIMAL";
    emotionEmoji = "🙂 ⚙️";
    statusNote = `Cluster in optimal performance window (${activeCount} active nodes, ${avgCpu}% CPU load).`;
    scalingStatus = "OK";
    scalingRecommendation = `✅ OPTIMAL: Cluster operating cleanly within target SLA (< 200ms latency).`;
  } else {
    serverState = "CHILLING";
    emotionEmoji = "😎 ☕";
    statusNote = `Low load across ${activeCount} active nodes. Extra headroom available.`;
    if (activeCount > 1) {
      scalingStatus = "SCALE_IN_RECOMMENDED";
      scalingRecommendation = `ℹ️ NOTICE: Low load (${avgCpu}% CPU). Scale-in possible to reduce idle resource cost.`;
    } else {
      scalingStatus = "OK";
      scalingRecommendation = `✅ CHILLING: Minimum baseline active node running comfortably.`;
    }
  }

  return {
    totalRps,
    activeNodesCount: activeCount,
    staticNodesCount: staticCount,
    totalCapacityRps,
    clusterCpuPercent: avgCpu,
    clusterMemoryPercent: avgMem,
    avgLatencyMs,
    p99LatencyMs,
    errorRatePercent,
    serverState,
    statusNote,
    scalingRecommendation,
    scalingStatus,
    emotionEmoji,
  };
}
