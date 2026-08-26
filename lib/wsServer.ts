import { WebSocketServer, WebSocket } from "ws";

interface SnakePlayerData {
  playerId: string;
  playerName: string;
  snake: Array<{ x: number; y: number }>;
  score: number;
  color: string;
  lastActive: number;
}

interface CursorData {
  playerId: string;
  playerName: string;
  x: number;
  y: number;
  color: string;
  lastActive: number;
}

interface RoomData {
  paths: Array<unknown>;
  chat: Array<unknown>;
  snakes: Record<string, SnakePlayerData>;
  cursors: Record<string, CursorData>;
  lastUpdated: number;
}

// In-Memory Room Data & Socket Client Connections
const roomStores: Map<string, RoomData> = new Map();
const roomSockets: Map<string, Set<WebSocket>> = new Map();

function getOrCreateRoom(code: string): RoomData {
  const roomCode = code.toUpperCase();
  if (!roomStores.has(roomCode)) {
    roomStores.set(roomCode, {
      paths: [],
      chat: [
        {
          id: `sys-${Date.now()}`,
          sender: "System",
          text: `⚡ Connected to Full-Duplex WebSocket Server Room #${roomCode}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystem: true,
        },
      ],
      snakes: {},
      cursors: {},
      lastUpdated: Date.now(),
    });
  }
  return roomStores.get(roomCode)!;
}

export function startWebSocketServer(port = 3001) {
  const wss = new WebSocketServer({ port });
  console.log(`🚀 [WebSocket Engine] Running on ws://localhost:${port}`);

  wss.on("connection", (ws, req) => {
    let currentRoomCode = "DEFAULT";

    // Extract room code from URL query parameters (ws://localhost:3001?room=XYZ)
    if (req.url) {
      const urlParams = new URLSearchParams(req.url.split("?")[1]);
      const code = urlParams.get("room");
      if (code) currentRoomCode = code.toUpperCase();
    }

    // Register Socket to Room
    if (!roomSockets.has(currentRoomCode)) {
      roomSockets.set(currentRoomCode, new Set());
    }
    const clientSockets = roomSockets.get(currentRoomCode)!;
    clientSockets.add(ws);

    const room = getOrCreateRoom(currentRoomCode);

    // Send Initial Full Room State Sync Frame to Newly Connected Socket
    ws.send(
      JSON.stringify({
        type: "INIT_ROOM_STATE",
        roomCode: currentRoomCode,
        room,
      })
    );

    // Handle Incoming Bi-Directional WebSocket Messages
    ws.on("message", (rawMessage) => {
      try {
        const data = JSON.parse(rawMessage.toString());
        const { type, payload, roomCode: targetRoom } = data;
        const activeCode = (targetRoom || currentRoomCode).toUpperCase();
        const activeRoom = getOrCreateRoom(activeCode);

        // Process Room Operations
        if (type === "WB_STROKE" && payload) {
          activeRoom.paths.push(payload);
        } else if (type === "WB_CLEAR") {
          activeRoom.paths = [];
        } else if (type === "WB_UNDO") {
          activeRoom.paths.pop();
        } else if (type === "CHAT" && payload) {
          activeRoom.chat.push(payload);
        } else if (type === "SNAKE_UPDATE" && payload) {
          const { playerId, playerName, snake, score, color } = payload;
          if (playerId) {
            activeRoom.snakes[playerId] = {
              playerId,
              playerName: playerName || "Anonymous",
              snake: snake || [],
              score: score || 0,
              color: color || "#a855f7",
              lastActive: Date.now(),
            };
          }
        } else if (type === "CURSOR_UPDATE" && payload) {
          const { playerId, playerName, x, y, color } = payload;
          if (playerId) {
            activeRoom.cursors[playerId] = {
              playerId,
              playerName: playerName || "Anonymous",
              x: x || 0,
              y: y || 0,
              color: color || "#3b82f6",
              lastActive: Date.now(),
            };
          }
        }

        activeRoom.lastUpdated = Date.now();

        // Broadcast Event to All Other Connected Room Sockets
        const outgoingFrame = JSON.stringify({ type, payload, roomCode: activeCode });
        const roomClients = roomSockets.get(activeCode);
        if (roomClients) {
          roomClients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(outgoingFrame);
            }
          });
        }
      } catch (err) {
        console.error("Malformed WebSocket Message:", err);
      }
    });

    ws.on("close", () => {
      clientSockets.delete(ws);
      if (clientSockets.size === 0) {
        roomSockets.delete(currentRoomCode);
      }
    });

    ws.on("error", (err) => {
      console.error("WebSocket Connection Error:", err);
    });
  });

  return wss;
}

// Auto-run if executed directly via npx tsx lib/wsServer.ts
if (require.main === module) {
  startWebSocketServer(3001);
}
