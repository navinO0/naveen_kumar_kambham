import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const concurrency = Math.max(10, Math.min(10000, Number(body.concurrency) || 100));

    // Realistic non-linear latency & stress curves
    let avgLatencyMs = Math.round(15 + Math.pow(concurrency / 500, 2.1) * 85);
    let p99LatencyMs = Math.round(avgLatencyMs * (1.8 + (concurrency / 2000)));
    let cpuLoadPercent = Math.min(100, Math.round(12 + (concurrency / 5000) * 85));
    let dbPoolUtilization = Math.min(100, Math.round(8 + (concurrency / 5000) * 92));
    let errorRatePercent = concurrency > 3500 ? Number(((concurrency - 3500) / 150).toFixed(1)) : 0;

    let serverState: "CHILLING" | "WARMING" | "SWEATING" | "MELTDOWN" = "CHILLING";
    let statusNote = "";

    if (concurrency < 500) {
      serverState = "CHILLING";
      statusNote = "Server is sipping iced coffee. All connection sockets happy.";
    } else if (concurrency < 1500) {
      serverState = "WARMING";
      statusNote = "Thread pool active. Database indexes doing heavy lifting cleanly.";
    } else if (concurrency < 3500) {
      serverState = "SWEATING";
      statusNote = "CPU fan spinning fast! DB connection pool saturating. CPU: 'Please stop.'";
    } else {
      serverState = "MELTDOWN";
      statusNote = "Socket exhaustion! p99 spiking. JMeter has officially proven production is ruthless.";
    }

    return NextResponse.json({
      success: true,
      data: {
        concurrency,
        avgLatencyMs,
        p99LatencyMs,
        cpuLoadPercent,
        dbPoolUtilization,
        errorRatePercent,
        serverState,
        statusNote,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Invalid load test parameters", details: error.message },
      { status: 400 }
    );
  }
}
