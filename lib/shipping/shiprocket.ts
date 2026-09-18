import type {
  PincodeServiceabilityRequest,
  ServiceabilityResponse,
  TrackingData,
} from "./types";

/**
 * Server-side Shipping & Fulfilment architecture using Shiprocket API.
 * All operations execute server-side; API tokens are securely managed.
 */
class ShiprocketClient {
  private cachedToken: string | null = null;
  private tokenExpiry: number = 0;

  private async getAuthToken(): Promise<string> {
    if (
      process.env.SHIPROCKET_TOKEN &&
      !process.env.SHIPROCKET_TOKEN.startsWith("placeholder")
    ) {
      return process.env.SHIPROCKET_TOKEN;
    }

    const now = Date.now();
    if (this.cachedToken && this.tokenExpiry > now) {
      return this.cachedToken;
    }

    const email = process.env.SHIPROCKET_EMAIL;
    const password = process.env.SHIPROCKET_PASSWORD;

    if (
      !email ||
      !password ||
      email.includes("placeholder") ||
      password.includes("placeholder")
    ) {
      return "dev_mock_shiprocket_token";
    }

    const response = await fetch(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Shiprocket authentication failed with status ${response.status}`
      );
    }

    const data = (await response.json()) as { token?: string };
    const token = data.token || "dev_mock_shiprocket_token";
    this.cachedToken = token;
    this.tokenExpiry = now + 23 * 60 * 60 * 1000;
    return token;
  }

  async checkServiceability(
    params: PincodeServiceabilityRequest
  ): Promise<ServiceabilityResponse> {
    const token = await this.getAuthToken();
    const query = new URLSearchParams({
      pickup_postcode: params.pickupPincode,
      delivery_postcode: params.deliveryPincode,
      weight: params.weightInKg.toString(),
      cod: params.isCod ? "1" : "0",
    });

    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { serviceable: false, couriers: [] };
    }

    const data = await response.json();
    const availableCouriers = data?.data?.available_courier_companies ?? [];

    return {
      serviceable: availableCouriers.length > 0,
      couriers: availableCouriers.map(
        (c: {
          courier_company_id: number;
          courier_name: string;
          etd: string;
          rate: number;
          rating: number;
        }) => ({
          courierId: c.courier_company_id,
          courierName: c.courier_name,
          estimatedDeliveryDays: c.etd,
          rate: c.rate,
          rating: c.rating,
        })
      ),
    };
  }

  async getTrackingByAWB(awb: string): Promise<TrackingData> {
    const token = await this.getAuthToken();
    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Shiprocket tracking failed for AWB ${awb}`);
    }

    const data = await response.json();
    return {
      awb,
      currentStatus: data?.tracking_data?.track_status_title ?? "In Transit",
      trackingUrl: `https://shiprocket.co/tracking/${awb}`,
    };
  }
}

export const shiprocket = new ShiprocketClient();
