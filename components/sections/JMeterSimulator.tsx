"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  calculateClusterMetrics,
  NodeModel,
  NodeTier,
  NodeState,
  ScalingStrategy,
  TrafficScenarioId,
  MetricsSnapshot,
  ScalingComparisonSnapshot,
  ScalingLogEvent,
  STRATEGY_BENCHMARKS,
  TRAFFIC_SCENARIOS,
  TIER_CAPACITY,
  TIER_RAM,
} from "@/lib/jmeterSimulatorEngine";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Zap,
  Activity,
  Layers,
  Server,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Database,
  Clock,
  ShieldAlert,
  Info,
  HelpCircle,
  Maximize2,
  Minimize2,
  Terminal as TerminalIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MAX_CLUSTER_NODES = 6;

export default function JMeterSimulator() {
  // Simulator Modes: 'playground' (manual control) | 'scenario' (automated stress tests)
  const [mode, setMode] = useState<"playground" | "scenario">("playground");
  
  // Traffic & Strategy State
  const [concurrencyRps, setConcurrencyRps] = useState<number>(15000);
  const [autoScaleEnabled, setAutoScaleEnabled] = useState<boolean>(true);
  const [strategy, setStrategy] = useState<ScalingStrategy>("horizontal");
  const [targetCpuThreshold, setTargetCpuThreshold] = useState<number>(75);
  const [selectedTier, setSelectedTier] = useState<NodeTier>("Small");

  // Node Cluster State
  // Active/Scaled nodes react dynamically to load.
  // Static nodes remain idle/unallocated unless explicitly added to simulation.
  const [nodes, setNodes] = useState<NodeModel[]>([
    { id: "node-1", name: "NODE_01", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
    { id: "node-2", name: "NODE_02", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
    { id: "node-3", name: "NODE_03", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
    { id: "node-4", name: "NODE_04 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
    { id: "node-5", name: "NODE_05 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
    { id: "node-6", name: "NODE_06 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
  ]);

  // Real-Time Metrics & Scaling History Snapshots
  const [metrics, setMetrics] = useState<MetricsSnapshot>(() =>
    calculateClusterMetrics(15000, [
      { id: "node-1", name: "NODE_01", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
      { id: "node-2", name: "NODE_02", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
      { id: "node-3", name: "NODE_03", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
    ])
  );

  const [scalingComparison, setScalingComparison] = useState<ScalingComparisonSnapshot | null>(null);
  const [logs, setLogs] = useState<ScalingLogEvent[]>([
    {
      id: "log-0",
      timestamp: "INITIALIZED",
      type: "INFO",
      message: "Cluster initialized with 3 Active Nodes (30,000 RPS Capacity). 3 Static Standby Nodes.",
      strategy: "horizontal",
    },
  ]);

  // Scenario Automation State
  const [activeScenarioId, setActiveScenarioId] = useState<TrafficScenarioId | null>(null);
  const [isPlayingScenario, setIsPlayingScenario] = useState<boolean>(false);
  const [scenarioProgress, setScenarioProgress] = useState<number>(0);

  // Live Chart Timeline History (last 20 ticks)
  const [history, setHistory] = useState<
    { tick: number; rps: number; cpu: number; activeNodes: number; p99: number }[]
  >([]);

  const [showBenchmarkDetails, setShowBenchmarkDetails] = useState<boolean>(false);
  const tickCounter = useRef<number>(0);

  // Add Log Entry Helper
  const addLog = (type: ScalingLogEvent["type"], message: string) => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
        strategy,
      },
      ...prev.slice(0, 25),
    ]);
  };

  // Capture Before vs After Scaling Snapshot
  const captureScalingSnapshot = (actionName: string, beforeMetrics: MetricsSnapshot, newNodes: NodeModel[]) => {
    const afterMetrics = calculateClusterMetrics(concurrencyRps, newNodes);
    setScalingComparison({
      before: {
        activeNodes: beforeMetrics.activeNodesCount,
        clusterCpu: beforeMetrics.clusterCpuPercent,
        p99Latency: beforeMetrics.p99LatencyMs,
        errorRate: beforeMetrics.errorRatePercent,
        capacity: beforeMetrics.totalCapacityRps,
      },
      after: {
        activeNodes: afterMetrics.activeNodesCount,
        clusterCpu: afterMetrics.clusterCpuPercent,
        p99Latency: afterMetrics.p99LatencyMs,
        errorRate: afterMetrics.errorRatePercent,
        capacity: afterMetrics.totalCapacityRps,
      },
      action: actionName,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  // Toggle Specific Node by ID
  const handleToggleSpecificNode = (nodeId: string) => {
    const targetIdx = nodes.findIndex((n) => n.id === nodeId);
    if (targetIdx === -1) return;

    const targetNode = nodes[targetIdx];
    const beforeSnapshot = metrics;
    const newNodes = [...nodes];

    if (targetNode.status === "ACTIVE") {
      const activeCount = nodes.filter((n) => n.status === "ACTIVE").length;
      if (activeCount <= 1) {
        addLog("WARN", "Cannot deactivate node: Minimum 1 active node required for cluster survival.");
        return;
      }
      newNodes[targetIdx] = {
        ...targetNode,
        name: `NODE_0${targetIdx + 1} (STANDBY)`,
        status: "STATIC_IDLE",
        cpu: 0,
        memory: 0,
        rps: 0,
        spinUpProgress: 0,
      };
      addLog("SCALE_IN", `Manual Scale In: Deactivated ${targetNode.name}.`);
      captureScalingSnapshot(`Deactivate ${targetNode.name}`, beforeSnapshot, newNodes);
    } else {
      newNodes[targetIdx] = {
        ...targetNode,
        name: `NODE_0${targetIdx + 1}`,
        status: "ACTIVE",
        spinUpProgress: 100,
        tier: selectedTier,
      };
      addLog("SCALE_OUT", `Manual Scale Out: Activated ${newNodes[targetIdx].name} (${selectedTier} Tier).`);
      captureScalingSnapshot(`Activate ${targetNode.name}`, beforeSnapshot, newNodes);
    }

    setNodes(newNodes);
  };

  // Manual Node Add Logic
  const handleAddActiveNode = () => {
    const staticIndex = nodes.findIndex((n) => n.status === "STATIC_IDLE");
    if (staticIndex === -1) {
      addLog("WARN", "Max cluster capacity reached (6/6 nodes active). Cannot scale out further.");
      return;
    }
    handleToggleSpecificNode(nodes[staticIndex].id);
  };

  // Manual Node Remove Logic
  const handleRemoveActiveNode = () => {
    const activeNodesList = nodes.filter((n) => n.status === "ACTIVE");
    if (activeNodesList.length <= 1) {
      addLog("WARN", "Cannot remove node: Minimum 1 active node required to keep cluster alive.");
      return;
    }
    const lastActiveIndex = nodes.map((n) => n.status).lastIndexOf("ACTIVE");
    handleToggleSpecificNode(nodes[lastActiveIndex].id);
  };

  // Upgrade/Downgrade Node Tier (Vertical Scaling)
  const handleTierChange = (newTier: NodeTier) => {
    const beforeSnapshot = metrics;
    const newNodes = nodes.map((n) =>
      n.status === "ACTIVE" ? { ...n, tier: newTier } : n
    );
    setSelectedTier(newTier);
    setNodes(newNodes);
    addLog("VERTICAL_SCALE", `Vertical Scaling: Resized active nodes to ${newTier} Tier (${TIER_CAPACITY[newTier]} RPS per node).`);
    captureScalingSnapshot(`Vertical Scale to ${newTier}`, beforeSnapshot, newNodes);
  };

  // Main Simulation Loop Ticker (runs every 1.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      tickCounter.current += 1;

      // Handle scenario progression if active
      if (isPlayingScenario && activeScenarioId) {
        setScenarioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingScenario(false);
            return 100;
          }
          return prev + 10;
        });

        // Scenario traffic curves
        const scenario = TRAFFIC_SCENARIOS.find((s) => s.id === activeScenarioId);
        if (scenario) {
          if (activeScenarioId === "gradual") {
            setConcurrencyRps((prev) => Math.min(scenario.targetRps, prev + 8000));
          } else if (activeScenarioId === "spike" || activeScenarioId === "flash_sale") {
            setConcurrencyRps(scenario.targetRps);
          } else if (activeScenarioId === "drop") {
            setConcurrencyRps(scenario.targetRps);
          } else {
            setConcurrencyRps(scenario.targetRps);
          }
        }
      }

      // Compute current cluster metrics
      setNodes((currentNodes) => {
        const activeCount = currentNodes.filter((n) => n.status === "ACTIVE").length;
        const currentMetrics = calculateClusterMetrics(concurrencyRps, currentNodes);
        setMetrics(currentMetrics);

        // Update live timeline history
        setHistory((prevHistory) => [
          ...prevHistory.slice(-19),
          {
            tick: tickCounter.current,
            rps: concurrencyRps,
            cpu: currentMetrics.clusterCpuPercent,
            activeNodes: activeCount,
            p99: currentMetrics.p99LatencyMs,
          },
        ]);

        // Auto-scaling Evaluation Logic
        if (autoScaleEnabled) {
          // Horizontal / Threshold Scaling
          if (strategy === "horizontal" || strategy === "threshold" || strategy === "reactive") {
            if (currentMetrics.clusterCpuPercent > targetCpuThreshold && activeCount < MAX_CLUSTER_NODES) {
              const staticIdx = currentNodes.findIndex((n) => n.status === "STATIC_IDLE");
              if (staticIdx !== -1) {
                const beforeSnapshot = currentMetrics;
                const nextNodes = [...currentNodes];
                nextNodes[staticIdx] = {
                  ...nextNodes[staticIdx],
                  name: `NODE_0${staticIdx + 1}`,
                  status: "ACTIVE",
                  spinUpProgress: 100,
                  tier: selectedTier,
                };
                addLog(
                  "SCALE_OUT",
                  `[Auto-Scale: ${strategy.toUpperCase()}] Triggered Scale-Out! CPU (${currentMetrics.clusterCpuPercent}%) > Target (${targetCpuThreshold}%). Activated ${nextNodes[staticIdx].name}.`
                );
                captureScalingSnapshot(`Auto Scale Out (+1 Node)`, beforeSnapshot, nextNodes);
                return nextNodes;
              }
            } else if (currentMetrics.clusterCpuPercent < 30 && activeCount > 1) {
              const lastActiveIdx = currentNodes.map((n) => n.status).lastIndexOf("ACTIVE");
              if (lastActiveIdx !== -1) {
                const beforeSnapshot = currentMetrics;
                const nextNodes = [...currentNodes];
                nextNodes[lastActiveIdx] = {
                  ...nextNodes[lastActiveIdx],
                  name: `NODE_0${lastActiveIdx + 1} (STANDBY)`,
                  status: "STATIC_IDLE",
                  cpu: 0,
                  memory: 0,
                  rps: 0,
                  spinUpProgress: 0,
                };
                addLog(
                  "SCALE_IN",
                  `[Auto-Scale: ${strategy.toUpperCase()}] Triggered Scale-In. Cluster CPU under-utilized (${currentMetrics.clusterCpuPercent}%). Deactivated NODE_0${lastActiveIdx + 1}.`
                );
                captureScalingSnapshot(`Auto Scale In (-1 Node)`, beforeSnapshot, nextNodes);
                return nextNodes;
              }
            }
          }

          // Predictive Scaling Logic
          if (strategy === "predictive") {
            const requiredCapacityNodes = Math.max(1, Math.ceil(concurrencyRps / TIER_CAPACITY[selectedTier]));
            if (requiredCapacityNodes > activeCount && activeCount < MAX_CLUSTER_NODES) {
              const beforeSnapshot = currentMetrics;
              const nextNodes = [...currentNodes];
              const staticIdx = nextNodes.findIndex((n) => n.status === "STATIC_IDLE");
              if (staticIdx !== -1) {
                nextNodes[staticIdx] = {
                  ...nextNodes[staticIdx],
                  name: `NODE_0${staticIdx + 1}`,
                  status: "ACTIVE",
                  spinUpProgress: 100,
                  tier: selectedTier,
                };
                addLog(
                  "SCALE_OUT",
                  `[Predictive Scaling] Pre-allocation triggered! Anticipated traffic surge to ${concurrencyRps} RPS. Spun up ${nextNodes[staticIdx].name} ahead of time.`
                );
                captureScalingSnapshot(`Predictive Scale Out (+1 Node)`, beforeSnapshot, nextNodes);
                return nextNodes;
              }
            }
          }

          // Vertical Scaling Logic
          if (strategy === "vertical") {
            if (currentMetrics.clusterCpuPercent > targetCpuThreshold && selectedTier !== "Large") {
              const nextTier: NodeTier = selectedTier === "Small" ? "Medium" : "Large";
              const beforeSnapshot = currentMetrics;
              setSelectedTier(nextTier);
              const nextNodes = currentNodes.map((n) =>
                n.status === "ACTIVE" ? { ...n, tier: nextTier } : n
              );
              addLog(
                "VERTICAL_SCALE",
                `[Vertical Scaling] Upgraded active nodes to ${nextTier} Tier due to High CPU (${currentMetrics.clusterCpuPercent}%).`
              );
              captureScalingSnapshot(`Vertical Scale to ${nextTier}`, beforeSnapshot, nextNodes);
              return nextNodes;
            }
          }
        }

        return currentNodes;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [concurrencyRps, autoScaleEnabled, strategy, targetCpuThreshold, selectedTier, isPlayingScenario, activeScenarioId]);

  // Scenario Run Handler
  const handleRunScenario = (scenarioId: TrafficScenarioId) => {
    setActiveScenarioId(scenarioId);
    setScenarioProgress(0);
    setIsPlayingScenario(true);
    const scenario = TRAFFIC_SCENARIOS.find((s) => s.id === scenarioId);
    if (scenario) {
      if (scenarioId === "flash_sale" || scenarioId === "spike") {
        setConcurrencyRps(scenario.targetRps);
      }
      addLog("INFO", `Scenario Started: "${scenario.name}" (Target: ${scenario.targetRps.toLocaleString()} RPS)`);
    }
  };

  // Reset Simulation
  const handleResetSimulation = () => {
    setConcurrencyRps(15000);
    setSelectedTier("Small");
    setIsPlayingScenario(false);
    setActiveScenarioId(null);
    setScenarioProgress(0);
    setScalingComparison(null);

    const initialNodes: NodeModel[] = [
      { id: "node-1", name: "NODE_01", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
      { id: "node-2", name: "NODE_02", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
      { id: "node-3", name: "NODE_03", status: "ACTIVE", cpu: 50, memory: 45, rps: 5000, spinUpProgress: 100, tier: "Small" },
      { id: "node-4", name: "NODE_04 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
      { id: "node-5", name: "NODE_05 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
      { id: "node-6", name: "NODE_06 (STANDBY)", status: "STATIC_IDLE", cpu: 0, memory: 0, rps: 0, spinUpProgress: 0, tier: "Small" },
    ];
    setNodes(initialNodes);
    addLog("INFO", "Reset cluster back to 3 active nodes (Small tier, 15,000 RPS load).");
  };

  const activeNodesCount = nodes.filter((n) => n.status === "ACTIVE").length;

  return (
    <div className="sketch-card p-4 sm:p-6 bg-[#fffefc] border-2 border-[#1e1d1b] my-8 shadow-xl">
      {/* Top Navigation & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b-2 border-dashed border-[#1e1d1b] mb-6 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="sticker-tag-red text-xs uppercase font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> INTERACTIVE PLAYGROUND
            </span>
            <span className="font-mono text-xs font-bold text-[#ff5e5b]">APACHE JMETER LOAD & AUTO-SCALING SUITE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-mono text-[#1e1d1b]">
            "How does infrastructure react when traffic surges?"
          </h3>
          <p className="text-xs font-mono text-[#57534e] mt-1">
            Observe real-time cluster elasticity, dynamic node scaling, load distribution, and strategy benchmarks.
          </p>
        </div>

        {/* Mode Selector & Control Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="bg-[#f6f4ee] p-1 border border-[#1e1d1b] rounded flex items-center gap-1">
            <button
              onClick={() => setMode("playground")}
              className={`px-3 py-1.5 font-bold rounded transition-colors flex items-center gap-1.5 ${
                mode === "playground" ? "bg-[#ff5e5b] text-white" : "bg-transparent text-[#1e1d1b] hover:bg-[#e8e4d9]"
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> PLAYGROUND MODE
            </button>
            <button
              onClick={() => setMode("scenario")}
              className={`px-3 py-1.5 font-bold rounded transition-colors flex items-center gap-1.5 ${
                mode === "scenario" ? "bg-[#ff5e5b] text-white" : "bg-transparent text-[#1e1d1b] hover:bg-[#e8e4d9]"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> TRAFFIC SCENARIOS
            </button>
          </div>

          <button
            onClick={() => setAutoScaleEnabled(!autoScaleEnabled)}
            className={`px-3 py-2 sketch-button font-bold flex items-center gap-1.5 border border-[#1e1d1b] ${
              autoScaleEnabled ? "bg-[#2ecc71] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <span>AUTO-SCALE:</span>
            <span className="font-black">{autoScaleEnabled ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={handleResetSimulation}
            className="p-2 bg-white text-[#1e1d1b] sketch-button border border-[#1e1d1b] hover:bg-[#f6f4ee]"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Panel Section */}
      <div className="mb-6">
        {mode === "playground" ? (
          /* Playground Mode Manual Controls */
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Traffic Slider */}
              <div className="space-y-1.5 lg:col-span-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1 text-[#1e1d1b]">
                    <Activity className="w-4 h-4 text-[#ff5e5b]" /> CONCURRENT TRAFFIC WAVE:
                  </span>
                  <span className="text-base text-[#ff5e5b] font-black">{concurrencyRps.toLocaleString()} req/sec</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={concurrencyRps}
                  onChange={(e) => setConcurrencyRps(Number(e.target.value))}
                  className="w-full h-3 bg-[#e8e4d9] rounded-lg appearance-none cursor-pointer accent-[#ff5e5b]"
                />
                <div className="flex justify-between text-[10px] text-[#57534e]">
                  <span>1,000 req/s (Idle)</span>
                  <span>50,000 req/s (Cruising)</span>
                  <span>200,000 req/s (Heavy)</span>
                  <span>500,000 req/s (Hyper-Surge!)</span>
                </div>
              </div>

              {/* Dynamic Add/Remove Node Buttons */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#1e1d1b] block">DYNAMIC NODES CONTROL:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddActiveNode}
                    disabled={activeNodesCount >= MAX_CLUSTER_NODES}
                    className="flex-1 py-2 px-3 bg-[#2ecc71] text-white font-bold sketch-button flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" /> ADD NODE
                  </button>
                  <button
                    onClick={handleRemoveActiveNode}
                    disabled={activeNodesCount <= 1}
                    className="flex-1 py-2 px-3 bg-[#ff5e5b] text-white font-bold sketch-button flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" /> REMOVE
                  </button>
                </div>
                <span className="text-[10px] text-[#57534e] block text-center">
                  Active Nodes: <strong className="text-[#1e1d1b]">{activeNodesCount} / {MAX_CLUSTER_NODES}</strong>
                </span>
              </div>

              {/* Node Tier Selector (Vertical Scaling) */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#1e1d1b] block">NODE SPECS (VERTICAL):</span>
                <div className="grid grid-cols-3 gap-1">
                  {(["Small", "Medium", "Large"] as NodeTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => handleTierChange(tier)}
                      className={`py-1.5 px-1 font-bold text-[11px] border border-[#1e1d1b] sketch-button transition-colors ${
                        selectedTier === tier ? "bg-[#ff5e5b] text-white" : "bg-white text-[#1e1d1b]"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[#57534e] block text-center">
                  Cap: <strong>{TIER_CAPACITY[selectedTier]} req/s</strong> per node
                </span>
              </div>
            </div>

            {/* Strategy Selector Tabs */}
            <div className="pt-3 border-t border-dashed border-[#e8e4d9]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-bold text-[#1e1d1b] flex items-center gap-1">
                  <Layers className="w-4 h-4 text-[#ff5e5b]" /> AUTO-SCALING STRATEGY SIMULATOR:
                </span>
                <button
                  onClick={() => setShowBenchmarkDetails(!showBenchmarkDetails)}
                  className="text-[11px] text-[#ff5e5b] underline font-bold flex items-center gap-1 hover:text-[#e04845]"
                >
                  <Info className="w-3.5 h-3.5" /> Strategy Efficiency Benchmark & Why It Wins
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {STRATEGY_BENCHMARKS.map((b) => (
                  <button
                    key={b.strategy}
                    onClick={() => {
                      setStrategy(b.strategy);
                      addLog("INFO", `Switched Auto-Scaling Strategy to "${b.name}"`);
                    }}
                    className={`p-2 border text-left rounded font-mono transition-all ${
                      strategy === b.strategy
                        ? "bg-[#1e1d1b] text-white border-[#1e1d1b] shadow-md"
                        : "bg-white text-[#1e1d1b] border-[#1e1d1b] hover:bg-[#f6f4ee]"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold text-[11px]">
                      <span>{b.icon}</span>
                      <span className="truncate">{b.name.split(" ")[0]}</span>
                    </div>
                    <span className="text-[9px] opacity-75 block truncate mt-0.5">{b.reactionTime}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Traffic Scenarios Control Panel */
          <div className="p-4 bg-[#f6f4ee] border border-[#1e1d1b] sketch-border-sm font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1e1d1b] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#ff5e5b]" /> SELECT TRAFFIC SCENARIO TEST:
              </span>
              {isPlayingScenario && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#ff5e5b] font-bold">
                    Running Scenario: {scenarioProgress}%
                  </span>
                  <div className="w-24 bg-[#e8e4d9] h-2 rounded-full overflow-hidden border border-[#1e1d1b]">
                    <div className="bg-[#ff5e5b] h-full transition-all duration-300" style={{ width: `${scenarioProgress}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {TRAFFIC_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleRunScenario(scenario.id)}
                  className={`p-3 border text-left sketch-button transition-all ${
                    activeScenarioId === scenario.id
                      ? "bg-[#ff5e5b] text-white border-[#1e1d1b]"
                      : "bg-white text-[#1e1d1b] border-[#1e1d1b] hover:bg-[#f6f4ee]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span>{scenario.icon}</span>
                    <span className="truncate">{scenario.name}</span>
                  </div>
                  <span className="text-[10px] opacity-80 block mt-1">{scenario.targetRps.toLocaleString()} RPS</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cluster Node Topology Visual Grid (Active Nodes react dynamically vs Static Standby Nodes) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 font-mono">
          <h4 className="font-bold text-sm text-[#1e1d1b] flex items-center gap-2">
            <Server className="w-4 h-4 text-[#ff5e5b]" /> CLUSTER NODE MATRIX TOPOLOGY
          </h4>
          <span className="text-xs text-[#57534e]">
            Active: <span className="font-bold text-[#2ecc71]">{activeNodesCount}</span> | Standby/Static: <span className="font-bold text-gray-500">{MAX_CLUSTER_NODES - activeNodesCount}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {nodes.map((node, index) => {
            const isActive = node.status === "ACTIVE";
            const nodeRps = isActive ? Math.round(concurrencyRps / activeNodesCount) : 0;
            const nodeCap = TIER_CAPACITY[node.tier];
            const nodeLoadRatio = isActive ? nodeRps / nodeCap : 0;
            const nodeCpu = isActive ? Math.min(100, Math.round(12 + Math.pow(nodeLoadRatio, 1.7) * 80)) : 0;
            const nodeMem = isActive ? Math.min(100, Math.round(15 + nodeLoadRatio * 70)) : 0;

            // Emoji, quotes, and visual state calculation for active nodes vs static
            let emoji = "💤";
            let stateBg = "bg-gray-100 border-dashed border-gray-400 opacity-60";
            let funnyQuote = "Unallocated Standby";

            if (isActive) {
              if (nodeCpu > 88) {
                emoji = "😱";
                stateBg = "bg-[#ff5e5b]/15 border-2 border-[#ff5e5b] shadow-lg shadow-[#ff5e5b]/20";
                funnyQuote = index % 2 === 0 ? "SOCKETS SPITTING FIRE! 🔥" : "MY CPU IS NACHOS! 🤯";
              } else if (nodeCpu > 70) {
                emoji = "😅";
                stateBg = "bg-[#ff9f43]/15 border-2 border-[#ff9f43]";
                funnyQuote = index % 2 === 0 ? "Fans at 10,000 RPM! 💦" : "GC Panicking! 🥵";
              } else if (nodeCpu > 35) {
                emoji = "🙂";
                stateBg = "bg-white border-2 border-[#1e1d1b]";
                funnyQuote = "Thread pool cruising! ⚙️";
              } else {
                emoji = "😎";
                stateBg = "bg-[#2ecc71]/15 border-2 border-[#2ecc71]";
                funnyQuote = "Sipping iced coffee ☕";
              }
            }

            return (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg relative flex flex-col justify-between font-mono sketch-border-sm transition-colors ${stateBg}`}
              >
                {/* Floating Fire or Sweat Badge when traffic exceeds */}
                {isActive && nodeCpu > 88 && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute -top-3 -right-2 text-2xl z-10 inline-block drop-shadow"
                    title="Traffic Exceeded! Node on Fire!"
                  >
                    🔥
                  </motion.span>
                )}
                {isActive && nodeCpu > 88 && (
                  <span className="absolute -top-3 -left-2 text-2xl z-10 inline-block drop-shadow">
                    💥
                  </span>
                )}
                {isActive && nodeCpu > 70 && nodeCpu <= 88 && (
                  <span className="absolute -top-3 -right-2 text-xl z-10 inline-block">
                    💦
                  </span>
                )}

                {/* Node Status Tag */}
                <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-1.5 mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? "bg-[#1e1d1b] text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {node.name.split(" ")[0]}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    isActive && nodeCpu > 88
                      ? "bg-[#ff5e5b]"
                      : isActive
                      ? "bg-[#2ecc71]"
                      : "bg-gray-400"
                  }`} />
                </div>

                {/* Node Face & Expression with Smooth 360 Rotation on Emoji Only when traffic exceeds */}
                <div className="flex flex-col items-center justify-center my-2 text-center">
                  <motion.div
                    animate={
                      isActive && nodeCpu > 88
                        ? { rotate: 360 }
                        : { rotate: 0 }
                    }
                    transition={{
                      repeat: isActive && nodeCpu > 88 ? Infinity : 0,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="text-4xl select-none mb-1 inline-block"
                  >
                    {emoji}
                  </motion.div>
                  <span className="text-[10px] font-bold text-[#1e1d1b] uppercase tracking-wider">
                    {isActive ? node.tier : "STANDBY"}
                  </span>
                </div>

                {/* Humorous Speech Caption Bubble */}
                <div className="my-1 py-1 px-1.5 bg-white/90 border border-[#1e1d1b] rounded text-center">
                  <span className="text-[9px] font-hand font-bold text-[#1e1d1b] block truncate">
                    "{funnyQuote}"
                  </span>
                </div>

                {/* Metrics Gauges for Active vs Standby Nodes */}
                {isActive ? (
                  <div className="space-y-1.5 pt-2 border-t border-[#e8e4d9] text-[10px]">
                    <div>
                      <div className="flex justify-between text-[#57534e]">
                        <span>CPU:</span>
                        <span className={`font-black ${nodeCpu > 80 ? "text-[#ff5e5b]" : "text-[#1e1d1b]"}`}>
                          {nodeCpu}%
                        </span>
                      </div>
                      <div className="w-full bg-[#e8e4d9] h-1.5 rounded overflow-hidden mt-0.5">
                        <div
                          className={`h-full transition-all duration-300 ${
                            nodeCpu > 80 ? "bg-[#ff5e5b]" : nodeCpu > 50 ? "bg-[#ff9f43]" : "bg-[#2ecc71]"
                          }`}
                          style={{ width: `${nodeCpu}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-[#57534e]">
                      <span>LOAD:</span>
                      <span className="font-bold text-[#1e1d1b]">{nodeRps.toLocaleString()} req/s</span>
                    </div>

                    <button
                      onClick={() => handleToggleSpecificNode(node.id)}
                      className="mt-1 w-full py-1 bg-red-100 hover:bg-red-200 text-[#ff5e5b] font-bold text-[9px] rounded border border-[#ff5e5b]/40 transition-colors"
                    >
                      - DEACTIVATE NODE
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5 pt-2 border-t border-dashed border-gray-300 text-[10px]">
                    <div>
                      <div className="flex justify-between text-gray-500">
                        <span>CPU:</span>
                        <span className="font-bold text-gray-400">0% (Idle)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded overflow-hidden mt-0.5">
                        <div className="h-full bg-gray-400 w-0" />
                      </div>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>LOAD:</span>
                      <span className="font-bold text-gray-400">0 req/s</span>
                    </div>

                    <button
                      onClick={() => handleToggleSpecificNode(node.id)}
                      className="mt-1 w-full py-1 bg-[#2ecc71]/20 hover:bg-[#2ecc71]/30 text-[#1e1d1b] font-bold text-[9px] rounded border border-[#2ecc71] transition-colors"
                    >
                      + SPIN UP NODE
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Metrics Summary Cards & Scaling Recommendation Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Real-Time Cluster Metrics Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">TOTAL TRAFFIC</span>
              <span className="text-xl font-black text-[#1e1d1b]">{metrics.totalRps.toLocaleString()} <span className="text-xs font-normal">req/s</span></span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">p99 LATENCY</span>
              <span className={`text-xl font-black ${metrics.p99LatencyMs > 200 ? "text-[#ff5e5b]" : "text-[#1e1d1b]"}`}>
                {metrics.p99LatencyMs} <span className="text-xs font-normal">ms</span>
              </span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">CLUSTER CPU</span>
              <span className={`text-xl font-black ${metrics.clusterCpuPercent > 80 ? "text-[#ff5e5b]" : "text-[#1e1d1b]"}`}>
                {metrics.clusterCpuPercent}%
              </span>
            </div>
            <div className="p-3 bg-white border border-[#1e1d1b] sketch-border-sm">
              <span className="text-[10px] text-[#57534e] block font-bold">ERROR RATE</span>
              <span className={`text-xl font-black ${metrics.errorRatePercent > 0 ? "text-[#ff5e5b]" : "text-[#2ecc71]"}`}>
                {metrics.errorRatePercent}%
              </span>
            </div>
          </div>

          {/* Dynamic Scaling Alert / Recommendation Box */}
          <div className={`p-4 border-2 sketch-border-sm font-mono text-xs flex items-start gap-3 ${
            metrics.scalingStatus === "SCALE_OUT_NEEDED"
              ? "bg-[#ff5e5b]/10 border-[#ff5e5b] text-[#1e1d1b]"
              : metrics.scalingStatus === "SCALE_IN_RECOMMENDED"
              ? "bg-[#3498db]/10 border-[#3498db] text-[#1e1d1b]"
              : "bg-[#2ecc71]/10 border-[#2ecc71] text-[#1e1d1b]"
          }`}>
            {metrics.scalingStatus === "SCALE_OUT_NEEDED" ? (
              <AlertTriangle className="w-5 h-5 text-[#ff5e5b] shrink-0 mt-0.5" />
            ) : metrics.scalingStatus === "SCALE_IN_RECOMMENDED" ? (
              <Info className="w-5 h-5 text-[#3498db] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
            )}

            <div>
              <span className="font-black text-sm uppercase block mb-1">
                SCALING TRIGGER ANALYSIS ({metrics.scalingStatus})
              </span>
              <p className="font-semibold text-xs leading-relaxed">{metrics.scalingRecommendation}</p>
              <p className="text-[11px] opacity-80 mt-1">Status Note: {metrics.statusNote}</p>
            </div>
          </div>
        </div>

        {/* Resource Utilization Before & After Scaling Delta Snapshot */}
        <div className="p-4 bg-[#f6f4ee] border-2 border-[#1e1d1b] sketch-border-sm font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-2 mb-3">
              <span className="font-bold text-xs text-[#1e1d1b] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#ff5e5b]" /> BEFORE vs AFTER SCALING IMPACT
              </span>
              <span className="text-[10px] text-[#57534e]">REAL-TIME SNAPSHOT</span>
            </div>

            {scalingComparison ? (
              <div className="space-y-3">
                <div className="p-2 bg-white border border-[#1e1d1b] rounded text-[11px]">
                  <span className="font-bold text-[#ff5e5b] block mb-1">Action: {scalingComparison.action}</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-gray-500 block">BEFORE ({scalingComparison.before.activeNodes} Nodes):</span>
                      <span className="block font-bold">CPU: {scalingComparison.before.clusterCpu}%</span>
                      <span className="block font-bold">p99: {scalingComparison.before.p99Latency}ms</span>
                      <span className="block font-bold">Errors: {scalingComparison.before.errorRate}%</span>
                    </div>

                    <div className="border-l border-gray-200 pl-2">
                      <span className="text-gray-500 block">AFTER ({scalingComparison.after.activeNodes} Nodes):</span>
                      <span className="block font-bold text-[#2ecc71]">
                        CPU: {scalingComparison.after.clusterCpu}% ({scalingComparison.after.clusterCpu - scalingComparison.before.clusterCpu > 0 ? "+" : ""}
                        {scalingComparison.after.clusterCpu - scalingComparison.before.clusterCpu}%)
                      </span>
                      <span className="block font-bold text-[#2ecc71]">
                        p99: {scalingComparison.after.p99Latency}ms ({scalingComparison.after.p99Latency - scalingComparison.before.p99Latency > 0 ? "+" : ""}
                        {scalingComparison.after.p99Latency - scalingComparison.before.p99Latency}ms)
                      </span>
                      <span className="block font-bold text-[#2ecc71]">
                        Errors: {scalingComparison.after.errorRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white border border-dashed border-gray-300 rounded text-center text-gray-500 text-[11px] my-auto">
                <p>No scaling event captured yet.</p>
                <p className="text-[10px] mt-1">Adjust traffic wave or add/remove nodes to trigger real-time delta snapshot!</p>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-dashed border-[#e8e4d9] text-[10px] text-[#57534e]">
            <span>Cluster Capacity: <strong>{metrics.totalCapacityRps.toLocaleString()} RPS</strong></span>
          </div>
        </div>
      </div>

      {/* Mini Live Timeline SVG Chart & Autoscaling Log Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 font-mono">
        {/* SVG Timeline Chart */}
        <div className="p-4 bg-white border border-[#1e1d1b] sketch-border-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-xs text-[#1e1d1b] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#ff5e5b]" /> LIVE CLUSTER TIMELINE (LAST 20 TICKS)
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#ff5e5b] inline-block rounded" /> Traffic</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#3498db] inline-block rounded" /> CPU %</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#2ecc71] inline-block rounded" /> Nodes</span>
            </div>
          </div>

          {/* SVG Chart Frame */}
          <div className="h-44 w-full bg-[#f6f4ee] border border-[#1e1d1b] relative p-2 overflow-hidden">
            {history.length > 1 ? (
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#e8e4d9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#e8e4d9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#e8e4d9" strokeWidth="1" strokeDasharray="3 3" />

                {/* CPU Line (#3498db) */}
                <polyline
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="2.5"
                  points={history
                    .map((h, i) => `${(i / (history.length - 1)) * 400},${120 - (h.cpu / 100) * 110}`)
                    .join(" ")}
                />

                {/* Traffic RPS Line (#ff5e5b) */}
                <polyline
                  fill="none"
                  stroke="#ff5e5b"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  points={history
                    .map((h, i) => `${(i / (history.length - 1)) * 400},${120 - (Math.min(500000, h.rps) / 500000) * 110}`)
                    .join(" ")}
                />

                {/* Active Nodes Line Step (#2ecc71) */}
                <polyline
                  fill="none"
                  stroke="#2ecc71"
                  strokeWidth="3"
                  points={history
                    .map((h, i) => `${(i / (history.length - 1)) * 400},${120 - (h.activeNodes / MAX_CLUSTER_NODES) * 100}`)
                    .join(" ")}
                />
              </svg>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-500">
                Gathering telemetry data ticks...
              </div>
            )}
          </div>
        </div>

        {/* Real-time Event Log Terminal */}
        <div className="p-4 bg-[#1e1d1b] text-white border border-[#1e1d1b] sketch-border-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#57534e] mb-2 text-xs">
            <span className="font-bold flex items-center gap-1.5 text-[#ffe866]">
              <TerminalIcon className="w-4 h-4" /> AUTOSCALING AUDIT LOG TERMINAL
            </span>
            <span className="text-[10px] text-gray-400">Strategy: {strategy.toUpperCase()}</span>
          </div>

          <div className="space-y-1.5 text-[11px] overflow-y-auto max-h-36 pr-1 font-mono">
            {logs.map((log) => (
              <div key={log.id} className="leading-tight">
                <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                <span
                  className={
                    log.type === "SCALE_OUT"
                      ? "text-[#2ecc71] font-bold"
                      : log.type === "SCALE_IN"
                      ? "text-[#3498db] font-bold"
                      : log.type === "VERTICAL_SCALE"
                      ? "text-[#ffe866] font-bold"
                      : log.type === "WARN"
                      ? "text-[#ff5e5b] font-bold"
                      : "text-gray-300"
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-Scaling Strategy Benchmark & Efficiency Breakdown Modal/Accordion */}
      <AnimatePresence>
        {showBenchmarkDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t-2 border-dashed border-[#1e1d1b] font-mono text-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-base text-[#1e1d1b] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#ff5e5b]" /> AUTO-SCALING STRATEGY BENCHMARK & EFFICIENCY MATRIX
              </h4>
              <button
                onClick={() => setShowBenchmarkDetails(false)}
                className="text-[#ff5e5b] font-bold underline text-xs"
              >
                Close Matrix
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STRATEGY_BENCHMARKS.map((b) => (
                <div
                  key={b.strategy}
                  className={`p-4 border-2 rounded-lg sketch-border-sm flex flex-col justify-between ${
                    strategy === b.strategy ? "bg-[#ffe866]/20 border-[#1e1d1b]" : "bg-white border-[#1e1d1b]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm text-[#1e1d1b] flex items-center gap-1.5">
                        <span className="text-lg">{b.icon}</span> {b.name}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#57534e] mb-3 leading-relaxed">{b.description}</p>

                    <div className="space-y-1.5 text-[11px] mb-3 bg-[#f6f4ee] p-2.5 border border-[#1e1d1b] rounded">
                      <div className="flex justify-between">
                        <span>Resource Efficiency:</span>
                        <span className="font-bold text-[#1e1d1b]">{b.resourceUtilizationScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SLA Adherence:</span>
                        <span className="font-bold text-[#2ecc71]">{b.slaAdherence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Efficiency:</span>
                        <span className="font-bold text-[#3498db]">{b.costEfficiency}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <span className="font-bold text-[#ff5e5b] block">💡 Why It Wins:</span>
                      <p className="text-[#1e1d1b] text-[10px] leading-tight mb-2">{b.whyItWins}</p>

                      <span className="font-bold text-gray-700 block">⚠️ Trade-offs:</span>
                      <p className="text-[#57534e] text-[10px] leading-tight">{b.tradeoffs}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
