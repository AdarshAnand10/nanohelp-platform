import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    // Simulate user for demo if not logged in
    const userId = user?.id || "demo-user-id";

    const { entityType, entityId } = await request.json();

    if (!entityType || !entityId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (entityType === "RESEARCH") {
      await prisma.researchBookmark.create({
        data: { userId, researchId: entityId }
      });
    } else if (entityType === "JOB") {
      await prisma.jobBookmark.create({
        data: { userId, jobId: entityId }
      });
    } else if (entityType === "FUNDING") {
      await prisma.fundingBookmark.create({
        data: { userId, fundingId: entityId }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bookmark Error:", error);
    return NextResponse.json({ error: "Failed to bookmark" }, { status: 500 });
  }
}
