import Link from "next/link";
import { Search, MapPin, Briefcase, Building, ChevronRight, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { prisma } from "@/lib/db/prisma";

export default async function CareersPage({ searchParams }: { searchParams: { type?: string } }) {
  const typeFilter = searchParams.type;
  
  const jobs = await prisma.jobOpportunity.findMany({
    where: { 
      status: "PUBLISHED",
      ...(typeFilter ? { opportunityType: typeFilter as any } : {})
    },
    orderBy: { createdAt: "desc" },
    include: { company: true }
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
            Build Your Career in <span style={{ background: "linear-gradient(90deg, #7B5CF6, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nanotechnology</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 32px" }}>
            Discover thousands of high-impact jobs, PhD positions, and postdocs at top universities and deep-tech companies globally.
          </p>

          <form action="/careers" method="GET" style={{
            maxWidth: "700px", margin: "0 auto", display: "flex", background: "var(--bg-card)",
            border: "1px solid var(--border-card)", borderRadius: "12px", padding: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "var(--text-muted)" }}><Search size={20} /></div>
            <input type="text" name="q" placeholder="Job title, skill, or company..." style={{ flex: 1, background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "15px", outline: "none" }} />
            <div style={{ width: "1px", background: "var(--border-subtle)", margin: "0 8px" }} />
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "var(--text-muted)" }}><MapPin size={20} /></div>
            <input type="text" name="location" placeholder="City, state, or 'remote'" style={{ flex: 1, background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "15px", outline: "none" }} />
            <button type="submit" className="nano-btn-primary" style={{ padding: "12px 24px", borderRadius: "8px" }}>Search</button>
          </form>
        </div>
      </section>

      {/* ─── FILTER TABS ───────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "32px", overflowX: "auto" }}>
          {["All", "Jobs", "PhD", "Postdoc", "Internships", "Industry", "Academic"].map(tab => (
            <Link href={`/careers${tab !== "All" ? `?type=${tab.toUpperCase()}` : ""}`} key={tab} style={{
              padding: "16px 0",
              color: tab === "All" && !typeFilter ? "var(--text-primary)" : typeFilter === tab.toUpperCase() ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              borderBottom: tab === "All" && !typeFilter ? "2px solid var(--accent-purple)" : typeFilter === tab.toUpperCase() ? "2px solid var(--accent-purple)" : "2px solid transparent",
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
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Employment Type</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Full-time", "Part-time", "Contract", "Temporary"].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)" }} />
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Career Level</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Student", "Entry Level", "Mid Level", "Senior", "Executive"].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--accent-purple)", width: "16px", height: "16px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)" }} />
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Organization Type</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["University", "Research Institute", "Startup", "Corporation", "Government"].map(opt => (
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
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{jobs.length} Opportunities found</h2>
            <select style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--text-primary)", padding: "8px 12px", borderRadius: "8px", outline: "none", fontSize: "14px" }}>
              <option>Most Recent</option>
              <option>Most Relevant</option>
              <option>Highest Salary</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {jobs.length > 0 ? jobs.map(job => (
              <div key={job.id} style={{
                background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "24px", display: "flex", gap: "20px", transition: "border-color 0.2s"
              }}>
                <div style={{ width: "64px", height: "64px", background: "rgba(123,92,246,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-purple-light)", flexShrink: 0 }}>
                  <Building size={32} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>{job.title}</h3>
                      <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{job.company?.name || "Confidential Company"}</div>
                    </div>
                    <span style={{ background: "rgba(123,92,246,0.15)", color: "var(--accent-purple-light)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{job.opportunityType}</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {job.location || "Remote"}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Briefcase size={14} /> {job.employmentMode || "Full-time"}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> 2 days ago</span>
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                    {["Nanophotonics", "Optics", "Research"].map(tag => (
                      <span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-secondary)", fontSize: "12px", padding: "4px 10px", borderRadius: "6px" }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                      Deadline: <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{job.deadline ? new Date(job.deadline).toLocaleDateString() : "Rolling"}</strong>
                    </div>
                    <Link href={`/careers/${job.slug}`} className="nano-btn-primary" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-card)" }}>No opportunities found.</div>
            )}
          </div>
        </div>

        {/* ─── RIGHT SIDEBAR ───────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(123,92,246,0.1) 0%, rgba(236,72,153,0.1) 100%)", border: "1px solid rgba(123,92,246,0.2)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>Looking for Nano Talent?</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>Reach over 150,000 specialized researchers, postdocs, and engineers globally.</p>
            <button style={{ width: "100%", background: "var(--text-primary)", color: "var(--bg-deepest)", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Post a Job</button>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Featured Employers</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["NanoCorp Tech", "Quantum Materials Institute", "Advanced Photonics Lab"].map((emp, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><Building size={20}/></div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{emp}</div>
                    <div style={{ fontSize: "12px", color: "var(--accent-purple-light)" }}>4 Open Roles</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* ─── BOTTOM CTA BANNER ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "40px auto 80px", background: "linear-gradient(90deg, #1A0B3B, #0A0520)", borderRadius: "24px", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(123,92,246,0.3)" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "12px" }}>Shape the Future with Us</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>Join NanoHelp today to set up personalized career alerts.</p>
        </div>
        <Link href="/auth/register" style={{ background: "var(--accent-purple)", color: "white", padding: "14px 28px", borderRadius: "12px", fontWeight: 600, textDecoration: "none", boxShadow: "var(--shadow-purple-btn)" }}>
          Create Profile
        </Link>
      </section>
    </MainLayout>
  );
}
