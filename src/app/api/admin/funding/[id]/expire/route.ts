import { NextResponse } from "next/server";
import { fundingService } from "@/lib/services/funding.service";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // In Next 15+ params is a Promise
) {
  try {
    const { id } = await params;
    
    // Authorization, audit logging, and business rules are handled entirely in the service layer
    const result = await fundingService.expireFundingOpportunity(id);
    
    return NextResponse.json({ data: result });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    console.error("Failed to expire funding opportunity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
