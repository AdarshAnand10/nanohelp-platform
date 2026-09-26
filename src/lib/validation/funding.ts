import { z } from "zod";
import { contentStatusSchema } from "./base";

export const createFundingOpportunitySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  amountMin: z.number().nullable().optional(),
  amountMax: z.number().nullable().optional(),
  currency: z.string().default("EUR"),
  deadline: z.date().nullable().optional(),
  organizationId: z.string().cuid(),
  status: contentStatusSchema.default("DRAFT"),
});

export const updateFundingOpportunitySchema = createFundingOpportunitySchema.partial().extend({
  id: z.string().cuid(),
});

export type CreateFundingOpportunityInput = z.infer<typeof createFundingOpportunitySchema>;
export type UpdateFundingOpportunityInput = z.infer<typeof updateFundingOpportunitySchema>;
