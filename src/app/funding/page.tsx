import Link from "next/link";
import { Search, MapPin, DollarSign, Globe2, ChevronRight, Clock, Star, Bell } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { prisma } from "@/lib/db/prisma";

export default async function FundingPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category;
  
  const fundings = await prisma.fundingOpportunity.findMany({
    where: { 
      status: "PUBLISHED"
    },
    orderBy: { deadline: "asc" },
    include: { organization: true, country: true, category: true }
  });

  return (
    <MainLayout>
      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section style={{ 
        background: "var(--bg-deepest)",
        padding: "60px 20px 40px",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "16px", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Find Funding for Your <span style={{ color: "var(--accent-purple-light)" }}>Next Idea</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 32px" }}>
            Access research grants, innovation funding, fellowships, and startup investments in nanotechnology from global institutions.
          </p>

          <form action="/funding" method="GET" style={{
            maxWidth: "700px", margin: "0 auto 24px", display: "flex", background: "var(--bg-card)",
            border: "1px solid var(--border-card)", borderRadius: "12px", padding: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "var(--text-muted)" }}><Search size={20} /></div>
            <input type="text" name="q" placeholder="Search by grant name, keyword, or organization..." style={{ flex: 1, background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "15px", outline: "none" }} />
            <button type="submit" className="nano-btn-primary" style={{ padding: "12px 24px", borderRadius: "8px" }}>Search</button>
          </form>

          {/* Popular Search Tags */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", fontSize: "14px" }}>
            <span style={{ color: "var(--text-muted)" }}>Popular:</span>
            {["Horizon Europe", "NSF Grants", "Startup Seed", "Postdoc Fellowships"].map(tag => (
              <Link href={`/funding?q=${encodeURIComponent(tag)}`} key={tag} style={{
                color: "var(--accent-purple-light)",
                textDecoration: "underline",
                textDecorationColor: "rgba(123,92,246,0.3)"
              }}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY NAV TABS ─────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "24px", overflowX: "auto" }}>
          {["All Funding Opportunities", "EU Funding", "National Funding", "PhD & Fellowship", "Research Grants", "Innovation Funding", "Startup Funding", "Industry Funding", "Mobility Grants"].map(tab => (
            <Link href={`/funding${tab !== "All Funding Opportunities" ? `?category=${tab}` : ""}`} key={tab} style={{
              padding: "16px 0",
              color: tab === "All Funding Opportunities" && !categoryFilter ? "var(--text-primary)" : categoryFilter === tab ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              borderBottom: tab === "All Funding Opportunities" && !categoryFilter ? "2px solid var(--accent-purple)" : categoryFilter === tab ? "2px solid var(--accent-purple)" : "2px solid transparent",
              whiteSpace: "nowrap"
            }}>
              {tab}
            </Link>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "260px 1fr 300px", gap: "32px" }}>
        {/* ─── LEFT SIDEBAR (Filters) ──────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Country / Region</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["European Union", "United States", "United Kingdom", "Germany", "Global"].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)" }} />
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Applicant Type</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Individual Researcher", "University / Institution", "SME / Startup", "Consortium"].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)" }} />
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Funding Amount</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Under €50k", "€50k - €250k", "€250k - €1M", "Over €1M"].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ─── MAIN RESULTS ────────────────────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{fundings.length} Funding Opportunities</h2>
            <select style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--text-primary)", padding: "8px 12px", borderRadius: "8px", outline: "none", fontSize: "14px" }}>
              <option>Deadline: Soonest</option>
              <option>Recently Added</option>
              <option>Highest Amount</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {fundings.length > 0 ? fundings.map(fund => (
              <div key={fund.id} style={{
                background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "24px", transition: "border-color 0.2s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "48px", height: "48px", background: "rgba(123,92,246,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-purple-light)", flexShrink: 0 }}>
                      <Globe2 size={24} />
                    </div>
                    <div>
                      <span style={{ display: "inline-block", background: "rgba(123,92,246,0.15)", color: "var(--accent-purple-light)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>
                        {fund.fundingType || "Public Grant"}
                      </span>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{fund.title}</h3>
                      <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{fund.organization?.name || "Funding Body"}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>
                      {fund.amountMax ? `${fund.amountCurrency} ${(fund.amountMax / 1000).toFixed(0)}k+` : "Variable"}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {fund.country?.name || "Global / EU"}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> {fund.deadline ? new Date(fund.deadline).toISOString().split('T')[0] : "Rolling Deadline"}</span>
                </div>

                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  {["Nanomaterials", "Biotech", "Consortium"].map(tag => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-secondary)", fontSize: "12px", padding: "4px 10px", borderRadius: "6px" }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link href={`/funding/${fund.slug}`} className="nano-btn-primary" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>
                    View Details
                  </Link>
                </div>
              </div>
            )) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-card)" }}>No funding opportunities found.</div>
            )}
          </div>
        </div>

        {/* ─── RIGHT SIDEBAR ───────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* AI Funding Assistant Panel */}
          <div style={{ background: "linear-gradient(135deg, rgba(123,92,246,0.1) 0%, rgba(236,72,153,0.1) 100%)", border: "1px solid rgba(123,92,246,0.3)", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Star size={20} color="var(--accent-purple-light)" />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>AI Funding Assistant</h3>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>Let NanoAI match your research profile with the perfect grant opportunities automatically.</p>
            <Link href="/" style={{ display: "block", textAlign: "center", background: "var(--text-primary)", color: "var(--bg-deepest)", padding: "10px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>Match Me</Link>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Bell size={18} color="var(--text-secondary)" />
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Funding Alerts</h3>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px" }}>Get notified when new grants match your criteria.</p>
            <button style={{ width: "100%", background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Create Alert</button>
          </div>
          
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Featured Programmes</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Horizon Europe", "ERC Starting Grants", "NSF Nanosystems"].map((prog, i) => (
                <div key={i}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>{prog}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Closes in 45 days</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
