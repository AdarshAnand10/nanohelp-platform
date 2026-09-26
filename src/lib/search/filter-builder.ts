import { Prisma } from "@prisma/client";

/**
 * Foundation for relational filtering across the application.
 * These builders construct Prisma Where objects from search parameters.
 */
export class SearchFilterBuilder {
  static buildResearchFilter(params: {
    q?: string;
    fieldId?: string;
    materialId?: string;
    applicationId?: string;
    countryId?: string;
    institutionId?: string;
    year?: number;
    documentType?: string;
  }): Prisma.ResearchWhereInput {
    const where: Prisma.ResearchWhereInput = {};

    if (params.q) {
      where.OR = [
        { title: { contains: params.q, mode: "insensitive" } },
        { abstract: { contains: params.q, mode: "insensitive" } },
      ];
    }
    
    // Relational filtering
    if (params.fieldId) where.categoryId = params.fieldId;
    if (params.institutionId) where.institutionId = params.institutionId;
    if (params.documentType) where.documentType = params.documentType as any;
    if (params.year) {
      where.publishedAt = {
        gte: new Date(params.year, 0, 1),
        lt: new Date(params.year + 1, 0, 1),
      };
    }
    
    if (params.materialId) {
      where.materials = { some: { materialId: params.materialId } };
    }
    
    if (params.applicationId) {
      where.applications = { some: { applicationId: params.applicationId } };
    }

    // Status is always filtered by the service/repository layer
    return where;
  }
}
