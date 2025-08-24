"use client";

import { LoaderComponent } from "@/components/common/LoaderComponent";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setInterval(() => {
      if (!isAuthenticated) push("/auth");
      else push("principal");
    }, 5000);
  }, [isAuthenticated, push]);

  return <LoaderComponent />;
}
