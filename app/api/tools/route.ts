import { NextResponse } from "next/server";
import { getAllTools } from "@/lib/repositories/toolsRepo";

export async function GET() {
  try {
    const tools = getAllTools();
    return NextResponse.json({ success: true, data: tools });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to query tools database", details: error.message },
      { status: 500 }
    );
  }
}
