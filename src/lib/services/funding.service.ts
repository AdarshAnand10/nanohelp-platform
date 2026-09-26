import { requireAuth, requireRole, hasRole } from "@/lib/auth/authorization";
import { fundingOpportunityRepository } from "@/lib/repositories/funding-opportunity.repository";
import { auditLogService } from "./audit-log.service";
import { contentLifecycleService } from "./content-lifecycle.service";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export class FundingService {
  async getPublicFundingOpportunities(params: {
    page?: number;
    limit?: number;
    countryId?: string;
    researchFieldId?: string;
    // other filters
  }) {
    // Only return published/upcoming/expired (though expired shouldn't show as active, we can filter them)
    // Actually, the repo handles this. Let's just build the where clause.
    const where: Prisma.FundingOpportunityWhereInput = {};
    
    if (params.countryId) {
      where.countryId = params.countryId;
    }
    
    // Add other filters as needed...

    return fundingOpportunityRepository.findActive({
      skip: ((params.page || 1) - 1) * (params.limit || 20),
      take: params.limit || 20,
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAdminFundingOpportunities() {
    await requireRole("ADMIN"); // Or EDITOR, based on exact requirements
    // Admin can see everything including DRAFT, ARCHIVED, CANCELLED
    return prisma.fundingOpportunity.findMany({
      orderBy: { createdAt: 'desc' },
      include: { organization: true }
    });
  }

  async expireFundingOpportunity(id: string) {
    const user = await requireRole("ADMIN");
    return contentLifecycleService.expireContent(
      prisma.fundingOpportunity,
      "FundingOpportunity",
      id,
      user.id
    );
  }

  async archiveFundingOpportunity(id: string) {
    const user = await requireRole("ADMIN");
    return contentLifecycleService.archiveContent(
      prisma.fundingOpportunity,
      "FundingOpportunity",
      id,
      user.id
    );
  }

  // Example of using Zod and Auth together
  // async createFunding(input: CreateFundingOpportunityInput) { ... }
}

export const fundingService = new FundingService();
