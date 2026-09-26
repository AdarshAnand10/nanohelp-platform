import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <MainLayout>
      <div style={{ padding: "80px 20px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <LoginForm />
      </div>
    </MainLayout>
  );
}
