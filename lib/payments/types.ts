export interface CreateRazorpayOrderInput {
  amountInPaisa: number;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface WebhookVerificationInput {
  rawBody: string;
  signature: string;
  webhookSecret: string;
}
