import Link from "next/link";
import { Search, MapPin, BookOpen, User, Calendar, Clock, Star, TrendingUp, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { prisma } from "@/lib/db/prisma";

export default async function ResearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  
  const researchItems = await prisma.research.findMany({
    where: { 
      status: "PUBLISHED",
      ...(query ? { 
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { abstract: { contains: query, mode: "insensitive" } }
        ]
      } : {})
    },
    orderBy: { publishedAt: "desc" },
    include: { category: true, institution: true, authors: true }
  });

  return (
    <MainLayout>
      {/* ─── HEADER BAR WITH SEARCH ───────────────────────────────────────────── */}
      <div style={{ background: "var(--bg-deepest)", borderBottom: "1px solid var(--border-subtle)", padding: "32px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-primary)" }}>Research Directory</h1>
          <form action="/research" method="GET" style={{
            flex: 1, maxWidth: "600px", display: "flex", background: "var(--bg-card)",
            border: "1px solid var(--border-card)", borderRadius: "12px", padding: "8px"
          }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "var(--text-muted)" }}><Search size={20} /></div>
            <input type="text" name="q" defaultValue={query} placeholder="Search papers, preprints, patents..." style={{ flex: 1, background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "15px", outline: "none" }} />
            <button type="submit" className="nano-btn-primary" style={{ padding: "8px 20px", borderRadius: "8px" }}>Search</button>
          </form>
        </div>
        
        {/* Popular searches inline */}
        <div style={{ maxWidth: "1200px", margin: "16px auto 0", display: "flex", gap: "12px", fontSize: "13px" }}>
          <span style={{ color: "var(--text-muted)" }}>Popular:</span>
          {["Nanomaterials", "Nanomedicine", "Energy", "Quantum Nanotechnology"].map(tag => (
            <Link href={`/research?q=${encodeURIComponent(tag)}`} key={tag} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>{tag}</Link>
          ))}
        </div>
      </div>

      {/* ─── FILTER TABS ───────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", overflowX: "auto" }}>
          {["All Research", "Publications", "Preprints", "Patents", "Dataset", "Projects"].map(tab => (
            <Link href="#" key={tab} style={{
              padding: "16px 0",
              color: tab === "All Research" ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              borderBottom: tab === "All Research" ? "2px solid var(--accent-purple)" : "2px solid transparent",
              whiteSpace: "nowrap"
            }}>
              {tab}
            </Link>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "240px 1fr 300px", gap: "32px" }}>
        {/* ─── LEFT SIDEBAR (Filters) ──────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[
            { title: "Research Field", opts: ["Nanomaterials", "Nanomedicine", "Nanoelectronics", "Nanophotonics", "Biotechnology"] },
            { title: "Material", opts: ["Graphene", "Carbon Nanotubes", "MXenes", "Quantum Dots", "Silica"] },
            { title: "Application", opts: ["Drug Delivery", "Energy Storage", "Sensors", "Catalysis"] },
            { title: "Publication Year", opts: ["2026", "2025", "2024", "2023", "Older"] },
            { title: "Document Type", opts: ["Journal Article", "Review", "Conference Paper", "Patent"] }
          ].map((filterGroup, i) => (
            <div key={i}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{filterGroup.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filterGroup.opts.map((opt, j) => (
                  <label key={j} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                      {opt}
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{Math.floor(Math.random() * 500) + 10}</span>
                  </label>
                ))}
              </div>
              {i < 4 && <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)", marginTop: "24px" }} />}
            </div>
          ))}
        </div>

        {/* ─── MAIN RESULTS ────────────────────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{researchItems.length} Results</h2>
            <select style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--text-primary)", padding: "8px 12px", borderRadius: "8px", outline: "none", fontSize: "14px" }}>
              <option>Sort by: Most Relevant</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Most Cited</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {researchItems.length > 0 ? researchItems.map(item => (
              <div key={item.id} style={{
                background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", display: "flex", overflow: "hidden", transition: "border-color 0.2s"
              }}>
                <div style={{ width: "160px", background: "rgba(123,92,246,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRight: "1px solid var(--border-subtle)" }}>
                  <BookOpen size={40} color="var(--accent-purple-light)" opacity={0.5} />
                </div>
                <div style={{ padding: "24px", flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ background: "rgba(123,92,246,0.15)", color: "var(--accent-purple-light)", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{item.category?.name || "General"}</span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", padding: "4px 0" }}>Nature Nanotechnology</span>
                    </div>
                  </div>
                  
                  <Link href={`/research/${item.slug}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.4 }}>{item.title}</h3>
                  </Link>

                  <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.abstract}
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "13px", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)" }}><User size={14} /> {item.authors[0]?.authorName || "Alan Smith"} et al.</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={14} /> {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "2026"}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Star size={14} /> 124 Citations</span>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-card)" }}>No research papers found.</div>
            )}
          </div>
        </div>

        {/* ─── RIGHT SIDEBAR ───────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* AI Research Assistant Panel */}
          <div style={{ background: "linear-gradient(135deg, rgba(123,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(123,92,246,0.3)", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Star size={20} color="var(--accent-purple-light)" />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>AI Research Assistant</h3>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>Summarize papers, find related works, and extract data automatically with NanoAI.</p>
            <Link href="/" style={{ display: "block", textAlign: "center", background: "var(--text-primary)", color: "var(--bg-deepest)", padding: "10px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>Try Now</Link>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <TrendingUp size={18} color="var(--accent-purple-light)" />
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>Trending Research</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Synthesis of 2D Transition Metal Carbides (MXenes)",
                "Quantum Dot Displays: Next Generation Metrics",
                "Nanoparticle Drug Delivery for Oncology"
              ].map((prog, i) => (
                <div key={i} style={{ paddingBottom: i !== 2 ? "12px" : "0", borderBottom: i !== 2 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px", lineHeight: 1.4 }}>{prog}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Nature Materials • 14k Views</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESEARCHER SPOTLIGHT ──────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>Researcher Spotlight</h2>
            <Link href="/researchers" style={{ fontSize: "14px", color: "var(--accent-purple-light)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              View All <ChevronRight size={16}/>
            </Link>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
                <div style={{ width: "80px", height: "80px", background: "var(--bg-deepest)", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
                  <User size={32}/>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>Dr. Jane Doe</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>Principal Investigator</p>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span>Stanford University</span>
                  <span>142 Publications</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
