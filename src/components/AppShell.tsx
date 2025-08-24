"use client";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <ClientLayout>
      {isAuthPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
    </ClientLayout>
  );
}
