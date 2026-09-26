import Link from "next/link";
import NanoHelpLogo from "@/components/ui/NanoHelpLogo";

const footerLinks = {
  Discover: [
    { label: "Research", href: "/research" },
    { label: "Researchers", href: "/researchers" },
    { label: "Laboratories", href: "/laboratories" },
    { label: "Technologies", href: "/technologies" },
    { label: "Journals", href: "/journals" },
  ],
  Opportunities: [
    { label: "Jobs & Careers", href: "/careers" },
    { label: "PhD Positions", href: "/careers?type=PHD" },
    { label: "Postdoctoral", href: "/careers?type=POSTDOC" },
    { label: "Funding", href: "/funding" },
    { label: "Conferences", href: "/conferences" },
  ],
  Ecosystem: [
    { label: "Companies", href: "/companies" },
    { label: "Institutions", href: "/institutions" },
    { label: "Industry", href: "/industry" },
    { label: "Startups", href: "/companies?type=startup" },
    { label: "Partners", href: "/partners" },
  ],
  NanoHelp: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "NanoAI", href: "/nanoai" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const researchCategories = [
  "Nanomaterials",
  "Nanomedicine",
  "Nanoelectronics",
  "Nanophotonics",
  "Energy Nano",
  "Environmental Nano",
  "Nanobiotechnology",
  "2D Materials",
  "Nanocatalysis",
  "Quantum Nano",
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deepest)",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "80px",
      }}
    >
      {/* Main Footer Content */}
      <div
        className="page-container"
        style={{ padding: "60px 24px 40px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px repeat(4, 1fr)",
            gap: "48px",
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <NanoHelpLogo size={44} />
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  NanoHelp
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  Nanotechnology Research & Opportunity Ecosystem
                </div>
              </div>
            </Link>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Connecting the global nanotechnology community — research,
              talent, funding, laboratories, companies, and technologies all
              in one ecosystem.
            </p>
            {/* Newsletter Subscribe */}
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "10px",
                }}
              >
                Get NanoHelp Monthly
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="nano-input"
                  style={{ fontSize: "13px", padding: "9px 12px" }}
                />
                <button
                  className="nano-btn-primary"
                  style={{ flexShrink: 0, padding: "9px 14px", fontSize: "13px" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "16px",
                }}
              >
                {section}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "10px" }}>
                    <Link
                      href={link.href}
                      className="nano-footer-link"
                      style={{
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Research Categories Strip */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "12px",
            }}
          >
            Popular Research Fields:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {researchCategories.map((cat) => (
              <Link
                key={cat}
                href={`/research?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="nano-footer-cat-link"
                style={{
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} NanoHelp. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="nano-footer-bottom-link"
                  style={{
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
