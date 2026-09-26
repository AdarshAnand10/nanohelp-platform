import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ data: [] });
    }

    const whereSearch = {
      title: { contains: q, mode: 'insensitive' as const }
    };

    const [research, jobs, funds] = await Promise.all([
      prisma.research.findMany({ where: whereSearch, take: 5, select: { id: true, title: true, slug: true } }),
      prisma.jobOpportunity.findMany({ where: whereSearch, take: 5, select: { id: true, title: true, slug: true } }),
      prisma.fundingOpportunity.findMany({ where: whereSearch, take: 5, select: { id: true, title: true, slug: true } }),
    ]);

    const results = {
      research,
      jobs,
      funds
    };

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Global search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
