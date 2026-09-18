import crypto from "crypto";
import type {
  CreateRazorpayOrderInput,
  RazorpayOrderResult,
  VerifyPaymentInput,
} from "./types";

/**
 * Server-side payment foundation for Razorpay integration.
 * NEVER import or expose secrets in client-side code.
 */
function getRazorpayCredentials() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials missing in environment variables.");
  }

  return { keyId, keySecret };
}

/**
 * Creates a server-side order with Razorpay Orders API.
 */
export async function createRazorpayOrder(
  input: CreateRazorpayOrderInput
): Promise<RazorpayOrderResult> {
  const { keyId, keySecret } = getRazorpayCredentials();

  const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount: input.amountInPaisa,
      currency: "INR",
      receipt: input.orderNumber,
      notes: input.notes ?? {},
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Razorpay order creation failed (${response.status}): ${errorBody}`
    );
  }

  return (await response.json()) as RazorpayOrderResult;
}

/**
 * Verifies the Razorpay payment signature received from client checkout callback.
 */
export function verifyPaymentSignature(input: VerifyPaymentInput): boolean {
  const { keySecret } = getRazorpayCredentials();

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "utf-8"),
    Buffer.from(input.razorpaySignature, "utf-8")
  );
}

/**
 * Verifies Razorpay Webhook signatures for asynchronous event processing.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "utf-8"),
    Buffer.from(signature, "utf-8")
  );
}
