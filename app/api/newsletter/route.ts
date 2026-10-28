import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    console.log(`[LIGHTINMOTION NEWSLETTER SUBSCRIPTION]`, {
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to LIGHTINMOTION. Welcome to the ambient lighting inner circle!",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to process subscription right now." },
      { status: 500 }
    );
  }
}
