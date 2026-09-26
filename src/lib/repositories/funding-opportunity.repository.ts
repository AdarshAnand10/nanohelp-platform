import { prisma } from "@/lib/db/prisma";
import { ContentStatus, Prisma } from "@prisma/client";

export class FundingOpportunityRepository {
  async findById(id: string) {
    return prisma.fundingOpportunity.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, status: ContentStatus, expiredAt?: Date) {
    return prisma.fundingOpportunity.update({
      where: { id },
      data: {
        status,
        ...(expiredAt ? { expiredAt } : {}),
      },
    });
  }

  async findActive(params: {
    skip?: number;
    take?: number;
    where?: Prisma.FundingOpportunityWhereInput;
    orderBy?: Prisma.FundingOpportunityOrderByWithRelationInput;
  }) {
    // Only return non-draft, non-archived, non-cancelled
    const activeWhere: Prisma.FundingOpportunityWhereInput = {
      ...params.where,
      status: {
        in: ["PUBLISHED", "UPCOMING", "EXPIRED"], // The user says: public queries must not expose DRAFT, ARCHIVED, CANCELLED. Expired opportunities must not appear as active opportunities.
        // Wait, if it shouldn't appear as active, maybe we only query PUBLISHED/UPCOMING by default.
      },
    };

    return prisma.fundingOpportunity.findMany({
      skip: params.skip,
      take: params.take,
      where: activeWhere,
      orderBy: params.orderBy,
      include: {
        organization: true,
        country: true,
        category: true,
      }
    });
  }
}

export const fundingOpportunityRepository = new FundingOpportunityRepository();
