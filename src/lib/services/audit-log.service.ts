import { auditLogRepository } from "@/lib/repositories/audit-log.repository";
import { AuditAction } from "@prisma/client";

export class AuditLogService {
  async logAction(params: {
    userId: string;
    action: AuditAction;
    entityType: string;
    entityId: string;
    details?: Record<string, any>;
    ipAddress?: string;
  }) {
    try {
      await auditLogRepository.createLog(params);
    } catch (error) {
      console.error("Failed to write audit log:", error);
      // We usually don't want audit log failures to crash the main transaction
      // But depending on compliance needs, we might want to throw.
    }
  }

  async getEntityHistory(entityType: string, entityId: string) {
    return auditLogRepository.getLogsByEntity(entityType, entityId);
  }
}

export const auditLogService = new AuditLogService();
