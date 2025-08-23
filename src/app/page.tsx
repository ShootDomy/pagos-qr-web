"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    setInterval(() => {
      push("/inicio-sesion");
    }, 5000);
  }, [push]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
