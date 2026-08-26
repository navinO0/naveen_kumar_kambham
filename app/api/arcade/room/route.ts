import { NextRequest, NextResponse } from "next/server";

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

type SSESubscriber = (message: string) => void;

declare global {
  // eslint-disable-next-line no-var
  var arcadeRoomStore: Record<string, RoomData> | undefined;
  // eslint-disable-next-line no-var
  var arcadeRoomSubscribers: Record<string, Set<SSESubscriber>> | undefined;
}

if (!global.arcadeRoomStore) {
  global.arcadeRoomStore = {};
}

if (!global.arcadeRoomSubscribers) {
  global.arcadeRoomSubscribers = {};
}

const rooms = global.arcadeRoomStore;
const subscribers = global.arcadeRoomSubscribers;

export function notifyRoomSubscribers(roomCode: string, type: string, payload: unknown, roomData?: RoomData) {
  const roomSubs = subscribers[roomCode];
  if (roomSubs && roomSubs.size > 0) {
    const message = `data: ${JSON.stringify({ type, payload, room: roomData })}\n\n`;
    roomSubs.forEach((send) => {
      try {
        send(message);
      } catch {
        // Stream closed handler cleans up
      }
    });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase() || "DEFAULT";

  if (!rooms[code]) {
    rooms[code] = {
      paths: [],
      chat: [
        {
          id: `sys-${Date.now()}`,
          sender: "System",
          text: `👋 Connected to Live Real-Time Room #${code}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSystem: true,
        },
      ],
      snakes: {},
      cursors: {},
      lastUpdated: Date.now(),
    };
  }

  const now = Date.now();
  const room = rooms[code];

  // Clean inactive snakes older than 8s
  if (room.snakes) {
    Object.keys(room.snakes).forEach((id) => {
      if (now - room.snakes[id].lastActive > 8000) {
        delete room.snakes[id];
      }
    });
  }

  // Clean inactive cursors older than 4s
  if (room.cursors) {
    Object.keys(room.cursors).forEach((id) => {
      if (now - room.cursors[id].lastActive > 4000) {
        delete room.cursors[id];
      }
    });
  }

  return NextResponse.json(room);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, type, payload } = body;
    const roomCode = (code || "DEFAULT").toUpperCase();

    if (!rooms[roomCode]) {
      rooms[roomCode] = { paths: [], chat: [], snakes: {}, cursors: {}, lastUpdated: Date.now() };
    }

    const room = rooms[roomCode];

    if (type === "WB_STROKE" && payload) {
      room.paths.push(payload);
    } else if (type === "WB_RESTORE" && Array.isArray(payload)) {
      room.paths = payload;
    } else if (type === "WB_CLEAR") {
      room.paths = [];
    } else if (type === "WB_UNDO") {
      room.paths.pop();
    } else if (type === "CHAT" && payload) {
      room.chat.push(payload);
    } else if (type === "CHAT_RESTORE" && Array.isArray(payload)) {
      room.chat = payload;
    } else if (type === "SNAKE_UPDATE" && payload) {
      const { playerId, playerName, snake, score, color } = payload;
      if (playerId) {
        room.snakes[playerId] = {
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
        room.cursors[playerId] = {
          playerId,
          playerName: playerName || "Anonymous",
          x: x || 0,
          y: y || 0,
          color: color || "#3b82f6",
          lastActive: Date.now(),
        };
      }
    }

    room.lastUpdated = Date.now();

    // Instantly notify all active Server-Sent Event (SSE) subscribers in this room
    notifyRoomSubscribers(roomCode, type, payload, room);

    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
