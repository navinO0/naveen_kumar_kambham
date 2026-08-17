import { NextRequest, NextResponse } from "next/server";
import { evaluateAccess, UserRole, Action, Resource } from "@/lib/rbac/evaluator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, action, resource } = body as { role: UserRole; action: Action; resource: Resource };

    if (!role || !action || !resource) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: role, action, resource" },
        { status: 400 }
      );
    }

    const evaluation = evaluateAccess(role, action, resource);

    return NextResponse.json(
      {
        success: true,
        data: evaluation,
      },
      { status: evaluation.statusCode }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Invalid RBAC payload evaluation request", details: error.message },
      { status: 500 }
    );
  }
}
