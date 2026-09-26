import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/db/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // Grounding: Fetch some context from DB.
    // For this demo, we'll fetch recently published research, jobs, and funding that might match keywords.
    // A robust version would use pgvector, but here we do simple text search or just provide recent records.
    
    // Very simple token matching for demo purposes
    const terms = question.split(' ').filter((t: string) => t.length > 3);
    const searchFilter = terms.length > 0 ? {
      OR: terms.map((t: string) => ({ title: { contains: t, mode: 'insensitive' as const } }))
    } : {};

    const [research, jobs, funds] = await Promise.all([
      prisma.research.findMany({ where: searchFilter, take: 5 }),
      prisma.jobOpportunity.findMany({ where: searchFilter, take: 5 }),
      prisma.fundingOpportunity.findMany({ where: searchFilter, take: 5 }),
    ]);

    let contextText = "DATABASE CONTEXT:\n";
    if (research.length) contextText += `\nResearch: ${research.map(r => r.title).join(', ')}`;
    if (jobs.length) contextText += `\nJobs: ${jobs.map(j => j.title).join(', ')}`;
    if (funds.length) contextText += `\nFunding: ${funds.map(f => f.title).join(', ')}`;

    if (research.length === 0 && jobs.length === 0 && funds.length === 0) {
      contextText += "\nNo matching records found in NanoHelp database.";
    }

    const systemInstruction = `You are NanoAI, the official AI assistant for the NanoHelp platform. 
Your goal is to answer user questions strictly based on the provided DATABASE CONTEXT. 
DO NOT invent, fabricate, or hallucinate researchers, organizations, funding programs, amounts, deadlines, jobs, publications, or technologies.
If the database doesn't contain the requested information, say clearly that the information isn't available in NanoHelp rather than making it up.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\n${contextText}\n\nUSER QUESTION: ${question}` }] }
      ]
    });

    return NextResponse.json({ answer: response.text });
  } catch (error) {
    console.error("NanoAI Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
