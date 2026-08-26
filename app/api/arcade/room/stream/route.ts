import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = (searchParams.get("code") || "DEFAULT").toUpperCase();

  if (!global.arcadeRoomSubscribers) {
    global.arcadeRoomSubscribers = {};
  }

  if (!global.arcadeRoomSubscribers[code]) {
    global.arcadeRoomSubscribers[code] = new Set();
  }

  const stream = new ReadableStream({
    start(controller) {
      const send = (message: string) => {
        try {
          controller.enqueue(new TextEncoder().encode(message));
        } catch {
          // Stream closed
        }
      };

      global.arcadeRoomSubscribers![code].add(send);

      // Send initial connection event
      send(`data: ${JSON.stringify({ type: "CONNECTED", roomCode: code })}\n\n`);

      // 15-second heartbeat ping to keep connection alive
      const heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(`: ping\n\n`));
        } catch {
          clearInterval(heartbeatTimer);
        }
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeatTimer);
        global.arcadeRoomSubscribers![code]?.delete(send);
        try {
          controller.close();
        } catch {
          // Handled
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
