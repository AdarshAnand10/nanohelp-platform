import { ContentStatus } from "@prisma/client";
import { auditLogService } from "./audit-log.service";
import { prisma } from "@/lib/db/prisma";

export class ContentLifecycleService {
  /**
   * Idempotent expiration function for any model supporting status and expiredAt.
   * This example uses a dynamic Prisma update, but in a real strictly typed environment
   * you'd map this to specific repositories.
   */
  async expireContent(
    modelDelegate: any, // e.g., prisma.fundingOpportunity
    entityType: string,
    id: string,
    userId: string
  ) {
    const record = await modelDelegate.findUnique({ where: { id } });
    
    if (!record) {
      throw new Error(`${entityType} not found`);
    }

    if (record.status === ContentStatus.EXPIRED || record.status === ContentStatus.ARCHIVED || record.status === ContentStatus.CANCELLED) {
      // Already expired/terminal state, do nothing (idempotent)
      return record;
    }

    const updated = await modelDelegate.update({
      where: { id },
      data: {
        status: ContentStatus.EXPIRED,
        expiredAt: new Date(),
      }
    });

    await auditLogService.logAction({
      userId,
      action: "EXPIRE",
      entityType,
      entityId: id,
      details: { previousStatus: record.status }
    });

    return updated;
  }

  async archiveContent(
    modelDelegate: any,
    entityType: string,
    id: string,
    userId: string
  ) {
    const record = await modelDelegate.findUnique({ where: { id } });
    
    if (!record) throw new Error(`${entityType} not found`);
    
    if (record.status === ContentStatus.ARCHIVED) return record;

    const updated = await modelDelegate.update({
      where: { id },
      data: {
        status: ContentStatus.ARCHIVED,
      }
    });

    await auditLogService.logAction({
      userId,
      action: "ARCHIVE",
      entityType,
      entityId: id,
      details: { previousStatus: record.status }
    });

    return updated;
  }
}

export const contentLifecycleService = new ContentLifecycleService();
