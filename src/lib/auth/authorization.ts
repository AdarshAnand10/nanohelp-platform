import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 80,
  EDITOR: 60,
  MODERATOR: 40,
  USER: 10,
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function hasRole(requiredRole: Role): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user || !(user as any).role) return false;
  
  const userLevel = ROLE_HIERARCHY[(user as any).role as Role] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];
  
  return userLevel >= requiredLevel;
}

export async function requireRole(requiredRole: Role) {
  const isAuthorized = await hasRole(requiredRole);
  if (!isAuthorized) {
    throw new Error("FORBIDDEN");
  }
  const user = await getCurrentUser();
  return user!;
}
