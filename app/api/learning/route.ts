import { NextResponse } from "next/server";
import { getAllLearningTopics } from "@/lib/repositories/learningRepo";

export async function GET() {
  try {
    const topics = getAllLearningTopics();
    return NextResponse.json({ success: true, data: topics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to query learning timeline database", details: error.message },
      { status: 500 }
    );
  }
}
