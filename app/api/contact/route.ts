import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, company, message, orderId, variant } = body;

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Generate unique reference ticket ID
    const ticketId = `LIM-${(type || "GEN").toUpperCase().slice(0, 3)}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    console.log(`[LIGHTINMOTION INQUIRY RECEIVED] [${ticketId}]`, {
      type,
      name,
      email,
      phone,
      company,
      orderId,
      variant,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Your request (${ticketId}) has been logged successfully. Our executive team will contact you at ${email} within 24 hours.`,
    });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
