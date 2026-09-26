import { prisma } from "@/lib/db/prisma";
import { Prisma, AuditAction } from "@prisma/client";

export class AuditLogRepository {
  async createLog(data: {
    userId: string;
    action: AuditAction;
    entityType: string;
    entityId: string;
    details?: any;
    ipAddress?: string;
  }) {
    return prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        ipAddress: data.ipAddress,
      },
    });
  }

  async getLogsByEntity(entityType: string, entityId: string) {
    return prisma.auditLog.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          }
        }
      }
    });
  }
}

export const auditLogRepository = new AuditLogRepository();
