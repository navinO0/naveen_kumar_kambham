import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "HEALTHY";

  try {
    const db = getDb();
    db.prepare("SELECT 1").get();
    db.close();
  } catch (err) {
    dbStatus = "DEGRADED";
  }

  const responseTimeMs = Date.now() - startTime;

  return NextResponse.json({
    status: dbStatus === "HEALTHY" ? "OK" : "DEGRADED",
    environment: "production",
    database: {
      driver: "better-sqlite3",
      status: dbStatus,
    },
    latencyMs: responseTimeMs,
    timestamp: new Date().toISOString(),
    message: "Yes, the API is surprisingly running cleanly right now.",
  });
}
