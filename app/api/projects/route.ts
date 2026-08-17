import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/repositories/projectsRepo";

export async function GET() {
  try {
    const projects = getAllProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to query projects database", details: error.message },
      { status: 500 }
    );
  }
}
