import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
      if (isOnAdmin) {
        return token?.role === "SUPER_ADMIN" || token?.role === "ADMIN";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
