export const ROLES = {
  SUPERADMIN: 0,
  ADMIN: 1,
  STAFF: 2,
} as const;

export type RoleValues = (typeof ROLES)[keyof typeof ROLES];
