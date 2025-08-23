"use client";
import { Navbar } from "@/common/Navbar";
import { useEffect, useState } from "react";

export function NavbarWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem("token"));
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  if (!isLoggedIn) return null;
  return <Navbar />;
}
