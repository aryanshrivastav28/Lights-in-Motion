export interface PincodeServiceabilityRequest {
  pickupPincode: string;
  deliveryPincode: string;
  weightInKg: number;
  isCod?: boolean;
}

export interface CourierOption {
  courierId: number;
  courierName: string;
  estimatedDeliveryDays: string;
  rate: number;
  rating: number;
}

export interface ServiceabilityResponse {
  serviceable: boolean;
  couriers: CourierOption[];
}

export interface TrackingData {
  awb: string;
  currentStatus: string;
  trackingUrl?: string;
  location?: string;
  lastUpdated?: string;
}
