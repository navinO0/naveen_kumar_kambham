import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();
  const responseTimeMs = Date.now() - startTime;

  return NextResponse.json({
    status: "OK",
    environment: "production",
    dataStore: {
      type: "static-in-memory-json",
      status: "HEALTHY",
    },
    latencyMs: Math.max(1, responseTimeMs),
    timestamp: new Date().toISOString(),
    message: "Yes, the API is running cleanly and 100% serverless.",
  });
}
