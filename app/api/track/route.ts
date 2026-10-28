import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId || typeof orderId !== "string" || orderId.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid Order ID or AWB Tracking Number." },
        { status: 400 }
      );
    }

    const cleanId = orderId.trim().toUpperCase();

    // Deterministic simulation based on ID hash
    const statuses = [
      {
        status: "Out for Delivery",
        badge: "Out for Delivery",
        carrier: "BlueDart Express",
        estimatedDelivery: "Today by 7:00 PM",
        origin: "LIGHTINMOTION Hardware Hub, Bengaluru",
        destination: "Customer Address",
        steps: [
          { title: "Order Confirmed & Bench-Tested", time: "2 days ago", done: true },
          { title: "Dispatched via Air Express", time: "Yesterday", done: true },
          { title: "Arrived at Destination Sorting Hub", time: "Today, 6:30 AM", done: true },
          { title: "Out for Delivery with Courier Associate", time: "Today, 9:45 AM", done: true },
        ],
      },
      {
        status: "In Transit",
        badge: "In Transit",
        carrier: "Delhivery Air Logistics",
        estimatedDelivery: "Tomorrow by 6:00 PM",
        origin: "LIGHTINMOTION Hardware Hub, Bengaluru",
        destination: "Customer Address",
        steps: [
          { title: "Order Confirmed & Bench-Tested", time: "Yesterday, 3:00 PM", done: true },
          { title: "Dispatched from Bengaluru Fulfilment Center", time: "Yesterday, 8:15 PM", done: true },
          { title: "In Transit to Regional Distribution Center", time: "Today, 4:20 AM", done: true },
          { title: "Out for Delivery", time: "Expected Tomorrow", done: false },
        ],
      },
    ];

    const pick = cleanId.charCodeAt(cleanId.length - 1) % 2;
    const trackingInfo = {
      orderId: cleanId,
      ...statuses[pick],
    };

    return NextResponse.json({
      success: true,
      data: trackingInfo,
    });
  } catch (error) {
    console.error("Tracking lookup error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to query tracking status at this moment." },
      { status: 500 }
    );
  }
}
