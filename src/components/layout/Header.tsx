"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import NanoHelpLogo from "@/components/ui/NanoHelpLogo";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  {
    label: "Discover",
    href: "#",
    children: [
      { label: "Research", href: "/research" },
      { label: "Researchers", href: "/researchers" },
      { label: "Laboratories", href: "/laboratories" },
      { label: "Technologies", href: "/technologies" },
      { label: "Journals", href: "/journals" },
    ],
  },
  {
    label: "Opportunities",
    href: "#",
    children: [
      { label: "Jobs", href: "/careers" },
      { label: "PhD Positions", href: "/careers?type=PHD" },
      { label: "Postdoctoral", href: "/careers?type=POSTDOC" },
      { label: "Internships", href: "/careers?type=INTERNSHIP" },
      { label: "Funding", href: "/funding" },
      { label: "Conferences", href: "/conferences" },
    ],
  },
  {
    label: "Ecosystem",
    href: "#",
    children: [
      { label: "Companies", href: "/companies" },
      { label: "Universities", href: "/institutions?type=university" },
      { label: "Laboratories", href: "/laboratories" },
      { label: "Startups", href: "/companies?type=startup" },
      { label: "Equipment", href: "/equipment" },
    ],
  },
  {
    label: "Connect",
    href: "#",
    children: [
      { label: "Experts", href: "/researchers" },
      { label: "Labs", href: "/laboratories" },
      { label: "Technologies", href: "/technologies" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    label: "Industry",
    href: "#",
    children: [
      { label: "Industry Intelligence", href: "/industry" },
      { label: "Technologies", href: "/technologies" },
      { label: "Patents", href: "/patents" },
      { label: "Products", href: "/products" },
      { label: "Marketplace", href: "/marketplace" },
    ],
  },
  {
    label: "NanoAI",
    href: "/nanoai",
    children: [
      { label: "NanoAI Search", href: "/nanoai" },
      { label: "Research Assistant", href: "/nanoai/research" },
      { label: "Funding Assistant", href: "/nanoai/funding" },
      { label: "Industry Intelligence", href: "/nanoai/industry" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();

  const handleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="page-container"
        style={{
          display: "flex",
          alignItems: "center",
          height: "68px",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <NanoHelpLogo size={40} />
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              NanoHelp
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "var(--text-muted)",
                marginTop: "2px",
                letterSpacing: "0.02em",
              }}
            >
              Connecting Nanotechnology to the World
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flex: 1,
          }}
          className="hidden-mobile"
        >
          {navItems.map((item) => (
            <div key={item.label} style={{ position: "relative" }}>
              <button
                onClick={() => handleDropdown(item.label)}
                onBlur={() =>
                  setTimeout(() => setOpenDropdown(null), 150)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 12px",
                  background: "none",
                  border: "none",
                  color:
                    openDropdown === item.label
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "color 0.15s ease, background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--text-primary)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(123, 92, 246, 0.08)";
                }}
                onMouseLeave={(e) => {
                  if (openDropdown !== item.label) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-secondary)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "none";
                  }
                }}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  style={{
                    transform:
                      openDropdown === item.label
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {/* Dropdown */}
              {openDropdown === item.label && item.children && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "0",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "12px",
                    padding: "8px",
                    minWidth: "200px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                    zIndex: 200,
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      style={{
                        display: "block",
                        padding: "9px 14px",
                        borderRadius: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "background 0.15s ease, color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background =
                          "rgba(123, 92, 246, 0.1)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background =
                          "none";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "auto",
            flexShrink: 0,
          }}
        >
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "color 0.15s ease, background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-primary)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(123, 92, 246, 0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-secondary)";
              (e.currentTarget as HTMLButtonElement).style.background = "none";
            }}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {session ? (
            <>
              {/* Logged in state */}
              {session.user?.role === "SUPER_ADMIN" && (
                <Link
                  href="/admin"
                  style={{
                    padding: "8px 16px",
                    color: "var(--accent-pink-light)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Admin
                </Link>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 12px", background: "rgba(123, 92, 246, 0.1)", borderRadius: "8px" }}>
                <User size={16} color="var(--accent-purple-light)" />
                <span style={{ fontSize: "14px", color: "white" }}>{session.user?.name}</span>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", marginLeft: "8px" }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Log In */}
              <Link
                href="/auth/login"
                style={{
                  padding: "8px 16px",
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-secondary)";
                }}
              >
                Log in
              </Link>

              {/* Join NanoHelp */}
              <Link
                href="/auth/register"
                style={{
                  padding: "9px 18px",
                  background: "var(--accent-purple)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "background 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "var(--shadow-purple-btn)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--accent-purple-dark)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 6px 20px rgba(123, 92, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--accent-purple)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "var(--shadow-purple-btn)";
                }}
              >
                Join NanoHelp
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              borderRadius: "8px",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          style={{
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "16px",
          }}
          className="show-mobile"
        >
          {navItems.map((item) => (
            <div key={item.label} style={{ marginBottom: "4px" }}>
              <Link
                href={item.href}
                style={{
                  display: "block",
                  padding: "10px 14px",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderRadius: "8px",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div style={{ paddingLeft: "14px" }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      style={{
                        display: "block",
                        padding: "8px 14px",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        textDecoration: "none",
                        borderRadius: "8px",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px 0",
              marginTop: "8px",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            {session ? (
               <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Log Out
               </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    background: "var(--accent-purple)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Join NanoHelp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
