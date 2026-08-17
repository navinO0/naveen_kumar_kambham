import { NextResponse } from "next/server";
import { getAllTrenchNotes } from "@/lib/repositories/learningRepo";

export async function GET() {
  try {
    const notes = getAllTrenchNotes();
    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to query trench notes database", details: error.message },
      { status: 500 }
    );
  }
}
