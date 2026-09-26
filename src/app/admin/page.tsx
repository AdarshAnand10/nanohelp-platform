import MainLayout from "@/components/layout/MainLayout";
import { prisma } from "@/lib/db/prisma";
import { Users, FileText, Banknote, Briefcase } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/authorization";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  // Basic simulation of auth check for demo purposes
  // if (!user || user.role === "USER") redirect("/login");

  const [researchCount, fundingCount, jobsCount, usersCount] = await Promise.all([
    prisma.research.count(),
    prisma.fundingOpportunity.count(),
    prisma.jobOpportunity.count(),
    prisma.user.count(),
  ]);

  return (
    <MainLayout>
      <section style={{ padding: "40px 0", background: "var(--bg-primary)" }}>
        <div className="page-container">
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "32px" }}>Admin Dashboard</h1>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "48px" }}>
            {[
               { title: "Research", count: researchCount, icon: FileText, href: "/admin/research" },
               { title: "Funding", count: fundingCount, icon: Banknote, href: "/admin/funding" },
               { title: "Jobs", count: jobsCount, icon: Briefcase, href: "/admin/jobs" },
               { title: "Users", count: usersCount, icon: Users, href: "/admin/users" },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <Link key={stat.title} href={stat.href} className="nano-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px", textDecoration: "none" }}>
                   <div style={{ width: "48px", height: "48px", background: "rgba(123, 92, 246, 0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                     <Icon size={24} color="var(--accent-purple)" />
                   </div>
                   <div>
                     <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 600 }}>{stat.title}</div>
                     <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>{stat.count}</div>
                   </div>
                </Link>
              )
            })}
          </div>

          <div className="nano-card" style={{ padding: "32px" }}>
             <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "24px" }}>Recent Audit Logs</h2>
             <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
               <thead>
                 <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                   <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Action</th>
                   <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Entity</th>
                   <th style={{ padding: "12px", color: "var(--text-secondary)" }}>ID</th>
                   <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Time</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)" }}>No recent logs.</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
