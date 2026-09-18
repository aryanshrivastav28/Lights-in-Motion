const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email.trim());
}

export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  return INDIAN_PHONE_REGEX.test(phone.trim().replace(/[\s-]/g, ""));
}

export function isValidPincode(pincode: string): boolean {
  if (!pincode) return false;
  return PINCODE_REGEX.test(pincode.trim());
}

export function sanitizeString(str: string): string {
  if (!str) return "";
  return str.trim().replace(/[<>]/g, "");
}
