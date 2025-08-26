"use client";

import { LoaderComponent } from "@/components/common/LoaderComponent";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (!isAuthenticated && !isLoading) push("/auth");
      else push("/principal");
    }, 5000);
  }, [isAuthenticated, isLoading, push]);

  return <LoaderComponent />;
}
