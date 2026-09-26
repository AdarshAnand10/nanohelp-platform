import Link from "next/link";
import { Search, MapPin, Building, GraduationCap, Microscope, DollarSign, Briefcase, Cpu, ArrowRight, BookOpen, User, Star, Globe, Calendar, Mail, CheckCircle2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

import { prisma } from "@/lib/db/prisma";

export default async function HomePage() {
  const latestResearch = await prisma.research.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 4,
    include: { category: true, institution: true, authors: true }
  });
  return (
    <MainLayout>
      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section 
        style={{ 
          background: "radial-gradient(ellipse at top, #110B29 0%, #040B1C 50%, #020817 100%)",
          padding: "100px 20px 80px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-subtle)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(123, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <h1 style={{ 
            fontSize: "64px", 
            fontWeight: 800, 
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "24px",
            color: "var(--text-primary)"
          }}>
            Connecting <span style={{ color: "var(--accent-purple-light)" }}>Nanotechnology</span><br/>to the World
          </h1>
          <p style={{
            fontSize: "20px",
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto 48px",
            lineHeight: 1.5
          }}>
            The global ecosystem for nanotechnology research, talent, funding, laboratories, companies, and emerging technologies.
          </p>

          {/* Search Bar */}
          <form action="/research" method="GET" style={{
            maxWidth: "760px",
            margin: "0 auto 24px",
            display: "flex",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            padding: "8px",
            backdropFilter: "blur(12px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "var(--text-muted)" }}>
              <Search size={22} />
            </div>
            <input 
              type="text" 
              name="q"
              placeholder="Search researchers, papers, jobs, funding, or companies..." 
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "var(--text-primary)",
                fontSize: "16px",
                outline: "none",
                padding: "16px 0"
              }}
            />
            <button type="submit" style={{
              background: "var(--accent-purple)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "0 32px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s"
            }}>
              Search
            </button>
          </form>

          {/* Popular Searches */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", fontSize: "14px" }}>
            <span style={{ color: "var(--text-muted)" }}>Popular:</span>
            {["2D Materials", "Nanomedicine Postdoc", "Quantum Dots", "Horizon Europe"].map(tag => (
              <Link href={`/research?q=${encodeURIComponent(tag)}`} key={tag} style={{
                background: "rgba(123, 92, 246, 0.1)",
                color: "var(--accent-purple-light)",
                padding: "6px 16px",
                borderRadius: "20px",
                textDecoration: "none",
                border: "1px solid rgba(123, 92, 246, 0.2)"
              }}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUICK DISCOVERY ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "16px"
        }}>
          {[
            { label: "Find a Researcher", icon: User, color: "#3B82F6", href: "/research" },
            { label: "Find a Lab", icon: Microscope, color: "#10B981", href: "/research" },
            { label: "Find a Job", icon: Briefcase, color: "#F59E0B", href: "/careers" },
            { label: "Find Funding", icon: DollarSign, color: "#8B5CF6", href: "/funding" },
            { label: "Find a Company", icon: Building, color: "#EC4899", href: "/research" },
            { label: "Find a Technology", icon: Cpu, color: "#6366F1", href: "/research" },
          ].map((action, i) => (
            <Link href={action.href} key={i} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: "16px",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              color: "var(--text-primary)",
              transition: "transform 0.2s, border-color 0.2s"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: `rgba(${parseInt(action.color.slice(1,3),16)}, ${parseInt(action.color.slice(3,5),16)}, ${parseInt(action.color.slice(5,7),16)}, 0.1)`,
                color: action.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <action.icon size={24} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CATEGORY STRIP ──────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", overflowX: "auto" }}>
          {[
            { name: "Research", icon: BookOpen, active: true, href: "/research" },
            { name: "Talent", icon: User, href: "/careers" },
            { name: "Funding", icon: DollarSign, href: "/funding" },
            { name: "Labs", icon: Microscope, href: "/research" },
            { name: "Technology", icon: Cpu, href: "/research" },
            { name: "Industry", icon: Building, href: "/research" }
          ].map(cat => (
            <Link href={cat.href || "#"} key={cat.name} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "20px 32px",
              textDecoration: "none",
              borderBottom: cat.active ? "2px solid var(--accent-purple)" : "2px solid transparent",
              color: cat.active ? "var(--text-primary)" : "var(--text-secondary)",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}>
              <cat.icon size={18} color={cat.active ? "var(--accent-purple)" : "currentColor"} />
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── EXPLORE NANOHELP ────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>Explore NanoHelp</h2>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Dive into the core pillars of the global nanotechnology network.</p>
          </div>
          <Link href="/research" style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-purple-light)", fontWeight: 600, textDecoration: "none" }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px"
        }}>
          {[
            { title: "Research", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800", count: "1.2M+ Papers", href: "/research" },
            { title: "Careers", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", count: "4,500+ Jobs", href: "/careers" },
            { title: "Funding", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800", count: "$2.4B+ Available", href: "/funding" },
            { title: "Laboratories", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800", count: "8,000+ Labs", href: "/research" },
            { title: "Companies", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", count: "12,000+ Orgs", href: "/research" },
            { title: "Experts", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800", count: "150k+ Researchers", href: "/research" },
          ].map((card, i) => (
            <Link href={card.href} key={i} style={{
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              height: "240px",
              border: "1px solid var(--border-card)",
              textDecoration: "none",
              display: "block"
            }}>
              <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(2,8,23,0.9) 0%, rgba(2,8,23,0) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px"
              }}>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{card.title}</h3>
                <p style={{ color: "var(--accent-purple-light)", fontSize: "14px", fontWeight: 600 }}>{card.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── LATEST RESEARCH ──────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "32px", color: "var(--text-primary)" }}>Latest Research & Publications</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {latestResearch.length > 0 ? latestResearch.map((item) => (
            <Link href={`/research`} key={item.id} style={{
              display: "flex",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: "16px",
              overflow: "hidden",
              textDecoration: "none"
            }}>
              <div style={{ width: "160px", background: "rgba(123, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookOpen size={48} color="var(--accent-purple)" opacity={0.5} />
              </div>
              <div style={{ padding: "24px", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent-purple-light)", background: "rgba(123, 92, 246, 0.15)", padding: "4px 10px", borderRadius: "12px", whiteSpace: "nowrap" }}>{item.category?.name || "General"}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", padding: "4px 0", whiteSpace: "nowrap" }}>{item.institution?.name || "Unknown Inst"}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {item.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "var(--text-secondary)", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}><User size={14}/> {item.authors[0]?.authorName || "Various Authors"}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}><Calendar size={14}/> {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "2026"}</span>
                </div>
              </div>
            </Link>
          )) : (
            <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>No research published yet.</div>
          )}
        </div>
      </section>

      {/* ─── WHAT ARE YOU LOOKING FOR ────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px", textAlign: "center", color: "var(--text-primary)" }}>What Are You Looking For?</h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", textAlign: "center", marginBottom: "48px" }}>Tailored portals for your specific goals in nanotechnology.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { title: "I am a Researcher", desc: "Find grants, labs, and collaborators", icon: Microscope, href: "/research" },
              { title: "I am an Employer", desc: "Post jobs and find top nano talent", icon: Building, href: "/careers" },
              { title: "I am an Investor", desc: "Discover deep-tech startups", icon: DollarSign, href: "/companies" },
              { title: "I am a Student", desc: "Find PhDs and internships", icon: GraduationCap, href: "/careers" },
            ].map((card, i) => (
              <div key={i} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center"
              }}>
                <div style={{ width: "64px", height: "64px", background: "var(--accent-purple)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "white" }}>
                  <card.icon size={32} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.5 }}>{card.desc}</p>
                <Link href={card.href} style={{ color: "var(--accent-purple-light)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NANOAI PANEL ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px" }}>
        <div style={{
          background: "linear-gradient(135deg, #0A0520 0%, #1A0B3B 100%)",
          border: "1px solid rgba(123, 92, 246, 0.3)",
          borderRadius: "24px",
          padding: "60px",
          display: "flex",
          alignItems: "center",
          gap: "60px"
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ background: "rgba(236, 72, 153, 0.2)", color: "#EC4899", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Star size={12} fill="currentColor" /> NEW FEATURE
              </div>
            </div>
            <h2 style={{ fontSize: "40px", fontWeight: 800, marginBottom: "20px", color: "white", lineHeight: 1.1 }}>
              Meet <span style={{ background: "linear-gradient(90deg, #7B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NanoAI</span>
            </h2>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", marginBottom: "32px", lineHeight: 1.6 }}>
              Your intelligent research assistant. Ask complex questions about nanomaterials, synthesize findings across millions of papers, and identify funding opportunities automatically.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/" style={{ background: "white", color: "#1A0B3B", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, textDecoration: "none" }}>
                Try NanoAI
              </Link>
              <Link href="/" style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "14px 28px", borderRadius: "12px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
                Learn More
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, background: "var(--bg-deepest)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border-subtle)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "32px", background: "var(--accent-purple)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><User size={16}/></div>
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", color: "var(--text-primary)", flex: 1 }}>What are the latest applications of MXenes in battery tech?</div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #7B5CF6, #EC4899)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><Star size={16}/></div>
              <div style={{ background: "rgba(123, 92, 246, 0.1)", border: "1px solid rgba(123, 92, 246, 0.2)", padding: "16px", borderRadius: "12px", fontSize: "14px", color: "var(--text-primary)", flex: 1, lineHeight: 1.6 }}>
                Based on 14 recent papers from 2025-2026, MXenes are primarily being utilized for solid-state electrolytes and high-capacity sulfur cathodes...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NANOHELP MONTHLY & CONFERENCES ────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        
        {/* NanoHelp Monthly */}
        <div style={{ background: "var(--bg-secondary)", borderRadius: "24px", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
          <div style={{ height: "240px", background: "url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000') center/cover" }} />
          <div style={{ padding: "40px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>NanoHelp Monthly</h3>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.2 }}>The Future of Quantum Sensing Technologies</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "32px", lineHeight: 1.6 }}>Read our exclusive editorial deep dive into how quantum dots and diamond NV centers are revolutionizing medical diagnostics.</p>
            <button className="nano-btn-primary">Read Full Issue</button>
          </div>
        </div>

        {/* Upcoming Conferences */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "32px", color: "var(--text-primary)" }}>Upcoming Conferences</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { date: "Nov 12", title: "Global Nanotech Summit 2026", loc: "Berlin, Germany" },
              { date: "Dec 05", title: "International Conference on 2D Materials", loc: "Tokyo, Japan" },
              { date: "Jan 18", title: "NanoMedicine Advancements", loc: "Boston, MA, USA" },
              { date: "Feb 22", title: "Quantum Nanophotonics Workshop", loc: "Virtual" }
            ].map((conf, i) => (
              <div key={i} style={{ display: "flex", gap: "24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ width: "64px", height: "64px", background: "rgba(123, 92, 246, 0.1)", color: "var(--accent-purple-light)", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>{conf.date.split(' ')[0]}</span>
                  <span style={{ fontSize: "20px", fontWeight: 800 }}>{conf.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>{conf.title}</h3>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-secondary)" }}>
                    <MapPin size={14}/> {conf.loc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GLOBAL ECOSYSTEM MAP (Visual Stand-in) ──────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", padding: "100px 0", background: "var(--bg-deepest)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 10, padding: "0 20px" }}>
          <Globe size={48} color="var(--accent-purple-light)" style={{ margin: "0 auto 24px" }} />
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "24px" }}>Global Nanotechnology Ecosystem</h2>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: 1.6 }}>
            Connect with 12,000+ organizations and 150,000+ researchers across 120 countries. Mapping the world's most advanced technologies.
          </p>
          <button className="nano-btn-primary" style={{ padding: "14px 32px", fontSize: "16px" }}>Explore the Map</button>
        </div>
        {/* Placeholder for map background graphic */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000') center/cover", opacity: 0.1, zIndex: 0, pointerEvents: "none" }} />
      </section>

      {/* ─── PARTNERS STRIP ──────────────────────────────────────────────────── */}
      <div style={{ padding: "40px 20px", borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "32px" }}>Trusted by leading institutions globally</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap", opacity: 0.5 }}>
            {/* Logos represented by text in placeholder */}
            <span style={{ fontSize: "24px", fontWeight: 800, fontFamily: "serif" }}>MIT Nano</span>
            <span style={{ fontSize: "24px", fontWeight: 800, fontFamily: "sans-serif" }}>STANFORD</span>
            <span style={{ fontSize: "24px", fontWeight: 800, fontFamily: "monospace" }}>NATURE</span>
            <span style={{ fontSize: "24px", fontWeight: 800, fontFamily: "serif" }}>Oxford</span>
            <span style={{ fontSize: "24px", fontWeight: 800, fontFamily: "sans-serif" }}>Max Planck</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
