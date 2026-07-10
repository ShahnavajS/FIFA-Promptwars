import { UserRole } from "@/domain/user.entity";

export function getRoleContext(role: UserRole): string {
  return `[USER ROLE]: Active view is set to ${role.toUpperCase()}. Generate support guidance and layout instructions optimized for this role's objectives.`;
}
