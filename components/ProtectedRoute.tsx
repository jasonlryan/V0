import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPro?: boolean;
}

export function ProtectedRoute({
  children,
  requiresPro = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (requiresPro && user?.role !== "pro") {
        // Redirect free users trying to access pro features
        router.push("/upgrade");
      }
    }
  }, [isLoading, isAuthenticated, router, requiresPro, user?.role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only render if authenticated and meets pro requirement
  if (isAuthenticated && (!requiresPro || user?.role === "pro")) {
    return children;
  }

  return null;
}
