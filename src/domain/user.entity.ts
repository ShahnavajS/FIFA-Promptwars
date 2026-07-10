export type UserRole = "fan" | "volunteer" | "organizer" | "staff" | "security";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  languagePreference: string;
  favoriteTeam?: string;
  ticketId?: string;
  createdAt: string;
  updatedAt: string;
}
