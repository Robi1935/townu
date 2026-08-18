export type UserRole =
  | "student"
  | "parent"
  | "faculty_staff"
  | "alumni"
  | "local_resident"
  | "business"
  | "admin";

export type VerificationStatus =
  | "unverified"
  | "pending"
  | "verified_student"
  | "verified_business"
  | "verified_provider"
  | "admin_verified";

export interface Market {
  id: string;
  name: string;
  city: string;
  state: string;
  slug: string;
  is_active: boolean;
}

export interface School {
  id: string;
  market_id: string;
  name: string;
  slug: string;
  school_type: string | null;
  is_active: boolean;
}
