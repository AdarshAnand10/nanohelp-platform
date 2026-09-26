import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export class ResearchRepository {
  async findActive(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ResearchWhereInput;
    orderBy?: Prisma.ResearchOrderByWithRelationInput;
  }) {
    const activeWhere: Prisma.ResearchWhereInput = {
      ...params.where,
      status: {
        in: ["PUBLISHED", "UPCOMING", "EXPIRED"],
      },
    };

    return prisma.research.findMany({
      skip: params.skip,
      take: params.take,
      where: activeWhere,
      orderBy: params.orderBy,
      include: {
        category: true,
        institution: true,
        authors: { include: { researcher: true } },
      }
    });
  }
}

export const researchRepository = new ResearchRepository();
