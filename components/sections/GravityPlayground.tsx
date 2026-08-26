"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { 
  Gamepad2, 
  Orbit, 
  RotateCcw, 
  Plus, 
  Trophy, 
  Play, 
  Square as SquareIcon,
  Layers,
  Sparkles,
  MousePointer,
  Navigation,
  Tv,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ArrowDown,
  Zap,
  Grid3X3,
  Gauge,
  Shield,
  Skull,
  Pencil,
  Eraser,
  Circle,
  Download,
  Users,
  Copy,
  Check,
  Share2,
  RefreshCw,
  Edit3,
  PenTool,
  Undo2,
  Trash2,
  MessageSquare,
  Send,
  X,
  Smile,
  LogIn
} from "lucide-react";

interface PhysicsNode {
  id: string;
  label: string;
  category: "frontend" | "backend" | "db" | "cloud" | "devops";
  color: string;
  textColor: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  width: number;
  height: number;
  zIndex: number;
  isDragging?: boolean;
  liftScale?: number;
}

interface SnakeSegment {
  x: number;
  y: number;
}

interface SnakeFoodDot {
  x: number;
  y: number;
  pulseRadius?: number;
}

// Collaborative Whiteboard Stroke Path Interface
interface StrokePath {
  tool: "pen" | "line" | "rect" | "circle" | "eraser";
  color: string;
  size: number;
  points: { x: number; y: number }[];
  author?: string;
}

// Room Chat Message Interface
interface RoomChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

// TETROMINO DEFINITIONS FOR TETRIS ARCADE
const TETROMINOES = [
  { name: "I", shape: [[1, 1, 1, 1]], color: "#06b6d4" },
  { name: "J", shape: [[1, 0, 0], [1, 1, 1]], color: "#3b82f6" },
  { name: "L", shape: [[0, 0, 1], [1, 1, 1]], color: "#f97316" },
  { name: "O", shape: [[1, 1], [1, 1]], color: "#eab308" },
  { name: "S", shape: [[0, 1, 1], [1, 1, 0]], color: "#22c55e" },
  { name: "T", shape: [[0, 1, 0], [1, 1, 1]], color: "#a855f7" },
  { name: "Z", shape: [[1, 1, 0], [0, 1, 1]], color: "#ef4444" }
];

const TECH_PILLS: { label: string; category: PhysicsNode["category"]; color: string; textColor: string }[] = [
  // Frontend & UI
  { label: "Next.js 16", category: "frontend", color: "#0f172a", textColor: "#ffffff" },
  { label: "React 19", category: "frontend", color: "#0284c7", textColor: "#ffffff" },
  { label: "TypeScript", category: "frontend", color: "#2563eb", textColor: "#ffffff" },
  { label: "TailwindCSS", category: "frontend", color: "#0d9488", textColor: "#ffffff" },
  { label: "Zustand State", category: "frontend", color: "#7c3aed", textColor: "#ffffff" },
  { label: "Framer Motion", category: "frontend", color: "#db2777", textColor: "#ffffff" },

  // Backend & APIs
  { label: "Node.js", category: "backend", color: "#15803d", textColor: "#ffffff" },
  { label: "Fastify", category: "backend", color: "#059669", textColor: "#ffffff" },
  { label: "Express.js", category: "backend", color: "#334155", textColor: "#ffffff" },
  { label: "tRPC Safety", category: "backend", color: "#4f46e5", textColor: "#ffffff" },
  { label: "GraphQL", category: "backend", color: "#c026d3", textColor: "#ffffff" },
  { label: "Stripe Webhooks", category: "backend", color: "#635bff", textColor: "#ffffff" },
  { label: "Zod Schema", category: "backend", color: "#2563eb", textColor: "#ffffff" },
  { label: "BullMQ Queue", category: "backend", color: "#dc2626", textColor: "#ffffff" },
  { label: "Kafka Pipeline", category: "backend", color: "#000000", textColor: "#38bdf8" },
  { label: "Socket.io Realtime", category: "backend", color: "#0f172a", textColor: "#ffffff" },
  { label: "WebSockets", category: "backend", color: "#0284c7", textColor: "#ffffff" },
  { label: "PDFKit Worker", category: "backend", color: "#b91c1c", textColor: "#ffffff" },
  { label: "Rust Core", category: "backend", color: "#ea580c", textColor: "#ffffff" },
  { label: "Python API", category: "backend", color: "#0284c7", textColor: "#ffffff" },
  { label: "Swagger Docs", category: "backend", color: "#65a30d", textColor: "#ffffff" },

  // Databases & Caching
  { label: "PostgreSQL", category: "db", color: "#1d4ed8", textColor: "#ffffff" },
  { label: "Redis Cache", category: "db", color: "#dc2626", textColor: "#ffffff" },
  { label: "MongoDB", category: "db", color: "#15803d", textColor: "#ffffff" },
  { label: "Prisma ORM", category: "db", color: "#0f172a", textColor: "#ffffff" },
  { label: "Sequelize", category: "db", color: "#2563eb", textColor: "#ffffff" },
  { label: "Knex.js", category: "db", color: "#d97706", textColor: "#ffffff" },

  // DevOps, Cloud & Domain Systems
  { label: "Docker ECS", category: "devops", color: "#0284c7", textColor: "#ffffff" },
  { label: "AWS S3", category: "cloud", color: "#d97706", textColor: "#ffffff" },
  { label: "JMeter Load Engine", category: "devops", color: "#b91c1c", textColor: "#ffffff" },
  { label: "Git Control", category: "devops", color: "#ea580c", textColor: "#ffffff" },
  { label: "Linux / Bash", category: "devops", color: "#334155", textColor: "#ffffff" },
  { label: "Aadhaar eKYC", category: "cloud", color: "#0369a1", textColor: "#ffffff" },
  { label: "GIS Mapping", category: "cloud", color: "#047857", textColor: "#ffffff" },
  { label: "PM2 Cluster", category: "devops", color: "#4f46e5", textColor: "#ffffff" },
];

// Room & Codename Generator Utilities
const ARCADE_PREFIXES = ["NEON", "CYBER", "GRAVITY", "RETRO", "PIXEL", "QUANTUM", "GALAXY", "VECTOR", "SYNTH"];
const ARCADE_ANIMALS = ["FOX", "HAWK", "VIPER", "PULSE", "WOLF", "NODE", "MATRIX", "SPARK", "STORM"];

const generateRandomRoomCode = () => {
  const p = ARCADE_PREFIXES[Math.floor(Math.random() * ARCADE_PREFIXES.length)];
  const a = ARCADE_ANIMALS[Math.floor(Math.random() * ARCADE_ANIMALS.length)];
  const num = Math.floor(Math.random() * 90 + 10);
  return `${p}-${a}-${num}`;
};

const generateRandomPlayerName = () => {
  const handles = ["CyberDev", "NeonGamer", "PixelCoder", "GravMaster", "StackHero", "ByteNinja", "TurboRider"];
  const h = handles[Math.floor(Math.random() * handles.length)];
  const tag = Math.floor(Math.random() * 9000 + 1000);
  return `${h} #${tag}`;
};

export default function GravityPlayground() {
  const [activeTab, setActiveTab] = useState<"sandbox" | "snake" | "tetris" | "whiteboard">("whiteboard");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Multiplayer Room System State
  const [roomCode, setRoomCode] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [isEditingRoom, setIsEditingRoom] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempRoomInput, setTempRoomInput] = useState<string>("");
  const [joinRoomInput, setJoinRoomInput] = useState<string>("");
  const [tempNameInput, setTempNameInput] = useState<string>("");
  const [activeUsersCount, setActiveUsersCount] = useState<number>(2);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);

  // Room Chat State & Session Storage Persistence
  const [chatMessages, setChatMessages] = useState<RoomChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(0);
  const [chatToast, setChatToast] = useState<{ sender: string; text: string } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const triggerChatNotification = useCallback((sender: string, text: string) => {
    setChatToast({ sender, text });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setChatToast(null);
    }, 4500);
  }, []);

  const saveChatMessagesToSession = useCallback((msgs: RoomChatMessage[]) => {
    setChatMessages(msgs);
    if (roomCode && typeof window !== "undefined") {
      sessionStorage.setItem(`arcade_chat_${roomCode}`, JSON.stringify(msgs));
    }
  }, [roomCode]);

  const saveWhiteboardPathsToSession = useCallback((paths: StrokePath[]) => {
    whiteboardPathsRef.current = paths;
    if (roomCode && typeof window !== "undefined") {
      sessionStorage.setItem(`arcade_wb_paths_${roomCode}`, JSON.stringify(paths));
    }
  }, [roomCode]);

  // Helper to switch rooms cleanly across all states and endpoints
  const switchRoom = useCallback((newCode: string) => {
    const cleanCode = newCode.trim().toUpperCase();
    if (!cleanCode) return;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("arcade_current_room_code", cleanCode);
    }
    whiteboardPathsRef.current = [];
    remoteCursorsRef.current = {};
    remoteSnakesRef.current = {};
    setChatMessages([]);
    setUnreadChatCount(0);
    setStrokeCount(0);
    setRoomCode(cleanCode);

    // Fetch initial room snapshot from server API
    fetch(`/api/arcade/room?code=${encodeURIComponent(cleanCode)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.paths)) {
          whiteboardPathsRef.current = data.paths;
          saveWhiteboardPathsToSession(data.paths);
          setStrokeCount((p) => p + 1);
        }
        if (data && Array.isArray(data.chat)) {
          setChatMessages(data.chat);
        }
      })
      .catch(() => {});
  }, [saveWhiteboardPathsToSession]);

  // Initialize Room Code, Player Handle & URL Direct Share Query Auto-Join
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlRoom = searchParams.get("room") || searchParams.get("roomCode");
      const urlTab = searchParams.get("mode") || searchParams.get("tab");
      const savedRoom = sessionStorage.getItem("arcade_current_room_code");
      const savedPlayer = sessionStorage.getItem("arcade_player_name");

      if (urlRoom) {
        switchRoom(urlRoom);
        // Auto-open in fullscreen focus mode directly when visiting shared room link
        setIsFullscreen(true);

        // Smooth scroll directly to the playground
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 200);
      } else if (savedRoom) {
        setRoomCode(savedRoom);
      } else {
        const newRoom = generateRandomRoomCode();
        sessionStorage.setItem("arcade_current_room_code", newRoom);
        setRoomCode(newRoom);
      }

      if (savedPlayer) {
        setPlayerName(savedPlayer);
      } else {
        const newPlayer = generateRandomPlayerName();
        sessionStorage.setItem("arcade_player_name", newPlayer);
        setPlayerName(newPlayer);
      }

      if (urlTab === "whiteboard" || urlTab === "wb" || window.location.hash.includes("whiteboard")) {
        setActiveTab("whiteboard");
      } else if (urlTab) {
        setActiveTab(urlTab as any);
      }

      setActiveUsersCount(Math.floor(Math.random() * 3) + 2);
    }
  }, [switchRoom]);

  const handleShareDirectLink = () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/playground?room=${encodeURIComponent(roomCode)}&mode=whiteboard`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  // Sandbox Physics State
  const [gravityMode, setGravityMode] = useState<"earth" | "zero" | "reverse" | "jupiter" | "attractor">("earth");
  const nodesRef = useRef<PhysicsNode[]>([]);
  const draggedNodeRef = useRef<PhysicsNode | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseHistoryRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const isMouseDownRef = useRef<boolean>(false);
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isTapRef = useRef<boolean>(false);
  const hasRotatedOnCurrentClickRef = useRef<boolean>(false);

  // Collaborative Whiteboard State
  const [wbTool, setWbTool] = useState<"pen" | "line" | "rect" | "circle" | "eraser">("pen");
  const [wbColor, setWbColor] = useState<string>("#0284c7");
  const [wbSize, setWbSize] = useState<number>(6);
  const whiteboardPathsRef = useRef<StrokePath[]>([]);
  const currentStrokeRef = useRef<StrokePath | null>(null);
  const [strokeCount, setStrokeCount] = useState<number>(0);

  // Arcade Game Common State
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [colorTheme, setColorTheme] = useState<"green" | "dark">("green");

  // Snake Game State (Includes Toggleable Self-Bite Crash Option)
  const [selfBiteCrash, setSelfBiteCrash] = useState<boolean>(true);
  const [snakeLength, setSnakeLength] = useState(18);
  const [joystickOffset, setJoystickOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isJoystickActiveRef = useRef<boolean>(false);
  const joystickCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const snakeRef = useRef<SnakeSegment[]>([]);
  const snakeDirRef = useRef<{ x: number; y: number }>({ x: 4, y: 0 });
  const snakeFoodRef = useRef<SnakeFoodDot | null>(null);
  const pendingGrowthRef = useRef<number>(0);
  const gameStartTimeRef = useRef<number>(0);

  // Multiplayer Snake & Whiteboard Real-Time Synchronization Refs
  const playerIdRef = useRef<string>("");
  const playerColorRef = useRef<string>("#a855f7");
  const remoteSnakesRef = useRef<Record<string, { playerId: string; playerName: string; snake: Array<{ x: number; y: number }>; score: number; color: string }>>({});
  const remoteCursorsRef = useRef<Record<string, { playerId: string; playerName: string; x: number; y: number; color: string; lastActive: number }>>({});
  const lastSnakeSyncTimeRef = useRef<number>(0);
  const lastCursorSyncTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = sessionStorage.getItem("arcade_player_id");
      if (!id) {
        id = `p_${Math.random().toString(36).substr(2, 6)}`;
        sessionStorage.setItem("arcade_player_id", id);
      }
      playerIdRef.current = id;

      const colors = ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#06b6d4"];
      playerColorRef.current = colors[Math.floor(Math.random() * colors.length)];
    }
  }, []);

  // Tetris Game State & Refs
  const [tetrisLines, setTetrisLines] = useState(0);
  const [tetrisLevel, setTetrisLevel] = useState(1);
  const tetrisGridRef = useRef<(string | null)[][]>(Array(20).fill(null).map(() => Array(10).fill(null)));
  const currentPieceRef = useRef<{ shape: number[][]; color: string; x: number; y: number } | null>(null);
  const nextPieceRef = useRef<{ shape: number[][]; color: string } | null>(null);
  const tetrisTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fullscreen Toggle Handler (With iPhone / iOS Safari Support)
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const nextState = !prev;
      if (nextState && containerRef.current && containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else if (!nextState && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      return nextState;
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Lock body scroll when in Fullscreen Overlay Mode (Essential for iOS / Safari Mobile)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Session Storage Persistence & Room Sync (Chat & Whiteboard)
  useEffect(() => {
    if (!roomCode) return;
    const chatKey = `arcade_chat_${roomCode}`;
    const wbKey = `arcade_wb_paths_${roomCode}`;
    
    if (typeof window !== "undefined") {
      // Load saved Chat Messages
      const savedChat = sessionStorage.getItem(chatKey);
      if (savedChat) {
        try {
          setChatMessages(JSON.parse(savedChat));
        } catch {
          setChatMessages([]);
        }
      } else {
        const welcomeMsg: RoomChatMessage = {
          id: `welcome-${Date.now()}`,
          sender: "System",
          text: `👋 Connected to #${roomCode}. Chat & whiteboard history saved in session!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystem: true,
        };
        setChatMessages([welcomeMsg]);
        sessionStorage.setItem(chatKey, JSON.stringify([welcomeMsg]));
      }

      // Load saved Whiteboard Paths
      const savedWB = sessionStorage.getItem(wbKey);
      if (savedWB) {
        try {
          whiteboardPathsRef.current = JSON.parse(savedWB);
          setStrokeCount((prev) => prev + 1);
        } catch {
          whiteboardPathsRef.current = [];
        }
      } else {
        whiteboardPathsRef.current = [];
        setStrokeCount((prev) => prev + 1);
      }
    }
  }, [roomCode]);

  const socketRef = useRef<WebSocket | null>(null);
  const [wsConnected, setWsConnected] = useState<boolean>(false);

  // Bi-Directional Full-Duplex WebSocket Frame Emitter (0 HTTP API Overhead)
  const postRoomEventToServer = useCallback((type: string, payload?: unknown) => {
    if (!roomCode) return;
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, payload, roomCode }));
    } else {
      fetch("/api/arcade/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: roomCode, type, payload }),
      }).catch(() => {});
    }
  }, [roomCode]);

  // Real-Time Multi-Window Room Communication Channel (Strokes & Chat)
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (!roomCode || typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const channel = new BroadcastChannel(`gravity_room_${roomCode}`);
    broadcastChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === "WB_STROKE" && payload) {
        const updated = [...whiteboardPathsRef.current, payload];
        saveWhiteboardPathsToSession(updated);
        setStrokeCount((prev) => prev + 1);
      } else if (type === "WB_CLEAR") {
        saveWhiteboardPathsToSession([]);
        setStrokeCount((prev) => prev + 1);
      } else if (type === "WB_UNDO") {
        const updated = [...whiteboardPathsRef.current];
        updated.pop();
        saveWhiteboardPathsToSession(updated);
        setStrokeCount((prev) => prev + 1);
      } else if ((type === "CHAT" || type === "CHAT_MESSAGE") && payload) {
        setChatMessages((prev) => {
          const updated = [...prev, payload];
          if (roomCode && typeof window !== "undefined") {
            sessionStorage.setItem(`arcade_chat_${roomCode}`, JSON.stringify(updated));
          }
          return updated;
        });
        if (payload.sender !== playerName) {
          triggerChatNotification(payload.sender, payload.text);
          if (!isChatOpen) {
            setUnreadChatCount((prev) => prev + 1);
          }
        }
      } else if (type === "SNAKE_UPDATE" && payload) {
        if (payload.playerId && payload.playerId !== playerIdRef.current) {
          remoteSnakesRef.current[payload.playerId] = payload;
          setStrokeCount((prev) => prev + 1);
        }
      } else if (type === "CURSOR_UPDATE" && payload) {
        if (payload.playerId && payload.playerId !== playerIdRef.current) {
          remoteCursorsRef.current[payload.playerId] = { ...payload, lastActive: Date.now() };
          setStrokeCount((prev) => prev + 1);
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [roomCode, isChatOpen, saveWhiteboardPathsToSession, playerName, triggerChatNotification]);

  // REAL-TIME FULL-DUPLEX WEBSOCKET ENGINE (ZERO HTTP API OVERHEAD)
  useEffect(() => {
    if (!roomCode || typeof window === "undefined") return;

    let isMounted = true;
    let ws: WebSocket | null = null;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsHost = process.env.NEXT_PUBLIC_WS_URL || `${wsProtocol}//${window.location.hostname}:3001`;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket(`${wsHost}?room=${encodeURIComponent(roomCode)}`);
        socketRef.current = ws;

        ws.onopen = () => {
          if (isMounted) setWsConnected(true);
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            const { type, payload, room } = data;

            if (type === "INIT_ROOM_STATE" && room) {
              if (Array.isArray(room.paths)) {
                whiteboardPathsRef.current = room.paths as StrokePath[];
                saveWhiteboardPathsToSession(room.paths);
                setStrokeCount((prev) => prev + 1);
              }
              if (Array.isArray(room.chat)) {
                setChatMessages(room.chat as RoomChatMessage[]);
              }
            } else if (type === "WB_STROKE" && payload) {
              whiteboardPathsRef.current.push(payload);
              saveWhiteboardPathsToSession(whiteboardPathsRef.current);
              setStrokeCount((prev) => prev + 1);
            } else if (type === "WB_CLEAR") {
              whiteboardPathsRef.current = [];
              saveWhiteboardPathsToSession([]);
              setStrokeCount((prev) => prev + 1);
            } else if (type === "WB_UNDO") {
              whiteboardPathsRef.current.pop();
              saveWhiteboardPathsToSession(whiteboardPathsRef.current);
              setStrokeCount((prev) => prev + 1);
            } else if (type === "CHAT" && payload) {
              setChatMessages((prev) => {
                const updated = [...prev, payload];
                if (roomCode && typeof window !== "undefined") {
                  sessionStorage.setItem(`arcade_chat_${roomCode}`, JSON.stringify(updated));
                }
                return updated;
              });
              if (payload.sender !== playerName && !payload.isSystem) {
                triggerChatNotification(payload.sender, payload.text);
                if (!isChatOpen) {
                  setUnreadChatCount((p) => p + 1);
                }
              }
            } else if (type === "SNAKE_UPDATE" && payload) {
              if (payload.playerId && payload.playerId !== playerIdRef.current) {
                remoteSnakesRef.current[payload.playerId] = payload;
                setStrokeCount((prev) => prev + 1);
              }
            } else if (type === "CURSOR_UPDATE" && payload) {
              if (payload.playerId && payload.playerId !== playerIdRef.current) {
                remoteCursorsRef.current[payload.playerId] = { ...payload, lastActive: Date.now() };
                setStrokeCount((prev) => prev + 1);
              }
            }
          } catch {
            // Non-JSON frame
          }
        };

        ws.onclose = () => {
          if (isMounted) setWsConnected(false);
        };

        ws.onerror = () => {
          if (isMounted) setWsConnected(false);
        };
      } catch {
        if (isMounted) setWsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (ws) ws.close();
      socketRef.current = null;
    };
  }, [roomCode, playerName, isChatOpen, triggerChatNotification, saveWhiteboardPathsToSession]);

  // Real-Time Server-Sent Events (SSE) Stream Fallback when WebSocket is offline/unavailable
  useEffect(() => {
    if (!roomCode || wsConnected || typeof window === "undefined") return;

    let es: EventSource | null = null;
    try {
      es = new EventSource(`/api/arcade/room/stream?code=${encodeURIComponent(roomCode)}`);
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const { type, payload, room } = data;

          if (type === "INIT_ROOM_STATE" || type === "CONNECTED") {
            if (room && Array.isArray(room.paths)) {
              whiteboardPathsRef.current = room.paths;
              saveWhiteboardPathsToSession(room.paths);
              setStrokeCount((p) => p + 1);
            }
            if (room && Array.isArray(room.chat)) {
              setChatMessages(room.chat);
            }
          } else if (type === "WB_STROKE" && payload) {
            whiteboardPathsRef.current.push(payload);
            saveWhiteboardPathsToSession(whiteboardPathsRef.current);
            setStrokeCount((p) => p + 1);
          } else if (type === "WB_CLEAR") {
            whiteboardPathsRef.current = [];
            saveWhiteboardPathsToSession([]);
            setStrokeCount((p) => p + 1);
          } else if (type === "WB_UNDO") {
            whiteboardPathsRef.current.pop();
            saveWhiteboardPathsToSession(whiteboardPathsRef.current);
            setStrokeCount((p) => p + 1);
          } else if (type === "CHAT" && payload) {
            setChatMessages((prev) => {
              const updated = [...prev, payload];
              if (roomCode && typeof window !== "undefined") {
                sessionStorage.setItem(`arcade_chat_${roomCode}`, JSON.stringify(updated));
              }
              return updated;
            });
          } else if (type === "SNAKE_UPDATE" && payload) {
            if (payload.playerId && payload.playerId !== playerIdRef.current) {
              remoteSnakesRef.current[payload.playerId] = payload;
              setStrokeCount((p) => p + 1);
            }
          } else if (type === "CURSOR_UPDATE" && payload) {
            if (payload.playerId && payload.playerId !== playerIdRef.current) {
              remoteCursorsRef.current[payload.playerId] = { ...payload, lastActive: Date.now() };
              setStrokeCount((p) => p + 1);
            }
          }
        } catch {
          // Non-JSON stream message
        }
      };
    } catch {
      // SSE not supported
    }

    return () => {
      if (es) es.close();
    };
  }, [roomCode, wsConnected, saveWhiteboardPathsToSession]);

  // HTTP Room Sync Polling Engine for Netlify / Serverless Deployments
  useEffect(() => {
    if (!roomCode || wsConnected || typeof window === "undefined") return;

    const pollInterval = setInterval(() => {
      fetch(`/api/arcade/room?code=${encodeURIComponent(roomCode)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.paths)) {
            const currentJson = JSON.stringify(whiteboardPathsRef.current);
            const serverJson = JSON.stringify(data.paths);
            if (currentJson !== serverJson) {
              whiteboardPathsRef.current = data.paths;
              saveWhiteboardPathsToSession(data.paths);
              setStrokeCount((p) => p + 1);
            }
          }
          if (data && Array.isArray(data.chat)) {
            setChatMessages((prev) => {
              const currentJson = JSON.stringify(prev);
              const serverJson = JSON.stringify(data.chat);
              if (currentJson !== serverJson) {
                if (data.chat.length > prev.length) {
                  const lastMsg = data.chat[data.chat.length - 1];
                  if (lastMsg.sender !== playerName && !lastMsg.isSystem) {
                    triggerChatNotification(lastMsg.sender, lastMsg.text);
                    if (!isChatOpen) setUnreadChatCount((u) => u + (data.chat.length - prev.length));
                  }
                }
                if (roomCode && typeof window !== "undefined") {
                  sessionStorage.setItem(`arcade_chat_${roomCode}`, JSON.stringify(data.chat));
                }
                return data.chat;
              }
              return prev;
            });
          }
          if (data && data.cursors) {
            Object.entries(data.cursors).forEach(([id, cursor]: [string, any]) => {
              if (id !== playerIdRef.current) {
                remoteCursorsRef.current[id] = cursor;
              }
            });
            setStrokeCount((p) => p + 1);
          }
        })
        .catch(() => {});
    }, 1200);

    return () => clearInterval(pollInterval);
  }, [roomCode, wsConnected, saveWhiteboardPathsToSession]);

  // Auto-scroll Chat to bottom when new message arrives
  useEffect(() => {
    if (isChatOpen && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  // Room Utility Actions
  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDirectJoinRoom = () => {
    if (joinRoomInput.trim()) {
      switchRoom(joinRoomInput.trim());
      setJoinRoomInput("");
    }
  };

  const handleSaveRoomCode = () => {
    if (tempRoomInput.trim()) {
      switchRoom(tempRoomInput.trim());
    }
    setIsEditingRoom(false);
  };

  const handleSavePlayerName = () => {
    if (tempNameInput.trim()) {
      const cleanName = tempNameInput.trim();
      setPlayerName(cleanName);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("arcade_player_name", cleanName);
      }
    }
    setIsEditingName(false);
  };

  const handleUndoWhiteboard = () => {
    isMouseDownRef.current = false;
    currentStrokeRef.current = null;
    const updated = [...whiteboardPathsRef.current];
    updated.pop();
    whiteboardPathsRef.current = updated;
    saveWhiteboardPathsToSession(updated);
    broadcastChannelRef.current?.postMessage({ type: "WB_UNDO" });
    postRoomEventToServer("WB_UNDO");
    setStrokeCount((prev) => prev + 1);
  };

  const handleClearWhiteboard = () => {
    isMouseDownRef.current = false;
    currentStrokeRef.current = null;
    whiteboardPathsRef.current = [];
    saveWhiteboardPathsToSession([]);
    broadcastChannelRef.current?.postMessage({ type: "WB_CLEAR" });
    postRoomEventToServer("WB_CLEAR");
    setStrokeCount((prev) => prev + 1);
  };

  const handleExportWhiteboardPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `whiteboard-${roomCode}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Chat Actions
  const handleSendChatMessage = (textToSend?: string) => {
    const content = textToSend || chatInput.trim();
    if (!content) return;

    const newMsg: RoomChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: playerName || "Anonymous",
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [...chatMessages, newMsg];
    saveChatMessagesToSession(updated);

    broadcastChannelRef.current?.postMessage({ type: "CHAT_MESSAGE", payload: newMsg });
    postRoomEventToServer("CHAT", newMsg);
    if (!textToSend) setChatInput("");
  };

  const handleClearChatHistory = () => {
    saveChatMessagesToSession([]);
  };

  const toggleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) setUnreadChatCount(0);
  };

  // Initialize Square Nodes with Mobile-Optimized Compact Sizing
  const initNodes = (width: number, height: number) => {
    const isMobile = width < 640;
    const nodes: PhysicsNode[] = TECH_PILLS.map((pill, idx) => {
      const w = isMobile ? Math.max(46, pill.label.length * 6 + 14) : pill.label.length * 8.5 + 24;
      const h = isMobile ? 24 : 34;
      return {
        id: `node-${idx}`,
        label: pill.label,
        category: pill.category,
        color: pill.color,
        textColor: pill.textColor,
        x: Math.random() * Math.max(60, width - w - 40) + 20,
        y: -(idx * (isMobile ? 48 : 70)) - 30,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        angle: 0,
        vAngle: 0,
        width: w,
        height: h,
        zIndex: idx * 10,
        liftScale: 1,
      };
    });
    nodesRef.current = nodes;
  };

  // Add extra square block
  const spawnExtraPill = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = canvas.width < 640;
    const randomPill = TECH_PILLS[Math.floor(Math.random() * TECH_PILLS.length)];
    const w = isMobile ? Math.max(46, randomPill.label.length * 6 + 14) : randomPill.label.length * 8.5 + 24;
    const h = isMobile ? 24 : 34;
    const newNode: PhysicsNode = {
      id: `spawn-${Date.now()}`,
      label: `${randomPill.label} #${nodesRef.current.length + 1}`,
      category: randomPill.category,
      color: randomPill.color,
      textColor: randomPill.textColor,
      x: Math.random() * (canvas.width - w - 20) + 10,
      y: 20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      angle: 0,
      vAngle: 0,
      width: w,
      height: h,
      zIndex: nodesRef.current.length + 100,
      liftScale: 1,
    };
    nodesRef.current.push(newNode);
  };

  // Trigger explosion shockwave at click coordinates
  const triggerShockwave = (cx: number, cy: number) => {
    nodesRef.current.forEach((node) => {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 320) {
        const force = (320 - dist) / 6.5;
        const angle = Math.atan2(dy, dx);
        node.vx += Math.cos(angle) * force;
        node.vy += Math.sin(angle) * force;
        node.zIndex += 50;
      }
    });
  };

  // Spawn Snake Food Dot
  const spawnSnakeFoodDot = (canvasWidth: number, canvasHeight: number) => {
    const marginX = Math.max(40, Math.floor(canvasWidth * 0.08));
    const marginY = Math.max(40, Math.floor(canvasHeight * 0.08));
    snakeFoodRef.current = {
      x: Math.floor(Math.random() * (canvasWidth - marginX * 2)) + marginX,
      y: Math.floor(Math.random() * (canvasHeight - marginY * 2)) + marginY,
      pulseRadius: 8,
    };
  };

  // TETRIS ARCADE ENGINE LOGIC
  const getRandomTetromino = () => {
    const t = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
    return { shape: t.shape, color: t.color };
  };

  const checkTetrisCollision = (piece: { shape: number[][]; x: number; y: number }, grid: (string | null)[][]) => {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const newX = piece.x + c;
          const newY = piece.y + r;
          if (newX < 0 || newX >= 10 || newY >= 20) return true;
          if (newY >= 0 && grid[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  const spawnTetrisPiece = useCallback(() => {
    const next = nextPieceRef.current || getRandomTetromino();
    const newPiece = {
      shape: next.shape,
      color: next.color,
      x: Math.floor((10 - next.shape[0].length) / 2),
      y: 0,
    };
    nextPieceRef.current = getRandomTetromino();

    if (checkTetrisCollision(newPiece, tetrisGridRef.current)) {
      setGameState("gameover");
      currentPieceRef.current = null;
    } else {
      currentPieceRef.current = newPiece;
    }
  }, []);

  const moveTetrisLeft = () => {
    if (!currentPieceRef.current || gameState !== "playing") return;
    const test = { ...currentPieceRef.current, x: currentPieceRef.current.x - 1 };
    if (!checkTetrisCollision(test, tetrisGridRef.current)) {
      currentPieceRef.current.x -= 1;
    }
  };

  const moveTetrisRight = () => {
    if (!currentPieceRef.current || gameState !== "playing") return;
    const test = { ...currentPieceRef.current, x: currentPieceRef.current.x + 1 };
    if (!checkTetrisCollision(test, tetrisGridRef.current)) {
      currentPieceRef.current.x += 1;
    }
  };

  // Robust 90° Clockwise Rotation with Wall Kick Offsets
  const rotateTetris = () => {
    if (!currentPieceRef.current || gameState !== "playing") return;
    const shape = currentPieceRef.current.shape;

    const rotated = shape[0].map((_, colIndex) => shape.map((row) => row[colIndex]).reverse());

    const kickOffsets = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ];

    for (const offset of kickOffsets) {
      const test = {
        ...currentPieceRef.current,
        shape: rotated,
        x: currentPieceRef.current.x + offset.x,
        y: currentPieceRef.current.y + offset.y,
      };
      if (!checkTetrisCollision(test, tetrisGridRef.current)) {
        currentPieceRef.current.shape = rotated;
        currentPieceRef.current.x += offset.x;
        currentPieceRef.current.y += offset.y;
        return;
      }
    }
  };

  const dropTetrisPiece = useCallback(() => {
    if (!currentPieceRef.current || gameState !== "playing") return;
    const test = { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 };
    if (!checkTetrisCollision(test, tetrisGridRef.current)) {
      currentPieceRef.current.y += 1;
    } else {
      const piece = currentPieceRef.current;
      const grid = tetrisGridRef.current;
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c]) {
            const gy = piece.y + r;
            const gx = piece.x + c;
            if (gy >= 0 && gy < 20 && gx >= 0 && gx < 10) {
              grid[gy][gx] = piece.color;
            }
          }
        }
      }

      let cleared = 0;
      for (let r = 19; r >= 0; r--) {
        if (grid[r].every((cell) => cell !== null)) {
          grid.splice(r, 1);
          grid.unshift(Array(10).fill(null));
          cleared++;
          r++;
        }
      }

      if (cleared > 0) {
        const points = [0, 100, 300, 500, 800][cleared] || 1000;
        setScore((prev) => {
          const nextScore = prev + points;
          if (nextScore > highScore) setHighScore(nextScore);
          return nextScore;
        });
        setTetrisLines((prev) => {
          const totalLines = prev + cleared;
          setTetrisLevel(Math.floor(totalLines / 10) + 1);
          return totalLines;
        });
      }

      spawnTetrisPiece();
    }
  }, [gameState, highScore, spawnTetrisPiece]);

  const hardDropTetris = () => {
    if (!currentPieceRef.current || gameState !== "playing") return;
    while (!checkTetrisCollision({ ...currentPieceRef.current, y: currentPieceRef.current.y + 1 }, tetrisGridRef.current)) {
      currentPieceRef.current.y += 1;
    }
    dropTetrisPiece();
  };

  const isPointOnActivePiece = (cx: number, cy: number) => {
    const canvas = canvasRef.current;
    const piece = currentPieceRef.current;
    if (!canvas || !piece) return false;

    const gridCols = 10;
    const gridRows = 20;
    const reservedBottomMargin = 85;
    const availableHeight = canvas.height - reservedBottomMargin;
    const availableWidth = canvas.width - (canvas.width < 640 ? 30 : 160);

    const cellFromHeight = Math.floor(availableHeight / gridRows);
    const cellFromWidth = Math.floor(availableWidth / gridCols);
    const cellSize = Math.max(18, Math.min(cellFromHeight, cellFromWidth));

    const boardWidth = gridCols * cellSize;
    const boardHeight = gridRows * cellSize;
    const startX = Math.floor((canvas.width - boardWidth) / 2);
    const startY = Math.max(12, Math.floor((canvas.height - boardHeight - 50) / 2));

    const pxMin = startX + piece.x * cellSize;
    const pxMax = pxMin + piece.shape[0].length * cellSize;
    const pyMin = startY + piece.y * cellSize;
    const pyMax = pyMin + piece.shape.length * cellSize;

    return cx >= pxMin - 20 && cx <= pxMax + 20 && cy >= pyMin - 20 && cy <= pyMax + 20;
  };

  const updateTetrisPositionFromX = (mx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !currentPieceRef.current || gameState !== "playing") return;

    const gridCols = 10;
    const gridRows = 20;
    const reservedBottomMargin = 85;
    const availableHeight = canvas.height - reservedBottomMargin;
    const availableWidth = canvas.width - (canvas.width < 640 ? 30 : 160);

    const cellFromHeight = Math.floor(availableHeight / gridRows);
    const cellFromWidth = Math.floor(availableWidth / gridCols);
    const cellSize = Math.max(18, Math.min(cellFromHeight, cellFromWidth));

    const boardWidth = gridCols * cellSize;
    const startX = Math.floor((canvas.width - boardWidth) / 2);

    const relX = mx - startX;
    const pieceWidthCols = currentPieceRef.current.shape[0].length;
    let targetCol = Math.floor((relX - (pieceWidthCols * cellSize) / 2) / cellSize) + 1;

    targetCol = Math.max(0, Math.min(10 - pieceWidthCols, targetCol));

    const test = { ...currentPieceRef.current, x: targetCol };
    if (!checkTetrisCollision(test, tetrisGridRef.current)) {
      currentPieceRef.current.x = targetCol;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === "tetris" && gameState === "playing") {
        if (e.key === "ArrowLeft" || e.key === "a") moveTetrisLeft();
        if (e.key === "ArrowRight" || e.key === "d") moveTetrisRight();
        if (e.key === "ArrowUp" || e.key === "w") rotateTetris();
        if (e.key === "ArrowDown" || e.key === "s") dropTetrisPiece();
        if (e.key === " ") { e.preventDefault(); hardDropTetris(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, gameState, dropTetrisPiece]);

  // Draw Remote Player Live Vector Cursors
  const drawRemoteCursors = useCallback((ctx: CanvasRenderingContext2D) => {
    const now = Date.now();
    Object.values(remoteCursorsRef.current).forEach((cur) => {
      if (now - cur.lastActive > 4000) return;

      ctx.save();
      const { x, y, color, playerName: pName } = cur;

      // Pointer Arrow Path
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 16);
      ctx.lineTo(4, 12);
      ctx.lineTo(9, 19);
      ctx.lineTo(12, 17);
      ctx.lineTo(7, 10);
      ctx.lineTo(13, 10);
      ctx.closePath();

      ctx.fillStyle = color || "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Floating Player Handle Badge
      ctx.font = "bold 10px monospace";
      const nameText = `🎯 ${pName}`;
      const textWidth = ctx.measureText(nameText).width;

      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.beginPath();
      ctx.rect(10, 10, textWidth + 12, 18);
      ctx.fill();
      ctx.strokeStyle = color || "#3b82f6";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.fillText(nameText, 16, 23);

      ctx.restore();
    });
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isMobile = canvas.width < 640;

      if (activeTab === "sandbox") {
        let g = 0.45;
        if (gravityMode === "zero") g = 0;
        if (gravityMode === "reverse") g = -0.45;
        if (gravityMode === "jupiter") g = 1.2;

        const friction = 0.985;
        const bounce = 0.72;
        const nodes = nodesRef.current;

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];

            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const overlapX = (n1.width + n2.width) / 2 - Math.abs(dx);
            const overlapY = (n1.height + n2.height) / 2 - Math.abs(dy);

            if (overlapX > 0 && overlapY > 0) {
              const sx = dx > 0 ? 1 : -1;
              const sy = dy > 0 ? 1 : -1;

              if (n1.isDragging && !n2.isDragging) {
                const dragSpeed = Math.sqrt(n1.vx * n1.vx + n1.vy * n1.vy);
                const pushForce = Math.max(dragSpeed * 0.9, 4);
                n2.vx += n1.vx * 0.8 + sx * pushForce;
                n2.vy += n1.vy * 0.8 + sy * pushForce;
                n2.x += sx * overlapX;
                n2.y += sy * overlapY;
                n2.zIndex += 20;
                continue;
              } else if (n2.isDragging && !n1.isDragging) {
                const dragSpeed = Math.sqrt(n2.vx * n2.vx + n2.vy * n2.vy);
                const pushForce = Math.max(dragSpeed * 0.9, 4);
                n1.vx += n2.vx * 0.8 - sx * pushForce;
                n1.vy += n2.vy * 0.8 - sy * pushForce;
                n1.x -= sx * overlapX;
                n1.y -= sy * overlapY;
                n1.zIndex += 20;
                continue;
              }

              if (overlapX < overlapY) {
                if (!n1.isDragging) n1.x -= (overlapX / 2) * sx;
                if (!n2.isDragging) n2.x += (overlapX / 2) * sx;

                const tempVx = n1.vx;
                if (!n1.isDragging) n1.vx = n2.vx * bounce;
                if (!n2.isDragging) n2.vx = tempVx * bounce;
              } else {
                if (!n1.isDragging) n1.y -= (overlapY / 2) * sy;
                if (!n2.isDragging) n2.y += (overlapY / 2) * sy;

                const tempVy = n1.vy;
                if (!n1.isDragging) n1.vy = n2.vy * bounce;
                if (!n2.isDragging) n2.vy = tempVy * bounce;
              }
            }
          }
        }

        nodes.forEach((node) => {
          if (node.isDragging) {
            const targetX = mousePosRef.current.x - dragOffsetRef.current.x;
            const targetY = mousePosRef.current.y - dragOffsetRef.current.y;
            const dx = targetX - node.x;
            const dy = targetY - node.y;

            const stiffness = 0.28;
            const damping = 0.65;
            node.vx = (node.vx + dx * stiffness) * damping;
            node.vy = (node.vy + dy * stiffness) * damping;
            node.x += node.vx;
            node.y += node.vy;

            const targetAngle = Math.max(-0.15, Math.min(0.15, node.vx * 0.015));
            node.angle += (targetAngle - node.angle) * 0.2;

            node.liftScale = Math.min(1.14, (node.liftScale || 1) + 0.02);
            node.zIndex = 999999;
          } else {
            node.liftScale = Math.max(1, (node.liftScale || 1) - 0.03);

            node.angle *= 0.85;
            if (Math.abs(node.angle) < 0.001) node.angle = 0;

            if (gravityMode === "attractor" && isMouseDownRef.current) {
              const dx = mousePosRef.current.x - node.x;
              const dy = mousePosRef.current.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 10) {
                node.vx += (dx / dist) * 1.3;
                node.vy += (dy / dist) * 1.3;
              }
            } else {
              node.vy += g;
            }

            node.vx *= friction;
            node.vy *= friction;

            node.x += node.vx;
            node.y += node.vy;

            if (!node.isDragging) {
              node.zIndex = Math.floor(node.y * 10);
            }
          }

          const halfW = node.width / 2;
          const halfH = node.height / 2;

          if (node.x - halfW < 0) {
            node.x = halfW;
            node.vx = -node.vx * bounce;
          }
          if (node.x + halfW > canvas.width) {
            node.x = canvas.width - halfW;
            node.vx = -node.vx * bounce;
          }
          if (node.y - halfH < 0) {
            node.y = halfH;
            node.vy = -node.vy * bounce;
          }
          if (node.y + halfH > canvas.height) {
            node.y = canvas.height - halfH;
            node.vy = -node.vy * bounce;
            node.angle = 0;
          }
        });

        const sortedNodes = [...nodes].sort((a, b) => a.zIndex - b.zIndex);

        sortedNodes.forEach((node) => {
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.angle);

          const scale = node.liftScale || 1;
          ctx.scale(scale, scale);

          if (node.isDragging) {
            ctx.shadowColor = "rgba(15, 23, 42, 0.4)";
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 12;
          } else {
            ctx.shadowColor = "rgba(15, 23, 42, 0.12)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 2;
          }

          ctx.beginPath();
          ctx.rect(-node.width / 2, -node.height / 2, node.width, node.height);
          ctx.fillStyle = node.color;
          ctx.fill();

          ctx.lineWidth = node.isDragging ? 2 : 1;
          ctx.strokeStyle = node.isDragging ? "#38bdf8" : "rgba(255, 255, 255, 0.35)";
          ctx.stroke();

          ctx.shadowColor = "transparent";
          ctx.fillStyle = node.textColor;
          ctx.font = `${node.isDragging ? "bold" : "600"} ${isMobile ? "9px" : "11px"} var(--font-mono), monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, 0, 1);

          ctx.restore();

          if (node.isDragging) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(mousePosRef.current.x, mousePosRef.current.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.restore();
          }
        });
      } else if (activeTab === "snake" && gameState === "playing") {
        const snake = snakeRef.current;
        if (snake.length > 0) {
          const head = snake[0];
          const baseSpeed = difficulty === "easy" ? 3.2 : difficulty === "hard" ? 5.8 : 4.2;

          if (isMouseDownRef.current && !isJoystickActiveRef.current) {
            const dx = mousePosRef.current.x - head.x;
            const dy = mousePosRef.current.y - head.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 5) {
              snakeDirRef.current = {
                x: (dx / dist) * baseSpeed,
                y: (dy / dist) * baseSpeed,
              };
            }
          }

          const newHead = {
            x: head.x + snakeDirRef.current.x,
            y: head.y + snakeDirRef.current.y,
          };

          let didWrap = false;
          if (newHead.x < 0) { newHead.x = canvas.width; didWrap = true; }
          if (newHead.x > canvas.width) { newHead.x = 0; didWrap = true; }
          if (newHead.y < 0) { newHead.y = canvas.height; didWrap = true; }
          if (newHead.y > canvas.height) { newHead.y = 0; didWrap = true; }

          const timeSinceStart = Date.now() - gameStartTimeRef.current;
          if (selfBiteCrash && !didWrap && timeSinceStart > 2000 && snake.length > 28) {
            for (let i = 28; i < snake.length; i++) {
              const seg = snake[i];
              const dx = Math.abs(newHead.x - seg.x);
              const dy = Math.abs(newHead.y - seg.y);
              if (dx > canvas.width / 2 || dy > canvas.height / 2) continue;

              const dist = Math.hypot(dx, dy);
              if (dist < 10) {
                setGameState("gameover");
                break;
              }
            }
          }

          snake.unshift(newHead);

          const food = snakeFoodRef.current;
          if (food) {
            const distFood = Math.hypot(newHead.x - food.x, newHead.y - food.y);
            if (distFood < 22) {
              setScore((prev) => {
                const newScore = prev + (difficulty === "hard" ? 20 : difficulty === "easy" ? 5 : 10);
                if (newScore > highScore) setHighScore(newScore);
                return newScore;
              });
              pendingGrowthRef.current += 6;
              setSnakeLength(snake.length + pendingGrowthRef.current);
              spawnSnakeFoodDot(canvas.width, canvas.height);
            } else {
              if (pendingGrowthRef.current > 0) {
                pendingGrowthRef.current -= 1;
              } else {
                snake.pop();
              }
            }
          }

          if (colorTheme === "green") {
            ctx.fillStyle = "#9bbc0f";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(15, 56, 15, 0.12)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 24) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 24) {
              ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
          } else {
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(226, 232, 240, 0.08)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 24) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 24) {
              ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
          }

          if (food) {
            ctx.save();
            const pulse = (Math.sin(Date.now() * 0.008) + 1) * 3 + 8;
            ctx.beginPath();
            ctx.arc(food.x, food.y, pulse + 6, 0, Math.PI * 2);
            ctx.fillStyle = colorTheme === "green" ? "rgba(15, 56, 15, 0.2)" : "rgba(56, 189, 248, 0.25)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(food.x, food.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = colorTheme === "green" ? "#0f380f" : "#38bdf8";
            ctx.fill();

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
          }

          ctx.save();
          ctx.beginPath();
          snake.forEach((seg, i) => {
            if (i === 0) ctx.moveTo(seg.x, seg.y);
            else {
              const prev = snake[i - 1];
              const dx = Math.abs(seg.x - prev.x);
              const dy = Math.abs(seg.y - prev.y);
              if (dx > canvas.width / 2 || dy > canvas.height / 2) ctx.moveTo(seg.x, seg.y);
              else ctx.lineTo(seg.x, seg.y);
            }
          });
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = 18;
          ctx.strokeStyle = colorTheme === "green" ? "#0f380f" : "#0284c7";
          ctx.stroke();

          ctx.lineWidth = 14;
          ctx.strokeStyle = colorTheme === "green" ? "#306230" : "#38bdf8";
          ctx.stroke();
          ctx.restore();

          const headAngle = Math.atan2(snakeDirRef.current.y, snakeDirRef.current.x);

          snake.forEach((seg, idx) => {
            ctx.save();
            ctx.translate(seg.x, seg.y);
            const radius = Math.max(3.5, 11 - (idx / snake.length) * 8);

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);

            if (idx === 0) {
              ctx.rotate(headAngle);
              ctx.fillStyle = colorTheme === "green" ? "#0f380f" : "#0f172a";
              ctx.fill();
              ctx.strokeStyle = colorTheme === "green" ? "#9bbc0f" : "#38bdf8";
              ctx.lineWidth = 2;
              ctx.stroke();

              ctx.fillStyle = colorTheme === "green" ? "#9bbc0f" : "#ffffff";
              ctx.beginPath();
              ctx.arc(4, -5, 3, 0, Math.PI * 2);
              ctx.arc(4, 5, 3, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = "#000000";
              ctx.beginPath();
              ctx.arc(5, -5, 1.5, 0, Math.PI * 2);
              ctx.arc(5, 5, 1.5, 0, Math.PI * 2);
              ctx.fill();

              if (Math.floor(Date.now() / 220) % 2 === 0) {
                ctx.beginPath();
                ctx.moveTo(11, 0); ctx.lineTo(20, 0); ctx.lineTo(24, -3);
                ctx.moveTo(20, 0); ctx.lineTo(24, 3);
                ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 2; ctx.stroke();
              }
            } else {
              ctx.fillStyle = colorTheme === "green" ? (idx % 2 === 0 ? "#0f380f" : "#306230") : (idx % 2 === 0 ? "#0284c7" : "#0369a1");
              ctx.fill();
            }
            ctx.restore();
          });

          // Sync local snake position with room endpoint every 200ms when playing
          if (gameState === "playing") {
            const now = Date.now();
            if (now - lastSnakeSyncTimeRef.current > 200) {
              lastSnakeSyncTimeRef.current = now;
              const snakePayload = {
                playerId: playerIdRef.current,
                playerName: playerName || "Anonymous",
                snake: snakeRef.current.slice(0, 35),
                score,
                color: playerColorRef.current,
              };
              postRoomEventToServer("SNAKE_UPDATE", snakePayload);
              broadcastChannelRef.current?.postMessage({ type: "SNAKE_UPDATE", payload: snakePayload });
            }
          }

          // RENDER MULTIPLAYER ROOM REMOTE SNAKES & PARTICIPANTS
          Object.values(remoteSnakesRef.current).forEach((rPlayer) => {
            const rSnake = rPlayer.snake;
            if (!rSnake || rSnake.length === 0) return;

            ctx.save();
            ctx.beginPath();
            rSnake.forEach((seg, i) => {
              if (i === 0) ctx.moveTo(seg.x, seg.y);
              else {
                const prev = rSnake[i - 1];
                const dx = Math.abs(seg.x - prev.x);
                const dy = Math.abs(seg.y - prev.y);
                if (dx > canvas.width / 2 || dy > canvas.height / 2) ctx.moveTo(seg.x, seg.y);
                else ctx.lineTo(seg.x, seg.y);
              }
            });
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = 15;
            ctx.strokeStyle = rPlayer.color || "#a855f7";
            ctx.stroke();

            // Render Remote Head & Player Tag Badge
            const rHead = rSnake[0];
            if (rHead) {
              ctx.beginPath();
              ctx.arc(rHead.x, rHead.y, 9, 0, Math.PI * 2);
              ctx.fillStyle = rPlayer.color || "#a855f7";
              ctx.fill();
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 2;
              ctx.stroke();

              ctx.font = "bold 11px monospace";
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.shadowColor = "rgba(0,0,0,0.8)";
              ctx.shadowBlur = 4;
              ctx.fillText(`🎮 ${rPlayer.playerName} (${rPlayer.score}pt)`, rHead.x, rHead.y - 14);
            }
            ctx.restore();
          });

          // Draw Remote Player Live Cursors
          drawRemoteCursors(ctx);
        }
      } else if (activeTab === "tetris") {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gridCols = 10;
        const gridRows = 20;
        const reservedBottomMargin = 85;
        const availableHeight = canvas.height - reservedBottomMargin;
        const availableWidth = canvas.width - (canvas.width < 640 ? 30 : 160);

        const cellFromHeight = Math.floor(availableHeight / gridRows);
        const cellFromWidth = Math.floor(availableWidth / gridCols);
        const cellSize = Math.max(18, Math.min(cellFromHeight, cellFromWidth));

        const boardWidth = gridCols * cellSize;
        const boardHeight = gridRows * cellSize;
        const startX = Math.floor((canvas.width - boardWidth) / 2);
        const startY = Math.max(12, Math.floor((canvas.height - boardHeight - (gameState === "playing" ? 50 : 10)) / 2));

        ctx.save();
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(startX - 6, startY - 6, boardWidth + 12, boardHeight + 12);
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX - 6, startY - 6, boardWidth + 12, boardHeight + 12);

        ctx.fillStyle = "#090d16";
        ctx.fillRect(startX, startY, boardWidth, boardHeight);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        for (let c = 0; c <= gridCols; c++) {
          ctx.beginPath(); ctx.moveTo(startX + c * cellSize, startY); ctx.lineTo(startX + c * cellSize, startY + boardHeight); ctx.stroke();
        }
        for (let r = 0; r <= gridRows; r++) {
          ctx.beginPath(); ctx.moveTo(startX, startY + r * cellSize); ctx.lineTo(startX + boardWidth, startY + r * cellSize); ctx.stroke();
        }

        const grid = tetrisGridRef.current;
        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            if (grid[r][c]) {
              const bx = startX + c * cellSize;
              const by = startY + r * cellSize;
              ctx.fillStyle = grid[r][c]!;
              ctx.fillRect(bx + 1, by + 1, cellSize - 2, cellSize - 2);
              ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
              ctx.fillRect(bx + 1, by + 1, cellSize - 2, 3);
            }
          }
        }

        const piece = currentPieceRef.current;
        if (piece && gameState === "playing") {
          let ghostY = piece.y;
          while (!checkTetrisCollision({ shape: piece.shape, x: piece.x, y: ghostY + 1 }, grid)) {
            ghostY++;
          }

          for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
              if (piece.shape[r][c]) {
                const gx = startX + (piece.x + c) * cellSize;
                const gy = startY + (ghostY + r) * cellSize;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
                ctx.lineWidth = 1.5;
                ctx.strokeRect(gx + 2, gy + 2, cellSize - 4, cellSize - 4);
              }
            }
          }

          for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
              if (piece.shape[r][c]) {
                const bx = startX + (piece.x + c) * cellSize;
                const by = startY + (piece.y + r) * cellSize;
                ctx.fillStyle = piece.color;
                ctx.fillRect(bx + 1, by + 1, cellSize - 2, cellSize - 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.fillRect(bx + 1, by + 1, cellSize - 2, 3);
              }
            }
          }
        }

        const nextP = nextPieceRef.current;
        if (nextP) {
          const previewX = startX + boardWidth + 14;
          const previewY = startY;
          const previewW = Math.max(64, Math.min(90, cellSize * 3.2));
          const previewH = Math.max(64, Math.min(90, cellSize * 3.2));
          if (previewX + previewW < canvas.width + 10) {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(previewX, previewY, previewW, previewH);
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1;
            ctx.strokeRect(previewX, previewY, previewW, previewH);

            ctx.fillStyle = "#94a3b8";
            ctx.font = `bold ${Math.max(9, Math.floor(cellSize * 0.38))}px var(--font-mono), monospace`;
            ctx.fillText("NEXT", previewX + 10, previewY + 16);

            const pCell = Math.max(10, Math.floor(cellSize * 0.45));
            for (let r = 0; r < nextP.shape.length; r++) {
              for (let c = 0; c < nextP.shape[r].length; c++) {
                if (nextP.shape[r][c]) {
                  const px = previewX + 14 + c * pCell;
                  const py = previewY + 28 + r * pCell;
                  ctx.fillStyle = nextP.color;
                  ctx.fillRect(px, py, pCell - 1, pCell - 1);
                }
              }
            }
          }
        }

        ctx.restore();
      } else if (activeTab === "whiteboard") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(226, 232, 240, 0.7)";
        ctx.lineWidth = 1;
        const gridGap = 32;
        for (let x = 0; x < canvas.width; x += gridGap) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridGap) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        const allPaths = [...whiteboardPathsRef.current];
        if (currentStrokeRef.current) allPaths.push(currentStrokeRef.current);

        allPaths.forEach((path) => {
          if (path.points.length === 0) return;
          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (path.tool === "eraser") {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = path.size * 2.5;
          } else {
            ctx.strokeStyle = path.color;
            ctx.lineWidth = path.size;
          }

          if (path.tool === "pen" || path.tool === "eraser") {
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);
            for (let i = 1; i < path.points.length; i++) {
              ctx.lineTo(path.points[i].x, path.points[i].y);
            }
            ctx.stroke();
          } else if (path.tool === "line" && path.points.length >= 2) {
            const start = path.points[0];
            const end = path.points[path.points.length - 1];
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          } else if (path.tool === "rect" && path.points.length >= 2) {
            const start = path.points[0];
            const end = path.points[path.points.length - 1];
            const w = end.x - start.x;
            const h = end.y - start.y;
            ctx.beginPath();
            ctx.rect(start.x, start.y, w, h);
            ctx.stroke();
          } else if (path.tool === "circle" && path.points.length >= 2) {
            const start = path.points[0];
            const end = path.points[path.points.length - 1];
            const rx = Math.abs(end.x - start.x) / 2;
            const ry = Math.abs(end.y - start.y) / 2;
            const cx = start.x + (end.x - start.x) / 2;
            const cy = start.y + (end.y - start.y) / 2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        });

        // Draw Remote Player Live Cursors
        drawRemoteCursors(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, gravityMode, gameState, highScore, colorTheme, isFullscreen, difficulty, selfBiteCrash, strokeCount, wbTool, wbColor, wbSize, roomCode]);

  useEffect(() => {
    if (activeTab === "tetris" && gameState === "playing") {
      const dropSpeed = difficulty === "easy" ? 750 : difficulty === "hard" ? 220 : 450;
      tetrisTimerRef.current = setInterval(() => {
        dropTetrisPiece();
      }, dropSpeed);
    }
    return () => {
      if (tetrisTimerRef.current) clearInterval(tetrisTimerRef.current);
    };
  }, [activeTab, gameState, difficulty, dropTetrisPiece]);

  const handleJoystickMove = (clientX: number, clientY: number) => {
    if (!joystickCenterRef.current) return;
    const dx = clientX - joystickCenterRef.current.x;
    const dy = clientY - joystickCenterRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 45;

    const clampedDist = Math.min(maxRadius, dist);
    const angle = Math.atan2(dy, dx);

    const handleX = Math.cos(angle) * clampedDist;
    const handleY = Math.sin(angle) * clampedDist;
    setJoystickOffset({ x: handleX, y: handleY });

    if (dist > 5) {
      const speed = difficulty === "easy" ? 3.2 : difficulty === "hard" ? 5.8 : 4.2;
      snakeDirRef.current = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
    }
  };

  const handleJoystickStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    isJoystickActiveRef.current = true;

    const target = e.currentTarget.getBoundingClientRect();
    joystickCenterRef.current = {
      x: target.left + target.width / 2,
      y: target.top + target.height / 2,
    };

    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    handleJoystickMove(clientX, clientY);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: MouseEvent | TouchEvent) => {
      if (isJoystickActiveRef.current) {
        const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
        handleJoystickMove(clientX, clientY);
      }
    };

    const handleGlobalPointerUp = () => {
      if (isJoystickActiveRef.current) {
        isJoystickActiveRef.current = false;
        setJoystickOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleGlobalPointerMove);
    window.addEventListener("mouseup", handleGlobalPointerUp);
    window.addEventListener("touchmove", handleGlobalPointerMove);
    window.addEventListener("touchend", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalPointerMove);
      window.removeEventListener("mouseup", handleGlobalPointerUp);
      window.removeEventListener("touchmove", handleGlobalPointerMove);
      window.removeEventListener("touchend", handleGlobalPointerUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    mousePosRef.current = { x: mx, y: my };
    touchStartPosRef.current = { x: mx, y: my };
    isTapRef.current = true;
    hasRotatedOnCurrentClickRef.current = false;
    mouseHistoryRef.current = [{ x: mx, y: my, time: Date.now() }];
    isMouseDownRef.current = true;

    if (activeTab === "sandbox") {
      let found: PhysicsNode | null = null;
      const sortedDesc = [...nodesRef.current].sort((a, b) => b.zIndex - a.zIndex);
      for (let i = 0; i < sortedDesc.length; i++) {
        const node = sortedDesc[i];
        const halfW = node.width / 2;
        const halfH = node.height / 2;
        if (mx >= node.x - halfW && mx <= node.x + halfW && my >= node.y - halfH && my <= node.y + halfH) {
          found = node;
          break;
        }
      }

      if (found) {
        found.isDragging = true;
        found.vx = 0;
        found.vy = 0;
        found.zIndex = 999999;
        draggedNodeRef.current = found;
        dragOffsetRef.current = { x: mx - found.x, y: my - found.y };
      } else {
        triggerShockwave(mx, my);
      }
    } else if (activeTab === "tetris" && gameState === "playing") {
      if (isPointOnActivePiece(mx, my)) {
        rotateTetris();
        hasRotatedOnCurrentClickRef.current = true;
      } else {
        updateTetrisPositionFromX(mx);
      }
    } else if (activeTab === "whiteboard") {
      currentStrokeRef.current = {
        tool: wbTool,
        color: wbColor,
        size: wbSize,
        points: [{ x: mx, y: my }],
        author: playerName,
      };
      setStrokeCount((prev) => prev + 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (Math.hypot(mx - touchStartPosRef.current.x, my - touchStartPosRef.current.y) > 10) {
      isTapRef.current = false;
    }

    mousePosRef.current = { x: mx, y: my };
    const now = Date.now();

    mouseHistoryRef.current.push({ x: mx, y: my, time: now });
    if (mouseHistoryRef.current.length > 5) {
      mouseHistoryRef.current.shift();
    }

    if (activeTab === "whiteboard" || activeTab === "snake") {
      if (now - lastCursorSyncTimeRef.current > 70) {
        lastCursorSyncTimeRef.current = now;
        const cursorPayload = {
          playerId: playerIdRef.current,
          playerName: playerName || "Anonymous",
          x: mx,
          y: my,
          color: playerColorRef.current,
        };
        broadcastChannelRef.current?.postMessage({ type: "CURSOR_UPDATE", payload: cursorPayload });
        postRoomEventToServer("CURSOR_UPDATE", cursorPayload);
      }
    }

    if (activeTab === "tetris" && isMouseDownRef.current && gameState === "playing" && !hasRotatedOnCurrentClickRef.current) {
      updateTetrisPositionFromX(mx);
    } else if (activeTab === "whiteboard" && isMouseDownRef.current && currentStrokeRef.current) {
      currentStrokeRef.current.points.push({ x: mx, y: my });
      setStrokeCount((prev) => prev + 1);
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;

    if (activeTab === "tetris" && isTapRef.current && !hasRotatedOnCurrentClickRef.current && gameState === "playing") {
      rotateTetris();
      hasRotatedOnCurrentClickRef.current = true;
    }

    if (activeTab === "whiteboard" && currentStrokeRef.current) {
      const updated = [...whiteboardPathsRef.current, currentStrokeRef.current];
      saveWhiteboardPathsToSession(updated);
      broadcastChannelRef.current?.postMessage({ type: "WB_STROKE", payload: currentStrokeRef.current });
      postRoomEventToServer("WB_STROKE", currentStrokeRef.current);
      currentStrokeRef.current = null;
      setStrokeCount((prev) => prev + 1);
    }

    if (draggedNodeRef.current) {
      const node = draggedNodeRef.current;
      node.isDragging = false;

      const history = mouseHistoryRef.current;
      if (history.length >= 2) {
        const first = history[0];
        const last = history[history.length - 1];
        const dt = (last.time - first.time) / 1000;
        if (dt > 0) {
          const vx = ((last.x - first.x) / dt) * 0.032;
          const vy = ((last.y - first.y) / dt) * 0.032;
          node.vx = vx;
          node.vy = vy;
        }
      }

      draggedNodeRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;

    mousePosRef.current = { x: tx, y: ty };
    touchStartPosRef.current = { x: tx, y: ty };
    isTapRef.current = true;
    hasRotatedOnCurrentClickRef.current = false;
    isMouseDownRef.current = true;

    if (activeTab === "sandbox") {
      let found: PhysicsNode | null = null;
      const sortedDesc = [...nodesRef.current].sort((a, b) => b.zIndex - a.zIndex);
      for (let i = 0; i < sortedDesc.length; i++) {
        const node = sortedDesc[i];
        const halfW = node.width / 2;
        const halfH = node.height / 2;
        if (tx >= node.x - halfW && tx <= node.x + halfW && ty >= node.y - halfH && ty <= node.y + halfH) {
          found = node;
          break;
        }
      }

      if (found) {
        found.isDragging = true;
        found.vx = 0;
        found.vy = 0;
        found.zIndex = 999999;
        draggedNodeRef.current = found;
        dragOffsetRef.current = { x: tx - found.x, y: ty - found.y };
      } else {
        triggerShockwave(tx, ty);
      }
    } else if (activeTab === "tetris" && gameState === "playing") {
      if (isPointOnActivePiece(tx, ty)) {
        rotateTetris();
        hasRotatedOnCurrentClickRef.current = true;
      } else {
        updateTetrisPositionFromX(tx);
      }
    } else if (activeTab === "whiteboard") {
      currentStrokeRef.current = {
        tool: wbTool,
        color: wbColor,
        size: wbSize,
        points: [{ x: tx, y: ty }],
        author: playerName,
      };
      setStrokeCount((prev) => prev + 1);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;

    if (Math.hypot(tx - touchStartPosRef.current.x, ty - touchStartPosRef.current.y) > 10) {
      isTapRef.current = false;
    }

    mousePosRef.current = { x: tx, y: ty };

    if (activeTab === "tetris" && gameState === "playing" && !hasRotatedOnCurrentClickRef.current) {
      updateTetrisPositionFromX(tx);
    } else if (activeTab === "whiteboard" && isMouseDownRef.current && currentStrokeRef.current) {
      currentStrokeRef.current.points.push({ x: tx, y: ty });
      setStrokeCount((prev) => prev + 1);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const startMiniGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (activeTab === "snake") {
      const startX = canvas.width / 2;
      const startY = canvas.height / 2;
      const initialSnake: SnakeSegment[] = [];
      for (let i = 0; i < 28; i++) {
        initialSnake.push({ x: startX - i * 5, y: startY });
      }

      snakeRef.current = initialSnake;
      snakeDirRef.current = { x: 4, y: 0 };
      pendingGrowthRef.current = 0;
      gameStartTimeRef.current = Date.now();
      setScore(0);
      setSnakeLength(28);
      setGameState("playing");
      spawnSnakeFoodDot(canvas.width, canvas.height);
    } else if (activeTab === "tetris") {
      tetrisGridRef.current = Array(20).fill(null).map(() => Array(10).fill(null));
      nextPieceRef.current = getRandomTetromino();
      setScore(0);
      setTetrisLines(0);
      setTetrisLevel(1);
      setGameState("playing");
      spawnTetrisPiece();
    }
  };

  return (
    <section id="gravity" className="py-12 md:py-24 px-0 sm:px-8 lg:px-12 w-full max-w-none bg-white">
      {/* Header Container */}
      <div className="px-4 sm:px-0 flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-sky-200/50">
              INTERACTIVE ARCADE SUITE & WHITEBOARD
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-medium text-slate-400">
              // REAL-TIME PHYSICS, SNAKE, TETRIS & WHITEBOARD
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-mono tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600 animate-spin" style={{ animationDuration: "25s" }} />
            <span>gravity arcade</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans mt-1 sm:mt-2 max-w-4xl font-normal leading-relaxed">
            Full-width 2D physics bounding playground & retro arcade suite. Switch between Physics, Snake, Tetris, and Collaborative Whiteboard!
          </p>
        </div>

        {/* Tab Switcher & Fullscreen Button */}
        <div className="flex items-center gap-2 flex-wrap shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1 bg-slate-100/80 backdrop-blur-xs p-1 rounded-full border border-slate-200/80 flex-wrap">
            <button
              onClick={() => { setActiveTab("whiteboard"); setGameState("idle"); }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === "whiteboard"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>WHITEBOARD</span>
            </button>
            <button
              onClick={() => { setActiveTab("sandbox"); setGameState("idle"); }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === "sandbox"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>PHYSICS</span>
            </button>
            <button
              onClick={() => { setActiveTab("snake"); setGameState("idle"); }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === "snake"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>SNAKE</span>
            </button>
            <button
              onClick={() => { setActiveTab("tetris"); setGameState("idle"); }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === "tetris"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>TETRIS</span>
            </button>
          </div>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-bold rounded-full flex items-center gap-1.5 transition-all bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700 shadow-xs shrink-0"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                <span>EXIT FULLSCREEN</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                <span>FULLSCREEN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Box Container - Supports Fullscreen Overlay Mode (iOS Safari Compatible) */}
      <div
        ref={containerRef}
        className={`bg-slate-50 border-y sm:border border-slate-200/80 p-2 sm:p-6 relative overflow-hidden shadow-xs w-full transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 top-0 left-0 right-0 bottom-0 z-[999999] rounded-none w-screen h-screen h-[100dvh] max-h-[100dvh] bg-slate-900 text-white flex flex-col justify-between p-2 sm:p-4 touch-none"
            : "rounded-none sm:rounded-3xl"
        }`}
      >
        
        {/* ROOM MANAGER & PLAYER IDENTITY BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-slate-200/80 font-mono text-[11px] sm:text-xs shrink-0">
          {/* Room Name & Creator */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded-full border border-slate-700 shadow-xs">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              {isEditingRoom ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempRoomInput}
                    onChange={(e) => setTempRoomInput(e.target.value)}
                    placeholder="ENTER ROOM CODE"
                    className="bg-slate-800 text-white text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 rounded border border-slate-600 focus:outline-none w-32"
                  />
                  <button onClick={handleSaveRoomCode} className="text-emerald-400 hover:text-emerald-300 font-bold text-[10px]">SAVE</button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-wider text-sky-300 text-[10px] sm:text-xs">ROOM: {roomCode}</span>
                  <button
                    onClick={() => { setTempRoomInput(roomCode); setIsEditingRoom(true); }}
                    className="text-slate-400 hover:text-white"
                    title="Change or Join Custom Room Code"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* COPY ROOM ID BUTTON */}
            <button
              onClick={handleCopyRoomCode}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all text-[10px] font-bold"
              title="Copy Room ID to Clipboard"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
              <span>{copiedLink ? "COPIED ROOM ID!" : "COPY ROOM ID"}</span>
            </button>

            {/* SHARE WHITEBOARD DIRECT LINK BUTTON */}
            <button
              onClick={handleShareDirectLink}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 px-3 py-1 rounded-full flex items-center gap-1.5 transition-all text-[10px] sm:text-xs font-bold shadow-xs animate-pulse hover:animate-none"
              title="Copy Direct Shareable Whiteboard Room Link"
            >
              {copiedShareLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                  <span>WHITEBOARD LINK COPIED! 🚀</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-white" />
                  <span>SHARE WHITEBOARD</span>
                </>
              )}
            </button>

            {/* DIRECT JOIN ROOM CODE INPUT FIELD */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-full px-2 py-0.5 shadow-xs">
              <input
                type="text"
                value={joinRoomInput}
                onChange={(e) => setJoinRoomInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleDirectJoinRoom()}
                placeholder="JOIN ROOM CODE"
                className="bg-transparent text-slate-900 text-[10px] sm:text-xs font-mono font-bold uppercase px-1 focus:outline-none w-24 sm:w-28 placeholder:text-slate-400 placeholder:normal-case"
              />
              <button
                onClick={handleDirectJoinRoom}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 shadow-xs"
              >
                <LogIn className="w-3 h-3" />
                <span>JOIN</span>
              </button>
            </div>

            <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
              🟢 {activeUsersCount} ONLINE
            </span>

            {/* WEBSOCKET PROTOCOL STATUS BADGE */}
            <span className={`font-bold border px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 transition-all ${
              wsConnected
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                : "bg-purple-500/10 text-purple-600 border-purple-300"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-500 animate-ping" : "bg-purple-500"}`} />
              <span>{wsConnected ? "⚡ WEBSOCKET (0 API OVERHEAD)" : "⚡ SSE EVENTSTREAM"}</span>
            </span>

            {/* Room Chat Drawer Toggle Button */}
            <button
              onClick={toggleChatOpen}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[10px] font-bold border relative ${
                isChatOpen
                  ? "bg-purple-600 text-white border-purple-500 shadow-xs"
                  : "bg-white/90 hover:bg-purple-50 text-purple-700 border-purple-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ROOM CHAT</span>
              {unreadChatCount > 0 && !isChatOpen && (
                <span className="bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* FLOATING MOBILE & DESKTOP EXIT FULLSCREEN BUTTON */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-rose-400 shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shrink-0"
                title="Exit Fullscreen Mode"
              >
                <X className="w-3.5 h-3.5" />
                <span>EXIT FULLSCREEN ✕</span>
              </button>
            )}
          </div>

          {/* Player Codename Handle */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <span className="text-slate-400 text-[10px] uppercase">Handle:</span>
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempNameInput}
                  onChange={(e) => setTempNameInput(e.target.value)}
                  placeholder="YOUR NAME"
                  className="bg-white text-slate-900 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-300 focus:outline-none w-28"
                />
                <button onClick={handleSavePlayerName} className="text-sky-600 font-bold text-[10px]">SAVE</button>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-white/80 border border-slate-300 px-2.5 py-0.5 rounded-full text-slate-800 font-bold text-[10px] sm:text-xs">
                <span>{playerName}</span>
                <button
                  onClick={() => { setTempNameInput(playerName); setIsEditingName(true); }}
                  className="text-slate-400 hover:text-slate-700 ml-0.5"
                  title="Change Player Codename"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Header for Sandbox Mode */}
        {activeTab === "sandbox" && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-slate-200/60 font-mono text-[11px] sm:text-xs shrink-0">
            <div className="flex items-center gap-1 flex-wrap w-full sm:w-auto">
              <span className="text-slate-400 font-medium mr-1 uppercase text-[10px] sm:text-xs">Gravity:</span>
              <button
                onClick={() => setGravityMode("earth")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all border ${
                  gravityMode === "earth" ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Earth
              </button>
              <button
                onClick={() => setGravityMode("zero")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all border ${
                  gravityMode === "zero" ? "bg-sky-600 text-white border-sky-600 font-bold" : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Zero-G
              </button>
              <button
                onClick={() => setGravityMode("reverse")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all border ${
                  gravityMode === "reverse" ? "bg-indigo-600 text-white border-indigo-600 font-bold" : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Reverse
              </button>
              <button
                onClick={() => setGravityMode("jupiter")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all border ${
                  gravityMode === "jupiter" ? "bg-red-600 text-white border-red-600 font-bold" : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Jupiter
              </button>
              <button
                onClick={() => setGravityMode("attractor")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all border ${
                  gravityMode === "attractor" ? "bg-emerald-600 text-white border-emerald-600 font-bold" : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                🧲 Magnet
              </button>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <button
                onClick={spawnExtraPill}
                className="bg-sky-600 hover:bg-sky-700 text-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1 font-bold transition-all border border-sky-500 shadow-xs text-[10px] sm:text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Spawn Block</span>
              </button>
              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) initNodes(canvas.width, canvas.height);
                }}
                className="bg-white/80 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 transition-all text-[10px] sm:text-xs"
                title="Reset All Square Tech Items"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Rain Cascade ({TECH_PILLS.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Arcade Header for Snake & Tetris */}
        {(activeTab === "snake" || activeTab === "tetris") && (
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 sm:pb-2.5 border-b border-slate-200 font-mono text-xs sm:text-sm flex-wrap shrink-0">
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-900 font-black">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>SCORE: <strong className="text-sky-600">{score}</strong></span>
              </div>

              {activeTab === "snake" && (
                <div className="text-slate-700 font-bold text-[11px] sm:text-xs">
                  LENGTH: <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300/50">{snakeLength}</span>
                </div>
              )}

              {activeTab === "tetris" && (
                <>
                  <div className="text-slate-700 font-bold text-[11px] sm:text-xs">
                    LINES: <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded border border-purple-300/50">{tetrisLines}</span>
                  </div>
                  <div className="text-slate-700 font-bold text-[11px] sm:text-xs">
                    LEVEL: <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300/50">{tetrisLevel}</span>
                  </div>
                </>
              )}

              <div className="text-slate-500 hidden sm:block text-xs">
                HIGH: <strong className="text-slate-900">{highScore}</strong>
              </div>
            </div>

            {/* EASY, MEDIUM, HARD & SNAKE SELF-BITE CRASH TOGGLE */}
            <div className="flex items-center gap-1 flex-wrap">
              {activeTab === "snake" && (
                <button
                  onClick={() => setSelfBiteCrash(!selfBiteCrash)}
                  className={`mr-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all border flex items-center gap-1 ${
                    selfBiteCrash
                      ? "bg-red-600/90 text-white border-red-500 shadow-xs"
                      : "bg-emerald-600/90 text-white border-emerald-500 shadow-xs"
                  }`}
                  title={selfBiteCrash ? "Self-Bite Crash ENABLED" : "Self-Bite Crash DISABLED (Infinite Snake Growth)"}
                >
                  {selfBiteCrash ? <Skull className="w-3 h-3 text-red-200" /> : <Shield className="w-3 h-3 text-emerald-200" />}
                  <span>{selfBiteCrash ? "SELF-CRASH: ON" : "SELF-CRASH: OFF (INFINITE)"}</span>
                </button>
              )}

              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase mr-1">Diff:</span>
              <button
                onClick={() => setDifficulty("easy")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all border ${
                  difficulty === "easy"
                    ? "bg-emerald-600/90 text-white border-emerald-500 shadow-xs"
                    : "bg-white/60 hover:bg-white text-slate-700 border-slate-300"
                }`}
              >
                🟢 EASY
              </button>
              <button
                onClick={() => setDifficulty("medium")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all border ${
                  difficulty === "medium"
                    ? "bg-amber-500/90 text-white border-amber-400 shadow-xs"
                    : "bg-white/60 hover:bg-white text-slate-700 border-slate-300"
                }`}
              >
                🟡 MEDIUM
              </button>
              <button
                onClick={() => setDifficulty("hard")}
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all border ${
                  difficulty === "hard"
                    ? "bg-red-600/90 text-white border-red-500 shadow-xs"
                    : "bg-white/60 hover:bg-white text-slate-700 border-slate-300"
                }`}
              >
                🔴 HARD
              </button>

              {activeTab === "snake" && (
                <button
                  onClick={() => setColorTheme(colorTheme === "green" ? "dark" : "green")}
                  className={`ml-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 border ${
                    colorTheme === "green"
                      ? "bg-[#0f380f]/90 text-[#9bbc0f] border-[#0f380f]"
                      : "bg-slate-900/90 text-sky-400 border-slate-700"
                  }`}
                >
                  <Tv className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{colorTheme === "green" ? "GREEN" : "OLED"}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* MOBILE & DESKTOP OPTIMIZED COLLABORATIVE WHITEBOARD TOOLBAR */}
        {activeTab === "whiteboard" && (
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-slate-200/80 font-mono text-[11px] sm:text-xs shrink-0 overflow-x-auto no-scrollbar py-1">
            {/* Tool Selection */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-slate-400 text-[10px] uppercase mr-0.5">Tools:</span>
              <button
                onClick={() => setWbTool("pen")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 font-bold ${
                  wbTool === "pen" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                <Pencil className="w-3 h-3" />
                <span>Pen</span>
              </button>
              <button
                onClick={() => setWbTool("line")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 font-bold ${
                  wbTool === "line" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                <span>📏 Line</span>
              </button>
              <button
                onClick={() => setWbTool("rect")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 font-bold ${
                  wbTool === "rect" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                <SquareIcon className="w-3 h-3" />
                <span>Box</span>
              </button>
              <button
                onClick={() => setWbTool("circle")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 font-bold ${
                  wbTool === "circle" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                <Circle className="w-3 h-3" />
                <span>Circle</span>
              </button>
              <button
                onClick={() => setWbTool("eraser")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 font-bold ${
                  wbTool === "eraser" ? "bg-rose-600 text-white border-rose-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                <Eraser className="w-3 h-3" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Colors & Brush Size */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Color Presets */}
              <div className="flex items-center gap-1">
                {["#0284c7", "#16a34a", "#9333ea", "#ea580c", "#dc2626", "#0f172a"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setWbColor(c); if (wbTool === "eraser") setWbTool("pen"); }}
                    style={{ backgroundColor: c }}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-transform ${
                      wbColor === c && wbTool !== "eraser" ? "scale-125 border-slate-900 shadow-xs" : "border-white"
                    }`}
                  />
                ))}
              </div>

              {/* Dynamic Stroke Size Slider for Pen / Eraser */}
              <div className="flex items-center gap-1.5 border-l border-slate-300 pl-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={wbSize}
                  onChange={(e) => setWbSize(Number(e.target.value))}
                  className="w-16 sm:w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  title={`Adjust ${wbTool === "eraser" ? "Eraser" : "Pen"} Thickness (${wbSize}px)`}
                />
                <div
                  className="rounded-full border border-slate-400 shrink-0 transition-all"
                  style={{
                    width: `${Math.max(6, Math.min(18, wbSize / 2 + 4))}px`,
                    height: `${Math.max(6, Math.min(18, wbSize / 2 + 4))}px`,
                    backgroundColor: wbTool === "eraser" ? "#f43f5e" : wbColor,
                  }}
                  title={`Live Size Preview (${wbSize}px)`}
                />
                <span className="font-mono text-[10px] font-bold text-slate-800 w-7 text-right">{wbSize}px</span>
              </div>

              {/* Action Buttons: Undo, Clear, Export */}
              <div className="flex items-center gap-1 border-l border-slate-300 pl-1.5">
                <button
                  onClick={handleUndoWhiteboard}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 p-1 rounded-full"
                  title="Undo Last Stroke"
                >
                  <Undo2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={handleClearWhiteboard}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 p-1 rounded-full"
                  title="Clear Whiteboard"
                >
                  <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={handleExportWhiteboardPNG}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-full flex items-center gap-1 text-[9px] sm:text-[10px] font-bold border border-emerald-500 shadow-xs"
                >
                  <Download className="w-3 h-3" />
                  <span>EXPORT</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Physics / Snake / Tetris / Whiteboard Game Canvas Container */}
        <div className={`relative w-full bg-white border border-slate-200 overflow-hidden cursor-crosshair ${
          isFullscreen ? "flex-1 min-h-0 h-full rounded-none" : "h-[520px] sm:h-[650px] rounded-xl sm:rounded-2xl"
        }`}>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full block touch-none"
          />

          {/* FLOATING LIVE CHAT TOAST NOTIFICATION BANNER */}
          {chatToast && (
            <div
              onClick={() => { setIsChatOpen(true); setUnreadChatCount(0); setChatToast(null); }}
              className="absolute top-4 right-4 z-50 bg-slate-900/95 text-white border border-purple-500/80 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer animate-in fade-in slide-in-from-top-4 duration-300 hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-purple-300 animate-bounce" />
              </div>
              <div className="flex flex-col text-left font-mono max-w-[200px] sm:max-w-[280px]">
                <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-bold">
                  <span>💬 NEW MESSAGE FROM</span>
                  <span className="text-emerald-400">{chatToast.sender}</span>
                </div>
                <div className="text-xs text-slate-100 font-medium truncate">
                  "{chatToast.text}"
                </div>
              </div>
              <span className="text-[9px] bg-purple-600 text-white font-bold px-2 py-1 rounded-full uppercase tracking-wider">OPEN</span>
            </div>
          )}

          {/* REAL-TIME SESSION-STORAGE ROOM CHAT DRAWER */}
          {isChatOpen && (
            <div className="fixed inset-x-2 bottom-2 sm:absolute sm:bottom-4 sm:left-4 sm:right-auto z-[9999999] w-auto sm:w-[390px] max-w-[calc(100vw-16px)] h-[60vh] sm:h-[530px] max-h-[80vh] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
              {/* Chat Drawer Header */}
              <div className="p-3 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-xs tracking-wider">ROOM CHAT (#{roomCode})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearChatHistory}
                    className="text-[9px] text-slate-400 hover:text-rose-300 font-bold uppercase transition-colors"
                    title="Clear Session Chat History"
                  >
                    Clear History
                  </button>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-slate-400 hover:text-white p-0.5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[300px] text-xs font-sans"
              >
                {chatMessages.length === 0 ? (
                  <div className="text-slate-400 text-center py-6 text-xs font-mono">
                    No messages in room #{roomCode}. Say hi! 👋
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.isSystem
                          ? "items-center text-center my-1"
                          : msg.sender === playerName
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      {msg.isSystem ? (
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded-full">
                          {msg.text}
                        </span>
                      ) : (
                        <div className="max-w-[85%]">
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 mb-0.5 px-1">
                            <span className="font-bold text-sky-400">{msg.sender}</span>
                            <span>• {msg.timestamp}</span>
                          </div>
                          <div
                            className={`px-3 py-1.5 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === playerName
                                ? "bg-purple-600 text-white rounded-br-xs"
                                : "bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-xs"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Emoji Quick Reactions */}
              <div className="px-3 py-1 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
                {["🚀", "🔥", "👏", "🎮", "🎨", "💡"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendChatMessage(emoji)}
                    className="hover:scale-125 transition-transform text-sm p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-800 text-white font-sans text-xs px-3 py-1.5 rounded-full border border-slate-700 focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full transition-all shrink-0 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 360° TRANSLUCENT JOYSTICK CONTROLLER FOR SNAKE */}
          {activeTab === "snake" && gameState === "playing" && (
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex flex-col items-center gap-1 select-none opacity-60 hover:opacity-100 active:opacity-100 transition-opacity duration-200">
              <div
                onMouseDown={handleJoystickStart}
                onTouchStart={handleJoystickStart}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-950/30 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center relative touch-none cursor-pointer group"
              >
                <div className="absolute inset-0 rounded-full border border-white/15 pointer-events-none" />
                <Navigation className="w-3 h-3 text-white/60 absolute top-1.5 sm:top-2" />
                <Navigation className="w-3 h-3 text-white/60 absolute bottom-1.5 sm:bottom-2 rotate-180" />
                <Navigation className="w-3 h-3 text-white/60 absolute left-1.5 sm:left-2 -rotate-90" />
                <Navigation className="w-3 h-3 text-white/60 absolute right-1.5 sm:right-2 rotate-90" />

                <div
                  style={{
                    transform: `translate(${joystickOffset.x}px, ${joystickOffset.y}px)`,
                  }}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-sky-500/50 border border-white/60 shadow-md flex items-center justify-center transition-transform duration-75 group-active:scale-95 backdrop-blur-xs"
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/60 shadow-inner" />
                </div>
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] font-bold text-slate-800 uppercase tracking-wider bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs border border-slate-200/60">
                360° Joystick
              </span>
            </div>
          )}

          {/* OUTLINED TRANSPARENT GLASSMORPHIC CONTROLS FOR TETRIS */}
          {activeTab === "tetris" && gameState === "playing" && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 select-none">
              <button
                onClick={moveTetrisLeft}
                className="w-11 h-11 sm:w-13 sm:h-13 bg-slate-950/40 hover:bg-slate-900/60 active:scale-95 text-white rounded-xl backdrop-blur-md border border-white/25 shadow-lg flex items-center justify-center transition-all"
                title="Move Left"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={moveTetrisRight}
                className="w-11 h-11 sm:w-13 sm:h-13 bg-slate-950/40 hover:bg-slate-900/60 active:scale-95 text-white rounded-xl backdrop-blur-md border border-white/25 shadow-lg flex items-center justify-center transition-all"
                title="Move Right"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={rotateTetris}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600/40 hover:bg-purple-600/60 active:scale-95 text-purple-200 rounded-xl backdrop-blur-md border border-purple-400/40 shadow-lg flex items-center justify-center transition-all"
                title="Rotate Block 90° Clockwise"
              >
                <RotateCw className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={dropTetrisPiece}
                className="w-11 h-11 sm:w-13 sm:h-13 bg-slate-950/40 hover:bg-slate-900/60 active:scale-95 text-white rounded-xl backdrop-blur-md border border-white/25 shadow-lg flex items-center justify-center transition-all"
                title="Soft Drop"
              >
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={hardDropTetris}
                className="w-11 h-11 sm:w-13 sm:h-13 bg-amber-500/40 hover:bg-amber-500/60 active:scale-95 text-amber-300 rounded-xl backdrop-blur-md border border-amber-400/40 shadow-lg flex items-center justify-center transition-all font-black"
                title="Hard Drop (Instant)"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </button>
            </div>
          )}

          {/* Game Over / Start Modal Overlay */}
          {(activeTab === "snake" || activeTab === "tetris") && gameState !== "playing" && (
            <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-4 sm:p-6 font-mono z-40">
              {activeTab === "snake" ? (
                <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-sky-400 mb-3 sm:mb-4 animate-bounce" />
              ) : (
                <Grid3X3 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-3 sm:mb-4 animate-bounce" />
              )}

              <h3 className="text-2xl sm:text-3xl font-black mb-2">
                {gameState === "gameover" ? "GAME OVER" : activeTab === "snake" ? "RETRO SNAKE ARCADE" : "RETRO TETRIS ARCADE"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-5 sm:mb-6 leading-relaxed">
                {activeTab === "snake"
                  ? "Touch or drag anywhere on screen, or use the 360° joystick to steer the snake! Features infinite screen wrap and toggleable crash mode."
                  : "Click directly on falling block or tap canvas to rotate 90°! Drag horizontally to position, or use Arrow Keys & translucent controls."}
              </p>

              <button
                onClick={startMiniGame}
                className={`${
                  activeTab === "snake" ? "bg-sky-500 hover:bg-sky-400 text-slate-950 border border-sky-300/40" : "bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/40"
                } px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>{gameState === "gameover" ? "PLAY AGAIN" : `START ${activeTab.toUpperCase()} GAME`}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Instruction Note */}
        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-[10px] sm:text-xs text-slate-500 gap-1 sm:gap-0 px-1 sm:px-0 shrink-0">
          <div>
            🎮 <strong>Gravity Arcade Suite</strong> ({activeTab.toUpperCase()} • Room: <strong className="text-slate-900">{roomCode}</strong>)
          </div>
          <div>
            {activeTab === "sandbox"
              ? "💡 Drag & swing blocks to strike and knock down other blocks!"
              : activeTab === "snake"
              ? "💡 TOUCH SCREEN or 360° JOYSTICK to steer snake!"
              : activeTab === "tetris"
              ? "💡 CLICK ON ITEM or TAP to rotate 90°, DRAG to position!"
              : "💡 FREEHAND DRAWING & SKETCHING • Real-time Room Sync Enabled"}
          </div>
        </div>
      </div>
    </section>
  );
}
