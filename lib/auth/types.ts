export type UserRole = "CUSTOMER" | "ADMIN";

export interface SessionUser {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
  image?: string | null;
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}
