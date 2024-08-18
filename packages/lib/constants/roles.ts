export const ROLES = {
  SUPERADMIN: 0,
  STAFF: 1,
} as const;

export type RoleValues = (typeof ROLES)[keyof typeof ROLES];
