"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Espera a que el estado se actualice
    const timeout = setTimeout(() => setChecked(true), 100);
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  useEffect(() => {
    if (checked && !isAuthenticated) {
      router.push("/auth");
    }
  }, [checked, isAuthenticated, router]);

  if (!checked) return null; // loading o spinner opcional
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
