"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nano-card" style={{ padding: "40px", maxWidth: "400px", width: "100%" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>Welcome Back</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "32px", textAlign: "center" }}>Log in to access your NanoHelp account.</p>
      
      {error && (
        <div style={{ background: "rgba(236, 72, 153, 0.1)", border: "1px solid var(--accent-pink)", color: "var(--accent-pink-light)", padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "24px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Email Address</label>
          <input 
            type="email" 
            className="nano-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="user@nanohelp.demo"
            required
          />
        </div>
        
        <div>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Password</label>
          <input 
            type="password" 
            className="nano-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button 
          type="submit" 
          className="nano-btn-primary" 
          style={{ marginTop: "12px", opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--border-subtle)", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
        <p>Demo Accounts:</p>
        <p style={{ marginTop: "8px" }}>User: user@nanohelp.demo / demo123</p>
        <p style={{ marginTop: "4px" }}>Admin: admin@nanohelp.demo / demo123</p>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
