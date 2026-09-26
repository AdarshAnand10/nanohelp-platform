import { NextResponse } from "next/server";
import { fundingService } from "@/lib/services/funding.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const countryId = searchParams.get("countryId") || undefined;

    // Delegate to service layer
    // The service layer handles business rules like hiding DRAFT/ARCHIVED
    const opportunities = await fundingService.getPublicFundingOpportunities({
      page,
      limit,
      countryId,
    });

    return NextResponse.json({ data: opportunities });
  } catch (error) {
    console.error("Failed to fetch funding opportunities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
