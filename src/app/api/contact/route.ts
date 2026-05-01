import { NextResponse } from "next/server";

// Naive rate limiting (IP-based) - only within a single process
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    const hour = 60 * 60 * 1000;
    const now = Date.now();
    
    if (rateLimitMap.has(ip)) {
      const data = rateLimitMap.get(ip)!;
      // Reset if an hour has passed
      if (now - data.firstRequestTime > hour) {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
      } else {
        if (data.count >= 5) {
          return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 });
        }
        data.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    }

    const body = await req.json();
    const { name, email, message } = body;

    // TODO: Connect to Resend or Nodemailer
    // console.log(`Received contact message from ${name} (${email}): ${message}`);

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
