import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contactSchema";
import { checkRateLimit } from "@/lib/security/rateLimiter";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 3, 60000); // 3 submissions per minute

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too Many Requests",
          message: `Rate limit exceeded! Please wait ${rateLimit.resetInSeconds} seconds before sending another message.`,
          rateLimit: {
            limit: 3,
            remaining: 0,
            resetInSeconds: rateLimit.resetInSeconds,
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
            "X-RateLimit-Limit": "3",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Validate payload
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const formattedErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    const { senderName, email, message } = parseResult.data;

    // 3. Persist message to SQLite
    const db = getDb();
    try {
      const id = crypto.randomUUID();
      db.prepare(
        "INSERT INTO contact_messages (id, sender_name, email, message) VALUES (?, ?, ?, ?)"
      ).run(id, senderName, email, message);
    } finally {
      db.close();
    }

    return NextResponse.json({
      success: true,
      message: "Message received! I promise not to immediately blame DNS.",
      rateLimit: {
        limit: 3,
        remaining: rateLimit.remaining,
        resetInSeconds: rateLimit.resetInSeconds,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
