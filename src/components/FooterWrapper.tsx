"use client";


import { Footer } from "@/common/Footer";
import { useEffect, useState } from "react";

export function FooterWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem("token"));
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  if (!isLoggedIn) return null;
  return <Footer />;
}
